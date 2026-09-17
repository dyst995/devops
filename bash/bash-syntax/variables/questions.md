# Variables — Questions

Cover the Answers section. Answer first, then check.

1. What is a variable, in the course wording (label / memory)?
2. Write the three assignment examples (`var`, `var2`, `var3`). Why quotes or backslashes on the last two?
3. Two ways to reference `var`? When do you need braces?
4. Indirect: `var=value`, `value=hello`, `eval b=\$$var` — what is `$b` and why?
5. Does Bash segregate variables by type? What are they essentially? When is arithmetic allowed?
6. `declare` vs `typeset`? What does `-i` change in the `n=6/3` example (both outputs)?
7. `${#stringZ}` for `abcABC123ABCabc`? `${#arrayX}` for `(a ab abc)` — why that number?
8. `${stringZ:2:5}` — 0-based? Result?
9. `#` vs `##` (front)? `%` vs `%%` (back)? Results for `stringZ` with `a*C` and `a*c` / `b*c` as in the notes.
10. `/` vs `//` replace; omit replacement; `/#` vs `/%` — all four `stringZ` outputs from the notes.
11. `${var1-$var2}` vs unset `var3`; then `var3=` null: `-` vs `:-` outputs.
12. What is `filename=${1:-$DEFAULT_FILENAME}` for (`generic.data`)?
13. `varZ=` then `=` vs `:=`; unset `var` then `=abc` then `=xyz`.
14. `+` vs `:+` for undefined, empty, and `param3=123` (all four course comments).
15. `?` / `:?` — what happens if unset? Exit status? What does `: ${HOSTNAME?} ${USER?} ${MAIL?}` do?
16. Extra `:` on `-` `=` `+` `?` — when does it matter?
17. Four special variable types?
18. `local` — where visible? `func Hello` vs `echo $var` outside.
19. Four places/ways to set environment variables. Command to list them. Recite `$EDITOR` `$HOME` `$HOSTNAME` `$IFS` `$PATH` `$RANDOM`.
20. `$0` `$1` `${10}` `$#` `"$*"` `"$@"` — each meaning. After which number are brackets required?
21. Recite `$?` `$$` `$-` `$_` `$!` `$*` `$@`.
22. Arrays: zero-based? Limit? Contiguous required? `( … )`, `[6]=`, `declare -a`, `${my_array[6]}`, `[@]` vs `[*]`, `${#my_array[@]}`.

---

## Answers

1. A label: a name assigned to a location or set of locations in computer memory holding an item of data.
2. `var=value` · `var2="one two three"` · `var3=one\ two\ three`. Spaces in the value.
3. `$var` · `${var}`. Braces when the name would glue to other characters (`${10}`, `${var}s`).
4. `hello` — extra `$` uses the variable **named** by `$var`.
5. No. Character strings. If the value contains only digits (or with `declare -i`).
6. Exact synonyms. Without `-i`: `n = 6/3`. With `-i`: `n = 2`.
7. `15`. `1` — length of first element `a`, not 3 elements.
8. Yes. `cABC1`.
9. `#` shortest prefix → `123ABCabc`. `##` longest → `abc`. `%a*c` shortest suffix → `abcABC123ABC`. `%%b*c` longest → `a`.
10. `/abc/xyz` → `xyzABC123ABCabc`. `//abc/xyz` → `xyzABC123ABCxyz`. `/abc` delete first → `ABC123ABCabc`. `//abc` delete all → `ABC123ABC`. `/#abc/XYZ` → `XYZABC123ABCabc`. `/%abc/XYZ` → `abcABC123ABCXYZ`.
11. Set `var1` → `1`. Unset `var3` → `2`. Null `var3` with `-` → empty. With `:-` → `1`.
12. Missing (or null) `$1` → operate on `generic.data`.
13. Null `varZ` + `=` → empty (no assign). `:=` → prints `abc` and sets it. Unset `var=abc` → `abc`. Then `=xyz` stays `abc`.
14. Undefined + `+` → empty. Empty + `+` → `xyz`. Empty + `:+` → empty. `123` + `:+` → `xyz`.
15. Print err_msg, abort, status **1**. Null command checks those three env vars; echos run only if they are set.
16. Only when the parameter is **declared but null**.
17. Local · environment · positional parameters · built-in.
18. Code block or function. Outside empty; `func Hello` prints `Hello`.
19. `/etc/environment` · `export` this session · `~/.bashrc` / `~/.bash_profile` · `.` / `source` in a script. `env`. Editor (vi/emacs) · home `/home/username` · hostname from boot/init · IFS · path to binaries · pseudorandom 0–32767 (function, not a constant).
20. Script name · first arg · tenth arg · count · all as one word · all as separate words. After `$9`.
21. Return value · PID of script · `set` flags · last arg of previous command · PID of last background job · all params one word · all params separate words.
22. Yes 0. No max. No contiguous required. Compound assign · one index · declare array · braces to read element · all elements · count **7** after `[6]=six`.
