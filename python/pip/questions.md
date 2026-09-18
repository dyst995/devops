# pip — Questions

Cover the Answers section. Answer first, then check.

1. What is pip? Default index?
2. Why `python -m pip` instead of `pip` / `pip3`?
3. Why not `sudo pip install` on Linux OS Python? What should you use?
4. How do you create, activate, and leave a venv (Unix vs Windows)?
5. `install` with exact version vs a range vs `--upgrade`?
6. `list` vs `show` vs `freeze`?
7. How do you write and reinstall from `requirements.txt`?
8. How do you upgrade pip itself?
9. What does `--user` do? Why is a venv still better for a project?
10. `--index-url` vs `--extra-index-url`?
11. pip vs pyenv — which job is which?

---

## Answers

1. Package installer for Python. PyPI.
2. Guarantees pip matches **that** interpreter; `PATH` `pip` may be another Python.
3. Breaks distro-managed files. venv or a pyenv Python.
4. `python -m venv .venv` · `source .venv/bin/activate` · `.venv\Scripts\activate.bat` / `Activate.ps1` · `deactivate`.
5. `==1.2.3` pin · `>=` / `<` range · `-U` newer if available.
6. Installed names+versions · one package’s metadata · `name==version` lines for a file.
7. `pip freeze > requirements.txt` · `pip install -r requirements.txt`
8. `python -m pip install --upgrade pip`
9. Install into the user home tree. Isolation and PATH still messy vs a venv.
10. Replace the default index · add another index besides the default.
11. pip = packages. pyenv = which Python binary (version).
