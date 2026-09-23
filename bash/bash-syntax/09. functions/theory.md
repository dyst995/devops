# Functions

A function is a **subroutine**, a code block that implements a set of operations, a **"black box"** that performs a specified task. Wherever there is **repetitive code**, when a task repeats with only **slight variations** in procedure, then consider using a function.

```bash
function_name () {
  command...
}
```

Functions may process **arguments** passed to them and **return an exit status** to the script for further processing.

```bash
$ function_name $arg1 $arg2
```

The function refers to the passed arguments by **position** (as if they were **positional parameters**), that is, **`$1`**, **`$2`**, and so forth.

```bash
$ print_args () {
  local var1=$1
  local var2=$2
  echo "first function argument is:" $var1
  echo "second function argument is:" $var2
}

$ print_args /tmp hello
first function argument is: /tmp
second function argument is: hello
```

`print_args /tmp hello` → `$1` is `/tmp`, `$2` is `hello`. `local` keeps `var1` / `var2` **inside** the function (variables topic).

**Memory hook:** `name () { … }` = black box. Call: `name arg1 arg2`. Inside: `$1` `$2` like a script. Repeat with slight variation → function.

## Exit status

Functions return a value, called an **exit status**. This is analogous to the exit status returned by a command. The exit status may be **explicitly specified by a `return` statement**, otherwise it is the exit status of the **last command** in the function (**0** if successful, and a **non-zero** error code if not). This exit status may be used in the script by referencing it as **`$?`**.

**Memory hook:** function status = `return n`, or else **last command**. Read it with `$?` (same as any command).

## return

**Terminates a function.** A `return` command optionally takes an **integer** argument, which is returned to the calling script as the **"exit status"** of the function, and this exit status is assigned to the variable **`$?`**.

```bash
#!/bin/bash

retfunc() {
  echo "this is retfunc()"
  return 1
}

exitfunc() {
  echo "this is exitfunc()"
  exit 1
}

retfunc
echo "We are still here"

exitfunc
echo "We will never see this"
```

```text
$ ./func.sh
this is retfunc()
We are still here
this is exitfunc()
```

`return 1` ends **`retfunc` only** — the script prints **We are still here**. `exit 1` ends the **whole script** — **We will never see this** does not print.

**Memory hook:** `return` = leave the **function**. `exit` = leave the **script**. After `return 1`, `$?` is 1 and the next line still runs.
