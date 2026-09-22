# Input and output — Questions

Cover the Answers section. Answer first, then check.

1. Two console builtins? What does `input` return? What is `[promt]`?
2. `list(map(int, input('--> ').split()))` — each step? Typed `1 2 3 4` → `l`?
3. `print(' '.join([str(i) for i in l]))` vs `print(*l)` vs `print(l)` — three outputs?
4. Why `str(i)` in `join`? What does `*` do in `print(*l)`?
5. `json.loads(input('Input dict:'))` — intent? What is JSON vs the slide’s `{1: 'one', …}`?

---

## Answers

1. `input`, `print`. A string. Optional prompt (slide spelling `promt`).
2. Prompt and read line → split words → int each → list. `[1, 2, 3, 4]`.
3. `1 2 3 4` · `1 2 3 4` · `[1, 2, 3, 4]`
4. `join` only joins strings. Unpack `l` as separate `print` arguments.
5. Read a line, parse as JSON/data, print the dict. JSON wants double quotes / string keys; the slide looks like a Python dict.
