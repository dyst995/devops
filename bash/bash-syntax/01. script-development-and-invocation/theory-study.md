# Script development and invocation (study)

A **script** is a **list of system commands in a file**, so you do not retype the sequence. The shell **interprets** it line by line (see [what is a shell](../../intro/what-is-shell/theory.md)). You are not compiling a binary.

## Sha-bang (`#!`)

Must be the **first line**. Course spelling is **sha-bang** (same idea as shebang). The kernel reads `#!`, then the **path** of the interpreter (a shell, language, or utility). Optional **arguments** after the path.

| Line | Interpreter |
| --- | --- |
| `#!/bin/sh` | Bourne / POSIX `sh` |
| `#!/bin/bash` | Bash |
| `#!/usr/bin/perl` | Perl |
| `#!/usr/bin/env python` | `python` **found on `PATH`** (`env` locates it) |
| `#!/bin/sed -f` | `sed`; `-f` = rest of the file is the program |
| `#!/bin/awk -f` | `awk`, same idea |

`/usr/bin/env python` is for when `python` is not always at one path (pyenv, `/usr/bin/python3`, …). `env` searches `PATH` and execs the first `python`.

No sha-bang: `./scriptname` often still works on Linux (kernel may fall back to `/bin/sh`) — **do not rely on that**. Put the line in.

`sh scriptname` / `bash scriptname` **ignore** the sha-bang: **you** already picked the interpreter.

## How you run it

| How | Execute bit? | Who interprets |
| --- | --- | --- |
| `sh scriptname` | No | `sh` |
| `bash scriptname` | No | `bash` |
| `chmod +x` then `./scriptname` | **Yes** | Path after `#!` |

`sh`/`bash` feed the file to that shell even if the sha-bang says something else.

`./` is required when the directory is **not on `PATH`** (the current directory usually is not).
