---
name: mind-your-words-en-microsoft
description: >
  Revises English product writing using selected Microsoft style guidance.
  Hybrid invocation - use for UI text, error messages, help articles, and
  end-user product explanations. Do NOT use for developer API documentation,
  Chinese translation, academic submission rules, legal drafting, or
  regulated instructions.
version: "0.3.0"
license: CC-BY-4.0
external_grounding: cite-only
metadata:
  skill-author: project
  invocation_posture: hybrid
---

# English product writing

Help the reader understand a product state and choose a useful action.
Use the user's house style where specified.

## Quick start

Supply the text, product context, and intended audience.
Read [the checklist](references/checklist.md).
Use [the error-message example](references/examples.md) for a worked case.

## Procedure

1. Establish the task or decision the reader faces. Retain the limits of what
   the product actually does.
2. Put the information needed for that decision near the start. Use familiar
   wording and keep labels consistent with the product.
3. Apply the checklist. Use sentence case for new headings and labels unless
   existing product labels or the user require another form.
4. For an error, identify what is known about the failure and any supported
   next action. Omit invented causes, recovery promises, or data-safety claims.
5. Compare the revision with the input for changed conditions, permissions,
   amounts, deadlines, and certainty.
6. Return the revised copy. Identify missing product facts separately.

## What's included

Selected Microsoft writing recommendations, a project error-copy review
workflow, and an original example. The error workflow is project editorial
practice rather than a claim to reproduce Microsoft's full UI specification.

## External Grounding

This skill may emit selected style recommendations from the named Microsoft
Writing Style Guide page. Its bundled reference links to that page, and
`sources.json` records the source identity and terms for this collection.
Treat the project error-copy workflow as editorial practice, not a Microsoft
requirement.

## Evidence and limits

Verify the linked source before adding a Microsoft-specific rule. Writing an
error message does not establish the cause of the error or whether the user's
data was saved. Preserve that distinction.

## User usage

Input: English product copy, its context, and any length constraint.
Output: revised text with material uncertainties.
This profile does not replace product testing or certify accessibility.

## See also

[Attribution and terms](NOTICE.md).
Use `mind-your-words-en-google-dev` for programming and integration guides.
