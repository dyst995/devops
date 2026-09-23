# Exit codes

Every command (and every script) finishes with an **exit status**: an integer **0–255**. By convention **0** means success; **non-zero** means failure. The shell stores the last command’s status in **`$?`**.

**Memory hook:** `0` = OK. Anything else = look up *why*. `echo $?` right after the command — the next command overwrites `$?`.

The course table (numbers, meaning, example, comments):

| Exit code | Meaning | Example | Comments |
| --- | --- | --- | --- |
| **1** | Catchall for general errors | `let "var1 = 1/0"` | Miscellaneous errors, such as “divide by zero” and other impermissible operations |
| **2** | Misuse of shell builtins | `empty_function() {` | Missing keyword or command, or permission problem (and `diff` return code on a failed binary file comparison) |
| **126** | Command invoked cannot execute | `/dev/null` | Permission problem or command is not an executable |
| **127** | “command not found” | `Illegal_command` | Possible problem with `$PATH` or a typo |
| **128** | Invalid argument to `exit` | `exit 3.14159` | `exit` takes only integer args in the range **0–255** |
| **128+n** | Fatal error signal “n” | `kill -9 $PPID` of script | `$?` returns **137** (128 + 9) |
| **130** | Script terminated by Control-C | Ctl-C | Control-C is fatal error signal **2** (130 = 128 + 2, see above) |
| **255** | Exit status out of range | `exit -1` | `exit` takes only integer args in the range **0–255** |

**Memory hook:** 126 = found it, **cannot run** it. 127 = **never found** it. 128+n = killed by signal n. Ctrl-C = SIGINT = signal 2 → 130.

## 1 — general errors

Catchall. Divide by zero (`let "var1 = 1/0"`), other illegal operations, many ordinary command failures. If the notes do not give a more specific number, think **1**.

## 2 — misuse of shell builtins

Syntax / missing keyword (the example opens a function and never finishes it: `empty_function() {`). Also used as a **permission** problem in some tools, and as **`diff`’s** status when two **binary** files differ.

## 126 — invoked, cannot execute

The name resolved, but the kernel will not run it: **not executable**, or a **permission** problem. Example from the notes: trying to “run” `/dev/null`.

Contrast with **127**: 126 means you **found** a file; 127 means there was **no** command.

## 127 — command not found

Typo, or **`$PATH`** does not contain the directory. Example: `Illegal_command`.

## 128 — invalid argument to `exit`

`exit` accepts **integers 0–255** only. `exit 3.14159` is invalid.

## 128+n — killed by signal n

If the process dies from signal **n**, status is **128 + n**.

`kill -9` is SIGKILL (signal **9**) → **128 + 9 = 137**.

Ctrl-C is SIGINT (signal **2**) → **128 + 2 = 130** (next row).

## 130 — Control-C

Script terminated by **Control-C**. Same family as 128+n with n = 2.

## 255 — exit status out of range

`exit -1` is not a legal status. Values wrap or are rejected; the table lists **255** for out of range. Same rule as 128: **integers 0–255 only**.

**Memory hook:** `exit` is a byte. Negative and fractions are not legal statuses.
