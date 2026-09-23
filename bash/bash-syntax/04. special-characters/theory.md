# Special characters

If it has a meaning **beyond its literal meaning**, a **meta-meaning**, then we refer to it as a **special character**. Along with **commands** and **keywords**, special characters are **building blocks of Bash scripts**.

**Memory hook:** letter-for-letter = ordinary. Extra job in the language = special. Scripts are commands + keywords + these.

The course table:

| Character | Meaning |
| --- | --- |
| `#` | comments |
| `;` | command separator |
| `;;` | terminator in a case option |
| `.` | “dot” command |
| `./file` | “dot” as a component of a filename |
| `""` | partial quoting |
| `''` | full quoting |
| `,` | comma operator |
| `\` | escape (backslash) |
| `` ` ` `` | backticks |
| `:` | null command |
| `$` | dollar sign |

The slide’s last two symbols are easy to mix up: **`;`** is already the **command separator**. The **null command** is the **colon** **`:`** (same meta-meaning as `true`). **`$`** is the dollar sign.

## `#` — comments

A `#` starts a **comment**. From there to the end of the line is **not executed**.

```bash
echo hello  # this is ignored
# a whole line of comment
```

`#!` on the **first** line is the **sha-bang**, not a comment (see [script development](../01. script-development-and-invocation/theory.md)).

**Memory hook:** `#` = human only. Exception: `#!` first line.

## `;` — command separator

Puts **two or more commands on the same line**. They run **in sequence**, left to right.

```bash
echo one; echo two; echo three
```

Same idea as a newline between commands. Status of the line is the status of the **last** command.

**Memory hook:** `;` = “and then” on one line. Not “and if the first succeeded” (`&&` is a different character, not in this table).

## `;;` — terminator in a case option

Ends **one branch** of a **`case`** statement. After a match, Bash leaves that option.

```bash
case "$1" in
  start) echo starting ;;
  stop)  echo stopping ;;
  *)     echo unknown ;;
esac
```

**Memory hook:** one `;` separates commands. Two `;` close a `case` arm.

## `.` — “dot” command

The **`.` command** reads a file and runs it **in the current shell** (same as **`source`**). Variables and functions **stay**.

```bash
. ./lib.sh
source ./lib.sh   # same idea
```

That is **not** the same as starting a **new** process for the file.

**Memory hook:** `. file` = pull that file **into this** shell.

## `./file` — “dot” as a component of a filename

Here `.` is **part of a path**, not the source command.

- **`./file`** — file named `file` in the **current directory**
- **`.hidden`** — name **starts** with a dot (often “hidden”)
- **`..`** — **parent** directory

```bash
./deploy.sh
ls ../
```

**Memory hook:** space after `.` → command (`source`). No space, glued to a name → path (`./script`).

## `""` — partial quoting

**Double quotes** group into one word. **`$`**, **backticks**, and **`\`** still work inside.

```bash
name=world
echo "hello $name"    # hello world
```

**Memory hook:** `"..."` = one word, **variables still expand**.

## `''` — full quoting

**Single quotes** group into one word and take **everything literally**. No `$` expansion, no backticks, no escape (except that `'` itself cannot appear inside easily).

```bash
name=world
echo 'hello $name'    # hello $name
```

**Memory hook:** `'...'` = **what you typed**, including `$`.

## `,` — comma operator

Links **arithmetic** expressions. **All** are evaluated; the **value** is the **last** one.

```bash
let "t2 = ((a = 9, 15 / 3))"
# a is 9; t2 is 5
```

**Memory hook:** comma in `(( ))` / `let` = do several assignments; **keep the last number**.

## `\` — escape (backslash)

The next character loses its special meaning (or starts a continuation if `\` is last on the line).

```bash
echo \$HOME     # $HOME  (dollar is literal)
echo hello\
world           # helloworld  (line continued)
```

**Memory hook:** `\` = “next character, take it **literally**” (or join lines).

## backticks — command substitution

`` `command` `` runs **command** and is **replaced by its output**.

```bash
echo "today is `date`"
```

Same job as `$(date)` (not in this table). Nested backticks are painful; the table still lists them.

**Memory hook:** backticks = **run this, paste the output here**.

## `:` — null command

Does **nothing**, succeeds (**status 0**). Same idea as **`true`**. A builtin.

```bash
:                    # no-op, 0
while : ; do ...; done   # forever (condition always true)
```

Useful as a placeholder, an always-true condition, or a no-op after a redirect.

**Memory hook:** colon = **do nothing, OK**. Not a semicolon.

## `$` — dollar sign

Starts **parameter / variable** expansion (and related expansions: `$?`, `$1`, `$(...)`, etc.).

```bash
echo "$HOME"
echo $?
```

**Memory hook:** `$` = “the **value** of …”, not the letters of the name.
