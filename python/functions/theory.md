# Function declaration

**`def` + name + `()` + `:`**

- **Arguments** go in **`()`**
- **1 expression** can be a **documentation** (the docstring — a string as the first statement in the body)
- **Indentation** defines the body
- **`return` == `return None`**
- **if `return` is skipped == `return None`**

```python
def function_name(parameters):
    """function_docstring"""
    function_suite
    return [expression]
```

`[expression]` is **notation** (optional) — do not type those brackets ([working with data](../working-with-data/theory.md)). Bare `return` or falling off the end → **`None`**.

**Memory hook:** `def name(args):` then indent. First string = docs. No return / `return` alone → **`None`**.

## Function call

```python
# Function definition
def printme(str):
   """This prints a passed string."""
   print(str)
```

```text
>>> printme("EPAM is the best company!")
EPAM is the best company!
>>> printme("Cloud & DevOps is the best department in EPAM")
Cloud & DevOps is the best department in EPAM
```

Call = **name + `()`**. The docstring does not print unless you ask (`printme.__doc__`). Parameter name `str` shadows the builtin `str` — the notes use it anyway.

**Memory hook:** define once, call with `printme("…")`. Body runs; `print` is the side effect. Implicit return **`None`**.

## Arguments by reference

By reference means that the argument you’re passing to the function is a **reference to a variable that already exists in memory** rather than an **independent copy** of that variable.

```python
def changeme(mylist):
   "This changes a passed list"
   mylist.append([1,2,3,4])
   print("Inside the function:", mylist)

mylist = [10,20,30]
changeme(mylist)
# Inside the function: [10, 20, 30, [1, 2, 3, 4]]
print("Outside the function:", mylist)
# Outside the function: [10, 20, 30, [1, 2, 3, 4]]
```

`append` mutates the **same list** ([lists](../lists/theory.md); [working with data](../working-with-data/theory.md) mutable). The nested `[1,2,3,4]` is **one** item. Inside and outside prints **match**.

**Memory hook:** mutable object in → callee can **change** the caller’s object. `append` is visible after the call. (Rebinding `mylist = …` inside would **not** replace the caller’s name.)

## Arguments

### Function arguments

### Positional and keyword arguments

```python
def add(a, b): return a + b

# positional: matched from left to right
add(1, 2)

# keyword: name=value syntax
add(a=1, b=2)
add(b=2, a=1)
add(1, b=2)

add(a=1, 2)
# SyntaxError: positional argument follows keyword argument
add(2, a=1)
# TypeError: add() got multiple values for argument 'a'
```

**Positional:** left to right → `a=1`, `b=2`. **Keyword:** `name=value`; order of keywords can swap. Mix: positional **first**, then keywords (`add(1, b=2)`).

`add(a=1, 2)` — a positional after a keyword → **SyntaxError**. `add(2, a=1)` — `2` already filled `a`, then `a=1` again → **TypeError** (multiple values for `a`).

**Memory hook:** position left→right. Keywords by name. Never positional **after** keyword. Don’t fill the same parameter twice.

### Default arguments

```python
def add(a, b=2):  # b - default
    return a + b

add(1, 2)
add(1)
add(1, b=2)
add(a=1, b=2)
add(a=1)

def add(a=1, b): return a + b
# SyntaxError: non-default argument follows default argument
```

`b=2` is used when `b` is omitted (`add(1)` → `3`). Defaults must sit **to the right**: no `def add(a=1, b)` without a default on `b`.

**Memory hook:** default = skip that arg. Non-default **cannot** follow default.

### Arbitrary argument lists

```python
def echo(a, b, c=3, *args, **kwargs):
    print(a, b, c, args, kwargs)

echo(1, 2)
# 1 2 3 () {}
echo(1, 2, 3)
# 1 2 3 () {}
echo(1, 2, 3, 4, 5)
# 1 2 3 (4, 5) {}
echo(1, 2, 3, 4, 5, d=6)
# 1 2 3 (4, 5) {'d': 6}
echo(1, b=2, d=6, e=7)
# 1 2 3 () {'d': 6, 'e': 7}
```

| Piece | Role |
| --- | --- |
| `a`, `b` | required |
| `c=3` | default |
| `*args` | extra **positional** → a **tuple** |
| `**kwargs` | extra **keywords** → a **dict** |

`echo(1, 2)` → `c` default 3, empty `args` `()`, empty `kwargs` `{}`. Extra `4, 5` land in `args`. `d=6` lands in `kwargs`. `echo(1, b=2, d=6, e=7)` fills `a` and `b` by mix of position/keyword; `c` stays 3; `d`/`e` in kwargs.

**Memory hook:** `*args` = leftover tuple. `**kwargs` = leftover dict. Defaults fill if you skip them.
