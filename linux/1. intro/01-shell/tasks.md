# Tasks — Shell

Close `theory.md`. Do the action or write the answer, then check yourself. Do not open `commands.md` unless you are stuck and have asked.

When you want feedback, come back to chat with the task numbers, what you did, and what you concluded.

## Warm-up (recall through action)

1. On the machine, show the program that is sitting between you and the kernel right now.
2. Show which login shell your **account** is configured to use (not necessarily this process).
3. Show the name of **this** shell process.
4. Find the field in the user database that stores your login shell. Write down which field number it is (colon-separated).
5. Look at your prompt. From the notes, what does `$` vs `#` vs `%` tell you about **who** you are and **which family** of shell you might be in?

## Construct / distinguish

6. Write (on paper or in a comment) the four-layer path: user → ? → ? → hardware.
7. Name the original Unix shell, the GNU remake, the C-like one, and the Bourne-compatible one with extra features. Give the usual binary path for each from the notes.
8. Predict: if `/bin/sh` is a symlink to bash, does a script starting with `#!/bin/sh` necessarily behave like an interactive bash session? Why, from the notes?
9. Predict: `echo` of the login-shell variable vs `echo` of `$0` after you start a nested bash — which one changes?

## Repeat in a new context

10. Start a nested shell, then compare login-shell variable, `$0`, and the process listing for the current PID. Explain the difference using only ideas from the notes.
11. Switch to root if you can (or imagine the prompt). What character should the default bash prompt use, and why is that a warning?

## Small scenario

12. A CI log shows `sh: 3: Syntax error`. A developer says “but it works in my terminal.” Using only this topic: what mismatch are you looking for (interpreter vs login shell vs prompt)?
