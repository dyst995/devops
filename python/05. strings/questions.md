# Strings — Questions

Cover the Answers section. Answer first, then check.

1. Index of the first character? `what[3]` and `what[0]` for `'This parrot is dead'`?
2. Negative subscript: `-1` means? `what[-1]`?
3. Slice: what is before `:` and after? Does it include the stop index? `what[0:4]` `what[5:11]`?
4. Another way to think about slice indexes (start + length)?
5. Omit first or second index: `what[1:]` `what[:3]`?
6. Slice index **larger than the length** — exception?
7. Step: `what[1:-1:2]` result? Copy: `what[:]`? Reverse: `what[::-1]`?
8. Three formatting styles in the notes? `f"{a}+{b}={a+b}"` output? `%s` / `%d` line? `{0} and {1}`? Why Billi → Billie?
9. `r'...'` name and `\` behavior? `'C:\\nowhere'` vs `r'C:\\nowhere'` prints? Used for?
10. Methods: immutable — does `s.upper()` change `s`? `split` vs `join`? `find` vs `index` if missing? `strip`?

---

## Answers

1. Zero. `'s'` · `'T'`
2. Last character. `'d'`
3. Start · one past the end. No. `'This'` · `'parrot'`
4. Start before colon; start + character count after colon.
5. `'his parrot is dead'` · `'Thi'`
6. No; treated as the length.
7. `'hspro sda'` · `'This parrot is dead'` · `'daed si torrap sihT'`
8. f-string, `%`, `.format()`. `1+2=3`. `String: str integer 57`. `minced meat and eggs`. Literal `e` after `{0}`.
9. Raw strings; backslash is literal. `C:\nowhere` vs `C:\\nowhere`. Windows paths, regex.
10. No (new string). split → list, join on the separator. `-1` vs `ValueError`. Whitespace (or given chars) off the ends.
