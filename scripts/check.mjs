import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const licenses = new Set(["MIT", "CC-BY-4.0", "LicenseRef-W3C-2023"]);
const postures = new Set(["hybrid", "auto-first", "manual-first"]);

export function safeRelativePath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    return false;
  }
  const normalized = value.replaceAll("\\", "/");
  if (normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized)) return false;
  return normalized.split("/").every((part) => part && part !== "." && part !== "..");
}

export function resolveLocalLink(projectRoot, fromFile, target) {
  if (typeof target !== "string" || target.length === 0 || target.includes("\0")) return null;
  if (path.isAbsolute(target) || /^[A-Za-z]:/.test(target)) return null;
  const resolved = path.resolve(path.dirname(fromFile), target);
  const relative = path.relative(projectRoot, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return null;
  }
  return resolved;
}

export function parseSkill(markdown, expectedName) {
  const errors = [];
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { metadata: null, body: "", errors: ["missing YAML frontmatter"] };

  let metadata;
  try {
    metadata = parseYaml(match[1]);
  } catch (error) {
    return { metadata: null, body: "", errors: [`invalid YAML frontmatter: ${error.message}`] };
  }

  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return { metadata: null, body: "", errors: ["frontmatter must be a YAML object"] };
  }
  if (metadata.name !== expectedName) errors.push("name must match the skill directory");
  if (typeof metadata.description !== "string" || metadata.description.trim().length === 0) {
    errors.push("description is required");
  } else {
    if (metadata.description.length > 1024) errors.push("description exceeds 1024 characters");
    if (!/Do NOT use/i.test(metadata.description)) errors.push("description needs a negative trigger");
  }
  if (typeof metadata.version !== "string" || !/^\d+\.\d+\.\d+$/.test(metadata.version)) {
    errors.push("version must use semantic version format");
  }
  if (!licenses.has(metadata.license)) errors.push("license must use a catalogued license identifier");
  if (!metadata.metadata || !postures.has(metadata.metadata.invocation_posture)) {
    errors.push("metadata.invocation_posture is required");
  }
  if (!["cite-only", "n/a"].includes(metadata.external_grounding)) {
    errors.push("external_grounding must be cite-only or n/a");
  }
  if (metadata.external_grounding === "cite-only" && !/^## External Grounding$/m.test(markdown)) {
    errors.push("cite-only skills need an External Grounding section");
  }
  return { metadata, body: markdown.slice(match[0].length), errors };
}

export function extractLocalMarkdownLinks(markdown) {
  const links = [];
  for (const match of markdown.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    links.push(target.split("#", 1)[0]);
  }
  return links;
}

export function catalogErrors(catalog, sources, installedDirectories) {
  const errors = [];
  if (catalog?.schema_version !== 1 || !Array.isArray(catalog.skills)) {
    return ["catalog.json must have schema_version 1 and a skills array"];
  }
  if (sources?.schema_version !== 1 || !Array.isArray(sources.sources)) {
    return ["sources.json must have schema_version 1 and a sources array"];
  }
  const names = catalog.skills.map((skill) => skill?.name);
  if (new Set(names).size !== names.length) errors.push("skill names must be unique");
  const sourceIds = sources.sources.map((source) => source?.id);
  if (new Set(sourceIds).size !== sourceIds.length) errors.push("source IDs must be unique");
  for (const source of sources.sources) {
    if (!source.id || !source.title || !source.coverage || !source.license) {
      errors.push(`source ${source.id ?? "(missing id)"} needs title, coverage, and license`);
    }
    if (typeof source.url !== "string" || !source.url.startsWith("https://")) {
      errors.push(`source ${source.id ?? "(missing id)"} needs an HTTPS URL`);
    }
  }
  for (const skill of catalog.skills) {
    if (!safeRelativePath(skill.path)) {
      errors.push(`unsafe skill path for ${skill.name ?? "(missing name)"}`);
      continue;
    }
    if (path.posix.basename(skill.path) !== skill.name) {
      errors.push(`catalog path must end with skill name ${skill.name}`);
    }
    if (!licenses.has(skill.license)) errors.push(`unsupported license for ${skill.name}`);
    for (const sourceId of skill.sources ?? []) {
      if (!sourceIds.includes(sourceId)) errors.push(`${skill.name} references unknown source ${sourceId}`);
    }
    for (const route of skill.routes ?? []) {
      if (!names.includes(route)) errors.push(`${skill.name} routes to unknown skill ${route}`);
    }
  }
  const catalogNames = [...names].sort();
  const diskNames = [...installedDirectories].sort();
  if (JSON.stringify(catalogNames) !== JSON.stringify(diskNames)) {
    errors.push("catalog skill inventory does not match skills/ directories");
  }
  return errors;
}

export function publicContentErrors(files) {
  const errors = [];
  const patterns = [
    [/C:\\(?:Users|Dev)\\/i, "machine-specific Windows path"],
    [/\/Users\/[^/\s]+/i, "machine-specific macOS path"],
    [/\/home\/[^/\s]+/i, "machine-specific Linux path"],
    [/\b(?:private|internal)[-_ ](?:repo|project|workspace)\b/i, "private project reference"],
    [/\b(?:gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,})\b/, "credential-like token"],
  ];
  for (const [file, contents] of files) {
    for (const [pattern, label] of patterns) {
      if (pattern.test(contents)) errors.push(`${file}: contains ${label}`);
    }
  }
  return errors;
}

async function walkMarkdown(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const stat = await lstat(fullPath);
    if (stat.isSymbolicLink()) throw new Error(`symbolic links are not allowed: ${fullPath}`);
    if (entry.isDirectory()) found.push(...await walkMarkdown(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".md")) found.push(fullPath);
  }
  return found;
}

async function validateProject() {
  const errors = [];
  const catalog = JSON.parse(await readFile(path.join(projectRoot, "catalog.json"), "utf8"));
  const sources = JSON.parse(await readFile(path.join(projectRoot, "sources.json"), "utf8"));
  const skillsRoot = path.join(projectRoot, "skills");
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const skillDirectories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  errors.push(...catalogErrors(catalog, sources, skillDirectories));

  const filesToScan = [];
  for (const skill of catalog.skills) {
    if (!safeRelativePath(skill.path)) continue;
    const skillPath = path.resolve(projectRoot, ...skill.path.split("/"));
    const markdownPath = path.join(skillPath, "SKILL.md");
    let markdown;
    try {
      markdown = await readFile(markdownPath, "utf8");
    } catch {
      errors.push(`${skill.path}/SKILL.md is missing or unreadable`);
      continue;
    }
    const parsed = parseSkill(markdown, skill.name);
    errors.push(...parsed.errors.map((error) => `${skill.name}: ${error}`));
    if (parsed.metadata) {
      if (parsed.metadata.version !== skill.version) errors.push(`${skill.name}: version differs from catalog`);
      if (parsed.metadata.license !== skill.license) errors.push(`${skill.name}: license differs from catalog`);
      for (const sourceId of skill.sources ?? []) {
        if (!sources.sources.some((source) => source.id === sourceId)) {
          errors.push(`${skill.name}: unknown source ${sourceId}`);
        }
      }
    }
    try {
      const mirror = JSON.parse(await readFile(path.join(skillPath, "skill.json"), "utf8"));
      for (const field of ["name", "description", "version", "license", "external_grounding"]) {
        if (mirror[field] !== parsed.metadata?.[field]) {
          errors.push(`${skill.name}: skill.json ${field} differs from SKILL.md`);
        }
      }
      if (mirror.metadata?.invocation_posture !== parsed.metadata?.metadata?.invocation_posture) {
        errors.push(`${skill.name}: skill.json invocation_posture differs from SKILL.md`);
      }
    } catch {
      errors.push(`${skill.name}: skill.json is missing or invalid`);
    }
    filesToScan.push(...await walkMarkdown(skillPath));
  }

  const docs = [
    "README.md", "CATALOG.md", "CREDITS.md", "CHANGELOG.md", "AGENTS.md", "SYSTEM.md",
  ];
  for (const file of docs) filesToScan.push(path.join(projectRoot, file));
  const uniqueFiles = [...new Set(filesToScan)];
  const contents = [];
  for (const fullPath of uniqueFiles) {
    let text;
    try {
      text = await readFile(fullPath, "utf8");
    } catch {
      errors.push(`${path.relative(projectRoot, fullPath)} is missing or unreadable`);
      continue;
    }
    const relativeFile = path.relative(projectRoot, fullPath);
    contents.push([relativeFile, text]);
    for (const target of extractLocalMarkdownLinks(text)) {
      const targetPath = resolveLocalLink(projectRoot, fullPath, target);
      if (!targetPath) {
        errors.push(`${relativeFile}: unsafe local link ${target}`);
      } else {
        try {
          await lstat(targetPath);
        } catch {
          errors.push(`${relativeFile}: local link target is missing: ${target}`);
        }
      }
    }
  }
  errors.push(...publicContentErrors(contents));

  if (errors.length) {
    console.error(`Mind Your Words check failed (${errors.length} issue(s)):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Mind Your Words check passed (${catalog.skills.length} skills, ${sources.sources.length} sources).`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateProject().catch((error) => {
    console.error(`Mind Your Words check error: ${error.message}`);
    process.exitCode = 2;
  });
}
