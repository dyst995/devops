# Linux recall — memorize this

Everything from the Linux notes that you need in your head: the **rule**, then the **command**. One idea once. Review one module a day; Sunday do the whole file or the weak module.

| Day | Module |
| --- | --- |
| Monday | 1. Intro |
| Tuesday | 2. Shell basics |
| Wednesday | 3. Packages, services, cron |
| Thursday | 4. Users, DAC, SELinux |
| Friday | 5. Network and remote access |
| Saturday | 6. Processes, CPU, memory, storage, logs |
| Sunday | Full pass or weakest module |

---

## 1. Intro

**Shell** — Program between you and the kernel. Interprets commands; the kernel does the work.  
`User → bash/sh → Kernel → Hardware`

**Bourne `sh`** — Original Unix shell. Many scripts: `#!/bin/sh`. Path `/bin/sh`. Prompt `$` / `#`.

**C shell `csh`** — C-like syntax. `/bin/csh`. Prompt `%` / `#` (only `csh` uses `%` for a normal user).

**Korn `ksh`** — Bourne plus extras. `/bin/ksh`. `$` / `#`.

**Bash** — Bourne-Again SH. Default interactive Linux shell. `/bin/bash`. Prompt `bash-x.xx$` / `#`.

**`/bin/sh` on Linux** — Often a symlink to bash or dash; still POSIX / Bourne mode.

**`$` vs `#`** — Regular user vs root.

**Login shell field** — Last field of your line in `/etc/passwd`.  
`$SHELL` = login shell from the account. `$0` = this process (leading `-` often = login).

```bash
echo $SHELL          # login shell from the account
echo $0              # this process; leading - often means login
cat /etc/passwd      # users; last field is the login shell
```

**File system** — How the OS names and stores data. Linux: one tree from `/`. Extra disk = **mount** on a directory, not a drive letter.  
Common FS: `ext2`/`ext3`/`ext4`, XFS, Btrfs, ReiserFS. Windows: letters, NTFS/FAT, type from extension.

**Linux names** — No required extension. Executable = execute bit + interpreter (`chmod +x` + `#!/bin/bash`).

```bash
chmod +x script.sh           # add execute bit (Linux ignores .sh)
mount /dev/sdb1 /mnt/data    # attach a disk onto a directory
lsblk                        # block devices and mount points
df -h                        # space per mounted filesystem
findmnt                      # what is mounted where
```

**Inode** — The file. Stores metadata, owner/mode, data blocks. **Not** the name. Names live in directories (`.`, `..`, children).

**Link count** — How many names point at that inode. Data can be freed when count is 0 and nothing has the file open.

**Hard link** — Extra name for the **same inode**. Same FS only. Not (generally) directories. Target renamed/deleted: data stays if any name remains.  
`ln src dest` · same inode in `ls -li`

**Symbolic link** — Own inode; stores a **path**. Crosses FS; can point at dirs. Target moved/removed → dangling. Deleting the link does not delete the target.  
`ln -s src dest`

```bash
ln original.txt another-name.txt              # hard link: extra name, same inode
ln -s /var/www/html/current /srv/app          # symlink: stores a path (can dangle)
ls -li                                        # inode number in first column
```

**LVM** — Pool disks, slice resizable LVs (online create/resize/delete; snapshots; live migrate). Linux-only extra layer.  
`disk → pvcreate → VG → lvcreate → mkfs + mount`  
Device: `/dev/vg/lv` and `/dev/mapper/vg-lv`. LVM does **not** format; you `mkfs` then mount + fstab.

```bash
pvcreate /dev/sdb1                                    # label disk/partition as a PV
pvscan                                                # list PVs, VG, free space
pvdisplay                                             # detailed PV info
vgcreate vg_newlvm /dev/sdb1 /dev/sdc1                # pool PVs into one VG
vgdisplay                                             # detailed VG info
vgscan                                                # discover volume groups
lvcreate --name centos7_newvol -l 100%FREE vg_newlvm  # LV using all remaining VG space
lvcreate -n LogVol02 -L 2G VolGroup00                 # LV of a fixed size
lvdisplay                                             # list LVs (path, size, VG)
lvscan                                                # short LV scan
mkfs.ext4 /dev/vg_newlvm/centos7_newvol               # format the LV (not LVM itself)
mount /dev/vg_newlvm/centos7_newvol /mnt              # mount so you can use it
```

**Swap** — Disk overflow for inactive RAM pages. Slower than RAM. **Not on Btrfs.** Partition (RHEL preferred) and/or file.

**Swappiness** — 0–100, default **60**. Low → keep apps in RAM (drop cache). High → swap cold app pages.

**RHEL 7 size (RAM → swap / hibernate)** — ≤2 GB: 2× / 3× · 2–8 GB: 1× / 2× · 8–64 GB: ≥4 GB / 1.5× · >64 GB: ≥4 GB / hibernate not recommended. Huge RAM: workload, ~20% thumb. Hibernate needs swap ≥ RAM.

**Make swap** — `mkswap` **not** `mkfs`. fstab type `swap`. `daemon-reload`. `swapon`. File: `dd` zeros, `chmod 0600`. Remove: `swapoff` first — never `rm` an active swap file.

```bash
cat /proc/swaps                                        # active swap devices/files
free -h                                                # RAM and swap, human units
lvcreate VolGroup00 -n LogVol02 -L 2G                  # 2G LV to hold swap
mkswap /dev/VolGroup00/LogVol02                        # format as swap (not mkfs)
# fstab: /dev/VolGroup00/LogVol02 swap swap defaults 0 0
systemctl daemon-reload                                # reread fstab
swapon -v /dev/VolGroup00/LogVol02                     # turn this swap on now

dd if=/dev/zero of=/swapfile bs=1024 count=65536       # create 64 MB empty file
mkswap /swapfile                                       # swap signature on the file
chmod 0600 /swapfile                                   # not world-readable (RAM secrets)
swapon /swapfile                                       # activate the file
swapoff -v /swapfile                                   # deactivate first — never rm while active
```

**Disk quotas** — Cap **blocks** (space) and **inodes** (file count). Soft = warning + grace. Hard = cannot exceed. fstab: `usrquota` / `grpquota`.

```bash
quotacheck               # scan FS; build/update quota files
quotaon                  # turn quotas on
edquota                  # edit user/group soft/hard limits
setquota                 # set limits non-interactively
repquota                 # report usage vs limits (admin)
quota                    # show quota for current or named user
```

**Boot chain** — Power-off: OS on disk. Power-on: empty RAM → firmware (BIOS/UEFI) → boot loader → kernel → init/systemd → user space.

**LILO** — Old, weaker, originally no GUI menu.

**GRUB** — Modern: CLI, network boot, MD5 passwords.  
`/boot/grub/grub.conf` · `/etc/grub.conf` (often symlink). GRUB2: `/boot/grub2/grub.cfg` or EFI path.

**Runlevel** — Machine state after boot (SysV: one at a time). Default usually 3–5.  
`0` halt · `1` single-user · `3` multi-user text+net · `4` unused/custom · `5` GUI · `6` reboot

**`/etc/rc[0-6].d/`** — `Knn` stop, `Snn` start; lower `nn` first.

**`/etc/inittab`** — SysV default: `id:3:initdefault:`

**systemd targets** — `0` `poweroff.target` · `1` `rescue.target` · `3` `multi-user.target` · `5` `graphical.target` · `6` `reboot.target` · `emergency.target` (more minimal than rescue). Old `runlevelN.target` = compat symlinks.

```bash
systemctl get-default                      # target the machine boots into
systemctl set-default multi-user.target    # next boot: server, no GUI
systemctl set-default graphical.target     # next boot: desktop GUI
systemctl isolate multi-user.target        # switch now; does not change default
```

---

## 2. Shell basics

**Startup files** — Depend on **how** Bash started: interactive? login?

**Interactive** — You can type at a prompt.

**Login shell** — You authenticated (SSH, console) **or** you ran `bash --login` / `bash -l`. Still **you**. Reads `/etc/profile` then the **first readable** of `~/.bash_profile`, `~/.bash_login`, `~/.profile`. Logout: `~/.bash_logout`. Typical contents: `PATH`, `umask`, exported env.

**Interactive non-login** — Desktop terminal. Reads **only** `~/.bashrc`.

**Login does not read `.bashrc`** unless the profile sources it:

```bash
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

**`.` vs `source`** — Same in Bash. `.` is **POSIX** (works in `sh`). `source` is **Bash-only**; `/bin/sh` is often **dash** → `source: not found`. Prefer `.` in profiles and portable scripts. Space required: `. ~/.bashrc`.

**POSIX** — IEEE Std 1003, Portable Operating System Interface: common Unix contract (shell, utilities, APIs). Bash = POSIX plus extras. `/bin/sh` = the POSIX shell, not necessarily Bash.

**`su` vs `bash --login`** — Different jobs.  
`su` / `su -` = become **root** (or `su user`). Needs **that user’s** password. Changes UID. `-` = their login env (home + `PATH`).  
`bash --login` = login shell **as you**. No password, no user switch. Reads **your** profiles.

```bash
bash --login             # login shell as YOU (read your profiles)
bash -l                  # same as --login
su                       # become root (root’s password)
su -                     # become root with root’s login env
su user                  # become that user; keep more of your env
su - user                # become that user with their login env
echo $0                  # this shell; -bash often means login
shopt login_shell        # on/off — is this a login shell?
```

**Script** — Commands in a file; shell **interprets** line by line (not a compiler).

**xtrace** — Prints each command to **stderr** after expansions, prefix `+ `.  
`bash -x script.sh` = whole run, no edit. `set -x` from that line. `set +x` off. Long name: `set -o xtrace`.

**When not to use shell** — Heavy CPU (sort/hash/recursion), typed structured apps, mission-critical/security, real data structures, GUIs, libraries/legacy, closed source (the file **is** the source).

**Variable** — `KEY=value`, no spaces around `=`, case-sensitive, env often `UPPER_CASE`. Multi-value: `:`. Shell-only until `export`.

**Common env** — `USER` / `LOGNAME` · `HOME` · `EDITOR` · `SHELL` · `PATH` (first match wins) · `LANG` · `TERM` · `MAIL`

**List vars** — `env` / `printenv` = exported. `set` = shell + env + functions. `unset NAME`. `env VAR=tmp ./myscript` = one command, this shell unchanged.

```bash
KEY=value                  # assign; no spaces around =
echo "$HOME"               # print one variable (quote it)
echo "$PATH"               # command search path; first match wins
env                        # exported environment
printenv PATH              # one exported variable
set                        # shell vars + env + functions
unset NAME                 # delete the variable
export EDITOR=vim          # children inherit this
env VAR=tmp ./myscript     # run one command with VAR; this shell unchanged
bash -x script.sh          # xtrace the whole script (no edit)
set -x                     # xtrace on from here
set +x                     # xtrace off
```

**Editors** — `vi`/`vim` always there; `nano` easier. `$EDITOR` / `$VISUAL` for `visudo`, `crontab -e`, `git commit`.

**Vim** — Command (`Esc`): motions. Insert (`i` `a` `o` `O`): type. Last-line (`:`): `:w` `:q` `:wq`/`:x` `:q!`.  
Motion: `h j k l` · `w`/`b` · `0`/`$` · `gg`/`G`. Edit: `x` `dd` `dw` `yy` `p`/`P` `u` `Ctrl-r`. Search: `/` `?` `n`/`N`.

**nano** — `^K` cut · `^U` paste · `M-6` copy · `^O` save · `^X` quit · `^W` search.

**`visudo`** — Only safe edit of `/etc/sudoers` (syntax check).

```bash
export EDITOR=vim        # default for visudo, crontab -e, git commit
vim file                 # open in Vim (starts in Command mode)
vimtutor                 # interactive Vim lesson
nano file                # modeless editor
sudo visudo              # edit sudoers with syntax check
```

**`man`** — Optional section. `-k` = `apropos`. `-f` = `whatis`.  
Sections: `1` user cmds · `2` syscalls · `3` library · `5` formats · `8` admin.  
`info` = GNU hyperlinked; try `man` first.

```bash
man cat                  # full manual (section 1 = user command)
man 5 passwd             # section 5 = file format, not the command
man -k list              # keyword search (apropos)
man -f ls                # one-line whatis
info cat                 # GNU info page
```

**`ls`** — `-la` long+dots · `-lh` human · `-lt` newest · `-lSh` largest. `.` names hidden from plain `ls`.

**`pwd` / `cd`** — Bare `cd` or `cd ~` → `$HOME`. `cd /` · `cd ..` · `cd -` previous (prints it). `$CDPATH` like `PATH` for `cd`; ignored if dest starts with `/`.

**`touch`** — Create empty or update mtime. `-d` parsed time.

**`mkdir`** — `-p` parents, no error if exist · `-m` mode. `mkdir -p dir/test{1..3}/empty`

**`cp`** — `-r` dirs · `-p` preserve mode/owner/time · `-i` prompt.

**`mv`** — Move/rename. `-i` · `--backup` · `-S` suffix (default `~`) · `-u` if source newer or dest missing.

**`cat`** — Show or concatenate. `rmdir` = empty dir only. `rm -r` trees · `-f` no prompt. `shred` = overwrite.

**Pagers** — `more` forward only. `less` both ways.

**`head`/`tail`** — Default 10. `head -n K` · `head -n -K` drop last K. `tail -n K` · `tail -n +K` from line K. `tail -f` follow.

```bash
ls -la                               # long listing + hidden (dot) files
ls -lh                               # long + human sizes
ls -lt                               # long + newest first
ls -lSh                              # long + largest first + human
pwd                                  # current directory path
cd /                                 # filesystem root
cd ..                                # parent
cd ~                                 # home ($HOME)
cd -                                 # previous directory (prints it)
touch -d "next Friday" newfile.txt   # create or set mtime from a date
mkdir -p dir/test{1..3}/empty        # parents as needed; brace 1..3
cp -rp src dest                      # copy tree; keep mode/owner/time
mv -u src dest                       # move if source newer or dest missing
cat 1.txt 2.txt > 3.txt              # concatenate into 3.txt
rmdir empty                          # remove empty directory only
rm -rfv dir/                         # recursive, force, verbose — dangerous
shred file                           # overwrite so recovery is harder
more file                            # page forward only
less /var/log/syslog                 # page both ways
head -n 5 /etc/passwd                # first 5 lines
head -n -2 file.txt                  # all but the last 2 lines
tail -n 50 /var/log/syslog           # last 50 lines
tail -n +20 file.txt                 # from line 20 to end
tail -f /var/log/syslog              # follow as it grows
```

**`find`** — Live tree. `-name` (quote globs) · `-user` · `-type f`/`d` · `-exec cmd {} \;` · also `-mtime` `-size` `-perm` `-maxdepth`.

**`locate`** — DB `/var/lib/mlocate/mlocate.db`. Stale until `updatedb`.

**`grep`** — `-r` recursive · `-i` case · `-n` line numbers.

**`xargs`** — Stdin → args. Default command `/bin/echo`. Default **one** invocation with all args. `-I {}` once per item · `-0` NUL (with `find -print0`) · `-P N` parallel (`0` = as many as possible).

```bash
find / -name hosts                                    # live tree: basename hosts
find /home -user user                                 # owned by user
find . -name '*.log'                                  # quote globs so the shell does not expand
find /tmp -name core -type f -exec rm {} \;           # regular files named core; rm each
find /tmp -name core -type f -print0 | xargs -0 rm    # NUL-safe names with spaces
locate passwd                                         # fast name search (DB; can be stale)
updatedb                                              # rebuild locate DB
grep -r "fun" ~                                       # matching lines, recurse home
grep -in pattern file.txt                             # ignore case + line numbers
cat names.txt | xargs                                 # default echo; join into one line
cat names.txt | xargs -I {} touch {}                  # one command per item
cat urls.txt | xargs -P 4 -I {} curl -O {}            # up to 4 in parallel
```

**`zip`** — `-r` recursive · `-p` store given relative paths.

**`tar`** — `-c` create · `-x` extract · `-t` list · `-v` names · `-f` archive (**last** in the flag cluster) · `-z` gzip. `-` as archive = stdout/stdin.

**`gzip`** — Default **replaces** with `.gz` (`-k` keep). `-c` stdout. `zcat` / `gunzip -c` print. `zgrep` search `.gz`.

```bash
zip -rp archive.zip /path/to/               # ZIP a tree; keep relative paths
unzip archive.zip                           # extract here
tar -cvf archive.tar path/                  # create, verbose, file last
tar -xvf archive.tar                        # extract
tar -tf archive.tar                         # list contents
tar -cvzf archive.tar.gz path/              # create + gzip
tar cf - dir1 | (cd dir2 && tar xf -)       # copy tree via stdout/stdin
gzip -c file1 > foo.gz                      # compress to stdout; keep original
zcat foo.gz                                 # print decompressed
zgrep pattern foo.gz                        # grep inside gzip
```

---

## 3. Packages, services, cron

**Package** — Archived software a manager can install.

**Red Hat** — `*.rpm` · low `rpm` · high `yum` / `dnf`.  
**Debian** — `*.deb` · low `dpkg` · high `apt` (`apt-get`, `apt-cache`).  
*yum is to rpm as apt is to dpkg.*

**`apt-get`** — `update` lists · `upgrade` installed · `install` **name** not `.deb` · `remove` keep conf · `purge` drop conf · `check` broken deps.

**`apt-cache`** — `search` · `show` · `showpkg` · `depends`.

**APT sources** — `/etc/apt/sources.list` + `/etc/apt/sources.list.d/*.list`. `deb` binaries / `deb-src` source.

```bash
sudo apt-get update          # refresh package lists (does not upgrade)
sudo apt-get upgrade         # upgrade already installed packages
sudo apt-get install nginx   # install by name, not .deb
sudo apt-get remove nginx    # remove package; config may stay
sudo apt-get purge nginx     # remove package and its config
sudo apt-get check           # verify no broken dependencies
apt-cache search nginx       # search the package cache
apt-cache show nginx         # readable package record
apt-cache showpkg nginx      # general info for one package
apt-cache depends nginx      # raw dependency list
```

**`alternatives`** — One public name, many implementations (Debian: `update-alternatives`).  
`--install link name path priority` · `--remove` · `--set` manual · `--auto` highest priority · `--display` · `--config` menu. `--slave` extra links that follow. Menu: `*` current, `+` auto choice.

```bash
alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5  # register: link name path priority
alternatives --config java                                             # menu; * current, + auto
alternatives --set java /usr/java/latest/bin/java                      # pin this path (manual)
alternatives --auto java                                               # highest priority wins
alternatives --display java                                            # paths, priorities, current
alternatives --remove java /usr/java/latest/bin/java                   # unregister that path
```

**SysV** — `/etc/init.d/`: `start` `stop` `reload` `restart` `force-reload`. Wrapper: `service nginx start`.

**systemd** — PID 1: services + journald, logind, networkd.

**Unit locations** — `/usr/lib/systemd/system/` packages · `/run/systemd/system/` runtime · `/etc/systemd/system/` admin.

**Unit types** — `.service` `.socket` `.device` `.mount` `.automount` `.swap` `.target` `.path` `.timer` `.snapshot` `.slice` `.scope`

**`[Unit]`** — `Description` · `Requires` hard · `Wants` soft · `BindsTo` · `PartOf` · `Conflicts` · `Before`/`After`

**`[Service]`** — `Type=` · `ExecStart=` · `ExecStop=` · `User=` · `PIDFile=`

**`[Install]`** — `WantedBy=` for `enable` (usually `multi-user.target`).

**`systemctl`** — `start`/`stop`/`restart`/`reload` **now** · `enable`/`disable` **boot** · `daemon-reload` after unit edits.

```bash
/etc/init.d/nginx start          # SysV script: start now
service nginx start              # SysV wrapper for the same
systemctl start name.service     # start now
systemctl stop name.service      # stop now
systemctl restart name.service   # stop then start
systemctl reload name.service    # reread config if the unit supports it
systemctl status name.service    # running? recent logs?
systemctl is-active name.service # exit 0 if active
systemctl enable name.service    # start at boot
systemctl disable name.service   # do not start at boot
systemctl daemon-reload          # after you edit a unit file
```

**cron** — Matches jobs **each minute**. User tables: RH `/var/spool/cron/` · Debian `/var/spool/cron/crontabs/`. Also `/etc/crontab`, `/etc/cron.d/` (extra **username** field), `/etc/anacrontab` (catch-up if powered off), `/etc/cron.{hourly,daily,weekly,monthly}/`. Mail to owner or `MAILTO`. Edit: `crontab -e` (`-u user`).

**Crontab fields** — min 0–59 · hour 0–23 · dom 1–31 · month 1–12 or `jan` · dow 0–7 (`0`/`7`=Sun). `*` all · `5,17` list · `*/10` step. Grain = 1 minute (`sleep 30` for sub-minute).

```bash
crontab -e               # edit this user’s crontab
crontab -u username -e   # edit someone else’s (needs privilege)
# 0 2 * * * /bin/sh backup.sh                         # 02:00 every day
# 0 5,17 * * * /scripts/script.sh                     # 05:00 and 17:00
# */10 * * * * /scripts/monitor.sh                    # every 10 minutes
# 0 2 * * sun [ $(date +%d) -le 07 ] && /script.sh    # first Sunday at 02:00
# * * * * * sleep 30; /scripts/script.sh              # same job 30s later
```

---

## 4. Users, DAC, SELinux

**Account** — Name + **UID**. Kernel uses the number. UID 0 = root. People often ≥1000 (older RH ≥500).

**`/etc/passwd`** — `name:password:UID:GID:GECOS:home:shell`. Password `x` → hash in `/etc/shadow`. GID = **primary**. `/usr/sbin/nologin` or `/bin/false` = no login. Root home often `/root`.

**`/etc/shadow`** — Root-only: hash, lock (`*`/`!`), aging, expiry. Expiry is **not** in passwd.  
`chage -l user` · `usermod -e YYYY-MM-DD`

**`/etc/group`** — `name:password:GID:user1,user2`. GID 0 = root group. Comma list = **supplementary** only. Primary GID from passwd may **not** appear on the group line. Hash (rare) in `/etc/gshadow`.

**`su`** — Become that user; **their** password (root can su down without it). `su -` = login env.

**`sudo`** — Run as other (usually root); **your** password if sudoers allows. `sudo su` = root shell without root’s password.

**`usermod -aG`** — **append** extras. `-G` alone **replaces** them.

```bash
cat /etc/passwd                              # users: name:x:UID:GID:comment:home:shell
cat /etc/group                               # groups: name:x:GID:user,user
cat /etc/shadow                              # hashes and expiry (root only)
id                                           # UID, primary GID, all groups
id -u                                        # numeric UID
id -g                                        # primary GID
id -G                                        # all GIDs
groups                                       # group names of current user
chage -l user                                # aging / account expiry
su - user                                    # switch user, login env (their password)
su                                           # become root (root’s password)
sudo ifconfig                                # one command as root (your password)
sudo su                                      # root shell without root’s password
useradd -d /home/mydir -s /bin/bash user1    # create user with home and shell
userdel user                                 # delete account, leave home
userdel -r tester                            # delete account AND home
usermod -d /home/newhome user                # change home path
usermod -l newname oldname                   # rename login (UID/files unchanged)
usermod -s /bin/bash user                    # change login shell
usermod -e YYYY-MM-DD user                   # account expiration date
usermod -aG docker nika                      # append extra group (-G alone replaces)
passwd                                       # change password
finger user                                  # login name, home, shell
groupadd mytestgroup                         # create group
groupdel mytestgroup                         # delete group
groupmod -n newname oldname                  # rename group (GID unchanged)
gpasswd -a user group                        # add supplementary member
```

**DAC** — Owner / group / other × `r w x`. `ls -l` type: `-` file `d` dir `l` symlink.  
File: r read, w write, x execute. Dir: r list, x enter (`cd`), w create/delete (**needs x**).

**Octal** — r=4 w=2 x=1. `755` `644` `700`. Symbolic: `u/g/o/a` `+-=`.

**SUID / SGID / sticky** — Extra digit: **4** SUID (`s` on owner x — run as **file owner**; ignored on scripts) · **2** SGID (`s` on group x; dirs: new files inherit dir group) · **1** sticky (`t` on other x — `/tmp`: delete only own files).  
`chmod 4755` · `2555` · `1777` / `chmod +t`

**ext attributes** — `lsattr` · `chattr +i` immutable · `+A` no atime · `+a` append-only · `+s` zero on delete (if FS honors).

```bash
ls -l                  # type + rwx for owner/group/other, owner, group
chown user:group path  # set owner and group
chown -R user path     # same, recursive
chgrp group path       # set group only
chmod 755 file         # rwxr-xr-x (7=rwx, 5=r-x, 5=r-x)
chmod g=rw file        # group exactly read+write (clears group x)
chmod +x script.sh     # add execute
chmod +t dir           # sticky: in a shared dir, delete only your own files
chmod 4555 file        # SUID — run as file owner (binaries, not scripts)
chmod 2555 dir         # SGID — new files inherit this directory’s group
chmod 1777 /tmp        # sticky + world rwx (typical /tmp)
lsattr                 # list ext attributes
chattr +i file         # immutable — no edit/delete until unlocked
chattr -i file         # drop immutable
chattr +a file         # append-only
```

**SELinux** — MAC on top of DAC (labels, not only owner bits).  
**Enforcing** block+log · **Permissive** allow+log · **Disabled** off.  
Config `/etc/selinux/config`: `SELINUX=` · `SELINUXTYPE=targeted|minimum|mls`. Enable/disable needs **reboot**. `setenforce 1|0` only if already enabled. `-P` on `setsebool` = persist.

```bash
getenforce                       # Enforcing | Permissive | Disabled now
sestatus                         # longer status (policy, mode, config)
setenforce 1                     # enforcing now (only if already enabled)
setenforce 0                     # permissive now — log, do not deny
cat /etc/selinux/config          # boot default (reboot to apply)
semodule -l                      # policy modules in memory
getsebool ftpd_anon_write        # read one boolean
setsebool ftpd_anon_write on     # on until reboot
setsebool -P ftpd_anon_write on  # persist across reboot
semanage boolean -l              # catalog of on/off policy switches
```

---

## 5. Network and remote access

**Interface** — `eth0` / `ens9` / `lo`. Runtime `ip` or legacy `ifconfig`. Reboot loses runtime adds. Several IPs per NIC OK.

**CIDR** — `/24` = `255.255.255.0`

**Routes** — `ip route add … via …`. Default: `default via … metric …` (lower metric wins). RH: put `GATEWAY=` on the NIC `ifcfg-*` file.

**Persist** — RH: `/etc/sysconfig/network-scripts/ifcfg-ethX` (`DEVICE` `IPADDR` `GATEWAY` `ONBOOT` `BOOTPROTO`) · `/etc/sysconfig/network`. Debian: `/etc/network/interfaces` · `/etc/hostname`. Both: `/etc/resolv.conf`.

**NSS** — `/etc/nsswitch.conf` order (`files` `dns` `nis` `ldap` `db`).

```bash
ifconfig                                              # interfaces that are up
ifconfig -a                                           # all interfaces, including down
ifconfig eth0 up                                      # bring the NIC up
ip address add 192.168.2.223/24 dev eth1              # add a static IPv4 (runtime)
ip addr show dev eth1                                 # addresses on eth1
ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0       # network route via gateway
ip route                                              # routing table (look for default)
cat /etc/sysconfig/network-scripts/ifcfg-eth0         # RHEL persist: IP, GATEWAY, ONBOOT
cat /etc/network/interfaces                           # Debian persist
cat /etc/resolv.conf                                  # DNS nameservers
cat /etc/nsswitch.conf                                # search order: files / dns / …
```

**Reachability** — `ping` ICMP · `traceroute` · `tracepath` (often no root).

**DNS** — `host` · `dig` (`-x` PTR) · `nslookup`. Non-authoritative = cache. Reverse: `in-addr.arpa`.

**Sockets** — `netstat -ant` / `-nlpt` (listen, numeric, PID). Modern: `ss`.

**`whois`** — Registration. **`tcpdump`** — Capture; `host` `port` `src` `dst` `and`/`or`; `-w file`.

```bash
ping -c 5 host                                       # ICMP; stop after 5
traceroute host                                      # hop-by-hop path
tracepath host                                       # same idea; often no root
host name                                            # short DNS: name → IP
dig name                                             # DNS with full answer
dig -x 1.2.3.4                                       # reverse lookup (PTR)
nslookup name                                        # DNS via your resolver
netstat -ant                                         # all TCP, numeric
sudo netstat -nlpt                                   # listening TCP + PID
whois example.com                                    # registrar record, not DNS A
tcpdump -i eth0                                      # packets on that NIC
tcpdump port 80 -w capture_file                      # port 80; write pcap
tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'     # filter: from IP and RDP or SSH
```

**firewalld** — Zones. **Runtime** vs `--permanent` then `--reload`. Programs **netfilter**. Does not flush the whole table each change. Admin XML `/etc/firewalld/` overrides `/usr/lib/firewalld/`.

**Zones** — `drop` silent · `block` ICMP reject · `public` untrusted, few services (often SSH, default) · `external` WAN+NAT · `internal` LAN of gateway · `dmz` isolated public hosts · `work`/`home` more trusted · `trusted` almost open.

**firewall-cmd** — Named services. `--panic-on` drop all (can lock SSH). Forward-port needs masquerade.

```bash
firewall-cmd --get-services                                           # named services you can allow
firewall-cmd --info-service=ftp                                       # ports/helpers for that service
firewall-cmd --panic-on                                               # drop ALL packets (can lock SSH)
firewall-cmd --panic-off                                              # leave panic mode
firewall-cmd --zone=external --add-masquerade                         # NAT now (runtime)
firewall-cmd --zone=external --add-masquerade --permanent             # persist; still need --reload
firewall-cmd --reload                                                 # load permanent into runtime
firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753  # 22 → 3753; needs masquerade
```

**Console vs remote** — Console for recovery. Telnet = cleartext. SSH = encrypted shell/files/forwarding. WinSCP = Windows SFTP/SCP GUI. X11 = one app window; VNC = whole desktop.

**SSH keys** — `ssh-keygen -t rsa` → `~/.ssh/id_rsa` (**600**) + `id_rsa.pub` → remote `authorized_keys`.  
Client: `-i` key · `-l` user · `-p` port · `-t` force tty · `-v` debug · `-N` no remote command.

**`sshd_config`** — `PermitRootLogin` off by default. Restart `sshd`; keep a console. Prefer user + sudo.

**`scp`** — Remote `host:path`. Port is **`-P`** (ssh is `-p`).

**Bastion** — `ProxyCommand ssh -W %h:%p jump@bastion`. `~/.ssh/config`: `Host` `HostName` `User` `Port` `IdentityFile`.

**SFTP** — Files over SSH (22). FTP unencrypted. Jail: `Match User` · `ForceCommand internal-sftp` · `ChrootDirectory` · no tunnel/forward/X11.

```bash
ssh-keygen -t rsa                          # create id_rsa + id_rsa.pub
chmod 600 ~/.ssh/id_rsa                    # private key must not be world-readable
ssh -i key -l user -p 22 host              # key, user, port (ssh port is -p)
ssh -v user@host                           # verbose — debug auth
ssh -N -L 8080:localhost:80 user@host      # no remote command; local port forward
ssh -t user@host sudo ls /root             # force tty so sudo works
ssh user@host whoami                       # run one command remotely
scp file user@host:/folder                 # copy file over SSH
scp -P 22 file user@host:/folder           # scp port is -P
sftp user@host                             # interactive files over SSH
systemctl restart sshd                     # apply sshd_config
```

---

## 6. Processes, CPU, memory, storage, logs

**Process / PID** — Running program; address it by PID.

**`top`** — Live. `q` quit · `P` CPU · `M` mem · `k` kill.

**`ps aux`** — Snapshot: `a` all users · `u` user columns · `x` no TTY (daemons).

**Signals** — `kill PID` = SIGTERM **15** (clean). `kill -9` / `-KILL` = SIGKILL, no catch. Only root kills others’ processes. `killall name` = every match.

```bash
top              # live process list; q quit, P CPU, M mem, k kill
ps aux           # snapshot: all users, user columns, including daemons
kill 156         # SIGTERM 15 — ask PID to exit cleanly
kill -9 156      # SIGKILL — force; cannot be caught
killall top      # SIGTERM every process named top
killall -9 top   # SIGKILL by name
```

**`lscpu`** — Logical `CPU(s)` ≈ sockets × cores × threads. `Thread(s) per core` 2 = SMT.

**`mpstat` / `sar`** — Per-CPU %. No interval = **since boot**. `-P ALL` every CPU + `all`. `sar` history `/var/log/sa/`.

**CPU %** — `%usr` user · `%nice` niced · `%sys` kernel · `%iowait` idle waiting I/O (storage, not “need CPU”) · `%irq`/`%soft` · `%steal` hypervisor · `%guest` KVM · `%idle`.

```bash
lscpu                 # sockets, cores, threads, NUMA
mpstat -P ALL         # per-CPU %; no interval = since boot
mpstat -P ALL 1 5     # every 1s, 5 samples
sar -P ALL 1 1        # per-CPU; interval 1s, 1 sample
```

**`free -h`** — Trust **`available`**. `buff/cache` is reclaimable. Low `free` + high cache is normal. Worry: tiny available + swap climbing.

**`vmstat`** — `r` CPU queue · `b` I/O block · `si`/`so` swap (sustained `so` = RAM pressure) · `bi`/`bo` disk · CPU `us sy id wa st`. First line often since-boot if you pass an interval.

```bash
free -h          # RAM/swap; trust available
vmstat -a        # queues, RAM, swap in/out, I/O, CPU
vmstat -w 1 3    # wide; every 1s, 3 samples
vmstat -s        # summary counters
vmstat -f        # forks since boot
```

**`df -h`** — Space **per mount**. Does not say **which directory**.

**`du -sh`** — Usage inside a tree. Drill `/*` then `/var/*`.

**Deleted but still open** — Space not freed until close → `lsof`.

**`lsof`** — Open files. Path · `-c cmd` · `-i` network.

**`iostat`** — Device I/O (`sysstat`). No interval = since boot. `dm-0` = mapper/LVM.

```bash
df -h               # space per mount (not which directory)
du -sh /etc/*       # usage inside each /etc entry
lsof | less         # all open files
lsof -c sshd        # open files for commands named sshd
lsof -i             # network sockets
vmstat -d           # per-disk read/write
vmstat -p sda2      # stats for one partition
iostat -t           # I/O + timestamp + CPU + devices
iostat -d           # device I/O only
iostat -d 1 5       # devices every 1s, 5 samples
```

**Three log planes** — Kernel ring **`dmesg`** · systemd **journal** · text **`/var/log`**.

**`dmesg`** — Kernel buffer (boot, drivers, OOM). **Not** `/var/log/messages`. Fixed size, old lines drop. `-T` wall clock.

**`journalctl`** — Not `tail`able; use `journalctl -f`. `-u` unit · `-p err` · `-b` this boot · `-b -1` previous · `-x` explain · `-t` ident · `--since` / `--until`.

**Text logs** — RH `messages` + `secure` · Debian `syslog` + `auth.log` · `cron` · `maillog`/`mail.log` · `/var/log/sa/` (`sar`).

```bash
dmesg -T                           # kernel ring buffer, wall-clock time
journalctl -f                      # follow the journal (not tail)
journalctl -u httpd                # one systemd unit
journalctl -p err -b -x            # error+ ; this boot ; extra explain
journalctl -t dockerd              # syslog identifier
journalctl --since "1 hour ago"    # time window
journalctl -b -1                   # previous boot
```
