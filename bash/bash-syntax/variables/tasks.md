# Tasks — Variables

Close `theory.md`. Use `stringZ=abcABC123ABCabc` wherever the notes use it. Write down the output **before** you run.

## Warm-up

1. Course definition of a variable (label / memory).
2. Assign a single word; a phrase with quotes; the same phrase with backslashes. Print each.
3. Print a variable with `$` and with `${}`. Glue a letter immediately after the name — which form still works?
4. Recite: Bash does not segregate by type. What are values essentially? `declare` vs `typeset`?

## Assignment, types, indirect

5. `n=6/3` then print `n`. Then give `n` the integer property from the notes and assign `6/3` again. Both printed lines.
6. Indirect referencing exactly as the notes (`var=value`, `value=hello`, `eval` …). What prints?

## Strings — predict then run

7. Length of `stringZ`. Length of first element of `arrayX=(a ab abc)` with the **same** length syntax (no `[@]`). Why 15 and 1?
8. Substring of `stringZ` at position 2, length 5.
9. Shortest and longest **front** strip of `a*C` on `stringZ`.
10. Shortest **back** strip `a*c` and longest **back** strip `b*c` on `stringZ`.
11. First replace `abc`→`xyz`; all replaces; first delete `abc`; all deletes `abc`.
12. Replace `abc` only as **prefix** with `XYZ`; only as **suffix** with `XYZ`.

## Parameter substitution

13. `var1=1` `var2=2`, print default-if-unset using `var1` then unset `var3`. Then `var3=` (null): both `-` and `:-`.
14. Script: if the user omits the first argument, the filename must be `generic.data`. Prove omit vs pass a name.
15. Null `varZ`: `=` vs `:=`. Unset `var`: set via `=abc`, then try `=xyz`. Four prints.
16. Reproduce all four `+` / `:+` examples (`param_undefined`, empty `param1`, empty `param2`, `param3=123`) and the comments.
17. Script that aborts unless `HOSTNAME`, `USER`, and `MAIL` are set (notes’ `:` line). Run once in a normal shell; run once with one of them unset in that process. Status when it aborts?

## Special types

18. Function with `local`; call it; print the same name outside. Then omit `local` and compare.
19. Set a variable for the **current session** so a child `bash -c` sees it. List environment and find `USER` / `PATH` / `HOME`.
20. Recite `$EDITOR` `$HOME` `$HOSTNAME` `$IFS` `$PATH` `$RANDOM`. Print `$RANDOM` twice.
21. Script that prints `$0`, `$1`, `$2`, `$#`. Run it with three words. Then print argument ten — what syntax?
22. Recite `$?` `$$` `$-` `$_` `$!`. Start a background `sleep`; print the background PID special variable.
23. `"$*"` vs `"$@"` as **single** word vs **separate** words — pass two args that contain spaces and show the difference.

## Arrays

24. Create `my_array` with `zero` through `five`, then index `6` = `six`. Print index 6. Print all (`[@]` and `[*]`). Print element counts (`[@]` and `[*]`).
25. `declare` an array by name only (notes’ explicit statement).
26. Same array as 24: length syntax **without** `[@]` vs **with**. Two different numbers; two meanings.

## Scenario

27. A script must use `generic.data` when no file is given, refuse to run if `USER` is missing, treat `n` as integer (`6/3` must become `2`), and print every CLI argument on its own line. Implement from the notes only.
