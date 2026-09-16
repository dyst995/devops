# Logs — Questions

Cover the Answers section. Answer first, then check.

1. What does `dmesg` print? What does `-T` change?
2. From the sample `dmesg -T`, name three kinds of facts you can read (cgroups, kernel line, RAM).
3. What is **systemd-journald**? What are **journals**? Why was the journal introduced?
4. What is **journalctl**?
5. What does `journalctl -u httpd` show? In the sample, who says “Starting” vs the ServerName warning?
6. Decode `journalctl -p err -b -x` (`-p`, `-b`, `-x`). What does `-x` add when available?
7. What does `journalctl -t dockerd` filter on? How is that different from `-u`?
8. Write three `journalctl` time filters from the notes (`1 hour ago`, `2 days ago`, absolute window).
9. Recite what each of these contains: `/var/log/messages`, `/var/log/secure`, `/var/log/cron`, `/var/log/auth.log`, `/var/log/maillog` / `mail.log`, `/var/log/mail/`, `/var/log/sa/`.
10. Failed SSH login on RHEL vs Ubuntu — which file? `sar` history — which directory?
11. Kernel did not see a new disk at boot: `dmesg` or `journalctl -u httpd` first? Apache failed to start: which `journalctl` flag?

---

## Answers

1. The **kernel message buffer**. `-T` = human-readable timestamps.
2. Cgroup init; Linux version and **Command line** (root, LVM, crashkernel); BIOS **e820** RAM map (usable/reserved).
3. System service that collects and stores logs. Structured, indexed **binary** files from many sources. Centralize log management no matter where messages originate.
4. Utility to query and display systemd journal data.
5. Journal lines for the **httpd** unit. **systemd** starts/started the service; **httpd** itself printed AH00558 ServerName.
6. Priority **error or above** · **this boot** · **explanatory help**. Context, possible solutions, links to docs/forums/manuals.
7. **Syslog identifier** `dockerd`. `-u` is the **systemd unit** name.
8. `journalctl --since "1 hour ago"` · `--since "2 days ago"` · `--since "2015-06-26 23:15:00" --until "2015-06-26 23:20:00"`
9. Global/startup including mail, cron, daemon, kern, auth, … · authz/sshd including unsuccessful login · cron/anacron jobs · authorization, logins, mechanisms · mail server (e.g. sendmail sent items) · extra mail logs · daily sysstat **sar** files.
10. `/var/log/secure` · `/var/log/auth.log` · `/var/log/sa/`
11. `dmesg` (kernel buffer). `journalctl -u httpd` (or `-u httpd.service`).
