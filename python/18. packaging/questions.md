# Packaging — Questions

Cover the Answers section. Answer first, then check.

1. What must be structured properly before creating an installation package? Recite the `zoo-example` tree.
2. Three project-root changes vs a bare `animals` package?
3. What is the setup script the centre of? Its main purpose?
4. Recite `setup(...)`: `name`, `packages`, `entry_points`, `install_requires`, `version`, author, description, license.
5. What are entry points? Console scripts? What does `$ zoo` print? Which function runs, from which file?
6. `find_packages()` return value?
7. Recite: egg, wheel, help, universal wheel, sdist. Example two-liner (`wheel` then `bdist_wheel`)?
8. After `bdist_wheel`: what is `dist` vs `*.egg-info`? Recite the `.whl` name and the four egg-info files.
9. Recite pip: install, upgrade, exact version, criteria, `-U pip`, search.
10. Three ways to install *this* project. After install: `import animals` then `animals.__path__` — what kind of path? Uninstall which name?

---

## Answers

1. The project. `zoo-example/` with `animals/` (`handlers/` + `__init__.py`, `walk.py`, `swim.py`; `crocodile.py`, `monkey.py`, `zoo.py`, `__init__.py`), `README.md`, `setup.py`.
2. Code under `animals`; `README.md`; `setup.py`.
3. Building, distributing, and installing modules using Distutils. Describe the distribution so Distutils commands do the right thing.
4. `zoo-example` · `find_packages()` · `"zoo = animals.zoo:main"` · `termcolor==1.1.0` · `0.1` · Captain Jack / `captain_jack@gmail.com` · Example of the test application · MIT.
5. Metadata exposed on install. Terminal commands from the package. `Welcome to the zoo!` · `main()` in `zoo.py` in the animal folder (`animals.zoo:main`).
6. A list of all Python packages found within the directory.
7. `python setup.py bdist_egg` · `bdist_wheel` · `--help-commands` · `bdist_wheel --universal` · `sdist`. `pip install wheel` then `python setup.py bdist_wheel`.
8. `dist` = distributives. `*.egg-info` = files/packages in the distributive. `zoo_example-0.1-py3-none-any.whl`. `dependency_links.txt`, `PKG-INFO`, `SOURCES.txt`, `top_level.txt`.
9. `pip install <package_name>` · `--upgrade` · `=='version_num'` · `>= 'version_num'` · `pip install -U pip` · `pip search "query"`.
10. `pip install .` · path to `zoo-example` · the `.whl` under `dist/`. site-packages path for `animals`. Uninstall **`zoo-example`**.
