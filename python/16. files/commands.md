# Commands to memorize

```python
# open(file_name [, access_mode][, buffering])  — default mode "r"

with open("foo.txt", "w") as fo:
    print(fo.name, fo.closed, fo.mode)   # foo.txt  False  w

with open("foo.txt", "a") as fo:         # append or create
    fo.write("Python is a great language.\nYeah, it's great!!\n")

with open("foo.txt", "w") as fo:         # rewrite or create
    fo.write("Python is a great language.\nYeah, it's great!!\n")

with open("foo.txt") as fo:
    fo.read(10)                          # Explicit i
    fo.read()                            # whole file
    for line in fo:                      # line by line
        print(line)
    lines = fo.readlines()               # list of lines with \n

import os
os.rename("test1.txt", "test2.txt")
os.remove("test2.txt")                   # notes also show text2.txt — use the real name

os.getcwd()
os.chdir("/tmp")
os.mkdir("app_dir")
os.rmdir("app_dir")                      # empty directory
```
