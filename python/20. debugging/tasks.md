# Tasks — Debugging

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. `basicConfig` only works **once** per process — use a **new** Python run for each config experiment.

## Warm-up

1. [ ] Debuggers vs logging. Recite why logs beat a stack trace alone. Five `logging` levels, default cutoff. `python -m pdb` vs `pdb.set_trace()`.
2. [ ] Recite syslog two-liner + `tail`. Recite file `basicConfig` (`filename`, `filemode`, `format`) and the `app.log` line.

## Do

3. [ ] Run all five `logging.*` calls with **no** `basicConfig`. Match the three default lines (`WARNING`/`ERROR`/`CRITICAL` on `root`). Confirm DEBUG and INFO are silent.
4. [ ] New run: `basicConfig(level=logging.INFO)`. Info logs; debug still does not.
5. [ ] New run: `basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')` then `logging.error('This will get logged to a file')`. Exact file contents. Change `filemode` to `'a'` on a second run — two lines?
6. [ ] Optional: `debug.py` with `syslog` and `tail` the OS log if you have `/var/log/syslog` (or the equivalent on your OS). Note the path if it is not the course path.
7. [ ] Copy the course YAML. Load with `yaml.safe_load` + `dictConfig`. `getLogger("simpleExample")` and `logger.debug(...)`. If the **file** handler errors on formatter `precise`, switch that handler to `simple` (or add `precise`) and record what the slide omitted.

## Complete (logging)

8. [ ] Recite `version` / formatters / handlers (`StreamHandler`, `RotatingFileHandler`, `maxBytes`, `backupCount`) / `simpleExample` (`propagate: no`) / `root` without looking. One sentence: named logger vs `logging.error` on `root`.

## pdb

9. [ ] Recite `debug.py` (`aaa`/`bbb`/`ccc`). Why `-m pdb` (no GUI / Docker)? `n` vs `s` vs `p` vs `c` vs `q`?
10. [ ] `python -m pdb debug.py`. First `->` is `a = "aaa"`. `n` then `s` as on the slide. `p a,b` → `('aaa', 'bbb')`. `c` → `aaabbbccc` and restart. `q` back to the shell.
11. [ ] Insert `pdb.set_trace()` after `a = "aaa"`. Run **`python debug.py`** (not `-m pdb`). Stop on `b = "bbb"`. `p a` then `c` to finish.
