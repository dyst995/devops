# Input and output from console

**`input([promt])`**, **`print`**

(`promt` on the slide is **`prompt`** — the optional string shown before you type. `[ ]` is notation: you may omit the prompt. Do not type those brackets.)

`input` **reads a line** from the console and returns a **`str`** (newline stripped). `print` **writes** to the console.

**Memory hook:** `input` → always a **string**. Convert if you need numbers. `print` → show it.

```text
>>> l = list(map(int, input('--> ').split()))
--> 1 2 3 4
>>> print(' '.join([str(i) for i in l]))
1 2 3 4
>>> print(*l)
1 2 3 4
>>> print(l)
[1, 2, 3, 4]
```

Chain:

1. `input('--> ')` — prompt `--> `, you type `1 2 3 4`
2. `.split()` — `['1', '2', '3', '4']`
3. `map(int, …)` — ints
4. `list(…)` — `l` is `[1, 2, 3, 4]`

Then three ways to print:

| Call | What you see |
| --- | --- |
| `' '.join([str(i) for i in l])` | `1 2 3 4` — join needs **strings** |
| `print(*l)` | `1 2 3 4` — unpack as **separate arguments** (default sep is space) |
| `print(l)` | `[1, 2, 3, 4]` — the **list** representation (brackets, commas) |

**Memory hook:** `print(l)` = Python’s picture of the list. `print(*l)` = the **items**, spaces between. `join` = one string you built.

```text
>>> import json
>>> d = json.loads(input('Input dict:'))
Input dict:{1: 'one', 2: 'two'}
>>> print(d)
{1: 'one', 2: 'two'}
```

The slide types a **Python dict literal**. Strict **JSON** needs **double quotes** and **string keys**, e.g. `{"1": "one", "2": "two"}`. `json.loads` then gives a dict (JSON object keys come back as **strings**). If `json.loads` rejects the slide’s single-quoted form, that is expected — use valid JSON at the prompt, or parse a Python literal another way. The notes’ intent: **read a line, parse it as data, print the object**.

**Memory hook:** `json.loads(string)` = string → Python object. Pair with `input`. `json.dumps` (not in this slide) is the other direction.
