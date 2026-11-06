---
name: mind-your-words-zh-clreq
description: >
  Reviews horizontal Chinese typography using selected W3C CLREQ guidance.
  Hybrid invocation - use for regional punctuation, mixed Chinese and Latin
  text, quotation marks, or line-break review. Do NOT use for translation,
  prose voice, vertical typesetting, academic formatting certification, or
  changing code and identifiers.
version: "0.3.0"
license: LicenseRef-W3C-2023
external_grounding: cite-only
metadata:
  skill-author: project
  invocation_posture: hybrid
---

# Chinese typography

Review horizontal text with the intended region, house style, and renderer in
mind. The source is the November 4, 2026 CLREQ Group Note Draft, a work in
progress rather than an endorsed W3C standard.

## Quick start

Supply text, target locale or quotation style, and destination format.
Read [the review notes](references/review.md) and
[the original example](references/examples.md).

## Procedure

1. Preserve the user's region and house style. If they are unknown, retain
   existing consistent conventions and flag choices that need an editor.
2. Review prose punctuation and quotations using the selected source sections.
3. Protect code spans, commands, filenames, URLs, and exact quoted material
   before changing prose. Keep the actual token unchanged.
4. Treat visible character spacing as a layout decision. Do not infer that
   typographic spacing requires inserting literal spaces throughout the source.
5. Distinguish a source-text review from a render check. For rendered material,
   inspect punctuation at line boundaries and mixed-script spacing in the
   intended output when available.
6. Return the revision and state any unverified rendering or locale assumptions.

## What's included

A small set of layout considerations and a technical-token preservation
example. Protection of technical tokens is project editorial practice.

## External Grounding

This skill may emit selected layout recommendations from the named W3C Group
Note Draft. Its bundled reference identifies the source topics, and `sources.json`
records the draft revision and license. Do not present the draft as an endorsed
standard or generalize a regional convention beyond its stated scope.

## Evidence and limits

Consult the linked draft for a source-specific claim. Regional typography varies;
the profile does not impose one quotation convention on all Chinese readers.
Text-only review cannot establish the final font metrics or line breaks.

## User usage

Input: horizontal Chinese or mixed-script text.
Output: typography edits and any rendering checks still needed.
This profile does not translate, rewrite prose voice, or certify conformance.

## See also

[Source attribution and the W3C license](NOTICE.md).
Use `mind-your-words-zh` when the requested kind of Chinese editing is unclear.
