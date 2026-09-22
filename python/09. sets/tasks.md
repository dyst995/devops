# Tasks — Sets

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Predict the set (or exception) **before** you run. Print order may differ.

## Warm-up

1. [ ] Unordered? Duplicates? Empty `set()` vs `{}`?
2. [ ] Recite `&` `|` `-` `^` in words. `discard` vs `remove`.

## Do

3. [ ] Build `x` and `y` as in the notes. `print("x:", x)` — is `1` there twice?
4. [ ] Four prints: `x & y`, `x | y`, `x - y`, `x ^ y`. Same results via the method names.
5. [ ] `l = list(x)`. `type(l)`? Membership: `2 in x`, `4 in x`.
6. [ ] Recreate `numbers` add 4, add 6, `pop`, `discard(4)`, `clear`. After `clear`, display is `set()`.
7. [ ] `{2, 3, 4}`: `discard(5)` then `remove(5)`.

## Scenario

8. [ ] Deduplicate a list by making a set then `list(...)`. Intersect with another set. Drop an id with `discard` so a missing id is safe; show `remove` on a missing id raises.
