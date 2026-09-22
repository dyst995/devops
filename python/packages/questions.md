# Packages — Questions

Cover the Answers section. Answer first, then check.

1. Why packages (large app, similar names)? What do they structure, with what notation?
2. Packages vs modules for collisions?
3. What OS feature does creating a package use?
4. Recite the `animals` tree (`handlers`, `__init__.py`, `crocodile.py`, `monkey.py`, `walk.py`, `swim.py`).
5. Why `__init__.py`?
6. Recite the four `from … import` lines. Which is a subpackage path?

---

## Answers

1. Too many modules in one place; group them. Module namespace, **dots**.
2. Modules: global variable names. Packages: **module** names.
3. Hierarchical directories.
4. `animals/` with `handlers/` (`__init__.py`, `walk.py`, `swim.py`), plus `animals/__init__.py`, `crocodile.py`, `monkey.py`.
5. Required so Python treats the directory as a package.
6. `from animals import crocodile` · `from animals.monkey import Monkey` · `from animals.handlers import swim` · `from animals.handlers.walk import is_walking`. The last two use `handlers`.
