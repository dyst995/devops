# Variables (study)

A variable is a **name for data in memory**, not the data itself.

## Assignment and reference

```bash
var=value
var2="one two three"      # partial quoting — one word, spaces kept
var3=one\ two\ three      # same, with backslash escapes
echo $var
echo ${var}               # same; needed next to other text: ${var}s, ${10}
```

No spaces around `=`.

**Indirect:** `var` holds the **name** `value`; `value` holds `hello`. `eval b=\$$var` then `$b` is `hello` — the variable **named by** `$var`.

## Types

Bash does **not** segregate variables by type. They are **character strings**; arithmetic is allowed when the value contains **only digits** (context).

`declare` and `typeset` are **exact synonyms**. They change properties:

```bash
n=6/3                     # string 6/3
declare -i n
n=6/3                     # integer arithmetic → 2
```

Default = string. `declare -i` / `typeset -i` = treat as integer.

## Strings (`stringZ=abcABC123ABCabc`, 15 chars)

| Form                          | Meaning                                                                                              | Demo result                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `${#var}`                     | length (characters). On an **array name without `[@]`** = length of **element 0**, not element count | `15`; `arrayX=(a ab abc)` → `${#arrayX}` is `1`         |
| `${var:position:length}`      | substring, **0-based**                                                                               | `${stringZ:2:5}` → `cABC1`                              |
| `${var#Pattern}`              | strip **shortest** match from the **front**                                                          | `#a*C` → `123ABCabc`                                    |
| `${var##Pattern}`             | strip **longest** match from the **front**                                                           | `##a*C` → `abc`                                         |
| `${var%Pattern}`              | strip **shortest** match from the **back**                                                           | `%a*c` → `abcABC123ABC`                                 |
| `${var%%Pattern}`             | strip **longest** match from the **back**                                                            | `%%b*c` → `a`                                           |
| `${var/Pattern/Replacement}`  | replace **first** match (`ABC` ≠ `abc`). Omit Replacement = **delete**                               | `/abc/xyz` → `xyzABC123ABCabc`; `/abc` → `ABC123ABCabc` |
| `${var//Pattern/Replacement}` | replace **all** matches                                                                              | `//abc/xyz` → `xyzABC123ABCxyz`; `//abc` → `ABC123ABC`  |
| `${var/#Pattern/Replacement}` | replace only if **prefix** matches                                                                   | `/#abc/XYZ` → `XYZABC123ABCabc`                         |
| `${var/%Pattern/Replacement}` | replace only if **suffix** matches                                                                   | `/%abc/XYZ` → `abcABC123ABCXYZ`                         |

`#` = head, `%` = tail. One = shortest, two = greedy. `/#` and `/%` = replace only at start / end.

Element count is `${#array[@]}` (arrays below), not `${#array}`.

## Parameter substitution

Without `:` = only **unset**. With `:` = **unset or null** (declared empty).

| Form                                             | Job                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------- |
| `${parameter-default}` / `${parameter:-default}` | if missing (or empty with `:`), **use** default — does not assign   |
| `${parameter=default}` / `${parameter:=default}` | if missing (or empty with `:`), **write** default into the variable |
| `${parameter+alt_value}`                         | if **set** (even empty) → alt; unset → empty                        |
| `${parameter:+alt_value}`                        | if **set and not empty** → alt                                      |
| `${parameter?err_msg}` / `${parameter:?err_msg}` | if set, use it; else print `err_msg` and **abort, status 1**        |

```bash
var1=1; var2=2
echo ${var1-$var2}        # 1
echo ${var3-$var2}        # 2  (var3 unset)

var3=
echo ${var3-$var1}        # empty — null does not trigger without :
echo ${var3:-$var1}       # 1

filename=${1:-$DEFAULT_FILENAME}   # missing/empty $1 → generic.data
```

```bash
varZ=
echo ${varZ=abc}          # empty — no assign
echo ${varZ:=abc}         # abc (assigned)
echo ${var=abc}           # abc (unset var)
echo ${var=xyz}           # abc — already set, leave it
```

`+` is the opposite job from `-`: “if it **exists**, give me the **other** string.”

```bash
a=${param_undefined+xyz}  # empty — not defined
param1=; a=${param1+xyz}  # xyz — set, even if empty
param2=; a=${param2:+xyz} # empty — set but empty
param3=123; a=${param3:+xyz}  # xyz
```

Required-or-die (null command evaluates for side effect):

```bash
: ${HOSTNAME?} ${USER?} ${MAIL?}
# if any unset → die status 1, never reach later echos
```

## Special variable kinds

**Local** — visible only in a **code block or function**. `local var=$1` is empty after the function. Without `local`, a name set inside **leaks**.

**Environment** — affect the shell and user interface.

| Where                       | How                                         |
| --------------------------- | ------------------------------------------- |
| System-wide                 | `/etc/environment`                          |
| This session (and children) | `export MYVAR=value`                        |
| All sessions of a user      | `~/.bashrc`, `~/.bash_profile`              |
| During a script             | `. ~/my_env_vars` or `source ~/my_env_vars` |

List with `env` (`HOSTNAME`, `USER`, `PATH`, `SHELL`, …).

| Name        | Meaning                                                         |
| ----------- | --------------------------------------------------------------- |
| `$EDITOR`   | Default editor a script invokes (usually vi or emacs)           |
| `$HOME`     | Home directory, usually `/home/username`                        |
| `$HOSTNAME` | Host name from boot / `hostname` (init script)                  |
| `$IFS`      | Internal field separator (what splits words)                    |
| `$PATH`     | Path to binaries                                                |
| `$RANDOM`   | New pseudorandom integer **0–32767** each time — not a constant |

**Positional:** `$0` = script name; `$1`, `$2`, `$3`, … = arguments. After `$9` use **`${10}`**, `${11}`. `$#` = how many arguments. `"$*"` and `"$@"` = all of them.

```bash
for arg in $@; do
  echo -e "argument #${NUMBER}: $arg"
  ((NUMBER++))
done
# bash script.sh 1 apple hello 4  →  four lines; $0 is not in the loop
```

**Built-ins:**

| Variable | Meaning                                         |
| -------- | ----------------------------------------------- |
| `$?`     | Return value (last status)                      |
| `$$`     | PID of this script                              |
| `$-`     | Flags from `set`                                |
| `$_`     | Last argument of the previous command           |
| `$!`     | PID of last **background** job                  |
| `$*`     | All positional parameters as a **single** word  |
| `$@`     | All positional parameters as **separate** words |

## Arrays

A variable with **multiple values**. Any variable may be used as an array. **No max size**; indexes need not be contiguous. **Zero-based**.

```bash
my_array=( zero one two three four five )   # 0–5
my_array[6]=six                             # now seven elements
declare -a new_array
echo ${my_array[6]}                         # braces required
echo ${my_array[@]}                         # all (also ${my_array[*]})
echo ${#my_array[@]}                        # 7  (also ${#my_array[*]})
```

A fresh `( zero … five )` is six words. Assigning `[6]=six` in the same session makes seven. `${#arr}` without `[@]` = length of the **first element**.
