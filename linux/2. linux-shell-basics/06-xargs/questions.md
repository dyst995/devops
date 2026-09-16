# 06 — xargs — Questions

Cover the Answers section. Answer first, then check.

1. What does `xargs` read, how is input split, and what does it do with that input?
2. What command runs if you do not specify one?
3. Write the syntax line: options, command, initial-arguments.
4. `cat names.txt` prints three lines (`one`, `two`, `three`). What does `cat names.txt | xargs` print, and why?
5. What does `cat names.txt | xargs -i touch {}` create?
6. How is `xargs -iT touch T` related to the previous command?
7. Bare `xargs touch` vs `xargs -i touch {}` — one `touch` or many?
8. What does `-0` / `--null` change about splitting? What is no longer special?
9. When must you use `-0`? Which `find` flag pairs with it?
10. What does `-P 4` do? What is the default max-procs?
11. What does `-P 0` mean?
12. Why is `find … -print | xargs rm` risky on real filesystems, and what is the safer form?
13. Connect to the previous topic: how does `xargs` complete `find`?

---

## Answers

1. Arguments from stdin, separated by blanks or newlines; it runs the given command using those as arguments.
2. `/bin/echo`
3. `xargs [OPTIONS] [COMMAND [initial-arguments]]`
4. `one two three` — default `echo` joins the words onto one line.
5. Empty files named `one`, `two`, and `three` (plus existing `names.txt`).
6. Same idea: `-iT` uses `T` as the replace string instead of `{}`.
7. Bare: one `touch` with all names as arguments. `-i`: one `touch` per name.
8. Items end at a null byte, not whitespace. Quotes and backslash are literal.
9. Names with spaces, quotes, or backslashes. `find -print0 | xargs -0 …`
10. Run up to 4 processes at a time. Default is 1.
11. Run as many processes as possible at a time.
12. Newlines/spaces in filenames split wrong. Safer: `find … -print0 | xargs -0 rm`.
13. `find` prints matching paths; `xargs` turns that stream into command arguments (or one command per path with `-i`).
