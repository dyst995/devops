# Labs — Users and groups

**Where:** Rocky VM or WSL. Use fake names (`labuser1`, `labgroup1`). Do not delete your own account.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Read `/etc/passwd`, `/etc/group`, and `/etc/shadow` (sudo for shadow). For your own account, run `id`, `id -u`, `id -g`, `id -G`, `groups`, `chage -l`.

## Lab 2

Create `labuser1` with a home directory and `/bin/bash`. Set a password. Inspect its passwd/shadow/group lines. `su - labuser1`, then `exit`. Run one command with `sudo`. Compare `su -` with `su` without `-` (home and env).

## Lab 3

Create group `labgroup1`. Add `labuser1` to it without dropping other extra groups. Rename the group. Rename the user login. Change the user’s home path (create the new directory). Set an account expiry date. Show `finger` if installed.

## Lab 4

Create `labuser2`, then `userdel` without `-r` and see whether home remains. Create `labuser3`, `userdel -r`, confirm home is gone. `groupdel` leftover lab groups.

Do not use `-G` without `-a` unless you intend to replace extra groups — try it once on a throwaway user so you see the effect, then fix or delete that user.

## Job and cert labs

## Lab 5 — RHCSA user

Create `examuser` with UID `1500`, home, bash, expiry 30 days out, `chage` so password max days is 90 and they must change password at next login. Add to `wheel`. Confirm with `id`, `chage -l`, `grep examuser /etc/passwd /etc/shadow`. Delete when done.

## Lab 6

Lock the account (`passwd -l` or `usermod -L`), try SSH/password, unlock. Set shell to `nologin` and try `su -`.

## Lab 7

`/etc/sudoers.d/` drop-in: `examuser ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart httpd`. Test, remove.

## Lab 8

Create a group `appgrp`, two users, shared directory owned by that group. This pairs with the permission-model SGID lab for a real “app team directory.”
