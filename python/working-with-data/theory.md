# Working with data

⚠️ **Important**

In syntax and code descriptions, **square brackets (`[ ]`) are used for notational purposes only**. To avoid syntax errors, **do not include them** when entering a command or writing code.

Square brackets indicate **optional** parts of a statement. They should not be entered.

In many cases, items in the square brackets are optional because **default values** are provided.

**Memory hook:** `[ ]` in a **syntax description** = “this part is optional.” Do **not** type those brackets. (Real Python lists use `[1, 2, 3]` — that is code, not the notation warning.)

## Multiple assignments

```python
a = b = c = 1
a, b, c = 1, 2, "john"
```

First line: **one** value, **three** names — `a`, `b`, and `c` all refer to `1`.

Second line: **unpack** three values into three names — `a` is `1`, `b` is `2`, `c` is `"john"`.

**Memory hook:** `a = b = c = 1` = same object, many names. `a, b, c = 1, 2, "john"` = **tuple unpack**, one value per name.

## Deleting variables

```text
del var1[, var2[, var3[...., varN]]] # syntax description
```

The brackets in that line are **notation only** (see the warning). You type `del` and the names, commas between them — **no** extra `[ ]`.

Example:

```python
a = 1
b = 2
c = "Hello"
del a
del b, c
print(a) # NameError: name is not defined
```

`del a` removes the **name** `a`. `del b, c` removes both names in one statement. After that, `print(a)` raises **`NameError: name is not defined`** (`b` and `c` would too).

**Memory hook:** `del` = this **name** is gone. Use it again → `NameError`. Several names: `del b, c`.

## Type conversion

```text
int(x [,base]) - returns an integer object constructed from a number or string

float(x) - returns a floating-point object constructed from a number or string

str(x) - returns a string version of an object
```

`[,base]` is optional (notation brackets). `int("10")` uses default base 10. `int("10", 2)` is binary `10` → integer `2`. `int(3.9)` truncates toward zero to `3`. `float("1.5")` → `1.5`. `str(1)` → `"1"`.

**Memory hook:** `int` / `float` / `str` **build a new object** of that type. `int(x, base)` only when `x` is a **string** (and you need a non-10 base).

## Immutable vs mutable

All the data in a Python code is represented by **objects** or by **relations between objects**. Every object has an **identity**, a **type**, and a **value**.

**Memory hook:** every object = **id + type + value**.

### Identity

An object’s identity **never changes** once it has been created; you may think of it as the object’s **address in memory**. The **`is`** operator compares the identity of two objects; the **`id()`** function returns an integer representing its identity.

**Memory hook:** `id(x)` = address-like int. `x is y` = **same object**, not only equal values.

### Type

An object’s type defines the **possible values and operations** (e.g. “does it have a length?”) that type supports. The **`type()`** function returns the type of an object. An object type is **unchangeable** like the identity.

**Memory hook:** `type(x)` never switches for that object. Need another type → **conversion** (`int` / `float` / `str`), which is a **new** object.

### Value

The value of some objects **can change**. Objects whose value can change are said to be **mutable**; objects whose value is **unchangeable** once they are created are called **immutable**.

The mutability of an object is determined by its **type**.

**Memory hook:** mutable = value can change **in place**. immutable = any “change” makes a **new** object. Type decides which.

### Immutable: `int`, `float`, `string`, `tuple`

```python
x = 'foo'
y = x
print(x) # foo


y += 'bar'
print(x) # foo
```

`y = x` — both names point at the **same** string `'foo'`. `y += 'bar'` cannot change that string (immutable) so `y` is rebound to a **new** string `'foobar'`. `x` still `'foo'`.

**Memory hook:** strings (and int, float, tuple) — `y += …` does **not** rewrite `x`.

### Mutable: `list`, `dict`, `object`, `set`

```python
x = [1, 2, 3]
y = x
print(x) # [1, 2, 3]


y += [3, 2, 1]
print(x) # [1, 2, 3, 3, 2, 1]
```

`y = x` — same **list** object. `y += [3, 2, 1]` **mutates** that list in place. `x` sees the extra items because `x` and `y` are the **same** object.

**Memory hook:** list/dict/set (and objects) — two names, one object; change through `y`, `x` changes too.

Use **https://pythontutor.com/** to visualize the memory usage of your code.
