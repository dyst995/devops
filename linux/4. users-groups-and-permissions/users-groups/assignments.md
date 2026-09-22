# Assignments — users and groups

Close `commands.md`. Recite, then type. **Throwaway names only** (`labuser1`, `tester` you created). **`userdel` / `userdel -r` / `groupdel` destroy accounts** — never point them at `nika`, `root`, or a classmate. Prefer a VM snapshot.

## `cat`

1. [ ] Print the user database. Recite colon fields: name, password placeholder, UID, GID, comment, home, shell.
2. [ ] Find **your** line. Label each field from the notes (walk `root:x:0:…` style).
3. [ ] Recite: second field `x` means the **hash** is next door in shadow, not here.
4. [ ] Print the group database. Recite: name, placeholder, GID, member list.
5. [ ] Find a group you belong to. Recite primary GID lives on the **passwd** line; extra members are listed here.
6. [ ] Print the shadow file. Recite: **root only**. If you are not root, predict permission denied — that is the proof.
7. [ ] Privilege: as root, read shadow. Recite it holds hashes and expiry — do not paste hashes into chat or tickets.
8. [ ] Wrong-usage: `cat` `/etc/passwd` vs `/etc/shadow` as a normal user — one works, one should not.
9. [ ] Recite UID 0 is root. Find that line.
10. [ ] Recite where human UIDs often start (1000, or 500 on older Red Hat). Point at a human line vs a daemon line.
11. [ ] Recite expiration is **not** on the passwd line.
12. [ ] Combine: passwd line’s GID vs group file — names vs numbers.
13. [ ] Recite GECOS/comment is free text; `finger` may show it.
14. [ ] Predict: two passwd lines with the same UID are the **same** kernel identity (bad idea).
15. [ ] Wrong-usage: `cat` with no file (stdin). Cancel.
16. [ ] Recite the three cheat-sheet files and one sentence each.
17. [ ] Do not edit these files with a random editor; use `useradd`/`usermod`/`vipw` in real life.
18. [ ] Combine with `id`: your UID/GID numbers must match your passwd line.
19. [ ] If shadow second field is `!` or `*` on a throwaway, recite locked password.
20. [ ] Close the files; do not leave `root`’s hash on screen in a screenshot you share.

## `id`

1. [ ] Print your UID, primary GID, and **all** groups (default output). Recite `uid=` `gid=` `groups=`.
2. [ ] Print **numeric UID only**. Recite the short flag.
3. [ ] Print **primary GID only**. Recite that this is not the extra-groups list.
4. [ ] Print **all GIDs** (numeric). Recite extra groups appear here.
5. [ ] Recite the three flags from the cheat sheet: `-u` `-g` `-G`.
6. [ ] Privilege: `id` another throwaway user (if the account exists). Prove you can read names without being them.
7. [ ] Wrong-usage: `id` a name that does not exist. Predict the error.
8. [ ] Combine: `-G` vs `groups` — numbers vs names (next command).
9. [ ] Recite: primary GID vs supplementary groups — which field in passwd vs group file.
10. [ ] After you append a group to a throwaway user, `id` that user. Prove the extra GID appeared (new login / `id user` not a stale shell).
11. [ ] Predict: your current shell may not show a brand-new group until you re-login. Recite that trap.
12. [ ] Recite UID 0: `id` as root after `sudo`/`su`.
13. [ ] Missing operand: `id` with no name = **you**. Prove it.
14. [ ] Combine with passwd: `-u` equals the third field.
15. [ ] Combine with group: `-g` equals the fourth field of passwd.
16. [ ] Interview: “Show all groups of the current user as numbers.”
17. [ ] Predict `-g` vs `-G`: one number vs many.
18. [ ] Wrong-usage: `-u` and `-g` together — note what your `id` prints (some versions allow both).
19. [ ] Recite the cheat-sheet comments for default, `-u`, `-g`, `-G`.
20. [ ] Do not invent flags from other Unixes (`-n` is fine if you know it; the sheet is the four forms above).

## `groups`

1. [ ] Print **group names** of the current user.
2. [ ] Print groups of a named user (`alice` if she exists, else a throwaway). Recite the operand is the login name.
3. [ ] Recite: this prints **names**, `id -G` prints **numbers**.
4. [ ] Privilege: as yourself, `groups root`. Recite you can usually read this.
5. [ ] Wrong-usage: a user that does not exist. Predict the error.
6. [ ] Combine: `groups` vs `id` default — same membership, different format.
7. [ ] After `gpasswd -a` or `usermod -aG`, `groups` that user. Prove the new name appears.
8. [ ] Recite primary group is usually first; extras follow (implementation may vary — still list them all).
9. [ ] Missing operand = you. Prove it.
10. [ ] Recite the two cheat-sheet forms: current user; named user.
11. [ ] Predict: `groups` does not change membership.
12. [ ] Combine with `/etc/group`: find your extra groups’ member lists.
13. [ ] Interview: “What groups is alice in?”
14. [ ] Wrong-usage: `groups -G` (that flag is on `id`). Predict.
15. [ ] If you just added a group to **yourself**, open a new login and `groups` again. Recite stale-shell trap.
16. [ ] Recite `wheel`/`sudo`/`docker` as typical extra groups — only add throwaway users to them in labs.
17. [ ] Compare `groups` of two throwaway users you created.
18. [ ] Do not parse `id` output by eye when you need names — this command is the name list.
19. [ ] Recite cheat-sheet comments.
20. [ ] Leave membership as the lab requires after later usermod drills.

## `chage`

1. [ ] List **password aging / account expiry** for a throwaway user (or yourself if allowed). Recite last change, min/max, warn, inactive, expire.
2. [ ] Recite: this reads **shadow**, not passwd.
3. [ ] Privilege: as a normal user, `chage -l` on **another** account. Predict denied. As root, it works.
4. [ ] As yourself, `chage -l` on your own account — some distros allow it. Record what happens.
5. [ ] Wrong-usage: omit `-l` as a non-root user (interactive change). Predict denied; do not lock yourself.
6. [ ] Recite `-l` from the cheat sheet: **list**, not “lock.”
7. [ ] Combine: `usermod -e` a throwaway date, then list aging. Prove the expire line moved.
8. [ ] Recite account expiry vs password max age — both appear here; different meanings.
9. [ ] Missing user name: what happens? Predict usage or it lists you.
10. [ ] Do not set min age so high you lock the lab account. Throwaway only if you change values.
11. [ ] Interview: “Where do you see expiry in human form?”
12. [ ] Recite dates in shadow are days since 1970; this tool shows readable dates.
13. [ ] Wrong-usage: `chage -l` `/etc/shadow`. Recite it wants a **username**.
14. [ ] Combine with `cat` shadow (root): map one field conceptually without decoding hashes.
15. [ ] Recite you use `passwd` to change the secret; this tool shows **when** it ages.
16. [ ] If you change aging on a throwaway, set it back or delete the user later.
17. [ ] Predict locked `!` hash vs expired date — both can refuse login, different lines.
18. [ ] Recite the cheat-sheet comment: password aging / account expiry.
19. [ ] Do not `chage` `root` on a shared VM.
20. [ ] Prove listing is read-only when you only used `-l`.

## `su`

1. [ ] Switch user with a **login** environment (`-` and a throwaway user). Recite: home + profile; needs **their** password (unless you are root).
2. [ ] Prove `$HOME` and `pwd` are that user’s home after login-style switch. `exit` back.
3. [ ] Switch user **without** `-`. Recite: keep more of **your** environment. Compare `pwd`/`HOME` with the login-style switch.
4. [ ] Switch to root with no username (asks for **root** password). If you do not know it, recite the prediction and skip.
5. [ ] Switch to root by naming `root`. Recite this is the same destination as bare `su` on typical Linux.
6. [ ] Recite the four cheat-sheet forms: `su - user`, `su user`, `su`, `su root`.
7. [ ] Privilege: as a normal user, `su` to a throwaway — you need that user’s password. As root, you may not.
8. [ ] Wrong-usage: `su -` to a user whose shell is `nologin`. Predict refusal.
9. [ ] Recite: `su` password is the **target** account’s (root’s when going to root), unlike sudo’s **your** password.
10. [ ] Combine: `id` before and after. UID must change.
11. [ ] Predict: `su user` from a directory the target cannot `cd` to — may warn; login `-` cds home.
12. [ ] Missing user: bare `su` = root. Recite that; do not guess it means “yourself.”
13. [ ] After a failed password, predict you are still you (`id`).
14. [ ] Recite login vs non-login: which reads profile files (concept from bash startup).
15. [ ] Do not leave a root shell; `exit`.
16. [ ] Combine with `sudo su` in the next section: two ways to a root shell, different passwords.
17. [ ] Interview: “Why `su -` for admin work?”
18. [ ] Wrong-usage: `su -l` vs `-` — if you try `-l`, note it is the long form of login-switch on many su implementations; the sheet uses `-`.
19. [ ] Recite you need an account that **exists** (`useradd` first if needed).
20. [ ] Restore: you are your original user. `id` to prove.

## `sudo`

1. [ ] Run **one** command as root (the sheet uses `ifconfig`; `id` or `true` is a safer proof). Recite it asks for **YOUR** password.
2. [ ] Recite: you do not need root’s password if sudoers allows you.
3. [ ] Open a **root shell** the cheat-sheet way (`sudo su`) **if sudoers allows**. Recite: root shell without knowing root’s password. `exit` immediately after `id`.
4. [ ] Predict without sudoers: “not in the sudoers file.” Do not spam failed passwords (lockout).
5. [ ] Recite one-shot vs root shell: when is one `ifconfig` (or `id`) enough?
6. [ ] Combine: `sudo id` vs `su` to root — which password?
7. [ ] Privilege: a throwaway user **not** in sudoers tries this. Predict failure.
8. [ ] Wrong-usage: `sudo` with no command. Note usage vs shell depending on distro.
9. [ ] Recite the two cheat-sheet lines: one command; root shell.
10. [ ] After success, a second sudo may not ask again (timestamp). Recite that; `sudo -k` if you want to forget.
11. [ ] Recite: mutating `useradd`/`userdel` will need this (or a root shell).
12. [ ] Do not `sudo su` and then `userdel` real users.
13. [ ] Interview: “Why sudo instead of sharing the root password?”
14. [ ] Combine with `visudo` knowledge: you will not edit sudoers in this drill.
15. [ ] Predict `sudo -u throwaway id` — run as another user if policy allows.
16. [ ] Recite Ubuntu first user often has sudo; Rocky often needs `wheel`.
17. [ ] Failed password: non-zero exit, no root command run.
18. [ ] Recite `ifconfig` on the sheet may be `/sbin/ifconfig` (not on PATH). If command-not-found, use `ip addr` only as proof of sudo, or skip the binary name and still practice sudo.
19. [ ] Leave no root shell open.
20. [ ] Recite cheat-sheet comments for both forms.

## `useradd`

1. [ ] Create a throwaway user with an explicit **home** path and **shell** `/bin/bash`. Recite the two flags (`-d`, `-s`) and the login name last.
2. [ ] Prove: passwd line has that home and shell; home directory exists (or you needed `-m` on some distros — if home is missing, recite the difference and create the dir only if the lab allows).
3. [ ] Recite: you did **not** set the password yet; that is `passwd`.
4. [ ] Privilege: without root, predict failure. Use sudo/root.
5. [ ] Wrong-usage: a name that already exists. Predict the error.
6. [ ] Wrong-usage: invalid characters in the name. Predict reject.
7. [ ] Recite UID assigned (from `id` or passwd). Human range?
8. [ ] Combine: `cat` passwd/group lines for the new user. Primary group often same name (distro default).
9. [ ] Recite cheat-sheet: `-d` home, `-s` shell, then username.
10. [ ] Predict omitting `-s`: default shell from `useradd` defaults. Compare with what you got on a second throwaway if you try.
11. [ ] Do not `-d /home/nika` or another real home.
12. [ ] Interview: “Create user with home and bash.”
13. [ ] Combine with `finger` later: home and shell should show.
14. [ ] Recite this does not expire the account; `usermod -e` does.
15. [ ] Missing login name. Predict usage.
16. [ ] If you reuse `/home/mydir` from the sheet, make sure it is **empty/throwaway**.
17. [ ] Recite low-level vs: you are not editing passwd by hand.
18. [ ] Create a second throwaway you will delete with `-r` later vs one you will delete **leaving** home — plan the names.
19. [ ] `id` the new user. UID, GID, groups.
20. [ ] Leave the accounts until the `userdel` section, or delete if you already proved create.

## `userdel`

**Warn:** this deletes **accounts**. Without `-r`, the home directory **stays** (orphaned files). With `-r`, home **and** files go. Never `userdel nika`, never `userdel root`, never a UID that owns a production service. Throwaway only.

1. [ ] Delete a throwaway account **leaving home**. Recite the home path should still exist. Prove with `ls` on that path.
2. [ ] Recite: the passwd/shadow lines are gone (`getent passwd name` fails).
3. [ ] **Warn + do:** delete another throwaway **and** their home/files (`-r`). Prove the home path is gone.
4. [ ] Recite the cheat-sheet two forms: name only; `-r` plus name.
5. [ ] Privilege: without root, predict failure.
6. [ ] Wrong-usage: user that does not exist. Predict the error.
7. [ ] Wrong-usage: user still logged in / running processes. Predict “user is currently used” — do not `-f` unless a lab says so.
8. [ ] Predict: files **outside** home owned by that UID become orphaned numbers in `ls -l`. Recite you do not `userdel -r /`.
9. [ ] Combine: `useradd` → prove → `userdel` without `-r` → `ls` home leftover → remove leftover dir **only if** it is the throwaway path.
10. [ ] Combine: `useradd` → `userdel -r` → `ls` home must fail.
11. [ ] Recite `-r` is the dangerous one on a mistaken name. Type slowly. Check `whoami` first.
12. [ ] Interview: “Delete account keep files” vs “wipe home.”
13. [ ] Do **not** run this against `tester` unless **you** created `tester` for this drill.
14. [ ] After delete, `id name` must fail. Prove.
15. [ ] Recite group leftover: a private group with the same name may remain or be removed depending on distro. Check `getent group`.
16. [ ] Missing name. Predict usage.
17. [ ] Never add `-r` “just to be sure” on an account whose home is `/` or `/home` shared.
18. [ ] If you deleted the wrong throwaway, stop. Do not delete more to “fix” it.
19. [ ] Recite cheat-sheet comments: leave home; delete account AND home/files.
20. [ ] Confirm no real users are missing (`getent passwd` for your login).

## `usermod`

1. [ ] Change a throwaway user’s **home path** (`-d`). Recite this may not move files unless you also use a move flag (not on the sheet) — prove the passwd field changed.
2. [ ] **Rename** login (`-l` new old). Recite: **UID and files unchanged**. Prove `id -u` same, `ls -l` still shows the old number / new name.
3. [ ] Change **login shell** to `/bin/bash` (`-s`). Prove on the passwd line.
4. [ ] Set **account expiration** (`-e YYYY-MM-DD`). Prove with `chage -l`.
5. [ ] **Append** an extra group (`-aG`). Recite: `-a` is required or `-G` **replaces** extras. Prove with `id`/`groups`.
6. [ ] Predict **without** `-a`: `-G docker` alone replaces extras. On a throwaway, prove you wiped other extras, then fix with `-aG` or restore.
7. [ ] Recite the five cheat-sheet flags: `-d` `-l` `-s` `-e` `-aG`.
8. [ ] Privilege: without root, predict failure.
9. [ ] Wrong-usage: `-l` to a name that exists. Predict the error.
10. [ ] Wrong-usage: `-e` not ISO date. Predict reject.
11. [ ] Combine: rename, then `finger`/`id` the **new** name. Old name must fail.
12. [ ] Recite: rename does not chown files; ownership is UID.
13. [ ] Do not `-l` your own login on a live SSH session unless you know you will not lock yourself out.
14. [ ] Interview: “Add docker group without dropping wheel.” Append flag.
15. [ ] Combine with `gpasswd -a` — two ways to add a supplementary member.
16. [ ] Missing login name. Predict usage.
17. [ ] After `-d`, `su - user` should land in the new path **if** the directory exists and is accessible. Prove or recite the gap.
18. [ ] Recite expiry `-e` vs `chage` listing.
19. [ ] Restore the throwaway to a known shell/home/groups, or `userdel -r` when finished (throwaway only).
20. [ ] Recite cheat-sheet comments for each flag in one line each.

## `passwd`

1. [ ] Change **your** password only if this is **your** VM and you will remember it. Otherwise skip and use a throwaway user as root.
2. [ ] As root, set a password on a throwaway (`passwd otheruser`). Recite you are not asked for the old password.
3. [ ] Recite: this writes the **hash** in shadow; you never type the hash.
4. [ ] Privilege: as a normal user, `passwd` another user. Predict denied.
5. [ ] Recite the two cheat-sheet forms: no name (yours); `passwd otheruser` as root.
6. [ ] Combine: after set, `su - throwaway` with the new password. `exit`.
7. [ ] Wrong-usage: password too short/simple — policy may reject. Recite PAM/`passwd` quality.
8. [ ] Recite `x` in passwd file stays `x`; the secret moved in shadow.
9. [ ] Interview: “Where does passwd store the secret?”
10. [ ] Do not set `root`’s password on a shared lab unless instructed.
11. [ ] Predict locked account (`!` in shadow) vs you just set a password — `passwd` to unlock in simple labs (or `passwd -u` if you know it; sheet is the interactive set).
12. [ ] Combine with `chage -l`: last change date should update.
13. [ ] Missing: `passwd` with extra garbage args. Predict usage.
14. [ ] Recite: empty password field is dangerous (rare). You will not create that.
15. [ ] After practice, you can lock a throwaway (`passwd -l`) if the lab wants; not required by the sheet.
16. [ ] Recite sudo asks for **your** password; this command **changes** a password.
17. [ ] Do not paste the new password into the assignments file.
18. [ ] Prove shadow is not world-readable still.
19. [ ] Recite cheat-sheet comments.
20. [ ] If you changed **your** password, confirm you can still log in before closing the session.

## `finger`

1. [ ] Show login name, home, shell for a user (yourself or throwaway). Recite those three from the output.
2. [ ] Recite GECOS/comment may appear (full name).
3. [ ] Privilege: usually no root needed to finger a user.
4. [ ] Wrong-usage: user does not exist. Predict the error.
5. [ ] If `finger` is not installed, recite it may be a separate package; do not confuse with `id`.
6. [ ] Combine: after `usermod -s` / `-d`, finger again. Home/shell must match.
7. [ ] Recite the cheat-sheet comment: login name, home, shell.
8. [ ] Compare with `cat` passwd fields — same data, friendlier view.
9. [ ] Missing name: some versions finger **you**. Note what yours does.
10. [ ] Interview: “Quick home and shell?”
11. [ ] Do not rely on finger for hashes (it must not show them).
12. [ ] Combine with `groups` — finger is not the group list.
13. [ ] Recite it reads passwd (and maybe other DBs), not shadow secrets.
14. [ ] After rename (`usermod -l`), finger the **new** name.
15. [ ] Wrong-usage: finger `/etc/passwd`. Recite it wants a username.
16. [ ] If the command is missing, skip remaining items after recording “not installed.”
17. [ ] Recite idle/login tty info if shown — extra, not the sheet’s focus.
18. [ ] Prove `useradd -d` / `-s` shows up here.
19. [ ] Do not finger random network users (`finger user@host`) in this drill.
20. [ ] Recite this is lookup, not account creation.

## `groupadd`

1. [ ] Create a throwaway group. Recite the name is unique; GID is assigned.
2. [ ] Prove with `getent group` or `cat` the group file.
3. [ ] Privilege: without root, predict failure.
4. [ ] Wrong-usage: group name already exists. Predict the error.
5. [ ] Recite: this does not add users yet (`gpasswd` / `usermod -aG`).
6. [ ] Combine: `chgrp` a throwaway file to the new group (permission-model crossover) if you still have a file; else skip.
7. [ ] Recite the cheat-sheet: create group, one argument.
8. [ ] Predict GID number vs human-looking name — kernel uses the number.
9. [ ] Missing name. Predict usage.
10. [ ] Do not `groupadd wheel` or `root`.
11. [ ] Interview: “Make a group for a shared directory.”
12. [ ] Combine with `groupmod` / `groupdel` planned names.
13. [ ] Recite extra members will appear after the last colon on the group line.
14. [ ] Create the group you will later rename (`oldname` → `newname`).
15. [ ] Prove `groups` does not show it on a user until you add the user.
16. [ ] Wrong-usage: invalid group name. Predict reject.
17. [ ] Recite useradd often creates a **user-private group** of the same name — different from this explicit add.
18. [ ] `getent group name` after create must succeed.
19. [ ] Leave the group for gpasswd/groupmod/groupdel drills.
20. [ ] Recite cheat-sheet comment: create group.

## `groupdel`

**Warn:** deleting a group that is someone’s **primary** GID can fail or break logins. Delete **throwaway** groups only. Never `groupdel wheel` / `root` / `users`.

1. [ ] Delete a throwaway group that is **empty** (or only extra members you already removed). Prove `getent group` fails.
2. [ ] Privilege: without root, predict failure.
3. [ ] Wrong-usage: group does not exist. Predict the error.
4. [ ] Wrong-usage: group is a user’s **primary** group. Predict “cannot remove primary group.” Fix by deleting the user first or changing their GID — throwaway only.
5. [ ] Recite the cheat-sheet: one name, no `-r` (that flag was on `userdel`).
6. [ ] Combine: `groupadd` → `gpasswd -a` → remove the member → `groupdel`.
7. [ ] Recite files with that GID become orphaned numbers in `ls -l`. Do not `groupdel` a GID used on real data.
8. [ ] Interview: “Remove a group.”
9. [ ] Missing name. Predict usage.
10. [ ] After delete, `chgrp` to that name must fail.
11. [ ] Recite this does not delete user accounts.
12. [ ] Do not force-delete system groups.
13. [ ] Combine with `userdel`: order matters if the group is primary.
14. [ ] Prove `/etc/group` no longer has the line.
15. [ ] Recite cheat-sheet comment: delete group.
16. [ ] If `gpasswd` still had members, try delete anyway — record whether your distro allows it.
17. [ ] Never script `groupdel` with an unsanitized name.
18. [ ] After a successful delete, `id` a former member — extra group gone (after re-login).
19. [ ] Leave required lab groups intact.
20. [ ] Confirm `wheel`/`sudo` still exist if they did before.

## `groupmod`

1. [ ] **Rename** a throwaway group (`-n` new old). Recite **GID unchanged**. Prove with `getent group` (new name, same number).
2. [ ] Recite: files owned by that GID still match; only the **label** changed (like `usermod -l`).
3. [ ] Privilege: without root, predict failure.
4. [ ] Wrong-usage: new name already exists. Predict the error.
5. [ ] Wrong-usage: old name missing. Predict the error.
6. [ ] Recite the cheat-sheet flag `-n` and argument order: newname oldname.
7. [ ] Combine: `groups` a member — should show the **new** name.
8. [ ] Interview: “Rename group without changing GID.”
9. [ ] Missing `-n`. Predict usage or unexpected behavior.
10. [ ] Do not rename `wheel` to something else.
11. [ ] Combine with `id -G`: numbers stable; `id` default names change.
12. [ ] Recite this is not `usermod -l` (users vs groups).
13. [ ] After rename, `chgrp newname` a throwaway file. Works; old name should not.
14. [ ] Predict `/etc/group` first field changed, third field (GID) did not.
15. [ ] Recite cheat-sheet comment: rename group (GID unchanged).
16. [ ] If a user had that group as extra, prove membership follows the GID, not the string, by checking before/after `id -G`.
17. [ ] Do not `-g` change GID in this drill unless you understand file ownership (not on the sheet).
18. [ ] Restore the name or `groupdel` the throwaway when done.
19. [ ] Wrong-usage: swap new/old order. Predict “group does not exist.”
20. [ ] Final `getent group` for both names: only the new one exists.

## `gpasswd`

1. [ ] Add a throwaway **user as supplementary member** of a throwaway group (`-a`). Prove with `groups` / `id` (re-login or `id user`).
2. [ ] Recite `-a` = add member. Recite this is not `usermod -aG` but the same idea.
3. [ ] Privilege: without root (or group admin), predict failure.
4. [ ] Wrong-usage: user or group does not exist. Predict the error.
5. [ ] Recite the cheat-sheet: `-a user group` order.
6. [ ] Combine: `cat` the group line — username appears in the member list.
7. [ ] Predict: this does **not** change the user’s **primary** GID in passwd.
8. [ ] Interview: “Put user in extra group via gpasswd.”
9. [ ] Missing `-a`. Predict interactive group password tools — do not set a group password on a lab unless you know how to clear it.
10. [ ] Combine with `usermod -aG`: either path is valid; pick one and prove.
11. [ ] After add, stale shell of that user may hide the group. Recite `id username` from another tty as the check.
12. [ ] Do not `-a root wheel` as “practice” if it already is; use throwaway.
13. [ ] Recite supplementary vs primary again.
14. [ ] Wrong-usage: `-a group user` swapped. Predict “user does not exist.”
15. [ ] Recite cheat-sheet comment: add user as supplementary member.
16. [ ] If you need to undo, `gpasswd -d user group` (not on the sheet — optional) or `usermod` restore; or delete throwaway user/group.
17. [ ] Prove `id -G` gained a number matching the group’s GID.
18. [ ] Recite: `-a` on gpasswd vs `-a` on usermod — both mean append; usermod needs `-G` too.
19. [ ] Leave membership as required, or delete throwaways with the userdel/groupdel warnings.
20. [ ] Final check: no real user was added to a random group; `groups` for your login looks as before.
