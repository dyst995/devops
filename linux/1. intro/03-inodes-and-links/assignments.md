# Assignments — Inodes and links

Close `commands.md`. Type and run in a **throwaway directory** under your home. Do not `ln` or `ln -s` over system paths.

## Hard links (`ln`, `ls -li`)

### Easy

1. [ ] Create a small text file, then use `ln` (no `-s`) to give it a second name in the same directory.
2. [ ] Use `ls` with the inode column. Confirm both names share the same inode number.

### Medium

3. [ ] Change the file through the **second** name (`echo` or an editor). Open the **first** name. Same content? Why, given the inode numbers?
4. [ ] Someone ran `ln -s original.txt another-name.txt` when they wanted a hard link. Look at `ls -li`. How can you tell this is **not** a hard link? Recreate it the hard-link way.

### Hard

5. [ ] Make two hard links to the same file. Delete **one** name (`rm` from later basic-shell notes — or just `rm` the extra name). Does the other name still show the data? Check inodes before and after.
6. [ ] Using `ls -li` in that directory, pick out which names are hard links to each other vs ordinary unique files. Write the inode numbers you used as evidence.

## Symbolic links (`ln -s`)

### Easy

1. [ ] Create a file and a symlink to it with `ln -s`. Use a relative or absolute target — you choose — but know which you used.
2. [ ] List with `ls -li` (or `ls -l`). How does the symlink line differ from a hard link?

### Medium

3. [ ] Point a symlink at a path that **does not exist**. List it. What tells you the link is dangling?
4. [ ] Someone ran `ln original.txt /tmp/another` and `ln -s original.txt /tmp/another2`. Compare inode numbers of original vs both results. Which pair shares an inode?

### Hard

5. [ ] Symlink to a file, then rename or move the **target**. Try to read through the symlink. Fix the link (remove and recreate, or point it at the new path) so it works again.
6. [ ] Combine with the filesystem topic: `ls -li` a symlink whose target is a directory. Use `cd` if you already know it, or just `ls` through the link. Confirm you are looking at the **target** tree, not a second copy of the files.
