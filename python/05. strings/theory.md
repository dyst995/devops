# Strings

Strings in python support **indexing** and **slicing**. To extract a **single character** from a string, follow the string with the **index** of the desired character surrounded by **square brackets (`[ ]`)**, remembering that the **first character** of a string has index **zero**.

These `[ ]` are **real syntax** (not the optional-notation brackets in [working with data](../01. working-with-data/theory.md)).

```text
>>> what = 'This parrot is dead'
>>> what[3]
's'
>>> what[0]
'T'
```

`T h i s _ p a r r o t _ …` — index `0` is `'T'`, index `3` is `'s'`.

**Memory hook:** first character = **`[0]`**. `what[3]` is the **fourth** character.

If the subscript you provide between the brackets is **less than zero**, python counts from the **end** of the string, with a subscript of **`-1`** representing the **last** character in the string.

```text
>>> what[-1]
'd'
```

**Memory hook:** `-1` = last, `-2` = second last.

## Slicing

To extract a **contiguous piece** of a string (known as a **slice**), use a subscript consisting of the **starting position** followed by a **colon (`:`)** , finally followed by **one more than the ending position** of the slice you want to extract. Notice that the slicing **stops immediately before the second value**:

```text
>>> what[0:4]
'This'
>>> what[5:11]
'parrot'
```

`[0:4]` is indexes `0,1,2,3` — **not** `4`. `'This'` is four letters. `[5:11]` is `'parrot'`.

One way to think about the indexes in a slice is that you give the **starting position** as the value **before** the colon, and the **starting position plus the number of characters in the slice** after the colon.

For the special case when a slice starts at the **beginning** of a string or continues until the **end**, you can **omit** the first or second index, respectively. So to extract all but the first character of a string, you can use a subscript of **`1:`**.

```text
>>> what[1:]
'his parrot is dead'
```

To extract the first 3 characters of a string you can use **`:3`**.

```text
>>> what[:3]
'Thi'
```

If you use a value for a slice index that is **larger than the length** of the string, python **does not raise an exception**, but treats the index as if it was the **length of the string**.

Also, it is possible to define **step** in slice:

```text
>>> what[1:-1:2]
'hspro sda'
```

`[start:stop:step]` — here start `1`, stop `-1` (before last char), step `2` (every second character).

**Memory hook:** `[start:stop]` = half-open: **include start, exclude stop**. `[:n]` prefix. `[n:]` from n to end. `[::k]` step. Overshoot = clip, **no** `IndexError` on the slice (a **single** `what[999]` still errors).

### Copy of string

```text
>>> copy = what[:]
>>> copy
'This parrot is dead'
```

**Memory hook:** `[:]` = whole string (a copy of the value; strings are immutable so it is the same characters).

### Revert string

```text
>>> what[::-1]
'daed si torrap sihT'
```

**Memory hook:** `[::-1]` = **reverse**. Step `-1` walks backward.

## Strings formatting

```python
a, b = 1, 2
print(f"{a}+{b}={a+b}") # 1+2=3

print("String: %s integer %d" % ('str', 57)) # String: str integer 57
print("list: %s" % [1,2,3]) # list: [1, 2, 3]

print('{0} and {1}'.format('minced meat', 'eggs')) # minced meat and eggs
print('This {food} — {adjective}.'.format(food='stuffing',
                                          adjective='awful'))
# This stuffing — awful.
# (slide comment: “This stuffing — indescribably awful.” — the code’s {adjective} is awful)

print('The story about {0}e, {1}y, и {other}y.'.format(
    'Billi','Manfred', other='Georg'))
# The story about Billie, Manfredy, и Georgy.
```

Three styles in the notes:

| Style | Idea |
| --- | --- |
| **f-string** `f"{a}"` | Expression inside `{ }` |
| **`%`** `"%s" % …` | `%s` string, `%d` integer |
| **`.format()`** | `{0}` `{1}` by position, `{name}` by keyword |

`{0}e` with `'Billi'` → **Billie** (placeholder then a literal `e`). Same for `{1}y` → **Manfredy**, `{other}y` → **Georgy**.

**Memory hook:** f-string = `f"…{expr}…"`. `%s` / `%d` = old printf. `.format(0, 1, name=)` = positions and names.

## Different strings

`r'expression'`

```text
>>> print('C:\\nowhere')
C:\nowhere

>>> print(r'C:\\nowhere')
C:\\nowhere
```

In Python, strings prefixed with **`r`**, such as **`r'...'`**, are called **raw strings** and treat backslashes **`\`** as **literal** characters. Raw strings are useful when handling strings that use a lot of backslashes, such as **Windows paths** and **regular expression patterns**.

Normal `'C:\\nowhere'` — `\\` is **one** backslash → `C:\nowhere`. Raw `r'C:\\nowhere'` — both backslashes **stay** → `C:\\nowhere`.

**Memory hook:** `r'…'` = **raw**, `\` is just a character. Paths and regex.

## Methods

Strings are **immutable**. A method that “changes” the text **returns a new string**; the original is unchanged unless you assign it.

**Memory hook:** `s.upper()` does not rewrite `s`. `s = s.upper()` does.

### Case

```python
s = 'This parrot is dead'
s.upper()       # 'THIS PARROT IS DEAD'
s.lower()       # 'this parrot is dead'
s.capitalize()  # first character upper, rest lower
s.title()       # Each Word Like This
s.swapcase()    # swap upper/lower
```

### Strip (whitespace)

```python
'  dead  \n'.strip()    # 'dead'   both ends
'  dead  '.lstrip()     # 'dead  '
'  dead  '.rstrip()     # '  dead'
```

Optional argument = characters to strip, not only space: `'--dead--'.strip('-')`.

### Split and join

```python
'This parrot is dead'.split()           # ['This', 'parrot', 'is', 'dead']
'a,b,c'.split(',')                      # ['a', 'b', 'c']
' '.join(['This', 'parrot', 'is', 'dead'])  # 'This parrot is dead'
','.join(['a', 'b', 'c'])               # 'a,b,c'
```

`split()` with no arg splits on **whitespace**. `join` is called **on the separator**, with an **iterable of strings**.

**Memory hook:** `split` = string → list. `sep.join(list)` = list → string.

### Search and replace

```python
s = 'This parrot is dead'
s.replace('parrot', 'slug')   # 'This slug is dead'  (all non-overlapping)
s.find('parrot')              # 5  (or -1 if missing)
s.index('parrot')             # 5  (ValueError if missing)
s.count('s')                  # how many
s.startswith('This')          # True
s.endswith('dead')            # True
```

**Memory hook:** `find` → `-1` if absent. `index` → **error** if absent. `replace` returns a **new** string.

### Tests (`is…`)

```python
'42'.isdigit()       # True
'This'.isalpha()     # True
'A1'.isalnum()       # True
'   '.isspace()      # True
```

### Length (builtin, not a method of “change”)

```python
len(what)            # 19 for 'This parrot is dead'
```

`${#var}` in Bash was length; Python is **`len(s)`**.
