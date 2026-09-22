# Tasks — Functions

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict prints and **exact** exceptions.

1. [ ] Recite `def` pieces: name, `()`, `:`, args, docstring, indent. `return` vs `return None` vs skipped `return`.
2. [ ] Recreate `printme`. Two course strings. Does the docstring print? Implicit return value?
3. [ ] By reference: recites the course sentence. `changeme` + `append([1,2,3,4])` — inside vs outside prints. Why does `append` show outside? Nested list is **one** item.
4. [ ] Positional vs keyword: `add(1,2)` `add(b=2,a=1)` `add(1,b=2)`. All `3`.
5. [ ] `add(a=1, 2)` vs `add(2, a=1)` — which error each (SyntaxError vs TypeError)? Recite the messages.
6. [ ] Defaults: `add(a, b=2)`; `add(1)` → `3`. `def add(a=1, b)` — exact SyntaxError. Rule: non-default cannot follow default.
7. [ ] Recite `echo(a, b, c=3, *args, **kwargs)` and all five course calls (prints of `a b c args kwargs`).
8. [ ] Interview: rebind `mylist = []` inside vs `append` — which affects the caller? Prove it.
9. [ ] Write from memory: `*args` is a **tuple**, `**kwargs` is a **dict**. One extra positional and one extra keyword.
10. [ ] Combined: None return; same-list append; keyword-then-positional SyntaxError; default on the right; echo five-call table.
