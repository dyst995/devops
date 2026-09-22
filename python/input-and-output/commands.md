# Commands to memorize

```python
input([promt])                 # notation: optional prompt; returns str
print(...)

l = list(map(int, input('--> ').split()))
# --> 1 2 3 4   →   l == [1, 2, 3, 4]

print(' '.join([str(i) for i in l]))   # 1 2 3 4
print(*l)                              # 1 2 3 4
print(l)                               # [1, 2, 3, 4]

import json
d = json.loads(input('Input dict:'))
print(d)
```
