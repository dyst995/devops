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
os.mkdir("example_directory")            # one directory; parents must exist
os.makedirs("2018/10/05")                # whole chain: 2018/10/05
os.rmdir("app_dir")                      # empty directory

with os.scandir('.') as entries:         # list one directory
    for entry in entries:
        print(entry.name)                # every basename

with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_file():              # files only
            print(entry.name)

with os.scandir('.') as entries:
    for entry in entries:
        if entry.is_dir():               # directories only
            print(entry.name)

import fnmatch
for filename in os.listdir('.'):         # all names in .
    if fnmatch.fnmatch(filename, 'data_*_backup.txt'):
        print(filename)                  # shell glob: data_<anything>_backup.txt

for dirpath, dirnames, files in os.walk('.'):   # whole tree
    print(f'Found directory: {dirpath}')        # this folder
    for file_name in files:
        print(file_name)                        # files here (not sorted)

import tempfile
with tempfile.TemporaryDirectory() as tmpdir:   # unique dir, often /tmp/tmp…
    print('Created temporary directory ', tmpdir)
    os.path.exists(tmpdir)                      # True inside with
os.path.exists(tmpdir)                          # False — dir and contents gone

if os.path.isfile(data_file):
    os.remove(data_file)                        # delete a file
else:
    os.rmdir(data_file)                         # empty directory only

import shutil
try:
    shutil.rmtree('my_documents/bad_dir')       # delete a tree
except OSError as e:
    print(f'Error: {e.strerror}')

shutil.copy('path/to/file.txt', 'path/to/dest_dir')   # copy file
shutil.copy2(src, dst)                                # copy file + metadata
shutil.copytree('data_1', 'data1_backup')             # copy directory tree

shutil.move('dir_1/', 'backup/')                      # into backup/ if it exists;
                                                      # else rename dir_1/ → backup
os.rename('first.zip', 'first_01.zip')                # rename in place

import zipfile
with zipfile.ZipFile("file.zip", "w") as zf:          # create ZIP
    for dirpath, dirnames, files in os.walk("any_directory"):
        zf.write(dirpath)                             # add the directory
        for filename in files:
            zf.write(os.path.join(dirpath, filename)) # add each file

with zipfile.ZipFile('file.zip', 'r') as zf:          # read ZIP
    zf.extractall(path='extract_dir')                 # unpack here

# tarfile — tar archives (same idea)

shutil.make_archive('data/backup', 'zip', 'data/')    # easiest: data/ → data/backup.zip
shutil.unpack_archive('backup.tar', 'extract_dir/')   # extract any supported format
```
