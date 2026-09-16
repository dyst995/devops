# Lab setup and practice

**Practice host: Windows.** The Mac does not have enough disk for VMs. Do the labs on the Windows machine (or in the cloud from that machine). PowerShell, CMD, and Git Bash are **not** Linux — you still install WSL or a Rocky VM.

These notes are **RHEL/CentOS + systemd**: `yum`/`dnf`, `firewalld`, SELinux, `httpd`, `/var/log/secure`, GRUB, LVM, `journalctl`. You need a **real Linux** environment with **root**, and later a **second Linux box** (or Windows SSH + one VM) for firewall/`scp`.

**Memory hook:** read `theory.md` → try every line in `commands.md` on Linux → cover `questions.md`. Snapshot/checkpoint before anything that can lock you out (firewall, SELinux enforcing, GRUB, default target).

Use the **numbered** trees as the pack:

- [1. intro](1.%20intro/)
- [2. linux-shell-basics](2.%20linux-shell-basics/)
- [3. package-management](3.%20package-management/)
- [4. users-groups-and-permissions](4.%20users-groups-and-permissions/)
- [5. networking-and-remote-access](5.%20networking-and-remote-access/)
- [6. monitoring-processes-control-and-logs](6.%20monitoring-processes-control-and-logs/)

## Windows: pick one environment

| Option | Disk (rough) | Covers the pack? | Use when |
| --- | --- | --- | --- |
| **Hyper-V VM** (Windows **Pro** / Education / Enterprise) | ~8–25 GB growing (dynamic VHDX; extra 8 GB disk for LVM) | **Yes** — full Rocky/Alma: LVM, GRUB, SELinux, firewalld, `dmesg` | **Default** if you have Pro and ~30 GB free on any drive |
| **VirtualBox / VMware Workstation** | Same as Hyper-V | **Yes** | Windows **Home** (no Hyper-V), or you already use VirtualBox |
| **WSL2** (Ubuntu or Rocky *userspace*) | ~1–5 GB | **Partial** — shell, users, `chmod`, apt/dnf *inside* WSL, some `systemd` | Fast daily shell. **Not** GRUB, real SELinux, extra-disk LVM, host `firewalld` |
| **Cloud VM** (Oracle always-free, AWS, DigitalOcean, Lightsail) | **Zero** on the PC (browser/SSH only) | **Yes** if you attach a second volume and have console | Windows disk is also tight; or you want a public IP for SSH |
| **EPAM course SSH** | Zero | Course flavor; often no extra disk; SELinux may be **Disabled** | When that host is up |
| **Docker Desktop** | Extra | Same limits as containers | Do **not** use as the main lab |

**Do not mix Hyper-V and VirtualBox on the same Windows.** Hyper-V owns virtualization; VirtualBox then gets slow or broken. Pick **one** hypervisor.

**Memory hook:** Windows Pro → Hyper-V Rocky VM. Windows Home → VirtualBox Rocky VM. Almost no disk → cloud or EPAM. WSL → module 2 and typing practice only.

### What WSL2 cannot do (even with systemd)

WSL2 uses the **Microsoft Linux kernel**, not a RHEL boot:

- No **GRUB** / kernel command line / real runlevel isolate the way a VM reboots
- No **SELinux** as on Rocky (`getenforce` is not the course lab)
- **LVM** on a second virtual disk is painful or impossible the RHEL way
- **firewalld** is not the Windows host firewall; panic-on will not teach zones the same way
- **`dmesg`** is the WSL kernel, not `el7`/`el9` boot + e820 map

Use WSL for [module 2](2.%20linux-shell-basics/) and for `useradd`/`chmod`/`ps`/`journalctl` **if** systemd is enabled. Put LVM, GRUB, SELinux, firewalld, and `dmesg -T` boot stories on a **Hyper-V/VirtualBox/cloud** Rocky VM.

### Disk-saving rules on Windows

- Install the **minimal/server** ISO, **no GNOME**.
- Use a **dynamically expanding** VHDX/VMDK (it grows as you write; it does not eat 20 GB on day one).
- Put the VM disk on **D:** or an external drive if `C:` is full: Hyper-V Manager → VM → Settings → hard disk path.
- One VM first (`rocky9-a`). Add `rocky9-b` only for module 5, or SSH **from Windows** into A (keys/`scp`/`~/.ssh/config`) and add B later.
- Do not keep CentOS 7 plus Rocky plus Docker plus WSL Ubuntu all at once.

## Distro that matches the notes

Course samples are **CentOS 7** (`yum`, `el7`, `httpd`, SELinux often **Disabled** in the lab). CentOS 7 is EOL. For practice in 2026:

| Distro | Use it when |
| --- | --- |
| **Rocky Linux 9** or **AlmaLinux 9** (recommended) | Same family: `dnf` (yum still works as a wrapper), `firewalld`, SELinux, `httpd`, `journalctl`, `/var/log/secure` |
| CentOS Stream 9 / RHEL 9 | Same stack if you already have it |
| CentOS 7 / older “centos” cloud image | Only if you need the course’s **exact** `yum`/`el7` screenshots |
| Ubuntu (WSL default) | Extra drill for **apt** in [software-management](3.%20package-management/software-management/theory.md). Weak for SELinux, `firewalld`, `/var/log/secure` |

**Memory hook:** one Rocky/Alma 9 VM on Windows = almost the whole pack. Ubuntu WSL = apt + shell homework, not the RHEL lab.

On Windows the CPU is almost always **x86_64** — download the **x86_64** Rocky/Alma ISO (not aarch64).

## Environment options (all hosts)

| Option | Good for | Weak for |
| --- | --- | --- |
| **EPAM / course VM over SSH** (e.g. `ssh -i ~/.ssh/lab.pem centos@ecsc00a058b0.epam.com`) | Same host style as the notes | Extra disks, GRUB, breaking the network, SELinux (course lab often starts **Disabled**) |
| **Local VM on Windows** (Rocky/Alma 9) | Everything: LVM, swap, quotas, GRUB, systemd, firewalld, SELinux, logs | Needs RAM/disk; checkpoint before experiments |
| **Two local VMs** | SSH keys, bastion/`ProxyCommand`, `scp`/`sftp`, firewall zones, ping the other box | More RAM and disk |
| **Cloud VM** | Real remote SSH, public IP, live `journalctl`; **no** Windows disk | Cost (or always-free quota); extra disks/GRUB extra work; **do not** lock SSH with firewall panic |
| **WSL2** | Shell, editors, `find`/`xargs`/`tar`, users, `chmod` | Boot, LVM disks, SELinux, host firewalld |
| **Docker / Podman** | Same as a container | systemd as PID 1, firewalld, SELinux, GRUB, LVM, real `dmesg` |
| **Browser labs** (Killercoda, similar) | Fast, no install | Short sessions; often Ubuntu |
| **OverTheWire Bandit** | Shell / files / permissions puzzles | Not yum, systemd, LVM, networking |

**Memory hook:** EPAM = course flavor. Rocky VM on Windows = you own root and disks. Two VMs = module 5. WSL/containers = extra shell only.

## Recommended setup (Windows)

### 0. Windows Terminal + OpenSSH

In **Settings → Apps → Optional features**, ensure **OpenSSH Client** is installed. In **Windows Terminal** (or PowerShell):

```text
ssh -V
```

You will SSH from Windows into the VM the same way the notes SSH into EPAM. Put keys in `C:\Users\<you>\.ssh\` (Windows OpenSSH) **or** generate them inside the Linux VM — both are valid; module 5 is clearer if keys live **on Linux** (`rocky9-b` or WSL) as well as on Windows.

Enable **virtualization** in BIOS/UEFI (Intel VT-x / AMD-V) if Hyper-V or VirtualBox refuses to start a VM.

### Hyper-V (Windows Pro) — preferred

1. Admin PowerShell: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All` then reboot.
2. Download **Rocky Linux 9 x86_64 minimal** ISO.
3. Hyper-V Manager → New → Virtual Machine:
   - Generation **2** (or Gen1 if the ISO will not boot)
   - **2048–4096 MB** RAM
   - **20 GB** dynamic VHDX on the drive that has space
   - Attach the ISO; boot; install minimal; set a user in `wheel`
4. After install: VM Settings → SCSI → **Add Hard Drive** → new **8 GB** dynamic VHDX (LVM Disk 2).
5. Enable **Checkpoint** after first successful boot (`fresh`).
6. Optional: Default switch (NAT) is enough to `ssh` from Windows to the VM IP (`ip -br a` inside Linux). For two VMs pinging each other, create a **Private** virtual switch and attach both VMs to it (plus Default switch if you still want outbound NAT).

### VirtualBox (Windows Home)

Same VM spec: 2 vCPU, 4 GB RAM, 20 GB **dynamically allocated** disk, second 8 GB disk, Rocky 9 minimal. Host-only or NAT + port forward **22 → 2222** so Windows can:

```text
ssh -p 2222 youruser@127.0.0.1
```

Snapshots = VirtualBox snapshots. Do not enable Hyper-V at the same time.

### Machine A — `rocky9-a` (server)

Throwaway VM you can checkpoint and wreck.

| Setting | Value |
| --- | --- |
| OS | Rocky Linux 9 or AlmaLinux 9 (minimal/server, **with SSH**) |
| CPU / RAM | 2 vCPU, **4 GB** RAM (2 GB works if Windows is tight; skip GUI) |
| Disk 1 | **20 GB** dynamic — OS only. Do **not** use this for first LVM labs |
| Disk 2 | **8 GB** extra, empty — LVM / swap-on-disk / quotas |
| Network | Hyper-V Default switch, or VirtualBox NAT + SSH port-forward |
| User | Your user in `wheel` (`sudo`); know the root password too |
| Hypervisor | **Hyper-V** (Pro) or **VirtualBox** (Home) |

After first boot: update, install tools, take checkpoint **`fresh`**.

```bash
sudo dnf -y update
sudo dnf -y install vim tmux sysstat httpd firewalld policycoreutils-python-utils
sudo systemctl enable --now sshd
sudo systemctl enable --now firewalld
getenforce
ip -br a
lsblk
```

`sysstat` → `mpstat` / `sar` and later `/var/log/sa/`. `httpd` → `journalctl -u httpd`. `firewalld` on does **not** mean you should panic-on over SSH from Windows.

From **Windows Terminal**:

```text
ssh youruser@<vm-ip>
```

### Machine B — `rocky9-b` (client)

Create when you start [module 5](5.%20networking-and-remote-access/). Smaller is fine (1–2 GB RAM, one disk). Same private/host-only network as A.

Until you have disk for B: use **Windows OpenSSH** as the client (keys, `scp`, `~/.ssh/config`). That covers a lot of remote-access. You still want B (or WSL SSH → A) for “Linux talking to Linux” and firewall tests that are not the Windows firewall.

Optional: treat B as a **bastion** and A as the inner host, matching [remote-access](5.%20networking-and-remote-access/remote-access/theory.md) `ProxyCommand`.

### WSL2 (shell-only companion)

```text
wsl --install
```

That defaults to **Ubuntu** — use it for `apt-get` and module 2. Optional: install a Rocky WSL distro later; it is still **not** a replacement for the Hyper-V VM.

Enable systemd in `/etc/wsl.conf` only if you want `systemctl` experiments in WSL; do not count that as SELinux/firewalld/GRUB done.

### Cloud if Windows disk is also low

Oracle Cloud **Always Free** (or similar) Rocky/Oracle Linux VM. SSH from Windows:

```text
ssh -i C:\Users\<you>\.ssh\lab.pem opc@<public-ip>
```

Attach a **second block volume** for LVM. Use the provider **console / serial** before you touch `firewalld` panic or `sshd_config`. Same safety rules as any cloud box.

### Snapshots (non-negotiable)

Hyper-V **checkpoint** / VirtualBox **snapshot** / cloud **image** before:

- LVM on anything that is not Disk 2
- Changing GRUB or the default systemd target
- SELinux `enforcing` (and after the relabel reboot)
- `firewall-cmd --panic-on` or dropping SSH from the zone
- Editing `/etc/ssh/sshd_config` (Chroot, `PermitRootLogin`, `PasswordAuthentication`)

Roll back instead of “fixing” a box you can no longer boot or SSH into.

**Memory hook:** Disk 2 = LVM playground. Checkpoint = undo. Hyper-V console = how you recover when SSH from Windows dies.

## Safety rules

- **LVM:** `pvcreate` / `vgcreate` / `lvcreate` on the **extra** disk only until you are comfortable. Root LV last, and only with a checkpoint.
- **SELinux:** course labs start **Disabled**. For real practice: checkpoint → `/etc/selinux/config` to `permissive` → reboot (relabel if asked) → `getenforce` / `setenforce` → then `enforcing`. Do not jump Disabled → Enforcing on a machine you still need. **WSL will not teach this.**
- **Firewall:** practice panic / dropping `ssh` from the **Hyper-V/VirtualBox console**, not over the only SSH session from Windows.
- **Targets:** `systemctl set-default runlevel0.target` is poweroff-at-boot. Do not set that as default. Use `isolate` to try a target **now**.
- **Cloud:** never `--panic-on` or remove SSH from the public zone without console/serial access.

## How to run a lab session

1. Open the topic `theory.md` on whichever machine has the git repo (Mac is fine **for reading**; Windows/VM is for **typing**).
2. On `rocky9-a`, run the matching `commands.md` lines. Change names (`httpd`, users, VG) so you are not only copying.
3. Close the notes. Answer `questions.md` out loud or on paper, then uncover Answers.
4. Break it on purpose: wrong zone, SELinux deny, full disk, failed SSH key — then **fix from logs** (`journalctl -u …`, `dmesg -T`, `/var/log/secure`).
5. Tick the checklist below. If a row needs Disk 2 or VM B, skip it until that hardware exists. If it is “shell only,” WSL is allowed.

## What you cannot practice on Windows itself

| Needs a full Linux VM + root | Why |
| --- | --- |
| LVM, extra disks, `pvcreate` / `vgcreate` / `lvcreate` | Block devices and the device mapper |
| Swap partition/file, disk quotas | Kernel + filesystem features |
| GRUB, kernel command line, reboot into another target | Bootloader and init |
| `yum`/`dnf`, `rpm`, `alternatives` as on the course | Red Hat package stack |
| `systemctl`, cron as system daemons | PID 1 is systemd |
| SELinux modes, `getenforce`, `setsebool` | RHEL MAC |
| `firewalld` / nftables as the **host** firewall | Not WSL and not Windows Defender |
| `sshd_config`, SFTP jail, bastion | Real `sshd` + a second box |
| `dmesg`, `/var/log/secure`, `sar` from sysstat | Kernel buffer + RHEL log layout |

**On any Linux shell** (Hyper-V VM, WSL, EPAM, container): Bash, editors, `find`/`xargs`/`tar`, users, `chmod`/`chown`, `ps`/`top`/`kill`, `free`/`df`/`du`. That is **module 2** plus pieces of **4** and **6** — not the admin half of **1**, **3**, **5**.

## Practice by module

Each row is “done” when you have **typed** the commands, not only read them. **VM** = Hyper-V/VirtualBox/cloud Rocky. **WSL OK** = Ubuntu/Rocky WSL is enough.

### 1. Intro

| Topic | Where | Practice |
| --- | --- | --- |
| [01-shell](1.%20intro/01-shell/theory.md) | WSL OK | `echo $SHELL`, `ps -p $$`, login vs non-login (`ssh` vs `bash` inside ssh) |
| [02-filesystem](1.%20intro/02-filesystem/theory.md) | VM | `lsblk`, `df -h`, `findmnt`, `mount`, `/etc/fstab` **read** (do not wreck root) |
| [03-inodes-and-links](1.%20intro/03-inodes-and-links/theory.md) | WSL OK | `ln`, `ln -s`, `stat`, `ls -li` — hard link vs symlink after `mv`/`rm` |
| [04-lvm](1.%20intro/04-lvm/theory.md) | **VM Disk 2** | `pvcreate` → `vgcreate` → `lvcreate` → `mkfs.ext4` → `mount` → `df`/`lsblk` |
| [05-swap](1.%20intro/05-swap/theory.md) | VM | `free -h`, `swapon --show`. Swap file or swap LV on Disk 2; `mkswap` / `swapon` |
| [06-disk-quotas](1.%20intro/06-disk-quotas/theory.md) | VM Disk 2 | Quota mount options; `quotacheck` / `edquota` / `quota` on a **non-root** FS |
| [07-boot-loaders](1.%20intro/07-boot-loaders/theory.md) | VM only | Read `/etc/default/grub`, `grubby --info=ALL`. Checkpoint before `grub2-mkconfig` |
| [08-runlevels](1.%20intro/08-runlevels/theory.md) | VM | `systemctl get-default`, `systemctl isolate multi-user.target` (console). Do **not** `set-default` to poweroff |

### 2. Linux shell basics

WSL or VM. Bandit is optional extra.

| Topic | Practice |
| --- | --- |
| [01-bash-startup-files](2.%20linux-shell-basics/01-bash-startup-files/theory.md) | Login SSH vs `bash` vs `bash -l`. Unique `echo` in `~/.bash_profile` vs `~/.bashrc` |
| [02-shell-programming](2.%20linux-shell-basics/02-shell-programming/theory.md) | Script: variables, `if`, loop, `chmod +x`, shebang |
| [03-text-editors](2.%20linux-shell-basics/03-text-editors/theory.md) | **vi** and **nano** until save/quit is automatic |
| [04-basic-shell-commands](2.%20linux-shell-basics/04-basic-shell-commands/theory.md) | Entire `commands.md` |
| [05-filesystem-search](2.%20linux-shell-basics/05-filesystem-search/theory.md) | `find` by name, type, size, mtime; `grep -R` |
| [06-xargs](2.%20linux-shell-basics/06-xargs/theory.md) | `find … -print0 \| xargs -0`; `xargs -n` / `-I{}` |
| [07-archives](2.%20linux-shell-basics/07-archives/theory.md) | `tar czf` / `xzf`, `gzip`, `zip`/`unzip` |

### 3. Package management

| Topic | Where | Practice |
| --- | --- | --- |
| [software-management](3.%20package-management/software-management/theory.md) | VM + once WSL | Rocky VM: `dnf` / `rpm`. WSL Ubuntu: `apt-get update/install` (both families in the notes) |
| [alternatives](3.%20package-management/alternatives/theory.md) | VM | `alternatives --display` / `--config` |
| [service-management](3.%20package-management/service-management/theory.md) | VM | `systemctl start/stop/status/enable httpd`. `daemon-reload` after a drop-in |
| [crond](3.%20package-management/crond/theory.md) | VM | `crontab -e` → `/tmp/cron-lab.txt`; `journalctl -u crond` or `/var/log/cron` |

### 4. Users, groups, permissions

| Topic | Where | Practice |
| --- | --- | --- |
| [users-groups](4.%20users-groups-and-permissions/users-groups/theory.md) | WSL OK | `useradd` / `passwd` / `usermod -aG` / `userdel -r`; `/etc/passwd` `/etc/shadow` `/etc/group` |
| [permission-model](4.%20users-groups-and-permissions/permission-model/theory.md) | WSL OK | `chmod` / `chown` / sticky / one SUID demo in `/tmp` |
| [selinux](4.%20users-groups-and-permissions/selinux/theory.md) | **VM only** | `getenforce`, permissive → reboot → `ausearch` / `setsebool` / `restorecon` / then enforcing |

### 5. Networking and remote access

Best: **A + B** on a private virtual switch. Minimum: Windows `ssh`/`scp` → A.

| Topic | Practice |
| --- | --- |
| [network-configuration](5.%20networking-and-remote-access/network-configuration/theory.md) | On A: `ip addr`, `ip route`, `nmcli`. Ping A↔B (or Windows `ping` to A). `/etc/hosts` |
| [networking-tools](5.%20networking-and-remote-access/networking-tools/theory.md) | `ping`, `dig`, `ss -tulpn`, `curl -v`, `tcpdump -n` (sudo) |
| [firewalld-and-iptables](5.%20networking-and-remote-access/firewalld-and-iptables/theory.md) | On A: zones, allow `http`, `curl` from B or Windows. `--permanent` + `--reload`. **Panic from the VM console** |
| [remote-access](5.%20networking-and-remote-access/remote-access/theory.md) | `ssh-keygen`; pubkey on A; `ssh`/`scp` from Windows or B; `~/.ssh/config`; optional bastion. Snapshot before `sshd_config` chroot |

Course-style login (when the EPAM host is up), from Windows Terminal:

```text
ssh -i C:\Users\<you>\.ssh\lab.pem centos@ecsc00a058b0.epam.com
```

(If you copied `lab.pem` into WSL: `ssh -i ~/.ssh/lab.pem centos@ecsc00a058b0.epam.com`.)

### 6. Monitoring, processes, logs

Install `sysstat` and `httpd` on the **VM** (first-boot block). WSL is OK for `top`/`ps`/`free` only.

| Topic | Where | Practice |
| --- | --- | --- |
| [process-monitoring](6.%20monitoring-processes-control-and-logs/process-monitoring/theory.md) | WSL OK | `top`, `ps aux`, `kill` a **your** `sleep 3600` |
| [monitoring-cpu](6.%20monitoring-processes-control-and-logs/monitoring-cpu/theory.md) | VM | `lscpu`, `mpstat -P ALL 1 5`, `sar -P ALL 1 1` |
| [monitoring-memory](6.%20monitoring-processes-control-and-logs/monitoring-memory/theory.md) | WSL OK | `free -h` (trust **available**), `vmstat 1 5` |
| [monitoring-storage](6.%20monitoring-processes-control-and-logs/monitoring-storage/theory.md) | VM better | `df -h`, `du -sh`, `lsof`, `iostat` |
| [logs](6.%20monitoring-processes-control-and-logs/logs/theory.md) | VM | `dmesg -T`. `journalctl -u httpd`. `-p err -b -x`. `--since "1 hour ago"`. `/var/log/messages` `/var/log/secure` `/var/log/cron`. Failed SSH from Windows → line in **secure**. `ls /var/log/sa/` |

## Suggested order (Windows)

1. Install OpenSSH + Windows Terminal. If Pro: enable Hyper-V. If Home: install VirtualBox.
2. Create **`rocky9-a`** (minimal, dynamic disk, extra 8 GB VHDX). Checkpoint `fresh`.
3. Optional: `wsl --install` for module 2 while the ISO downloads.
4. Module **2** on WSL or the VM until the keyboard is automatic.
5. Module **1** on the VM; LVM/swap/quotas **only** on Disk 2; GRUB last.
6. Module **3** (`dnf` + `httpd` + cron). Apt once in Ubuntu WSL.
7. Module **4** (users/chmod anywhere Linux; **SELinux only on the VM**).
8. Module **6** on the VM (`journalctl`, `dmesg`, `/var/log/secure`).
9. SSH from Windows into A; add **VM B** when you have disk; finish module **5**.
10. Use EPAM SSH when that host exists.

**Memory hook:** WSL = typing. Rocky VM on Windows = real Linux admin. Cloud = if even Windows has no disk.

## Commands.md is the lab sheet

You do not need a separate exercise file per topic. For each folder:

```text
theory.md     → what and why
commands.md   → type these on Linux (VM or WSL as the table says)
questions.md  → closed-book check
```

If a command fails, that **is** the lab: read the error, then `man`, `journalctl -xe`, `dmesg -T`.
