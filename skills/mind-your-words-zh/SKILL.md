---
name: mind-your-words-zh
description: >
  Selects Chinese typography review for punctuation, mixed-script text, and
  line breaking. Hybrid invocation - use when Chinese writing needs a layout
  profile and the target is unclear. Do NOT use for English writing,
  translation, Chinese voice rewriting, academic submission rules, legal
  documents, or regulated maintenance instructions.
version: "0.3.0"
license: MIT
external_grounding: n/a
metadata:
  skill-author: project
  invocation_posture: hybrid
---

# Mind Your Words: Chinese task selection

This collection supplies a Chinese typography profile. It does not choose a
prose style or translate between English and Chinese.

## Quick start

Supply the draft, intended locale or publication style, and output format.

## Procedure

1. Identify whether the request concerns typography, prose, or translation.
2. For punctuation, mixed-script spacing, or line-break review, load
   `mind-your-words-zh-clreq` from the installed skills directory.
3. Preserve an existing regional or house style. Script alone does not settle
   the region or quotation convention.
4. If that profile is missing, report the missing installation.
5. For voice, translation, academic, legal, or controlled-language tasks, state
   the coverage limit and use any guide the user supplies. Do not apply an
   academic style as a fallback for unrelated Chinese text.

## What's included

- Selection of the Chinese layout profile.
- Separation of editorial decisions from locale and rendering decisions.

## User usage

Input: Chinese or mixed-script text, locale if known, and destination format.
Output: an appropriate profile choice or a clear coverage limit.
Do not change technical tokens or infer a translation request.

## See also

Invoke `mind-your-words-zh-clreq` directly for a known typography task.
Use `mind-your-words` for English developer and product profiles.
