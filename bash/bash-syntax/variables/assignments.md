# Assignments — Variables

Close `theory.md`. Recite the **rule**, then prove. No spaces around `=` unless the notes say quotes/`\`.

1. [ ] A variable is a **label** for data in memory — not the data itself. Recite that.
2. [ ] Assignment: `var=value`. Recite quoted spaces vs backslash spaces (`var2` / `var3`).
3. [ ] Referencing: `$var` vs `${var}`. When are braces required (`${var}s`, `${10}`)?
4. [ ] Indirect: `var=value`; `value=hello`; `eval b=\$$var`; `$b` is `hello`. Recite “the variable whose **name** is in `var`.”
5. [ ] Types: Bash does not segregate by type; values are **strings** unless context is digits. `declare` = **`typeset`**.
6. [ ] `n=6/3` then echo vs `declare -i n` then `n=6/3` → **2**. Recreate. Default = string.
7. [ ] `stringZ=abcABC123ABCabc` (15 chars). Recite `${#var}` length. Array: `${#array}` is length of the **first element**.
8. [ ] Substring `${var:position:length}`. Strip front `#` / `##`. Strip back `%` / `%%`. Recite shortest vs longest.
9. [ ] Replace `${var/Pattern/Replacement}` vs `//` (all). Prefix `/#` vs suffix `/%`.
10. [ ] Parameter substitution: `-` / `:-` default if unset (or null). `=` / `:=` **set** the default. `+` / `:+` alternative if **set**. `?` / `:?` required or **abort**.
11. [ ] One sentence each: colon vs no colon in `:-` vs `-` (null vs unset) if the notes distinguish — prove with empty vs unset.
12. [ ] Local vs environment vs positional: `local` in a function; `export` for children; `$1` `$2` … `"$@"` vs `"$*"`.
13. [ ] Recite built-ins: `$?` `$$` `$-` `$_` `$!` `$*` `$@` — one phrase each.
14. [ ] Arrays: multiple values, **zero-based**, no max, not necessarily contiguous. `my_array=( zero one two … )`; `my_array[6]=six`; `declare -a`.
15. [ ] Dereference needs **braces**: `${my_array[1]}`. Recite from the notes.
16. [ ] Interview: `"$*"` one word vs `"$@"` separate words — prove with a function that `echo`s `"$#"` vs a loop over `"$@"`.
17. [ ] Interview: `6/3` stayed a string until `declare -i`. Why DevOps scripts blow up on “numbers.”
18. [ ] Recite `$1` vs `$0` (script name) vs `$#` if in the positional section. Prove with `bash s.sh a b`.
19. [ ] Environment: child sees **exported** names only. `VAR=tmp ./myscript` vs `export`. One sentence.
20. [ ] Combined (no notes): `name=value`; `$` vs `${}`; `declare -i`; `${#}`; `#`/`%` strip; `:-` default; `"$@"`; `$?`/`$$`; array `[0]`.
