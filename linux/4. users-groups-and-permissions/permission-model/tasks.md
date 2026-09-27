# Tasks — Permission model

Close `theory.md`. Work in `/tmp/perm-tasks`. No SUID on system binaries — only copies you create under `/tmp`.

## Warm-up (`ls -l`)

1. Decode a long listing: type character, three rwx triplets, owner, group. Name the type letters from the notes (`-`, `d`, `l`, …).
2. File vs directory: meaning of `r`, `w`, `x` for each. Write both columns from memory.
3. Directory: `r` without `x` — can you `ls` vs `cd`? Predict, then try on a dir you own under `/tmp/perm-tasks`.
4. Directory: `x` without `r` — can you `cd` into a known name vs list names? Predict, then try.

## chown / chgrp

5. Change user owner; group owner; both at once (`chown user:group`). Confirm with `ls -l`.
6. Recursive `chown -R` and `chgrp -R` on a small tree you create. Who may give a file to another user on typical Linux?

## chmod (symbolic and octal)

7. Set group **exactly** to rw (clear group x): `chmod g=rw`. Set `755`. Take read from other and add write to group (`o-r,g+w`). Add execute the “sensible” way (`+x`).
8. Convert `rwxr-x---` to octal from the 4/2/1 table (show the three sums). Convert `755` and `644` back to letters.
9. Recite common modes from the notes: `755`, `644`, `700`, `777` — when would you avoid `777`?

## Special bits (do on copies)

10. Sticky on a shared directory — symbolic (`+t`) **and** leading `1` in numeric (`1700` / `1777` on a throwaway dir). Two users (or two throwaways): create files; try to delete each other’s. Remove sticky (`-t` / `0700`).
11. Without sticky, with directory write for both: can the other user delete your file? Predict from the notes, then prove on a throwaway dir.
12. SUID on a **copy** under `/tmp` (`chmod 4555`). Where does `ls -l` show `s`? Note: Linux typically ignores SUID on **scripts** — say why the notes still mention `passwd`.
13. SGID on a directory (`chmod 2555` or `2755`): create a new file inside; which **group** does it inherit? Set back to `0755` / `0700`.
14. Typical `/tmp` mode from the notes — write the octal; do **not** chmod the real `/tmp`. Special-bit leading digits: **4** / **2** / **1** — name each.

## Attributes (`lsattr` / `chattr`)

15. List ext attributes in your work dir. Recursive (`-R`). Directory itself, not contents (`-d`).
16. Immutable (`+i`): set on a throwaway file, try to edit/delete, unset (`-i`), then edit.
17. Append-only (`+a`): set, try `>>` vs truncate/overwrite. Clear when done.
18. From the notes only (no need to leave them set): what do `+A` and `+s` mean? Clear any extras you set.

## Recall (write, then check)

19. Memory hook: who = owner / group / world; directory `x` = “may walk into.” Restate sticky in one sentence (“your trash only”).
20. `chmod` vs `chown` vs `chgrp` vs `chattr` — one sentence each.
21. Does directory write let you delete a file you do not own when sticky is off? When sticky is on?

## Scenario

22. `/srv/dropbox` (or `/tmp/perm-tasks/dropbox`) for two throwaway users: both write; cannot delete the other’s files; can delete their own. Prove all three behaviors (sticky + shared group/mode as needed).
23. Root cannot edit a policy file after you (or lab setup) lock it with immutable. Unlock, change, optionally re-lock. Work on a **copy** under `/tmp` unless a lab provides the path.
