# Linux theory — concept · definition · example

No hooks, no repeats. One idea once.

---

## 1. Intro

**Shell** — Program between the user and the kernel; interprets commands and asks the kernel to run them.  
`User → bash/sh → Kernel → Hardware`

**Bourne `sh`** — Original Unix shell; many scripts still use `#!/bin/sh`.  
`/bin/sh` · prompt `$` / `#`

**C shell `csh`** — Syntax closer to C.  
`/bin/csh` · prompt `%` / `#`

**Korn `ksh`** — Bourne-compatible with extras.  
`/bin/ksh` · `$` / `#`

**Bash** — Default interactive Linux shell: Bourne plus history, completion, scripting.  
`/bin/bash`

**`/bin/sh` on Linux** — Often a symlink to bash or dash, still more POSIX/Bourne.  
`/bin/sh → bash` or `dash`

**Login shell field** — Last field of the user line in `/etc/passwd`.  
`/etc/passwd`

**`$SHELL` vs `$0`** — Login shell vs this process’s shell.  
`echo $SHELL` · `echo $0`

**File system** — How the OS names and stores data on disk.  
Linux: `ext2/3/4`, XFS, Btrfs, ReiserFS

**Linux tree** — One hierarchy from `/`; extra disks are mounted on directories, not drive letters.  
`/` · mount at `/mnt/data` or `/home`

**Linux names** — No required extension; type is content + permissions.  
`chmod +x` + `#!/bin/bash`

**Windows files** — Drive letters; behavior follows extension.  
`C:` · `.exe` / `.txt` / `.dll` · NTFS, FAT16, FAT32

**Inode** — File-system object (file or directory): metadata, owner/mode, data blocks. The **name is not in the inode**.  
Directory = names → inode numbers (`.`, `..`, children)

**Link count** — How many directory entries point at the inode. Data can be freed when it hits 0 and nothing has the file open.  
`ls -l` link-count column

**Hard link** — Another name for the **same inode**. Cannot cross file systems; cannot (generally) link directories. Changes and remaining names survive.  
`ln original.txt another-name.txt`

**Symbolic link** — Own inode; stores a **path**. Can cross file systems and point at directories. Target moved/removed → dangling. Deleting the link does not delete the target.  
`ln -s /var/www/html/current /srv/app`

**LVM** — Pool disks, then slice resizable logical volumes (online create/resize/delete; snapshots; live migration). Linux-only extra layer vs plain partitions.  
`disk → pvcreate → VG → lvcreate → mkfs + mount`

**PV** — Disk or partition labeled for LVM.  
`pvcreate /dev/sdb1` · `pvscan` · `pvdisplay`

**VG** — Pool of one or more PVs.  
`vgcreate vg_newlvm /dev/sdb1 /dev/sdc1`

**LV** — Slice of a VG, a block device.  
`lvcreate --name centos7_newvol -l 100%FREE vg_newlvm`  
`-L 2G` · paths `/dev/vg/lv` and `/dev/mapper/vg-lv`

**`mkfs` on LV** — LVM only gives a device; you format then mount; persist in `/etc/fstab`.  
`mkfs.ext4 /dev/vg_newlvm/centos7_newvol`

**Swap** — Disk overflow for inactive RAM pages; slower than RAM. Not on Btrfs. Partition (RHEL preferred, contiguous HDD) and/or file (`/swapfile`).  
`free -h` · `cat /proc/swaps`

**Swappiness** — 0–100, default 60: swap app pages vs drop page cache. Low → keep apps in RAM; high → more swap, possible latency.  
`/proc/sys/vm/swappiness`

**RHEL 7 swap size (RAM → recommended / hibernation)** — ≤2 GB: 2× / 3×; 2–8 GB: 1× / 2×; 8–64 GB: ≥4 GB / 1.5×; >64 GB: ≥4 GB / hibernation not recommended. Huge-RAM rule of thumb ~20% of RAM. Hibernation needs swap ≥ RAM.

**Make/use swap** — LV or file: `mkswap` (not `mkfs`); fstab type `swap`; `daemon-reload`; `swapon`. File: `dd` zeros, `chmod 0600`. Remove: `swapoff` first, then fstab, reload, `rm`. Never delete an active swap file.  
`mkswap /dev/VolGroup00/LogVol02`  
`/dev/VolGroup00/LogVol02 swap swap defaults 0 0`  
`dd if=/dev/zero of=/swapfile bs=1024 count=65536`

**Disk quotas** — Cap user/group **blocks** (space) and **inodes** (file count). Soft = warning + grace; hard = cannot exceed. Enable `usrquota`/`grpquota` in fstab.  
`quotacheck` · `quotaon` · `edquota`/`setquota` · `repquota`/`quota`

**Boot chain** — Power-off: OS on disk. Power-on: empty RAM → firmware (BIOS/UEFI) → boot loader → kernel → init/systemd → user space.  
`Firmware → GRUB → Kernel → systemd`

**LILO** — Older Linux loader; weaker than GRUB, originally no GUI menu.

**GRUB** — Modern boot loader: CLI, network boot, MD5 passwords. Classic config `/boot/grub/grub.conf`, often `/etc/grub.conf` symlink. GRUB2: `/boot/grub2/grub.cfg` (or EFI path).

**Runlevel** — Machine state after boot (SysV: one at a time). Default usually 3–5.  
`0` halt · `1` single-user · `3` multi-user text+net · `4` unused/custom · `5` GUI · `6` reboot

**`/etc/rc[0-6].d/`** — `Knn` stop, `Snn` start; `nn` is order.  
`K20nfs` · `S10network` → `../init.d/…`

**`/etc/inittab`** — SysV default runlevel.  
`id:3:initdefault:`

**systemd targets (vs runlevels)** — Replaces runlevels; old names are compat symlinks.  
`runlevel0` → `poweroff.target` · `1` → `rescue.target` · `3` → `multi-user.target` · `5` → `graphical.target` · `6` → `reboot.target` · `emergency.target` (more minimal than rescue)

**Default / switch target** —  
`systemctl get-default` · `set-default multi-user.target` · `isolate multi-user.target` (now, not the default)

---

## 2. Shell basics

**Startup files** — Which scripts run depends on **how** the shell started.

**Interactive** — You can type at a prompt.

**Login shell** — After auth, or `bash --login` (SSH, TTY, `su -`). Reads `/etc/profile` then the **first readable** of `~/.bash_profile`, `~/.bash_login`, `~/.profile`. Logout: `~/.bash_logout`. Those files typically set `PATH`, `umask`, exported env.

**Interactive non-login** — Already logged in (desktop terminal). Reads **only** `~/.bashrc` (aliases, functions, `PS1`). Login shells do **not** read `.bashrc` unless `.bash_profile` sources it:  
`if [ -f ~/.bashrc ]; then . ~/.bashrc; fi`

**Detect login shell** — `$0` often `-bash`; `shopt login_shell` → `on`/`off`.

**Shell script** — Commands in a file; shell **interprets** line by line (not a compiler). Debug: `echo`, run lines, `bash -x script.sh`.

**When not to use shell** — Heavy CPU (sort/hash/recursion), typed structured apps, mission-critical/security products, real data structures, GUIs, libraries/legacy, closed source (the file **is** the source).

**Variable** — `KEY=value`, no spaces around `=`, case-sensitive, env often `UPPER_CASE`. Multi-path: `value1:value2`. Shell-only until `export` (then children inherit).  
`MYLOCAL=hello` · `export MYLOCAL`

**Common env** — `USER`/`LOGNAME` · `HOME` · `EDITOR` · `SHELL` · `PATH` (first match wins) · `LANG` · `TERM` · `MAIL`

**List env / shell vars** — `env` / `printenv` (exported). `set` (shell + env + functions). `unset NAME`. `env VAR=tmp ./myscript` runs one command without changing this shell.

**Editors** — `vi`/`vim` always there; `nano` easier. Tools use `$EDITOR`/`$VISUAL` (`visudo`, `crontab -e`, `git commit`).  
`export EDITOR=vim` · `vimtutor`

**Vim modes** — Command (default, `Esc`): motions/commands. Insert (`i`/`a`/`o`/`O`): type text. Last-line (`:`): `:w` `:q` `:wq`/`:x` `:q!` `:set number` `:n` `:!command`.

**Vim motion** — `h j k l` · `w`/`b` · `0`/`$` · `gg`/`G` · `Ctrl-u`/`Ctrl-d`

**Vim edit** — `x` · `dd` · `dw` · `yy` · `p`/`P` · `u` · `Ctrl-r`

**Vim search** — `/pattern` · `?pattern` · `n`/`N`

**nano** — Modeless. `^K` cut line · `^U` paste · `M-6` copy · `^O` save · `^X` quit · `^W` search

**`visudo`** — Only safe edit of `/etc/sudoers` (syntax check). Ubuntu often opens nano.

**`man`** — Manual. Optional section; `-k` keyword (`apropos`); `-f` one-liner (`whatis`). Navigate like `less`.  
`man cat` · `man 5 passwd` · `man -k list`  
Sections: `1` user cmds · `2` syscalls · `3` library · `5` formats · `8` admin

**`info`** — GNU hyperlinked pages; try `man` first.

**`ls`** — `-la` long + dots · `-lh` human sizes · `-lt` newest · `-lSh` largest. Names starting `.` hidden from plain `ls`.

**`pwd` / `cd`** — Print cwd; change dir. Bare `cd` or `cd ~` → `$HOME`. `cd /` root · `cd ..` parent · `cd -` previous (prints it). `$CDPATH` like `PATH` for `cd` (`:`-separated; empty slot = `.`); ignored if dest starts with `/`.

**`touch`** — Create empty or update mtime. `-d`/`--date` parsed time.  
`touch -d "next Friday" newfile.txt`

**`mkdir`** — `-p` parents, no error if exist · `-m` mode like chmod. Brace: `mkdir -p dir/test{1..3}/empty`

**`cp`** — `-r`/`-R` dirs · `-p` preserve mode,owner,time · `-i` prompt overwrite

**`mv`** — Move/rename. `-i` · `--backup` · `-S` suffix (default `~`) · `-u` if source newer or dest missing

**`cat`** — Show or concatenate.  
`cat 1.txt 2.txt > 3.txt`

**`rmdir`** — Empty directory only. **`rm`** — files; `-r` trees; `-f` no prompt; `-v` names. **`shred`** — stronger overwrite than `rm`.

**Pagers** — `more` forward only. `less` both ways (`/pattern` `?pattern` `n`/`N`).

**`head`/`tail`** — Default 10 lines. `head -n K` / `head -n -K` (drop last K). `tail -n K` / `tail -n +K` (from line K). `tail -f` follow.

**`find`** — Live tree: `find [path…] [expression]`. `-name` basename (quote globs) · `-user` · `-type f`/`d` · `-exec cmd {} \;` · also `-mtime` `-size` `-perm` `-maxdepth`.  
`find /tmp -name core -type f -exec rm {} \;`

**`locate`** — Name search via DB `/var/lib/mlocate/mlocate.db` (stale until `updatedb`).

**`grep`** — Lines matching a regex. `-r` recursive · `-i` case · `-n` line numbers.  
`grep -r "fun" ~`

**`xargs`** — Stdin tokens → command args; default command `/bin/echo`; default **one** invocation with all args. `-I {}` (or `-i`) once per item · `-0` NUL (with `find -print0`) · `-P N` parallel (`0` = as many as possible).  
`find /tmp -name core -type f -print0 | xargs -0 rm`

**`zip`/`unzip`** — ZIP; `-r` recursive · `-p` store given relative paths.  
`zip -rp archive.zip /path/to/`

**`tar`** — Bundle; compression optional. `-c` create · `-x` extract · `-t` list · `-v` names · `-f` archive (**last** in the flag cluster) · `-z` gzip. `-` as archive = stdout/stdin.  
`tar -cvzf a.tar.gz path/`  
`tar cf - dir1 | (cd dir2 && tar xf -)`  
`ssh h1 "cd src && tar -cf - ." | ssh h2 "cd dst && tar -xf -"`

**`gzip`** — One stream/file. Default `gzip file` **replaces** with `file.gz` (`-k` keep). `-c` stdout. Append members `>>` works; one `cat a b | gzip` compresses better. `zcat`/`gunzip -c` print; `zgrep` search `.gz`.

---

## 3. Packages, services, cron

**Package** — Archived software a manager can install (deps included at high level).

**Red Hat** — `*.rpm` · low `rpm` · high `yum` / newer `dnf`.  
`rpm -i foo.rpm`

**Debian** — `*.deb` · low `dpkg` · high `apt` (`apt-get`, `apt-cache`).  
`dpkg -i foo.deb` · *yum is to rpm as apt is to dpkg*

**`apt-get`** — `update` lists · `upgrade` installed · `install` **name** not `.deb` · `remove` keep conf · `purge` drop conf · `check` broken deps.

**`apt-cache`** — Query lists: `search` · `show` · `showpkg` · `depends`.

**APT sources** — `/etc/apt/sources.list` + `/etc/apt/sources.list.d/*.list`. `deb` binaries / `deb-src` source; release (`buster`); `main contrib non-free`; security/updates/backports.

**`alternatives`** — Managed symlink so one public name has many implementations (Debian: `update-alternatives`).  
`--install link name path priority` · `--remove` · `--set` (manual) · `--auto` (highest priority) · `--display` · `--config` (menu). `--slave` extra links that follow. Menu: `*` current, `+` auto choice.  
`alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5`

**SysV `init.d`** — Scripts in `/etc/init.d/`: `start` `stop` `reload` `restart` `force-reload`. Wrapper: `service nginx start`. Typical `case "$1"`; unknown → usage, exit 1.

**systemd** — PID 1 service manager + units. Also journald, logind, networkd. System vs user instance (`system.conf` / `user.conf`).

**Unit locations** — `/usr/lib/systemd/system/` packages · `/run/systemd/system/` runtime · `/etc/systemd/system/` admin.

**Unit types** — `.service` `.socket` `.device` `.mount` `.automount` `.swap` `.target` `.path` `.timer` `.snapshot` `.slice` `.scope`

**`[Unit]`** — `Description` · `Requires` (hard) · `Wants` (soft) · `BindsTo` · `PartOf` · `Conflicts` · `Before`/`After`  
`After=network.target`

**`[Service]`** — `Type=` (e.g. `forking`) · `ExecStart=` · `ExecStop=` · `User=` · `PIDFile=`

**`[Install]`** — `WantedBy=` for `enable`.  
`WantedBy=multi-user.target`

**`systemctl`** — `start`/`stop`/`restart`/`reload` now · `status`/`is-active` · `enable`/`disable` boot · `daemon-reload` after unit edits.

**cron** — Daemon matches jobs **each minute**. User tables: RH `/var/spool/cron/` · Debian `/var/spool/cron/crontabs/`. Also `/etc/crontab`, `/etc/cron.d/` (extra **username** field), `/etc/anacrontab` (catch-up if powered off), `/etc/cron.{hourly,daily,weekly,monthly}/`. Output mailed to owner or `MAILTO`. Edit: `crontab -e` (`-u user`).

**Crontab fields** — min 0–59 · hour 0–23 · dom 1–31 · month 1–12 or `jan` · dow 0–7 (`0`/`7`=Sun) or `sun`. Tokens: `*` all · `5,17` list · `*/10` step. Grain = 1 minute (`sleep 30` for sub-minute). First Sunday: `0 2 * * sun [ $(date +%d) -le 07 ] && /script.sh`

---

## 4. Users, DAC, SELinux

**Account** — Name + **UID** (kernel identity). UID 0 = root. Low UIDs = system; people often ≥1000 (older RH ≥500).

**`/etc/passwd`** — `name:password:UID:GID:GECOS:home:shell`. Password usually `x` (hash in `/etc/shadow`). GID = primary group. Shell `/usr/sbin/nologin` or `/bin/false` = no login. Root home often `/root`.

**`/etc/shadow`** — Root-only: hash, lock (`*`/`!`), aging, expiry.  
`chage -l user` · `usermod -e YYYY-MM-DD`

**`/etc/group`** — `name:password:GID:user1,user2`. GID 0 = root group. Password empty/`x`; rare hash in `/etc/gshadow`. Comma list = **supplementary** members. Primary GID from passwd may not appear on the group line.

**`su`** — Become another user; **their** password (root can su down without it). `su - user` = login env.

**`sudo`** — Run as other (usually root); **your** password if sudoers allows. `sudo su` = root shell without root’s password.

**Account tools** — `useradd`/`usermod`/`userdel` (`-r` drops home) · `passwd` · `finger` · `groupadd`/`groupmod`/`groupdel` · `groups`/`id` (`-g` primary, `-G` all). `usermod -aG` **append** extras (`-G` alone **replaces** them).  
`useradd -d /home/mydir -s /bin/bash user1`

**DAC** — Owner / group / other × `r w x`. `ls -l` type: `-` file `d` dir `l` symlink. File: r read, w write, x execute. Dir: r list, x enter (`cd`), w create/delete (needs x).  
`-rwxr-x--- 1 nika staff backup.sh`

**`chown` / `chgrp`** — Owner (root to give away) · group · `chown user:group path`

**Octal** — r=4 w=2 x=1; three digits u,g,o. `755` `644` `700`. `chmod 755` or symbolic `u/g/o/a` `+-=`.  
`chmod g=rw test.t`

**SUID / SGID / sticky** — Extra octal digit: **4** SUID (`s` on owner x — run as **file owner**; ignored on scripts) · **2** SGID (`s` on group x — eGID; dirs: new files inherit dir group) · **1** sticky (`t` on other x — `/tmp`: delete only own files).  
`chmod 4755` · `2555` · `1777` / `chmod +t`

**ext attributes** — `lsattr` · `chattr +i` immutable · `+A` no atime · `+a` append-only · `+s` zero on delete (if FS honors)

**SELinux** — MAC on top of DAC (policy labels, not only owner bits). Modes: **Enforcing** block+log · **Permissive** allow+log · **Disabled** off.  
`getenforce` · `sestatus` · `/etc/selinux/config` (`SELINUX=` · `SELINUXTYPE=targeted|minimum|mls`) · RH symlink `/etc/sysconfig/selinux`. Enable/disable needs reboot. `setenforce 1|0` only if already enabled.

**Policy knobs** — `semodule -l` modules · `getsebool` / `semanage boolean -l` · `setsebool [-P] name on` (`-P` persistent)

---

## 5. Network and remote access

**Interface** — `eth0`/`ens9`/`lo`. Runtime: `ifconfig` (legacy, `-a` includes down) or `ip`. Persist or reboot loses runtime adds.  
`ip address add 192.168.2.223/24 dev eth1` (several IPs per NIC OK)

**CIDR** — `/24` = `255.255.255.0`

**Routes** — `ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0`. Default: `default via … metric …` (lower metric wins). RH: last `GATEWAY=` among `/etc/sysconfig/network` then numeric `ifcfg-*` wins — put gateway on the NIC file.

**Persist** — RH: `/etc/sysconfig/network-scripts/ifcfg-ethX` (`DEVICE` `IPADDR` `GATEWAY` `ONBOOT` `BOOTPROTO`) · `/etc/sysconfig/network`. Debian: `/etc/network/interfaces` · `/etc/hostname`. Both: `/etc/resolv.conf` nameservers.

**NSS** — `/etc/nsswitch.conf` order of sources (`files` `dns` `nis` `ldap` `db`).  
`hosts: dns nis files`

**Reachability / path** — `ping -c 5 host` (ICMP) · `traceroute` · `tracepath` (often no root)

**DNS tools** — `host` · `dig` (`-x` PTR) · `nslookup`. Non-authoritative = cache. Reverse: `in-addr.arpa`.

**Sockets** — `netstat -ant` / `-nlpt` (listen, numeric, PID; root for others). Modern: `ss`.

**`whois`** — Registration record. **`tcpdump`** — Capture; filter `host` `port` `src` `dst` `and`/`or`; `-w file`.  
`tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'`

**firewalld** — Zone-based; **runtime** vs **`--permanent`** then `--reload`. Programs **netfilter**. Unlike iptables-service, does not flush the whole table each change. XML: `/etc/firewalld/` overrides `/usr/lib/firewalld/`.

**Zones** — `drop` silent · `block` ICMP reject · `public` untrusted, few services (often SSH, default) · `external` WAN+NAT · `internal` LAN of gateway · `dmz` isolated public hosts · `work`/`home` more trusted · `trusted` almost open.

**firewall-cmd** — Named services (`--get-services`, `--info-service=ftp` ports+helpers). `--panic-on` drop all (can lock SSH). Masquerade on `external`. Forward-port needs masquerade:  
`--add-forward-port=port=22:proto=tcp:toport=3753`

**Console vs remote** — Keyboard/screen for recovery. Telnet = cleartext. SSH = encrypted shell/files/forwarding. WinSCP = Windows SFTP/SCP GUI. X11 = one app window; VNC = whole desktop.

**SSH keys** — `ssh-keygen -t rsa` → `~/.ssh/id_rsa` (mode **600**) + `id_rsa.pub` → remote `authorized_keys` (append). Fingerprint identifies the key.  
`ssh -i key -l user` / `user@host` · `-p` port · `-t` force tty · `-v` debug · `-N` no remote command (tunnels)

**`sshd_config`** — Server: `PermitRootLogin` (root SSH off by default), SFTP jail. Restart `sshd`; keep console. Prefer user + sudo.

**`scp`** — Same auth as ssh; remote `host:path`. Port is **`-P`**. Remote command: `ssh user@host whoami`.

**Bastion** — Jump to private hosts.  
`ProxyCommand ssh -W %h:%p jump@bastion` · `~/.ssh/config` `Host` aliases (`HostName` `User` `Port` `IdentityFile`)

**SFTP** — File transfer over SSH (port 22). FTP unencrypted. Jail: `Match User` · `ForceCommand internal-sftp` · `ChrootDirectory` · no tunnel/forward/X11.

---

## 6. Processes, CPU, memory, storage, logs

**Process / PID** — Running program; address it by PID.

**`top`** — Live table (load + mem header). `q` quit · `P` CPU · `M` mem · `k` kill (PID + signal).

**`ps aux`** — Snapshot: `a` all users · `u` user columns · `x` no TTY (daemons). Columns USER PID %CPU %MEM STAT COMMAND.  
`ps aux | grep nginx`

**Signals** — `kill PID` = SIGTERM 15 (clean). `kill -9`/`-KILL` = SIGKILL, no catch/cleanup. Only root kills others’ processes. `killall name` all matches (`killall java` = every Java).

**`lscpu`** — Inventory: logical `CPU(s)` ≈ sockets × cores × threads; `Thread(s) per core` 2 = SMT; NUMA nodes.  
`CPU(s): 40` · 4×10×1 = 40

**`mpstat` / `sar`** — Per-CPU %. No interval = **since boot**. `-P ALL` every CPU + `all`. Sample: `mpstat -P ALL 1 5` · `sar -P ALL 1 1`. `sar` history `/var/log/sa/`.

**CPU % columns** — `%usr` user · `%nice` niced · `%sys` kernel · `%iowait` idle waiting I/O (storage, not “need CPU”) · `%irq`/`%soft` interrupts · `%steal` hypervisor took time · `%guest` KVM guest · `%idle` nothing to do.

**`free -h`** — `total` `used` `free` `shared` `buff/cache` (reclaimable, not waste) **`available`** (trust this). Low `free` + high cache is normal. Worry: tiny **available** and swap climbing.

**`vmstat`** — procs `r` (CPU queue) `b` (I/O block) · mem `swpd` `free` · `-a` `inact`/`active` · swap `si`/`so` (sustained `so` = RAM pressure) · `bi`/`bo` disk KB/s · `in`/`cs` interrupts/context-switch · CPU `us sy id wa st`. First line often since-boot if interval used. `-f` fork count · `-w` wide · `-s` counters · `-d` per-disk · `-p sda2` partition.

**`df -h`** — Space **per mount** (Size Used Avail Use% Mounted). High Use% (e.g. `/` 91%) is tight. Does not say **which directory**.

**`du -sh`** — Usage inside a tree; drill `du -sh /*` then `/var/*`. Deleted files still open do not free space until close → `lsof`.

**`lsof`** — Open files (Linux: many objects are files). Path · `-c cmd` · `-i` network. Root to see others.

**`iostat`** — Device I/O (`sysstat`). `-t` time+CPU+devices · `tps` · `kB_read/s` `kB_wrtn/s` (totals since boot if no interval) · `dm-0` mapper/LVM on `sda`. `-d` devices only · `iostat -d 1 5`.

**Three log planes** — Kernel ring **`dmesg`** · systemd **journal** · text **`/var/log`** (rsyslog/syslog-ng).

**`dmesg`** — Kernel buffer (boot, drivers, OOM, USB, disk); **not** `/var/log/messages`. Fixed size, old lines drop. `-T` wall clock. Check `Command line:` (root/LVM) and e820 RAM map.

**`journalctl`** — Query binary journals (`systemd-journald`; kernel, unit stdio, syslog, audit). Not `tail`able; use `journalctl -f`. `-u unit` · `-p err` (and worse) · `-b` this boot (`-b -1` previous) · `-x` explain · `-t ident` · `--since`/`--until`.

**Text logs** — `/var/log/messages` (RH general; Debian often `syslog`) · `secure` (RH auth/sshd) · `auth.log` (Debian auth) · `cron` · `maillog`/`mail.log`/`mail/` · `/var/log/sa/` sysstat `sar` archives.
