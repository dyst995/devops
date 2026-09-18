# Working with data — Questions

Cover the Answers section. Answer first, then check.

1. In syntax descriptions, what are square brackets for? Do you type them? Why are some parts optional?
2. `a = b = c = 1` vs `a, b, c = 1, 2, "john"` — what does each name hold?
3. Recite the `del` syntax description. What must you **not** type from that line? `del a` then `del b, c` then `print(a)`?
4. `int(x [,base])` — what does it return? When do you pass `base`? `float(x)`? `str(x)`?
5. Every object has which three things?
6. Identity: does it change? `is` vs `id()`?
7. Type: what does it define? `type()`? Can the type of **that** object change?
8. Value: mutable vs immutable (course wording)? What decides mutability?
9. Recite the immutable types. `x = 'foo'`, `y = x`, `y += 'bar'` — `print(x)` both times?
10. Recite the mutable types. Same pattern with `x = [1, 2, 3]`, `y += [3, 2, 1]` — `print(x)` both times? Why different from the string?
11. Where do you visualize memory of this code?

---

## Answers

1. Notation only (optional parts). No. Defaults often exist.
2. All three are `1`. Then `1`, `2`, `"john"`.
3. `del var1[, var2[, var3[...., varN]]]`. The `[ ]` from the description. `NameError: name is not defined`.
4. Integer from a number or string. Optional base for a string. Float from number or string. String version of an object.
5. Identity, type, value.
6. Never after creation (think memory address). `is` compares identity; `id()` returns that integer.
7. Possible values and operations (e.g. length). Returns the type. No — unchangeable like identity.
8. Some values can change = mutable; unchangeable once created = immutable. Its type.
9. `int`, `float`, `string`, `tuple`. `foo` then still `foo`.
10. `list`, `dict`, `object`, `set`. `[1, 2, 3]` then `[1, 2, 3, 3, 2, 1]`. The list is mutated in place; the string was not.
11. https://pythontutor.com/
