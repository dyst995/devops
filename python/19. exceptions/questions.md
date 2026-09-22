# Exceptions — Questions

Cover the Answers section. Answer first, then check.

1. What is an exception (execution vs “exception to the rule”)? Exception handling vs error handling (save state, interrupt, handler, fix)?
2. Recite `try` / `except Exception1` / `except Exception2` / `else` / `finally` — when each runs.
3. One `except` for several types? `as exc`?
4. `temp_convert("xyz")` — which exception? Printed line (including the `int()` message)?
5. Recite `raise [Exception [, args [, traceback]]]`. `functionName` when `level < 1`? Code below `raise`?
6. Recite the `try` / `except Exception as e` / `else` skeleton after `raise`.
7. Custom `Networkerror`: base class? `__init__`? `raise` argument? `except` print? Output?

---

## Answers

1. Error during **execution**; the rare case. Languages handle errors automatically. Save execution state, interrupt, run the handler; it may fix (e.g. division by zero, file open) and continue with saved data.
2. Operations · that type · the other type · **no** exception · **always**.
3. `except (Exception1, Exception2, …) as exc`. Yes — the instance.
4. `ValueError`. `The argument does not contain numbers: invalid literal for int() with base 10: 'xyz'`
5. Course `raise` form. `raise Exception("Invalid level! %s" % level)`. Not executed if raised.
6. `try: ...` · `except Exception as e:` handling · `else:` rest of the code.
7. `RuntimeError`. `self.message = message`. `"Bad hostname"`. `print(e.message)` → `Bad hostname`.
