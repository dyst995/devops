# Commands to memorize

```python
try:
    # operations
    ...
except Exception1:
    ...
except Exception2:
    ...
else:
    # no exception
    ...
finally:
    # always
    ...

try:
    ...
except (Exception1, Exception2) as exc:
    ...
else:
    ...

def temp_convert(var):
    try:
        return int(var)
    except ValueError as argument:
        print("The argument does not contain numbers:", argument)

temp_convert("xyz")
# The argument does not contain numbers: invalid literal for int() with base 10: 'xyz'

# raise [Exception [, args [, traceback]]]
def functionName(level):
    if level < 1:
        raise Exception("Invalid level! %s" % level)
        # not executed if raised

try:
    ...
except Exception as e:
    ...
else:
    ...

class Networkerror(RuntimeError):
    def __init__(self, message):
        self.message = message

try:
    raise Networkerror("Bad hostname")
except Networkerror as e:
    print(e.message)
# Bad hostname
```
