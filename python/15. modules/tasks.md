# Tasks — Modules

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Use a throwaway folder so `import hello` finds `hello.py`.

## Warm-up

1. [ ] Module = `.py` file. `__name__` imported vs run as script.
2. [ ] Recite `import` / `from import` / `as` call forms. Three `sys.path` sources.

## Do

3. [ ] Write `hello.py` as in the notes. `import hello` and call through the module. Printed name?
4. [ ] `from hello import print_module_name` and call with no prefix.
5. [ ] `import hello as bye` and call on `bye`.
6. [ ] Recreate `main.py`. `python main.py` then `import main` (from a different file or REPL in that directory). Both three-line outputs.
7. [ ] `import sys`; look at `sys.path[0]` (script dir / cwd idea).
8. [ ] `import math`; `dir(math)` — find `pi` and `sqrt`. Bare `dir()` in the same session.

## Scenario

9. [ ] A module that prints its `__name__`, exposes one function, and only parses “CLI” text inside `if __name__ == "__main__"`. Import it from another file without triggering the CLI branch. Show `import`, `from`, and `as` all call the function.
