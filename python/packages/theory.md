# Package directory structure

Suppose you have developed a **very large application** that includes many modules. As the number of modules grows, it becomes difficult to keep track of them all if they are dumped into **one location**. This is particularly so if they have **similar names or functionality**. You might wish for a means of **grouping and organizing** them.

**Packages** allow for a **hierarchical structuring of the module namespace** using **dot notation**. In the same way that modules help avoid collisions between **global variable** names, packages help avoid collisions between **module** names.

Creating a package is quite straightforward, since it makes use of the operating system’s inherent **hierarchical file structure**.

```text
└── animals
    ├── handlers
    │   ├── __init__.py
    │   ├── walk.py
    │   └── swim.py
    ├── __init__.py
    ├── crocodile.py
    └── monkey.py
```

The **`__init__.py`** files are **required** to make Python treat directories containing the file as **packages**.

In order to import the module, you should provide directory names **joined by dots**:

```python
from animals import crocodile
from animals.monkey import Monkey
from animals.handlers import swim
from animals.handlers.walk import is_walking
```

**Memory hook:** folder + `__init__.py` = package. Dots = path: `animals.handlers.walk`. Same idea as [modules](../modules/theory.md), nested.

| Path on disk | Import |
| --- | --- |
| `animals/crocodile.py` | `from animals import crocodile` |
| `animals/monkey.py` (`Monkey` inside) | `from animals.monkey import Monkey` |
| `animals/handlers/swim.py` | `from animals.handlers import swim` |
| `animals/handlers/walk.py` (`is_walking` inside) | `from animals.handlers.walk import is_walking` |

`animals` and `animals/handlers` are both packages because each has `__init__.py`. `walk.py` / `swim.py` / `crocodile.py` / `monkey.py` are **modules** inside those packages.
