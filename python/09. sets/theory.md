# Sets

A set is an **unordered** collection with **no duplicate elements**. Basic uses include **membership testing** and **eliminating duplicate entries**. Set objects also support mathematical operations like **union**, **intersection**, **difference**, and **symmetric difference**.

```python
x = {1, 2, 3, 1, 2}
y = {2, 4, 5}

print("x:", x)

print("x & y:", x & y) # x.intersection(y)
print("x | y:", x | y) # x.union(y)
print("x - y:", x - y) # x.difference(y)
print("x ^ y:", x ^ y) # x.symmetric_difference()
```

`x` is written with two `1`s and two `2`s; the set keeps each **once** → `{1, 2, 3}` (order in `print` may vary — **unordered**).

The comment on `^` is `x.symmetric_difference()`; the other set is **`y`**: `x.symmetric_difference(y)`.

```python
l = list(x)  # convert to list
```

**Memory hook:** `{1, 2, 3}` = set. `{}` is an empty **dict** ([dictionaries](../08. dictionaries/theory.md)); empty set is **`set()`**. No dups. No index (`x[0]` is not a thing).

| Op | Method | Meaning (here) |
| --- | --- | --- |
| `x & y` | `x.intersection(y)` | in **both** → `{2}` |
| `x \| y` | `x.union(y)` | in **either** → `{1, 2, 3, 4, 5}` |
| `x - y` | `x.difference(y)` | in **x not y** → `{1, 3}` |
| `x ^ y` | `x.symmetric_difference(y)` | in **one but not both** → `{1, 3, 4, 5}` |

**Memory hook:** `&` and. `\|` or. `-` only x. `^` xor (one side only). `2 in x` = membership.

## Examples

```text
>>> numbers = {1, 2, 3, 4, 5}
>>> numbers.add(4)
>>> numbers.add(6)
>>> numbers
{1, 2, 3, 4, 5, 6}
>>> numbers.pop()
1
>>> numbers
{2, 3, 4, 5, 6}
>>> numbers.discard(4)
>>> numbers
{2, 3, 5, 6}
>>> numbers.clear()
>>> numbers
set()
```

`add(4)` — `4` already there, set **unchanged** in size. `add(6)` — new. `pop()` **removes and returns** an arbitrary element (this REPL returned `1`; another run might pop a different member). `discard(4)` removes `4` if present. `clear()` → empty **`set()`**.

**Memory hook:** `add` = put in (no dup). `pop` = take **some** item out. `clear` = `set()`.

## `remove(elem)` vs `discard(elem)`

```text
>>> numbers = {2, 3, 4}
>>> numbers.discard(5)
>>> numbers.remove(5) # KeyError: 5
```

`discard` missing element → **nothing** (no error). `remove` missing → **`KeyError`**.

**Memory hook:** `discard` = silent if absent. `remove` = **KeyError** if absent (like dict missing key).

See also https://docs.python.org/3/tutorial/datastructures.html#sets
