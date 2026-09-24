# Loops (study)

A loop **repeats a block** as long as the **control condition is true**. Three kinds plus **`break`** / **`continue`**.

## `for`

Each pass, `arg` takes the **next item in the list**.

```bash
for arg in [list]; do
    command(s)...
done
```

```bash
for file in "$( find . -type l )"; do
    echo "$file"
done | sort
```

`find . -type l` lists **symbolic links** under `.`. The whole loop’s stdout is piped to **`sort`**.

`for` = you already have a **list**. One pass per item.

## `while`

Test at the **top**. Keep looping while the condition is **true** (status **0**). Use when the **count is not known beforehand**.

```bash
while [ condition ]; do
  command(s)...
done
```

```bash
LIMIT=10
while [ "$a" -le $LIMIT ]; do
  echo -n "$a "          # no newline
  let "a+=1"
done
```

Give `a` a starting value first — empty `"$a"` is not a number. `-le` = ≤.

## `until`

Test at the **top**. Opposite of `while`: body runs while the condition is **false** (nonzero). Stops when the condition is **true** (0). Same `do` / `done`.

```bash
until [ condition-is-true ]; do
    command(s)…
done
```

## `break` / `continue`

- **`break`** — leave the loop.
- **`continue`** — skip the **rest of this pass**, go to the next item.

```bash
for i in {1..5}; do
  echo $i
  [[ $i -eq 3 ]] && break
done
# prints 1 2 3   — echo runs before break; 4 and 5 never print
```

`{1..5}` is the list `1 2 3 4 5`. If that line were `continue` instead, and nothing follows the test, it would still print `1` through `5` (nothing left to skip on that pass).
