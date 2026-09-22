# Tuple (immutable)

## Initialization

A tuple is a collection of objects which **ordered** and **immutable**. Tuples are **sequences**, just like lists. The differences between tuples and lists are, the tuples **cannot be changed** unlike lists and tuples use **parentheses**, whereas lists use **square brackets**.

```python
tup0 = ()

tup1 = ('physics', 'chemistry', 1997, 2000)

tup2 = (1, 2, 3, 4, 5 )

tup3 = "a", "b", "c", "d"
```

`tup0` is empty. `tup1` mixes types (same idea as `list1`). `tup3` has **no** parentheses — a **comma-separated** series is still a tuple.

**Memory hook:** list = `[ ]` mutable. tuple = `( )` **cannot change**. Commas can make a tuple without parens. Empty = `()`. One item needs a **trailing comma**: `(1,)` — `(1)` is just the int `1`.

## Access to elements / slices

Same index and slice rules as [strings](../strings/theory.md) and [lists](../lists/theory.md). A slice of a tuple is a **tuple**.

```text
>>> t = tuple(i for i in range(16))
>>> t
(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
>>> t[10:]
(10, 11, 12, 13, 14, 15)
>>> t[:10]
(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
>>> t[:10:2]
(0, 2, 4, 6, 8)
>>> t[10::-1]
(10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
>>> t[::-1]
(15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
```

`tuple(i for i in range(16))` builds `(0 … 15)` from a generator. `[10:]` from 10 to the end. `[:10]` first ten (`0`–`9`). `[:10:2]` step 2. `[10::-1]` from 10 **down to the start**. `[::-1]` full reverse.

**Memory hook:** `t[start:stop:step]` — stop excluded. `[10::-1]` = backward from 10. Result type stays **tuple**.

## Update

```text
>>> tup1 = (12, 34.56)
>>> tup2 = ('abc', 'xyz')

>>> tup1[0] = 100
TypeError: 'tuple' object does not support item assignment

>>> tup3 = tup1 + tup2
>>> print(tup3)
(12, 34.56, 'abc', 'xyz')
```

You **cannot** assign to an index. You **can** build a **new** tuple with `+` (concatenate). `tup1` and `tup2` are unchanged.

**Memory hook:** `tup[0] = …` → **TypeError**. `tup1 + tup2` → **new** tuple. Immutable ([working with data](../working-with-data/theory.md): int, float, string, **tuple**).

## Operations

### Tuple operations

```python
(1, 2) + (3, 4)      # (1, 2, 3, 4)
(1, 2) * 3           # (1, 2, 1, 2, 1, 2)
3 in (1, 2, 3)       # True
len(tup2)            # 5
max((1, 4, 2))       # 4
min((1, 4, 2))       # 1
```

`+` / `*` return a **new** tuple (same as the `tup1 + tup2` update). No `append`, `sort`, or `del t[i]` — those need a [list](../lists/theory.md).

Methods that **do not** mutate:

```python
t.count(0)           # how many
t.index(10)          # position; ValueError if missing
```

**Memory hook:** tuple ops = concatenate, repeat, `in`, `len` / `max` / `min`, `count` / `index`. No in-place edit.
