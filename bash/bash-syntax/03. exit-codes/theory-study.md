# Exit codes (study)

Every command and script finishes with an **exit status**: integer **0–255**. **0** = success; **non-zero** = failure. Last status is in **`$?`**. Read it **immediately** — the next command overwrites it.

`exit` takes **integers 0–255** only. Negative and fractions are not legal (`exit` is a byte).

| Code | Meaning | Example / note |
| --- | --- | --- |
| **1** | Catchall / general errors | `let "var1 = 1/0"`; divide by zero; many ordinary failures. If the notes do not give a more specific number, think **1**. |
| **2** | Misuse of shell builtins | Missing keyword (`empty_function() {`); permission problem in some tools; **`diff`** when two **binary** files differ |
| **126** | Invoked, **cannot execute** | Name **resolved**, kernel will not run it: not executable, or permission. Notes example: “run” `/dev/null` |
| **127** | Command **not found** | Typo, or **`$PATH`** missing the directory. Example: `Illegal_command` |
| **128** | Invalid argument to `exit` | `exit 3.14159` |
| **128+n** | Killed by signal **n** | `kill -9` = SIGKILL (9) → **137** |
| **130** | Control-C | SIGINT = signal **2** → 128+2 = **130** |
| **255** | Status out of range | `exit -1` |

**126 vs 127:** 126 = you **found** a file but cannot run it. 127 = there was **no** command.
