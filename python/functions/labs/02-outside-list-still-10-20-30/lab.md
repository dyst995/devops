# outside the function the list is still 10 20 30

`changeme` `append`s `[1,2,3,4]` onto the caller’s list. The notes’ inside and outside prints are both `[10, 20, 30, [1, 2, 3, 4]]`.

Right now the outside print is still `[10, 20, 30]` (a copy was passed, or `append` was replaced with assignment to a new list).

**Goal:** Match both comments. Explain by-reference: the argument is a reference to the existing list, not an independent copy. The nested `[1,2,3,4]` is one item (`append`, not `extend`).
