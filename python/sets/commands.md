# Commands to memorize

```python
x = {1, 2, 3, 1, 2}   # {1, 2, 3}  duplicates dropped
y = {2, 4, 5}

x & y                 # intersection  {2}
x | y                 # union         {1, 2, 3, 4, 5}
x - y                 # difference    {1, 3}
x ^ y                 # symmetric_difference  {1, 3, 4, 5}

list(x)
2 in x

numbers.add(4)        # already in — no extra 4
numbers.add(6)
numbers.pop()         # arbitrary element (notes: 1)
numbers.discard(4)    # no error if missing
numbers.remove(5)     # KeyError if missing
numbers.clear()       # set()

set()                 # empty set;  {} is a dict
```
