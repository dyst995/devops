# Tasks — Packages

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Build the tree next to where you start Python so `animals` is importable ([modules](../15. modules/theory.md) search order).

## Warm-up

1. [ ] Why packages? Dots? `__init__.py`?
2. [ ] Recite the `animals` tree from memory. Recite the four imports.

## Do

3. [ ] Create the directory tree including **both** `__init__.py` files (can be empty).
4. [ ] `crocodile.py` — any function or name you can import.
5. [ ] `monkey.py` — a class `Monkey`.
6. [ ] `handlers/swim.py` and `handlers/walk.py` with `is_walking` in `walk.py`.
7. [ ] Run all four course imports and use the names (`crocodile`, `Monkey`, `swim`, `is_walking`).
8. [ ] Temporarily rename one `__init__.py` (or remove it) and try an import. Then put it back. (Course: required for the directory to be a package.)

## Complete

9. [ ] From a file **outside** `animals`, only dotted imports (no `sys.path` hacks beyond running in the parent directory). Prove `animals.handlers.walk` is the nested module.
