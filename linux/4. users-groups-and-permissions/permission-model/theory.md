# Permission model

Files and devices grant access using the **owner UID** and **group GID**. `ls -l` shows both, plus the mode bits.

```text
$ ls -l
-rwxr-x---  1 nika  staff  4096  Sep 16 12:00 backup.sh
│││││││││     │     │
│││││││││     │     └── group owner
│││││││││     └──────── user owner
│││││││└┴────────────── other (world): ---
││││└┴┴──────────────── group: r-x
│└┴┴─────────────────── user (owner): rwx
└────────────────────── type: - file, d directory, l symlink, c/b device
```

Three identity buckets: **user** (owner), **group**, **other**. Three operations: **read (r)**, **write (w)**, **execute (x)**. Same idea on directories and device files (special files).

On a **file**: `r` = open/read, `w` = modify, `x` = run as a program/script.

On a **directory**: `r` = list names (`ls`), `x` = **enter** / resolve a path (`cd`, open a file inside), `w` = create/delete/rename entries (needs `x` too).

**Memory hook:** who = owner / group / world. what = r w x. Directory `x` = “may walk into.”

## chown / chgrp

```bash
chown user /home/myfolder      # user owner of the directory
chgrp mytestgroup test.t       # group owner of the file
```

`chown user:group path` sets both at once. Recursive: `chown -R`, `chgrp -R`. Only root can give a file to another user on typical Linux.

**Memory hook:** `chown` = **user** owner. `chgrp` = **group** owner.

## Octal mode

Each rwx triplet is a 3-bit number:

| Letter | Value |
| --- | --- |
| `r` | **4** |
| `w` | **2** |
| `x` | **1** |
| `-` | 0 |

Split `rwxr-x---` into three groups of three: `rwx` `r-x` `---`:

- `rwx` = 4+2+1 = **7**
- `r-x` = 4+0+1 = **5**
- `---` = **0**

So `rwxr-x---` = **750**.

Common values: `755` (`rwxr-xr-x`), `644` (`rw-r--r--`), `700` (`rwx------`), `777` (everyone everything — avoid except `/tmp` with sticky bit).

**Memory hook:** 4-2-1. Three digits = user, group, other.

## chmod

```bash
chmod g=rw test.t              # group exactly read+write (no x)
chmod 755 test.t               # rwxr-xr-x
chmod o-r,g+w test.t           # take r from other, add w to group
```

Symbolic: `u` user, `g` group, `o` other, `a` all. `+` add, `-` remove, `=` set exactly.

**Memory hook:** `chmod 755` when you think in numbers. `chmod g+w` when you think in letters.

## Sticky bit (`t`)

Used mainly on **shared directories** such as `/tmp` and `/var/tmp`.

Everyone can create files (directory often `777`), read/execute others’ files if those files allow it, but **cannot delete or rename files they do not own**. Without sticky bit, write access on the directory is enough to delete **anyone’s** file inside (the directory controls unlinking, not the file’s own mode).

Example: bob creates `/tmp/bob`. With sticky bit, tom cannot delete it even if `/tmp` is `777`. Without it, tom can.

```bash
chmod +t somedirectory
chmod 1700 somedirectory     # leading 1 = sticky
chmod -t somefile
chmod 0700 somefile          # leading 0 = no special bits
```

`ls -l` shows `t` or `T` in other’s execute slot (`drwxrwxrwt` for `/tmp`).

**Memory hook:** sticky on a dir = “you may only throw away **your** trash.” Octal extra digit **1**.

## SUID and SGID (`s`)

**SUID** shows as **`s`** in the **owner’s** execute field. When you run that file, the process’s **effective UID** is the **file owner**, not you. Classic: `passwd` runs as root so it can update `/etc/shadow`.

```bash
chmod 4555 path_to_file      # leading 4 = SUID
```

**SGID** shows as **`s`** in the **group’s** execute field. The process runs with the file’s **group** as effective GID.

```bash
chmod 2555 path_to_folder    # leading 2 = SGID
```

On a **directory**, SGID is extra useful: new files inherit the **directory’s group**, so a shared project dir stays in one group.

Linux typically **ignores SUID on scripts** (security). It applies to **binaries**.

Special-bit octal (left digit): **4** SUID, **2** SGID, **1** sticky. `4755` = SUID + `755`. `2755` = SGID + `755`. `1777` = sticky + `777` (`/tmp`).

**Memory hook:** `s` on **user** x = run as **owner** (SUID). `s` on **group** x = run as **group** / inherit group on dirs (SGID). Extra octal: 4 / 2 / 1.

## lsattr / chattr

Beyond rwx, ext file systems have **attributes**.

**`lsattr`** — list them. `-R` recursive. `-d` treat a directory as a file (do not list contents).

```bash
lsattr
lsattr /directory/or/file
```

**`chattr`** — change them.

| Flag | Meaning |
| --- | --- |
| `+i` / `-i` | **Immutable** — no changes, deletes, or renames until you `chattr -i`. Example: lock `lilo.conf`. |
| `+A` | **No atime** — reads/writes do not update last-access time (less inode churn on hot read files). |
| `+a` | **Append-only** — file: only append. Directory: add files, but not rename/delete existing ones. |
| `+s` | **Secure deletion** — on delete, blocks are zeroed (like `shred`). Not all FS honor this. |

```bash
chattr +i /sbin/lilo.conf
chattr -i /sbin/lilo.conf    # unlock before you edit
```

**Memory hook:** `chmod` = rwx. `chattr` = extra ext flags. `i` = frozen. `a` = append only. `lsattr` to see them.
