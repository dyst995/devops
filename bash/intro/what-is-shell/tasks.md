# Tasks — What is a shell

Close `theory.md`. Work in `/tmp/what-is-shell-tasks` when creating files. Do the action or write the answer, then check yourself. Prefer nested shells and read-only checks — do **not** run `chsh` unless a task says “write the command you would run.”

## Warm-up

1. In one sentence: what is a UNIX shell, and what two sources can its commands come from?
2. Recite the memory hook: shell = interpreter + … Kernel = …
3. Apart from passing commands to the kernel, what is the shell’s other main job? Name at least three things that job includes (prompt, variables, …).
4. Name at least three Bash **resource files** from the notes (`/etc/profile`, …).

## Interpreted, not compiled

5. From memory: fill the comparison — what happens when you run a shell script vs a compiled program? When does each step run (every run vs build time)?
6. Recite the memory hook: script = recipe… compiler = meal…
7. Predict: after you run a shell script, is the file still text? After you compile a C program, what do you typically have instead? Create a tiny script under `/tmp/what-is-shell-tasks` that only runs `echo hello`, run it with `bash`, then `file` the script — confirm it is still text.
8. Can a shell script **call** a compiled binary like any other command? Answer in one sentence, then prove by having your tiny script call `ls` or `uname`.

## Known shells: `/etc/shells`

9. From memory: what does `/etc/shells` list, and what tool refuses paths that are **not** in it?
10. Run `cat /etc/shells`. List every path you see. Which of `/bin/sh`, `/bin/bash`, `/bin/rbash`, `/bin/dash` appear on this machine?
11. From memory, give the typical role of each: `/bin/sh`, `/bin/bash`, `/bin/rbash`, `/bin/dash`.
12. Recite the memory hook: if it is not in `/etc/shells`, it is not a legal …
13. Predict: is `/usr/bin/python3` (or some random path) a valid **login** shell just because the binary exists? Check whether it appears in `/etc/shells`. Do not change anything.

## Current shell vs nested shell

14. What does `$$` mean? Run `ps --pid $$` and record PID + CMD for your current shell.
15. Predict: if you type `/bin/sh`, do you change your login shell in `/etc/passwd`, or start a nested process? Write the prediction, then run `/bin/sh`, then `ps --pid $$`. Is the PID the same as in task 14? Is CMD different?
16. From that nested `sh`, start `/bin/dash` (if listed in `/etc/shells`; otherwise note it is missing and skip). Again `ps --pid $$`. Confirm a **new** PID.
17. Leave the inner shell(s) with `exit` (or Ctrl-D) until you are back in the original bash. Confirm with `ps --pid $$` that CMD is bash again.
18. Start `/bin/bash` as a nested shell, check `ps --pid $$`, then `exit`. Same idea — nested, not permanent.

## Login shell change (write only — do not run)

19. Recite the memory hook: type `/bin/sh` = try it now. `ps --pid $$` = … `chsh` = …
20. Write the exact command you **would** run to set the login shell to `/bin/bash` permanently. What must be true about that path first? **Do not execute `chsh`.**
21. Distinguish in one sentence each: nested shell (type `/bin/sh`) vs permanent login shell (`chsh`). Which survives closing the terminal / next SSH login?

## Commands.md drill

22. Without looking: list every command from this topic’s `commands.md` and one-line what each does. Then open `commands.md` and tick any you missed.
23. Run the safe ones once in order: `cat /etc/shells` → `ps --pid $$` → nested `/bin/sh` → `ps --pid $$` → `exit`. Skip `chsh`; only write it.

## Scenario

24. A teammate says “I changed my shell by typing `/bin/dash` and now my login is dash forever.” Using only this topic: what did they actually do? Which two checks (`ps --pid $$`, `cat /etc/shells` / account login field) would you use to explain nested vs login? What command would permanently change login shell — and what must be true first? Write the diagnosis and the safe `chsh` command; do not run `chsh`.
