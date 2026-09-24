# Special characters (study)

A **special character** has a **meta-meaning** beyond the literal glyph. Scripts are **commands + keywords + these**.

| Character | Meaning |
| --- | --- |
| `#` | comments |
| `;` | command separator |
| `;;` | terminator in a case option |
| `.` | “dot” command (source) |
| `./file` | `.` as part of a **path** |
| `""` | partial quoting |
| `''` | full quoting |
| `,` | comma operator (arithmetic) |
| `\` | escape |
| `` ` ` `` | backticks (command substitution) |
| `:` | null command (not `;`) |
| `$` | dollar sign (expansion) |

**`;`** is the command separator. **`:`** is the null command (same idea as `true`). Easy to mix up.

## `#`

Comment to end of line — not executed. Exception: `#!` on the **first** line is the sha-bang (see [script development](../01. script-development-and-invocation/theory.md)).

## `;`

Two or more commands on **one line**, left to right. Same idea as a newline. Status of the line = status of the **last** command. Not `&&` (that is “and if the first succeeded”).

```bash
echo one; echo two; echo three
```

## `;;`

Ends **one arm** of `case`. After a match, Bash leaves that option. One `;` separates commands; two close a `case` arm.

```bash
case "$1" in
  start) echo starting ;;
  stop)  echo stopping ;;
  *)     echo unknown ;;
esac
```

## `.` vs `./file`

**`.` command** (space after the dot) reads a file **in the current shell** — same idea as **`source`**. Variables and functions **stay**. Not a new process.

```bash
. ./lib.sh
source ./lib.sh
```

**No space**, glued to a name = **path**:

- `./file` — `file` in the **current** directory
- `.hidden` — name starts with a dot (often “hidden”)
- `..` — **parent** directory

## Quoting

**`"..."`** — one word. **`$`**, backticks, and **`\`** still work. `name=world` → `"hello $name"` is `hello world`.

**`'...'`** — one word, **everything literal**. No `$`, no backticks, no escape (`'` itself cannot appear inside easily). `'hello $name'` is `hello $name`.

## `,` (arithmetic)

In `(( ))` / `let`, all expressions run; the **value** is the **last**.

```bash
let "t2 = ((a = 9, 15 / 3))"
# a is 9; t2 is 5
```

## `\`

Next character is **literal**, or join lines if `\` is last on the line.

```bash
echo \$HOME          # $HOME
echo hello\
world                # helloworld
```

## Backticks

`` `command` `` runs **command** and is **replaced by its output**. Same job as `$(date)` (not in this table). Nested backticks are painful.

```bash
echo "today is `date`"
```

## `:`

Builtin: **does nothing**, status **0**. Same idea as `true`. Placeholder, always-true condition (`while : ; do …; done`), or no-op after a redirect.

## `$`

Starts **parameter / variable** expansion (`$HOME`, `$?`, `$1`, `$(...)`, …). The **value**, not the letters of the name.
