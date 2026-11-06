---
name: mind-your-words
description: >
  Selects a writing profile for English developer documentation or product
  content. Hybrid invocation - use when revising a technical guide, help
  article, UI text, or product explanation and the appropriate guide is
  unclear. Do NOT use for Chinese prose, academic submission rules, regulated
  instructions, legal drafting, or casual creative writing.
version: "0.3.0"
license: MIT
external_grounding: n/a
metadata:
  skill-author: project
  invocation_posture: hybrid
---

# Mind Your Words

Choose a profile by the reader's task. This router supplies selection guidance;
the selected profile supplies writing guidance.

## Quick start

Use `mind-your-words` with the draft, intended audience, and desired result.

## Procedure

1. Keep any style or source the user explicitly selects.
2. For developer tasks such as API integration, CLI setup, and programming
   tutorials, load `mind-your-words-en-google-dev`.
3. For product dialogs, errors, end-user help, and feature explanations, load
   `mind-your-words-en-microsoft`.
4. If the document serves both audiences, select a profile for each section.
   Ask about the audience only if the choice changes the revision materially.
5. For an uncovered domain, explain the limit and follow the user's supplied
   guidance. Do not claim support for an unavailable standard.
6. Load the chosen skill from the installed skills directory. If it is absent,
   report the missing profile and continue only with guidance already supplied.

## What's included

- English developer-documentation and product-writing selection.
- A boundary between editorial changes and changes to factual content.

Keep commands, names, measurements, permissions, obligations, and uncertainty
intact. Identify unresolved technical claims instead of rewriting them into
more confident statements.

## User usage

Input: text, audience, purpose, and any required style.
Output: revised text, with a short note about the selected profile when useful.
Return material uncertainties separately. Do not translate or change product
behavior unless requested.

## See also

The two English profiles can be invoked directly. Use `mind-your-words-zh` for
Chinese typography task selection.
