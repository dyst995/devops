# Commands to memorize

```text
Good unit test: Fast (ms) Isolated Repeatable Self-checking Timely (~30%)

file test_*.py
class …(unittest.TestCase)
def test_…          # no "test" prefix → not a test
setUp() / tearDown()  # before / after EACH test

assertEqual(a, b)
assertTrue(x) / assertFalse(x)

E = error (exception)   F = fail (assert)   . = pass
```

```python
# prime.py — bugs then fixes
for i in range(2, number/2):        # TypeError float  → EE
for i in range(2, number//2):       # 4 looks prime    → F
for i in range(2, number//2 + 1):   # OK
```

```bash
python test_prime.py
# EE  →  F11 / .  →  .11 / .  OK
```

```python
from mock import patch          # or unittest.mock
@patch('requests.get')
def test_merge_requests(self, get_mock):
    # side_effect instead of return_value → several values
    get_mock.return_value.json.return_value = [
        {"iid": 1, "title": "title", "web_url": "url"}
    ]
    expected_res = [{"num": 1, "title": "title", "link": "url"}]
    self.assertEqual(get_merge_requests(), expected_res)
```
