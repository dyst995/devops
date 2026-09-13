# 02 — File System — Questions

Cover the Answers section. Answer first, then check.

1. What is the single-hierarchy idea on Unix/Linux?
2. What is the root of the Linux file tree, and what lives under it?
3. Name at least three Linux file system types from the notes.
4. Does Linux require `filename.extension`? What does the system assume from an extension?
5. Which file systems does the Windows side of the notes list?
6. How does Windows locate files across disks, compared to Linux?
7. How does Windows decide what to do with a file, based on its name?
8. You add a second disk on Linux. Do you get a new drive letter? What happens instead?
9. File `report` has no extension. Can it still be a valid text file on Linux? On Windows, what would typically be missing?
10. File `backup.exe` on Linux — is it automatically executable? What actually makes a file executable?
11. Translate this Windows path idea to Linux: “put the project on the D: drive.”
12. Why can `notes.txt` and `notes` be the same kind of file on Linux?

---

## Answers

1. There is one tree. One root directory, and every file is located under it.
2. `/`. Every file on the system — including files on other disks after they are mounted.
3. ext2, ext3, ReiserFS (also commonly ext4, XFS, Btrfs).
4. No. The system does not assume content from the extension. Extension is optional.
5. NTFS, FAT16, and FAT32.
6. Windows uses drive letters (`A:`–`Z:`). Linux mounts extra storage into the same tree.
7. By extension: `.exe` executable, `.txt` text, and so on.
8. No new letter. You mount the disk on an existing directory (for example `/data`).
9. Yes on Linux. On Windows, without an extension the OS often does not know which program should open it.
10. No. The execute permission bit (and for scripts, a shebang) makes it executable — not the `.exe` suffix.
11. Create a mount point (for example `/mnt/projects` or `/data`) and mount that disk there.
12. Linux does not treat the name as the file type. Both can be plain text; the extension is only a hint for humans or editors.
