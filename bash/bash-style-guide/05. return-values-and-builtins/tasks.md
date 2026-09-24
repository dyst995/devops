# Tasks — Return values and builtins

Close `theory.md`. Throwaway script.

1. [ ] **Write:** both `mv` checks (`if !` and `(( $? != 0 ))`) with the course error line on stderr + `exit 1`.
2. [ ] **Write:** the tar pipe; fail the script if `PIPESTATUS[0]` or `[1]` is nonzero.
3. [ ] **Write:** copy `"${PIPESTATUS[@]}"` then branch on `[0]` vs `[1]`. Prove `[` after the pipe would lose the array.
4. [ ] **Write:** `$(( X + Y ))` and `${string/#foo/bar}` — no `expr`, no `sed`.
5. [ ] **Memorize (cover):** `if !` · `$?` · copy `PIPESTATUS` · builtin not `sed`/`expr`.
