# Tasks — Formatting and quoting

Close `theory.md`. Work in `/tmp/formatting-and-quoting-tasks` when writing practice scripts.

## Warm-up

1. Recite: indent **2 spaces**, **no tabs**; max line length **80**; stay faithful to existing files’ style.
2. Recite loop layout: `if …; then` / `for …; do`; `else` / `fi` / `done` alone.
3. Recite expansion precedence: consistent with existing → quote vars → braces on named vars, not on `$1`-style specials unless needed.

## Indentation and line length

4. Write a small script indented with **2 spaces** only. Run `cat -A` or an editor “show whitespace” check — no tab characters.
5. **Break:** indent a block with tabs. **Fix:** convert to 2 spaces. Note: do not restyle an unrelated old file “for fun.”
6. Write a string longer than 80 columns as a **here document** (`cat <<END` … `END`).
7. Write the same idea as an **embedded newline** inside double quotes (`long_string="…`).

## Pipelines

8. Write a short pipeline that fits on **one** line (`command1 | command2`).
9. Write a **four-stage** pipeline split with `\` and `  |` at the start of each continuation line (2-space indent).
10. Apply the same split style to a long `cmd1 && cmd2 || cmd3` chain (pipe/`&&`/`||` on the newline).

## Loops

11. From memory, write a `for` / `if` / `else` / `fi` / `done` block matching the course layout (`for dir in "${dirs_to_cleanup[@]}"; do` …). Put `; do` and `; then` on the same line as the opener.
12. Inside a function, declare `local dir` (or comment that you should) so the loop variable does not leak. Prove leakage without `local` if you want (`echo "${dir}"` after the function).
13. **Break:** put `then` and `do` on their own lines, or put `else` inline with `if`. **Fix:** restore course layout.

## Case statement

14. Write a multi-line `case` with pattern, actions, and `;;` on **separate** lines; 2-space indent from `case`/`esac`; no `(` before the pattern; no `;&` / `;;&`.
15. Write the one-line `getopts` form: `a) aflag='true' ;;` with a **space** after `)` and before `;;`.
16. **Break:** quote the match expression, or use `;&`. **Fix:** unquoted patterns; only `;;`.

## Variable expansion

17. Write preferred specials: `echo "Positional: $1" "$5" "$3"` (no braces on single-digit positionals).
18. Write `${10}` for double-digit positionals. After `set -- a b c`, prove `"${1}0${2}0${3}0"` prints `a0b0c0` and that `"$10"` is **not** that.
19. Write preferred named vars: `echo "PATH=${PATH}, PWD=${PWD}, mine=${some_var}"` — quoted and braced.
20. **Break:** unquoted `"$PATH"`-style mistakes (e.g. bare `$PATH` in a list, or `${$}`). **Fix:** `"${PATH}"` style from the notes.

## Quoting and `"$@"` vs `"$*"`

21. Build a `FLAGS` array and call a command with `"${FLAGS[@]}"`. Set `value=32` **without** quotes around the integer literal.
22. Prefer `"$@"` when forwarding args. Demonstrate with `set -- 1 "2 two" "3 three tres"`: `"$*"` → one joined arg; `"$@"` → three args preserved.
23. Recite the table: unquoted `$*`/`$@` vs `"$@"` vs `"$*"`. Optional: skip quotes on `$?` `$#` `$$` `$!`; still prefer quoting named integers like `"${PPID}"`.
24. **Break:** quote a literal integer (`value="32"` as your default) or use `"$*"` when you meant to forward separate args. **Fix:** `value=32`; use `"$@"`.

## Scenario

25. Ticket: “this 120-column mess of tabs, a one-line mega-pipeline, and broken `$10` expansion keeps failing code review.” Rewrite one throwaway script under `/tmp/formatting-and-quoting-tasks` that follows every rule in this topic (indent, 80 cols / here-doc, split pipeline, loop/`case` layout, braces/quotes, `"$@"` / array flags). Show a before snippet that breaks rules and the fixed file.
