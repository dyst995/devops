# Commands to memorize

```python
total = 0                       # Global

def sum(arg1, arg2):
    total = arg1 + arg2         # Local — outside still 0
    print("Inside the function:", total)
    return total

# global  — only to assign/change the module name
money = 2000
def add_money():
    global money
    money = money + 1

# LEGB: Local → Enclosing → Global → Built-in

sum = lambda a, b: a + b        # one expression; call with ()
print("sum :", sum(10, 20))     # 30

globals()                       # dict of global namespace
locals()                        # dict of local namespace
# lambda: locals()  →  {}
```
