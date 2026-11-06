import test from "node:test";
import assert from "node:assert/strict";
import {
  catalogErrors,
  extractLocalMarkdownLinks,
  parseSkill,
  publicContentErrors,
  resolveLocalLink,
  safeRelativePath,
} from "../scripts/check.mjs";

const validSkill = `---
name: sample-skill
description: >
  Does a focused task. Hybrid invocation. Use for sample tasks.
  Do NOT use for unrelated tasks.
version: "0.3.0"
license: MIT
external_grounding: n/a
metadata:
  invocation_posture: hybrid
---
# Sample
`;

test("accepts portable skill metadata", () => {
  assert.deepEqual(parseSkill(validSkill, "sample-skill").errors, []);
});

test("rejects a mismatched directory name and missing negative trigger", () => {
  const result = parseSkill(validSkill.replace("Do NOT use for unrelated tasks.", "Use for sample tasks."), "other-skill");
  assert.ok(result.errors.includes("name must match the skill directory"));
  assert.ok(result.errors.includes("description needs a negative trigger"));
});

test("rejects malformed YAML and oversized descriptions", () => {
  assert.match(parseSkill("---\nname: [\n---\n", "sample-skill").errors[0], /invalid YAML/);
  const longSkill = validSkill.replace(
    "Does a focused task.",
    `Does a focused task. ${"x".repeat(1030)}`,
  );
  assert.ok(parseSkill(longSkill, "sample-skill").errors.includes("description exceeds 1024 characters"));
});

test("blocks absolute, traversal, and empty paths", () => {
  for (const candidate of ["../outside.md", "a/../../outside.md", "C:\\Users\\person\\file", "/etc/passwd", ""]) {
    assert.equal(safeRelativePath(candidate), false, candidate);
  }
  assert.equal(safeRelativePath("references/example.md"), true);
});

test("allows parent links that remain inside the project and blocks escapes", () => {
  const root = "C:\\project";
  assert.equal(
    resolveLocalLink(root, "C:\\project\\skills\\sample\\references\\readme.md", "../NOTICE.md"),
    "C:\\project\\skills\\sample\\NOTICE.md",
  );
  assert.equal(
    resolveLocalLink(root, "C:\\project\\skills\\sample\\references\\readme.md", "../../../../outside.md"),
    null,
  );
  assert.equal(resolveLocalLink(root, "C:\\project\\README.md", "C:\\secret.md"), null);
});

test("extracts only local markdown links", () => {
  const links = extractLocalMarkdownLinks(
    "[local](references/a.md) [web](https://example.test) [anchor](#section) ![img](assets/a.png)",
  );
  assert.deepEqual(links, ["references/a.md", "assets/a.png"]);
});

test("catalog checks routes, sources, licenses, and inventory", () => {
  const catalog = {
    schema_version: 1,
    skills: [{
      name: "sample-skill",
      path: "skills/sample-skill",
      version: "0.3.0",
      license: "MIT",
      sources: ["missing-source"],
      routes: ["missing-skill"],
    }],
  };
  const sources = { schema_version: 1, sources: [] };
  const errors = catalogErrors(catalog, sources, []);
  assert.ok(errors.some((error) => error.includes("unknown source")));
  assert.ok(errors.some((error) => error.includes("unknown skill")));
  assert.ok(errors.includes("catalog skill inventory does not match skills/ directories"));
});

test("detects private paths, companion project names, and credential-shaped strings", () => {
  const tokenLike = `gho_${"1".repeat(30)}`;
  const errors = publicContentErrors([
    ["README.md", "Example"],
    ["leak.md", `C:\\Users\\example\\notes private-repo ${tokenLike}`],
  ]);
  assert.equal(errors.length, 3);
});
