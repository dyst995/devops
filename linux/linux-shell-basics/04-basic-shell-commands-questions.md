# 04 — Basic Shell Commands — Questions

Cover the Answers section. Answer first, then check.

### man and info

1. What is `man`, and what kind of names do you pass it?
2. What happens if you pass a **section** number? What is the default search?
3. Command for the full guide to `cat`. Command that documents `man` itself.
4. What does `man -k list` do? What does `man -f ls` do?
5. You remember the task (“list files”) but not the command. `-k` or `-f`?
6. What is `info`? Commands to read the GNU page for `cat` and for `info` itself.
7. `passwd` exists as a command and as a file format. How do you ask `man` for the file format?

### ls, pwd, cd

8. Decode `ls -la`, `ls -lh`, `ls -lt`, `ls -lSh`.
9. What does `pwd` print?
10. Default directory for bare `cd`? What is `$CDPATH`, and when is it **not** used?
11. Where do `cd /`, `cd ..`, `cd ~`, and `cd -` go?
12. You are in `/home/vagrant`, then `cd /tmp`, then `cd -`, then `cd -` again. Where are you after each step?

### Create, copy, move, remove

13. Two jobs of `touch`. What does `touch -d "next Friday" file` do?
14. `mkdir` vs `mkdir -p`. What does `-m` set? What does `mkdir -p dir/test{1..3}/empty` create?
15. `cp` flags: `-r`, `-p`, `-i`.
16. `mv` does two everyday jobs. What do `-u` and `-b -S ".old"` do?
17. Show how to merge `1.txt` and `2.txt` into `3.txt` with `cat`.
18. `rmdir` vs `rm -r`. What does `rm -rf` mean? Are contents guaranteed gone after `rm`?

### Environment variables

19. `env` with a program vs `env` with no arguments. Does the first change your current shell?
20. `printenv` vs `set` with no arguments.
21. What do `export` and `unset` do? Why is `printenv FOO` empty after `FOO=bar`?

### View file content

22. `more` vs `less` — what can `less` do that `more` cannot? Where might you only have `more`?
23. In `less`: `/pattern`, `?pattern`, `n`, `N`.
24. Default line count for `head` and `tail`. What do `head -n 5`, `head -n -5`, `tail -n 20`, `tail -n +20` print?
25. What does `tail -f` do? When do you use it?

---

## Answers

1. Main UNIX help / system manual. Program, utility, or function names.
2. Looks only in that section. Default: all available sections.
3. `man cat` · `man man`
4. `-k`: commands whose description contains “list”. `-f`: short description of `ls`.
5. `-k` (keyword).
6. GNU information pages. `info cat` · `info info`
7. `man 5 passwd` (section 5 = file formats).
8. Long + all (dotfiles) · long + human sizes · long + newest first · long + largest first + human sizes.
9. Full path of the current working directory.
10. `$HOME`. `$CDPATH` is a colon-separated search path for `cd` (null entry = `.`). Not used when the path starts with `/`.
11. Filesystem root · parent · home · previous directory.
12. `/home/vagrant` → `/tmp` → `/home/vagrant` → `/tmp`. (`cd -` also prints the path.)
13. Create empty file, or update timestamp. `-d` sets that parsed date instead of now.
14. `-p` creates parents and does not error if they exist. `-m` sets mode like `chmod`. Creates `dir/test1/empty`, `dir/test2/empty`, `dir/test3/empty`.
15. Recursive · preserve mode/owner/timestamps · prompt before overwrite.
16. Move and rename. `-u`: only if source is newer or dest missing. `-b -S ".old"`: backup overwritten dest as `name.old`.
17. `cat 1.txt 2.txt > 3.txt`
18. `rmdir` = empty dir only. `rm -r` = dir and contents. `rm -rf` = recursive, never prompt, ignore missing. Recovery may still be possible; notes mention `shred`.
19. Runs the program in a custom environment without changing the current one. No args: print current environment variables.
20. `printenv` = environment only (all or named). `set` = environment + shell variables + functions.
21. `export` makes a variable inheritable by children. `unset` deletes it. `FOO=bar` is a shell variable until exported.
22. `less` can scroll backward. Small embedded systems may ship only `more`.
23. Search forward (regex, from first displayed line) · search backward (from line before the top) · repeat same direction · repeat reverse.
24. 10 and 10. First 5 lines · all but last 5 · last 20 · from line 20 to end.
25. Print new data as the file grows. Watching logs.
