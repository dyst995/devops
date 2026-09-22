# Commands to memorize

```python
# hello.py — __name__ is "hello" when imported, "__main__" if run as script
def print_module_name():
    print(f"name of module: {__name__}")

import hello
hello.print_module_name()              # name of module: hello

from hello import print_module_name
print_module_name()
# from hello import *                  # all names (easy clashes)

import hello as bye
bye.print_module_name()

# main.py
print("Always executed")
if __name__ == "__main__":
    print("Executed when invoked directly")
else:
    print("Executed when imported")
# python main.py  vs  import main

import sys
sys.path                               # script/cwd, PYTHONPATH, install dirs

import math
dir(math)
dir()                                  # current local scope
```
