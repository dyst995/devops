# Logs (study)

Linux records what the kernel, services, and daemons did. Read that from the **kernel ring buffer** (`dmesg`), the **systemd journal** (`journalctl`), and **text files under `/var/log/`**.

| Source | When to use |
| --- | --- |
| `dmesg` | Boot / hardware / driver — did the kernel even see this device? |
| `journalctl` | Units/services on systemd |
| `/var/log/…` | Classic syslog text (rsyslog / syslog-ng still write these on many distros) |

## dmesg

Prints the **kernel message buffer** — early boot (cgroups, version, command line, RAM map, drivers) and later kernel events (disk errors, OOM, USB, NIC). It is **not** `/var/log/messages`. It is a **size-limited ring**; old lines fall off.

```bash
dmesg -T
```

`-T` = **human-readable timestamps** (not seconds since boot). Read version, **`Command line`** (root device, LVM, crashkernel), RAM **e820** map (usable vs reserved) when a disk/NIC/USB is missing or the kernel panic’d.

## journalctl

On modern Linux, **`systemd-journald`** collects and stores logging data in **structured, indexed binary journals** (kernel, unit stdout/stderr, syslog, audit, …). The point is to **centralize** logs regardless of origin. Journals are **not** `tail`able as text — always `journalctl` (or `journalctl -f` to follow).

```bash
journalctl -u httpd
journalctl -p err -b -x
journalctl -t dockerd
journalctl --since "1 hour ago"
journalctl --since "2 days ago"
journalctl --since "2015-06-26 23:15:00" --until "2015-06-26 23:20:00"
```

| Flag | Meaning |
| --- | --- |
| **`-u`** | That **systemd unit** (e.g. Apache start + ServerName warning) |
| **`-t`** | **Syslog identifier** (`dockerd` ≠ necessarily `-u docker.service`) |
| **`-p`** | **Priority** (`err` = error and worse: crit, alert, emerg). Also `warning`, `info`, `debug`, … |
| **`-b`** | This **boot** only (`-b -1` = previous boot) |
| **`-x`** | Extra **help texts** when available (context, possible solutions, docs) |
| **`--since` / `--until`** | Time window — relative (`1 hour ago`) or absolute |

## Classic `/var/log/` files

| File | Remember |
| --- | --- |
| `/var/log/messages` | Global / startup; mail, cron, daemon, kern, auth, … (Debian often `/var/log/syslog` instead) |
| `/var/log/secure` | Authz; **sshd** including **failed logins** (RHEL) |
| `/var/log/auth.log` | Logins and auth mechanism (Debian-family; same story as `secure`) |
| `/var/log/cron` | Cron / anacron job starts |
| `/var/log/maillog` or `mail.log` | Mail server (e.g. sendmail) |
| `/var/log/mail/` | Extra mail-server logs |
| `/var/log/sa/` | Daily **sar** files from **sysstat** |
