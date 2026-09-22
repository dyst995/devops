# Lists

In short, a list is a **collection of arbitrary objects**, somewhat akin to an **array** in many other programming languages but **more flexible**. Lists are defined in Python by enclosing a **comma-separated sequence of objects in square brackets (`[]`)**, as shown below:

```python
list1 = ['physics', 'chemistry', 1997, 2000]

list2 = [1, 2, 3, 4, 5 ]

list3 = ["a", "b", "c", "d"]
```

These `[ ]` are **real syntax** (a list literal). They are not the optional-notation brackets in [working with data](../01. working-with-data/theory.md).

**Memory hook:** list = `[item, item, …]`. Mixed types are fine (`list1`). Flexible array.

## Important characteristics

The important characteristics of Python lists are as follows:

### Lists are ordered

```text
>>> [1, 2, 3, 4] == [4, 1, 3, 2]
False
```

Same elements, **different order** → **not** equal.

**Memory hook:** order matters. `[1, 2] != [2, 1]`.

### Lists can contain any arbitrary objects

See `list1`: strings and ints in one list. Nested lists (below) are objects too.

### List elements can be accessed by index. Slicing also works for lists

```text
>>> a = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge']
```

Same rules as [strings](../05. strings/theory.md): `[0]` first, `[-1]` last, `[start:stop]` excludes stop, `[::-1]` reverse.

```python
a[0]       # 'foo'
a[-1]      # 'corge'
a[1:4]     # ['bar', 'baz', 'qux']
```

### Lists can be nested to arbitrary depth

A list can contain any number of objects, from **zero** to as many as your computer’s **memory** will allow.

```text
>>> x = ['a', ['bb', ['ccc', 'ddd'], 'ee', 'ff'], 'g', ['hh', 'ii'], 'j']


>>> x[1]
['bb', ['ccc', 'ddd'], 'ee', 'ff']
>>> x[1][0]
'bb'
>>> x[1][1]
['ccc', 'ddd']
>>> x[1][2]
'ee'
>>> x[1][3]
'ff'
>>> x[3]
['hh', 'ii']
>>> print(x[3][0], x[3][1])
hh ii
```

`x[1]` is a **list**. `x[1][1]` is the nested `['ccc', 'ddd']`. Chain indexes: outer then inner.

**Memory hook:** `x[i][j]` = go in `i`, then `j`. Empty list = `[]`.

### Lists are mutable

Value can change **in place** (working with data: list, dict, object, set).

#### Update items

```text
>>> list1 = ['physics', 'chemistry', 1997, 2000]
>>> print(list1[2])
1997
>>> list1[2] = 2001
>>> print(list1[2])
2001
```

**Memory hook:** `list1[2] = 2001` **rewrites that slot**. Strings cannot do this.

#### Delete items

```text
>>> list1 = ['physics', 'chemistry', 1997, 2000]
>>> print(list1)
['physics', 'chemistry', 1997, 2000]
>>> del list1[2]
>>> print(list1)
['physics', 'chemistry', 2000]
```

`del list1[2]` removes **index** 2 (`1997`). Later items shift left.

**Memory hook:** `del list[i]` = drop **that index**. `del` on a **name** (working with data) drops the variable; here it drops an **element**.

## Operations

Sequence operations that apply to lists:

```python
[1, 2] + [3, 4]      # [1, 2, 3, 4]   concatenate
[1, 2] * 3           # [1, 2, 1, 2, 1, 2]
3 in [1, 2, 3]       # True
for item in list2:
    ...
```

`+` and `*` **return a new list**. `append` / `extend` (methods) change **in place**.

**Memory hook:** `+` / `*` = new list. Methods below often mutate **this** list.

## Built-in functions

```python
len(list2)           # 5
max([1, 4, 2])       # 4
min([1, 4, 2])       # 1
sum([1, 2, 3])       # 6
sorted([1, 3, 4, 2]) # [1, 2, 3, 4]  new list; original unchanged
list("ab")           # ['a', 'b']
```

**Memory hook:** `sorted(x)` = **new** list. `x.sort()` = **in place** (methods). `len` / `max` / `min` / `sum` = builtins.

## List methods

See https://docs.python.org/3/tutorial/datastructures.html#more-on-lists for additional information.

`[start, [stop]]` and `[index = -1]` in the signatures below are **notation** (optional parts) — do not type those extra brackets.

### `append(value)`: Append an item to the list

```text
>>> numbers = [1, 2]
>>> numbers.append(3)
>>> numbers
[1, 2, 3]
```

**Memory hook:** `append` = one object on the **end**. `append([4, 5])` would add **one** nested list.

### `count(value)`: Count the occurrences of a given item in the list

```text
>>> numbers = [1, 2, 3, 3]
>>> numbers.count(3)
2
```

### `extend(iterable)`: Extend list with the another list items

```text
>>> numbers = [1, 2, 3]
>>> numbers.extend([4, 5, 6])
>>> numbers
[1, 2, 3, 4, 5, 6]
```

**Memory hook:** `extend` = **many** items from an iterable. `append` = **one** item.

### `index(value, [start, [stop]])`: Find position of item; Raise `ValueError` if not found

```text
>>> numbers = [1, 5, 3]
>>> numbers.index(5)
1
```

Optional `start` / `stop` limit the search (same idea as slice bounds). Missing value → **`ValueError`** (like `str.index`).

### `insert(index, value)`: Insert an item into the specified position

```text
>>> numbers = [1, 3]
>>> numbers.insert(1, 2)
>>> numbers
[1, 2, 3]
```

`insert(1, 2)` puts `2` **at** index 1; old `3` shifts right.

### `pop([index = -1])`: Get and remove the last (specified) item from the list

```text
>>> numbers = [1, 2, 3, 4, 5]
>>> numbers.pop()
5
>>> numbers.pop(0)
1
>>> numbers
[2, 3, 4]
```

No argument → **last** item (`index = -1`). `pop(0)` → first. **Returns** the value **and** removes it.

**Memory hook:** `pop` = take out (default tail). `del` = drop, no return. `remove` = drop by **value**.

### `remove(value)`: Remove the specified item from the list

```text
>>> numbers = [1, 2, 'a', 3, 4]
>>> numbers.remove('a')
>>> numbers
[1, 2, 3, 4]
```

Removes the **first** match. Missing → `ValueError`.

### `reverse()`: Reverse the items of the list in place

```text
>>> numbers = [1, 2, 3, 4, 5]
>>> numbers.reverse()
>>> numbers
[5, 4, 3, 2, 1]
```

**In place** (returns `None`). Slice `[::-1]` is a **new** list.

### `sort(cmp=None, key=None, reverse=False)`: Sort the items of the list in place

```text
>>> numbers = [1, 3, 4, 2]
>>> numbers.sort() # Sorting list of integers in ascending
>>> numbers
[1, 2, 3, 4]
>>> numbers.sort(reverse = True) # Sorting list of integers in descending
>>> numbers
[4, 3, 2, 1]
```

Python **3** does not use `cmp` (Python 2). Use **`key=`** and **`reverse=`**. In place; `sorted(numbers)` if you need a copy.

**Memory hook:** `sort()` ascending. `sort(reverse=True)` descending. Mutates **this** list.
