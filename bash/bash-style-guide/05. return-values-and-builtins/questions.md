# Return values and builtins — Questions

Cover the Answers section. Answer first, then check.

1. Two ways to check an unpiped command? Where does the error `echo` go?
2. `"${file_list[@]}"` vs `"${file_list[*]}"` in the `mv` / message?
3. What is `PIPESTATUS`? When is a single `if` on `[0]` and `[1]` enough?
4. Why copy `PIPESTATUS` immediately? What common command wipes it?
5. Builtin vs external — which do you pick? Recite the preferred `addition` and `substitution` lines vs `expr` / `sed`.

---

## Answers

1. `if ! cmd; then` · `cmd` then `(( $? != 0 ))`. STDERR (`>&2`).
2. Each path to `mv` · one joined string in the message.
3. Array of each pipe stage’s status. When you only care that **any** stage failed.
4. The next command overwrites it. `[` (and anything else you run).
5. Builtin. `addition=$(( X + Y ))` · `substitution="${string/#foo/bar}"`. Not `expr` / `echo | sed`.
