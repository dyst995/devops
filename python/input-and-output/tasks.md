# Tasks — Input and output from console

Close `theory.md`. Type the course lines at the prompt when asked.

## Warm-up

1. `input` vs `print`. Type of `input(...)`?
2. Recite the `map`/`split` one-liner. Recite three `print`s of `l`.

## Do

3. Run `l = list(map(int, input('--> ').split()))` with `1 2 3 4`. `type(l[0])`?
4. Three prints: `join`, `*l`, `l`. Match the notes.
5. Same one-liner with `10 20`. `print(*l)` vs `print(l)`.
6. `import json` and `json.loads(input('Input dict:'))`. Use **valid JSON** (double quotes). `print(d)` and `type(d)`. If you paste the slide’s `{1: 'one', 2: 'two'}`, record what happens.

## Scenario

7. Read a line of integers, store a list of ints, print them space-separated **without** brackets, then print the list object. Then read one JSON object and print the resulting dict.
