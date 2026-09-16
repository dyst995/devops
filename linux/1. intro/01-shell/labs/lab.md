# Labs — Shell

**Where:** any Linux (WSL or Rocky VM).

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck. Check yourself with [questions](../questions.md).

## Lab 1

Print your login shell, the name of the current shell process, and the process that is your current shell (`$$`).

## Lab 2

Find your account line in `/etc/passwd` and identify which field is the login shell.

## Lab 3

From your current session, start a nested `bash`, compare the same three facts as Lab 1 with the outer shell, then `exit`.

## Job and cert labs

## Lab 4

Create a throwaway user whose login shell is `/bin/sh` (or `nologin`). Log in (or `su -`) as that user and compare `$SHELL`, `$0`, and `/etc/passwd` with your own account. Change the shell with `chsh` or `usermod` and log in again. Delete the user when finished.

## Lab 5

Write a one-line check a deploy script could use: exit non-zero if the current interpreter is not Bash. Run it with `bash` and with `sh`.

## Lab 6

On a ticket-style prompt: “this cron job runs `/bin/sh script.sh` and behaves differently than when I run it by hand.” Reproduce that: same script, `bash script.sh` vs `sh script.sh` (put a bash-only feature in the script). Fix it the way you would in production (shebang and/or the crontab command).
