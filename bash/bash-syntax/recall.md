# Bash syntax recall — memorize this

Everything from Bash syntax that you need in your head: the **rule**, then the **command**. One idea once. Review one topic a day; leftover day is a full pass or the weak topic.

| Day | Topic |
| --- | --- |
| Monday | 1. Script development · 2. Options |
| Tuesday | 3. Exit codes · 4. Special characters |
| Wednesday | 5. Variables |
| Thursday | 6. Conditions |
| Friday | 7. Loops |
| Saturday | 8. Redirection · 9. Functions |
| Sunday | Full pass or weakest topic |

---

## 1. Script development and invocation

**Script** — List of system commands in a file, so you do not retype them. The shell **interprets** line by line. Not a compiled binary.

**Sha-bang (`#!`)** — Must be **line 1**. Course spelling: sha-bang. Kernel reads `#!`, then the **interpreter path**. Optional arguments after the path (`-f` for sed/awk).

**`/usr/bin/env python`** — `env` finds `python` on `PATH` (pyenv, `/usr/bin/python3`, …).

**No sha-bang** — `./script` may fall back to `/bin/sh`. **Do not rely on that.**

**`sh` / `bash` scriptname** — **You** pick the interpreter. Sha-bang ignored. No execute bit needed.

**`chmod +x` then `./scriptname`** — Kernel uses the sha-bang path. `./` is required when the directory is not on `PATH` (cwd usually is not).

```bash
#!/bin/sh                    # Bourne / POSIX sh
#!/bin/bash                  # Bash
#!/usr/bin/perl              # Perl
#!/usr/bin/env python        # python found on PATH
#!/bin/sed -f                # sed; rest of file is the program
#!/bin/awk -f                # awk; same idea
sh scriptname                # run with sh; no execute bit
bash scriptname              # run with bash; no execute bit
chmod +x scriptname          # make directly executable
./scriptname                 # kernel uses the sha-bang
```

---

## 2. Bash options

**Options** — Settings that change shell and/or script behavior.

**`set`** — Turns them on **from that point**. `set -o name` = `set -abbrev`.

**`-` = on. `+` = off** (opposite of “plus = more”).

**`verbose` / `-v`** — Print each command **as the script reads it**. Useful while learning; noisy in production.

**`errexit` / `-e`** — First failed command **ends the script**. Default is **`+e`**: the error prints, later lines still run.

You can `set -e` for a sensitive block, then `set +e` for the rest.

```bash
set -o verbose               # enable option by name
set -v                       # same; short form
set +o verbose               # disable that option
set +v                       # same; short form
set -e                       # exit when a command fails (errexit)
set -o errexit               # same as -e
set +e                       # default: keep going after a failure
```

---

## 3. Exit codes

Every command/script ends with an integer **0–255**. **0** = success; **non-zero** = failure. Last status is **`$?`**. Read it **immediately** — the next command overwrites it.

`exit` takes integers **0–255** only (a byte). No negatives, no fractions.

| Code | Meaning |
| --- | --- |
| **1** | Catchall / general errors (`let "var1 = 1/0"`) |
| **2** | Misuse of shell builtins; `diff` on two binary files |
| **126** | Found the file; **cannot execute** (no +x, or `/dev/null`) |
| **127** | Command **not found** (typo / `$PATH`) |
| **128** | Invalid argument to `exit` (`exit 3.14159`) |
| **128+n** | Killed by signal **n** (`kill -9` → **137**) |
| **130** | Ctrl-C (SIGINT = 2 → 128+2) |
| **255** | Status out of range (`exit -1`) |

**126 vs 127:** 126 = you **found** it but cannot run it. 127 = there was **no** command.

```bash
echo $?                      # exit status of the previous command (0–255)
let "var1 = 1/0"             # often 1 — catchall / divide by zero
Illegal_command              # 127 — not found
/dev/null                    # 126 — invoked, cannot execute
exit 3.14159                 # 128 — invalid argument to exit
exit -1                      # 255 — out of range
# Ctrl-C                     # 130 = 128 + 2 (SIGINT)
# kill -9 …                  # 137 = 128 + 9 (SIGKILL)
```

---

## 4. Special characters

A **special character** has a **meta-meaning** beyond the glyph. **`;`** separates commands. **`:`** is the null command (like `true`). Do not mix them up.

| Character | Meaning |
| --- | --- |
| `#` | comment to end of line (`#!` first line = sha-bang) |
| `;` | command separator; status of the line = **last** command |
| `;;` | end one `case` arm |
| `.` | source in **this** shell (space after the dot) |
| `./file` | path in the **current** directory (no space) |
| `""` | partial quoting — `$`, backticks, `\` still work |
| `''` | full quoting — everything literal |
| `,` | arithmetic: all run; **value is the last** |
| `\` | next char literal, or join lines if last on the line |
| `` ` ` `` | command substitution (same job as `$(…)`) |
| `:` | null command, status **0** |
| `$` | start expansion (`$HOME`, `$?`, `$1`, `$(…)`) |

**`.` vs `source`** — Same in Bash. `.` is POSIX. `source` is Bash-only.

```bash
# comment to end of line
echo a; echo b                          # two commands, one line
case "$x" in yes) echo ok ;; esac       # ;; ends this option
. ./lib.sh                              # source — this shell; vars stay
./script.sh                             # run file in the current directory
echo "$HOME"                            # partial: $ expands
echo '$HOME'                            # full: literal $HOME
echo \$HOME                             # next char literal
let "t2 = ((a = 9, 15 / 3))"            # comma: a=9, t2=5
echo `date`                             # backticks: output of date
:                                       # null command, status 0
echo $?                                 # value of a parameter
```

---

## 5. Variables

A variable is a **name for data in memory**, not the data itself. No spaces around `=`.

**`$var` vs `${var}`** — Same. Braces when glued to other text (`${var}s`, `${10}`).

**Indirect** — `var` holds the **name** `value`; `eval b=\$$var` → `$b` is the variable **named by** `$var`.

**Types** — Bash does **not** segregate by type. Values are **strings**. `declare` = **`typeset`**. `declare -i` → integer (`n=6/3` becomes `2`).

**`stringZ=abcABC123ABCabc`** (15 chars):

| Form | Job | Demo |
| --- | --- | --- |
| `${#var}` | length; on array **without** `[@]` = length of **element 0** | `15`; `arrayX=(a ab abc)` → `1` |
| `${var:pos:len}` | substring, **0-based** | `:2:5` → `cABC1` |
| `#` / `##` | shortest / longest strip from the **front** | `#a*C` → `123ABCabc` · `##a*C` → `abc` |
| `%` / `%%` | shortest / longest strip from the **back** | `%a*c` → `abcABC123ABC` · `%%b*c` → `a` |
| `/` / `//` | first / all replace (omit Replacement = delete) | `/abc/xyz` · `//abc/xyz` |
| `/#` / `/%` | replace only **prefix** / **suffix** | `/#abc/XYZ` · `/%abc/XYZ` |

Without `:` = only **unset**. With `:` = **unset or null**.

| Form | Job |
| --- | --- |
| `-` / `:-` | **use** default (do not assign) |
| `=` / `:=` | **write** default into the variable |
| `+` / `:+` | if set (or set and not empty) → alt |
| `?` / `:?` | missing → print err, **abort, status 1** |

**Kinds** — Local (`local` in a function) · environment (`export`) · positional (`$0` `$1` … `${10}` `$#` `"$*"` one word `"$@"` separate) · built-ins.

| Built-in | Meaning |
| --- | --- |
| `$?` | last status |
| `$$` | PID of this script |
| `$-` | `set` flags |
| `$_` | last argument of the previous command |
| `$!` | PID of last **background** job |
| `$*` | all positionals as **one** word |
| `$@` | all positionals as **separate** words |

Env to recite: `$EDITOR` `$HOME` `$HOSTNAME` `$IFS` `$PATH` `$RANDOM` (0–32767, not a constant).

**Arrays** — Zero-based. No max. Not necessarily contiguous. `${#arr}` = length of first element. `${#arr[@]}` = **element count**. Braces required: `${my_array[6]}`.

```bash
var=value
var2="one two three"                              # spaces kept (quoted)
var3=one\ two\ three                              # same, with backslashes
echo $var                                         # expand
echo ${var}                                       # same; needed next to other text
eval b=\$$var                                     # indirect: $b is the var named by $var
declare -i n                                      # typeset -i — treat as integer
n=6/3                                             # 2 only after declare -i
echo ${#var}                                      # length (array name: first element)
echo ${var:position:length}                       # substring, 0-based
echo ${var#Pattern}                               # shortest strip, front
echo ${var##Pattern}                              # longest strip, front
echo ${var%Pattern}                               # shortest strip, back
echo ${var%%Pattern}                              # longest strip, back
echo ${var/Pattern/Replacement}                   # first replace (omit = delete)
echo ${var//Pattern/Replacement}                  # all replaces
echo ${var/#Pattern/Replacement}                  # prefix only
echo ${var/%Pattern/Replacement}                  # suffix only
echo ${parameter-default}                         # unset → default
echo ${parameter:-default}                        # unset or null → default
filename=${1:-$DEFAULT_FILENAME}                  # missing $1 → generic.data
echo ${parameter=default}                         # unset → assign default
echo ${parameter:=default}                        # unset or null → assign default
echo ${parameter+alt_value}                       # set (even empty) → alt
echo ${parameter:+alt_value}                      # set and not empty → alt
: ${HOSTNAME?} ${USER?} ${MAIL?}                  # unset → abort, status 1
local var=$1                                      # function only
export MYVAR=value                                # children inherit
. ~/my_env_vars                                   # source into this shell
env                                               # list environment
echo $? $$ $- $_ $!                               # status, PID, flags, last arg, bg PID
my_array=( zero one two three four five )
my_array[6]=six                                   # now seven elements
declare -a new_array                              # declare an array
echo ${my_array[6]}                               # braces required
echo ${my_array[@]}                               # all elements
echo ${#my_array[@]}                              # element count (7)
```

---

## 6. Conditions

Six tools: `test`/`[ ]` · `[[ ]]` · `(( ))`/`let` · `if`/`then` · `case` · `&&`/`||`.

**`test` / `[ ]`** — Builtin (`[` = `test`). Status **0 = true**, **1 = false**. Need spaces: `[ -f file ]`.

**`[[ ]]`** — Keyword, one element. `&&` `||` `<` `>` legal **inside**. `[` still wants `-a` / `-o`. Unquoted spaces inside `[` → `too many arguments`.

**`(( ))` / `let`** — Arithmetic. Value **non-zero** → status **0**. Value **0** → status **1**.

**`if`** — Then-branch if a **list of commands** returns 0. Can test **any** command. Ends with **`fi`**.

**`case`** — Pattern match. Each arm ends **`;;`**. Statement ends **`esac`**.

**AND `&&`** — Next runs if previous was **true (0)**. First failure stops.  
**OR `||`** — Next runs if previous was **false**. First success stops.

| Expression | Meaning |
| --- | --- |
| `! EXPR` | negate |
| `EXPR1 -a EXPR2` | AND inside `[` |
| `EXPR1 -o EXPR2` | OR inside `[` |
| `-n STRING` | length nonzero |
| `-z STRING` | length zero |
| `-d FILE` | directory |
| `-f FILE` | regular file |
| `-w FILE` | writable |

```bash
test EXPRESSION                               # classic test
[ EXPRESSION ]                                # synonym for test
test -f file.txt && echo "File exists"        # true → run echo
[ -f file.txt ] && echo Indeed                # same
[ -f file1.txt ] || echo No such file         # false → run echo
[ $? -ne 0 ] && rc=1                          # last command failed → set rc
[[ $a -lt $b ]]                               # keyword; && || < > legal inside
[[ -n $string_with_spaces ]]                  # one test; [ would word-split
(( 0 && 1 )); echo $?                         # 1 — value 0 → status 1
if [ condition1 ]; then command1
elif [ condition2 ]; then command4
else default-command
fi                                            # if backwards
case EXPRESSION in
  case1) command1; command2 ;;                # ;; ends the arm
  *)     default ;;
esac                                          # case backwards
command-1 && command-2 && command-3           # AND: stop at first failure
command-1 || command-2 || command-3           # OR: stop at first success
```

---

## 7. Loops

Repeats a block while the **control condition is true**.

**`for`** — You already have a **list**. One pass per item.

**`while`** — Test at the **top**. Loop while **true (0)**. Count not known beforehand. Give the counter a starting value.

**`until`** — Opposite of `while`: body while **false**; stop when **true**.

**`break`** — Leave the loop.  
**`continue`** — Skip the rest of **this** pass.

`{1..5}` = `1 2 3 4 5`. `echo` then `break` at 3 prints `1 2 3`.

```bash
for arg in [list]; do
    command(s)...
done                                          # one pass per list item
for file in "$( find . -type l )"; do
    echo "$file"
done | sort                                   # symlinks, then sort the output
while [ condition ]; do
  command(s)...
done                                          # loop while true (status 0)
LIMIT=10
while [ "$a" -le $LIMIT ]; do
  echo -n "$a "                               # no newline
  let "a+=1"
done                                          # -le = ≤; give a a start value
until [ condition-is-true ]; do
    command(s)…
done                                          # loop while false; stop when true
break                                         # leave the loop
continue                                      # next item; skip rest of this pass
for i in {1..5}; do
  echo $i
  [[ $i -eq 3 ]] && break
done                                          # prints 1 2 3
```

---

## 8. Redirection

Three default files, each a **file descriptor**: stdin **0** · stdout **1** · stderr **2**. Extras **3–9** to save/restore.

**Redirect** — Send output of a file/command/block as input to another.

| Form | Meaning |
| --- | --- |
| `<file` | read on fd 0 (`n<` = fd n) |
| `>file` | write on fd 1; create or **truncate** |
| `>>file` | **append** on fd 1; create if missing |
| `&>file` | stdout **and** stderr (preferred; also `>&file`, `>file 2>&1`) |
| `2>&1` | send fd 2 wherever fd 1 currently goes |
| `2>` | errors only |

`java -version` writes on **stderr**: `> version` → file empty, banner on screen. `&> version` → both in the file.

**Pipe** — stdout of one → stdin of the next. `$PIPESTATUS` = array of each stage. `tee -a` = screen **and** append.

**Here document** — stdin until a line that is **only** the delimiter (no trailing blanks).  
**Here string** — `command <<< "$word"` (expanded) as stdin.

Special names: `/dev/stdin` `stdout` `stderr` · `/dev/fd/n` · `/dev/tcp/host/port` · `/dev/udp/host/port`. `n<>` = read+write on fd n.

`done < file` — the **whole loop** reads from that file.

```bash
grep search-word <filename          # stdin from file
ls -la > list_of_files.txt          # stdout → file (create or truncate)
: > filename                        # truncate to zero (null command)
echo one > file                     # overwrite
echo two >> file                    # append
&>filename                          # stdout + stderr
>filename 2>&1                      # same
java -version > version             # stderr still on screen; file empty
java -version &> version            # both in file
java -version 2> version            # stderr in file
ps aux &> /dev/null                 # throw everything away
cat *.txt | sort | uniq > result-file
echo ${PIPESTATUS[@]}               # status of each pipe stage
cat *.txt | tee -a result-file      # screen and append
cat <<EOF > unit.file
…lines…
EOF                                 # delimiter alone, no trailing blanks
grep -q "txt" <<< "$VAR"            # here string
cat </dev/tcp/time.nist.gov/13      # Bash TCP socket
exec 5<>/dev/tcp/www.tut.by/80      # fd 5 read+write
echo -e "GET / HTTP/1.0\n" >&5      # write to fd 5
cat <&5                             # read from fd 5
done < file                         # whole loop reads from file
```

---

## 9. Functions

A function is a **subroutine** — a black box for a repeating task. Inside: `$1` `$2` … like a script. `local` keeps names inside.

**Status** — `return n`, or the **last command**. The script reads **`$?`**.

**`return`** — Ends the **function**. Script **continues**.  
**`exit`** — Ends the **whole script**.

```bash
function_name () {
  command...
}                                           # define
function_name $arg1 $arg2                   # call; inside: $1 $2
print_args () {
  local var1=$1                             # visible only in the function
  local var2=$2
  echo "first function argument is:" $var1
  echo "second function argument is:" $var2
}
print_args /tmp hello                       # $1=/tmp  $2=hello
retfunc() { echo "this is retfunc()"; return 1; }   # function ends; script continues; $? is 1
exitfunc() { echo "this is exitfunc()"; exit 1; }   # whole script ends
```
