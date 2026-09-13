# 03 — Inodes and Links

On Linux, a file name is **not** the file. The file is an **inode**. The name is just a pointer to that inode. Hard links and soft links are two different kinds of pointer.

## Inodes

An **inode** (index node) is a data structure in a Unix-style file system that describes a file-system object such as a file or a directory.

Each inode stores:

- **Attributes / metadata** — last change, access, and modification times
- **Owner and permission** data
- **Disk block location(s)** of the object’s data

What the inode does **not** store: the file’s name. Names live in directories.

**Directories** are lists of names assigned to inodes. A directory contains:

- an entry for **itself** (`.`)
- an entry for its **parent** (`..`)
- an entry for **each child**

**Memory hook:** inode = the file’s ID card + map of its data blocks. Directory = a phone book of names → inode numbers.

Every file and directory has a link count (how many directory entries point at that inode). When the link count drops to 0 and no process has the file open, the data can be deleted.

## Hard link

A **hard link** is a **direct pointer to an inode**.

Rules to memorize:

- Because inodes are unique only **inside one file system**, hard links **cannot cross file systems** (you cannot hard-link from `/` on disk A to a file on a separately mounted disk B).
- A hard link is **indistinguishable** from the original file. There is no “original” vs “copy” at the inode level — just two names for the same inode.
- Changes made through any name **reflect in all** names.
- The file stays accessible **as long as at least one hard link remains** (link count > 0).
- Created with `ln` and **no options**, or with the `link` function.

```bash
ln original.txt another-name.txt
# both names point to the same inode
```

You generally **cannot** hard-link directories (the OS forbids it to protect the tree from loops). `.` and `..` are the special directory hard links the system manages for you.

## Soft link (symbolic link / symlink)

A **soft link** is a pointer to a **file name** (a path), not to the inode.

Rules to memorize:

- If the original file is **moved or renamed**, the link **becomes invalid** (dangling symlink).
- **Deleting the link** does not delete the original file.
- If the **original is removed**, the link remains but is broken; the original is gone.
- Often used for **directories** to create shortcuts.
- Created with `ln -s`, or the `symlink` function.

```bash
ln -s /var/www/html/current /srv/app
# /srv/app is a name that points to the path /var/www/html/current
```

## Hard vs soft — the table you should be able to rewrite from memory

| | Hard link | Soft link |
| --- | --- | --- |
| Points to | inode | path / file name |
| Cross file systems? | No | Yes |
| Survives if “original” name is deleted? | Yes, data remains | Link breaks |
| Survives if target is moved? | Yes (same inode) | Usually breaks |
| Looks like the original file? | Yes — same inode | No — it is its own inode, type “symlink” |
| Typical use | Extra name for a file | Shortcuts, especially to directories |
| Command | `ln src dest` | `ln -s src dest` |

**Memory hook:**

- **Hard** = same inode, same data, same filesystem. `ln`
- **Soft** = sticky note with a path. `ln -s`. Move the real file → note is wrong.
