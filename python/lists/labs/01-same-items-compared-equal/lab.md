# same items so they compared equal

`[1, 2, 3, 4]` and `[4, 1, 3, 2]` were treated as equal because they hold the same numbers.

Lists are **ordered**. `list1` still mixes strings and years. Index `2` must go from `1997` to `2001` by assignment, then a separate run uses `del` on index `2` so `1997` is gone and `2000` stays.

**Goal:** `==` is `False` for those two lists. Update and `del` match the course prints. Do not `remove(1997)` unless you can say how that differs from `del list1[2]`.
