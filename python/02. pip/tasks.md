# Tasks — pip

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Use `python -m pip` (or `py -m pip` on Windows). Prefer a **venv** so you do not touch OS Python.

## Warm-up

1. [ ] What is pip? Default index? pip vs pyenv?
2. [ ] Why `-m pip`? Recite create / activate / deactivate venv for **your** OS.
3. [ ] `list` vs `show` vs `freeze` vs `-r`?

## Do

4. [ ] New venv. Upgrade pip. `list`. Which pip binary (`python -m pip --version` / `which python` after activate)?
5. [ ] Install a small package. `show` it (name, version, location). Uninstall it. `list` again.
6. [ ] Install an **exact** version (`==`). Then `--upgrade`. Did the version change?
7. [ ] `freeze` to `requirements.txt`. New empty venv. `install -r`. Same names in `list`?
8. [ ] Recite `--index-url` vs `--extra-index-url` without looking.

## Scenario

9. [ ] A teammate’s `pip install requests` went into a **different** Python than `python myscript.py`. Prove it (`pip --version` vs `python -m pip --version` vs `python -c "import sys; print(sys.executable)"`). Fix the workflow so install and run share one interpreter.
