# Tasks — Unit testing

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict `E`/`F`/`.` before you run. `test_prime.py` next to `prime.py`.

1. [ ] Unit testing = individual **functions**. Recite FIRST (Fast ms, Isolated, Repeatable, Self-checking, Timely ~30%).
2. [ ] Four rules: class `unittest.TestCase`; `def test_…` (no prefix → not a test); file starts with `test`; import the module.
3. [ ] Recite `TestPrime`: `setUp`/`tearDown` **each** test; `assertFalse(4)` `assertTrue(13)` `assertEqual(9→11)`. `assertEqual` vs True/False.
4. [ ] Type **slide** `prime.py` (`number/2`) and `test_prime.py`. `python test_prime.py` → **`EE`**, `TypeError` float. Do not skip.
5. [ ] Change to `number//2`. **`F`** on 4 (`True is not false`). Why empty `range(2, 2)`? What is the **`11`** in `F11`?
6. [ ] Change to `number//2 + 1` (`range` excludes stop). **`OK`**. Recite `E` vs `F` vs `.`.
7. [ ] Mock: substitutes/imitates; control behavior; HTTP flakiness; simulate outages and success. Recite `@patch('requests.get')`.
8. [ ] `get_mock.return_value.json.return_value`; `iid`→`num`, `web_url`→`link`; `side_effect` vs `return_value` (several values). `from mock import patch` vs `unittest.mock`.
9. [ ] Write the patch test (no live GitLab). Assert `expected_res`.
10. [ ] Combined: FIRST; four rules; `/` → `EE` → `//` → `F` → `+1` → `OK`; why mock HTTP ([requests](../24. requests/theory.md)); `setUp` before each.
