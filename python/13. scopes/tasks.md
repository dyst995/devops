# Tasks — Scopes

Close `theory.md`. Predict prints **before** you run.

1. [ ] **Learn:** global = not in a function; local = inside. Recite `total=0` / `sum` — inside 30, outside **0**.
2. [ ] **Memorize:** `global` only to **assign** the module name. Read/print: no `global`.
3. [ ] **Write:** `money = money + 1` without `global` — memorise **UnboundLocalError**. Uncomment `global` → both 2001.
4. [ ] **Memorize LEGB:** Local → Enclosing → Global → Built-in. Recite the four letters.
5. [ ] **Write:** `sum = lambda a, b: a + b` — one expression; call with `()`. 10+20 → 30. Shadows builtin `sum`.
6. [ ] **Write:** lambda `locals()` → `{}`; `def` with `qwert=1` → `{'qwert': 1}`. `globals()` = module dict.
7. [ ] **Learn:** assignment inside makes Python treat the name as local for the whole function.
8. [ ] **Write:** nested `def` — inner reads outer name (Enclosing).
9. [ ] **Memorize:** `lambda args: expr`; still needs `()`.
10. [ ] **Memorize (cover):** two `total`s; `global` for assign; LEGB; UnboundLocalError; empty lambda locals.
