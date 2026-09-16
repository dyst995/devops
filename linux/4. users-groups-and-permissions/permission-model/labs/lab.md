# Labs — Permission model

**Where:** any Linux. Work in `/tmp/perm-lab`. Do not `chmod` system binaries. Do not leave SUID on lab copies.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Create a file and a directory. Use `ls -l`. Change owner and group (`chown`, `chown user:group`, `chgrp`). Use `-R` on a small tree you own.

## Lab 2

On a test file, apply `chmod g=rw`, `chmod 755`, `chmod o-r,g+w`, `chmod +x`. After each change, `ls -l`.

## Lab 3

Create a shared directory. Turn on the sticky bit (`chmod +t` and also as a leading `1` in numeric mode). As two lab users (or your user plus a second test user), create files in that directory and try to delete each other’s files.

## Lab 4

On a **copy** of a small script in `/tmp` (not `/usr/bin`): set SUID (`chmod 4555`) and SGID (`chmod 2555`) separately, `ls -l`, then set mode back to `0755`. Set a directory SGID and create a new file in it; see which group the file gets.

## Lab 5

`lsattr` on a file. `chattr +i`, try to edit/delete, then `chattr -i`. Try `+a` (append-only) and write with `>>`. Remove extra attributes when finished.

Delete `/tmp/perm-lab` when finished.

## Job and cert labs

## Lab 6 — ACLs (RHCSA)

On a file, grant a **second** user `r` or `rw` with `setfacl` without putting them in the file’s group. `getfacl`. Remove the ACL (`setfacl -x` or `-b`). Set a **default ACL** on a directory and create a new file in it.

## Lab 7

`umask 027`, create a file and a directory, `ls -l`. Restore your umask.

## Lab 8

Find files with mode `777` under `/tmp`. Ticket: “tighten permissions.” chmod only your lab files.

## Lab 9

Home directory `750` or `700` for a lab user. Try to `ls` that home as another user.
