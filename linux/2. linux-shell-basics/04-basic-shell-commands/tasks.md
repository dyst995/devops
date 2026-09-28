# Tasks — Basic shell commands

Close `theory.md` / `commands.md`. Work in `/tmp/basic-shell-commands-tasks`. Do not destroy `$HOME`. Never `rm -rf /`. Do the action or write the answer, then check yourself.

## Manuals

1. Open the full manual for `cat` (`man cat`). Open the manual of the manual program itself (`man man`). Quit with `q`.
2. Search manuals by keyword `list` (`man -k list`). Show the one-line description of `ls` (`man -f ls`).
3. Open section **5** of passwd (`man 5 passwd`) vs section **1** of `ls` (`man 1 ls`). Why are the section numbers different? Recite sections 1, 2, 3, 5, 8 from the notes.
4. Open the GNU info page for `cat`, then for info itself (`info cat`, `info info`). Prefer `man` as the DevOps default — when would you still try `info`?
5. Inside `man`, practice: move with arrows or `j`/`k`, search with `/pattern`, quit with `q`.

## Where am I / listing

6. Print the full path of the current directory (`pwd`).
7. Go to `/`, then parent (`..`), then home (`~` or bare `cd`), then previous directory (`cd -`) and see it printed. Toggle `cd -` twice.
8. From memory: what is `$CDPATH`? When is it **ignored** (absolute path starting with `/`)?
9. Long listing **with hidden files** (`ls -la`). Long listing **human sizes** (`ls -lh`). Long listing **newest first** (`ls -lt`). Long listing **largest first** with human sizes (`ls -lSh`).

## Create / copy / move / delete

10. Create an empty file with `touch`. Update its timestamp from a date string like `"next Friday"` (`touch -d`). Confirm with `ls -l`.
11. Create one directory with bare `mkdir` (should fail if parents missing — try a nested path without `-p` and note the error).
12. Create a tree with parents as needed and brace expansion: `mkdir -p dir/test{1..3}/empty`. Confirm with `tree` or `find`/`ls -R`.
13. Create a directory with an explicit mode (`mkdir -m MODE …`).
14. Copy a tree (`cp -r`). Copy a tree **keeping** mode/owner/timestamps (`cp -rp`).
15. Move a file so an overwritten destination is backed up with suffix `.old` (`mv -b -S ".old" …`). Confirm the `.old` file.
16. Move only if source is newer or dest missing (`mv -u`). Demonstrate both “moved” and “skipped.”
17. Concatenate two files into a third (`cat 1.txt 2.txt > 3.txt`). Also `cat` a single file to the terminal.
18. Remove an **empty** directory only (`rmdir`). Delete a file verbosely (`rm -v`). Recursively force-delete **only** a disposable dir you created under `/tmp/basic-shell-commands-tasks` (`rm -rfv` — never `/` or `$HOME`).
19. Overwrite a throwaway file so recovery is harder (`shred`). Confirm you only shredded a disposable path.

## Environment variables

20. Dump all exported variables (`printenv` and `env`). Print `PATH` alone (`printenv PATH`).
21. Run a script (or `true`/`printenv`) with a variable set only for that command (`env VAR=tmp ./myscript` or `VAR=tmp command`). Prove your shell is unchanged.
22. Export an editor variable so children see it (`export EDITOR=vim`); start a nested shell; print it; `unset` it; confirm the child you start next no longer sees it.
23. Page through the huge dump of shell vars + env + functions (`set | less`). How does `set` differ from `env`/`printenv` in idea?

## Viewing files

24. Page a file **forward only** (`more`). Page both ways with search (`less`); use `/pattern`, `n`/`N`, `q`.
25. First 10 lines of `/etc/passwd` (`head`); first 5 (`head -n 5`); all but the last 2 of a file you create (`head -n -2`).
26. Last 10 lines of a log you can read (`tail`); last 50 (`tail -n 50`); from line 20 to the end of a file (`tail -n +20`).
27. Follow a growing log (`tail -f`) — append a line in another terminal (or `echo >>` the same file) and stop with Ctrl-C when you have seen a new line.

## Predict-then-run mixtape

28. Predict the full path printed by `pwd` after `cd /tmp && cd -` twice ending where you started — then run it.
29. Predict whether `ls` alone shows `.bashrc` in home; then prove with `ls -la`.
30. Create two files, `mv -b -S ".bak"` one over the other — list what remains before looking at the notes again.

## Scenario

31. Ticket: “keep a log of an install that fails, both output and errors, while I watch.” Produce `/tmp/basic-shell-commands-tasks/install.log` from a command that writes both streams (e.g. redirect with `tee`, or `cmd >log 2>&1` while still viewing — any working approach). Show the log contains stderr as well as stdout.
