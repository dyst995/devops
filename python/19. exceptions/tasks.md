# Tasks — Exceptions

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict which clause runs and the exact print.

1. [ ] Exception (execution / “exception to the rule”). Handler: save state, interrupt, maybe fix (div by zero, file open). Languages named?
2. [ ] Recite `try` / `except Exception1` / `except Exception2` / `else` / `finally` — when each runs.
3. [ ] Tuple `except (A, B) as exc`. Recite course notation extra `]`.
4. [ ] Recreate `temp_convert`. `"xyz"` exact print (`ValueError` / invalid literal). `"12"` return, no print.
5. [ ] Recite `raise [Exception [, args [, traceback]]]`. `functionName` when `level < 1`. Lines after `raise`?
6. [ ] `try` / `except Exception as e` / `else` skeleton. Prove `else` only on success.
7. [ ] Custom `Networkerror(RuntimeError)`: `__init__` `message`; `raise Networkerror("Bad hostname")`; `print(e.message)` → `Bad hostname`. Course spelling **Networkerror**.
8. [ ] `finally` on both success and failure — print in each clause.
9. [ ] Interview: `except` **order** (matching first wins). Two types (`int` vs `1/0`), two `except` blocks.
10. [ ] Combined: `temp_convert`; `raise` + no code after; `Networkerror`; `else` vs `finally`; one `except (ValueError, ZeroDivisionError) as exc`.
