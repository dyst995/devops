# Exit codes

Every command (and every script) finishes with an **exit status**: an integer **0–255**. By convention **0** means success; **non-zero** means failure. The shell stores the last command’s status in **`$?`**.

**Memory hook:** `0` = OK. Anything else = look up *why*. `echo $?` right after the command — the next command overwrites `$?`.

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

**Memory hook:** 126 = found it, **cannot run** it. 127 = **never found** it. 128+n = killed by signal n. Ctrl-C = SIGINT = signal 2 → 130. `exit` is a byte — only integers **0–255**.
