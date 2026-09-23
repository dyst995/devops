# Tasks — Shell programming

Close `theory.md`. Work in `/tmp/sh-tasks`.

## Warm-up (mental model)

1. In one sentence: how does the shell run a script vs how a compiler works?
2. Name three reasons the notes like **short** shell scripts. How do you debug according to the notes?
3. List the “do **not** use shell” cases from the notes (speed, structure, secrecy, arrays, GUIs, libraries, closed source). Tick which apply to a 10-line backup vs a bank’s core ledger.

## Variables — format (construct until it hurts)

4. Assign a value with no spaces. Assign a value **with** spaces. Assign two values separated the way `PATH` is.
5. Deliberately put spaces around `=`. Predict the error, then run it.
6. Show that `HOME` and `home` are different names (assign `home`, print both).
7. Print the home directory and the command search path (quote them).
8. Dump **exported** variables. Dump **shell + env + functions**. How do the two dumps differ in idea?

## Environment vs shell-only (repeat)

9. From memory: who sees an environment variable vs a shell variable? How does a shell variable **become** environment?
10. Assign a variable, start a nested shell, print it. Export it, nested shell again. Unset it. What did children see each time?
11. Run a command with a one-shot variable that does **not** stay in your shell (the notes’ `env VAR=…` pattern). Prove your shell is unchanged.

## Common names (find this)

12. Print or explain: `USER`, `HOME`, `EDITOR`, `SHELL`, `LOGNAME`, `PATH`, `LANG`, `TERM`, `MAIL`.
13. Predict: two `ls` binaries, one in a directory **earlier** on `PATH`. Which runs? Then demonstrate with a fake earlier directory if you want.

## Script

14. Write a script: shebang, a variable, `if` on an argument, a loop. Make it executable. Run with and without an argument.
15. Run it so each command is printed as it executes: once with `bash -x`, once with `set -x` / `set +x` around one block only.

## Scenario

16. Monitoring wants a wrapper: first argument is a service unit name; exit 0 if active, 1 otherwise. Implement. Demo both outcomes.
