# Users and Groups

Every process on Unix runs as a **user** in one or more **groups**. Files, sudo, and services all key off **UID** / **GID**, not the pretty name.

## User parameters

Each Unix account is a set of fields. The kernel and file permissions care about **numbers** (UID/GID). Humans and login tools care about **names** (user name, home, shell).

Walk this line while you read:

```text
root:x:0:1:Super-User:/:/sbin/sh
│    │ │ │ └───────────┬──────────┘
│    │ │ │    comment    home  shell
│    │ │ └── GID (primary group)
│    │ └──── UID
│    └────── password (x → hash in /etc/shadow)
└─────────── user name
```

Expiration is **not** on this line. It lives with the real password hash in **`/etc/shadow`**.

### User name

The login name you type at SSH or `su` (`root`, `nika`, `www-data`). It must be unique on the box. It is only a **label**: two names never share a UID on a sane system, and renaming a user (`usermod -l`) does not change which files they own — ownership is stored as UID.

Typical rules: short, lowercase, no spaces. Length and allowed characters depend on the distro (`useradd` will reject a bad name).

### Encrypted password (or `x`)

The second `passwd` field is historically the **password hash**. On modern Linux it is almost always **`x`**, which means: “the hash is in `/etc/shadow`,” a file only root can read. That stops ordinary users from copying hashes out of world-readable `/etc/passwd` and cracking them.

- `x` — hash in shadow (normal)
- `*` or `!` in shadow — login with a password is **locked**
- empty password field (rare, dangerous) — no password required

You never type the hash yourself; `passwd` writes it.

### User Identifier (UID)

The **integer** the kernel uses as “who is this.” Every file has an owner UID. **UID 0** is **root** (unlimited). Other low numbers are **system** accounts (`daemon`, `bin`, `nobody`) — daemons, not humans. Regular people get higher UIDs (often starting at 1000, sometimes 500 on older Red Hat).

`id -u` prints yours. If two passwd lines share a UID, they are the **same** identity to the kernel (bad idea except rare compatibility tricks).

### Group Identifier (GID)

The user’s **primary** group, as a number. At least one group is required. When you create a file, it is usually owned by this GID (unless `setgid` on the directory or a similar policy). Extra groups (`docker`, `wheel`) are **not** this field — they are listed in `/etc/group`. `id` shows `gid=` (primary) and `groups=` (all).

### Full name or description (GECOS)

Free-text comment: `Super-User`, `Admin`, `Nika Beroshvili`. Login does not require it. `finger` and some mail tools display it. You can put extra comma-separated subfields (phone, office); most servers only use the first part.

### Home directory

The user’s directory: configs (`.bashrc`), keys (`.ssh`), files. Login sets `$HOME` and `cd`s here (`su -`). Root’s home is often `/root`; in the sample it is `/`. A missing or unreadable home still allows login on many systems, but the shell starts somewhere else and dotfiles are skipped. `useradd -d` / `usermod -d` set this path; `userdel -r` deletes the directory.

### User’s shell

The program started at **interactive login**: `/bin/bash`, `/sbin/sh`, `/bin/zsh`. If this is `/usr/sbin/nologin` or `/bin/false`, the account exists for daemons/files but **must not** get a login shell. `useradd -s` / `usermod -s` change it. `chsh` lets a user change their own if the shell is listed in `/etc/shells`.

This is the **login** shell (same idea as `$SHELL` in [shell programming](../../2. linux-shell-basics/02-shell-programming/theory.md)). A user can still run another shell by typing `bash` after they are in.

### Expiration date

When the **account** (or password) is no longer valid. Stored in **`/etc/shadow`**, not `/etc/passwd`: last change, min/max age, warn days, inactive days, and **expire** (often as days since 1970-01-01). After expiry, login is refused even if the password is correct. `chage -l user` shows it; `usermod -e YYYY-MM-DD` sets account expiry.

**Memory hook:** `passwd` line = **who** (name, UID, GID, home, shell, comment). `shadow` = **secret and time** (hash, lock, expire). `x` means “secret is next door.”

| Parameter | Typical location |
| --- | --- |
| User name, UID, GID, name/comment, home, shell | `/etc/passwd` |
| Password hash, lock, aging, expiration | `/etc/shadow` |

Every user belongs to **at least one** group (the primary GID in `passwd`). Extra groups are listed in `/etc/group`.

## Group parameters

A group is a named set of UIDs that share **group** permissions on files. The kernel again uses a **number** (GID). `/etc/group` is the name list.

Walk this line while you read:

```text
bin::2:root,bin,daemon
│  │ │ └────────────── members (usernames)
│  │ └── GID
│  └──── password (empty or x → /etc/gshadow if a hash exists)
└─────── group name
```

Compare `staff::10:` — same four fields, but the member list is **empty**. Users can still have GID `10` as their **primary** group in `/etc/passwd` without appearing here.

### Group name

The label you use in `chgrp`, `usermod -G`, and `ls -l` (`staff`, `adm`, `docker`, `wheel`). Unique on the box. Like a user name, it is only a **label**: file group ownership is stored as **GID**. `groupmod -n newname oldname` renames the group; existing files still show the new name because the number did not change.

### Encrypted password (or `x`)

The second field is a **group password** (used with the old `newgrp` command so someone not in the group can temporarily join). On modern Linux this is almost always **empty** or **`x`**. If a hash exists, it belongs in **`/etc/gshadow`** (root-only), the group counterpart of `/etc/shadow`.

You will almost never set a group password. Access is granted by **membership** (and sudo/file mode), not by typing a group secret.

### Group Identifier (GID)

The **integer** the kernel uses as “which group.” **GID 0** is typically the `root` group. System groups use low numbers (`bin` = 2, `adm` = 4 in the sample). Human/project groups get higher GIDs.

A user’s **primary** GID in `/etc/passwd` must refer to some group’s GID here (the group line must exist). `id -g` prints the primary GID; `id -G` prints every GID the process has.

Two group names with the same GID would be the same group to the kernel — avoid that.

### List of usernames (members)

Comma-separated login names: `root,bin,daemon`. These people have this group as a **supplementary** (extra) group.

**This list is not “everyone in the group.”**

| How you belong | Where it is recorded |
| --- | --- |
| **Primary** group | GID field in `/etc/passwd` only. You may **not** appear in `/etc/group` for that GID. |
| **Supplementary** group | Your name **is** on this member list (`usermod -aG docker nika`) |

So `staff::10:` with an empty list still has members: whoever has `...:10:...` in `passwd` (common when `useradd` creates a private group with the same name as the user).

`groups` / `id` merge both sources. Adding a user to a project group: **`usermod -aG group user`** (`-a` = append; without `-a`, `-G` **replaces** the extra-group set). `gpasswd -a user group` does the same idea.

**Memory hook:** `group` line = **name + GID + extra people**. Primary membership is on the **user** line. Empty member list ≠ unused group. `x`/empty password = no group login secret.

| Parameter | Typical location |
| --- | --- |
| Group name, GID, supplementary members | `/etc/group` |
| Group password hash (rare) | `/etc/gshadow` |
| Primary group of a user | GID in `/etc/passwd` |

## `/etc/passwd`

All users (including system accounts created by default) are listed here. Colon-separated:

```text
name : password : UID : GID : comment : home : shell
```

```text
$ cat /etc/passwd
root:x:0:1:Super-User:/:/sbin/sh
daemon:x:1:1::/:
bin:x:2:2::/usr/bin:
sys:x:3:3::/:
adm:x:4:4:Admin:/var/adm:
lp:x:71:8:Line Printer Admin:/usr/spool/lp:
nobody:x:60001:60001:Nobody:/:
```

**root** is the superuser: **UID 0**, unlimited rights. **Do not use it without necessity.** Prefer `sudo` for one command.

Hashes are not in this file when the second field is `x` — they are in `/etc/shadow` (root-only).

## `/etc/group`

```text
name : password : GID : user1,user2,...
```

```text
$ cat /etc/group
root::0:root
bin::2:root,bin,daemon
sys::3:root,bin,sys,adm
staff::10:
```

Empty member list means nobody is a *supplementary* member; users can still have this GID as **primary** in `passwd`.

## Command map

**Users:** `su` · `sudo` · `useradd` · `userdel` · `usermod` · `passwd` · `finger`

**Groups:** `groupadd` · `groupdel` · `groupmod` · `groups`

### su — substitute user

Switch to another user. You must know **that user’s password** (except root switching down).

```bash
su - user          # login shell: their home, their env
su user            # keep most of your environment
su                 # to root (same as su root)
su root
```

**Memory hook:** `su` = **their** password. `-` = full login (home + profile).

### sudo — superuser do

Run a program with **another user’s privileges** (usually root). Prompts for the **current** user’s password (if sudoers says so).

```bash
sudo ifconfig
sudo su            # root shell without knowing the root password
```

**Memory hook:** `sudo` = **your** password, if you are allowed. `su` = **target** password. `sudo su` ≈ root shell via sudoers, not via root’s secret.

### useradd / userdel / usermod (need root)

```bash
useradd -d /home/mydir -s /bin/bash user1   # home + shell
userdel user                                 # delete account, keep home
userdel -r tester                            # delete account **and** home/files
usermod -d /home/newhome user                # change home path
```

**Memory hook:** `-d` home, `-s` shell. `-r` on `userdel` = also remove the house.

### passwd

```text
# passwd
april09      # current password (when changing your own)
finalday     # new
finalday     # confirm
```

Root can `passwd otheruser` without the old password.

### finger — user info

```text
# finger user
Login name: user
Directory: /home/myfolder
Shell: /bin/bash
```

### Groups

```bash
groupadd mytestgroup     # create
groupdel mytestgroup     # delete
groupmod ...             # rename / change GID
groups                   # groups of the current user
groups alice             # groups of alice
```

**Memory hook:** `*add` create, `*del` delete, `*mod` change. `groups` = who am I in.
