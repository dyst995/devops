# Script development and invocation

In the **simplest case**, a script is nothing more than a **list of system commands stored in a file**. At the very least, this saves the effort of **retyping** that particular sequence of commands each time it is invoked.

**Memory hook:** a script = commands you would type, saved so you do not type them again.

This sits on [what is a shell](../../intro/what-is-shell/theory.md): the shell **interprets** the file line by line. You are not compiling a binary.

## The sha-bang (`#!`)

The **sha-bang** (`#!`) at the **head** of a script tells your system that this file is a set of commands to be fed to the **command interpreter** indicated.

Immediately following the sha-bang is a **path name**. This is the path to the program that interprets the commands in the script, whether it be a **shell**, a **programming language**, or a **utility**.

The course spelling is **sha-bang**. Same idea as “shebang.” It must be the **first line**. The kernel reads those two characters, then the path.

```text
#!/bin/sh
#!/bin/bash
#!/usr/bin/perl
#!/usr/bin/env python
#!/bin/sed -f
#!/bin/awk -f
```

| Line | Interpreter |
| --- | --- |
| `#!/bin/sh` | Bourne / POSIX `sh` |
| `#!/bin/bash` | Bash |
| `#!/usr/bin/perl` | Perl |
| `#!/usr/bin/env python` | `python` **found on `PATH`** (`env` locates it) |
| `#!/bin/sed -f` | `sed`, `-f` = take the rest of the file as the program |
| `#!/bin/awk -f` | `awk`, same idea: file is the awk program |

**Memory hook:** `#!` + **absolute** interpreter (or `env` + name on `PATH`). Optional **arguments** after the path (`-f` for sed/awk).

`/usr/bin/env python` is used when `python` is not always at one path (pyenv, `/usr/bin/python3`, …). `env` searches `PATH` and execs the first `python`.

If there is **no** sha-bang, `./scriptname` still often works on Linux because the kernel may fall back to `/bin/sh` — do not rely on that. Put the line in. `sh scriptname` / `bash scriptname` **ignore** the sha-bang in the sense that **you** already picked the interpreter.

## Invoking the script

Having written the script, you can invoke it by:

```bash
sh scriptname
```

or alternatively:

```bash
bash scriptname
```

That feeds the file to `sh` or `bash` as a script. The file does **not** need to be executable. The shell you named is the interpreter, even if the sha-bang says something else.

Much more convenient is to make the script itself **directly executable** with a **`chmod`** and run it by **`./scriptname`**.

```bash
chmod +x scriptname
./scriptname
```

The `./` is required when the directory is not on `PATH` (the current directory usually is not). The kernel then uses the sha-bang to pick the interpreter.

**Memory hook:** `sh file` / `bash file` = you pick the shell, no execute bit needed. `chmod` + `./file` = file is a program; sha-bang picks the interpreter.

| How you run it | Execute bit? | Who interprets |
| --- | --- | --- |
| `sh scriptname` | No | `sh` |
| `bash scriptname` | No | `bash` |
| `./scriptname` | **Yes** (`chmod`) | Path after `#!` |
