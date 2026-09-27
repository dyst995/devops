# Bash recall — memorize this

Everything from the Bash notes that you need in your head. For each idea: a **plain English** line first, then a **compact recall** line (rules and flags only). One idea once. Review one module a day; Sunday do the whole file or the weak module.

| Day | Module |
| --- | --- |
| Monday | 1. Intro |
| Tuesday | 2. Script development · Options · Exit codes |
| Wednesday | 3. Special characters · Variables |
| Thursday | 4. Conditions · Loops |
| Friday | 5. Redirection · Functions |
| Saturday | 6. Style guide |
| Sunday | Full pass or weakest module |

---

## 1. Intro

**Shell** — A program that interprets your commands (typed or from a script) and asks the kernel to do the real work. Also builds your user environment (prompt, variables, aliases, umask).  
*Recall:* interpreter + environment. Kernel = OS. Resource files: `/etc/profile`, `~/.bash_profile`, `~/.bashrc`, …

**Interpreted, not compiled** — The shell reads a script line by line and runs each command. A compiled program is already a binary; the shell only starts it.  
*Recall:* script = recipe read as you go. Compiler = meal already cooked.

**`/etc/shells`** — List of valid **login** shells on this system. `chsh` only accepts paths listed here.  
*Recall:* `/bin/sh` · `/bin/bash` · `/bin/rbash` · `/bin/dash`. Not in the file → not a legal login shell.

**Nested vs login shell** — Typing `/bin/sh` starts a new shell **inside** the current one. `chsh -s …` changes the **login** shell in `/etc/passwd`.  
*Recall:* `ps --pid $$` = what am I? `exit` leaves the inner shell. `chsh` = next login.

```bash
cat /etc/shells              # valid login shells
echo $0                      # this process; leading - often = login
ps --pid $$                  # which program this shell is
/bin/sh                      # try another shell now (nested)
chsh -s /bin/bash            # permanent login shell (must be in /etc/shells)
```

**When to use shell** — Glue and small wrappers around other utilities. Not a general-purpose language.  
*Recall:* mostly calling other programs + little data work = OK.

**When to rewrite** — Performance matters, script > ~100 lines, non-straightforward control flow, script keeps growing, or others must maintain it.  
*Recall:* 100 lines or tricky flow → Python/Go **today**.

**Never use shell for** — Heavy CPU (sort/hash/recursion), typed structured apps, mission-critical/company-risk, security-sensitive work, real multi-dim arrays / data structures, GUIs, libraries/legacy, closed-source products (the file **is** the source).  
*Recall:* CPU, types, company risk, security, arrays/trees, GUI, libraries, secrecy → **not** shell.

**Startup files** — Which files Bash reads depends on **how** it started: interactive? login?  
*Recall:* login = profile family. Non-login = bashrc. Logout file only on the login path.

**Interactive login** (SSH, console, `su -`, `bash --login`) — Reads `/etc/profile`, then the **first readable** of `~/.bash_profile`, `~/.bash_login`, `~/.profile`. On logout: `~/.bash_logout`.  
*Recall:* system profile first, then **one** personal file. Typical contents: `PATH`, `umask`, exported env.

**Interactive non-login** (desktop terminal icon) — Reads **only** `~/.bashrc`.  
*Recall:* GUI terminal = bashrc, not profile.

**Bridge** — Login shells skip `.bashrc` unless you source it from `.bash_profile`.  
*Recall:* `.bash_profile` = door; `.bashrc` = furniture. Door should open onto the room.

```bash
# ~/.bash_profile
if [ -f ~/.bashrc ]; then
  . ~/.bashrc                # same as: source ~/.bashrc
fi
echo $0                      # leading - often means login: -bash
shopt login_shell            # on or off
```

---

## 2. Script development · Options · Exit codes

### Script development and invocation

**Script** — A list of system commands in a file so you do not retype them. The shell **interprets** line by line. Not a compiled binary.  
*Recall:* text recipe; shell cooks each line.

**Sha-bang (`#!`)** — Must be **line 1**. Kernel reads `#!`, then the interpreter path. Optional arguments after the path (`-f` for sed/awk). Course spelling: sha-bang.  
*Recall:* line 1 only. Path after `#!`.

**`/usr/bin/env python`** — `env` finds `python` on `PATH` (pyenv, `/usr/bin/python3`, …).  
*Recall:* portable interpreter lookup via PATH.

**No sha-bang** — `./script` may fall back to `/bin/sh`. **Do not rely on that.**  
*Recall:* always write a sha-bang.

**`sh` / `bash` scriptname** — **You** pick the interpreter. Sha-bang ignored. No execute bit needed.  
*Recall:* explicit interpreter; +x not required.

**`chmod +x` then `./scriptname`** — Kernel uses the sha-bang path. `./` is required when the directory is not on `PATH` (cwd usually is not).  
*Recall:* +x + `./` → kernel follows `#!`.

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

### Bash options

**Options** — Settings that change shell and/or script behavior from the point they are set.  
*Recall:* `set -o name` = `set -abbrev`. `-` = on. `+` = off.

**`verbose` / `-v`** — Print each command **as the script reads it**. Useful while learning; noisy in production.  
*Recall:* `-v` / `+v` · `-o verbose` / `+o verbose`.

**`errexit` / `-e`** — First failed command **ends the script**. Default is **`+e`**: the error prints, later lines still run. You can `set -e` for a sensitive block, then `set +e`.  
*Recall:* `-e` abort on failure. `+e` keep going.

```bash
set -o verbose               # enable option by name
set -v                       # same; short form
set +o verbose               # disable that option
set +v                       # same; short form
set -e                       # exit when a command fails (errexit)
set -o errexit               # same as -e
set +e                       # default: keep going after a failure
```

### Exit codes

**Exit status** — Every command/script ends with an integer **0–255**. **0** = success; **non-zero** = failure. Last status is **`$?`**. Read it **immediately** — the next command overwrites it.  
*Recall:* 0 OK · nonzero fail · `$?` right away.

**`exit`** — Takes integers **0–255** only (a byte). No negatives, no fractions.  
*Recall:* byte only; bad args → 128 or 255.

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

**126 vs 127** — 126 = you **found** it but cannot run it. 127 = there was **no** command.  
*Recall:* found-but-blocked vs missing.

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

## 3. Special characters · Variables

### Special characters

**Special character** — Has a **meta-meaning** beyond the glyph. **`;`** separates commands. **`:`** is the null command (like `true`). Do not mix them up.  
*Recall:* `;` = separator · `:` = null (status 0).

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

**`.` vs `source`** — Same in Bash. `.` is POSIX. `source` is Bash-only (`/bin/sh` is often dash → `source: not found`). Prefer `.` in profiles and portable scripts.  
*Recall:* `. file` (space) = source. `./file` (no space) = run.

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

### Variables

**Variable** — A **name for data in memory**, not the data itself. No spaces around `=`.  
*Recall:* `KEY=value`. Case-sensitive. Shell-only until `export`.

**`$var` vs `${var}`** — Same. Braces when glued to other text (`${var}s`, `${10}`).  
*Recall:* braces for glue and multi-digit positionals.

**Indirect** — `var` holds the **name** `value`; `eval b=\$$var` → `$b` is the variable **named by** `$var`.  
*Recall:* name-of-a-name via `eval`.

**Types** — Bash does **not** segregate by type. Values are **strings**. `declare` = **`typeset`**. `declare -i` → integer (`n=6/3` becomes `2`).  
*Recall:* everything is a string unless `declare -i`.

**`stringZ=abcABC123ABCabc`** (15 chars) — parameter expansions to recite:

| Form | Job | Demo |
| --- | --- | --- |
| `${#var}` | length; on array **without** `[@]` = length of **element 0** | `15`; `arrayX=(a ab abc)` → `1` |
| `${var:pos:len}` | substring, **0-based** | `:2:5` → `cABC1` |
| `#` / `##` | shortest / longest strip from the **front** | `#a*C` → `123ABCabc` · `##a*C` → `abc` |
| `%` / `%%` | shortest / longest strip from the **back** | `%a*c` → `abcABC123ABC` · `%%b*c` → `a` |
| `/` / `//` | first / all replace (omit Replacement = delete) | `/abc/xyz` · `//abc/xyz` |
| `/#` / `/%` | replace only **prefix** / **suffix** | `/#abc/XYZ` · `/%abc/XYZ` |

**Defaults** — Without `:` = only **unset**. With `:` = **unset or null**.

| Form | Job |
| --- | --- |
| `-` / `:-` | **use** default (do not assign) |
| `=` / `:=` | **write** default into the variable |
| `+` / `:+` | if set (or set and not empty) → alt |
| `?` / `:?` | missing → print err, **abort, status 1** |

**Kinds** — Local (`local` in a function) · environment (`export`) · positional (`$0` `$1` … `${10}` `$#` `"$*"` one word `"$@"` separate) · built-ins.  
*Recall:* `"$@"` = separate words. `"$*"` = one word.

| Built-in | Meaning |
| --- | --- |
| `$?` | last status |
| `$$` | PID of this script |
| `$-` | `set` flags |
| `$_` | last argument of the previous command |
| `$!` | PID of last **background** job |

Env to recite: `$EDITOR` `$HOME` `$HOSTNAME` `$IFS` `$PATH` `$RANDOM` (0–32767, not a constant).

**Arrays** — Zero-based. No max. Not necessarily contiguous. `${#arr}` = length of first element. `${#arr[@]}` = **element count**. Braces required: `${my_array[6]}`.  
*Recall:* `${#arr[@]}` = count · `${#arr}` = length of `[0]`.

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

## 4. Conditions · Loops

### Conditions

Six tools: `test`/`[ ]` · `[[ ]]` · `(( ))`/`let` · `if`/`then` · `case` · `&&`/`||`.

**`test` / `[ ]`** — Builtin (`[` = `test`). Status **0 = true**, **1 = false**. Need spaces: `[ -f file ]`.  
*Recall:* spaces required. Unquoted spaces → `too many arguments`.

**`[[ ]]`** — Keyword, one element. `&&` `||` `<` `>` legal **inside**. `[` still wants `-a` / `-o`.  
*Recall:* `[[ ]]` = modern; safer with spaces in strings.

**`(( ))` / `let`** — Arithmetic. Value **non-zero** → status **0**. Value **0** → status **1**.  
*Recall:* opposite of C boolean for status: 0 value → failed status.

**`if`** — Then-branch if a **list of commands** returns 0. Can test **any** command. Ends with **`fi`**.  
*Recall:* any command as test · `fi` closes.

**`case`** — Pattern match. Each arm ends **`;;`**. Statement ends **`esac`**.  
*Recall:* `;;` · `esac`.

**AND `&&`** — Next runs if previous was **true (0)**. First failure stops.  
**OR `||`** — Next runs if previous was **false**. First success stops.  
*Recall:* `&&` short-circuit on fail · `||` on success.

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

### Loops

**Loop** — Repeats a block while the **control condition is true**.  
*Recall:* `for` = known list · `while` = unknown count · `until` = opposite of while.

**`for`** — You already have a **list**. One pass per item.  
*Recall:* `for x in list; do …; done`

**`while`** — Test at the **top**. Loop while **true (0)**. Count not known beforehand. Give the counter a starting value.  
*Recall:* while true → body.

**`until`** — Opposite of `while`: body while **false**; stop when **true**.  
*Recall:* until success → stop.

**`break`** — Leave the loop.  
**`continue`** — Skip the rest of **this** pass.  
*Recall:* break = exit loop · continue = next item.

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

## 5. Redirection · Functions

### Redirection

**File descriptors** — Three defaults: stdin **0** · stdout **1** · stderr **2**. Extras **3–9** to save/restore.  
*Recall:* 0 in · 1 out · 2 err.

**Redirect** — Send output of a file/command/block as input to another.

| Form | Meaning |
| --- | --- |
| `<file` | read on fd 0 (`n<` = fd n) |
| `>file` | write on fd 1; create or **truncate** |
| `>>file` | **append** on fd 1; create if missing |
| `&>file` | stdout **and** stderr (preferred; also `>&file`, `>file 2>&1`) |
| `2>&1` | send fd 2 wherever fd 1 currently goes |
| `2>` | errors only |

**Classic trap** — `java -version` writes on **stderr**: `> version` → file empty, banner on screen. `&> version` → both in the file.  
*Recall:* stderr-only tools need `2>` or `&>`.

**Pipe** — stdout of one → stdin of the next. `$PIPESTATUS` = array of each stage. `tee -a` = screen **and** append.  
*Recall:* `|` · `PIPESTATUS` · `tee`.

**Here document** — stdin until a line that is **only** the delimiter (no trailing blanks).  
**Here string** — `command <<< "$word"` (expanded) as stdin.  
*Recall:* `<<EOF` … `EOF` · `<<< "$word"`.

Special names: `/dev/stdin` `stdout` `stderr` · `/dev/fd/n` · `/dev/tcp/host/port` · `/dev/udp/host/port`. `n<>` = read+write on fd n. `done < file` — the **whole loop** reads from that file.

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

### Functions

**Function** — A **subroutine**: a black box for a repeating task. Inside: `$1` `$2` … like a script. `local` keeps names inside.  
*Recall:* call by name · args as positionals · `local` for scope.

**Status** — `return n`, or the **last command**. The script reads **`$?`**.  
*Recall:* function status → `$?`.

**`return`** — Ends the **function**. Script **continues**.  
**`exit`** — Ends the **whole script**.  
*Recall:* return = leave function · exit = kill script.

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

---

## 6. Style guide

### STDOUT vs STDERR

**Errors go to stderr** — So you can separate normal status (stdout) from issues (stderr): `script >out.txt 2>err.txt`.  
*Recall:* errors → `>&2`. Status → stdout. One `err` helper, then `exit 1`.

```bash
err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}
if ! do_something; then
  err "Unable to do_something"
  exit 1
fi
```

### Comments

**Four kinds** — File header, function, implementation, TODO. Someone else should learn the program from comments and `--help` without reading the code.  
*Recall:* header · function API · surprising lines · `TODO(you):`.

**File header** — Sha-bang line 1, then a top-level `#` overview of what the file does.  
*Recall:* `#!` then `# what this file does`.

**Function comments** — Any non-obvious function (and **every** library function) gets Description · Globals · Arguments · Outputs · Returns.  
*Recall:* banner `#######` · API fields · libraries always.

**Implementation** — Comment tricky/surprising parts only — not every `i=0`.  
*Recall:* comment the surprising line.

**TODO** — `# TODO(name):` temporary or imperfect code. Searchable; not a promise that person will fix it.  
*Recall:* `# TODO(you):` what is missing.

### Formatting and quoting

**Indentation** — **2 spaces**. **No tabs**. Keep existing files’ style.  
*Recall:* two spaces. Never tab.

**Line length** — Max **80** columns. Long strings: here document or embedded newline.  
*Recall:* 80 cols · `<<END` or real newline in `"…"`.

**Pipelines** — Short = one line. Long = one segment per line, `\` then `  | next`. Same for `||` / `&&`.  
*Recall:* short one line · long = `\` + indented `|`.

**Loops / if** — `; do` and `; then` on the **same** line as `while`/`for`/`if`. `else` / `fi` / `done` alone, aligned with opener. Prefer `local` for loop vars inside functions.  
*Recall:* `if …; then` · `for …; do` · closers alone.

**Case** — Indent arms 2 spaces. One-liner: space after `)` and before `;;`. Long arms: pattern / actions / `;;` on separate lines. No `;&` / `;;&`.  
*Recall:* `a) cmd ;;` · long = three lines · no `;&`.

**Variable expansion** — Stay consistent · **quote** variables · don’t brace single-char specials/positionals unless needed · brace **named** vars.  
*Recall:* `"$1"` · `${10}` · `${1}0` · `"${PATH}"`.

**Quoting** — Quote strings with variables, substitutions, spaces, or meta chars. Prefer `"${FLAGS[@]}"` for lists. Prefer `"$@"`. Single quotes = no expansion; double = expansion OK.  
*Recall:* quote · `"$@"` · arrays for flags · never quote bare integers as a rule.

### Function names

**Naming** — Lower-case with underscores. Libraries: `package::func`. Parentheses required. Keyword `function` optional but **consistent** in a project.  
*Recall:* `snake_case()` · `lib::snake_case()` · same `function` style everywhere or nowhere.

```bash
my_func() { … }
mypackage::my_func() { … }
```

### Return values and builtins

**Always check return values** — Informative errors on stderr. Prefer `if ! cmd` or `(( $? != 0 ))`.  
*Recall:* `if ! cmd` · error on `>&2` · `exit 1`.

**Pipes** — `$PIPESTATUS` is an array of each stage. Copy it **immediately** — the next command (even `[`) overwrites it.  
*Recall:* `return_codes=( "${PIPESTATUS[@]}" )` before anything else.

**Prefer builtins** — Parameter expansion and `$(( ))` over `sed` / `expr` / extra processes.  
*Recall:* `$(( X + Y ))` not `expr`. `${string/#foo/bar}` not `sed`.
