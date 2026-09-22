# Dictionaries — Questions

Cover the Answers section. Answer first, then check.

1. What is a dictionary (associative array / pairs)? How do you write one (`{}` `:`)?
2. Recite `dict0`–`dict3`.
3. `d['Name']` `d['Age']` for Zara? `d['Alice']`?
4. `d['Age'] = 8` vs `d['School'] = "DPS School"` — update vs add?
5. `del d['Name']` vs `d.clear()` vs `del d` then `print(d['Age'])`?
6. Two `'Name'` keys Zara then Manni — printed value? Why?
7. `{['Name']: 'Zara'}` — exception? Keys must be?
8. `'k' in d` tests keys or values? `len(d)`?
9. `clear` leftover? `copy` then change `dict2['name']` — `dict1`?
10. Anti-pattern vs `setdefault("node", []).append("item")`?
11. `for key in d` vs `.values()` vs `.items()`?
12. `fromkeys` without value vs with `10`?
13. `get('name')` vs `get('job', 'EPAM')` vs `d['job']`?
14. `pop(2)` `pop(3, 'c')` `pop(4)`? `popitem()` on the four-key dict?
15. `update`: key exists vs new key? Extra URL?

---

## Answers

1. Key-value map / associative array. `{k: v, k: v}`.
2. `{}` · `abc→456` · mixed keys · Alice/Beth phones.
3. Zara · 7 · `KeyError: 'Alice'`
4. Existing key change · new key new pair. Same `d[k] = v` syntax.
5. Drop one pair · empty `{}` name stays · name gone → `NameError`.
6. `Manni`. Keys unique; last wins.
7. `TypeError: unhashable type: 'list'`. Hashable / immutable.
8. Keys. Number of pairs.
9. `{}`. `dict1` still Tom.
10. `if k not in d: d[k] = []` then append. `setdefault` does get-or-insert in one go.
11. Keys · values · pairs. `for k in d` == `.keys()`.
12. All `None` · all `10`.
13. Tom · EPAM · KeyError.
14. `'b'` and `{1:'a'}` · `'c'` · KeyError · `('four', 4)` LIFO.
15. Overwrite · add. https://docs.python.org/3/tutorial/datastructures.html#dictionaries
