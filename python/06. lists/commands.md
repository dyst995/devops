# Commands to memorize

```python
list1 = ['physics', 'chemistry', 1997, 2000]
list2 = [1, 2, 3, 4, 5]
list3 = ["a", "b", "c", "d"]

[1, 2, 3, 4] == [4, 1, 3, 2]    # False  (ordered)

a = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge']
a[0]; a[-1]; a[1:4]             # index / slice like strings

x = ['a', ['bb', ['ccc', 'ddd'], 'ee', 'ff'], 'g', ['hh', 'ii'], 'j']
x[1]; x[1][0]; x[1][1]; x[3]; x[3][0]

list1[2] = 2001                 # update
del list1[2]                    # delete by index

[1, 2] + [3]; [1] * 3; 2 in [1, 2]
len(a); max(a); min(a); sum([1, 2]); sorted([1, 3, 2])

numbers.append(3)
numbers.count(3)
numbers.extend([4, 5, 6])
numbers.index(5)                # ValueError if missing
numbers.insert(1, 2)
numbers.pop()                   # last; pop(0) first
numbers.remove('a')
numbers.reverse()               # in place
numbers.sort()
numbers.sort(reverse=True)
```
