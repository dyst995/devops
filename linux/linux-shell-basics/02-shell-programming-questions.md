# 02 — Shell Programming — Questions

Cover the Answers section. Answer first, then check.

1. In one sentence: the shell is not only a prompt, it is also a ____.
2. What is a shell script? Where do the commands come from if you are not typing them?
3. Shell scripts are interpreted, not compiled. What does the shell do with each line? What does a compiler produce instead?
4. Can a compiled executable still be used from a shell script?
5. Three reasons the notes give for liking **short** shell scripts.
6. What is an environment variable, in simple words?
7. Name three kinds of information environment variables often store.
8. Write three valid assignments: a simple value, a value with spaces, and multiple values in one variable.
9. Are variable names case-sensitive? What is the naming convention for environment variables?
10. What character separates multiple values in one variable? Which common variable uses that?
11. Why must there be **no space** around `=`?
12. Difference between an **environment** variable and a **shell** variable. Who inherits which?
13. Do `bash` and `zsh` share one set of internal shell variables?
14. Recite what each of these means: `USER`, `HOME`, `EDITOR`, `SHELL`, `LOGNAME`, `PATH`, `LANG`, `TERM`, `MAIL`.
15. When you run `ls`, how does `PATH` decide which binary runs if two directories both have an `ls`?
16. `USER` vs `LOGNAME` — both describe the user. What does each store according to the notes?
17. List at least six situations where you should **not** use a shell script.
18. Why are shell scripts a bad fit for proprietary, closed-source software?
19. You need a linked list and type-checked functions. Shell or not? Why?
20. You need to glue `rsync`, `ssh`, and a few `if` checks for a backup. Shell or not? Why?

---

## Answers

1. Programming language.
2. A file of commands (shell program). The shell reads those commands from the file instead of from the keyboard.
3. It reads line by line and searches for each command on the system. A compiler converts a program into a machine-readable executable.
4. Yes. The script can call that executable like any other command.
5. Simple syntax; most short scripts work the first time; debugging is straightforward.
6. A named value (name + associated value) stored in the environment and used by apps and scripts in shells or subshells.
7. Default editor or browser; path to executables; locale and keyboard layout (also any values your scripts read).
8. `KEY=value` · `ANOTHER_KEY="Some other value"` · `KEY_MULTI=value1:value2`
9. Yes. Convention: `UPPER_CASE` with `_` between words.
10. Colon `:`. `PATH` (and any `KEY_MULTI=a:b` style variable).
11. The shell splits on spaces. `KEY = value` tries to run a command named `KEY`, not assign a variable.
12. Environment: system-wide for that process tree — inherited by spawned children and subshells. Shell: only the current shell instance.
13. No. Each shell has its own set of internal shell variables.
14. `USER` logged-in user · `HOME` home directory · `EDITOR` default editor · `SHELL` path of the user’s shell · `LOGNAME` current user name · `PATH` directories searched for commands · `LANG` locale · `TERM` terminal emulation · `MAIL` mail storage location.
15. Directories are searched **in order**; the **first** match wins.
16. Both identify the current user. `USER` = current logged-in user; `LOGNAME` = name of the current user (same idea; both are common env vars to recognize).
17. Heavy / speed-critical work (sort, hash, recursion); complex structured apps; mission-critical company bets; high security; native multi-dimensional arrays; lists/trees; graphics/GUIs; libraries or legacy interfaces; closed-source products.
18. The script *is* readable source. Anyone with the file can see how it works.
19. Not shell. No real type-checking, prototypes, or those data structures.
20. Shell. Short, command-oriented glue — this is what the language is for.
