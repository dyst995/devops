# Tasks — Variables

Close `theory.md`. Work in `/tmp/variables-tasks` when creating scripts. Use `stringZ=abcABC123ABCabc` wherever the notes use it. Write down the output **before** you run. Put `exit` / aborting `?` drills only inside scripts.

## Warm-up

1. Course definition of a variable (label / memory).
2. Assign a single word; a phrase with quotes; the same phrase with backslashes. Print each.
3. Print a variable with `$` and with `${}`. Glue a letter immediately after the name — which form still works?

## Assignment, types, indirect

4. `n=6/3` then print `n`. Then give `n` the integer property from the notes (`declare -i` or `typeset -i`) and assign `6/3` again. Both printed lines.
5. Indirect referencing exactly as the notes (`var=value`, `value=hello`, `eval b=\$$var`). What prints?
6. Predict what happens if you forget `eval` and only expand `\$$var` / related forms — then confirm the notes’ `eval` form is what yields `hello`.

## Strings — length and substring

7. Length of `stringZ` with `${#stringZ}`. Predict 15.
8. `arrayX=(a ab abc)` — length with the **same** `${#arrayX}` syntax (no `[@]`). Why 1, not 3?
9. Substring of `stringZ` at position 2, length 5. Predict `cABC1`.

## Strings — strip front / back

10. Shortest and longest **front** strip of `a*C` on `stringZ` (`#` vs `##`). Predict both leftovers.
11. Shortest **back** strip `a*c` and longest **back** strip `b*c` on `stringZ` (`%` vs `%%`). Predict both.

## Strings — replace

12. First replace `abc`→`xyz`; all replaces `abc`→`xyz`. Predict both (case matters for `ABC`).
13. First delete `abc`; all deletes `abc` (omit replacement). Predict both.
14. Replace `abc` only as **prefix** with `XYZ` (`/#`); only as **suffix** with `XYZ` (`/%`). Predict both.

## Parameter substitution — default / assign / alt / required

15. `var1=1` `var2=2`, print `${var1-$var2}` then `${var3-$var2}` (unset `var3`). Then `var3=` (null): both `-` and `:-`. Four meaningful prints; explain the null case.
16. Script under `/tmp/variables-tasks`: if the user omits the first argument, the filename must be `generic.data` (`${1:-…}`). Prove omit vs pass a name.
17. Null `varZ`: `=` vs `:=`. Unset `var`: set via `=abc`, then try `=xyz`. Four prints as in the notes.
18. Reproduce all four `+` / `:+` examples (`param_undefined`, empty `param1`, empty `param2`, `param3=123`) and match the notes’ comments.
19. Script that aborts unless `HOSTNAME`, `USER`, and `MAIL` are set (notes’ `: ${HOSTNAME?} …` line). Run once in a normal shell; run once with one of them unset in that process (`env -u …` or unset in a subshell script). Status when it aborts?

## Local / environment / positional / built-ins

20. Function with `local`; call it; print the same name outside. Then omit `local` and compare (leak).
21. Set a variable for the **current session** so a child `bash -c` sees it (`export`). List environment with `env` and find `USER` / `PATH` / `HOME`.
22. Recite `$EDITOR` `$HOME` `$HOSTNAME` `$IFS` `$PATH` `$RANDOM`. Print `$RANDOM` twice — not a constant.
23. Script that prints `$0`, `$1`, `$2`, `$#`. Run it with three words. Then print argument ten — what syntax (`${10}`)?
24. Recite `$?` `$$` `$-` `$_` `$!`. Start a background `sleep` under `/tmp`; print `$!`. Print `$$` of the current shell.
25. `"$*"` vs `"$@"` as **single** word vs **separate** words — pass two args that contain spaces and show the difference in a small loop script.

## Arrays

26. Create `my_array` with `zero` through `five`, then index `6` = `six`. Print index 6. Print all (`[@]` and `[*]`). Print element counts (`[@]` and `[*]`).
27. `declare -a new_array` by name only (notes’ explicit statement). Assign a couple of slots; print them.
28. Same array as 28: `${#my_array}` **without** `[@]` vs `${#my_array[@]}`. Two different numbers; two meanings.

## Scenario

29. A script under `/tmp/variables-tasks` must: use `generic.data` when no file is given; refuse to run if `USER` is missing (`?`); treat `n` as integer (`6/3` → `2`); print every CLI argument on its own line (`"$@"`). Implement from the notes only and demonstrate each branch.
