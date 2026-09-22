# Assignments — Shell

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

## `echo`

1. [ ] Print the login shell recorded for your account (from the SHELL variable).
2. [ ] Print the name of this shell process.
3. [ ] Recite from memory: which of those two is “login shell from passwd / SHELL”, and which is “name of this process”.
4. [ ] Predict: if the process-name print starts with a leading `-`, what does that usually mean?
5. [ ] Predict: you open a new interactive bash from inside another shell — which print still shows the account login shell, and which changes?
6. [ ] Prove both prints succeed as a normal user (no extra privilege needed).
7. [ ] Compare the two outputs and write one sentence: same string, or different, and why that can happen.
8. [ ] Wrong usage: run the command with no arguments. Predict a blank line vs an error.
9. [ ] Wrong usage: print a variable name you misspelled (it does not exist). Predict empty output vs “not found”.
10. [ ] What if the operand is missing: you meant the SHELL variable but typed only `echo`. Predict.
11. [ ] Combine: print the login-shell value and the current process name on two separate lines, in that order.
12. [ ] Combine: print a label and the login-shell value on one line so a human can tell which is which.
13. [ ] Human vs default: quoted vs unquoted variable — for a typical `/bin/bash` value, does the visible output change?
14. [ ] Privilege: switch to a root prompt if you have sudo, print the same two values, and predict whether `$0` might look different.
15. [ ] Predict output of the process-name print in your current interactive session (write it down before you run it).
16. [ ] In a throwaway directory, save both outputs into a note file (redirect or type them), then prove the note contains what you expected.
17. [ ] Prove you can change `$0`’s meaning without changing your login shell (start a nested shell, then print both again).
18. [ ] Wrong usage: you type a filesystem path instead of a variable (as if this command read files). Predict: file contents, or the path as text?
19. [ ] Recite: where the login-shell value ultimately comes from (account database vs current process).
20. [ ] What if `$0` is `-bash` vs `bash` — predict which is more likely a login shell.

## `cat`

1. [ ] Display the user database file whose last field is the login shell.
2. [ ] Recite from memory the path of that file.
3. [ ] On your own line, prove the last field is a shell path (same idea as the SHELL variable).
4. [ ] Predict how fields are separated on each line (what character sits between them).
5. [ ] Predict the shape of a line before you look: `name` … home directory … login shell at the end.
6. [ ] Privilege: as a normal user, predict whether you can read this file (success vs permission denied).
7. [ ] What if the operand is missing: run it with no file. Predict it waits on stdin vs prints a usage error. Cancel without stuffing the machine.
8. [ ] Wrong usage: give a path that does not exist. Predict the kind of error.
9. [ ] Wrong usage: point it at a directory. Predict the kind of error.
10. [ ] Combine: after printing SHELL, confirm that same path appears as the last field of your user line.
11. [ ] Combine: in a throwaway directory, create two tiny files and display them in one invocation; predict concatenated order.
12. [ ] Human vs default: default display has no line numbers. Predict that the raw file is printed as-is.
13. [ ] Privilege: predict what happens if you try a root-only file such as the shadow database — do not brute-force it.
14. [ ] Prove this command only reads: the user database is unchanged after you view it.
15. [ ] Find root’s line (read-only) and identify that last field as a shell.
16. [ ] What if two operands and the second file is missing — predict partial output plus an error.
17. [ ] In a throwaway directory, write `hello.txt` with one line and prove the command prints contents, not the filename.
18. [ ] Recite: last field on your passwd line is the login shell — then prove it against `echo` of SHELL.
19. [ ] Wrong usage: treat this as `echo` and pass `$SHELL` (a path). Predict: it tries to open that path as a file.
20. [ ] Predict: does a leading `#` in a comment you added to a throwaway file get executed, or printed as text?
