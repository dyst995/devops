# Tasks — Exceptions

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Work in a throwaway folder or the REPL.

## Warm-up

1. [ ] Exception vs handler vs `try`/`except`/`else`/`finally`. Recite when each clause runs.
2. [ ] Recite tuple `except`, `as`, `raise` form, custom `Networkerror` (base class + print `e.message`).

## Do

3. [ ] Recreate `temp_convert`. Call with `"xyz"` — exact print. Call with `"12"` — return value, no print.
4. [ ] `try` that can raise two different types (e.g. `int(var)` and `1/0`). Separate `except` blocks. Prove **order** matters: matching `except` wins.
5. [ ] Same operations with `except (ValueError, ZeroDivisionError) as exc:` — one block for either. Print `exc`.
6. [ ] `else` only when **no** exception. `finally` runs on **both** success and failure (print something in each clause).
7. [ ] `functionName(level)`: `raise Exception("Invalid level! %s" % level)` when `level < 1`. Call with `0` inside `try`/`except Exception as e`/`else`. Prove a line **after** `raise` in the `if` does not run.
8. [ ] `class Networkerror(RuntimeError)` as in the notes. `raise Networkerror("Bad hostname")` → print `e.message` → `Bad hostname`.

## Complete

9. [ ] One small script: convert user-like strings with `temp_convert`, raise `Networkerror` on a fake bad host, catch it, and use `finally` to print that cleanup always ran.
