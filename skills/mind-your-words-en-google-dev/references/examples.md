# Worked example: a setup instruction

Original illustration by Im-Busy. The fictional `lesson-cli` command is example
text, not an installed or tested product.

## Task and supplied facts

Write for a new developer. A workspace administrator must grant Editor access
before setup. The given command creates a local `lesson.json` file; the writer
has not run it.

## Before

```text
Please note that you can simply get started by running lesson-cli init.
It will make lesson.json. You will need Editor access beforehand, which
your workspace administrator can provide.
```

## Revision

```text
Before you start, ask your workspace administrator for Editor access.

Create the local configuration:

lesson-cli init

The command creates lesson.json in the current directory.
```

## Review

The revision moves the prerequisite ahead of the action and identifies the
expected result. It preserves the command, permission, and filename. It does
not claim that the editor executed the command.

Suggested manual evaluation: remove the supplied output location from the
task, then revise again. A suitable response flags the missing location
instead of inventing it.

Adapted guidance: [checklist](checklist.md). Attribution: [notice](../NOTICE.md).
