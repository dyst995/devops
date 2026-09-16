# When to use the shell — Questions

Cover the Answers section. Answer first, then check.

1. What should shell be used for, according to this guide? What is it **not**?
2. Why does Google still have a shell style guide if they do not want widespread shell?
3. When is shell an **acceptable** choice?
4. If performance matters, what do you do?
5. Two size/complexity triggers to rewrite **now**. Why rewrite early?
6. Besides line count, what else do you consider when judging complexity?
7. Recite at least six situations where you must **not** use shell.
8. Why are shell scripts a bad fit for closed-source / proprietary software?
9. Backup wrapper: `ssh`, `rsync`, a few `if`s. Shell or not?
10. You need a linked list, type-checked APIs, and a GUI. Shell or not?

---

## Answers

1. Small utilities and simple wrappers. Not a development language for widespread deployment.
2. People already write utility scripts; the guide documents that use, it does not promote shell as the app language.
3. Mostly calling other utilities, relatively little data manipulation.
4. Use another language.
5. More than ~100 lines, or non-straightforward control flow. Scripts grow; later rewrites cost more.
6. Whether **other people** can maintain it, not only the author.
7. Heavy/slow-critical work (sort, hash, recursion); complex structured apps; mission-critical company bets; high security; native multi-dimensional arrays; lists/trees; graphics/GUIs; libraries or legacy interfaces; closed-source products.
8. The script *is* readable source.
9. Shell — glue around existing tools.
10. Not shell.
