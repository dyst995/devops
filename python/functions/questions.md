# Functions — Questions

Cover the Answers section. Answer first, then check.

1. Declaration pieces: `def`, name, `()`, `:`, where args go, docstring, indent?
2. `return` vs `return None` vs skipped `return`?
3. Recite `def function_name(parameters):` skeleton (`docstring`, suite, `return`).
4. `printme` docstring and two calls — what prints?
5. By reference (course sentence)? `changeme` inside vs outside prints? Why `append` shows outside?
6. Positional vs keyword? `add(1, 2)` `add(b=2, a=1)` `add(1, b=2)`?
7. `add(a=1, 2)` vs `add(2, a=1)` — which error each?
8. `add(a, b=2)`: `add(1)` result idea? `def add(a=1, b)` error?
9. `echo(a, b, c=3, *args, **kwargs)`: each of the five calls — printed `a b c args kwargs`?

---

## Answers

1. `def name():` · args in `()` · first expression can document · indent the body.
2. Bare `return` is `None`. Skip `return` is also `None`.
3. As in the notes (`"""function_docstring"""`, `function_suite`, optional expression).
4. The two EPAM strings (docstring is not printed).
5. Argument is a reference to an existing object, not an independent copy. Both `[10, 20, 30, [1, 2, 3, 4]]`. Same mutable list.
6. Left-to-right vs `name=value`. All three are `3` (`1+2`). Keywords may be reordered.
7. `SyntaxError: positional argument follows keyword argument` · `TypeError: add() got multiple values for argument 'a'`
8. `3` (`b` defaults). `SyntaxError: non-default argument follows default argument`
9. `1 2 3 () {}` · same · `1 2 3 (4, 5) {}` · `1 2 3 (4, 5) {'d': 6}` · `1 2 3 () {'d': 6, 'e': 7}`
