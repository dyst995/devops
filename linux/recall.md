# Daily Linux recall

Answer out loud or on paper. Do **not** open notes first. After a prompt, check that topic’s `theory-study.md`.

Do **one day** of the rotation every day. Sunday is mixed distinctions. Reset ticks when you start the day again.

| Day | Section |
| --- | --- |
| Monday | 1. Intro |
| Tuesday | 2. Shell basics |
| Wednesday | 3. Packages, services, cron |
| Thursday | 4. Users, DAC, SELinux |
| Friday | 5. Network and remote access |
| Saturday | 6. Processes, CPU, memory, storage, logs |
| Sunday | Mixed (hard pairs) |

---

## Monday — Intro

### Shell

- [ ] What sits between you and the kernel when you type a command?
- [ ] Name the four layers: user, shell, kernel, hardware — what does each do?
- [ ] What does `bash` stand for, and what older shell is it compatible with?
- [ ] Which prompt character means a regular user in `sh` / `ksh` / `bash`? Which means root?
- [ ] Which shell uses `%` for a normal user?
- [ ] How do you see the **login** shell vs the **current** shell process?

### File system

- [ ] How does Linux show extra disks compared with Windows drive letters?
- [ ] Does the kernel decide file type from the name / extension?
- [ ] What actually makes a script executable?

### Inodes and links

- [ ] What does an inode store, and what does it **not** store?
- [ ] When can the data of a file actually be deleted?
- [ ] Hard link: what does it point at? Same inode as the target?
- [ ] Soft link: what does it point at? Can it cross file systems?
- [ ] You delete the “original” name. What happens to a hard link? To a symlink?
- [ ] You move/rename the target. What happens to a hard link? To a symlink?
- [ ] Why are hard links on directories generally forbidden?
- [ ] Command for a hard link vs a symlink.

### LVM

- [ ] Recite the LVM stack: disks → ? → ? → ? → filesystem.
- [ ] Which three `*create` commands build PV, VG, LV?
- [ ] Which three `*display` / `*scan` families inspect them?
- [ ] Name three reasons to use LVM instead of raw partitions.
- [ ] Name two costs / reasons not to pile LVM on everything.
- [ ] After `lvcreate`, what two device paths typically appear?
- [ ] Does LVM format the filesystem for you? What do you run next?

### Swap

- [ ] What is swap, and why is it not a substitute for RAM?
- [ ] Which filesystem does **not** support swap?
- [ ] Partition vs file: which does Red Hat prefer, and why use a file anyway?
- [ ] Swappiness range, default, what “low” vs “high” prefers.
- [ ] RHEL 7 swap size: ≤2 GB RAM? 2–8 GB? 8–64 GB? >64 GB? (normal, not hibernate)
- [ ] Why does hibernation need more swap?
- [ ] Format a swap LV: `mkfs` or `mkswap`? fstab type?
- [ ] Swap file: how do you create the empty file, and which mode?
- [ ] Steps to **remove** a swap file. What must you never do while it is active?

### Disk quotas

- [ ] What two things can a quota cap, and why both?
- [ ] Soft limit vs hard limit.
- [ ] fstab flags to enable user / group quotas.
- [ ] Name the tools: check → turn on → edit → report.

### Boot loaders

- [ ] Recite the boot chain from power-on to user space.
- [ ] What job does the boot loader actually do?
- [ ] LILO vs GRUB: which is modern, and what extra features does GRUB have?
- [ ] Classic GRUB config paths the course wants.

### Runlevels and targets

- [ ] What is a runlevel?
- [ ] Recite SysV 0, 1, 3, 4, 5, 6.
- [ ] In `/etc/rcN.d/`, what do `K` and `S` mean, and what does the number do?
- [ ] Which file set the default SysV runlevel, and what did the line look like?
- [ ] systemd: runlevel 0, 1, 3, 5, 6 → which targets? What is `emergency.target` vs rescue?
- [ ] `get-default` vs `set-default` vs `isolate` — which changes now, which changes next boot?

---

## Tuesday — Shell basics

### Startup files

- [ ] Which two questions decide which Bash startup files run?
- [ ] Interactive **login** (SSH / console, or `bash --login`): which files, in what order?
- [ ] After the first readable personal profile exists, are the other two still read?
- [ ] Interactive **non-login** (desktop terminal): which file?
- [ ] Does a login shell read `~/.bashrc` by itself?
- [ ] Why does `~/.bash_profile` usually source `~/.bashrc`?
- [ ] `su` vs `bash --login`: which switches user / UID? Which stays you?
- [ ] Whose password does `su` need? What does `su -` add?
- [ ] `.` vs `source`: which is POSIX? Which is Bash-only? Why does that matter for `/bin/sh`?
- [ ] What is POSIX, in one sentence?
- [ ] How do you tell if this Bash is a login shell?

### Shell programming

- [ ] Interpreter vs compiler — which is a shell script?
- [ ] What does xtrace print, where, and after what?
- [ ] `bash -x script.sh` vs `set -x` inside the script vs `set +x`.
- [ ] Long name of `set -x`?
- [ ] Shell-only variable vs environment variable: who sees each? How do you promote one?
- [ ] Rules: spaces around `=`? Case? Usual env naming? Multi-value separator?
- [ ] Recite: `USER`, `LOGNAME`, `HOME`, `EDITOR`, `SHELL`, `PATH`, `LANG`, `TERM`, `MAIL`.
- [ ] How does `PATH` pick a command if two directories have the same name?
- [ ] `env` / `printenv` vs `set` vs `unset`.
- [ ] Name five situations where shell is the wrong tool.

### Editors and man

- [ ] Why does `$EDITOR` / `$VISUAL` matter (`visudo`, `crontab -e`, …)?
- [ ] Vim: three modes, and how you enter each.
- [ ] Vim write / quit / quit-without-save / force write-quit.
- [ ] Vim motions: left-down-up-right, word, line start/end, file start/end.
- [ ] Vim: delete char, delete line, yank, paste, undo, redo.
- [ ] Vim search forward / back / next / previous.
- [ ] nano: cut, paste, copy, save, quit, search.
- [ ] Why edit sudoers with `visudo`, not a random editor?
- [ ] `man` sections 1, 2, 3, 5, 8. What is `man -k` vs `man -f`?

### Basic commands

- [ ] `ls` flags: long+hidden, human size, newest, largest.
- [ ] `cd` with no args, `cd ~`, `cd /`, `cd ..`, `cd -`.
- [ ] What is `$CDPATH`, and when is it ignored?
- [ ] `touch` default job; how do you set a parsed date?
- [ ] `mkdir -p` vs `-m`.
- [ ] `cp -r` vs `-p` vs `-i`.
- [ ] `mv` vs rename; what do `-i`, `--backup`, `-u` do?
- [ ] `rmdir` vs `rm -r` vs `shred`.
- [ ] `more` vs `less`.
- [ ] `head`/`tail` default count; `head -n -K`; `tail -n +K`; `tail -f`.

### Search, xargs, archives

- [ ] `find` vs `locate`: live tree vs what database? How do you refresh it?
- [ ] `find`: `-name` (why quote?), `-type`, `-user`, `-exec` ending.
- [ ] `grep -r`, `-i`, `-n`.
- [ ] What does `xargs` do by default (command and how many invocations)?
- [ ] `xargs -I {}` vs `-0` vs `-P`. Why pair `-print0` with `-0`?
- [ ] `zip -r` vs `-p`.
- [ ] `tar`: create, extract, list, verbose, file, gzip. Where must `-f` sit in the cluster?
- [ ] `tar` with `-` as the archive — what does that mean? Pipe two tars to copy a tree.
- [ ] `gzip` default: keep the original? How do you keep it? How do you write stdout?
- [ ] `zcat` / `zgrep` — what are they for?

---

## Wednesday — Packages, services, cron

### Software management

- [ ] What is a package, at a high level?
- [ ] Red Hat: file suffix, low-level tool, high-level tools.
- [ ] Debian: file suffix, low-level tool, high-level tools.
- [ ] Finish: yum is to rpm as ___ is to ___.
- [ ] `apt-get update` vs `upgrade` vs `install` (name or `.deb`?) vs `remove` vs `purge` vs `check`.
- [ ] `apt-cache`: search, show, showpkg, depends — which does what?
- [ ] Where do APT sources live? `deb` vs `deb-src`?

### alternatives

- [ ] What problem does `alternatives` / `update-alternatives` solve?
- [ ] Recite: `--install` needs which four pieces?
- [ ] `--set` vs `--auto` vs `--config` vs `--display` vs `--remove`.
- [ ] What is a `--slave` link?
- [ ] In the menu, what do `*` and `+` mean?

### Service management

- [ ] SysV: where do scripts live, and which actions do they take?
- [ ] What does `service nginx start` wrap?
- [ ] systemd: what is PID 1 responsible for besides services?
- [ ] Unit file locations: packages vs runtime vs admin.
- [ ] Name at least eight unit types.
- [ ] `[Unit]`: `Requires` vs `Wants` vs `Conflicts` vs `Before`/`After`.
- [ ] `[Service]`: `Type`, `ExecStart`, `ExecStop`, `User`, `PIDFile`.
- [ ] `[Install]`: which key does `enable` use?
- [ ] `start`/`stop`/`restart`/`reload` vs `enable`/`disable` vs `daemon-reload`.

### cron

- [ ] How often does cron match jobs?
- [ ] User crontab directories on Red Hat vs Debian.
- [ ] Which system files have an extra **username** field?
- [ ] What is anacron for?
- [ ] Recite the five crontab fields and their ranges.
- [ ] `*`, `5,17`, `*/10` — what do they mean?
- [ ] Smallest cron grain? How would you get something every 30 seconds?
- [ ] Where does cron mail output? How do you edit a user’s table?

---

## Thursday — Users, DAC, SELinux

### Users and groups

- [ ] Kernel identity: name or UID/GID?
- [ ] Recite `/etc/passwd` fields in order.
- [ ] What does password field `x` mean? Where is the hash?
- [ ] In shadow, `*` or `!` vs empty password.
- [ ] UID 0? Typical human UID floor (modern vs older RH)?
- [ ] Primary GID: which file? Supplementary members: which file?
- [ ] Must a user appear on their primary group’s member list?
- [ ] Shells that refuse interactive login.
- [ ] Where does account **expiry** live? Commands to see / set it.
- [ ] Recite `/etc/group` fields.
- [ ] `usermod -aG` vs `usermod -G` without `-a`.
- [ ] `su` vs `sudo`: whose password? What does `sudo su` get you?
- [ ] `useradd` home+shell flags. `userdel` vs `userdel -r`.

### Permission model (DAC)

- [ ] Three permission classes × three bits. What does `ls -l` type `-` / `d` / `l` mean?
- [ ] File `r` `w` `x` vs directory `r` `w` `x` (what does dir `w` need?).
- [ ] `chown` / `chgrp` / `chown user:group`. Who can give a file away?
- [ ] Octal: r, w, x values. What are 755, 644, 700?
- [ ] Extra digit: SUID, SGID, sticky — values and what each does.
- [ ] Does SUID work on scripts?
- [ ] SGID on a directory — new files get what?
- [ ] Sticky on `/tmp` — who may delete a file?
- [ ] `lsattr` / `chattr`: `+i`, `+a`, `+A`, `+s`.

### SELinux

- [ ] DAC vs MAC in one sentence.
- [ ] Enforcing vs Permissive vs Disabled.
- [ ] `getenforce` / `sestatus` / config file. Which change needs a reboot?
- [ ] Can `setenforce` turn SELinux on if it is Disabled?
- [ ] Policy type names you should know (`SELINUXTYPE=`).
- [ ] `semodule -l`, `getsebool`, `setsebool -P` — what is `-P`?

---

## Friday — Network and remote access

### Network configuration

- [ ] Runtime `ip address add` vs persist: what happens after reboot?
- [ ] Several IPs on one NIC — allowed?
- [ ] `/24` in dotted mask?
- [ ] Add a route via a gateway. How does default-route **metric** work?
- [ ] Red Hat persist files: NIC vs global network. Debian persist file.
- [ ] Where do nameservers usually live?
- [ ] What is NSS / `nsswitch.conf` deciding?

### Networking tools

- [ ] `ping` vs `traceroute` vs `tracepath` (who often needs root?).
- [ ] `host` / `dig` / `nslookup`. What does `dig -x` do?
- [ ] Non-authoritative DNS answer means what?
- [ ] Reverse DNS zone name idea (`in-addr.arpa`).
- [ ] `netstat -nlpt` vs modern replacement.
- [ ] `whois` vs `tcpdump`. How do you write a capture to a file?

### firewalld

- [ ] Runtime vs `--permanent` — what else do you need after permanent?
- [ ] What kernel mechanism does firewalld program? How is that unlike flushing iptables each change?
- [ ] Admin XML vs packaged defaults: which directories?
- [ ] Recite zones: `drop`, `block`, `public`, `external`, `internal`, `dmz`, `work`/`home`, `trusted`.
- [ ] Named services: how do you list them and see ports/helpers?
- [ ] What does `--panic-on` do (risk)?
- [ ] Forward-port: what extra feature does it need? Recite the `port=…:proto=…:toport=…` idea.

### Remote access

- [ ] When do you need a console instead of SSH?
- [ ] Telnet vs SSH vs WinSCP vs X11 vs VNC — one line each.
- [ ] `ssh-keygen` outputs: private path + mode, public path, where it goes on the server.
- [ ] SSH client: identity file, user, port, force tty, verbose, no remote command.
- [ ] `sshd_config`: why turn `PermitRootLogin` off? What do you restart, and what do you keep open?
- [ ] `scp` remote path form. Port flag letter vs `ssh`.
- [ ] Bastion: `ProxyCommand` idea and `~/.ssh/config` keys you should know.
- [ ] SFTP vs FTP. How do you jail SFTP (`Match User`, `ForceCommand`, `ChrootDirectory`)?

---

## Saturday — Monitoring and logs

### Processes

- [ ] What is a PID?
- [ ] `top`: quit, sort CPU, sort mem, kill from inside.
- [ ] `ps aux`: what do `a`, `u`, `x` mean?
- [ ] Default `kill` signal vs `kill -9`. Which can a process catch?
- [ ] Who may kill another user’s process? Risk of `killall java`?

### CPU

- [ ] `lscpu`: how do you get logical CPU count from sockets × cores × threads?
- [ ] `Thread(s) per core` = 2 means what?
- [ ] `mpstat` / `sar` with **no** interval: since when?
- [ ] Sample every CPU: `mpstat` / `sar` flags you were taught.
- [ ] Recite CPU % columns: `usr`, `nice`, `sys`, `iowait`, `irq`/`soft`, `steal`, `guest`, `idle`.
- [ ] Why is high `%iowait` not “the CPU is too slow”?

### Memory

- [ ] `free -h`: which field do you trust for “can I start another app”?
- [ ] Low `free` + high `buff/cache` — problem or normal?
- [ ] When do you worry (available + swap)?
- [ ] `vmstat`: `r` vs `b`; `si`/`so`; what does sustained `so` mean?
- [ ] `vmstat` first line when you pass an interval — often since when?

### Storage

- [ ] `df -h` answers which question? Which question does it **not** answer?
- [ ] How do you find the fat directory after `df` looks full?
- [ ] Deleted-but-still-open files: space freed? Which tool?
- [ ] `lsof` without a path: what can it show (`-c`, `-i`)?
- [ ] `iostat`: `tps`, read/write rates. No interval = since when? What is `dm-0`?

### Logs

- [ ] Three log planes.
- [ ] `dmesg`: where does it read from? Is that `/var/log/messages`? Why do old lines vanish?
- [ ] `dmesg -T` vs default timestamps. What boot clues do you look for?
- [ ] `journalctl` is not `tail`. Follow how? Unit, priority, this boot, previous boot, explain, time window.
- [ ] Red Hat vs Debian: general log file, auth/sshd file.
- [ ] Where do `sar` binary histories live?

---

## Sunday — Mixed distinctions

Say the difference in one breath. If you hesitate, that pair goes back into weekday review.

- [ ] Shell vs kernel.
- [ ] Hard link vs symlink.
- [ ] PV vs VG vs LV vs the filesystem on the LV.
- [ ] `mkswap` vs `mkfs`.
- [ ] Soft quota vs hard quota; blocks vs inodes.
- [ ] Firmware vs GRUB vs kernel vs systemd.
- [ ] Runlevel 3 vs 5 vs `isolate` vs `set-default`.
- [ ] `su` vs `sudo` vs `bash --login`.
- [ ] `.` vs `source` vs POSIX `/bin/sh`.
- [ ] Login startup files vs `~/.bashrc` only.
- [ ] `bash -x` vs `set -x` vs `set +x`.
- [ ] `env` vs `set`.
- [ ] `find` vs `locate`.
- [ ] `xargs` default one-shot vs `-I {}`.
- [ ] `rpm`/`yum` vs `dpkg`/`apt`.
- [ ] `apt-get remove` vs `purge`.
- [ ] `systemctl start` vs `enable` vs `daemon-reload`.
- [ ] `Requires` vs `Wants`.
- [ ] `/etc/passwd` vs `/etc/shadow` vs `/etc/group`.
- [ ] `usermod -G` vs `-aG`.
- [ ] File `x` vs directory `x`.
- [ ] SUID vs SGID vs sticky.
- [ ] SELinux Enforcing vs Permissive vs Disabled.
- [ ] Runtime firewall vs `--permanent --reload`.
- [ ] `drop` zone vs `block` zone vs `public`.
- [ ] `ssh -p` vs `scp -P`.
- [ ] `kill` vs `kill -9` vs `killall`.
- [ ] `free` vs `available`.
- [ ] `df` vs `du` vs `lsof`.
- [ ] `dmesg` vs `journalctl` vs `/var/log`.
