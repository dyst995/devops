# x[1] is bb

`x = ['a', ['bb', ['ccc', 'ddd'], 'ee', 'ff'], 'g', ['hh', 'ii'], 'j']`.

`x[1]` is being treated as `'bb'` (or as `'a'`). The course chain is `x[1]`, `x[1][0]`, `x[1][1]`, `x[1][2]`, `x[1][3]`, `x[3]`, then `print(x[3][0], x[3][1])`.

**Goal:** Every one of those expressions matches the notes (`hh ii` on the last print). Nested lists: first index is the outer slot.
