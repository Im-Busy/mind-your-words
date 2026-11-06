# Mind Your Words

Writing skills for AI assistants working on developer documentation, product
copy, and Chinese typography. Choose the audience and writing task; load a
focused guide with source links and worked examples.

The first public version contains five skills. The instructions, routing design,
and examples were developed with AI assistance under the maintainer's direction.
This is an independent project; it does not require another skill collection.

## Try an example

```text
Use mind-your-words to revise this setup guide for a new developer.
Keep commands, file paths, permission requirements, and product behavior intact.
Return the revised text and flag facts that need verification.
```

The English router selects the developer-documentation skill for that task.
It selects the product-writing skill for a dialog, error message, or help
article. The Chinese router selects typography review when punctuation,
mixed-script text, or line breaking is the task.

Browse the original worked examples:

- [A setup instruction with prerequisites and a visible result](skills/mind-your-words-en-google-dev/references/examples.md)
- [A product error that gives a useful next step](skills/mind-your-words-en-microsoft/references/examples.md)
- [Chinese punctuation without changing a command](skills/mind-your-words-zh-clreq/references/examples.md)

## Skills

| Skill | Use |
| --- | --- |
| [mind-your-words](skills/mind-your-words/SKILL.md) | Route English developer and product writing |
| [mind-your-words-en-google-dev](skills/mind-your-words-en-google-dev/SKILL.md) | Developer guides, tutorials, API explanations, and CLI documentation |
| [mind-your-words-en-microsoft](skills/mind-your-words-en-microsoft/SKILL.md) | Product text, error messages, and end-user help |
| [mind-your-words-zh](skills/mind-your-words-zh/SKILL.md) | Identify Chinese typography tasks and their limits |
| [mind-your-words-zh-clreq](skills/mind-your-words-zh-clreq/SKILL.md) | Regional punctuation, mixed-script layout, and rendering review |

[CATALOG.md](CATALOG.md) records versions and scope.

## Install

With the [Skills CLI](https://github.com/vercel-labs/skills), first list the
available skills:

```sh
npx skills add Im-Busy/mind-your-words --list
```

Install the whole collection and choose target agents:

```sh
npx skills add Im-Busy/mind-your-words
```

Install only the English router and its profiles:

```sh
npx skills add Im-Busy/mind-your-words \
  --skill mind-your-words \
  --skill mind-your-words-en-google-dev \
  --skill mind-your-words-en-microsoft
```

Install a single profile with `--skill <name>`. A router does not download
profiles it routes to; install the router and each needed profile together.
To install manually, copy each complete directory under `skills/` into your
agent's documented skill directory. Keep its references and license notices
together. Discovery and invocation depend on the agent; this repository does
not install hooks, services, or model dependencies.

## Working method

1. Identify the audience, output language, purpose, and required house style.
2. Choose one profile for the current section.
3. Edit using that profile's checklist and relevant reference.
4. Compare the revision with the input for changes to facts or technical syntax.
5. Return the revision and any unresolved questions.

For a document with different audiences, choose a profile for each section.
Record that choice when it matters. A user's explicit style takes priority over
the profile's defaults.

## Sources and limits

The profiles provide selected paraphrases of Google's developer documentation
guidance, Microsoft's writing guidance, and the W3C Chinese layout draft.
They do not reproduce complete manuals or certify compliance.
[sources.json](sources.json) records the checked pages, versions where available,
and source-specific terms. The W3C source is a work in progress.

This version covers English writing and Chinese typography. It does not supply
a Chinese translation or voice profile, academic submission rules, regulated
maintenance instructions, or legal drafting guidance. Editing examples illustrate
the workflow; they are not a measured benchmark of model performance.

## Development

Node.js 22.20 or newer is sufficient for the checks:

```sh
npm ci --ignore-scripts
npm run check
npm test
```

The checker parses YAML and JSON, verifies the skill inventory and local links,
and checks selected public-content patterns. Tests exercise invalid metadata,
missing references, unsupported routes, path escapes, and unsafe payloads.
These checks do not measure the quality of an AI assistant's writing.

See [SYSTEM.md](SYSTEM.md) for the project structure and contribution boundaries.

## License

Project code, routers, and original repository documentation use
[MIT](LICENSE). The Google and Microsoft adaptations use CC BY 4.0.
The Chinese layout adaptation carries the W3C Software and Document License.
Each profile includes its attribution and license notice.
See [CREDITS.md](CREDITS.md) for the file-level mapping.
