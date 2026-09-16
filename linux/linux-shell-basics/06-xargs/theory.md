# 06 — xargs

**`xargs`** reads arguments from **standard input**, split on **blank spaces or newlines**, and runs a command using that input as the command’s **arguments**.

If you do not give a command, the default is **`/bin/echo`**.

```text
xargs [OPTIONS] [COMMAND [initial-arguments]]
```

This is the other half of [find](../05-filesystem-search/theory.md): `find` prints paths, `xargs` turns those lines into arguments.

**Memory hook:** stdin = a list of words. `xargs` stuffs those words onto the end of a command. No command → just `echo` them.

## From many lines to one line

```text
$ cat names.txt
one
two
three

$ cat names.txt | xargs
one two three
```

Default command is `echo`, so multiline input becomes a single echoed line.

## Placeholder: run a command per item

```text
$ cat names.txt | xargs -i touch {}
$ ls
names.txt  one  three  two
```

Equivalent (custom replace string instead of `{}`):

```text
$ cat names.txt | xargs -iT touch T
```

`-i` / `-I` means: do not dump every name as extra args on **one** `touch`. Replace the marker (`{}` or `T`) **once per input item** and run `touch` for each.

GNU `xargs` also has `-I {}` (preferred modern spelling of `-i`).

**Memory hook:** bare `xargs cmd` = one `cmd` with **many** args. `xargs -i cmd {}` = **one `cmd` per item**.

## `-0`, `--null`

Input items are terminated by a **null** byte instead of whitespace. Quotes and backslashes are **not** special — every character is literal.

Use this when names may contain **spaces, quotes, or backslashes**. Pair with `find … -print0`:

```bash
find /tmp -name core -type f -print0 | xargs -0 rm
```

**Memory hook:** spaces in filenames break default `xargs`. Null-safe pair: `find -print0` + `xargs -0`.

## `-P`, `--max-procs=max-procs`

Run up to **max-procs** processes at a time. Default is **1**. On a multicore CPU this can speed things up.

If **max-procs is 0**, `xargs` runs **as many processes as possible** at a time.

```bash
cat urls.txt | xargs -P 4 -I {} curl -O {}
```

**Memory hook:** `-P 4` = four at a time. `-P 0` = no cap (be careful).

More examples: [Tecmint xargs](https://www.tecmint.com/xargs-command-examples/) · [Linuxize xargs](https://linuxize.com/post/linux-xargs-command/)
