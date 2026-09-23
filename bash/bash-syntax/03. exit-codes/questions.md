# Exit codes — Questions

Cover the Answers section. Answer first, then check.

1. What is an exit status? What does **0** mean? Where is the last status stored?
2. Recite the table: 1, 2, 126, 127, 128, 128+n, 130, 255 — meaning in a few words each.
3. Example for 1? What kind of errors is 1 for?
4. Example for 2? Three comment cases (builtin misuse / permission / `diff`).
5. 126 vs 127 — found vs not found? Examples (`/dev/null` vs `Illegal_command`). What to check for 127?
6. Why is `exit 3.14159` code **128**? Legal range for `exit`?
7. `kill -9` on the script’s parent: what is `$?` and why (128+n)?
8. Ctrl-C: code and why it is 128+2.
9. `exit -1`: which table row? Same range rule as which other code?
10. You type a command, status is 127. Next you `chmod +x` a file in `.` and `./` it, status 126. What changed?

---

## Answers

1. Integer 0–255 when a command/script finishes. Success. `$?`
2. General error · builtin misuse · cannot execute · not found · bad `exit` arg · signal n · Ctrl-C · out of range
3. `let "var1 = 1/0"`. Catchall / divide by zero / impermissible ops.
4. `empty_function() {`. Missing keyword or command, permission, `diff` on failed binary compare.
5. 126 = cannot execute (permissions / not executable). 127 = no such command (`$PATH` / typo).
6. `exit` only takes integers 0–255.
7. **137** = 128 + 9 (SIGKILL).
8. **130**. Ctrl-C is signal 2.
9. **255**. Same 0–255 rule as 128.
10. 127 = name not found. 126 = file exists but not allowed to run (until execute bit / then other issues) — if still 126 after chmod, it may not be an executable format; the notes’ 126 example is `/dev/null`.
