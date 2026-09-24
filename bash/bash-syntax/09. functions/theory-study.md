# Functions (study)

A function is a **subroutine** — a **black box** for a task. Use one when code **repeats** with only **slight variations**.

```bash
function_name () {
  command...
}

function_name $arg1 $arg2
```

Inside, arguments are **positional parameters**: `$1`, `$2`, … — same idea as a script.

```bash
print_args () {
  local var1=$1
  local var2=$2
  echo "first function argument is:" $var1
  echo "second function argument is:" $var2
}
print_args /tmp hello
# $1=/tmp  $2=hello
```

`local` keeps names **inside** the function (variables topic).

## Exit status

A function returns an **exit status**, like a command. Explicitly: **`return n`**. Otherwise: status of the **last command** in the function (**0** if successful, non-zero if not). The script reads it as **`$?`**.

## `return` vs `exit`

**`return`** terminates the **function**. Optional integer becomes the function’s status in `$?`. The **script continues**.

**`exit`** terminates the **whole script**.

```bash
retfunc() { echo "this is retfunc()"; return 1; }
exitfunc() { echo "this is exitfunc()"; exit 1; }

retfunc
echo "We are still here"     # prints; $? from retfunc is 1
exitfunc
echo "We will never see this"  # does not print
```
