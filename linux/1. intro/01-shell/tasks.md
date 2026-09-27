# Tasks — Shell

Close `theory.md`. Work in `/tmp/shell-tasks` when creating files. Do the action or write the answer, then check yourself.

## Warm-up

1. In one sentence: what is a shell, and what does it sit between?
2. Draw (or write as a one-line chain) the four layers from the notes: User → ? → ? → Hardware. Where do scripts / programs attach?
3. On this machine, show the program that is sitting between you and the kernel right now (`echo $0` or equivalent).
4. Show which **login shell** your account is configured to use (`echo $SHELL`). Is that necessarily the same as the current process?
5. Find your line in the user database (`/etc/passwd`). Which field (colon-separated, counting from 1) stores the login shell? Write that field number and its value for your user.

## Shell types

6. Name the four shells from the notes table. Give the short name (`sh`, `csh`, `ksh`, `bash`) and one fact for each.
7. Expand **bash** as a memory hook: what do the letters stand for, and which shell is it a remake of?
8. From memory, fill the path column: usual binary path(s) for `sh`, `csh`, `ksh`, and `bash`.
9. Predict: on most modern Linux systems, `/bin/sh` is often a symlink. Does a script starting with `#!/bin/sh` necessarily behave like an interactive bash session? Why, from the notes?
10. Look up whether `/bin/sh` on this machine is a real binary or a symlink. Record what it points to (if anything). Do not change it.

## Prompts: who and which family

11. From the notes, what do `$`, `#`, and `%` tell you about **who** you are (regular vs root)?
12. Which shell family uses `%` for a normal (non-root) user? What do the others use for non-root?
13. What does the default **bash** non-root prompt look like, according to the notes (include the version idea)? What character does root’s bash prompt use, and why is that a warning?
14. Look at your current prompt. Classify it using only the notes’ rules (`$` / `#` / `%` / bash version string).

## `$SHELL` vs `$0` (predict, then run)

15. Predict: after you start a nested `bash` (or `sh`) from your current shell, which changes — `echo $SHELL`, `echo $0`, both, or neither? Write the prediction first.
16. Create `/tmp/shell-tasks` if needed. Start a nested shell, then compare `echo $SHELL`, `echo $0`, and (optional) the process listing for the current PID. Explain the difference using only ideas from this topic.
17. From the notes: what does a leading `-` in `$0` often mean?

## Construct / distinguish

18. Write three one-line commands from `commands.md` that answer: login shell, current shell process name, and full user database view. Run each once; paste or note what each proved.
19. Distinguish in one sentence each: login shell (account config) vs current shell process vs prompt character.

## Scenario

20. A CI log shows `sh: 3: Syntax error: "(" unexpected`. A developer says “but it works in my terminal.” Using only this topic: what mismatch are you looking for (interpreter vs login shell vs prompt)? Name the checks you would run (`$SHELL`, `$0`, shebang / `/bin/sh` target).
