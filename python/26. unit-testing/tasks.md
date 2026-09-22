# Tasks — Unit testing

Close `theory.md`. Recite FIRST and the prime bugs, then type `prime.py` as on the **slide** first.

1. [ ] **Learn:** unit = **function**. **FIRST:** Fast (ms), Isolated, Repeatable, Self-checking, Timely (~30%).
2. [ ] **Memorize four rules:** `TestCase`; `def test_…`; file starts with `test`; import the module. `setUp`/`tearDown` **each** test.
3. [ ] **Write:** `TestPrime` — `assertFalse(4)` `assertTrue(13)` `assertEqual(9, 11)`.
4. [ ] **Write slide `prime.py`** (`number/2`) + tests. **`EE`** TypeError float. Memorize `/` vs `range`.
5. [ ] **Write:** `//` then **`F`** on 4 (empty `range(2,2)`). The `11` in `F11` is `print`. Then `//2 + 1` → **OK**.
6. [ ] **Memorize:** `E` exception, `F` assert, `.` pass.
7. [ ] **Learn:** mock substitutes the real object; HTTP mocks = predictable; no live GitLab.
8. [ ] **Write:** `@patch('requests.get')`; `return_value.json.return_value`; `iid`→`num`. Recite `side_effect` vs `return_value`.
9. [ ] **Memorize:** `assertEqual` expected result; True/False for booleans.
10. [ ] **Memorize (cover):** FIRST; four rules; `EE`→`F`→`OK`; mock HTTP; `setUp` each test.
