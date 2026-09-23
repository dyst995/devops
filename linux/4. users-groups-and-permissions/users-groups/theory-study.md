# Users and groups (study)

Every process runs as a **user** in one or more **groups**. Files, sudo, and services key off **UID** / **GID**, not the pretty name.

## `/etc/passwd` — who

Colon-separated. The kernel cares about **numbers**; humans care about **names**.

```text
name : password : UID : GID : comment : home : shell

root:x:0:1:Super-User:/:/sbin/sh
│    │ │ │ └───────────┬──────────┘
│    │ │ │    comment    home  shell
│    │ │ └── primary GID
│    │ └──── UID
│    └────── password (`x` → hash in /etc/shadow)
└─────────── user name
```

| Field | Meaning |
| --- | --- |
| **User name** | Login label (`root`, `nika`). Unique. Renaming (`usermod -l`) does **not** change file ownership — that is stored as UID. Typical: short, lowercase, no spaces (`useradd` rejects a bad name). |
| **Password** | Historically the hash. Modern Linux: almost always **`x`** (“hash is in `/etc/shadow`”, root-only) so users cannot copy hashes from world-readable `passwd`. In shadow: `*` or `!` = password login **locked**; empty (rare, dangerous) = no password required. You never type the hash; `passwd` writes it. |
| **UID** | Integer the kernel uses. **UID 0** = **root** (unlimited). Low numbers = **system** accounts (`daemon`, `nobody`). People often start at 1000 (sometimes 500 on older Red Hat). Two passwd lines with the same UID are the **same** identity to the kernel. `id -u`. |
| **GID** | **Primary** group. Files you create usually get this GID (unless SGID on the directory). Extra groups are **not** this field — they live in `/etc/group`. `id` shows `gid=` and `groups=`. |
| **GECOS** | Comment (`Super-User`, full name). Optional. `finger` / mail may show it. Extra comma-separated subfields exist; most servers use the first part. |
| **Home** | Configs, `.ssh`, files. Login sets `$HOME` and `cd`s here (`su -`). Root often `/root` (sample uses `/`). Missing/unreadable home: login may still work, shell starts elsewhere, dotfiles skipped. `useradd -d` / `usermod -d`; `userdel -r` deletes the directory. |
| **Shell** | Program at **interactive login**. `/usr/sbin/nologin` or `/bin/false` = account exists but **must not** get a login shell. `useradd -s` / `usermod -s`. `chsh` if the shell is in `/etc/shells`. This is `$SHELL` (login shell); the user can still type `bash` after they are in. |

**Expiration** is **not** on this line. It lives in **`/etc/shadow`**: last change, min/max age, warn, inactive, **expire** (often days since 1970-01-01). After expiry, login is refused even if the password is correct. `chage -l user`; `usermod -e YYYY-MM-DD`.

`passwd` = **who**. `shadow` = **secret and time**. `x` means the secret is next door.

**root** is UID 0. **Do not use it without necessity.** Prefer `sudo` for one command.

## `/etc/group` — extra people

```text
name : password : GID : user1,user2,...

bin::2:root,bin,daemon
staff::10:          # empty list — still used as a *primary* GID in passwd
```

| Field | Meaning |
| --- | --- |
| **Group name** | Label for `chgrp`, `usermod -G`, `ls -l`. Ownership is **GID**. `groupmod -n` renames; files follow the number. |
| **Password** | Old `newgrp` secret. Almost always empty or **`x`**. Hash, if any, is in **`/etc/gshadow`**. You almost never set this — access is **membership**, not a group password. |
| **GID** | Kernel id. **GID 0** is typically the `root` group. A user’s primary GID in `passwd` must refer to a group that exists. `id -g` / `id -G`. Two names with the same GID are the same group — avoid that. |
| **Members** | Supplementary (extra) usernames only. |

| How you belong | Where it is recorded |
| --- | --- |
| **Primary** | GID in `/etc/passwd` only. You may **not** appear on the group’s member list. |
| **Supplementary** | Your name **is** on the list (`usermod -aG docker nika`) |

Empty member list ≠ unused group. `useradd` often creates a private group with the same name as the user; that user has the GID in `passwd` and may not appear in `/etc/group`.

`groups` / `id` merge both sources. **`-a`** on `usermod -aG` **appends**; `-G` alone **replaces** the extra-group set. `gpasswd -a user group` does the same idea.

| Secret / time | File |
| --- | --- |
| User hash, lock, aging | `/etc/shadow` |
| Group hash (rare) | `/etc/gshadow` |

## Commands

**Users:** `su` · `sudo` · `useradd` · `userdel` · `usermod` · `passwd` · `finger`  
**Groups:** `groupadd` · `groupdel` · `groupmod` · `groups`

**`su`** — switch user. You must know **that user’s** password (except root switching down).

```bash
su - user          # login shell: their home, their env
su user            # keep most of your environment
su                 # to root (same as su root)
```

**`sudo`** — run a program with **another user’s** privileges (usually root). Prompts for the **current** user’s password (if sudoers says so).

```bash
sudo ifconfig
sudo su            # root shell without knowing root’s password
```

`su` = **target** password. `sudo` = **your** password, if allowed.

```bash
useradd -d /home/mydir -s /bin/bash user1
userdel user                  # keep home
userdel -r tester             # account **and** home/files
usermod -d /home/newhome user
passwd                        # own password (old + new twice); root: passwd otheruser
finger user                   # login name, home, shell
groupadd mytestgroup
groupdel mytestgroup
groupmod ...                  # rename / change GID
groups
groups alice
```
