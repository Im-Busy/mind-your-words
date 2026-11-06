---
name: mind-your-words-en-google-dev
description: >
  Revises English developer documentation using selected Google documentation
  guidance. Hybrid invocation - use for API explanations, setup guides,
  tutorials, integration instructions, and CLI help. Do NOT use for product
  UI copy, translation, academic submission rules, or regulated instructions.
version: "0.3.0"
license: CC-BY-4.0
external_grounding: cite-only
metadata:
  skill-author: project
  invocation_posture: hybrid
---

# English developer documentation

Help a developer complete a specific task. Apply this selected guidance while
preserving the draft's technical meaning.

## Quick start

Supply the draft and reader's task. Read
[the checklist](references/checklist.md) for an editing pass and
[the worked example](references/examples.md) when a procedural example helps.

## Procedure

1. Identify the intended reader and task. Preserve the user's terminology and
   chosen style where explicit.
2. Read the relevant checklist section. Organize procedural content around
   prerequisites, actions, and observable results.
3. Use clear technical wording and an approachable tone. Remove commentary
   that repeats a command without helping the reader understand it.
4. Compare input and output. Preserve commands, placeholders, option names,
   access requirements, defaults, warnings, and uncertainty.
5. Flag missing prerequisites or unverified product behavior. Do not fill
   those gaps with invented commands or results.
6. Return the revision and only the verification notes the user needs.

## What's included

A procedural checklist and an original example. The linked Google pages are
the source of the selected writing recommendations. The comparison pass and
example are this project's application workflow.

## External Grounding

This skill may emit selected style recommendations from the named Google
documentation pages. Its bundled reference links directly to those pages, and
`sources.json` records the source identities and terms for this collection.
Do not extend a source's guidance beyond the page or coverage named there.

## Evidence and limits

Check a cited page before adding a guide-specific rule. An editorial revision
does not establish that commands run or APIs behave as described. If asked to
verify those facts, use applicable product documentation or authorized
execution and report what was actually checked.

## User usage

Input: English developer-facing text and audience.
Output: a revised draft and unresolved technical questions.
This profile does not execute setup commands, install software, or guarantee
compliance with the complete Google guide.

## See also

[Attribution and terms](NOTICE.md).
Use `mind-your-words-en-microsoft` for product copy and end-user help.
