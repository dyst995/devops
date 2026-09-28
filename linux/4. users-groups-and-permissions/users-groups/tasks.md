# Tasks — Users and groups

Close `theory.md`. Throwaway names only (`tasku1`, `taskg1`, …). Prefer read-only commands first; create/modify users only when you have sudo/root and the notes expect it. Do not delete your own account.

## Warm-up (`passwd` line)

1. Read your line in `/etc/passwd`. Label each colon field from the notes (name through shell).
2. Where is the **hash** and **expiry** if the second field is `x`? Why is the hash not in `passwd`?
3. Decode the sample `root:x:0:1:Super-User:/:/sbin/sh` field by field from memory, then check against the notes.
4. UID 0 is who? Where do human UIDs often start? Pick one low-UID system account from `passwd` and say why it exists.

## Find this (identity and aging)

5. Show your UID, primary GID, and all groups — numeric (`id -u`, `id -g`, `id -G`) and names (`id`, `groups`).
6. Show aging/expiry for your account (`chage -l`). Which file actually stores those fields?
7. As root (or with sudo), peek at your `/etc/shadow` line shape: which field is the hash? What do `*` or `!` mean if you see them on a throwaway later?

## Distinguish (`su` / `sudo`)

8. `su` with login environment (`su - user`) vs without (`su user`). What differs (home, profile, env)? Whose password is asked?
9. One command as root via `sudo` (your password) vs `su` to root. What password is asked each time?
10. `sudo su` vs plain `su` to root — same end shell? What secret do you need for each?

## Construct users (need root)

11. Create a throwaway with explicit home and bash (`useradd -d … -s …`). Set a password (`passwd`). Inspect the new `passwd` / `shadow` / `group` lines.
12. Change home path, login name, shell, and account expiry date on that throwaway (`usermod -d`, `-l`, `-s`, `-e`). After rename: do files’ owner **numbers** (UID) change? Predict, then check.
13. Append an extra group (`usermod -aG`). Predict what happens if you set extra groups **without** `-a`. Try on a throwaway, then fix or delete.
14. Delete one throwaway leaving home (`userdel`); delete another **with** home (`userdel -r`). Prove the home stayed or vanished.
15. Use `finger` on a throwaway (or yourself). Which three items from the notes does it show?

## Groups

16. Read a few `/etc/group` lines. Label name, password field, GID, member list. Find one with an **empty** member list — can anyone still be in that group? How?
17. Create, rename (`groupmod -n`), then delete a throwaway group. Does renaming change the GID? Do files’ group **numbers** change?
18. Add a user as a supplementary member two ways from the notes: `usermod -aG` and `gpasswd -a`. Confirm with `groups` / `id`.
19. Primary GID vs extra groups — which file holds which? After `useradd`, does the new user always appear on their private group’s member list?

## Repeat lock / nologin

20. Lock password login on a throwaway (notes: `*` / `!` in shadow — use `passwd -l` or the lock method you know). Try to authenticate; unlock.
21. Set the shell so interactive login is refused (`nologin` / `false`). Try `su -` that user. Reset or delete when done.

## Recall (write, then check)

22. Empty `/etc/group` member list ≠ unused group — give one concrete example from this machine or the notes.
23. Write the `useradd` line for home `/home/mydir` and shell `/bin/bash` without looking, then compare to `commands.md`.

## Scenario

24. Provision `appuser`: UID **1500**, bash, home, group `appgrp`, 90-day max password age, must change password at next login, in `wheel`. Evidence for each (`id`, `passwd`/`group` lines, `chage -l`). Then remove the account and group cleanly.
