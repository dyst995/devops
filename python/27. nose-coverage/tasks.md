# Tasks — Nose + Coverage

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Use a **venv**. Prefer `python -m pip`. You need a small package (e.g. `handlers/` from [packages](../17. packages/theory.md)) and `test_*.py` files ([unit testing](../26. unit-testing/theory.md)).

## Warm-up

1. [ ] Recite both `pip install` lines. `nosetests` vs the three coverage flags (`--with-coverage`, `--cover-package=handlers/`, `--cover-erase`).
2. [ ] `--cover-min-percentage=90` vs `--cover-html` → which file?

## Do

3. [ ] `pip install nose` and `coverage`. From a folder with tests, run **`nosetests`**. Tests run without naming `test_prime.py`.
4. [ ] `nosetests --with-coverage --cover-package=… --cover-erase` (use **your** package name if it is not `handlers/`). Recite the course package **`handlers/`**.
5. [ ] Add `--cover-min-percentage=90`. If it fails, say why (gate). Recite the full command.
6. [ ] Add `--cover-html`. Open **`cover/index.html`**.

## Complete

7. [ ] Recite all four `nosetests` lines without looking. One sentence: coverage % as a [quality gate](../25. testing/theory.md).
