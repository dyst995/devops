# Debugging — Questions

Cover the Answers section. Answer first, then check.

1. Two ways to debug an error in Python? Why log (flow, scenarios, user/IP, vs stack trace, performance/scaling/marketing)? Where does Python’s logging live?
2. Recite `debug.py` (`syslog`) and the two shell lines. Typical log path?
3. Why `logging` (beginners/enterprise, third-party, homogeneous log)? Recite the five calls. Default example output (three lines)? Why no DEBUG/INFO?
4. `basicConfig(level=logging.INFO)` — which of the two course lines logs? Rule for “defined level”?
5. File `basicConfig`: `filename`, `filemode`, `format`. Line written for `logging.error('This will get logged to a file')`?
6. YAML: `version`? `simple` format? console vs file handler classes? `maxBytes` / `backupCount`? `simpleExample` vs `root` (`propagate`)?
7. Recite load: `yaml.safe_load`, `dictConfig`, `getLogger("simpleExample")`, `logger.debug(...)`.
8. Recite `debug.py` (`a`/`b`/`c`/`final`/`print`). How do you start the embedded CLI debugger? Why is it convenient?
9. First pdb stop: what does `->` show? `n` vs `s`? Course `n` then `s` — which lines?
10. `p a,b` output? `c` — printed string and what happens after the program finishes? `q`?
11. `pdb.set_trace()` — what does it insert? Recite the script. How do you run it? Stop line (`->`)?

---

## Answers

1. Debuggers **and** logging. Understand flow and unexpected scenarios; user/IP; state **before** the error line, more than a traceback; performance/scaling and usage/marketing. **Standard library**.
2. `from syslog import syslog` / `syslog('This is a debug message.')` · `python debug.py` · `tail /var/log/syslog`.
3. Ready-to-use; libraries share it. `debug` `info` `warning` `error` `critical`. `WARNING:root:…` / `ERROR:root:…` / `CRITICAL:root:…`. Default cutoff is WARNING.
4. The **info** line. DEBUG does not. That level **and higher**.
5. `app.log` · `'w'` · `%(name)s - %(levelname)s - %(message)s`. `root - ERROR - This will get logged to a file`.
6. `1`. asctime-name-level-message. `StreamHandler` vs `RotatingFileHandler`. `1024` / `3`. Named logger DEBUG+console, `propagate: no`. root DEBUG+console.
7. Open `config.yaml` · load · `dictConfig` · get named logger · `debug`.
8. `aaa`+`bbb`+`ccc` printed as one string. `python -m pdb debug.py`. No GUI (e.g. Docker).
9. Current line, **not yet run**. `n` = next in this function; `s` = into a call. `b = "bbb"` then `c = "ccc"`.
10. `('aaa', 'bbb')`. `aaabbbccc` then **restart** at line 1. Abort, leave pdb.
11. Breakpoint at that position. `import pdb` after `a = "aaa"`, then `set_trace()`, then `b`/`c`/`final`/`print`. `python debug.py`. `-> b = "bbb"` (line 4).
