# Special characters — Questions

Cover the Answers section. Answer first, then check.

1. When is a character “special”? What three things are the building blocks of Bash scripts?
2. Recite the table: `#` `;` `;;` `.` `./file` `""` `''` `,` `\` backticks `:` `$`
3. When is `#` **not** a comment?
4. What does `;` do? How is `;;` different?
5. `. file` vs `./file` — which is the command, which is a path?
6. `echo "$USER"` vs `echo '$USER'` — what prints, and why (partial vs full)?
7. What does `,` do in arithmetic? Which value is kept?
8. What does `\` do to the next character?
9. What do backticks do?
10. What is `:`? Exit status? Easy to confuse with which table row?
11. What does `$` start?

---

## Answers

1. Meta-meaning beyond the literal character. Commands, keywords, special characters.
2. comments · command separator · `case` terminator · dot command · dot in a filename · partial quoting · full quoting · comma operator · escape · command substitution · null command · dollar sign
3. `#!` as the sha-bang on the first line.
4. Same-line sequence of commands. `;;` ends a `case` option.
5. `. file` = source in this shell. `./file` = run/name a file in `.`
6. Username vs the four characters `$USER`. Double = expand; single = literal.
7. Evaluate all, return the last.
8. Cancels (or continues a line if last).
9. Replace with the command’s output.
10. Null command (`true`). Status 0. Do not mix with `;`.
11. Variable / parameter expansion.
