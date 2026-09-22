# append flattened four five six

`[1, 2, 3]` should become `[1, 2, 3, 4, 5, 6]` via **`extend`**. A mistaken **`append`** of `[4, 5, 6]` nested the whole list as one item.

Also recreate the notes’ `pop` (last then index `0`) and `sort` / `sort(reverse=True)` on `[1, 3, 4, 2]`.

**Goal:** `extend` demo matches. Show the nested `append` result so you can tell them apart. `pop` final list is `[2, 3, 4]`. Descending sort is `[4, 3, 2, 1]`.
