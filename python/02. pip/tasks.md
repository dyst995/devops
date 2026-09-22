# Tasks — pip

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first. Use `python -m pip` in a **venv**.

1. [ ] What is pip? Default index (name + URL)? It installs into **which** Python?
2. [ ] Why `python -m pip` instead of `pip` / `pip3` on `PATH`? Debian `pip3` vs Windows `py -m pip`? Why not `sudo pip install` on OS Python?
3. [ ] Recite create / activate / deactivate venv for **your** OS. After activate, prove `which python` (or `where python`) is inside `.venv`.
4. [ ] Recite `install` / `==` / range / `--upgrade` / `uninstall`. What do `list`, `show`, and `freeze` each print?
5. [ ] New venv. Upgrade pip. Install a small package. `show` it (name, version, **location**). Uninstall. `list` again.
6. [ ] Install an **exact** version (`==`). Then `--upgrade`. Did the version change? Recite range syntax `'pkg>=1.2,<2'`.
7. [ ] `freeze > requirements.txt`. New empty venv. `install -r`. Same names in `list`? What is `-r` for in CI / another machine?
8. [ ] Recite `--user` vs venv. Recite `--index-url` vs `--extra-index-url`. Default index is still PyPI unless you replace it.
9. [ ] pip vs pyenv — which job is which? Why is pip not a substitute for `dnf`/`apt` `python3-requests` on distro Python?
10. [ ] Teammate’s `pip install` went into a **different** interpreter than `python myscript.py`. Prove it (`pip --version` vs `python -m pip --version` vs `sys.executable`). Fix the workflow (venv + `-m pip`). Mention `pip search` is gone.
