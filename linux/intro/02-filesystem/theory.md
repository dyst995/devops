# 02 — File System

A **file system** is how the OS organizes, names, and stores data on disk. Unix/Linux and Windows do this in very different ways. As a DevOps engineer you live on Linux servers, but you will still compare the two in interviews and when mounting Windows shares.

## Unix / Linux

- Supports many file system **types**: `ext2`, `ext3`, `ext4`, ReiserFS, XFS, Btrfs, and others.
- Uses a **single hierarchy (tree)**. There is one root directory `/`. Every file on the system lives somewhere under it — even files that sit on a second disk.
- Extra disks or partitions are **mounted** onto a directory (for example `/mnt/data` or `/home`). You do not get a new “drive letter”.
- There is **no required `filename.extension`**. The kernel does not decide what a file is from its name. Extension is optional. A file named `notes` can be text; a file named `run.sh` is only a script if it has execute permission and a shebang (or you pass it to a shell).

**Memory hook:** Linux = one tree, root is `/`. Names are just names.

## Windows

- Historically supports **NTFS**, **FAT16**, and **FAT32** as the main local file systems (modern Windows also has ReFS; this course note sticks to the classic three).
- Uses a **drive-letter abstraction**. Files live on disks or partitions shown as `A:`, `B:`, `C:`, … `Z:`.
- System behavior depends on the **extension**: `.exe` is treated as executable, `.txt` as text, `.dll` as a library, and so on.

**Memory hook:** Windows = many roots (`C:\`, `D:\`), and the suffix decides the type.

## Side-by-side

| Idea | Linux | Windows |
| --- | --- | --- |
| How storage is shown | One tree starting at `/` | Drive letters `A:`–`Z:` |
| Second disk | Mounted on a directory | Often a new letter (`D:`) |
| File type | Content + permissions, not the name | Extension (`.exe`, `.txt`, …) |
| Common local FS | ext4, XFS, Btrfs, … | NTFS, FAT16, FAT32 |
| Path example | `/home/nika/notes` | `C:\Users\nika\notes.txt` |

## Why “no extension” still matters on Linux

Linux *can* have extensions (`.conf`, `.service`, `.log`) — people use them for humans and for tools. The OS itself still does not require them. What makes a file executable is the **execute bit** (`chmod +x`) and, for scripts, the **interpreter** in the first line (`#!/bin/bash`).
