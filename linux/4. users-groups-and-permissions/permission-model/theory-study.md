# Permission model (study)

Access is decided by the file’s **owner UID**, **group GID**, and **mode bits**. `ls -l` shows all three.

```text
-rwxr-x---  1 nika  staff  4096  Sep 16 12:00 backup.sh
│││││││││     │     │
│││││││││     │     └── group owner
│││││││││     └──────── user owner
│││││││└┴────────────── other (world): ---
││││└┴┴──────────────── group: r-x
│└┴┴─────────────────── user (owner): rwx
└────────────────────── type: - file, d directory, l symlink, c/b device
```

Linux checks **one** bucket: owner, else group, else other — not the union of all three.

## r, w, x

Same bits on files, directories, and device (special) files; they **mean** different things on a directory.

| | **File** | **Directory** |
| --- | --- | --- |
| **r** | open / read contents | list names (`ls`) |
| **w** | modify contents | create, delete, or rename entries (also needs **x**) |
| **x** | run as a program or script | **enter** / resolve a path (`cd`, open a file inside) |

Without directory **x** you cannot `cd` in or open a path through it, even with **r**. Directory **w** without **x** cannot create or delete names.

## Ownership

```bash
chown user /home/myfolder
chgrp mytestgroup test.t
chown user:group path
chown -R user path
chgrp -R group path
```

On typical Linux only **root** can give a file to another user.

## Mode: octal and symbolic

Each rwx triplet is bits **4 + 2 + 1** (`-` = 0). Three digits = user, group, other. `rwxr-x---` → **750**.

| Octal | Symbolic | Typical use |
| --- | --- | --- |
| `755` | `rwxr-xr-x` | executable or directory others may enter |
| `644` | `rw-r--r--` | normal file |
| `700` | `rwx------` | private |
| `777` | `rwxrwxrwx` | everyone everything — avoid except `/tmp` **with** sticky bit |

```bash
chmod 755 test.t
chmod g=rw test.t                # group exactly rw (clears group x)
chmod o-r,g+w test.t
chmod +x script.sh
```

Who: `u` user, `g` group, `o` other, `a` all.  
Operator: `+` add, `-` remove, `=` set that class **exactly**.

## Special bits (leading octal digit)

`ls -l` draws these in an execute slot as `s`/`S` or `t`/`T`. Capital = special bit on **and** execute off.

| Octal | Bit | `ls -l` | Effect |
| --- | --- | --- | --- |
| **4** | SUID | `s` on **user** x | process **effective UID** = **file owner** |
| **2** | SGID | `s` on **group** x | process **effective GID** = **file group**; on a **directory**, new files inherit that group |
| **1** | sticky | `t` on **other** x | on a **directory**: only the file owner (or root) may delete/rename an entry |

`4755` = SUID + `755`. `2755` = SGID + `755`. `1777` = sticky + `777`. `0700` = no special bits + `700`.

```bash
chmod 4555 path_to_file
chmod 2555 path_to_folder
chmod +t somedirectory
chmod 1700 somedirectory
chmod -t somefile
chmod 1777 /tmp
```

Deleting a name is a **directory** operation (unlink), not “write the file.” If a shared dir is `777` without sticky, anyone can delete **anyone’s** file. `/tmp` and `/var/tmp` are the usual case: bob’s `/tmp/bob` is safe from tom even though `/tmp` is world-writable (`drwxrwxrwt`).

**SUID** is why `passwd` can update `/etc/shadow`: the binary is owned by root and SUID, so it runs as root when you invoke it. Linux typically **ignores SUID on scripts** — it applies to **binaries**.

**SGID on a directory** keeps a shared project tree in one group: new files pick the directory’s group instead of the creator’s primary GID.

## ext attributes (`lsattr` / `chattr`)

Separate from rwx. `-R` recursive. `-d` = the directory itself, not its contents.

| Flag | Meaning |
| --- | --- |
| `+i` / `-i` | **Immutable** — no edit, delete, or rename until `chattr -i` (e.g. lock `lilo.conf`) |
| `+A` | **No atime** — access does not update last-access time (less inode churn on hot reads) |
| `+a` | **Append-only** — file: only append. Directory: add files, but not rename/delete existing ones |
| `+s` | **Secure deletion** — on delete, zero the blocks (like `shred`). Not all filesystems honor this |

```bash
lsattr
lsattr /directory/or/file
chattr +i /sbin/lilo.conf
chattr -i /sbin/lilo.conf
```

`chmod` is rwx (and special bits). `chattr` is extra ext flags.
