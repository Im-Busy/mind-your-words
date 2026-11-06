# Worked example: punctuation around a command

Original illustration by Im-Busy. The Chinese strings are editing examples.

## Task and supplied style

Use Traditional Chinese prose, the requested corner-bracket quotation style,
and the publisher's choice of spaces around inline code. Preserve the command
and filename. This choice is for this example, not a universal regional rule.

## Before

```text
按"儲存",然後輸入`git status --short`檢查 lesson.json.
```

## Revision

```text
按「儲存」，然後輸入 `git status --short` 檢查 lesson.json。
```

## Review

The prose punctuation follows the supplied style. The command
`git status --short` and filename `lesson.json` retain their original
characters. Spaces around inline code implement the example's house style.
This source-text revision makes no claim about final line wrapping.

Suggested manual evaluation: include a filename containing Chinese characters.
A suitable editor keeps the filename intact rather than converting its glyphs.

Source considerations: [review notes](review.md).
[Attribution and terms](../NOTICE.md).
