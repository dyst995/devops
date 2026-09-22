# Assignments — Shell

Close `commands.md`. Type and run. These are command-practice drills, not labs.

## Identifying your shell (`$SHELL`, `$0`, `/etc/passwd`)

### Easy

1. [ ] Use `echo` to print the login-shell variable from your account.
2. [ ] Use `echo` to print the name of **this** shell process.

### Medium

3. [ ] Open the user database with `cat` and find **your** line. Which field is the login shell? Does it match what you printed in the easy exercises?
4. [ ] Someone ran `echo SHELL` (no `$`). Run that, then run the correct form. What is wrong with the first one?

### Hard

5. [ ] Decide whether **this** session is a login shell using only what this topic taught (`$0` is the hint). Write one sentence from the output, then confirm against `$SHELL` and your `/etc/passwd` line.
6. [ ] Find another account in `/etc/passwd` (not yours) and compare that user’s login shell to yours. Use `echo` and `cat` only — do not switch users.
