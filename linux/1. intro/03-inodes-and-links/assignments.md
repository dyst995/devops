# Assignments — Inodes and links

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

## `ln`

1. [ ] In a throwaway directory, create `original.txt` and add a second name for the same inode (hard link).
2. [ ] Recite: hard link = extra name, same inode; no extra flag on the command.
3. [ ] Predict: editing the file through either name changes the data seen via the other name. Prove it.
4. [ ] Predict: there is no “original vs copy” at the inode level — two names, one file. Prove both still work if you delete one name.
5. [ ] Privilege: as owner of the throwaway file, prove you do not need root to add a hard link in that directory.
6. [ ] What if the operand is missing: only one filename. Predict usage error.
7. [ ] Wrong usage: hard-link a directory. Predict the kernel refuses (protects the tree from loops).
8. [ ] Wrong usage: target name already exists. Predict the error; do not clobber real files.
9. [ ] Recite: hard links cannot cross filesystems. Predict failure if you try from a throwaway file to a path on another mount (only if you have a second filesystem; otherwise state the rule).
10. [ ] Create a symlink: pointer to a path, using the flag from the cheat sheet. Use a throwaway dest (the sheet’s idea: dest is the new name).
11. [ ] Recite the cheat-sheet symlink idea: dest points at a path (can dangle). Predict what “dangle” means.
12. [ ] Prove a symlink to a missing path still creates, but using it fails (dangling). Throwaway names only.
13. [ ] Predict: delete the symlink — the target file remains. Prove it.
14. [ ] Predict: delete the target file — the symlink remains but is broken. Prove it.
15. [ ] Combine: `ln` without the flag vs with `-s` on two different throwaway pairs; then use `ls -li` to prove same inode vs different inode.
16. [ ] Human vs default: default is hard link; `-s` is the soft/path pointer. Recite which is which before you type.
17. [ ] Combine: symlink to a directory (shortcut). Prove `ls` through the link shows the directory’s contents. Throwaway dirs only.
18. [ ] Wrong usage: swap source and dest in your head — dest is the *new* name. Predict what a reversed pair would do; do not overwrite real paths like `/var/www`.
19. [ ] Privilege: creating `/srv/app` as in the sheet needs a writable parent (often root). Do the same pattern under `/tmp` throwaway instead of touching `/var/www`.
20. [ ] Recite the table: hard = inode, same fs, survives deleting one name; soft = path, can dangle, own inode type “symlink”.

## `ls`

1. [ ] In the throwaway dir with a hard link pair, list with inode numbers in the first column.
2. [ ] Recite: first column = inode number; same number = hard link.
3. [ ] Prove `original.txt` and `another-name.txt` share the first-column number.
4. [ ] Prove a symlink does *not* share the target’s inode (the link has its own inode). Use the long+inode listing.
5. [ ] Predict: two unrelated files you just created have different inode numbers.
6. [ ] Human vs default: default `ls` hides inode numbers. Prove you need the inode flag (and long listing as in the sheet) to see them.
7. [ ] Recite the combined flags from the sheet: long listing *and* inode column — one command, two flags.
8. [ ] What if the operand is missing: no path lists the current throwaway directory. Predict that, not an error.
9. [ ] Wrong usage: pass a name that does not exist. Predict the error.
10. [ ] Privilege: listing your throwaway dir needs no root. Predict permission denied on a directory you cannot search (do not chmod `/`).
11. [ ] Combine: after `ln` (hard), the link count in the long listing increases. Predict which column and prove it.
12. [ ] Combine: after `ln -s`, the first column differs from the target; the name may show the arrow to the path. Note what you see.
13. [ ] Predict: `.` and `..` have inodes too — they are directory names, not extra copies of your file.
14. [ ] Wrong usage: expecting this listing to *create* a link. It only shows. Create with `ln`, prove with this.
15. [ ] Combine: delete one hard-link name, list again — remaining name keeps the same inode; link count dropped.
16. [ ] Recite: same inode number ⇒ same file (hard link), not “looks similar”.
17. [ ] Predict: copying a file with `cp` (if you try in throwaway) gets a **new** inode — contrast with `ln`.
18. [ ] What if you list a dangling symlink — predict the link still appears; following it may error (note whether your flags follow or show the link).
19. [ ] Human vs default: long listing shows mode, links, owner, size, mtime; inode flag adds the number on the left. Name those pieces from a real line.
20. [ ] Privilege: inode numbers are unique per filesystem. Predict two files on different mounts could reuse the same number — that is why hard links cannot cross fs.
