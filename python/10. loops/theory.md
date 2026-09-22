# Loops

## Usage

### while

```python
i = 10
while i > 0:
    print(i)
    i -= 1
```

**Memory hook:** `while` = repeat **while the condition is True**. Here: print `10` down to `1`, subtract each pass. Condition is checked **before** the body.

### for

```python
for i in range(10):
    print(i)
```

**Memory hook:** `for i in iterable`. `range(10)` is `0` … `9` (ten values, **not** including 10).

### one-line (list comprehension)

```python
l = [i for i in range(10)]
print(l)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**Memory hook:** `[expr for x in iterable]` = build a **list** in one line. Same `0`–`9` as the `for` above.

## break

The **`break`** statement **terminates the loop containing it**. Control of the program flows to the statement **immediately after the body of the loop**.

```python
for val in "string":
    if val == "i":
        break
    print(val)

print("The end")
```

Output:

```text
s
t
r
The end
```

`s` `t` `r` print; at `"i"` the loop **stops**. `"n"` and `"g"` never print. Then **The end** (after the loop).

**Memory hook:** `break` = **out** of this loop. Next line after the loop runs.

## continue

The **`continue`** statement is used to **skip the rest of the code inside a loop for the current iteration only**. Loop does **not** terminate but continues on with the **next** iteration.

```python
for val in "string":
    if val == "i":
        continue
    print(val)

print("The end")
```

Output:

```text
s
t
r
n
g
The end
```

At `"i"`, `print(val)` is skipped; the loop **goes on**. `"n"` and `"g"` print. Then **The end**.

**Memory hook:** `continue` = skip **this** pass, not the whole loop. `"i"` vanished; the rest of `"string"` did not.

## else in loops

### while

In Python, the `while` statement may have an **optional `else` clause**:

```python
while i > 0:
    print(i)
    i -= 1
else: # i > 0 == False
    print("End")
```

Set `i` first (as in Usage: `i = 10`) or this `while` never runs / errors depending on `i`.

In this syntax, the condition is checked at the **beginning** of each iteration. The code block inside the `while` statement will execute as long as the condition is **True**.

When the condition becomes **False** and the loop runs **normally**, the **`else` clause will execute**. However, if the loop is terminated **prematurely** by either **`break`** or **`return`**, the `else` clause **won’t execute at all**.

Flow (course `while`…`else`):

```text
          ┌─────────────────┐
          │ check condition │
          └────────┬────────┘
             True  │  False
               ▼   │    ▼
         ┌─────────┐   ┌──────────┐
         │  body   │   │   else   │
         └────┬────┘   └────┬─────┘
              │             │
              └── back ──┐  ▼
                         │  done
         break / return ──► skip else, done
```

**Memory hook:** `while` `else` = “finished because the test is **False**.” `break` / `return` = **no** `else`.

### for

```python
for i in range(5):
    print(i)
else: # end of iteration
    print("End")
```

Output:

```text
0
1
2
3
4
End
```

The list was exhausted (`range(5)` done) → `else` runs.

```python
for i in range(4):
    print(i)
    break
else: # end of iteration
    print("End")
```

Output:

```text
0
```

`break` on the first pass → **`End` does not print**. Only `0`.

**Memory hook:** `for` `else` = “got through **every** item.” `break` (or `return`) → skip `else`. Same rule as `while` `else`.
