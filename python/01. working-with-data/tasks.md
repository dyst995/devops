# Tasks — Working with data

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Predict the output (or exception) **before** you run. Use https://pythontutor.com/ on the alias examples.

## Warm-up

1. [ ] Square brackets in a **syntax** line: type them or not? Why are some pieces optional?
2. [ ] Recite both multiple-assignment lines. After each, print `a`, `b`, `c`.
3. [ ] Recite identity / type / value. Recite `id`, `is`, `type`.
4. [ ] Immutable types vs mutable types (two lists from the notes).

## del and conversion

5. [ ] `a, b, c` as in the notes; `del a`; `del b, c`; `print(a)`. Exact error.
6. [ ] `int` from a whole number, from a float, from a numeric string. Then `int` of a binary string with a **base**.
7. [ ] `float` from an int and from a string. `str` from an int. `type()` of each result.

## Identity / type / value

8. [ ] After `a = b = c = 1`, is `a is b` true? `id(a)` vs `id(b)`?
9. [ ] After `a, b, c = 1, 2, "john"`, `type(a)` `type(b)` `type(c)`. Can you change `a`’s type in place, or only convert to a new object?

## Immutable vs mutable (notes’ examples)

10. [ ] Recreate `x = 'foo'`, `y = x`, both prints around `y += 'bar'`. `id(x)` vs `id(y)` after `+=`.
11. [ ] Recreate `x = [1, 2, 3]`, `y = x`, both prints around `y += [3, 2, 1]`. `id(x)` vs `id(y)` after `+=`. `x is y`?
12. [ ] Put both snippets in Python Tutor. What is different about the arrows after `+=`?

## Scenario

13. [ ] Two names bound to one list; you must change the list through the second name and see it on the first. Then two names bound to one string; the same kind of `+=` must **not** change the first name. Convert a string `"10"` to int in base 2 and to float. `del` one name and show `NameError`.
