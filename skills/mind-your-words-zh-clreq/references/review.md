# Chinese layout review notes

Source: [Requirements for Chinese Text Layout, November 4, 2026 draft](https://www.w3.org/TR/2026/DNOTE-clreq-20261104/).
Selected paraphrases:

- Punctuation handling varies across regions and locales. Determine the target
  instead of inferring it from script alone.
- Quotation conventions differ. The draft describes different nesting styles
  in Taiwan and Mainland China; confirm the requested style.
- Mixed Chinese and Western text involves typographic spacing. That spacing
  is not a universal instruction to insert ASCII spaces into stored text.
- Line boundaries have punctuation restrictions. Check rendered output; do
  not insert arbitrary hard breaks to hide a renderer problem.

Relevant source topics: punctuation and inline features, quotations and
citations, line breaking, and text alignment.

## Project editing decisions

Protect commands and identifiers before editing surrounding prose. A technical
token can contain Unicode; preserve it as supplied. Markdown backticks are a
destination-format convention, not a CLREQ requirement.

Retain a consistent existing style when the region is unknown. Treat spacing
insertions as an explicit house-style choice. Report font and line-break checks
as unverified when no rendered output was inspected.

[Example](examples.md). [Attribution and full notice](../NOTICE.md).
