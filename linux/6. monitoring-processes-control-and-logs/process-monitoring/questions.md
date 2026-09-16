# Process monitoring — Questions

Cover the Answers section. Answer first, then check.

1. What does `top` show that `ps` does not?
2. How do you quit `top`? What are `P` and `M` for (from the elaborated notes)?
3. What does `ps aux` mean (`a`, `u`, `x`)?
4. Which column do you copy for `kill`?
5. Default `kill 156` vs `kill -9 156`. What is signal 9 also called?
6. Can a normal user `kill` root’s `sshd`? Why?
7. `killall top` vs `killall -9 top` vs `killall -KILL top`.
8. When is `killall` the wrong tool?
9. Pick a command: live CPU hogs · one-time list of all daemons · stop PID 156 nicely · force-stop every `top`.

---

## Answers

1. `top` **updates live**. `ps` is a one-shot list.
2. `q`. Sort by CPU · sort by memory.
3. All users · user-oriented columns · processes without a tty (daemons).
4. `PID`
5. SIGTERM (graceful) vs SIGKILL (cannot be caught). `KILL`.
6. No — you may only signal processes you own, unless you are root.
7. TERM by name · KILL by number · KILL by name (same as -9).
8. When several processes share the name and you only want one (use PID).
9. `top` · `ps aux` · `kill 156` · `killall -9 top`
