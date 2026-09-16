# Tasks — Inodes and links

Close `theory.md`. Work under `/tmp/inode-tasks`.

## Warm-up

1. Create a file. Display inode numbers next to names. Note the number.
2. From memory: what does an inode store, and what does it **not** store?
3. List a directory. Identify `.` and `..` in terms of inodes (same as what?).

## Hard links (repeat the same idea three ways)

4. Create a second name for the same file **without** copying data. Prove both names share an inode. Change one; read the other.
5. Delete the first name. Predict whether the data is gone, then check.
6. Predict **before** trying: can you make that kind of extra name for a file on another mounted filesystem? Then try or explain from the notes.
7. Predict: can you normally create that kind of extra name for a **directory**? Why does the notes forbid it?

## Soft links

8. Create a path-pointer to a file. Show that it has its **own** inode. Read through it.
9. Rename or move the target. Predict the pointer’s fate, then check.
10. Delete the pointer. Predict whether the original file is gone, then check.
11. Point at a path that does not exist. Try to read it. Name this condition from the notes.

## Construct / table

12. Rewrite the hard vs soft comparison table from memory (what it points to, cross-FS, delete original, move target, command form). Check theory after.
13. Construct: extra name for a file vs shortcut to a directory — which pointer type does the notes say is typical for each?

## Scenario

14. Releases live in versioned directories; clients must keep using one stable path. Implement the switch using only this topic’s kind of pointer. Prove the path contents change without changing the path string.
