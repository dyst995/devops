# Tasks — Input and output

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict types and exact prints. `input` always returns **str**.

1. [ ] Recite `input([promt])` (course spelling). Optional prompt — notation `[ ]`? Return type?
2. [ ] Recite `print`. Contrast with `input`.
3. [ ] `list(map(int, input('--> ').split()))` — type each step (`split` → `map` → `list`). For `1 2 3 4` exact `l`.
4. [ ] Three ways to print that list: `' '.join(...)` vs `print(*l)` vs `print(l)` — exact outputs (spaces vs brackets).
5. [ ] Interview: why does `print(l)` still show brackets? How do you print numbers space-separated without brackets?
6. [ ] `json.loads(input('Input dict:'))` — what type is `d` if the user types valid JSON? What if they type a Python dict with `'` quotes?
7. [ ] Write a tiny script: prompt, parse ints from one line, print with `*` unpack and with `join`.
8. [ ] `input` of `10` then `int(...)` vs using it as a number without conversion — what error?
9. [ ] Recite from memory: prompt optional; return str; map+split recipe; three print forms.
10. [ ] Combined: `--> 1 2 3 4` → list of ints → `1 2 3 4` on one line twice (join and `*`) and once as `[1, 2, 3, 4]`.
