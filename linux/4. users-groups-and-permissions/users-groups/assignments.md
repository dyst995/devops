# Assignments — Users and groups

Close `commands.md`. Type and run. `useradd`/`userdel`/`usermod`/`groupadd`/`passwd` for **practice accounts on a lab VM**. Never `userdel -r` a real person. `cat /etc/shadow` needs root. `su`/`sudo` — do not lock yourself out.

## Reading accounts (`/etc/passwd`, `/etc/group`, `/etc/shadow`, `id`, `groups`, `chage`)

### Easy

1. [ ] `cat /etc/passwd` and find your line (name, UID, GID, home, shell — same last field as the shell topic).
2. [ ] `id` and `groups`. Then `id -u`, `id -g`, `id -G`. Match numbers to `/etc/passwd` and `/etc/group`.

### Medium

3. [ ] `groups` another username that exists. `cat /etc/group` and find that group’s member list.
4. [ ] `chage -l` on your account (or a practice user). If permission denied, `sudo chage -l` on the lab. Read expiry fields — do not set them yet.

### Hard

5. [ ] `sudo cat /etc/shadow` on the lab **only**. Find a practice user. You should see a hash field, not a readable password. Do not copy hashes off the VM.
6. [ ] Combine: `grep` your name in passwd and group, `id`, `finger` if installed (`finger user`). One sentence: UID vs primary GID vs supplementary groups.

## Switching identity (`su`, `sudo`)

### Easy

1. [ ] `sudo` a harmless command (`id` or `ls /root` if allowed). It asks for **your** password.
2. [ ] `su -` to a **practice** user if you know their password, or `su` to yourself is pointless — use a lab account. `exit` back. `pwd` / `echo $HOME` while switched (`su -` should be that user’s home).

### Medium

3. [ ] `su user` **without** `-` vs `su - user`. Compare `pwd` and `echo $HOME` / `env`. Then `exit`.
4. [ ] Someone used `sudo su` vs `su` to root. On the lab, try `sudo -s` or `sudo su` **if allowed**, `id`, `exit`. Course: sudo uses **your** password; `su` to root needs **root’s**.

### Hard

5. [ ] `sudo` a command that fails without sudo (`cat /etc/shadow`). Then the same with sudo. Do not `chmod` shadow.
6. [ ] Broken: `sudo su -` on a host where you are not in sudoers — read the error. Combine `id`/`groups` to see if you are in `wheel`/`sudo`. Do not edit sudoers except with `visudo` on a lab.

## Creating and changing users (`useradd`, `userdel`, `usermod`, `passwd`)

### Easy

1. [ ] Lab: `sudo useradd` a practice user with `-d` and `-s /bin/bash`. `grep` them in `/etc/passwd`.
2. [ ] `sudo passwd` that user (set a lab password). `su -` to them to prove it, `exit`.

### Medium

3. [ ] `usermod -s`, `usermod -d` (home path — do not strand a real user), or `usermod -l` rename **practice** login. `grep` passwd again. UID should stay the same on rename.
4. [ ] `usermod -e` an expiry date on the practice user. `chage -l` to confirm. `usermod -aG` a practice group (create the group first if needed). **`-a` matters** — without `-a`, `-G` replaces extras.

### Hard

5. [ ] `userdel` the practice user **without** `-r`, `ls` their home if it remained. Then a second practice user: `userdel -r`. Do not `-r` anyone else.
6. [ ] Broken: `usermod -G docker nika` **without** `-a` on a real account — do not run that on yourself. On the practice user, demonstrate `-aG` vs a careful `-G` that only lists groups you intend. `id` after.

## Groups (`groupadd`, `groupdel`, `groupmod`, `gpasswd`)

### Easy

1. [ ] `sudo groupadd` a practice group. `grep` `/etc/group`.
2. [ ] `gpasswd -a` the practice user into that group. `id` / `groups` that user.

### Medium

3. [ ] `groupmod -n` rename the practice group. GID unchanged — `cat /etc/group`.
4. [ ] `groupdel` only when no one still needs it. If `groupdel` refuses, read why (`grep` the group in passwd primary GID).

### Hard

5. [ ] Create group, add user, `su -` user, `id`. If the new group is missing, they need a new login. `exit` and `su -` again.
6. [ ] Combine: `useradd` + `groupadd` + `gpasswd -a` + `id` + `grep` passwd/group. Delete the practice user and group when finished (`userdel -r`, `groupdel`).
