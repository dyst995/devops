# 02 — Shell Programming

The shell is not only a prompt. It is also a **programming language**.

You type commands, or you put those same commands in a file. That file is a **shell script** (or shell program). The shell **interprets** the file: it reads **line by line**, finds each command on the system, and runs it.

A **compiler** is the opposite idea: it turns a program into a machine-readable **executable** first. That binary can later be called *from* a shell script. The script itself is still just text the shell reads at run time.

**Memory hook:** script = recipe the cook (shell) reads as it goes. Compiled program = meal already cooked; the shell only serves it.

## Why people like short shell scripts

- Syntax is **simple and straightforward**
- Most **short** scripts work the first time
- **Debugging** is straightforward (add `echo`, run the line by hand, `bash -x` / `set -x`)

Deeper syntax lives in a later Bash-scripting course. This page is the mental model: interpreted vs compiled, and **variables**.

## Seeing each command: `bash -x` and `set -x`

**xtrace** prints each command to **stderr** just before it runs, after expansions. The usual prefix is `+ ` (that is `PS4`). You see what the shell actually ran, not only what you typed in the file.

**`bash -x script.sh`** turns xtrace **on for the whole run** without editing the file. Same idea: `bash -x ./script.sh` or `bash -x -c 'echo "$HOME"'`. The script can still have a shebang; you are launching Bash with `-x` yourself.

**`set -x` inside the script** turns xtrace **on from that line**. Use it when you only want a section, or when the script is already running (`./script.sh`) and you do not want to remember `bash -x` on the command line.

**`set +x`** turns xtrace **off** (the `-` / `+` pair: minus = option on, plus = option off). Wrap a block:

```bash
#!/bin/bash
echo "quiet"
set -x
echo "this line is traced"
ls "$HOME"
set +x
echo "quiet again"
```

| | `bash -x script.sh` | `set -x` in the file |
| --- | --- | --- |
| Job | Run this script **with** xtrace | Turn xtrace **on** from here |
| Edit the file? | No | Yes (or type it at a prompt) |
| Scope | Whole process | From `set -x` until `set +x` or the end |
| Same option | `-x` on the Bash command line | `set -o xtrace` is the long name |

The trace is not a substitute for `echo` of values you care about, but it shows failed lines and expanded arguments. Remove `set -x` (or leave `set +x`) before you treat the script as finished.

## Environment variables and shell variables

A variable is a **name** plus an **associated value**.

**Environment variables** are a set of dynamic named values stored in the process environment. Applications and scripts launched in the shell **or in subshells** can read them. They customize how the system and apps behave: default editor, browser, `PATH` to executables, locale, keyboard layout, and values your scripts reuse.

**Shell variables** exist only in the **current shell instance**. Each shell (`bash`, `zsh`, …) has its own internal set. A child process does **not** inherit a variable that was never exported.

| | Environment variable | Shell variable |
| --- | --- | --- |
| Who sees it | This shell **and** spawned children / subshells | **Only** this shell |
| Typical use | `PATH`, `HOME`, `LANG` — system and app behavior | Temporary counters, flags inside one script or session |
| How it becomes “environment” | You **export** it (next chapter) | Assigned but not exported |

**Memory hook:** environment = inherited by kids. Shell-only = stays in the room.

Commands that *set* them are in the next chapter. Here, memorize **format** and **common names**.

## Format

```bash
KEY=value
ANOTHER_KEY="Some other value"
KEY_MULTI=value1:value2
```

Rules:

- Names are **case-sensitive**. `HOME` and `home` are different.
- By convention, environment variables are **`UPPER_CASE`** with **`_`** between words (`LOG_LEVEL`, not `logLevel`).
- Several values in one variable are separated by **`:`** (this is how `PATH` works).
- **No spaces** around `=`. `KEY=value` is correct. `KEY = value` is wrong (the shell treats `KEY` as a command).

**Memory hook:** `NAME=value` is one word to the shell. Spaces split words.

## Common environment variables

| Variable | Meaning |
| --- | --- |
| `USER` | Current logged-in user |
| `HOME` | Home directory of the current user |
| `EDITOR` | Default file editor (used when you type `edit` or when tools open an editor) |
| `SHELL` | Path of the current user’s login shell (`/bin/bash`, `/bin/zsh`, …) |
| `LOGNAME` | Name of the current user |
| `PATH` | Colon-separated list of directories searched when you run a command |
| `LANG` | Current locale settings |
| `TERM` | Current terminal emulation |
| `MAIL` | Where the current user’s mail is stored |

**`PATH` detail:** when you run a command (`ls`, `python`, `kubectl`), the system walks those directories **in order** and uses the **first** matching executable. That is why a local `~/bin` at the **front** of `PATH` can override `/usr/bin`.

Inspect them while studying:

```bash
echo "$HOME"
echo "$PATH"
env          # environment (exported)
set          # shell + environment (lots of output)
```

## When **not** to use shell scripts

Shell is the wrong tool when you need speed, structure, or secrecy:

- **Resource-intensive** work where **speed** matters (sorting, hashing, recursion)
- **Complex** apps that need structured programming (type-checking, function prototypes)
- **Mission-critical** systems you would bet the company on
- **Security**-sensitive work where you must guarantee integrity and resist intrusion / cracking / vandalism
- Need **native multi-dimensional arrays**
- Need real **data structures** (linked lists, trees)
- Need to **generate / manipulate graphics or GUIs**
- Need to **use libraries** or talk to **legacy** code
- **Proprietary, closed-source** products — a script *is* the source; anyone who can read the file can see it

**Memory hook:** glue and automation → shell. Product, performance, or secrets in the algorithm → another language.
