# Tasks — Packaging

Close `theory.md`. Recite `setup.py`, then write a throwaway `zoo-example`. venv.

1. [ ] **Memorize** `zoo-example` tree: code in `animals/`, root `README.md` + `setup.py`.
2. [ ] **Learn:** setup script = centre of Distutils build/install. Recite `name`, `find_packages()`, console script, `install_requires`, version, author, MIT.
3. [ ] **Memorize:** `"zoo = animals.zoo:main"` → command `zoo` runs `main()`. `$ zoo` → `Welcome to the zoo!`
4. [ ] **Learn:** `find_packages()` = list of all packages in the directory.
5. [ ] **Memorize commands:** `bdist_egg`, `bdist_wheel`, `--help-commands`, `--universal`, `sdist`. `pip install wheel` then `bdist_wheel`.
6. [ ] **Memorize:** `dist/` distributives; `*.egg-info` four files; `zoo_example-0.1-py3-none-any.whl`.
7. [ ] **Memorize pip:** install / `--upgrade` / `==` / `>=` / `-U pip` / `search`. Install `.` / path / `.whl`.
8. [ ] **Write:** `pip install .`; `import animals`; `__path__` is site-packages. Uninstall **`zoo-example`**.
9. [ ] **Learn:** distribution name vs import `animals` vs console `zoo`.
10. [ ] **Memorize (cover):** `setup()` fields; four create-package commands; three install forms; uninstall `zoo-example`.
