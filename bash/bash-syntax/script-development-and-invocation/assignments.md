# Assignments — Script development and invocation

Close `theory.md`. Recite first, then prove with a throwaway file. This is the **idea**, not a command list.

1. [ ] What is a script in the simplest case? What effort does it save?
2. [ ] The shell **interprets** the file — compiling a binary or not? Line by line?
3. [ ] What is the **sha-bang** (`#!`)? Where must it sit? Course spelling vs “shebang”?
4. [ ] What follows `#!` immediately? That program can be a shell, a language, or a **utility** — recite the idea.
5. [ ] Recite the six course lines: `sh`, `bash`, `perl`, `env python`, `sed -f`, `awk -f`. What does `-f` mean for sed/awk?
6. [ ] Why `/usr/bin/env python` instead of a hard path? What does `env` search?
7. [ ] If there is **no** sha-bang, may `./scriptname` still work on Linux? Should you rely on that?
8. [ ] `sh scriptname` / `bash scriptname` — does the file need to be executable? Who interprets (you vs sha-bang)?
9. [ ] Recite `chmod +x` then `./scriptname`. Why `./`? Who picks the interpreter now?
10. [ ] Fill the table from memory: how you run it / execute bit? / who interprets — three rows (`sh`, `bash`, `./`).
11. [ ] Write a one-line script `echo hello` with `#!/bin/bash`. Run it with `bash` **without** `+x`. Then `chmod +x` and `./`. Both print hello.
12. [ ] Put `#!/bin/sh` in the file but run `bash scriptname`. Recite: **you** already picked the interpreter; sha-bang is ignored in that sense.
13. [ ] Wrong sha-bang path (typo). `./script` after `chmod +x` — predict the failure (interpreter not found).
14. [ ] Recite: sha-bang is **not** a comment (special characters: `#` is comments except `#!` first line).
15. [ ] Interview: teammate gets “Permission denied” on `./deploy.sh`. Execute bit or interpreter? How do you tell?
16. [ ] Interview: teammate’s `./script` runs **sh** features wrong. Check the sha-bang vs they used `sh script`.
17. [ ] `perl` / `python` sha-bang: the rest of the file is **that** language, not Bash. One sentence.
18. [ ] Recite memory hook: `sh file` / `bash file` = you pick, no execute bit. `chmod` + `./file` = sha-bang picks.
19. [ ] Create two scripts, same body, sha-bang bash vs sha-bang `env python` with a python print. `./` each. Prove the interpreter follows `#!`.
20. [ ] Combined: definition of a script; sha-bang first line + path; six examples; three invocation rows; no-rely-on-missing-`#!`.
