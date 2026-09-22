# Commands to memorize

```python
def function_name(parameters):
    """function_docstring"""
    function_suite
    return [expression]          # notation: return is optional; skip or bare return → None

def printme(str):
   """This prints a passed string."""
   print(str)
printme("EPAM is the best company!")

def changeme(mylist):
   "This changes a passed list"
   mylist.append([1,2,3,4])     # same list object as the caller

def add(a, b): return a + b
add(1, 2)                       # positional
add(a=1, b=2)                   # keyword
add(b=2, a=1)
add(1, b=2)
# add(a=1, 2)                   # SyntaxError: positional argument follows keyword argument
# add(2, a=1)                   # TypeError: add() got multiple values for argument 'a'

def add(a, b=2): return a + b   # default
add(1)                          # 3
# def add(a=1, b): ...          # SyntaxError: non-default argument follows default argument

def echo(a, b, c=3, *args, **kwargs):
    print(a, b, c, args, kwargs)
echo(1, 2)                      # 1 2 3 () {}
echo(1, 2, 3, 4, 5, d=6)        # 1 2 3 (4, 5) {'d': 6}
```
