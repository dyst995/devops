# Commands to memorize

```text
animals/
  __init__.py          # required — this dir is a package
  crocodile.py
  monkey.py
  handlers/
    __init__.py        # required — nested package
    walk.py
    swim.py
```

```python
from animals import crocodile
from animals.monkey import Monkey
from animals.handlers import swim
from animals.handlers.walk import is_walking
```
