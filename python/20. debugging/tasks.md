# Tasks — Debugging

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite commands. `basicConfig` once per process — new Python run per logging experiment.

1. [ ] Two ways to debug (debuggers + logging). Why logs beat a stack trace (state **before** the line)? Stdlib?
2. [ ] Recite `debug.py` syslog + `python debug.py` + `tail /var/log/syslog`. syslog vs `logging` module?
3. [ ] Five levels in order. Default cutoff? Recite the three default lines (`WARNING:root:` …). Why no DEBUG/INFO?
4. [ ] `basicConfig(level=logging.INFO)` — which of the two course lines logs? Rule: named level **and higher**.
5. [ ] File `basicConfig`: `filename='app.log'` `filemode='w'` `format='%(name)s - %(levelname)s - %(message)s'`. Exact file line for `logging.error(...)`.
6. [ ] YAML `dictConfig`: `version: 1`; `simple` formatter; console `StreamHandler` vs file `RotatingFileHandler` (`maxBytes` 1024, `backupCount` 3); `simpleExample` `propagate: no`; root. Load with `yaml.safe_load`. Formatter **`precise`** missing on the slide — what happens?
7. [ ] pdb: recite `debug.py` (`aaa`/`bbb`/`ccc`). `python -m pdb debug.py`. Why CLI (no GUI / Docker)? First `->`?
8. [ ] Recite `n` vs `s` vs `p` vs `c` vs `q`. Course `p a,b` → `('aaa', 'bbb')`. `c` prints `aaabbbccc` then **restarts**.
9. [ ] `pdb.set_trace()` after `a = "aaa"`. Run `python debug.py` (not `-m pdb`). Stop `-> b = "bbb"`.
10. [ ] Combined: five logging calls default three lines; INFO cutoff; `app.log` format line; pdb `n`/`p`/`c`/`q`; `set_trace` vs `-m pdb`.
