# Logs

Linux records what the kernel, services, and daemons did. You read that from the **kernel ring buffer** (`dmesg`), the **systemd journal** (`journalctl`), and **text files under `/var/log/`**.

**Memory hook:** boot/hardware/driver issues → `dmesg`. Unit/service since systemd → `journalctl`. Classic syslog files → `/var/log/…`.

## dmesg

**`dmesg`** on most Unix-like operating systems **prints the message buffer of the kernel**.

That buffer is filled from early boot (cgroups, kernel version, command line, RAM map, drivers) and later kernel events (disk errors, OOM, USB, NIC). It is **not** the same as `/var/log/messages`; it is the **kernel’s own ring buffer** (size-limited; old lines fall off).

```bash
dmesg -T
```

`-T` prints **human-readable timestamps** instead of seconds since boot.

```text
$ dmesg -T
[Sun Jul 12 15:43:37 2020] Initializing cgroup subsys cpuset
[Sun Jul 12 15:43:37 2020] Initializing cgroup subsys cpu
[Sun Jul 12 15:43:37 2020] Initializing cgroup subsys cpuacct
[Sun Jul 12 15:43:37 2020] Linux version 3.10.0-514.10.2.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-11) (GCC) ) #1 SMP Fri Mar 3 00:04:05 UTC 2017
[Sun Jul 12 15:43:37 2020] Command line: BOOT_IMAGE=/vmlinuz-3.10.0-514.10.2.el7.x86_64 root=/dev/mapper/cl-root ro crashkernel=auto rd.lvm.lv=cl/root rd.lvm.lv=cl/swap rhgb quiet LANG=en_GB.UTF-8
[Sun Jul 12 15:43:37 2020] e820: BIOS-provided physical RAM map:
[Sun Jul 12 15:43:37 2020] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable
[Sun Jul 12 15:43:37 2020] BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved
[Sun Jul 12 15:43:37 2020] BIOS-e820: [mem 0x00000000000f0000-0x00000000000fffff] reserved
[Sun Jul 12 15:43:37 2020] BIOS-e820: [mem 0x0000000000100000-0x000000003ffeffff] usable
```

Read this when a disk/NIC/USB does not appear, or the kernel panic’d: version, **`Command line`** (root device, LVM, crashkernel), RAM **e820** map (usable vs reserved).

**Memory hook:** `dmesg -T` = kernel diary with wall-clock times. First place for “did the kernel even see this device?”

## What is journalctl?

On **modern Linux**, the logging subsystem is implemented by **`systemd-journald`**. It is a **system service that collects and stores logging data**.

It **creates and maintains structured, indexed binary files** called **journals**, based on logging information received from a **variety of sources** (kernel, stdout/stderr of units, syslog, audit, …).

One of the **impetuses** behind the systemd journal is to **centralize the management of logs regardless of where the messages are originating**.

**`journalctl`** is the utility to **query and display** the systemd journal data.

Journals are binary (not `tail`able as plain text). You always go through `journalctl` (or `journalctl -f` to follow).

### By systemd unit

```text
# journalctl -u httpd
-- Logs begin at Sun 2019-09-22 20:11:33 UTC, end at Sun 2019-09-22 20:11:39 UTC. --
Sep 22 20:11:33 97105f929c3b systemd[1]: Starting The Apache HTTP Server...
Sep 22 20:11:33 97105f929c3b httpd[147]: AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
Sep 22 20:11:33 97105f929c3b systemd[1]: Started The Apache HTTP Server.
```

**`-u httpd`** = only that **unit** (service). Here systemd starts Apache; httpd warns about **ServerName**; then “Started.”

### Priority, since last boot, extra explanations

To show only entries logged at the **error** level **or above**:

```bash
journalctl -p err -b -x
```

| Flag | Meaning |
| --- | --- |
| **`-p`** | **Priority** or log level (`err` = error and worse: crit, alert, emerg). Also `warning`, `info`, `debug`, … |
| **`-b`** | Since **last boot** (this boot only; `-b -1` is previous boot) |
| **`-x`** | Add **explanatory help texts** to log messages in the output **where this is available**. These short help texts explain the **context** of an error or log event, **possible solutions**, and **pointers** to support forums, developer documentation, and any other relevant manuals |

### Syslog identifier (`-t`)

To show only entries for a **specified syslog identifier**:

```text
$ journalctl -t dockerd
-- Logs begin at Fri 2020-03-13 13:17:01 +03, end at Sun 2020-04-26 11:40:10 +03. --
Mar 16 14:23:56 localhost dockerd[2009]: time="2020-03-16T14:23:56" level=info msg="ignoring event" modu...
Mar 16 14:25:04 localhost dockerd[2009]: time="2020-03-16T14:25:04" level=info msg="ignoring event" modu...
Mar 16 14:31:59 localhost dockerd[2009]: time="2020-03-16T14:31:59" level=info msg="parsed scheme: \"\""...
Mar 16 14:31:59 localhost dockerd[2009]: time="2020-03-16T14:31:59" level=info msg="scheme \"\" not regi...
Mar 16 14:31:59 localhost dockerd[2009]: time="2020-03-16T14:31:59" level=info msg="ccResolverWrapper: s...
Mar 16 14:31:59 localhost dockerd[2009]: time="2020-03-16T14:31:59" level=info msg="ClientConn switching...
```

**`-t dockerd`** = identifier **dockerd** (the Docker daemon), not necessarily the unit name `-u docker.service`. Same process can show up as unit and as syslog id.

### Time window: `--since` and `--until`

To see messages logged within a **specific time window**, use **`--since`** and **`--until`**:

```bash
journalctl --since "1 hour ago"
journalctl --since "2 days ago"
journalctl --since "2015-06-26 23:15:00" --until "2015-06-26 23:20:00"
```

Relative phrases (`1 hour ago`, `2 days ago`) or absolute timestamps. Combine with `-u`, `-p`, `-t` as needed.

**Memory hook:** `-u` unit · `-t` syslog name · `-p` level · `-b` this boot · `-x` extra help · `--since` / `--until` time box.

## Classic files under `/var/log/`

On many distros **rsyslog** (or syslog-ng) still writes **text** logs besides the journal. Know these paths from the course:

### `/var/log/messages`

Contains **global system messages**, including the messages that are logged during **system startup**. There are several things that are logged in `/var/log/messages` including **mail**, **cron**, **daemon**, **kern**, **auth**, etc.

(On Debian/Ubuntu the closest general file is often `/var/log/syslog` instead of `messages`.)

### `/var/log/secure`

Contains information related to **authentication and authorization privileges**. For example, **sshd** logs all the messages here, including **unsuccessful login**.

### `/var/log/cron`

Whenever **cron** daemon (or **anacron**) starts a cron job, it logs the information about the cron job in this file.

### `/var/log/auth.log`

Contains **system authorization** information, including **user logins** and **authentication mechanism** that were used.

(Typical on Debian-family; RHEL-family uses **`/var/log/secure`** for much of the same story.)

### `/var/log/maillog` / `/var/log/mail.log`

Contains the log information from the **mail server** that is running on the system. For example, **sendmail** logs information about all the sent items to this file.

### `/var/log/mail/`

This **subdirectory** contains **additional logs** from your mail server.

### `/var/log/sa/`

Contains the **daily sar files** that are collected by the **sysstat** package. (`sar` from [CPU](../monitoring-cpu/theory.md) / [storage](../monitoring-storage/theory.md) reads these.)

| File | Remember |
| --- | --- |
| `/var/log/messages` | Global / startup / mail, cron, daemon, kern, auth, … |
| `/var/log/secure` | Authz; sshd including failed logins (RHEL) |
| `/var/log/cron` | Cron / anacron job runs |
| `/var/log/auth.log` | Logins and auth mechanism (Debian) |
| `/var/log/maillog` or `mail.log` | Mail server (e.g. sendmail) |
| `/var/log/mail/` | Extra mail logs |
| `/var/log/sa/` | sysstat daily `sar` data |

**Memory hook:** `messages` = general. `secure` / `auth.log` = who tried to log in. `cron` = scheduled jobs. `sa/` = `sar` history. Journal is the systemd-era query tool on top of (or instead of) these files.
