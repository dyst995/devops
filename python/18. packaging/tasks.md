# Tasks — Packaging

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite `setup.py` and command lines. Use a **venv** ([pip](../02. pip/theory.md)).

1. [ ] Recite the `zoo-example` tree. What lives in `animals/` vs project root (`README`, `setup.py`)? Why structure **before** an install package?
2. [ ] What is the setup script the centre of (Distutils)? Recite `setup(...)`: `name`, `find_packages()`, `entry_points`, `install_requires`, `version`, author, license.
3. [ ] Console scripts: `"zoo = animals.zoo:main"` — command name, module, function. `$ zoo` prints? Code after `raise`-style: `main()` in `zoo.py`.
4. [ ] `find_packages()` return value? Why not list `animals` and `animals.handlers` by hand?
5. [ ] Recite: `bdist_egg`, `bdist_wheel`, `--help-commands`, `--universal`, `sdist`. Example: `pip install wheel` then `bdist_wheel`.
6. [ ] After build: `dist/` vs `*.egg-info` (four files). Recite `zoo_example-0.1-py3-none-any.whl` (underscore vs hyphen).
7. [ ] Recite pip: install, `--upgrade`, `==`, `>=`, `-U pip`, `search` (CLI may be gone). Three ways to install **this** project (`.` / path / `.whl`).
8. [ ] After install: `import animals`; `animals.__path__` is **site-packages**. Uninstall **`zoo-example`** not `animals`. Why two names?
9. [ ] Interview: distribution name vs import package vs console script. Map `zoo-example` / `animals` / `zoo`.
10. [ ] Combined: write a minimal `setup.py` as in the notes; `bdist_wheel`; `pip install .`; run `zoo`; `__path__`; uninstall distribution name.
