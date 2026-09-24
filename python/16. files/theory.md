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

**Memory hook:** `getcwd` where · `chdir` go · `mkdir` make one dir · `rmdir` remove empty dir.

## Making directories

`os.mkdir(name)` creates **one** directory. Parents must already exist. Fails if `name` already exists.

```python
import os

os.mkdir('example_directory')
```

`os.makedirs(path)` creates the **whole chain** — each missing parent, like `mkdir -p`.

```python
import os

os.makedirs('2018/10/05')
```

```text
.
└── 2018/
    └── 10/
        └── 05/
```

**Memory hook:** `mkdir` = one folder. `makedirs` = nested path (`2018/10/05`).

## Directory listing

`os.scandir(path)` walks **one directory** (not a tree). Use it as a context manager. Each `entry` is a `DirEntry`: `.name` is the basename.

All names in the current directory:

```python
import os

with os.scandir('.') as entries:
    for entry in entries:
        print(entry.name)
```

Files only:

```python
with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_file():
            print(entry.name)
```

Directories only:

```python
with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_dir():
            print(entry.name)
```

`'.'` = current working directory (`os.getcwd()`). `is_file()` / `is_dir()` do **not** follow the name’s extension — they ask the filesystem.

**Memory hook:** `scandir` → `entry.name` · `is_file()` · `is_dir()`. Always `with`.

## Filename pattern

`fnmatch.fnmatch(name, pattern)` — **True** if `name` matches a **shell** glob (`*` any string, `?` one character). Not a regex.

`os.listdir('.')` — names in the current directory (files and dirs). Filter with `fnmatch`.

```python
import fnmatch
import os

for filename in os.listdir('.'):
    if fnmatch.fnmatch(filename, 'data_*_backup.txt'):
        print(filename)
```

Prints names like `data_monday_backup.txt` or `data_2024_backup.txt` — not `data_backup.txt` (needs something between the underscores) and not `notes.txt`.

**Memory hook:** `listdir` all names · `fnmatch(name, 'data_*_backup.txt')` keep matches.

## Traversing a directory

`os.listdir` / `os.scandir` = **one** folder. `os.walk(path)` = the **whole tree**. Each step yields `(dirpath, dirnames, files)`:

| Piece | Meaning |
| --- | --- |
| `dirpath` | directory being visited (string) |
| `dirnames` | subdirectory **names** in that directory |
| `files` | file **names** in that directory |

```text
.
├── folder_1/
│   ├── file1.py
│   ├── file2.py
│   └── file3.py
├── folder_2/
│   ├── file4.py
│   ├── file5.py
│   └── file6.py
├── test1.txt
└── test2.txt
```

```python
for dirpath, dirnames, files in os.walk('.'):
    print(f'Found directory: {dirpath}')
    for file_name in files:
        print(file_name)
```

Output (file order inside a folder is **not** sorted):

```text
Found directory: .
test1.txt
test2.txt
Found directory: ./folder_1
file1.py
file3.py
file2.py
Found directory: ./folder_2
file4.py
file5.py
file6.py
```

Starts at `.`, then each subdirectory. `dirnames` is unused here — you still unpack it.

**Memory hook:** `walk` → `dirpath` · `dirnames` · `files`. Print the path, then each file name.

## Temporary directory

`tempfile.TemporaryDirectory()` creates a unique directory (often under `/tmp`, e.g. `/tmp/tmpoxbkrm6c`). Use **`with`**: the path is `tmpdir`. When the block ends, the directory **and its contents are removed**.

```python
import os
import tempfile

with tempfile.TemporaryDirectory() as tmpdir:
    print('Created temporary directory ', tmpdir)
    # Created temporary directory, e.g. /tmp/tmpoxbkrm6c
    print(os.path.exists(tmpdir))
    # True

# Directory contents have been removed
os.path.exists(tmpdir)
# False
```

Inside `with`: exists **True**. After `with`: exists **False**. You do not call `rmdir` yourself.

**Memory hook:** `with TemporaryDirectory() as tmpdir` — real path now, gone after the block.

## Deleting

`os.remove` deletes a **file**. `os.rmdir` deletes an **empty** directory. Check first:

```python
import os

if os.path.isfile(data_file):
    os.remove(data_file)
else:
    os.rmdir(data_file)  # remove empty directory
```

`os.path.isfile(path)` is **True** only for a regular file. A directory goes to `rmdir` — that **fails** if the directory is not empty.

A **tree** (directory with contents) needs `shutil.rmtree`. Catch `OSError` and print `e.strerror`:

```python
import shutil

trash_dir = 'my_documents/bad_dir'
try:
    shutil.rmtree(trash_dir)
except OSError as e:
    print(f'Error: {trash_dir} : {e.strerror}')
```

**Memory hook:** file → `remove` · empty dir → `rmdir` · tree → `shutil.rmtree`.

## Copying

`shutil.copy(src, dst)` copies a **file**. `dst` can be a directory (keeps the basename) or a new file path.

```python
import shutil

src = 'path/to/file.txt'
dst = 'path/to/dest_dir'
shutil.copy(src, dst)
```

`shutil.copy2(src, dst)` — same, but **preserves metadata** (mtime, mode, …).

```python
shutil.copy2(src, dst)
```

`shutil.copytree(src, dst)` copies a **directory recursively**. `dst` must not already exist.

```python
shutil.copytree('data_1', 'data1_backup')
```

**Memory hook:** `copy` file · `copy2` file + metadata · `copytree` whole directory.

## Moving and renaming

`shutil.move(src, dst)` moves a file or directory. If `dst` is an **existing directory**, `src` is placed **inside** it. If `dst` does **not** exist, `src` is **renamed** to that path.

```python
import shutil

shutil.move('dir_1/', 'backup/')
# moves dir_1/ into backup/ if backup/ exists.
# If backup/ does not exist, dir_1/ will be renamed to backup
```

`os.rename(old, new)` renames in place (same idea as the `test1.txt` → `test2.txt` earlier):

```python
import os

os.rename('first.zip', 'first_01.zip')
```

**Memory hook:** `move` — into existing dir, or rename if the dest is missing. `rename` — new name.

## Archiving

`zipfile.ZipFile` — ZIP archives. Mode `"w"` = create. Walk a tree and `write` each directory, then each file (`os.path.join(dirpath, filename)`).

```python
import os
import zipfile

with zipfile.ZipFile("file.zip", "w") as zf:
    for dirpath, dirnames, files in os.walk("any_directory"):
        zf.write(dirpath)
        for filename in files:
            zf.write(os.path.join(dirpath, filename))
```

Mode `"r"` = read. `extractall(path=…)` unpacks into that directory.

```python
with zipfile.ZipFile('file.zip', 'r') as zf:
    zf.extractall(path='extract_dir')
```

`tarfile` — library for **tar** archives (same idea: open, add, extract).

**Easiest way** — `shutil.make_archive` / `shutil.unpack_archive` (format is a string: `'zip'`, `'tar'`, …):

```python
import shutil

# shutil.make_archive(base_name, format, root_dir)
shutil.make_archive('data/backup', 'zip', 'data/')

shutil.unpack_archive('backup.tar', 'extract_dir/')
```

`make_archive('data/backup', 'zip', 'data/')` packs `data/` into `data/backup.zip`. `unpack_archive` extracts into `extract_dir/`.

**Memory hook:** `ZipFile` `"w"` + `walk` + `write` · `"r"` + `extractall`. Easiest: `make_archive` / `unpack_archive`. `tarfile` = tar.
