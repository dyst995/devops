# Tasks — Inodes and links

Close `theory.md`. Work in `/tmp/inodes-and-links-tasks` when creating files. Do the action or write the answer, then check yourself.

## Warm-up — inodes

1. In one sentence: on Linux, is the file name the file? What is the file, and what is the name?
2. From memory: what does an inode store (at least three kinds of metadata from the notes)? What does it **not** store?
3. Memory hook: inode = ? Directory = ? Restate both without looking.
4. Under `/tmp/inodes-and-links-tasks`, create a file `a.txt` with some text. Display inode numbers next to names (`ls -li`). Note the inode number of `a.txt`.
5. List the directory with `ls -li`. Identify `.` and `..`. What are they in terms of directory entries / inodes (self and parent)?
6. From the notes: what is a **link count**? When can the data finally be deleted?

## Hard links

7. Create a second name for the same file **without** copying data (`ln` with no `-s`). Prove both names share an inode with `ls -li`. Change the content through one name; read the other.
8. Check the link count on both names before and after creating the hard link. What changed?
9. Delete the first name. Predict whether the data is gone, then check by reading the remaining name and looking at `ls -li`.
10. Predict **before** trying: can you make a hard link to a file on another mounted filesystem? Why, from the notes (inodes unique only inside one FS)?
11. Predict: can you normally create a hard link to a **directory**? Why does the notes say the OS forbids it? What special directory hard links does the system manage for you?
12. Restate from memory: a hard link is indistinguishable from the original at the inode level — there is no “original” vs “copy.” Give one sentence proving it with your experiment above.

## Soft links (symlinks)

13. Create a soft link to a file (`ln -s`). Show with `ls -li` that the symlink has its **own** inode (different number, type “symlink”). Read through it.
14. Rename or move the **target**. Predict the pointer’s fate (dangling?), then check (`ls -l`, try to `cat` the link).
15. Recreate a valid symlink. Delete the **link** only. Predict whether the original file is gone, then check.
16. Recreate a valid symlink. Delete the **original** file. Predict what remains (broken link?). Try to read the link. Name this condition from the notes.
17. Create a symlink that points at a path that does not exist. Try to read it. Confirm it is a dangling symlink.
18. From the notes: soft links are often used for **directories**. Create a symlink that points at a directory under `/tmp/inodes-and-links-tasks` and `cd` through it (or `ls` through it). Prove the shortcut works.

## Hard vs soft — construct the table

19. Rewrite the hard vs soft comparison table from memory: points to, cross file systems, survives if original name deleted, survives if target moved, looks like original, typical use, command. Check theory after.
20. Construct: “extra name for a file” vs “shortcut to a directory” — which pointer type does the notes say is typical for each? Write the exact command forms (`ln src dest` vs `ln -s src dest`).
21. Distinguish in one line: hard link points to **inode**; soft link points to **path / file name**.

## Scenario

22. Releases live in versioned directories (for example `app-v1`, `app-v2`); clients must keep using one stable path (for example `current`). Implement the switch using only this topic’s kind of pointer (symlink). Prove the path contents change when you retarget the link, without changing the stable path string. Use only throwaway dirs under `/tmp/inodes-and-links-tasks`.
