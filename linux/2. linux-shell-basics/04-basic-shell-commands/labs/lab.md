# Labs — Basic shell commands

**Where:** any Linux. Use `/tmp/cmd-lab` so you do not delete home files. Never `rm -rf` `/` or `$HOME`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1 — man

Open `man cat` and `man man`. Search manuals for the keyword `list`. Show the one-line description of `ls`. Open `man 5 passwd` and `man 1 ls`. Open `info cat` and leave it.

## Lab 2 — listing and movement

Use `ls` with long listing, hidden files, human sizes, newest first, and largest first. Use `pwd`, `cd /`, `cd ..`, `cd ~`, `cd -`.

## Lab 3 — create, copy, move, delete

In `/tmp/cmd-lab`: `touch` a file and one with `touch -d`. `mkdir` a single dir and a tree with `-p` and brace expansion `test{1..3}`. Copy a tree with `cp -r` and with `cp -rp`. Use `mv -b -S ".old"` once. Concatenate two files into a third with `cat`. Remove an empty dir with `rmdir`. Remove a file with `rm -v`. Skip `rm -rf` on anything you care about; if you try it, only on a disposable dir you just created.

## Lab 4 — environment

Dump the environment. Print `PATH`. Run a command with `env VAR=tmp`. `export` a variable, start a nested `bash`, see whether it is visible, `exit`, `unset` it.

## Lab 5 — viewing files

Page `/etc/passwd` with `more` and `less`. `head` / `tail` with default, `-n 5`, `head -n -2`, `tail -n +20` on a file you create. `tail -f` a log (`/var/log/messages` or `journalctl -f` if that file is missing) and stop with Ctrl-C.

Delete `/tmp/cmd-lab` when finished.

## Job and cert labs

## Lab 6

Ticket: “find what filled the disk.” From `/`, `du -xhd1` (or `du -sh *` in `/`), drill down until you find a fat directory. Do not delete `/var` blindly.

## Lab 7

Redirect a command’s stdout and stderr to a file (`>out 2>&1` or `&>`). Use `tee` so you see output and keep a copy. This is install-log style.

## Lab 8

Build a pipeline: `ls` / `find` → `sort` → `head`. Copy using `cp -a` so a config tree keeps mode and timestamps.

## Lab 9

Follow a log with `tail -f` while you `logger "lab-test"` or restart a service in another terminal.
