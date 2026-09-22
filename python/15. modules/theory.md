# Module

A **module** is a file containing Python definitions and statements. The file name is the module name with the suffix **`.py`** appended. Within a module, the module’s name (as a string) is available as the value of the global variable **`__name__`**.

```python
# hello.py
def print_module_name():
    print(f"name of module: {__name__}")
```

**Memory hook:** `hello.py` → module **`hello`**. Inside it, `__name__` is `"hello"` when imported.

## `import`

```text
import module1[, module2[,... moduleN]
```

(`[ ]` = notation: more names optional.)

```python
# Import module hello
import hello

# Call function defined in that module
hello.print_module_name()
```

Output:

```text
name of module: hello
```

You use **`module.name`**. `__name__` inside `hello.py` is **`hello`**, not `__main__`.

**Memory hook:** `import hello` then `hello.func()`. Name stays in the module.

## `from … import`

There is a variant of the import statement that imports names from a module **directly into the importing module’s namespace**.

```text
from ... import name1[, name2[, ... nameN]]
```

```python
# Import from module hello
from hello import print_module_name
# Also can be used from … import *. In this case, all variables and functions are imported

# Call function defined in that module
print_module_name()
```

**`from hello import *`** brings **all** variables and functions into this namespace (easy clashes). Call **without** `hello.`.

**Memory hook:** `from hello import print_module_name` → `print_module_name()`. `import *` = everything (messy).

## `import as`

Sometimes, it is convenient to use **alias** instead of the name of the module.

```text
import name1 as new_name[, ... ]
```

```python
# Import module hello
import hello as bye

# Call function defined in that module
bye.print_module_name()
```

**Memory hook:** `import hello as bye` → `bye.print_module_name()`. Same module, shorter/other name.

## `if __name__ == "__main__":`

When a Python module or package is **imported**, `__name__` is set to the **module’s name**. This is the name of the Python file itself **without the `.py` extension**.

However, if the module is executed in the **top-level code environment** (`python some_module.py`), its `__name__` is set to the string **`'__main__'`**.

```python
# main.py
print("Always executed")

if __name__ == "__main__":
    print("Executed when invoked directly")
else:
    print("Executed when imported")
```

Run script:

```text
$ python main.py
Always executed
Executed when invoked directly
```

Import module:

```text
>>> import main
Always executed
Executed when imported
```

Some modules contain code that is intended for **script use only**, like parsing command-line arguments or fetching data from standard input. If a module like this was imported from a different module, for example to **unit test** it, the script code would **unintentionally execute** as well.

This is where using the `if __name__ == '__main__'` code block comes in handy. Code within this block **won’t run unless** the module is executed in the **top-level environment**.

**Memory hook:** `python file.py` → `__name__ == "__main__"`. `import file` → `__name__` is `"file"`. Guard CLI/input with that `if`. Lines **above** the `if` always run.

## Search order

When the interpreter executes **`import`**, it searches for the module in a list of directories assembled from the following sources:

1. The **directory from which the input script was run**, or the **current directory** if the interpreter is being run **interactively**
2. The list of directories contained in the **`PYTHONPATH`** environment variable, if it is set
3. An **installation-dependent** list of directories configured at the time Python is installed

The resulting search path is accessible in the Python variable **`sys.path`**, which is obtained from a module named **`sys`**:

```text
>>> import sys
>>> sys.path
```

**Memory hook:** look here first: **script dir / cwd** → **`PYTHONPATH`** → **install dirs**. That list is **`sys.path`**.

## `dir`

**`dir()`** returns the list of names in the current **local scope**. It helps to introspect a **module's content**.

```text
>>> import math
>>> dir(math)
['__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'pi', 'pow', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
```

**Memory hook:** `dir(math)` = names the module defines (`pi`, `sqrt`, … plus dunders). Bare `dir()` = names in **this** scope.
