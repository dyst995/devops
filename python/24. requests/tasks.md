# Tasks — Requests

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Use a **venv**. Prefer `python -m pip`. Network needed for live `get`s.

## Warm-up

1. [ ] What is Requests? Install? `.content` / `.text` / `.json()`? `auth=` vs `headers=` vs `params=`?
2. [ ] Recite the `j` walk to num=2 price. urllib vs requests (docs URL / stdlib)?

## Do

3. [ ] `pip install requests`. `requests.get('https://api.github.com')`. Print `status_code`. Both `if` styles from the notes (`== 200` / `== 404` and `if response`).
4. [ ] Same response: look at `.content` (bytes), `.text` (str), `.json()` (`current_user_url` in the dict).
5. [ ] `params={'key1': 'value1', 'key2': 'value2'}` against a URL you control or `https://httpbin.org/get`. Print `r.url` — query string built for you. Recite the slide URL (`some.org/obj?key2=…&key1=…`).
6. [ ] Recreate `j` in the REPL. `j[0]["items"][1]["price"]` is **50**. Also get price **30** (index `0`) without looking.

## Complete

7. [ ] Recite GitHub `auth=('user', 'pass')` and Epam `Authorization: Bearer …` (fix the missing quote). Do **not** send a real password or token in a chat or a committed file. One sentence: why `params=` beats gluing `?` onto the URL.
