# 03 — Inodes and Links — Questions

Cover the Answers section. Answer first, then check.

1. What is an inode, and what kind of objects does it describe?
2. List at least four things stored in an inode.
3. What does an inode **not** store?
4. What is a directory, in inode terms? Which three kinds of entries does it contain?
5. What is a hard link, in one phrase?
6. Why can a hard link not cross file systems?
7. If you edit a file through a hard link, what happens to the “original”?
8. You delete the original name of a file that still has a hard link. Can you still open the data? Why?
9. Which command creates a hard link? Which option must you **not** add?
10. What is a soft link (symlink)? What does it point to?
11. You `mv` the original file. What happens to a hard link? To a soft link?
12. You delete a symlink. What happens to the original file?
13. You delete the original file. What happens to a remaining symlink?
14. Soft links are commonly used for what kind of object, and why?
15. Command to create a symlink?
16. Two files show the same inode number in `ls -li`. Hard or soft link?
17. You try `ln /mnt/diskA/file /mnt/diskB/file` and it fails. Why, and what command should you use instead if you still want a link?
18. Why are hard links to directories normally not allowed?

---

## Answers

1. A data structure in a Unix-style file system that describes a file-system object such as a file or a directory.
2. Attributes / metadata (change, access, modification times), owner, permissions, disk block location(s) of the data.
3. The file’s human name. Names live in directories.
4. A list of names assigned to inodes. Entries: itself (`.`), parent (`..`), and each child.
5. A direct pointer to an inode.
6. Inodes are unique only within one file system. A hard link is an inode number; that number is meaningless on another FS.
7. They are the same inode — the change appears through every name.
8. Yes. The file is accessible as long as a hard link remains (link count > 0).
9. `ln` with no options (or the `link` function). Do not add `-s`.
10. A pointer to a file name / path (also called symlink or symbolic link).
11. Hard link still works (same inode). Soft link usually becomes invalid (dangling).
12. The original file stays. Deleting the link does not delete the target.
13. The original is gone. The symlink remains as a broken / dangling link.
14. Directories — to create shortcuts without copying the tree.
15. `ln -s` (or the `symlink` function).
16. Hard link (same inode). A symlink has its own inode and a different type.
17. Hard links cannot cross file systems. Use `ln -s` (soft link).
18. They would create loops in the directory tree (`.`, `..`, and cycles), which would break tools that walk the tree.
