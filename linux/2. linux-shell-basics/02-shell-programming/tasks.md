# Tasks — Shell programming

Close `theory.md`. Work in `/tmp/shell-programming-tasks` when creating files. Do the action or write the answer, then check yourself.

## Warm-up (mental model)

1. In one sentence: how does the shell run a script vs how a compiler works?
2. Recite the memory hook: script = recipe… compiled program = …
3. Name three reasons the notes like **short** shell scripts. How do you debug according to the notes?
4. List the “do **not** use shell” cases from the notes (speed, structure, secrecy, arrays, GUIs, libraries, closed source). Tick which apply to a 10-line backup vs a bank’s core ledger.

## Variables — format (construct until it hurts)

5. Assign a value with no spaces. Assign a value **with** spaces (quotes). Assign two values separated the way `PATH` is (`:`).
6. Deliberately put spaces around `=`. Predict the error (`KEY` treated as a command), then run it.
7. Show that `HOME` and `home` are different names (assign `home`, print both).
8. By convention, are environment variable names `UPPER_CASE` or camelCase? Write one fake `LOG_LEVEL` assignment correctly.
9. Print the home directory and the command search path (quote them: `echo "$HOME"`, `echo "$PATH"`).
10. Dump **exported** variables with `env`. Dump **shell + env + functions** with `set` (pipe to a pager if needed). How do the two dumps differ in idea?

## Environment vs shell-only

11. From memory: who sees an environment variable vs a shell variable? How does a shell variable **become** environment?
12. Assign a variable (do **not** export). Start a nested shell (`bash`), print it. What did the child see?
13. `export` that variable, nested shell again, print it. Then `unset` it in the parent. What did children see each time?
14. Run a command with a one-shot variable that does **not** stay in your shell (the notes’ / next chapter’s `env VAR=…` pattern, or `VAR=value command`). Prove your shell is unchanged afterward.

## Common names

15. Print or explain each: `USER`, `HOME`, `EDITOR`, `SHELL`, `LOGNAME`, `PATH`, `LANG`, `TERM`, `MAIL`.
16. Predict: two `ls` binaries, one in a directory **earlier** on `PATH`. Which runs? Then demonstrate with a fake earlier directory under `/tmp/shell-programming-tasks` if you want (a tiny script named `ls` that just echoes — only while that dir is first on `PATH` in a nested shell).

## xtrace — see each command

17. From memory: what does xtrace print, to which stream, and what is the usual `+ ` prefix (`PS4`)?
18. Write a tiny script under `/tmp/shell-programming-tasks` with a shebang, `echo`, and `ls`. Run it so each command is printed: `bash -x script.sh`. Confirm you did **not** need to edit the file.
19. Edit the script: wrap **one** block with `set -x` … `set +x`. Run with `./script.sh` (make executable). Confirm quiet → traced → quiet again.
20. What is the long form of `set -x` from the notes (`set -o …`)? When would you prefer `bash -x` over editing in `set -x`?

## Script drill

21. Write a script: shebang, a variable, `if` on an argument, a loop. Make it executable. Run with and without an argument.
22. Run that script once with `bash -x` and once with the in-file `set -x` / `set +x` pattern around only the loop.

## When not to use shell (recall)

23. From memory, name at least five “wrong tool” cases. For each of these tickets, pick shell or not: rotate logs nightly; implement AES encryption library; parse a 50 GB CSV with nested joins; one-liner to restart a unit if down.

## Scenario

24. Monitoring wants a wrapper: first argument is a service unit name; exit 0 if active, 1 otherwise. Implement under `/tmp/shell-programming-tasks`. Demo both outcomes (use a real unit like `cron` / `ssh` if available, or stub with a fake check). Trace one failing run with `bash -x`.
