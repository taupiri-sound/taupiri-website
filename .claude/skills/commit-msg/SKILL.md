---
name: commit-msg
description: Generate a concise but thorough git commit message for the current uncommitted changes, ready to copy.
---

Run `git diff` and `git status --short` to understand the current uncommitted changes (staged and unstaged).

Write a commit message the user can copy directly. Follow these rules:

**Format**

- First line: `<type>: <short summary>` (max 72 chars) — types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`
- Blank line
- Body: bullet groups if changes span multiple concerns; plain prose if it's a single focused change
- No trailing summary or sign-off

**Content**

- Lead with the _why_ or _what changed_, not a restatement of the diff
- Group related changes under a short heading if it aids readability
- Be specific enough that someone reading the log without the diff understands what happened
- Omit any changes that are trivially obvious from the summary line

**Output**

- Print the commit message inside a single fenced code block so it's easy to copy
- Wrap the entire message in single quotes (`'...'`) so it can be pasted directly into `git commit -m '...'`
- Never use single quotes (`'`) or double quotes (`"`) anywhere inside the message — use the possessive without an apostrophe, reword, or use a dash instead of quoting a term
- Nothing else — no explanation, no commentary before or after
