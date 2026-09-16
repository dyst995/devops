# Users and Groups — Questions

Cover the Answers section. Answer first, then check.

1. List the user parameters from the notes (eight). Which file holds most of them? Where does the password **hash** usually live if you see `x`?
2. Decode `root:x:0:1:Super-User:/:/sbin/sh` field by field.
3. Why is the password field `x` instead of a hash in `/etc/passwd`?
4. What does the kernel actually use as “who is this” — user name or UID? What is UID 0?
5. Primary GID vs extra groups: where is each stored?
6. What is the GECOS / full-name field used for? Does login require it?
7. What is the home directory for? What happens on `userdel -r`?
8. What does the shell field control? How do you forbid login for a daemon account?
9. Where is account **expiration** stored? How do you view it?
10. List the four group parameters. Which file? Where would a group password hash live?
11. Decode `bin::2:root,bin,daemon` field by field.
12. `staff::10:` has an empty member list. Can anyone still be in group `staff`? How?
13. Write a `/etc/group` line and name each field. Is the member list the primary group?
14. How do you add `nika` to extra group `docker` without dropping her other extra groups?
15. `su` vs `sudo`: whose password, and what does `su - user` add vs `su user`?
16. What does `sudo su` give you, compared with plain `su`?
17. Write `useradd` for `user1` with home `/home/mydir` and shell `/bin/bash`.
18. `userdel user` vs `userdel -r tester`. Command to change a user’s home to `/home/newhome`.
19. What does `passwd` do? Who can reset another user’s password without the old one?
20. What does `finger user` show in the notes?
21. Command to create group `mytestgroup`. Commands to delete / modify a group. Command to see a user’s groups.
22. `nobody` in the sample `passwd` has UID 60001. Is that a normal login account? Why do system users exist?
23. You need one `ifconfig` as root and you have sudo rights. `su` or `sudo`? Why?

---

## Answers

1. Name, encrypted password (or `x`), UID, GID, full name/description, home, shell, expiration. `/etc/passwd`. Hash in `/etc/shadow` when the field is `x`. Expiry/aging also in shadow.
2. `root` · `x` (hash in shadow) · UID 0 · primary GID 1 · comment Super-User · home `/` · shell `/sbin/sh`.
3. So hashes are not world-readable. `/etc/passwd` is readable by all; `/etc/shadow` is root-only.
4. UID. UID 0 is root.
5. Primary = GID field in `/etc/passwd`. Extra = member lists in `/etc/group`.
6. Human description (`finger`, mail). No — login does not need it.
7. User files, dotfiles, `$HOME` at login. `-r` deletes that directory and its files.
8. Interactive **login** program. Set it to `/usr/sbin/nologin` or `/bin/false`.
9. `/etc/shadow`. `chage -l user` (set with `usermod -e`).
10. Group name, encrypted password (or `x`/empty), GID, list of member usernames. `/etc/group`. Hash in `/etc/gshadow` if used.
11. `bin` · empty password · GID 2 · supplementary members `root`, `bin`, `daemon`.
12. Yes — anyone whose **primary** GID in `/etc/passwd` is `10`. They do not have to be listed on the group line.
13. `name:password:GID:user1,user2`. That list is **supplementary** members. Primary group is the GID in `passwd`.
14. `usermod -aG docker nika` (`-a` appends; `-G` alone would replace extra groups).
15. `su` = password of the **target** user. `sudo` = password of the **current** user (typically). `su -` = login shell (home + env); without `-` you keep more of your environment.
16. A root shell **without** the root password, if sudoers allows it. Plain `su` (to root) asks for **root’s** password.
17. `useradd -d /home/mydir -s /bin/bash user1`
18. Delete the account, leave home. `-r` also deletes home and files. `usermod -d /home/newhome user`
19. Change a user’s password. Root (`passwd username`).
20. Login name, directory (home), shell.
21. `groupadd mytestgroup` · `groupdel` · `groupmod` · `groups` or `groups username`
22. No — a placeholder/system account (“Nobody”). Daemons and packages use UIDs that should not log in interactively.
23. `sudo ifconfig` — one command, your password, no full root shell.
