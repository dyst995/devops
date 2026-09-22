# Tasks — Packaging

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Use a **venv** ([pip](../02. pip/theory.md)). Prefer `python -m pip` so install matches the interpreter.

## Warm-up

1. [ ] Recite the `zoo-example` tree. What lives in `animals/` vs the project root?
2. [ ] Recite `setup(...)` fields. `find_packages()`? `"zoo = animals.zoo:main"`?
3. [ ] Recite create-package commands (egg, wheel, help, universal, sdist) and the three `pip install` forms for *this* project. Uninstall name?

## Do

4. [ ] Layout: `animals/` with `__init__.py`, `zoo.py` (`def main(): print("Welcome to the zoo!")`), `README.md`, `setup.py` as in the notes (`find_packages`, console script, a pin in `install_requires` you actually need or a tiny existing package).
5. [ ] `python setup.py --help-commands`. Then `pip install wheel` and `python setup.py bdist_wheel`. Confirm `dist/*.whl` and `*.egg-info` (`PKG-INFO`, `SOURCES.txt`, `top_level.txt`, …).
6. [ ] Optional: `sdist`. Optional: `bdist_egg` if your setuptools still provides it. Recite `--universal` even if you skip building one.
7. [ ] `pip install .` (or the project path). Run **`zoo`**. Then `python` → `import animals` → `animals.__path__` — site-packages, not only the project folder.
8. [ ] `pip uninstall` the **distribution** name (`name=` in `setup`). `zoo` gone? `import animals` fail?
9. [ ] Install from the **wheel** under `dist/`. Same `zoo` / `__path__` idea. Uninstall again.

## Complete

10. [ ] Recite pip install / `--upgrade` / `==` / `>=` / `-U pip` / `search` without looking. Explain why search may not work on a modern pip. Pin vs range vs upgrade in one sentence each.
