# Tasks — Debugging

Close `theory.md`. Recite logging + pdb. New Python process per `basicConfig`.

1. [ ] **Learn:** debuggers **and** logging. Logs = state **before** the crash; stdlib `logging`.
2. [ ] **Write:** syslog `debug.py`; `python debug.py`; `tail /var/log/syslog`.
3. [ ] **Memorize five levels** (debug < info < warning < error < critical). Default WARNING — three example lines `LEVEL:root:`.
4. [ ] **Write:** `basicConfig(level=logging.INFO)` — info logs; debug does not.
5. [ ] **Write:** file `basicConfig` (`app.log`, `'w'`, format). Memorize line `root - ERROR - This will get logged to a file`.
6. [ ] **Memorize YAML:** `version: 1`; `simple`; StreamHandler vs RotatingFileHandler (`1024`/`3`); `simpleExample` `propagate: no`; `dictConfig` + `getLogger`.
7. [ ] **Write:** `debug.py` aaa/bbb/ccc. Memorize `python -m pdb debug.py`. CLI / no GUI / Docker. First `-> a = "aaa"`.
8. [ ] **Memorize pdb:** `n` next here; `s` into call; `p` print; `c` continue (restart after end); `q` quit. `p a,b` → `('aaa','bbb')`.
9. [ ] **Write:** `pdb.set_trace()` after `a`. Run `python debug.py`. Stop `-> b = "bbb"`.
10. [ ] **Memorize (cover):** five levels + default three lines; `basicConfig` file line; `n s p c q`; `set_trace` vs `-m pdb`.
