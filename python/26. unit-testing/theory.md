# Unit testing

**Unit testing** is a software testing method by which individual **units** of source code — **functions**.

This is the **base** of the [test pyramid](../25. testing/theory.md).

## A good unit test

| Property | Course meaning |
| --- | --- |
| **Fast** | Unit tests should take very little time to run. **Milliseconds**. |
| **Isolated** | Standalone, doesn’t depend on each other. |
| **Repeatable** | Always returns the **same** result. |
| **Self-Checking** | Automatically detects result: **passed** or **failed**. |
| **Timely** | Writing of unit tests shouldn’t take more time than code writing (**~ 30%**). |

**Memory hook:** **FIRST** — Fast, Isolated, Repeatable, Self-checking, Timely (~30%).

## `prime.py`

We have a script that finds the **first prime number after** the number provided.

```python
# prime.py
def is_prime(number):
  """Return True if number is prime, otherwise False"""
  for i in range(2, number/2):
    if number % i == 0:
      return False
  return True

def print_next_prime(number):
  """Print the closest prime number"""
  index = number
  while True:
    index += 1
    if is_prime(index):
      print(index)
      return index

if __name__ == "__main__":
  n = int(input("Input number:"))
  print_next_prime(n)
```

It looks pretty good. It seems no sense to create a unit test for it :)  However, let's do it.

We have **two functions**. And **both** of them should be covered with unit tests.

**Memory hook:** `is_prime` + `print_next_prime` — two units, two tests. Looks fine ≠ is fine.

## How to create a unit test

To create a unit test, we have to:

1. Create a **class** derived from **`unittest.TestCase`**
2. Create a function that starts with **`"test"`**. If the function doesn't have the prefix `"test"` in its name, it **won't be considered** as a test.
3. The name of the **file** that contains unit tests also should start with **`"test"`**.
4. **import** the module that we are going to test.

```python
# test_prime.py
import unittest
import prime

class TestPrime(unittest.TestCase):

  def setUp(self):
    """Init"""

  def test_is_prime(self):
    """Test for is _prime"""
    self.assertFalse(prime.is_prime(4))
    self.assertTrue(prime.is_prime(13))

  def test_print_next_prime(self):
    self.assertEqual(prime.print_next_prime(9), 11)


  def tearDown(self):
    """Finish"""
    
    
if __name__ == "__main__":
     unittest.main()
```

In this example we used:

- **`assertEqual()`** function to check for an expected result.
- **`assertTrue()`** or **`assertFalse()`** to verify a condition or boolean result
- **`setUp()`** and **`tearDown()`** methods to define instructions that will be executed **before** and **after** **each** test method

Other methods can be found here. (course: unittest assert docs)

**Memory hook:** file `test_*.py` · class(`TestCase`) · `def test_…` · `setUp` before / `tearDown` after **each** test.

| Call | Course use |
| --- | --- |
| `assertFalse(prime.is_prime(4))` | 4 is not prime |
| `assertTrue(prime.is_prime(13))` | 13 is prime |
| `assertEqual(prime.print_next_prime(9), 11)` | next prime after 9 is 11 |

## Run tests (first: `EE`)

```text
$ python test_prime.py 
EE
======================================================================
ERROR: test_is_prime (__main__.TestPrime)
Test for is _prime
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_prime.py", line 11, in test_is_prime
    self.assertFalse(prime.is_prime(4))
  File "/home/user/test/prime.py", line 3, in is_prime
    for i in range(2, number/2):
TypeError: 'float' object cannot be interpreted as an integer

======================================================================
ERROR: test_print_next_prime (__main__.TestPrime)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_prime.py", line 15, in test_print_next_prime
    self.assertEqual(prime.print_next_prime(9), 11)
  File "/home/user/test/prime.py", line 13, in print_next_prime
    if is_prime(index):
  File "/home/user/test/prime.py", line 3, in is_prime
    for i in range(2, number/2):
TypeError: 'float' object cannot be interpreted as an integer

----------------------------------------------------------------------
Ran 2 tests in 0.001s

FAILED (errors=2)
```

**`E`** = **error** (exception), not a failed assertion. Both tests hit `range(2, number/2)` — in Python 3 **`/`** is **float** (`4/2` is `2.0`). `range` needs **ints**.

Update line 3, replace common division **`/`** with floor division **`//`**:

```python
for i in range(2, number//2):
```

**Memory hook:** first run **`EE`** — `TypeError` float. `/` → **`//`**.

## After `//` (`F` + printed `11`)

```text
$ python test_prime.py 
F11
.
======================================================================
FAIL: test_is_prime (__main__.TestPrime)
Test for is _prime
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_prime.py", line 11, in test_is_prime
    self.assertFalse(prime.is_prime(4))
AssertionError: True is not false

----------------------------------------------------------------------
Ran 2 tests in 0.000s

FAILED (failures=1)
```

**`F`** = **failure** (assert). `is_prime` doesn't return the correct value for number **4**. `range(2, 4//2)` is `range(2, 2)` — **empty**, so the loop never runs and it returns **`True`**. The **`11`** in `F11` is `print_next_prime` printing **11** during the other test (that one **`.`** passed).

Let's add **1** to the second parameter of `range()` as `range()` **doesn't include the last number** into the range:

```python
for i in range(2, number//2 + 1):
```

Result:

```text
$ python test_prime.py 
.11
.
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

Both pass. `.11` then `.` — again **`print(11)`** in the middle of the dots. **`OK`**.

**Memory hook:** `EE` crash → `//` → `F` wrong 4 → `//2 + 1` → **`OK`**. `E` exception · `F` assert · `.` pass.

## Mocking

A **mock** object **substitutes and imitates** a real object within a testing environment. It is a versatile and powerful tool for improving the quality of your tests.

One reason to use Python mock objects is to **control your code’s behavior** during testing.

For example, if your code makes **HTTP requests** to external services, then your tests execute predictably only so far as the services are behaving as you expected. Sometimes, a temporary change in the behavior of these external services can cause **intermittent failures** within your test suite.

Because of this, it would be better for you to test your code in a **controlled environment**. Replacing the actual request with a mock object would allow you to **simulate external service outages** and **successful responses** in a **predictable** way.

```python
def get_merge_requests(state=None):
    response = requests.get('https://git.epam.com/api/v4/projects/124721/merge_requests',
                            params={"state": state, "per_page": "100"},
                            headers=HEADERS)
    res = []
    for item in response.json():
        res.append({"title": item["title"],
                    "num": item["iid"],
                    "link": item["web_url"]})
    return res
```

```python
from mock import patch
class TestMergeRequests(TestCase):
    @patch('requests.get')
    def test_merge_requests(self, get_mock):
        # use side_effect instead of return_value to provide several values
        get_mock.return_value.json.return_value =
            [{"iid": 1, "title": "title", "web_url": "url"}]
        expected_res = [{"num": 1, "title": "title", "link": "url"}]
        res = get_merge_requests()
        self.assertEqual(res, expected_res)
```

`@patch('requests.get')` replaces **`requests.get`**. The mock is injected as **`get_mock`**. `get_mock.return_value.json.return_value = […]` fakes **`response.json()`**. Mapping: API **`iid`** → **`num`**, **`web_url`** → **`link`**. Course comment: use **`side_effect`** instead of **`return_value`** to provide **several** values.

Slide import is **`from mock import patch`**. Stdlib equivalent: **`from unittest.mock import patch`**.

See also here and here. (course extra links)

**Memory hook:** mock = fake the HTTP. `@patch('requests.get')` · `return_value.json.return_value` · no live GitLab.

To run the suite with **nose** and measure **coverage**: [nose + coverage](../27. nose-coverage/theory.md).
