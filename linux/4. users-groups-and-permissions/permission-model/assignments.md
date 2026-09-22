# Assignments — permission model

Close `commands.md`. Recite, then type. Work in a throwaway directory (e.g. `/tmp/perm-assign`). **Do not `chmod` / `chown` / `chattr` real system files** (`/tmp`, `/sbin/lilo.conf`, `/etc/*`). Use copies.

## `ls`

1. [ ] Long-list a file you own. Recite the columns: type, rwx for user/group/other, owner, group, size, name.
2. [ ] Decode the type character: `-` file, `d` directory, `l` symlink. Find one of each if you can (symlink can be one you create).
3. [ ] Recite file meaning of `r`, `w`, `x` vs directory meaning (`ls` / modify entries / `cd`).
4. [ ] Predict: directory `r` without `x` — can you list names vs enter? Then try on a dir you own (mode experiment, then restore).
5. [ ] From a long listing, name the **user owner** and **group owner**. Recite: kernel cares about UID/GID, display shows names.
6. [ ] Predict: `ls` without `-l` hides mode and owners. Prove by listing the same path both ways.
7. [ ] Combine: after a `chmod`, long-list again. Prove the rwx triplets changed.
8. [ ] Combine: after `chown`/`chgrp`, long-list again. Prove owner/group columns changed.
9. [ ] Recite the three identity buckets: user (owner), group, other.
10. [ ] Convert a listing `rwxr-xr-x` to octal in your head (755). Check against a file you set.
11. [ ] Convert `rwxr-x---` to octal (750) using 4-2-1. Write the arithmetic.
12. [ ] Wrong-usage: long-list a missing path. Predict the error.
13. [ ] Privilege: long-list `/etc/shadow` as a normal user. Predict permission denied on the **file**; the listing of the parent dir may still show the name.
14. [ ] Recite sticky `t` and SUID/SGID letters if you see them (`s`, `S`, `t`, `T`) — you will set them under `chmod`.
15. [ ] List a directory vs a file: first character `d` vs `-`. Recite why directory `w` is dangerous without sticky in a shared dir.
16. [ ] Predict: long-list does **not** show ext attributes (`i`, `a`). Those need `lsattr`.
17. [ ] Combine with a symlink: long-list the link itself vs the target. Recite type `l`.
18. [ ] Recite the cheat-sheet comment: type, rwx triplets, owner, group, size, name.
19. [ ] After recursive `chmod -R` on your throwaway tree, long-list several files. Prove they all changed.
20. [ ] Restore throwaway modes when done. Never “practice” long-list by chmod’ing `/`.

## `chown`

1. [ ] Set the **user** owner of a throwaway path. Prove with a long listing.
2. [ ] Set **user and group** together (colon syntax). Recite the order: user, then group.
3. [ ] Recursively change user owner on a small tree you created. Prove a nested file flipped.
4. [ ] Predict: only **root** can give a file to another user on typical Linux. Try as a normal user; expect failure.
5. [ ] Privilege: as root (or sudo), chown a throwaway file to a throwaway account, then back to you.
6. [ ] Wrong-usage: user that does not exist. Predict the error.
7. [ ] Recite: `chown` = user owner (and optionally group). `chgrp` = group only.
8. [ ] Combine: chown user:group, then long-list. Both columns must match what you asked.
9. [ ] Predict: recursive on a **file** (not a dir) — harmless extra flag or error? Try on a throwaway file.
10. [ ] Recite that renaming a user (`usermod -l`) does **not** change this number; ownership is UID. (Concept; you need not run usermod here.)
11. [ ] After chown to another user, try to write the file as yourself (if other-write is off). Predict EACCES.
12. [ ] Wrong-usage: swap order (`group:user`) with a group name that is not a user. Predict failure or a surprising mapping.
13. [ ] Combine with `chgrp`: set owner with chown, group with chgrp, prove same as `user:group` in one chown.
14. [ ] Recite the cheat-sheet three forms: user only; user:group; recursive user.
15. [ ] Predict missing operand (no path). What happens?
16. [ ] Do **not** chown `/home` or another user’s real home. Throwaway paths only.
17. [ ] If you use `user:` with an empty group side, recite what your distro does (often primary group of that user). Prove on a throwaway if you try it.
18. [ ] Recursive chown on a tree with a symlink: predict whether the target is followed (distro/flag dependent). Prefer no surprises: operate on real files in the throwaway dir.
19. [ ] Restore owner to you (or delete the throwaway tree).
20. [ ] Interview: “Does chown change rwx bits?” Answer no — that is chmod.

## `chgrp`

1. [ ] Set the **group** owner of a throwaway file. Prove with a long listing.
2. [ ] Recursively set group on a small tree. Prove a nested file flipped.
3. [ ] Recite: this does not change the **user** owner column.
4. [ ] Privilege: as a normal user, chgrp to a group you **belong to**. Predict success. Then to a group you do **not** belong to — predict failure unless root.
5. [ ] Root: chgrp a throwaway file to any group, then restore.
6. [ ] Wrong-usage: group that does not exist. Predict the error.
7. [ ] Combine: create a throwaway group (if you may), chgrp a file to it, long-list, then delete the group only after you chgrp the file back (or the lab allows leftover GIDs).
8. [ ] Recite the two cheat-sheet forms: one file; recursive on a path.
9. [ ] Predict missing path. What happens?
10. [ ] After chgrp, chmod `g=rw` and prove a second user in that group can write (if you have a second throwaway user).
11. [ ] Recite primary GID vs this file’s group: creating a new file usually takes your primary group unless the directory is SGID (later under chmod).
12. [ ] Wrong-usage: `chgrp user file` with a **username** that is not a group. Predict failure (unless a group of that name exists).
13. [ ] Combine with long-list: only the group column changes.
14. [ ] Do **not** chgrp system files (`/etc/passwd`, `/bin/ls`).
15. [ ] Recursive vs not: change a directory’s group without `-R`, long-list a file inside. Predict the file’s group unchanged.
16. [ ] Then recursive; prove the file inside matches.
17. [ ] Recite `chown :group` as an alternative some people use — still know `chgrp` from the sheet.
18. [ ] Predict: chgrp does not set sticky/SUID. Those are chmod.
19. [ ] Restore groups on throwaway files.
20. [ ] Cleanup: delete throwaway group only if you created it and nothing real uses it.

## `chmod`

**Warn:** never chmod `/tmp`, `/`, `/etc`, or system binaries. Typical `/tmp` mode is a **fact to recite** (`1777`), not a command to run on the real directory. SUID only on **copies** in your throwaway dir, never on `/usr/bin` copies you keep.

1. [ ] Set group **exactly** to read+write (clears group execute). Prove with a long listing (`rw` in the group triplet, no `x`).
2. [ ] Set mode `755`. Recite letters: `rwxr-xr-x` and 7=rwx, 5=r-x, 5=r-x.
3. [ ] Take **read** from other and **add write** to group in one symbolic go (comma). Prove both triplets.
4. [ ] Add execute the “sensible” way (`+x` without `u/g/o`) on a script. Recite it adds `x` for who already makes sense (umask/policy); prove the file is executable for you.
5. [ ] Recite symbolic letters: `u` `g` `o` `a`; operators `+` `-` `=`.
6. [ ] Recite octal 4-2-1 and convert `644` / `700` / `777` to letters.
7. [ ] Sticky bit **on** a throwaway **directory** (symbolic `+t`). Recite: in a shared dir, you only delete **your** files.
8. [ ] Sticky via numeric **leading 1** plus `700` on a throwaway directory. Prove `t` shows in the listing.
9. [ ] Remove sticky (`-t`) from a throwaway file/dir you set. Prove `t` is gone.
10. [ ] Set `0700` (leading 0 = no SUID/SGID/sticky). Recite why people write four octal digits.
11. [ ] SUID: leading **4** (`4555`) on a **throwaway copy of a file** — run as file **owner**. Recite it is for binaries; do **not** SUID a system binary.
12. [ ] SGID: leading **2** (`2555`) on a **throwaway directory**. Recite: new files inherit the directory’s group. Create a file inside and prove the group.
13. [ ] Recite typical `/tmp` mode: sticky + world rwx (`1777`). **Do not chmod the real `/tmp`.** Write the number from memory only.
14. [ ] Predict: without sticky, write on the directory is enough to unlink someone else’s file. (If you have two throwaway users, prove on a **private** shared dir you created, not `/tmp`.)
15. [ ] Wrong-usage: `chmod 999`. Predict illegal mode.
16. [ ] Privilege: chmod another user’s throwaway file as yourself — predict EPERM; as root it works. Do not chmod their real home.
17. [ ] Combine: `g=rw`, then `755`, then `o-r,g+w`, then `+x` on a script — long-list after each.
18. [ ] Recite `s` vs `S` and `t` vs `T` in the listing (execute bit on or off while special bit is set).
19. [ ] Predict missing operand. What happens?
20. [ ] Restore throwaway tree to `755`/`644` and delete it. If you accidentally touched a system path, stop and revert.

## `lsattr`

1. [ ] List ext attributes in the **current** directory (no path). Recite you are looking for letters like `i` `a` `A` `s`, not rwx.
2. [ ] List attributes of a **specific** file or directory path.
3. [ ] Recursive list on your throwaway tree (`-R`). Prove nested files appear.
4. [ ] List the **directory itself**, not its contents (`-d`). Compare with listing without `-d`.
5. [ ] Recite: this is **not** `ls -l`. Mode bits and ext attributes are different layers.
6. [ ] After `chattr +i` on a throwaway file, list attributes and find `i`.
7. [ ] After `chattr -i`, list again and prove `i` is gone.
8. [ ] Wrong-usage: `lsattr` on a filesystem that does not support these attributes (some network FS). Recite it may error or show `---------`.
9. [ ] Privilege: list attributes of `/etc/passwd` as a normal user if permitted; do **not** then chattr it.
10. [ ] Predict missing vs extra flags: `-R` without a path uses cwd recursively — can be huge. Stay in the throwaway dir.
11. [ ] Combine: `-d` on a dir, then without `-d`. Recite which shows the dir’s own flags.
12. [ ] Recite the four cheat-sheet forms: cwd, path, recursive, directory-itself.
13. [ ] Compare two files, one with `+A` (no atime update). Find `A` in the listing.
14. [ ] Find `a` after append-only. Recite dirs: add files, no rename/delete (if the FS honors it).
15. [ ] Predict: `lsattr` does not **set** flags. That is `chattr`.
16. [ ] Wrong-usage: `-d` on a regular file — still prints that file’s attributes (or equivalent). Note what your distro does.
17. [ ] Recite that output dashes mean “attribute off.”
18. [ ] Combine with `ls -l`: same path, two listings, two vocabularies.
19. [ ] Do not run recursive `lsattr` from `/`.
20. [ ] Stay in the throwaway directory for the rest of the attribute drills.

## `chattr`

**Warn:** the cheat sheet uses `/sbin/lilo.conf` as an example. **Do not lock real boot/loader or `/sbin` files.** Copy a throwaway file and practice on the copy. Unlock (`-i`) before you delete.

1. [ ] Set **immutable** on a throwaway file. Recite: no edit/delete until unlocked. Prove `echo >>` and `rm` fail even as the owner.
2. [ ] Unlock immutable, then edit. Prove write works. Recite: unlock **before** you edit.
3. [ ] As **root**, prove immutable blocks even root until `-i` (typical ext4). Then unlock.
4. [ ] Set **do not update atime** (`+A`). Recite the letter and the meaning. Clear it when done (`-A`).
5. [ ] Set **append-only** (`+a`). Prove `>>` works and truncating/overwriting fails. Recite dirs: add files, no rename/delete (if honored).
6. [ ] Clear append-only (`-a`). Prove a normal overwrite works again.
7. [ ] Set **secure delete** (`+s`) on a throwaway file. Recite: on delete, zero the blocks **if the filesystem honors it**. Do not assume it is a real secure-erase guarantee.
8. [ ] Combine: `lsattr` after each of `+i`, `-i`, `+A`, `+a`, `+s`. Match letters to flags.
9. [ ] Privilege: as a normal user, `+i` on your own file — often works on ext4; if not, recite you needed capabilities/root.
10. [ ] Wrong-usage: `+i` on a file you then cannot `rm`. Recite the recovery: `-i` first. Do this on throwaway only.
11. [ ] Recite the cheat-sheet flags: `+i` `-i` `+A` `+a` `+s`.
12. [ ] Predict: `chattr` on `/` or `/etc/passwd` is an outage. You will not run that.
13. [ ] Combine with chmod: immutable file still has rwx in `ls -l`, but writes fail. Recite DAC vs this extra flag.
14. [ ] After `+a` on a **directory** (throwaway), try to create a file vs rename/delete. Record what the FS allows.
15. [ ] Clear all extra flags you set (`-iasA` as appropriate). Prove `lsattr` is dashes.
16. [ ] Recite why the notes mention lilo.conf: a **policy file** you must unlock before editing. Practice the story on a copy named `policy.copy`.
17. [ ] Predict missing operand. What happens?
18. [ ] Wrong-usage: `chattr i file` without `+`/`-`. Predict the error.
19. [ ] Do **not** `+s` on a disk device or a real home directory tree.
20. [ ] Cleanup: attributes off, then delete the throwaway tree. If `rm` refuses, you forgot `-i`/`-a`.
