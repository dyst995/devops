# Tasks — Modules

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict `__name__` and printed lines. Throwaway folder so `import hello` finds `hello.py`.

1. [ ] Module = ? File suffix? `__name__` inside the file when imported vs when run as script?
2. [ ] Recite `import` / call `hello.print_module_name()`. Printed name?
3. [ ] `from hello import print_module_name` — call without prefix. `from hello import *` — risk?
4. [ ] `import hello as bye` — call on `bye`. Same module?
5. [ ] Recreate `main.py`. `python main.py` vs `import main` — both three-line outputs (`Always executed` + which second line).
6. [ ] Why guard CLI / `input` with `if __name__ == "__main__"` (unit test import)? Lines **above** the `if` always run?
7. [ ] Recite `sys.path` three sources (script/cwd, PYTHONPATH, install dirs). `sys.path[0]` idea.
8. [ ] `import math`; `dir(math)` find `pi`/`sqrt`. Bare `dir()` in the same session — what does it list?
9. [ ] Interview: `import hello` vs `from hello import …` vs `as` — namespace and name clashes.
10. [ ] Combined: write `hello.py` + `main.py`; prove imported `__name__` is `"hello"` / `"main"`; CLI branch only on direct run; `dir(math)`.
