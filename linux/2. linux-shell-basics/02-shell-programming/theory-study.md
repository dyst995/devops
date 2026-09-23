# 02 — Shell programming (study)

The shell is also a **programming language**. The same commands you type go in a file — a **shell script**. The shell **interprets** it **line by line**, finds each command, and runs it.

A **compiler** is the opposite: it turns a program into a machine-readable **executable** first. That binary can later be called *from* a script. The script itself is still text the shell reads at run time.

People like short scripts because the syntax is simple, most short scripts work the first time, and debugging is straightforward (`echo`, run the line by hand, `bash -x script.sh`). Deeper syntax lives in a later Bash course. This page is the mental model: interpreted vs compiled, and **variables**.

## Environment vs shell variables

A variable is a **name** plus a **value**.

| | Environment | Shell-only |
| --- | --- | --- |
| Who sees it | This shell **and** spawned children / subshells | **Only** this shell |
| Typical use | `PATH`, `HOME`, `LANG` — system and app behavior | Temporary counters, flags in one script or session |
| How it becomes environment | You **export** it | Assigned but not exported |

Environment variables customize editor, browser, `PATH`, locale, keyboard, and values scripts reuse. A child does **not** inherit a variable that was never exported. Commands that *set* them are in the next chapter; here, format and common names.

## Format

```bash
KEY=value
ANOTHER_KEY="Some other value"
KEY_MULTI=value1:value2
```

- Names are **case-sensitive** (`HOME` ≠ `home`).
- Convention: environment names are **`UPPER_CASE`** with **`_`** (`LOG_LEVEL`, not `logLevel`).
- Several values in one variable are separated by **`:`** (how `PATH` works).
- **No spaces** around `=`. `KEY = value` makes the shell treat `KEY` as a command.

`NAME=value` is one word to the shell. Spaces split words.

## Common environment variables

| Variable | Meaning |
| --- | --- |
| `USER` | Current logged-in user |
| `HOME` | Home directory |
| `EDITOR` | Default file editor (`edit`, `visudo`, `crontab -e`, …) |
| `SHELL` | Path of the user’s **login** shell |
| `LOGNAME` | Current user name |
| `PATH` | Colon-separated directories searched for commands |
| `LANG` | Locale |
| `TERM` | Terminal emulation |
| `MAIL` | Where this user’s mail is stored |

`PATH`: the system walks those directories **in order** and uses the **first** matching executable. A local `~/bin` at the **front** can override `/usr/bin`.

```bash
echo "$HOME"
echo "$PATH"
env          # exported environment
set          # shell + environment + functions (huge)
```

## When not to use shell

Shell is the wrong tool when you need speed, structure, or secrecy:

- **Resource-intensive** work where **speed** matters (sorting, hashing, recursion)
- **Complex** apps that need structured programming (types, prototypes)
- **Mission-critical** systems you would bet the company on
- **Security**-sensitive work (integrity, resist intrusion / cracking / vandalism)
- Native **multi-dimensional arrays** or real **data structures** (lists, trees)
- **Graphics / GUIs**
- **Libraries** or **legacy** code
- **Proprietary, closed-source** products — a script *is* the source; anyone who can read the file can see it

Glue and automation → shell. Product, performance, or secrets in the algorithm → another language.
