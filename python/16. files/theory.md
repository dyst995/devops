# Files

## `open()`

```text
file object = open(file_name [, access_mode][, buffering])
```

(`[ ]` = notation: mode and buffering are optional.) Returns a **file object**. Default access mode is **read** (`"r"`) if you omit it.

**Memory hook:** `open(name, mode)`. Use **`with open(...) as fo:`** so the file is closed when the block ends.

## File attributes

```python
# Open a file
with open("foo.txt", "w") as fo:
    print("Name of the file: ", fo.name)
    print("Closed or not : ", fo.closed)
    print("Opening mode : ", fo.mode)
```

Output:

```text
Name of the file:  foo.txt
Closed or not :  False
Opening mode :  w
```

Inside the `with` block the file is **still open** (`closed` is **False**). After the block, `fo.closed` is **True**.

**Memory hook:** `.name` path used · `.closed` bool · `.mode` how it was opened (`w` here).

## `write()`

`"a"` — **append** output to the end of file or **create** a new one if it doesn't exist

```python
with open("foo.txt", "a") as fo:
    fo.write( "Python is a great language.\nYeah, it's great!!\n")
```

`"w"` — **rewrite** the file with the new content or **create** a new one if it doesn't exist

```python
with open("foo.txt", "w") as fo:
    fo.write( "Python is a great language.\nYeah, it's great!!\n")
```

**Memory hook:** `"w"` = wipe then write. `"a"` = add at the end. Both create the file if missing. `write` takes a **string** (`\n` for newlines).

## `read()`

`foo.txt`:

```text
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
```

Read **10 characters** from file:

```python
with open("foo.txt") as fo:
    s = fo.read(10)
    print(s)
```

Output:

```text
Explicit i
```

Read the **whole** file:

```python
with open("foo.txt") as fo:
    s = fo.read()
    print(s)
```

Output:

```text
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
```

Read the file **line by line**:

```python
with open("foo.txt") as fo:
    for line in fo:
        print(line)
```

Output (each `line` still has `\n`, and `print` adds another newline → blank line between):

```text
Explicit is better than implicit.

Simple is better than complex.

Complex is better than complicated.

Flat is better than nested.

```

Read lines **into the list**:

```python
with open("foo.txt") as fo:
    lines = fo.readlines()
    print(lines)
```

Output:

```text
['Explicit is better than implicit.\n', 'Simple is better than complex.\n', 'Complex is better than complicated.\n', 'Flat is better than nested.']
```

**Memory hook:** `read(n)` = n chars. `read()` = all. `for line in fo` = iterate. `readlines()` = **list** of strings with `\n`. No mode → `"r"`.

## File handling

```python
import os
# Rename a file from test1.txt to test2.txt
os.rename( "test1.txt", "test2.txt")
```

```python
import os
# Delete file test2.txt
os.remove("text2.txt")
```

The comment says delete **`test2.txt`**; the call uses **`text2.txt`**. Use the **same** name you renamed to (`test2.txt`) or `remove` looks for a different file.

**Memory hook:** `os.rename(old, new)` · `os.remove(path)`.

## Directory

```python
import os

# print current path
print(os.getcwd())

# change current dir to /tmp
os.chdir("/tmp")

# create new directory
os.mkdir("app_dir")

# delete directory
os.rmdir("app_dir")
```

`rmdir` removes an **empty** directory only (same idea as the shell `rmdir`).

**Memory hook:** `getcwd` where · `chdir` go · `mkdir` make · `rmdir` remove empty dir.
