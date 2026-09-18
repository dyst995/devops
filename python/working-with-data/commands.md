# Commands to memorize

```python
# [ ] in SYNTAX DESCRIPTIONS = optional. Do not type those brackets.

a = b = c = 1
a, b, c = 1, 2, "john"

del var1                  # NameError if you use the name after
del var2, var3            # several names; not: del var1[, var2]  (that [ ] is notation)

int(x)                    # integer from number or string
int(x, base)              # base optional; string in that base
float(x)                  # float from number or string
str(x)                    # string version of an object

id(x)                     # identity (think address); never changes
x is y                    # same object?
type(x)                   # type; unchangeable for that object

# immutable: int, float, string, tuple
x = 'foo'
y = x
y += 'bar'                # x still 'foo'

# mutable: list, dict, object, set
x = [1, 2, 3]
y = x
y += [3, 2, 1]            # x is [1, 2, 3, 3, 2, 1]
```

https://pythontutor.com/ — visualize memory.
