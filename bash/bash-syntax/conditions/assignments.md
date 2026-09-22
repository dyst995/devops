# Assignments — Conditions

Close `theory.md`. Recite the **six tools**, then prove. Spaces inside `[ ]`.

1. [ ] Recite all six: `test`/`[ ]`, `[[ ]]`, `(( ))`/`let`, `if/then`, `case`, list constructs (`&&` / `||`).
2. [ ] `[` is a synonym for **`test`**, a builtin. Returns **0 true / 1 false**. Recite both spellings `test EXPRESSION` and `[ EXPRESSION ]`.
3. [ ] Recreate: `test -f file.txt && echo "File exists"`; `[ -f file.txt ] && echo Indeed`; `[ -f file1.txt ] || echo No such file`.
4. [ ] `[ $? -ne 0 ] && rc=1` after `ifup` — “if last command **failed**, set rc.” Recite (slide: exist vs **exit** status).
5. [ ] Recite test expressions: `( )` `!` `-a` `-o` `-n` `-z` `-d` `-f` `-w`. `-n` nonempty, `-z` empty.
6. [ ] `[[` is a **keyword**, not a command (Bash 2.02+). Prevents many logic errors. `&&` `||` `<` `>` work in `[[ ]]`, error in `[ ]`.
7. [ ] Recreate the spaces string: `[[ -n $string_with_spaces ]]` works; `[ -n $string_with_spaces ]` → **too many arguments**. Why (word-split)?
8. [ ] Double parentheses / `let`: **arithmetic**. Recite how this differs from `[` string/file tests.
9. [ ] `if/then` skeleton from the notes (`then` / `fi`). Condition is a command’s status.
10. [ ] `case` / `esac`: arms end with **`;;`**. Recite the init-script idea (start/stop) if in the notes.
11. [ ] `args.sh` idea: `-m` / `-n` / `-h`, default count **5**, empty `"$@"` → help. Recite; implement a tiny version if you want.
12. [ ] AND list: `cmd1 && cmd2 && …` — keep going while **success (0)**; first **failure stops**.
13. [ ] OR list: `cmd1 || cmd2 || …` — keep going while **failure**; first **success stops**.
14. [ ] Lists can replace nested `if`/`case` — one interview sentence.
15. [ ] Interview: 0 = true in tests, same as command success. Do not say “1 means true.”
16. [ ] Write `[ -f x ] || echo missing` and `[[ -n $s ]]` from memory. Spaces around `[` and `]`.
17. [ ] Recite: `-a`/`-o` **inside** `[ ]`; `&&`/`||` **between** commands (and inside `[[ ]]`).
18. [ ] `(( ))` vs `[[ ]]` vs `[ ]` — arithmetic vs safer test vs classic test. One line each.
19. [ ] Prove AND: `true && echo a && false && echo b` — `b` does not print. Prove OR: `false || echo a || echo b` — `b` does not print.
20. [ ] Combined: six tools; 0/1; `[`=`test`; `[[` keyword + no split; if/case; `&&` stop on fail; `||` stop on success.
