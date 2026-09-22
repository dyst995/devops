# Tasks — Unit testing

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Work in a throwaway folder. `test_prime.py` next to `prime.py`.

## Warm-up

1. [ ] Unit = function. FIRST (+ ~30%). Four rules (`TestCase`, `test_`, file name, import). `setUp`/`tearDown` when?
2. [ ] Recite `EE` (`/` float) → `//` → `F` (4 / empty range) → `//2 + 1` → `OK`. `E` vs `F` vs `.`?

## Do

3. [ ] Type **`prime.py` as on the slide** (`number/2`). Type **`test_prime.py`**. `python test_prime.py` — **`EE`**, `TypeError` float. Do not skip this.
4. [ ] Change to **`number//2`**. Run again — **`F`** on `is_prime(4)` (`True is not false`). See **11** printed from `print_next_prime`.
5. [ ] Change to **`number//2 + 1`**. **`OK`**. Recite why `range` needs the `+ 1`.
6. [ ] Copy `get_merge_requests` + the `@patch('requests.get')` test (`unittest.mock` is fine if `mock` is not installed). Fake json; assert `num` / `link`. No live `git.epam.com`. Recite `side_effect` vs `return_value`.

## Complete

7. [ ] Without looking: `assertFalse(4)` `assertTrue(13)` `assertEqual(9 → 11)`. One sentence: why mock HTTP ([requests](../24. requests/theory.md)) instead of calling GitLab in the unit test.
