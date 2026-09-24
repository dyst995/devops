# Formatting and quoting — Questions

Cover the Answers section. Answer first, then check.

1. How many spaces? Tabs? Existing files?
2. Max line length? Two legal ways to break a long string?
3. Pipeline that fits vs one that does not — where does `|` sit? Same rule for `&&` / `||`?
4. Where do `; then` and `; do` go? `else`? `fi` / `done`? Why `local dir` in a function?
5. `case`: indent of patterns? Spaces on `a) cmd ;;`? Long arm layout? `;&` / `;;&`? `(` before the pattern?
6. Expansion precedence (three)? `$1` vs `${1}` vs `${10}`? `"$10"` after `set -- a b c`? Do braces quote?
7. When must you quote? Arrays for what? `"$@"` vs `"$*"` vs unquoted `$*`? Quote the integer `32`?

---

## Answers

1. Two. Never. Stay faithful to what is already there.
2. 80. Here-doc or an embedded newline inside `"…"`.
3. One line. Newline, then `  |` next segment. Yes.
4. Same line as `if`/`for`/`while`. Own line. Own line, aligned with the opener. So the name does not leak globally.
5. One level (2 spaces). Space after `)` and before `;;`. Pattern / actions / `;;` each on their own line. Avoid. No.
6. Consistent · quote · no braces on `$1`/`$?` unless needed. Use `$1`; braces for `${10}` and `${1}0`. It is `a0b0c0`, not the tenth parameter. No — you still need `"…"`.
7. Variables, `$(…)`, spaces, meta. Lists of flags: `"${FLAGS[@]}"`. As-is each arg · one joined word · word-split. No.
