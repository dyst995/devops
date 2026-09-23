# Conditions

In terms of conditions bash has:

- **test** command or square brackets **`[ ]`**
- **extended test** command **`[[ ]]`**
- **double parentheses** **`(( ))`** and **`let`** command
- **if/then** construct
- **case** statements
- **list** constructs

**Memory hook:** six tools. `[` / `test` = classic. `[[` = safer keyword. `((` / `let` = arithmetic. `if` / `case` = structure. `&&` / `||` = lists.

## test command

`[` (left bracket special character) is a **synonym for `test`**, and a **built-in** for efficiency reasons.

This command considers its arguments as **comparison expressions or file tests** and returns an **exit status** corresponding to the result of the comparison (**0 for true, 1 for false**).

```text
test EXPRESSION

[ EXPRESSION ]
```

```bash
$ ls
file.txt

$ test -f file.txt && echo "File exists"
File exists

$ [ -f file.txt ] && echo Indeed
Indeed

$ [ -f file1.txt ] || echo No such file
No such file
```

`test -f` / `[ -f … ]` — regular file exists. `&&` runs the echo only if that test is **true (0)**. `||` runs the echo only if the test is **false (1)** (`file1.txt` missing).

**Memory hook:** `[` is `test`. Close with `]`. Status **0 = true**, **1 = false** (same as command success/fail). Spaces inside the brackets: `[ -f file.txt ]`.

### Checking exit status of a command in a script

(The slide wording is “exist status”; the code is **exit** status — `$?`.)

```bash
#!/bin/bash

...
ifup eth0
[ $? -ne 0 ] && rc=1
```

`ifup eth0` runs. If its status is **not** 0, set `rc=1`.

**Memory hook:** `[ $? -ne 0 ] && …` = “if the last command **failed**, do this.”

### TEST COMMAND EXPRESSIONS

| Expression | Meaning |
| --- | --- |
| `( EXPRESSION )` | EXPRESSION is true |
| `! EXPRESSION` | EXPRESSION is false |
| `EXPRESSION1 -a EXPRESSION2` | AND |
| `EXPRESSION1 -o EXPRESSION2` | OR |
| `-n STRING` | the length of STRING is **nonzero** |
| `-z STRING` | the length of STRING is **zero** |
| `-d FILE` | FILE exists and is a **directory** |
| `-f FILE` | FILE exists and is a **regular file** |
| `-w FILE` | FILE exists and **write permission** is granted |

**Memory hook:** `-n` = non-empty string. `-z` = empty (zero length). `-d` directory, `-f` file, `-w` writable. `-a` and / `-o` or **inside** `test`/`[ ]`. `!` negates. `( )` groups (often `\(` `\)` with `[`).

## Extended test command

With version **2.02**, Bash introduced the **`[[ ... ]]`** extended test command, which performs comparisons in a manner more familiar to programmers from other languages. Note that **`[[` is a keyword, not a command**. Bash sees `[[ $a -lt $b ]]` as a **single element**, which returns an exit status.

Using the `[[ ... ]]` test construct, rather than `[ ... ]` can **prevent many logic errors** in scripts. For example, the **`&&`**, **`||`**, **`<`**, and **`>`** operators work within a `[[ ]]` test, despite giving an **error** within a `[ ]` construct.

```bash
$ string_with_spaces='some spaces here'
$ if [[ -n $string_with_spaces ]]; then
    echo "The string is non-empty";
  fi

The string is non-empty
```

```bash
$ if [ -n $string_with_spaces ]; then
> echo "The string is non-empty";
> fi

-bash: [: too many arguments
```

`[ -n $string_with_spaces ]` **word-splits** the value into `some` `spaces` `here` — too many arguments. `[[ -n $string_with_spaces ]]` treats it as **one** test.

**Memory hook:** `[[` = keyword, one element. Safer with spaces. `&&` `||` `<` `>` belong **inside** `[[ ]]`, not `[ ]`. `[` still wants `-a` / `-o`.

## Double parentheses

The **`(( ... ))`** and **`let ...`** constructs return an exit status, according to whether the arithmetic expressions they evaluate expand to a **non-zero** value.

If the value of the expression is **non-zero**, the return status is **0**; otherwise the return status is **1**.

These arithmetic-expansion constructs may therefore be used to perform **arithmetic comparisons**.

```bash
$ (( 0 && 1 ))
$ echo $?
1

$ var=-2 && (( var+=2 ))
$ echo $?
1
```

`0 && 1` is **0** in arithmetic → status **1** (false). `var+=2` from `-2` is **0** → status **1**.

For arithmetic expressions see **`man bash`** “**ARITHMETIC EVALUATION**” section.

**Memory hook:** `(( ))` / `let` = math. Non-zero **value** → exit **0** (true). Zero **value** → exit **1** (false). Opposite of the number you just computed.

## if/then

An **if/then** construct tests whether the **exit status of a list of commands is 0** (since 0 means "success" by UNIX convention), and if so, executes one or more commands.

An `if` can test **any command**, not just conditions enclosed within brackets.

Syntax:

```bash
if [ condition1 ]; then
  command1
  command2
elif [ condition2 ]; then
  command4
  command5
else
  default-command
fi
```

**Memory hook:** `if` … `then` … `elif` … `else` … `fi`. `fi` is `if` backwards. Status 0 → then-branch.

Example (`/etc/init.d/network`):

```bash
...
rootfs=$(awk '{ if ($1 !~ /^[ \t]*#/ && $2 == "/" && $3 != "rootfs") { print $3; }}' /proc/mounts)
if [[ "$rootfs" == nfs* || "$rootopts" =~ _r?netdev ]] ; then
        exit 1
fi
...
if [ ! -d /proc/net/vlan ] && ! modprobe 8021q >/dev/null 2>&1 ; then
        net_log $"No 802.1Q VLAN support available in kernel."
fi
...
```

First `if`: `[[ ]]` with `== nfs*` (pattern) **or** `=~` regex on `$rootopts` — then `exit 1`.

Second `if`: `[ ! -d /proc/net/vlan ]` (not a directory) **and** `modprobe 8021q` fails — then log. `if` here tests a **list**, not only brackets (`&&` joins the test and `modprobe`).

## case

```bash
case EXPRESSION in
  case1)
    command1;
    command2;
  ;;
  case2)
    command3
  ;;
  …
  caseN)
    commandM
  ;;
esac
```

Each case is an expression matching a **pattern**. Each clause must be terminated with **`;;`**. Each case statement is ended with the **`esac`** statement.

**Memory hook:** `case` / `in` / `)` / `;;` / `esac`. `esac` is `case` backwards. `;;` from special characters.

### Init script example

```bash
case "$1" in
        start)
            start
            ;;

        stop)
            stop
            ;;
        condrestart)
            if test "x`pidof anacron`" != x; then
                stop
                start
            fi
            ;;
        *)
            echo $"Usage: $0 {start|stop|restart|condrestart|status}"
            exit 1
esac
```

`$1` selects the action. `*` is the default (wrong argument → usage, `exit 1`). `condrestart` uses **`test`** on whether `pidof anacron` printed a PID (`x…` vs `x`).

### Bash script with arguments example

```bash
#!/bin/bash

set -euo pipefail

MESSAGE=""
COUNT=5

help() {
  echo -e "\nUsage: $0 [OPTION]";
  echo "";
  echo -e "\t-m\tmessage to print"
  echo -e "\t-n\tnumber of messages to print. Default 5"
  echo -e "\t-h\tget help"
}

[[ -z "$@" ]] && help && exit 1;

for arg in "$@"; do
  case $arg in
    -m) MESSAGE=$2;
      shift;
      shift;
      ;;
    -n) COUNT=$2;
      shift;
      shift;
      ;;
    -h) help; exit 0;
      ;;
  esac
done

for i in $(seq 1 $COUNT); do
  echo $MESSAGE;
done
```

```text
$ ./args.sh
Usage: ./args.sh [OPTION]
    -m    message to print
    -n    number of messages to print. Default 5
    -h    get help

$ ./args.sh -m Hello
Hello
Hello
Hello
Hello
Hello

$ ./args.sh -m Hi -n 1
Hi
```

No arguments: `[[ -z "$@" ]]` is true → `help` and `exit 1`. `-m Hello` sets the message, default **5** prints. `-n 1` prints once. `set -euo pipefail` is errexit / unset nounset / pipefail (options topic + extras).

**Memory hook:** empty `"$@"` → help. `-m` / `-n` / `-h` in `case`. Default `COUNT=5`.

## List constructs

The **"and list"** and **"or list"** constructs provide a means of processing a number of commands **consecutively**.

These can effectively **replace complex nested if/then or even case** statements.

### AND list

Each command executes in turn, provided that the previous command has given a return value of **true (zero)**. At the first **false (non-zero)** return, the command chain **terminates** (the first command returning false is the last one to execute).

```bash
$ command-1 && command-2 && command-3 && ... command-n
```

**Memory hook:** `&&` = keep going while **success**. First failure **stops** the chain.

### OR list

Each command executes in turn for as long as the previous command returns **false**. At the first **true** return, the command chain **terminates** (the first command returning true is the last one to execute).

```bash
$ command-1 || command-2 || command-3 || ... command-n
```

**Memory hook:** `||` = keep going while **failure**. First success **stops** the chain. (`[ -f file1.txt ] || echo No such file` from the test section.)
