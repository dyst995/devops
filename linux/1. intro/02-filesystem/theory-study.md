# 02 — File system (study)

A **file system** is how the OS organizes, names, and stores data on disk. Linux and Windows do this differently. You live on Linux servers, but you will still compare the two in interviews and when mounting Windows shares.

| Idea | Linux | Windows |
| --- | --- | --- |
| How storage is shown | **One tree** starting at `/` | Drive letters `A:`–`Z:` |
| Extra disk / partition | **Mounted** on a directory (`/mnt/data`, `/home`) | Often a new letter (`D:`) |
| File type | Content + **permissions**, not the name | **Extension** (`.exe`, `.txt`, `.dll`, …) |
| Common local FS | Many types: `ext2`/`ext3`/`ext4`, ReiserFS, XFS, Btrfs, … | NTFS, FAT16, FAT32 (this course; modern Windows also has ReFS) |
| Path example | `/home/nika/notes` | `C:\Users\nika\notes.txt` |

Linux has **no required `filename.extension`**. The kernel does not decide what a file is from its name. A file named `notes` can be text; `run.sh` is a script only if it has **execute permission** and a shebang (or you pass it to a shell).

People still use extensions (`.conf`, `.service`, `.log`) for humans and tools. The OS does not require them. What makes a file executable is the **execute bit** (`chmod +x`) and, for scripts, the **interpreter** on the first line (`#!/bin/bash`).
