# Tasks — Strings

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict the exact string **before** you run. `what = 'This parrot is dead'`.

1. [ ] Indexing: `[ ]` here — notation or real syntax? `what[0]`, `what[3]`, `what[-1]`. First vs fourth vs last character.
2. [ ] Slicing: stop is **excluded**. Predict `what[0:4]`, `what[5:11]`, `what[1:]`, `what[:3]`. Recite “start plus length” idea.
3. [ ] Oversized slice index — exception or clip? Single `what[999]` vs slice. Predict `what[1:-1:2]`.
4. [ ] Copy `what[:]`. Reverse `what[::-1]` — exact reversed sentence.
5. [ ] Recite three format styles from the notes: f-string `a,b`; `%s`/`%d`; `{0}` `{1}` `.format`; named `{food}`.
6. [ ] `print('C:\\nowhere')` vs `print(r'C:\\nowhere')` — exact outputs. What does raw do?
7. [ ] Recite methods: `upper` `lower` `strip` `split` `join` `replace` `find` `startswith` `len`. Run one of each on `what`.
8. [ ] Interview: strings are immutable — `what[0] = 't'`? How do you “change” a character?
9. [ ] Write from memory: extract `'parrot'` and `'This'` from `what` using slices only.
10. [ ] Combined: index 0 and -1; slice half-open; step; reverse; one `%` print and one f-string; raw vs normal backslash.
