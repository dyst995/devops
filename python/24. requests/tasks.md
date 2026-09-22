# Tasks — Requests

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite API. venv; network for live `get`s. Do **not** commit real tokens.

1. [ ] Docs URL? HTTP library / HTTP/1.1? What you do **not** add by hand (query strings, form-encode PUT/POST)? Use JSON method nowadays? 30M/week, 1M+ repos? `pip install requests`.
2. [ ] Recite `get('https://api.github.com')` and both `if` blocks (`200`/`404` and `if response`). Truthy vs 4xx?
3. [ ] `.content` vs `.text` vs `.json()` — types. GitHub `current_user_url` in json.
4. [ ] `auth=('user', 'pass')` on GitHub `/user`. Epam GitLab `headers={'Authorization': 'Bearer myToken'}` — fix the missing quote on the slide.
5. [ ] `params={'key1':'value1','key2':'value2'}` — slide `r.url` (`key2` then `key1`). You do not concatenate `?`.
6. [ ] JSON `j` — `j[0]["items"][1]["price"]` → **50**. Also price **30** (index 0). Curly quotes on the slide?
7. [ ] urllib docs URL. requests vs urllib (pip vs stdlib). Course spelling **urlib**.
8. [ ] Live: `get` GitHub; print `status_code`; both `if` styles; inspect content/text/json.
9. [ ] Interview: why `params=` and `.json()` beat manual `?` and `json.loads(response.text)` in one sentence each.
10. [ ] Combined: 200 vs `if response`; three body forms; auth vs Bearer; params URL; walk to 50; urllib vs requests.
