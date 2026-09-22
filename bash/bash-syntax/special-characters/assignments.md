# Assignments — Special characters

Close `theory.md`. Special = **meta-meaning**, not the letter on the key. Recite, then type a one-liner.

1. [ ] What is a special character (beyond literal meaning)? Scripts are built from commands + keywords + **these**.
2. [ ] Recite the course table in order: `#` `;` `;;` `.` `./file` `""` `''` `,` `\` backticks `:` `$`.
3. [ ] `#` — comments. From `#` to end of line **not executed**. Exception: `#!` first line is **sha-bang**, not a comment.
4. [ ] `;` — command separator. Two commands on one line, **sequence**. Status of the line = status of the **last**. Not `&&`.
5. [ ] `;;` — terminator in a **case** option. One `;` vs two `;` — recite. Write a tiny `case` with two arms.
6. [ ] `.` — **dot command** = `source`. Runs in **this** shell; variables **stay**. Not a new process.
7. [ ] `./file` — dot as **path**. Space after `.` → command. No space → path. Recite `./deploy.sh`, `.hidden`, `..`.
8. [ ] Prove: `. ./lib.sh` vs `./lib.sh` (after chmod) — sourced vars remain vs child process discards them.
9. [ ] `""` partial quoting: one word, **`$` still expands**. `name=world`; `echo "hello $name"`.
10. [ ] `''` full quoting: **literal**, including `$`. Same `name`; `echo 'hello $name'` → `hello $name`.
11. [ ] `,` comma operator in arithmetic: **all** evaluated, **value is the last**. Recite `let "t2 = ((a = 9, 15 / 3))"` → `a` is 9, `t2` is 5.
12. [ ] `\` escape: next character literal, or line continuation. `echo \$HOME`; `echo hello\` newline `world`.
13. [ ] Backticks: command substitution — run, **paste output**. `echo "today is \`date\`"`. Same job as `$(…)` (not in the table).
14. [ ] `:` null command (colon, **not** semicolon). Same meta-meaning as `true`. Recite the mix-up with `;`.
15. [ ] `$` dollar sign — value of a variable (variables topic). Recite it still belongs on **this** table.
16. [ ] Interview: `. ./lib` vs `./lib` — current shell vs new process. Draw the space.
17. [ ] Interview: `"$name"` vs `'$name'` — expand vs literal. Prove.
18. [ ] Write from memory: a comment; two `echo`s with `;`; a `case` arm ending `;;`; a sourced file; a `./script`.
19. [ ] Recite memory hooks: `#` human only except sha-bang; `;` and-then; `;;` case; `. file` into this shell.
20. [ ] Combined: every table row in one breath; prove quotes, dot-command vs `./`, colon vs semicolon, `\$`.
