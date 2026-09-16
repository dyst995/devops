# 04 — Basic Shell Commands

Try the examples on a real shell. Do not only read them.

When you forget a flag, open the **manual**. On a server that is faster than a browser, and it matches **this** machine’s version of the command.

## man

**`man`** is the main UNIX help. Each argument is normally the name of a **program**, **utility**, or **function**.

A **section**, if you give one, limits the search to that part of the manual. The default is to search **all** available sections.

| Command | What you get |
| --- | --- |
| `man cat` | Full guide for `cat` |
| `man man` | Options and description of `man` itself |
| `man -k list` | Commands whose description contains “list” (keyword search, like `apropos`) |
| `man -f ls` | Short description of `ls` (like `whatis`) |

**Memory hook:** `-k` = **k**eyword (many hits). `-f` = **f**ingerprint / what is this, one line.

Manual sections you will see in headings like `ls(1)` or `printf(3)`:

| Section | Typical content |
| --- | --- |
| 1 | User commands (`ls`, `cat`) |
| 2 | System calls |
| 3 | Library functions (`printf`) |
| 5 | File formats (`fstab`) |
| 8 | Admin commands (`useradd`) |

If two pages share a name: `man 5 passwd` vs `man 1 passwd`.

Inside `man`: same ideas as `less` — arrows/`j` `k` to move, `/pattern` to search, `q` to quit.

## info

**`info`** is GNU’s information pages. Often longer and hyperlinked; `man` is the Unix default you should try first.

| Command | What you get |
| --- | --- |
| `info cat` | Full guide for `cat` |
| `info info` | Full description of `info` itself |

**Memory hook:** `man` = Unix bible on the box. `info` = GNU handbook. DevOps default: `man`, then `-k` if you forgot the command name.

```bash
man -k directory
man ls
man 1 ls
info ls
```

## ls — list

**`ls`** shows information about files or directories.

| Command | Meaning |
| --- | --- |
| `ls -la` | **l**ong format, **a**ll entries (do **not** skip names starting with `.`) |
| `ls -lh` | long format, **h**uman-readable sizes (`1K`, `234M`, `2G`) |
| `ls -lt` | long format, sort by **t**ime, **newest first** |
| `ls -lSh` | long format, sort by **S**ize (largest first), human-readable sizes |

```text
$ ls -lSh
total 16M
-rw-r--r-- 1 vagrant vagrant 10M  Aug 23 15:55 file10
-rw-r--r-- 1 vagrant vagrant 5.0M Aug 23 15:55 file5
-rw-r--r-- 1 vagrant vagrant 1.0M Aug 23 15:55 file1
```

**Memory hook:** `-l` = long (permissions, owner, size, date). `-a` = all (dotfiles). `-h` = human. `-t` = time. `-S` = Size (capital — not `-s`, which is a different flag).

Dotfiles (`.bashrc`, `.ssh`) are hidden from plain `ls`. Ops work almost always wants `ls -la`.

## pwd — print working directory

**`pwd`** prints the **full path** of the current directory.

```text
$ pwd
/home/vagrant
```

**Memory hook:** print **w**orking **d**irectory — “where am I?”

## cd — change directory

**`cd`** changes the current directory.

- Default destination is **`$HOME`** (bare `cd` goes home).
- **`$CDPATH`** is a search path for `cd`, like `PATH` but for directories. Entries are separated by **`:`**. A **null** entry means the current directory (`.`). If `dir` begins with **`/`**, `$CDPATH` is **not** used.

| Command | Goes to |
| --- | --- |
| `cd /` | Root of the filesystem (`/`) |
| `cd ..` | Parent of the current directory |
| `cd ~` | User’s home directory (same idea as `$HOME`) |
| `cd -` | **Previous** directory (toggles back) |

```text
$ pwd
/home/vagrant

$ cd /tmp
$ pwd
/tmp

$ cd -
/home/vagrant
$ pwd
/home/vagrant

$ cd -
/tmp
$ pwd
/tmp
```

`cd -` both **changes** directory and **prints** the path it landed on.

**Memory hook:** `..` parent, `~` home, `-` last place, `/` top of the tree. `$CDPATH` is ignored for absolute paths.

## touch

**`touch`** creates an **empty** file, or updates the **timestamp** of an existing file.

`-d`, `--date=STRING` — parse a human-readable date and use that instead of “now”. Examples: `"Sun, 29 Feb 2004 16:21:42 -0800"`, `"2004-02-29 16:21:42"`, `"next Thursday"`.

```text
$ touch newfile.txt
$ ls -l newfile.txt
-rw-rw-r-- 1 vagrant vagrant 0 Aug 23 16:16 newfile.txt

$ touch -d "next Friday" newfile.txt
$ ls -l newfile.txt
-rw-rw-r-- 1 vagrant vagrant 0 Aug 30 2019 newfile.txt
```

**Memory hook:** no file → create empty. file exists → poke its time. `-d` = fake the date.

## mkdir — make directory

**`mkdir`** creates an empty directory.

| Flag | Meaning |
| --- | --- |
| `-m`, `--mode=MODE` | Set mode as in `chmod`, not `a=rwx` minus umask |
| `-p`, `--parents` | Make parent dirs as needed; **no error** if they already exist |

```text
$ mkdir empty

$ mkdir -p dir/test{1..3}/empty
$ tree
.
└── dir
    ├── test1
    │   └── empty
    ├── test2
    │   └── empty
    └── test3
        └── empty
```

`test{1..3}` is brace expansion: `test1`, `test2`, `test3`. `-p` builds the whole chain.

**Memory hook:** `-p` = parents + “please don’t fail if it exists.”

## cp — copy

**`cp`** copies a file, or a directory **with all subdirectories** when recursive.

| Flag | Meaning |
| --- | --- |
| `-p` | Same as `--preserve=mode,ownership,timestamps` |
| `--preserve[=ATTR_LIST]` | Keep attributes (default: mode, ownership, timestamps). Extra: context, links, xattr, all |
| `-R`, `-r`, `--recursive` | Copy directories recursively |
| `-i`, `--interactive` | Prompt before overwrite (overrides a previous `-n`) |

```text
$ cp -r dir dir2/
$ tree dir2/
dir2/
└── dir
    ├── test1
    │   └── empty
    ...
```

**Memory hook:** file copy = `cp src dest`. Directory = add `-r`. Keep metadata = `-p`.

## mv — move or rename

**`mv`** moves or **renames** a file or directory. Same command: rename is a move in the same parent.

| Flag | Meaning |
| --- | --- |
| `-i`, `--interactive` | Prompt before overwrite |
| `--backup[=CONTROL]` | Backup each existing destination |
| `-S`, `--suffix=SUFFIX` | Backup suffix (instead of the default `~`) |
| `-u`, `--update` | Move only if SOURCE is **newer** than destination, or destination is **missing** |

```text
$ mv -b -S ".old" newfile dir/
# if dir/newfile already existed, it becomes dir/newfile.old
# the source newfile is now dir/newfile
```

**Memory hook:** `mv a b` = rename or relocate. `-b -S ".old"` = keep the overwritten file as `name.old`.

## cat — concatenate

**`cat`** displays a file, or **combines** files into one (concatenation).

```text
$ echo 1 > 1.txt
$ echo 2 > 2.txt
$ cat 1.txt 2.txt > 3.txt
$ cat 3.txt
1
2
```

**Memory hook:** `cat a b > c` glues `a` then `b` into `c`. `cat file` just prints.

## rmdir and rm

**`rmdir`** removes an **empty** directory only.

**`rm`** removes (unlinks) files, or directories with `-r`.

If you `rm` a file, recovery **might** still be possible with enough skill/time. For stronger destruction, the notes point to **`shred`**.

| Flag | Meaning |
| --- | --- |
| `-f`, `--force` | Ignore missing files; **never** prompt |
| `-r`, `-R`, `--recursive` | Remove directories and contents |
| `-v` | Verbose (show each name) |

```text
$ rm -v ~/1.txt
removed '/home/vagrant/1.txt'

$ rm -rfv dir/
removed 'dir/newfile.old'
removed 'dir/newfile'
removed directory: 'dir'
```

**Memory hook:** empty dir → `rmdir`. Anything nested → `rm -r`. `rm -rf` is powerful and silent about missing paths — think before you run it on `/` or `$HOME`.

## Environment variable commands

[02 — Shell programming](../02-shell-programming/theory.md) defined **environment** vs **shell** variables. These commands **list, set, and delete** them.

| Command | Role |
| --- | --- |
| `env` | Run another program in a **custom** environment **without** changing the current one. **No arguments:** print current **environment** variables. |
| `printenv` | Print **all** or **named** environment variables. |
| `set` | Set or unset **shell** variables. **No arguments:** print **everything** — environment, shell variables, and **shell functions**. |
| `unset` | Delete shell **and** environment variables. |
| `export` | Turn a name into an **environment** variable (inherited by children). |

**Memory hook:**

- `printenv` / `env` → **exported** environment
- `set` → **everything** in this shell (noisy)
- `export NAME=value` → children can see it
- `unset NAME` → gone from this shell (and env if it was exported)

```bash
printenv PATH
printenv                 # all environment vars

env                      # same idea: dump environment
env VAR=tmp ./myscript   # run script with VAR set, current shell unchanged

MYLOCAL=hello            # shell variable only
export MYLOCAL           # now environment
export EDITOR=vim

set | less               # huge list: vars + functions
unset MYLOCAL
unset EDITOR
```

`export` is how a value in `~/.bash_profile` becomes visible to `vim`, `python`, and other processes you start.

## more

**`more`** is an old pager. If the text does not fit on one screen, it **pages** it. You can scroll **down** but **not up**.

## less

**`less`** was written because **`more` could not scroll backwards**. It became an open-source project and grew a lot of features. That is why some **small embedded** systems have `more` but not `less`.

**Memory hook:** *less is more* — `less` can do what `more` can, plus go back. Prefer `less` on a normal server.

Search inside `less` (and `man`, which uses the same idea):

| Key | Action |
| --- | --- |
| `/pattern` | Search **forward** for the N-th line containing the pattern (N defaults to **1**). Pattern is a **regex**. Search starts at the **first displayed line**. |
| `?pattern` | Search **backward**. Starts at the line **immediately before** the top displayed line. |
| `n` | Repeat previous search, same direction |
| `N` | Repeat previous search, **reverse** direction |

Same `/` `?` `n` `N` pair as Vim command-mode search.

```bash
less /var/log/syslog
# q to quit
```

## head

**`head`** prints the **first 10 lines** of a file by default.

`-n`, `--lines=[-]K`

- `head -n K` — first **K** lines instead of 10
- `head -n -K` — **all but the last K** lines of each file

```bash
head /etc/passwd
head -n 5 /etc/passwd
head -n -2 file.txt    # everything except the last 2 lines
```

## tail

**`tail`** prints the **last 10 lines** by default.

| Flag | Meaning |
| --- | --- |
| `-n`, `--lines=K` | Last **K** lines instead of 10 |
| `-n +K` | Output **starting at line K** (from that line to the end) |
| `-f`, `--follow[={name\|descriptor}]` | Keep printing **appended** data as the file **grows** |

```bash
tail /var/log/syslog
tail -n 50 /var/log/syslog
tail -n +20 file.txt     # from line 20 onward
tail -f /var/log/syslog  # follow a live log; Ctrl-C to stop
```

**Memory hook:** `head` = top of the file. `tail` = bottom. `tail -f` = follow a log in real time. `less` = walk around. `more` = only forward, old/small systems.
