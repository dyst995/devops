# Tasks — STDOUT vs STDERR

Close `theory.md`. Recite, then write a throwaway script.

1. [ ] **Memorize:** errors → STDERR. Status → STDOUT. Why (`>out` vs `2>err`).
2. [ ] **Write:** the `err` function from memory (`date` format, `"$*"`, `>&2`).
3. [ ] **Write:** `if ! do_something; then err …; exit 1; fi`. Prove a failure prints on stderr only (`2>` a file, stdout empty).
4. [ ] **Learn:** forget `>&2` — the same `err` line lands in `>out.txt`.
5. [ ] **Memorize (cover):** `err` body; `>&2`; `exit 1` after an error.
