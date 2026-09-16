# Labs — Bash startup files

**Where:** Linux with Bash (WSL or VM). SSH login is useful for Lab 2.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

In your current shell, check whether it is a login shell (`echo $0`, `shopt login_shell`). Start `bash --login` and check again. Exit the login bash.

## Lab 2

Put a unique `echo` in `~/.bash_profile` and a different unique `echo` in `~/.bashrc`. Open a new **SSH** session and note which messages appear. From that SSH session start a nested `bash` (no `--login`) and note which messages appear. Remove the test `echo` lines when finished.

If `~/.bash_profile` does not source `~/.bashrc`, add that block from the notes, repeat the SSH vs nested `bash` test, then decide whether you want to keep the source block.

## Lab 3

List, in order, which files a login shell reads and which file an interactive non-login shell reads. Write it from memory, then compare with theory. Check whether `~/.bash_logout` exists; add a test `echo` there, log out of an SSH session, and see whether it runs.

## Job and cert labs

## Lab 4

Add a `PATH` directory for a deploy user via `/etc/profile.d/lab-path.sh` (root). Open a **new** SSH login and see whether `echo $PATH` includes it. Run `ssh user@localhost 'echo $PATH'` (non-interactive) and compare. Remove the drop-in when done.

## Lab 5

Set `umask` in `~/.bashrc`, create a file in an interactive shell, `ls -l`. Create a file via `ssh host 'touch /tmp/umask-test'` and compare mode. Clean up.

## Lab 6

Ticket: “aliases work in my SSH session but not in my script.” Put an alias in `~/.bashrc`, call it from an interactive shell and from `bash /tmp/script.sh`. Fix the script without relying on aliases.
