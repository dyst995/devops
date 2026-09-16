# Tasks — Permission model

Close `theory.md`. Work in `/tmp/perm-tasks`. No SUID on system binaries.

## Warm-up (`ls -l`)

1. Decode a long listing: type character, three rwx triplets, owner, group. File vs directory meaning of `r`, `w`, `x`.
2. Directory: `r` without `x` — can you `ls` vs `cd`? Predict, then try on a dir you own.

## chown / chgrp

3. Change user owner; group owner; both at once; recursive on a small tree.

## chmod (repeat symbolic and octal)

4. Set group **exactly** to rw (clear group x). Set `755`. Take read from other and add write to group. Add execute the “sensible” way.
5. Convert `rwxr-x---` to octal from the 4/2/1 table. Convert `755` back to letters.

## Special bits (do on copies)

6. Sticky on a shared directory (symbolic **and** leading `1` in numeric). Two users: create files; try to delete each other’s. Remove sticky.
7. SUID on a **copy** of a script in `/tmp` (`4555`). SGID on a directory (`2555`): new file’s group. Set back to `0755` / `0700`.
8. Typical `/tmp` mode from the notes — write it; do not chmod the real `/tmp`.

## Attributes

9. List ext attributes. Recursive. Directory itself, not contents.
10. Immutable: set, try to edit/delete, unset. Append-only: set, try `>>` vs truncate. `+A` and `+s` — what do they mean from the notes? Clear extras.

## Scenario

11. `/srv/dropbox` for two users: both write; cannot delete the other’s files. Prove all three behaviors.
12. Root cannot edit a policy file after you (or setup) lock it. Unlock, change, optionally re-lock.
