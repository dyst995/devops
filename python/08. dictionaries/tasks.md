# Tasks — Dictionaries

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first, then prove it. Start from `d = {'Name':'Zara','Age':7,'Class':'First'}`.

1. [ ] What is a dict (associative array)? Recite `{}` / colon. Lookup by key or by index? Recite `dict0`–`dict3`.
2. [ ] `d['Name']`, `d['Age']`, `d['Alice']` — last one exact exception.
3. [ ] `d['Age']=8` vs `d['School']="DPS School"` — same syntax, update vs add. Print both.
4. [ ] `del d['Name']` vs `d.clear()` vs `del d` — what remains? `print(d['Age'])` after `del d`?
5. [ ] Duplicate keys: `{'Name':'Zara','Name':'Manni'}` — which value wins? Key restriction: hashable (not list) — prove `list` key errors.
6. [ ] Recite `len`, `'Name' in d`, `copy`, `setdefault`, `fromkeys` (None vs 10).
7. [ ] Loop `for key in d`, `.values()`, `.items()`. Recite all three.
8. [ ] `get('name')` vs `get('job','EPAM')` vs `d['job']` — who raises `KeyError`?
9. [ ] `pop(2)` vs `pop(3,'c')` vs `popitem()` vs `update`. Recite LIFO for `popitem`.
10. [ ] Combined: KeyError vs get default; last duplicate key wins; `clear` leaves `{}`; `del d` NameError; one `items()` loop.
