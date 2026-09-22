# Commands to memorize

```python
dict0 = {}
dict1 = {'abc': 456}
dict2 = {'abc': 123, 98.6: 37}
dict3 = {'Alice': '2341', 'Beth': '9102'}

d = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
d['Name']                    # Zara; missing → KeyError
d['Age'] = 8                 # update
d['School'] = "DPS School"   # add

del d['Name']
d.clear()                    # {}
del d                        # NameError if you use d after

# keys unique (last wins); keys hashable (not list)

len(d); 'Name' in d

dict1.clear()
dict2 = dict1.copy()
d.setdefault("node", []).append("item")

for key in d:                 # keys; also d.keys()
    ...
for value in d.values():
    ...
for key, value in d.items():
    ...

dict.fromkeys(['one', 'two', 3])       # values None
dict.fromkeys(['one', 'two', 3], 10)

d.get('name')
d.get('job', 'EPAM')         # no KeyError

d.pop(2)                     # remove key, return value
d.pop(3, 'c')                # default if missing
d.popitem()                  # LIFO pair

d1.update(d2)                # overwrite or add
```
