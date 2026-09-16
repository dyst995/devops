# Permission model — Questions

Cover the Answers section. Answer first, then check.

1. Access is granted based on which two identities? Which command shows them with the mode?
2. In `ls -l`, what are the three permission triplets? What do `r`, `w`, `x` mean on a **file** vs a **directory**?
3. Command to make `user` the owner of `/home/myfolder`. Command to make `mytestgroup` the group of `test.t`.
4. Octal values of `r`, `w`, `x`. Convert `rwxr-x---` to octal (show the three sums).
5. What are `755` and `644` in `ls -l` letters?
6. What do these do: `chmod g=rw test.t`, `chmod 755 test.t`, `chmod o-r,g+w test.t`?
7. What is the sticky bit for? Why can tom not delete `/tmp/bob` when `/tmp` is `777` with sticky set? What if sticky is **not** set?
8. Commands to set sticky with `+t` and with octal `1700`. How do you clear it?
9. What does SUID do? Where does `ls` show `s`? Octal to set SUID with `4555`?
10. What does SGID do on a command? On a **directory**? Octal `2555`?
11. Special-bit leading digits: 4, 2, 1. What is `1777` typically used for?
12. Does Linux honor SUID on a **script** the same as on a binary?
13. `lsattr` vs `chattr`. What do `-R` and `-d` do on `lsattr`?
14. What do attributes `i`, `A`, `a`, `s` mean? How do you freeze `/sbin/lilo.conf` and then edit it?
15. `chmod` vs `chown` vs `chgrp` vs `chattr` — one sentence each.

---

## Answers

1. Owner UID and group GID. `ls -l`
2. User, group, other. File: read / modify / execute. Directory: list names / create-delete names / enter (search path).
3. `chown user /home/myfolder` · `chgrp mytestgroup test.t`
4. 4, 2, 1. `rwx`=7, `r-x`=5, `---`=0 → **750**.
5. `rwxr-xr-x` · `rw-r--r--`
6. Group exactly rw · set `rwxr-xr-x` · remove other’s read, add group write.
7. Shared dirs (`/tmp`, `/var/tmp`): users can create files but not delete **others’** files. Delete is controlled by **directory** write; sticky restricts that to the file owner. Without sticky, tom can delete bob’s file.
8. `chmod +t somedirectory` · `chmod 1700 somedirectory` · `chmod -t` or `chmod 0700` (no leading 1).
9. Effective UID becomes the **file owner** while the program runs. `s` in the **owner** execute slot. `chmod 4555 path`
10. Runs with the file’s **group** as effective GID. On a folder, new files inherit that group. `chmod 2555 path_to_folder`
11. SUID · SGID · sticky. Sticky + `777` on `/tmp`.
12. No — SUID on scripts is typically ignored; it is for binaries (e.g. `passwd`).
13. List attributes vs change them. Recursive · list a directory itself, not its contents.
14. Immutable · no atime update · append-only · secure wipe on delete. `chattr +i /sbin/lilo.conf` then `chattr -i` before editing.
15. Mode bits · user owner · group owner · ext attributes (`i`/`a`/…).
