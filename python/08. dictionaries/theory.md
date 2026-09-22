# Dictionaries

Dictionaries are Python’s implementation of a data structure that is more generally known as an **associative array**. A dictionary consists of a collection of **key-value pairs**. Each key-value pair **maps the key to its associated value**.

You can define a dictionary by enclosing a comma-separated list of key-value pairs in **curly braces (`{}`)**. A **colon (`:`)** separates each key from its associated value:

```python
dict0 = {}
dict1 = {'abc': 456 }
dict2 = {'abc': 123, 98.6: 37 }
dict3 = {'Alice': '2341', 'Beth': '9102'}
```

Keys and values can be different types (`dict2`: string key and float key). `dict0` is empty.

**Memory hook:** `{key: value, key: value}`. Lookup **by key**, not by position (not a list index).

## Access to dict items

```text
>>> d = {'Name':'Zara' ,'Age':7, 'Class':'First'}
>>> print("d['Name']: ", d['Name'])
d['Name']:  Zara

>>> print("d['Age']: ", d['Age'])
d['Age']:  7

>>> print("d['Alice']: ", d['Alice'])
KeyError: 'Alice'
```

Missing key → **`KeyError`**. `'Alice'` is not in this `d` (`dict3` had Alice; this `d` has Zara).

**Memory hook:** `d[key]` = value. Wrong key = **`KeyError`**. Use `get` (below) for a default instead.

## Update dict

```text
>>> d = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}

>>> d['Age'] = 8               # update existing entry
>>> d['School'] = "DPS School" # Add new entry

>>> print("d['Age']: ", d['Age'])
d['Age']:  8
>>> print("d['School']: ", d['School'])
d['School']:  DPS School
```

**Same syntax** `d[k] = v`: if `k` exists → **update**; if not → **add**.

**Memory hook:** `d[k] = v` writes. Existing key = change value. New key = new pair.

## Delete dict items

```python
d = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}

del d['Name'] # remove entry with key 'Name'
d.clear()     # remove all entries in dict
del d         # delete entire dictionary

print("d['Age']: ", d['Age'])
# NameError: name 'd' is not defined
```

`del d['Name']` drops **one pair**. `d.clear()` leaves **`{}`** (name `d` still exists). `del d` drops the **variable** → `NameError` (same idea as [working with data](../01. working-with-data/theory.md)).

**Memory hook:** `del d[k]` = one key. `clear()` = empty dict, name remains. `del d` = name gone.

## Restrictions on dictionary keys

### uniqueness

```text
>>> d = {'Name': 'Zara',  'Name': 'Manni'}
>>> print("d['Name']:", d['Name'])
d['Name']: Manni
```

Duplicate keys: the **last** write wins (`Manni`).

**Memory hook:** keys are **unique**. Second `'Name'` **replaces** Zara.

### immutable

```python
d = {['Name']: 'Zara', 'Age': 7}
print("d['Name']:", d['Name'])
# TypeError: unhashable type: 'list'
```

Keys must be **hashable** (typically **immutable**: `int`, `float`, `str`, `tuple` of hashables). A **list** is mutable → **unhashable** → cannot be a key.

**Memory hook:** key = immutable. `['Name']` as key → **TypeError**. Values have no such rule.

## Built-in functions

### Dict built-in functions

```python
len(d)              # number of keys
dict(Name='Zara')   # constructor
list(d)             # keys (as a list)
'Name' in d         # True if key exists (not searching values)
```

**Memory hook:** `'k' in d` = **key** membership. `len(d)` = how many pairs.

See also https://docs.python.org/3/tutorial/datastructures.html#dictionaries

## Dictionary methods

`[,default]` in signatures is **notation** (optional) — do not type those extra brackets.

### `clear()`: Remove all items from the dictionary

```text
>>> dict1 = {'name': 'Tom', 'age': 7}
>>> dict1.clear()
>>> dict1
{}
```

### `copy()`: Return a shallow copy of the dictionary

```text
>>> dict1 = {'name': 'Tom', 'age': 7}
>>> dict2 = dict1.copy()
>>> dict2['name'] = 'Bob'
>>> print(dict1, dict2)
{'name': 'Tom', 'age': 7} {'name': 'Bob', 'age': 7}
```

`dict2['name'] = 'Bob'` does **not** change `dict1`. (Shallow: nested **mutable values** would still be shared.)

**Memory hook:** `copy()` = second dict. `dict2 = dict1` would be the **same** object (working with data).

### `setdefault(key[, default])`

If **key is in** the dictionary, return its value.

If **not**, insert key with a value of **default** and return default.

```python
# Anti-pattern
d = {}

if "node" not in d:
    d["node"] = []

d["node"].append("item")

# Best practice
d = {}
d.setdefault("node", []).append("item")
```

Both end with `d["node"] == ["item"]`. `setdefault` creates `[]` only when `"node"` is missing, then `.append("item")` runs on that list.

**Memory hook:** `setdefault(k, default)` = get-or-insert. Notes: `[]` then `append` without a separate `if`.

### Iterate: `items()`, `keys()`, `values()`

```python
d = {'name': 'Tom', 'age': 27}
for key in d:  # == for key in d.keys()
    print(key, sep=' ')  # name age
if 'name' in d:
    print(d['name'])  # Tom
for value in d.values():
    print(value, sep=' ')  # Tom 27
for key, value in d.items():
   print(key, value)
# name Tom
# age 27
```

(`print(d['name']` on the slide is missing `)`; the call needs it.)

**Memory hook:** `for k in d` = keys. `.values()` = values. `.items()` = `(key, value)` pairs.

### `fromkeys(iterable[, value])`: Create a new dict with keys from iterable and values set to value

```text
>>> dict1 = dict.fromkeys(['one', 'two', 3])
>>> dict1
{'one': None, 'two': None, 3: None}
>>> dict2 = dict.fromkeys(['one', 'two', 3], 10)
>>> dict2
{'one': 10, 'two': 10, 3: 10}
```

Omitted value → **`None`**. Same **value** object for every key (careful if that value is a mutable list).

### `get(key[, default])`: Return the value for key if key is in the dictionary, else default

```text
>>> d = {'name': 'Tom', 'age': 27}
>>> print("My name is %s" % d.get('name'))
My name is Tom
>>> print("I'm working for %s" % d.get('job', 'EPAM'))
I'm working for EPAM
```

`'job'` is missing → default **`EPAM`**. `d['job']` would be **KeyError**. `get` with no default and missing key → **`None`** (no exception).

**Memory hook:** `get` = lookup without KeyError. Second arg = fallback.

### `pop(key[, default])`: Remove key and return its value, else return default

```text
>>> d = {1: 'a', 2: 'b'}
>>> d.pop(2)
'b'
>>> d
{1: 'a'}
>>> d.pop(3, 'c')
'c'
>>> d.pop(4) # KeyError
```

`pop(2)` returns `'b'` and removes it. `pop(3, 'c')` — no key `3` → `'c'`, dict unchanged. `pop(4)` — no key, **no** default → **KeyError**.

### `popitem()`: Remove and return a `(key, value)` pair from dict. Pairs are returned in **LIFO** order

```text
>>> d = {"one": 1, "two": 2, "three": 3, "four": 4}
>>> print(d.popitem())
('four', 4)
```

Last inserted (`four`) comes out first (Python 3.7+ insertion order).

**Memory hook:** `pop(k)` = by key. `popitem()` = last pair.

### `update(dict)`: Update the dictionary with the key/value pairs from other

```text
>>> d1 = {1: "one", 2: "three"}
>>> d2 = {2: "two"}
>>> d1.update(d2) # updates the value of key 2
>>> d1
{1: 'one', 2: 'two'}
>>> d2 = {3: "three"}
>>> d1.update(d2) # adds element with key 3
>>> d1
{1: 'one', 2: 'two', 3: 'three'}
```

Existing key → **overwrite** (`2` becomes `"two"`). New key → **add** (`3`).

**Memory hook:** `update` = merge in. Clash → other dict wins.
