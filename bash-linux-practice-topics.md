# Bash & Linux — practice topic inventory

Topic list only. Use this file to generate exercises. Source: `bash/` and `linux/` course notes + recall files.

---

## Bash

### Intro
- What is a shell (interpreted vs compiled, known shells, `/etc/shells`)
- When to use the shell (acceptable vs rewrite vs never)
- Bash startup files (login vs interactive non-login, profile / bashrc / logout)
- `.` vs `source` (POSIX vs Bash-only)
- `su` / `bash --login` vs sourcing profiles

### Syntax — script development and invocation
- What a script is
- Sha-bang (`#!`) — line 1, interpreter path, optional args
- `/usr/bin/env` for PATH-based interpreters
- Running with `sh` / `bash` scriptname (sha-bang ignored, no +x)
- `chmod +x` + `./script` (kernel uses sha-bang)
- Missing sha-bang / wrong interpreter pitfalls

### Syntax — bash options
- `set -o` / `set +o` and short forms (`-` on, `+` off)
- `verbose` / `-v`
- `errexit` / `-e` (and `set +e` blocks)
- Option scope from the point it is set

### Syntax — exit codes
- Status range 0–255; `$?` must be read immediately
- Success = 0, failure = non-zero
- Common codes: 1, 2, 126, 127, 128, 128+n, 130, 137, 255
- 126 vs 127
- `exit` argument rules (invalid / out of range)
- Signals: Ctrl-C vs `kill -9`

### Syntax — special characters
- `#` comments vs `#!`
- `;` command separator vs `:` null command
- `;;` in `case`
- `.` source vs `./` path
- `''` vs `""` quoting
- `\` escape / line continuation
- Command substitution: `` ` ` `` and `$(…)`
- `,` in arithmetic

### Syntax — variables
- Assignment rules (no spaces around `=`)
- `$var` vs `${var}` (braces when glued / `${10}`)
- Indirect expansion
- Strings vs `declare -i` / `typeset`
- Local / environment / positional / builtins
- Positional: `$0` `$1` … `$#` `"$*"` vs `"$@"`
- `export` / `unset` / `env VAR=val cmd`
- Common env: `PATH` `HOME` `USER` `SHELL` `EDITOR` `LANG` `TERM`
- Arrays: index, `${#arr[@]}` vs `${#arr}`, sparse arrays
- String length / substring / parameter expansion patterns

### Syntax — conditions
- `test` / `[ ]` (spaces, `-a`/`-o`, quoting)
- `[[ ]]` (`&&` `||` pattern match inside)
- `(( ))` / `let` (non-zero → true)
- `if` / `elif` / `else` / `fi` (any command as test)
- `case` / `esac` / `;;`
- `&&` and `||` short-circuit lists
- File/string/numeric test operators

### Syntax — loops
- `for` over a list
- `while` (test at top)
- `until` (opposite of while)
- `break` / `continue`
- C-style `for (( ))`
- Globs / command substitution as loop lists

### Syntax — redirection
- stdout / stderr file descriptors
- `>` overwrite · `>>` append · `<` input
- `2>` / `2>>` / `&>` / `2>&1` / order of redirects
- Pipes `|` and `$PIPESTATUS`
- `tee` / `tee -a`
- Here documents (`<<` / `<<-`)
- Here strings (`<<<`)
- Redirecting a block / whole script

### Syntax — functions
- Define and call
- Positional args inside functions
- `local` scope
- `return` vs `exit`
- Status from last command vs explicit `return n`

### Style guide
- STDOUT vs STDERR (what goes where)
- Comments (file header, function comments, TODO)
- Formatting and quoting (indent, line length, pipelines, loops, case, expansions)
- Function naming conventions
- Return values and preferring builtins over external commands

---

## Linux

### Intro — shell and filesystem
- Shell role (user → shell → kernel)
- Shell families: `sh` `csh` `ksh` `bash`; `$` vs `#` prompts
- Login shell field in `/etc/passwd`; `$SHELL` vs `$0`
- Single-tree filesystem; mount vs drive letters
- Common FS types (ext4, XFS, Btrfs, …)
- Linux names / execute bit (no required extension)

### Intro — inodes and links
- Inode = metadata + data; name is not the file
- Link count
- Hard links (`ln`) — same inode, same FS
- Symbolic links (`ln -s`) — path, can dangle, cross FS
- `ls -li`

### Intro — LVM
- Disk → PV → VG → LV → mkfs → mount / fstab
- `pvcreate` / `vgcreate` / `lvcreate` / `lvextend` / snapshots
- Device paths `/dev/vg/lv` and `/dev/mapper/…`
- LVM does not format; you `mkfs`

### Intro — swap
- What swap is; not on Btrfs
- Swappiness (default 60)
- Size guidelines (RHEL-style RAM → swap)
- Create: partition or file (`mkswap`, not `mkfs`)
- `swapon` / `swapoff` / fstab; never `rm` active swap file
- `/proc/swaps`

### Intro — disk quotas
- Soft vs hard; blocks vs inodes; grace period
- fstab `usrquota` / `grpquota`
- Enable, set, report quotas

### Intro — boot loaders
- Boot chain: firmware → boot loader → kernel → init/systemd
- LILO vs GRUB
- GRUB recovery / regain root from console (lab themes)

### Intro — runlevels / targets
- SysV runlevels 0–6; `/etc/inittab`; `Knn`/`Snn` in `rc.d`
- systemd targets: poweroff, rescue, multi-user, graphical, reboot, emergency
- `systemctl get-default` / `set-default` / `isolate`

### Shell basics — startup and programming
- Interactive vs login; which files run
- POSIX vs Bash extras
- Variables / env listing (`env` `set` `printenv`)
- When not to use shell (overlap with bash intro)

### Shell basics — text editors
- `vim` modes and essential commands
- `nano` essentials
- `$EDITOR` / `$VISUAL`
- `visudo` for `/etc/sudoers`

### Shell basics — basic commands
- `man` / `apropos` / `whatis`
- `ls` flags; hidden files
- `pwd` `cd` (`~` `-` `..` `$CDPATH`)
- `touch` `mkdir -p` `cp` `mv` `rm` `rmdir` `shred`
- `cat` `more` `less`
- `head` / `tail` (incl. `-f`, `+K` / `-K`)

### Shell basics — filesystem search
- `find` (`-name` `-type` `-user` `-mtime` `-size` `-perm` `-maxdepth` `-exec`)
- `locate` / `updatedb` (stale DB)
- `grep` (`-r` `-i` `-n`)

### Shell basics — xargs
- stdin → args; default one invocation
- `-I {}` per item
- `-0` with `find -print0`
- `-P` parallel

### Shell basics — archives
- `zip` / `unzip`
- `tar` create / extract / list (`-c` `-x` `-t` `-f` `-v` `-z`)
- `tar` with `-` (stdout/stdin pipe copy)
- `gzip` / `gunzip` / `zcat` / `zgrep` (`-k` keep)

### Packages, services, cron
- Package concept; RPM vs DEB stacks
- Low-level: `rpm` / `dpkg`
- High-level: `yum`/`dnf` · `apt-get`/`apt-cache`
- Install / remove / purge / search / owns-file / undo bad install
- APT sources.list
- `update-alternatives`
- SysV `/etc/init.d` and `service`
- systemd units (locations, types)
- Unit sections: `[Unit]` `[Service]` `[Install]`
- `systemctl` start/stop/restart/reload vs enable/disable; `daemon-reload`
- Keep a unit down / mask
- cron: user crontabs, `/etc/crontab`, `/etc/cron.d`, anacron, run-parts dirs
- Crontab fields and schedule syntax
- `crontab -e`; one-shot / near-future jobs

### Users, groups, permissions
- UID/GID; UID 0; human UIDs ≥1000
- `/etc/passwd` `/etc/shadow` `/etc/group` `/etc/gshadow`
- Primary vs supplementary groups
- `useradd` `usermod` `userdel` `passwd` lock/unlock
- `usermod -aG` vs `-G` replace
- `su` vs `sudo` vs `sudo su`
- DAC: rwx for u/g/o; `chmod` octal and symbolic
- SUID / SGID / sticky
- `chown` / `chgrp`
- ext attributes: `lsattr` / `chattr` (`+i` `+a` …)
- SELinux: MAC vs DAC; enforcing / permissive / disabled
- Contexts, `ls -Z`, restorecon / chcon themes; troubleshooting denials

### Networking and remote access
- Interfaces (`ip` / legacy `ifconfig`); runtime vs persistent
- CIDR / netmask
- Routes and default gateway / metric
- Persist config: RHEL ifcfg / Debian interfaces; hostname; `resolv.conf`
- NSS `/etc/nsswitch.conf`
- Reachability: `ping` `traceroute` `tracepath`
- DNS: `host` `dig` `nslookup` (incl. reverse)
- Sockets: `netstat` / `ss`
- `whois` / `tcpdump` filters
- firewalld: zones, runtime vs permanent + reload
- `firewall-cmd` services, ports, masquerade, forward-port, panic
- Console vs remote; SSH vs Telnet
- SSH keys (`ssh-keygen`, permissions, `authorized_keys`)
- `sshd_config` (e.g. `PermitRootLogin`); restart safely
- `ssh` options (`-i` `-p` `-v` `-N` `-L` `-t`)
- `scp` (`-P`) / `sftp`
- Bastion / ProxyJump / `~/.ssh/config`
- SFTP jail basics

### Processes, monitoring, logs
- PID; `top` / `ps aux`
- Signals: SIGTERM 15 vs SIGKILL 9; `kill` / `killall`
- CPU: `lscpu` `mpstat` `sar`; usr/sys/iowait/steal/idle meaning
- Memory: `free -h` (trust `available`); `vmstat` (si/so, queues)
- Storage: `df` vs `du`; deleted-but-open + `lsof`; `iostat`
- Three log planes: `dmesg` · journal · `/var/log` text
- `journalctl` (`-f` `-u` `-p` `-b` `--since` `-x` `-t`)
- Distro text logs (messages/secure vs syslog/auth.log; cron; mail; sa/)

---

## Cross-cutting exercise angles

Use these when generating drills (combine topics):

- Diagnose: permission denied, wrong interpreter, empty redirect target, status always 0
- Fix scripts: quoting, `"$@"`, `set -e`, `return` vs `exit`, pipefail-ish `$PIPESTATUS`
- Ops loops: find + xargs + archive; cron + redirect logs; systemd + journalctl
- Access control: DAC + sticky/SGID + SELinux denial
- Net path: SSH key → bastion → firewalld service → persistent hostname/IP
- Capacity: swap/quota/LVM grow; df/du/lsof space mystery; RAM vs swap pressure
