# Modules — Questions

Cover the Answers section. Answer first, then check.

1. What is a module? File suffix? `__name__` inside the file?
2. `import hello` then call `print_module_name` — syntax? Printed `__name__`?
3. `from hello import print_module_name` — how do you call? `from … import *`?
4. `import hello as bye` — how do you call?
5. `__name__` when imported vs `python main.py`? Recite `main.py` both runs (always / if / else).
6. Why the `if __name__ == "__main__"` block (scripts, stdin, unit test)?
7. Three search sources, in order? Where is the list?
8. `dir()` vs `dir(math)`?

---

## Answers

1. File of definitions and statements. `.py`. Module name as a string (`hello` for `hello.py` when imported).
2. `hello.print_module_name()`. `name of module: hello`
3. `print_module_name()` — already in this namespace. All variables and functions (clash risk).
4. `bye.print_module_name()`
5. Module name without `.py` · `'__main__'`. Always executed both times; then “invoked directly” vs “when imported”.
6. So CLI/input code does not run on import (e.g. tests).
7. Script dir or cwd · `PYTHONPATH` · install dirs. `sys.path`
8. Names in current local scope · names in `math` (the course list: `pi`, `sqrt`, dunders, …).
