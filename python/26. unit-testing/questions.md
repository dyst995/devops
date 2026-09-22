# Unit testing — Questions

Cover the Answers section. Answer first, then check.

1. What is unit testing (what is a unit)? Five properties of a good unit test (FIRST + ~30%)?
2. What does `prime.py` do? Two functions? Four rules to create a unit test (class, `test` prefix, file name, import)?
3. Recite `TestPrime`: `setUp` / `test_is_prime` (4 and 13) / `test_print_next_prime` (9 → ?) / `tearDown`. When do setUp/tearDown run?
4. `assertEqual` vs `assertTrue` / `assertFalse`?
5. First `python test_prime.py`: `EE` — exception and line? Fix `/` → ?
6. After `//`: `F11` — which test fails, why 4 looks prime, what is the `11`? Next `range` fix? Final result (`OK`)?
7. What is a mock? Why mock HTTP? Recite `@patch('requests.get')`, `return_value.json.return_value`, expected `num`/`link`. `side_effect` vs `return_value`?

---

## Answers

1. Individual units — **functions**. Fast (ms) · Isolated · Repeatable · Self-checking · Timely (~30%).
2. First prime **after** the input. `is_prime` and `print_next_prime`. `TestCase` subclass · `def test_…` · file starts with `test` · import the module.
3. Init docstring · `assertFalse(4)` `assertTrue(13)` · `assertEqual(..., 11)` · Finish. **Before / after each** test method.
4. Expected value · boolean / condition.
5. `TypeError: 'float' object cannot be interpreted as an integer` on `range(2, number/2)`. Floor **`//`**.
6. `test_is_prime` — `True is not false`. Empty `range(2, 2)`. Printed next prime. `number//2 + 1`. **OK** (dots + printed 11).
7. Substitute that imitates the real object; control behavior. Live services flake. Patch `requests.get`; fake json list; `iid`→`num`, `web_url`→`link`. `side_effect` = several values.
