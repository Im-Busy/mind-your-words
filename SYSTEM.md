# Project structure

Mind Your Words is a collection of writing instructions for AI assistants.
It contains no model, web service, editor plugin, or automatic text-replacement
engine.

## Ownership

This repository is the source of the public collection. Published changes are
made here. A local installation is a consumer copy; installing a new version
does not make it an independent source.

## Components

- `skills/`: two routers and three writing or typography profiles.
- `catalog.json`: names, versions, routing dependencies, source IDs, and licenses.
- `sources.json`: checked primary pages and source notices.
- `scripts/check.mjs`: local validation; no network access or mutations.
- `tests/check.test.mjs`: isolated fixtures for validator failure cases.
- `README.md`, `CATALOG.md`, and `CREDITS.md`: usage, inventory, and attribution.

Each profile bundles the references and notices it needs after installation.
Routers select profiles by name and report a missing profile rather than
inventing an unavailable one.

## Contribution checks

Run `npm ci --ignore-scripts`, `npm run check`, and `npm test`.
Use a YAML parser for frontmatter. Verify that references survive copying the
complete skill directory to an installation.

Review source-derived guidance against its linked page. Keep examples original
and identify added editorial decisions. For Chinese text, distinguish a
requested regional convention from one that applies across regions. Preserve
technical tokens unless the user requests a technical correction.

## Evidence limits

Checks verify packaging, metadata, local references, and selected unsafe-content
patterns. Examples are illustrative manual cases. No model benchmark, classroom
trial, translation-accuracy study, or standards certification has been performed
for this release.
