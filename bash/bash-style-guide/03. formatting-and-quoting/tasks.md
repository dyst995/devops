# Tasks — Formatting and quoting

Close `theory.md`. Work in `/tmp/formatting-and-quoting-tasks` when writing practice scripts.

## Warm-up

1. Recite loop layout: `if …; then` / `for …; do`; `else` / `fi` / `done` alone.

## Indentation and line length

2. Write a small script indented with **2 spaces** only. Run `cat -A` or an editor “show whitespace” check — no tab characters.
3. **Break:** indent a block with tabs. **Fix:** convert to 2 spaces. Note: do not restyle an unrelated old file “for fun.”
4. Write a string longer than 80 columns as a **here document** (`cat <<END` … `END`).
5. Write the same idea as an **embedded newline** inside double quotes (`long_string="…`).

## Pipelines

6. Write a short pipeline that fits on **one** line (`command1 | command2`).
7. Write a **four-stage** pipeline split with `\` and `  |` at the start of each continuation line (2-space indent).
8. Apply the same split style to a long `cmd1 && cmd2 || cmd3` chain (pipe/`&&`/`||` on the newline).

## Loops

9. From memory, write a `for` / `if` / `else` / `fi` / `done` block matching the course layout (`for dir in "${dirs_to_cleanup[@]}"; do` …). Put `; do` and `; then` on the same line as the opener.
10. Inside a function, declare `local dir` (or comment that you should) so the loop variable does not leak. Prove leakage without `local` if you want (`echo "${dir}"` after the function).
11. **Break:** put `then` and `do` on their own lines, or put `else` inline with `if`. **Fix:** restore course layout.

## Case statement

12. Write a multi-line `case` with pattern, actions, and `;;` on **separate** lines; 2-space indent from `case`/`esac`; no `(` before the pattern; no `;&` / `;;&`.
13. Write the one-line `getopts` form: `a) aflag='true' ;;` with a **space** after `)` and before `;;`.
14. **Break:** quote the match expression, or use `;&`. **Fix:** unquoted patterns; only `;;`.

## Variable expansion

15. Write preferred specials: `echo "Positional: $1" "$5" "$3"` (no braces on single-digit positionals).
16. Write `${10}` for double-digit positionals. After `set -- a b c`, prove `"${1}0${2}0${3}0"` prints `a0b0c0` and that `"$10"` is **not** that.
17. Write preferred named vars: `echo "PATH=${PATH}, PWD=${PWD}, mine=${some_var}"` — quoted and braced.
18. **Break:** unquoted `"$PATH"`-style mistakes (e.g. bare `$PATH` in a list, or `${$}`). **Fix:** `"${PATH}"` style from the notes.

## Quoting and `"$@"` vs `"$*"`

19. Build a `FLAGS` array and call a command with `"${FLAGS[@]}"`. Set `value=32` **without** quotes around the integer literal.
20. Prefer `"$@"` when forwarding args. Demonstrate with `set -- 1 "2 two" "3 three tres"`: `"$*"` → one joined arg; `"$@"` → three args preserved.
21. **Break:** quote a literal integer (`value="32"` as your default) or use `"$*"` when you meant to forward separate args. **Fix:** `value=32`; use `"$@"`.

## Scenario

22. Ticket: “this 120-column mess of tabs, a one-line mega-pipeline, and broken `$10` expansion keeps failing code review.” Rewrite one throwaway script under `/tmp/formatting-and-quoting-tasks` that follows every rule in this topic (indent, 80 cols / here-doc, split pipeline, loop/`case` layout, braces/quotes, `"$@"` / array flags). Show a before snippet that breaks rules and the fixed file.
