# print still shows brackets

After `l = list(map(int, input('--> ').split()))` with `1 2 3 4`, three prints from the notes:

- `join` of `str(i)` → `1 2 3 4`
- `print(*l)` → `1 2 3 4`
- `print(l)` → `[1, 2, 3, 4]`

Right now every print still has brackets, or `join` failed because the ints were not converted to strings.

**Goal:** All three outputs match. `input` returns a string; `split` + `map(int)` makes the list of ints.
