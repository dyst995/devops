# This not T

`what = 'This parrot is dead'`. Indexing must match the notes: `[0]` is `'T'`, `[3]` is `'s'`, `[-1]` is `'d'`. Slices: `[0:4]` `'This'`, `[5:11]` `'parrot'`, `[1:]` all but the first character, `[:3]` `'Thi'`.

Right now `[1]` is treated as the first character, or `[0:4]` includes a fifth letter / a space.

**Goal:** Every course REPL line matches. Slice **excludes** the stop index. Over-long slice indexes do **not** raise.
