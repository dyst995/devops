# Assignments — Permission model

Close `commands.md`. Type and run in a **throwaway directory** you own. `chmod`/`chown`/`chattr` on system files can break the VM — do not `chown` `/` or `chmod 777` `/etc`. Sticky/SUID/SGID: practice dirs/files you created. `chattr +i` on a practice file only; remember `-i` before delete.

## Ownership (`ls -l`, `chown`, `chgrp`)

### Easy

1. [ ] `touch` a file, `ls -l` it. Read type, rwx triples, owner, group.
2. [ ] Lab: `sudo chown` the file to a practice user, `ls -l`. Then `chgrp` to a practice group (or `chown user:group`).

### Medium

3. [ ] `chown -R` / `chgrp -R` on a small tree you created. `ls -l` a nested file.
4. [ ] Someone ran `chown user:group` without sudo on a file they do not own. Read the error. `ls -l` — unchanged?

### Hard

5. [ ] As your user, `chown` a file you own to **yourself** (no-op or works). Try `chown` to **root** without sudo — should fail. `ls -l`.
6. [ ] Combine: create practice user (users topic), `touch` as you, `sudo chown` to them, `ls -l`, `sudo chown` back, `rm`.

## `chmod` (symbolic and octal)

### Easy

1. [ ] `chmod 755` on a practice file. `ls -l` — `rwxr-xr-x`?
2. [ ] `chmod g=rw` on another file (clears group `x`). `ls -l`. Then `chmod +x` on a script and run `./script`.

### Medium

3. [ ] `chmod o-r,g+w` on a file. `ls -l` before and after. Can `others` still read?
4. [ ] Someone ran `chmod 777` on a directory “to make it work.” On a **practice** dir, set `755` or `750` instead and `ls -l`. Why is world-writable a bad default?

### Hard

5. [ ] Script: `chmod` without `+x`, `./` fails. Add execute, run. Then `chmod 644` and try again. Combine `head` the script.
6. [ ] Broken: `chmod 755` vs `chmod 0755` — try both on a file, `ls -l`. Then set a file to `g=rw` after `755` and see group `x` disappear (course).

## Special bits (sticky, SUID, SGID)

### Easy

1. [ ] `ls -ld /tmp` — sticky `t` on world-writable tmp? Course: `1777`.
2. [ ] On a **practice** directory: `chmod +t` or `chmod 1700`. `ls -ld`. Then `chmod -t` / `chmod 0700` to clear.

### Medium

3. [ ] `chmod 4555` on a **practice file** (SUID bit). `ls -l` — `s` in the user execute column? `chmod 0755` to clear when done.
4. [ ] `chmod 2555` on a **practice directory** (SGID). `ls -ld`. New file in that dir: `touch` and `ls -l` — group inherit if the FS behaves. Reset mode when done.

### Hard

5. [ ] Two users on the lab (you + practice): sticky practice dir `1777` or `+t`. Each creates a file. Can the other `rm` your file? Reset the dir.
6. [ ] Do **not** SUID a shell. Combine `ls -l` `/tmp` and a practice dir. Write: sticky vs SUID vs SGID in one line each.

## ext attributes (`lsattr`, `chattr`)

### Easy

1. [ ] `lsattr` in a practice dir (or `lsattr file`).
2. [ ] `chattr +A` on a practice file (no atime update). `lsattr` it. `chattr -A` when done.

### Medium

3. [ ] `chattr +i` on a practice file. Try `echo >>` or `rm` — should fail. `chattr -i`, then `rm`.
4. [ ] `chattr +a` (append-only) on a practice file. `echo >>` works? `rm` fails? `chattr -a` then delete.

### Hard

5. [ ] `lsattr -R` on a small tree; `lsattr -d` on a directory (dir itself). Combine `ls -l`.
6. [ ] Someone left `+i` on a file they cannot edit. `lsattr`, `chattr -i` **only** that practice file. Do not `-i` on `/etc` files. Optional `+s` on a throwaway file if you want to see the flag — still `chattr -s` before you leave.
