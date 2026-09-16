# Bash startup files — Questions

Cover the Answers section. Answer first, then check.

1. What are Bash startup files?
2. What does **interactive** mean? What is the opposite in the notes?
3. What does **login shell** mean? How else can you force login behavior?
4. List the files an interactive **login** shell reads, in order, including logout.
5. After `/etc/profile`, three personal files may apply. Name them **in order**. How many actually run?
6. You have both `~/.bash_profile` and `~/.profile`. Which one is read? Why?
7. When does `~/.bash_logout` run?
8. What is a **non-login** shell, with the icon/menu example?
9. Which file does an interactive non-login shell read?
10. Does a GUI terminal read `/etc/profile`? `~/.bash_profile`?
11. `.bashrc` is usually **referred to** in `~/.bash_profile`. What does that mean, and why?
12. Aliases only in `.bashrc`, then you SSH in. Do they work? `PATH` only in `.bash_profile`, then you open a desktop terminal. Does `PATH` update?

---

## Answers

1. Scripts Bash reads and executes when it starts.
2. You can type commands. Opposite: the shell was started because a script was activated.
3. You got the shell after authenticating (username/password). `bash --login`.
4. `/etc/profile` → first readable of `~/.bash_profile`, `~/.bash_login`, `~/.profile` → `~/.bash_logout` on logout.
5. `.bash_profile`, `.bash_login`, `.profile`. Only the **first existing readable** one.
6. `~/.bash_profile` — it is first, so the others are skipped.
7. When you log out of a **login** shell.
8. No extra authentication. Opening a terminal from an icon or menu.
9. `~/.bashrc`
10. No and no (for the files in these notes).
11. `.bash_profile` **sources** `.bashrc` (`.` / `source`) so login sessions get aliases too.
12. Not unless profile sources bashrc. Usually no — non-login reads bashrc, not profile.
