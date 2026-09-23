# 04 — Basic shell commands (study)

Try the examples on a real shell. When you forget a flag, open the **manual** — it matches **this** machine’s version.

## man and info

**`man`** is the main UNIX help. Arguments are normally a **program**, **utility**, or **function**. A **section** limits the search; default is all available sections.

| Command | What you get |
| --- | --- |
| `man cat` | Full guide for `cat` |
| `man man` | `man` itself |
| `man -k list` | Descriptions containing “list” (keyword, like `apropos`) |
| `man -f ls` | One-line description (like `whatis`) |
| `man 5 passwd` vs `man 1 passwd` | File format vs the `passwd` command |

| Section | Typical content |
| --- | --- |
| 1 | User commands (`ls`, `cat`) |
| 2 | System calls |
| 3 | Library functions (`printf`) |
| 5 | File formats (`fstab`) |
| 8 | Admin commands (`useradd`) |

Headings look like `ls(1)` or `printf(3)`. Inside `man`: same ideas as `less` — arrows/`j` `k`, `/pattern`, `q`.

**`info`** is GNU’s longer, hyperlinked pages. DevOps default: `man` first, then `-k` if you forgot the name.

```bash
man -k directory
man ls
man 1 ls
info ls
info info
```

## ls, pwd, cd

**`ls`** lists files or directories. Dotfiles (`.bashrc`, `.ssh`) are hidden from plain `ls` — ops almost always wants `ls -la`.

| Command | Meaning |
| --- | --- |
| `ls -la` | **l**ong + **a**ll (do not skip `.` names) |
| `ls -lh` | long + **h**uman sizes (`1K`, `234M`, `2G`) |
| `ls -lt` | long, sort by **t**ime, **newest first** |
| `ls -lSh` | long, sort by **S**ize (largest first), human. Capital `-S` — not `-s` (different flag) |

**`pwd`** prints the **full path** of the current directory.

**`cd`** changes directory. Bare `cd` goes to **`$HOME`**. **`$CDPATH`** is a search path for `cd` (like `PATH` for directories, `:`-separated). A **null** entry means `.`. If the dest begins with **`/`**, `$CDPATH` is **not** used.

| Command | Goes to |
| --- | --- |
| `cd /` | Filesystem root |
| `cd ..` | Parent |
| `cd ~` | Home (`$HOME`) |
| `cd -` | **Previous** directory (toggles). Also **prints** the path it landed on |

## Creating and copying

**`touch`** creates an **empty** file, or updates the **timestamp** of an existing one. `-d` / `--date=STRING` uses a parsed date instead of now (`"next Friday"`, `"2004-02-29 16:21:42"`, `"Sun, 29 Feb 2004 16:21:42 -0800"`).

**`mkdir`** creates an empty directory.

| Flag | Meaning |
| --- | --- |
| `-m`, `--mode=MODE` | Mode as in `chmod`, not `a=rwx` minus umask |
| `-p`, `--parents` | Make parents as needed; **no error** if they already exist |

`mkdir -p dir/test{1..3}/empty` — brace expansion `test1` `test2` `test3`, `-p` builds the chain.

**`cp`** copies a file, or a directory **with all subdirectories** when recursive.

| Flag | Meaning |
| --- | --- |
| `-p` | `--preserve=mode,ownership,timestamps` |
| `--preserve[=ATTR_LIST]` | Keep attributes (default mode, ownership, timestamps). Extra: context, links, xattr, all |
| `-R`, `-r`, `--recursive` | Copy directories |
| `-i`, `--interactive` | Prompt before overwrite (overrides a previous `-n`) |

**`mv`** moves or **renames** (same parent = rename).

| Flag | Meaning |
| --- | --- |
| `-i` | Prompt before overwrite |
| `--backup[=CONTROL]` | Backup each existing destination |
| `-S`, `--suffix=SUFFIX` | Backup suffix (default `~`) |
| `-u`, `--update` | Move only if SOURCE is **newer** than dest, or dest is **missing** |

`mv -b -S ".old" newfile dir/` — if `dir/newfile` existed, it becomes `dir/newfile.old`.

**`cat`** displays a file or **concatenates** files: `cat 1.txt 2.txt > 3.txt`.

## Removing

**`rmdir`** removes an **empty** directory only. **`rm`** unlinks files, or directories with `-r`. Recovery after `rm` **might** still be possible; **`shred`** is the stronger destruction the notes point to.

| Flag | Meaning |
| --- | --- |
| `-f`, `--force` | Ignore missing files; **never** prompt |
| `-r`, `-R`, `--recursive` | Remove directories and contents |
| `-v` | Verbose |

`rm -rf` is powerful and silent about missing paths — think before you run it on `/` or `$HOME`.

## Environment commands

See [shell programming](../02-shell-programming/theory.md) for environment vs shell variables. These **list, set, and delete**:

| Command | Role |
| --- | --- |
| `env` | No args: print **environment**. Or run a program in a **custom** environment **without** changing the current one (`env VAR=tmp ./myscript`) |
| `printenv` | Print **all** or **named** environment variables |
| `set` | Set/unset **shell** variables. No args: print **everything** — env, shell vars, **functions** |
| `unset` | Delete shell **and** environment variables |
| `export` | Make a name an **environment** variable (children inherit). How a value in `~/.bash_profile` reaches `vim`, `python`, … |

```bash
printenv PATH
export EDITOR=vim
set | less
unset EDITOR
```

## Pagers and slices

**`more`** pages text; you can scroll **down** but **not up**. **`less`** exists because `more` could not go backwards; it grew many features. Some **small embedded** systems have `more` but not `less`. Prefer `less` on a normal server. Search in `less` (and `man`) is the same idea as Vim: `/` forward, `?` backward, `n` / `N` next / reverse. Pattern is a **regex**. `/` starts at the **first displayed line**; `?` starts immediately **before** the top displayed line. `q` quits.

**`head`** — first **10** lines by default. `-n K` = first K. `-n -K` = **all but the last K** lines.

**`tail`** — last **10** lines. `-n K` = last K. `-n +K` = from line K to the end. `-f` / `--follow` = keep printing as the file **grows** (live logs; Ctrl-C).
