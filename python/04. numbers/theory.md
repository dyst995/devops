# Numbers

Python has **three built-in numeric data types**: **integers**, **floating-point numbers**, and **complex numbers**.

**Memory hook:** numeric = **`int` / `float` / `complex`**. Nothing else is a built-in number type. (`bool` is a subclass of `int`, not a fourth kind on this list.)

They are **immutable** ([working with data](../01. working-with-data/theory.md)): a “change” is a **new** object. `type()` names which of the three you have.

## Integers (`int`)

Whole numbers: no fractional part. Sign allowed. Python 3 `int` has **no fixed max** (grows as needed).

```python
n = 10
n = -3
n = 0
type(n)          # <class 'int'>
int(3.9)         # 3  (toward zero)
int("10")        # 10
int("10", 2)     # 2  (base optional — notation [ ] in that topic)
```

**Memory hook:** `int` = **whole**. `range`, loop counters, `i -= 1` in [loops](../10. loops/theory.md) are ints.

## Floating-point numbers (`float`)

Numbers with a **decimal** (or scientific) part. Built-in `float` is a C **double** (binary IEEE-754). Not every decimal is exact (`0.1 + 0.2`).

```python
x = 3.14
x = 1.0
x = 2e3          # 2000.0
type(x)          # <class 'float'>
float(10)        # 10.0
float("1.5")     # 1.5
```

Mixing `int` and `float` in `+` `-` `*` `/` typically gives a **float**. True division `/` of two ints is a **float** (`1 / 2` → `0.5`). Integer division is `//`.

**Memory hook:** `float` = **dot or `e`**. `/` → float. `//` → int (floor).

## Complex numbers (`complex`)

A **real** part plus an **imaginary** part. In code the imaginary unit is **`j`** (not `i`).

```python
z = 3 + 4j
z = 4j             # 0 + 4j
type(z)            # <class 'complex'>
z.real             # 3.0  (a float)
z.imag             # 4.0
complex(3, 4)      # (3+4j)
complex("1+2j")    # (1+2j)
```

**Memory hook:** `j` suffix = complex. `.real` / `.imag` are **floats**.

## Recite

| Type | Class | Example | Typical conversion |
| --- | --- | --- | --- |
| integer | `int` | `10` | `int(x)` |
| floating-point | `float` | `3.14` | `float(x)` |
| complex | `complex` | `3+4j` | `complex(re, im)` |

`str(x)` is the string form of any of them ([working with data](../01. working-with-data/theory.md) type conversion).
