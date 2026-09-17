# Variables

Variables are how programming and scripting languages represent data. A variable is nothing more than a **label**, a name assigned to a location or set of locations in computer memory holding an item of data.

**Memory hook:** a variable is a **name for data in memory**, not the data itself.

## Assignment

```bash
var=value
var2="one two three"
var3=one\ two\ three
```

No spaces around `=`. `"one two three"` is **partial quoting** (one word, spaces kept). `one\ two\ three` is the same three words glued with **backslash** escapes.

**Memory hook:** `name=value`. Quotes or `\` if the value has spaces.

## Referencing a variable

```bash
echo $var
echo ${var}
```

`$var` and `${var}` both mean **the value**. Braces are required when the name would otherwise run into other characters (`${var}s`, `${10}`).

**Memory hook:** `$name` = value. `${name}` = same, safer next to other text.

## Indirect referencing

```bash
var=value
value=hello
eval b=\$$var
echo $b
```

`var` holds the **name** `value`. `value` holds `hello`. `eval b=\$$var` uses an extra `$` so Bash takes the **variable named by** `$var`. `$b` is `hello`.

**Memory hook:** `\$$var` + `eval` = “the variable whose **name** is in `var`.”

## Variable types

Bash does not segregate its variables by "type."

Essentially, Bash variables are **character strings**, but, depending on context, Bash permits **arithmetic operations and comparisons** on variables. The determining factor is whether the value of a variable contains **only digits**.

The **`declare`** or **`typeset`** built-ins, which are **exact synonyms**, permit modifying the properties of variables.

```bash
$ n=6/3
$ echo "n = $n"
n = 6/3

$ declare -i n
$ n=6/3
$ echo "n = $n"
n = 2
```

Without `-i`, `6/3` is the **string** `6/3`. After `declare -i n`, assignment is **integer** arithmetic: `6/3` → `2`.

**Memory hook:** default = string. `declare -i` / `typeset -i` = treat as integer. `declare` = `typeset`.

## Manipulating strings

Bash supports a surprising number of string manipulation operations.

Demo string used below:

```bash
$ stringZ=abcABC123ABCabc
```

Fifteen characters: `a b c A B C 1 2 3 A B C a b c`.

### `${#var}` — length

`${#var}` — `$var` length. For an array, `${#array}` is the length of the **first element** in the array.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${#stringZ}
15

$ arrayX=(a ab abc)
$ echo ${#arrayX}
1
```

`${#arrayX}` is `1` because the first element is `a` (one character), **not** because there are three elements. Element count is `${#array[@]}` (arrays section).

**Memory hook:** `#` inside `${}` = **how many characters**. On an array name **without** `[@]` = length of element **0**.

### `${var:position:length}` — substring

`${var:position:length}` — extracts `$length` characters of substring from `$var` at `$position`. **0-based** indexing.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${stringZ:2:5}
cABC1
```

Position `2` is `c`. Five characters: `c A B C 1`.

**Memory hook:** `${var:start:count}` — start at 0.

### `${var#Pattern}` / `${var##Pattern}` — strip from the **front**

`${var#Pattern}` — remove from `$var` the **shortest** part of `$pattern` that matches the **front** end of `$var`.

`${var##Pattern}` — remove from `$var` the **longest** part of `$pattern` that matches the **front** end of `$var`.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${stringZ#a*C}
123ABCabc
$ echo ${stringZ##a*C}
abc
```

`#` = shortest prefix `a*C` (`abcABC` gone). `##` = longest prefix `a*C` (through the later `C`, leftover `abc`).

**Memory hook:** `#` eats the **head**. One `#` shortest, two `##` greedy.

### `${var%Pattern}` / `${var%%Pattern}` — strip from the **back**

`${var%Pattern}` — deletes **shortest** match of `$Pattern` from **back** of `$var`.

`${var%%Pattern}` — deletes **longest** match of `$Pattern` from **back** of `$string`.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${stringZ%a*c}
abcABC123ABC
$ echo ${stringZ%%b*c}
a
```

**Memory hook:** `%` eats the **tail** (think percent-at-the-end). One `%` shortest, two `%%` greedy.

### `${var/Pattern/Replacement}` / `${var//Pattern/Replacement}` — replace

`${var/Pattern/Replacement}` — replace **first** match of `$Pattern` with `$Replacement`. If `$Replacement` is omitted, then the first match of `$Pattern` is replaced by nothing, that is, **deleted**.

`${var//Pattern/Replacement}` — replace **all** matches of `$Pattern` with `$Replacement`.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${stringZ/abc/xyz}
xyzABC123ABCabc
$ echo ${stringZ//abc/xyz}
xyzABC123ABCxyz

$ stringZ=abcABC123ABCabc
$ echo ${stringZ/abc}
ABC123ABCabc
$ echo ${stringZ//abc}
ABC123ABC
```

`ABC` is a different string from `abc` (case). `//` still only hits the two `abc` pieces.

**Memory hook:** one `/` = first match. two `//` = all. No replacement = **delete**.

### `${var/#Pattern/Replacement}` / `${var/%Pattern/Replacement}` — prefix / suffix replace

`${var/#Pattern/Replacement}` — if **prefix** of `$var` matches `$Pattern`, then substitute `$Replacement` for `$Pattern`.

`${var/%Pattern/Replacement}` — if **suffix** of `$var` matches `$Pattern`, then substitute `$Replacement` for `$Pattern`.

```bash
$ stringZ=abcABC123ABCabc
$ echo ${stringZ/#abc/XYZ}
XYZABC123ABCabc
$ echo ${stringZ/%abc/XYZ}
abcABC123ABCXYZ
```

**Memory hook:** `/#` = replace only at the **start**. `/%` = replace only at the **end**. (`#` head, `%` tail — same as strip.)

## Parameter substitution

### `${parameter-default}` / `${parameter:-default}` — use default if unset (or null)

`${parameter-default}`, `${parameter:-default}` — if `$parameter` **not set**, use **default**. `${parameter-default}` and `${parameter:-default}` are **almost equivalent**. The extra `:` makes a difference only when `$parameter` has been **declared, but is null**.

```bash
$ var1=1
$ var2=2
$ echo ${var1-$var2}
1
$ echo ${var3-$var2}
2
```

`var1` is set → `1`. `var3` is unset → default `$var2` → `2`.

```bash
$ var1=1
$ var3=           # declared but null
$ echo ${var3-$var1}

$ echo ${var3:-$var1}
1
```

`var3` is **declared but null**. `${var3-$var1}` does **not** use the default (empty line). `${var3:-$var1}` **does** → `1`.

The default parameter construct finds use in providing **"missing" command-line arguments** in scripts.

```bash
#!/bin/bash

DEFAULT_FILENAME=generic.data

# If not otherwise specified, the following command block operates on the
# file "generic.data".

filename=${1:-$DEFAULT_FILENAME}
...
```

If `$1` is missing or null, `filename` is `generic.data`.

**Memory hook:** `-` = “if missing, **use** this.” Extra `:` = also if **empty**.

### `${parameter=default}` / `${parameter:=default}` — set to default if unset (or null)

`${parameter=default}`, `${parameter:=default}` — if `$parameter` **not set**, **set it** to `$default`. Both forms nearly equivalent. The `:` makes a difference only when `$parameter` has been **declared and is null**.

```bash
$ varZ=
$ echo ${varZ=abc}

$ echo ${varZ:=abc}
abc
$ echo ${var=abc}
abc
$ echo ${var=xyz}
abc
```

`varZ` is **declared but null**. `${varZ=abc}` does not assign (empty). `${varZ:=abc}` assigns and prints `abc`. Unset `var` gets `abc`; `${var=xyz}` leaves `abc` because `var` is **already set**.

**Memory hook:** `=` = “if missing, **write** the default into the variable.” `:` again = also if empty.

### `${parameter+alt_value}` / `${parameter:+alt_value}` — alternative if set

`${parameter+alt_value}` and `${parameter:+alt_value}` allow you to substitute an **alternative value if a variable is set**.

`${parameter+alt_value}` — returns `alt_value` if the variable is **set, even if it is empty**.

`${parameter:+alt_value}` — returns `alt_value` **only if** the variable is **set and not empty**.

```bash
# Example with undefined parameter for ${parameter+alt_value}
$ a=${param_undefined+xyz}
$ echo "a = $a"
a = # because param_undefined is not defined at all

# Example with empty parameter for ${parameter+alt_value}
$ param1=
$ a=${param1+xyz}
$ echo "a = $a"
a = xyz # because param1 is set, even if empty

# Example with empty parameter for ${parameter:+alt_value}
$ param2=
$ a=${param2:+xyz}
$ echo "a = $a"
a = # because param2 is set, but empty

# Example with parameter with value for ${parameter:+alt_value}
$ param3=123
$ a=${param3:+xyz}
$ echo "a = $a"
a = xyz # because param3 is set and not empty
```

**Memory hook:** `+` = “if it **exists**, give me the **other** string.” `:` = must also be **non-empty**. Opposite job from `-`.

### `${parameter?err_msg}` / `${parameter:?err_msg}` — required, or abort

`${parameter?err_msg}`, `${parameter:?err_msg}` — if `$parameter` **set**, use it, else print `$err_msg` and **abort the script with an exit status of 1**. Both forms nearly equivalent. The `:` makes a difference only when parameter has been **declared and is null**.

```bash
#!/bin/bash

: ${HOSTNAME?} ${USER?} ${MAIL?}
echo "Name of the machine is $HOSTNAME."
echo "You are $USER."
echo "Your mail INBOX is located in $MAIL."
echo
echo "If you are reading this message,"
echo "critical environmental variables have been set."
echo
```

The `:` (null command) evaluates the substitutions for side effect: if any of `HOSTNAME`, `USER`, `MAIL` is unset, the script **dies with status 1** and the error message; you never reach the `echo`s.

**Memory hook:** `?` = “must be set or **die** (status 1).” `:` on `?` = empty counts as missing too.

**Colon cheat sheet for `-` `=` `+` `?`:** without `:` = only **unset**. with `:` = **unset or null**.

## Special variables types

- Local variables
- Environment variables
- Positional parameters
- Built-in variables

### Local variables

Variables visible only within a **code block or function**.

```bash
$ func() {
  local var=$1
  echo $var
}

$ echo $var
$ func Hello
Hello
```

`local var=$1` is **not** visible after the function. `echo $var` outside prints empty. `func Hello` prints `Hello`.

**Memory hook:** `local` = this function only. Without `local`, a name you set inside **leaks**.

### Environment variables

Variables that affect the behavior of the **shell and user interface**.

Environment variables can be set:

**system-wide:**

- `/etc/environment`

**for current session:**

```bash
export MYVAR=value
```

**for all sessions of a user:**

- `~/.bashrc`
- `~/.bash_profile`

**during script execution:**

```bash
#!/bin/bash

. ~/my_env_vars # or: source ~/my_env_vars
```

How to check current environment variables?

```bash
$ env
LC_ADDRESS=en_US.UTF-8
HOSTNAME=node1
LC_MONETARY=en_US.UTF-8
TERM=xterm-256color
SHELL=/bin/bash
HISTSIZE=1000
SSH_CLIENT=10.0.2.2 37896 22
LC_NUMERIC=en_US.UTF-8
SSH_TTY=/dev/pts/0
USER=vagrant
...
```

**Memory hook:** `export` = this session (and children). Files: `/etc/environment` (system), `~/.bashrc` / `~/.bash_profile` (user). In a script: `.` / `source` a file. List with `env`.

Course table of common environment / built-in names (the slide ends with `...` — more exist):

| Variable | Meaning |
| --- | --- |
| `$EDITOR` | The default editor invoked by a script, usually vi or emacs |
| `$HOME` | Home directory of the user, usually `/home/username` |
| `$HOSTNAME` | The `hostname` command assigns the system host name at bootup in an init script. |
| `$IFS` | internal field separator |
| `$PATH` | Path to binaries |
| `$RANDOM` | Internal Bash function (not a constant) that returns a pseudorandom integer in the range **0–32767** |
| `...` | `...` |

**Memory hook:** `PATH` = where binaries are. `HOME` = your directory. `RANDOM` = **new** number each time (0–32767), not a fixed constant. `IFS` = what splits words. `EDITOR` = vi/emacs default. `HOSTNAME` = machine name from boot/`hostname`.

### Positional parameters

Arguments passed to the script from the command line: `$0`, `$1`, `$2`, `$3` . . .

`$0` is the **name of the script itself**, `$1` is the **first** argument, `$2` the **second**, `$3` the **third**, and so forth.

After `$9`, the arguments must be enclosed in **brackets**, for example, `${10}`, `${11}`, `${12}`.

`$#` — **number** of command-line arguments or positional parameters.

The special variables `"$*"` and `"$@"` denote **all** the positional parameters.

```bash
#!/bin/bash

NUMBER=1

for arg in $@; do
  echo -e "argument #${NUMBER}: $arg";
  ((NUMBER++));
done
```

```text
$ bash script.sh 1 apple hello 4
argument #1: 1
argument #2: apple
argument #3: hello
argument #4: 4
```

`$0` is `script.sh` (or `bash` / the path used); the loop is over the **arguments**, not `$0`. `$#` here would be `4`.

**Memory hook:** `$0` = script name. `$1`… = args. After 9 → `${10}`. `$#` = how many args. `$*` / `$@` = all of them.

### Built-in variables / special shell variables

| Variable | Meaning |
| --- | --- |
| `$?` | Return value |
| `$$` | Process ID (PID) of script |
| `$-` | Flags passed to script (using `set`) |
| `$_` | Last argument of previous command |
| `$!` | Process ID (PID) of last job run in background |
| `$*` | All the positional parameters, as a **single** word |
| `$@` | All the positional parameters, as **separate** words |

**Memory hook:** `$?` status (exit codes topic). `$$` this PID. `$!` background PID. `$-` current `set` flags. `$_` previous command’s last arg. `"$*"` = one word; `"$@"` = each arg its own word.

## Arrays

An array is a variable containing **multiple values**. Any variable may be used as an array. There is **no maximum limit** to the size of an array, nor any requirement that member variables be indexed or assigned **contiguously**.

Arrays are **zero-based**: the first element is indexed with the number **0**.

```bash
$ my_array=( zero one two three four five )
```

Array elements may be initialized with the following notation:

```bash
$ my_array[6]=six
```

Alternatively, a script may introduce the entire array by an explicit statement:

```bash
$ declare -a new_array
```

To dereference (retrieve the contents of) an array element, use **curly bracket** notation:

```bash
$ echo ${my_array[6]}
six
```

Refer **all** array elements:

```bash
$ my_array=( zero one two three four five )
$ echo ${my_array[@]}
zero one two three four five six
$ echo ${my_array[*]}
zero one two three four five six
```

That listing includes **`six`** from `my_array[6]=six` in the same session (index 6, seventh slot). A **fresh** `my_array=( zero one two three four five )` alone is six words (`0`–`5`); assigning `[6]=six` makes seven.

Get the number of elements in array:

```bash
$ echo ${#my_array[@]}
7
$ echo ${#my_array[*]}
7
```

**Memory hook:** `( a b c )` = array. `[0]` first. `${arr[i]}` needs **braces**. `${arr[@]}` / `${arr[*]}` = all. `${#arr[@]}` = **how many elements**. `${#arr}` without `[@]` = length of **first element** (string section).
