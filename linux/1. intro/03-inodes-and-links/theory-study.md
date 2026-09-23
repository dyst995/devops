# 03 — Inodes and links (study)

A file **name** is not the file. The file is an **inode**. The name is a pointer to that inode. Hard links and soft links are two different kinds of pointer.

## Inodes

An **inode** (index node) is a file-system object record (file or directory). It stores:

- **Attributes / metadata** — change, access, and modification times
- **Owner and permission** data
- **Disk block location(s)** of the data

It does **not** store the name. Names live in **directories**, which are lists of names → inode numbers. A directory always has `.` (itself), `..` (parent), and an entry for each child.

Every file and directory has a **link count** (how many directory entries point at that inode). When the count drops to 0 and no process has the file open, the data can be deleted.

## Hard vs soft

| | Hard link | Soft link (symlink) |
| --- | --- | --- |
| Points to | **inode** | **path** / file name |
| Cross file systems? | **No** (inodes are unique only inside one FS) | **Yes** |
| “Original” name deleted? | Data remains (count > 0) | Link **breaks**; target is gone |
| Target moved/renamed? | Still valid (same inode) | Usually **dangling** |
| Same inode as target? | **Yes** — no original vs copy, just two names | **No** — own inode, type symlink |
| Directories | Generally **forbidden** (would loop the tree). `.` and `..` are the special directory hard links the system manages | Common as shortcuts |
| Command | `ln src dest` (or the `link` function) | `ln -s src dest` (or `symlink`) |

```bash
ln original.txt another-name.txt
# both names → same inode; edits through either name are the same data

ln -s /var/www/html/current /srv/app
# /srv/app stores the path /var/www/html/current
```

Deleting a **symlink** does not delete the target. If the target is removed, the symlink remains but is broken.

Hard link: same inode, same data, same filesystem. Soft link: a sticky note with a path — move the real file and the note is wrong.
