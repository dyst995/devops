# Tasks — Requests

Close `theory.md`. Recite, then run live `get`s in a venv. No real tokens in files.

1. [ ] **Learn:** HTTP/1.1 library; no hand query strings / form-encode — use JSON method. `pip install requests`. Docs URL.
2. [ ] **Write:** `get('https://api.github.com')`. Memorize both `if`s: `status_code` 200/404 and `if response:`.
3. [ ] **Memorize:** `.content` bytes; `.text` str; `.json()` dict/list. `current_user_url`.
4. [ ] **Write:** `auth=('user','pass')`. GitLab `headers={'Authorization': 'Bearer myToken'}` (fix slide quote).
5. [ ] **Write:** `params=payload` — memorize slide URL `?key2=value2&key1=value1`.
6. [ ] **Write:** `j[0]["items"][1]["price"]` → **50**. Also 30 at index 0.
7. [ ] **Learn:** urllib = stdlib (course **urlib**); docs howto/urllib2. requests = pip.
8. [ ] **Write:** live GitHub get; print status; content/text/json.
9. [ ] **Learn:** `params=` vs gluing `?`; `.json()` vs manual loads.
10. [ ] **Memorize (cover):** 200 vs `if response`; three body forms; auth vs Bearer; params; walk to 50.
