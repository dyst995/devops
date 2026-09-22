# Commands to memorize

```python
tup0 = ()
tup1 = ('physics', 'chemistry', 1997, 2000)
tup2 = (1, 2, 3, 4, 5)
tup3 = "a", "b", "c", "d"     # still a tuple
(1,)                          # one item — comma required

t = tuple(i for i in range(16))
t[10:]        # (10, …, 15)
t[:10]        # (0, …, 9)
t[:10:2]      # (0, 2, 4, 6, 8)
t[10::-1]     # (10, 9, …, 0)
t[::-1]       # (15, 14, …, 0)

# tup1[0] = 100  →  TypeError: 'tuple' object does not support item assignment
tup3 = tup1 + tup2            # new tuple (12, 34.56, 'abc', 'xyz')

(1, 2) * 3
3 in (1, 2, 3)
len(t); t.count(0); t.index(10)
```
