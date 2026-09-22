# Assignments — logs

Close `commands.md`. Recite, then type. Work on a **lab VM**. Read-only unless the lab says otherwise.

## `dmesg`

1. [ ] Print the **kernel ring buffer** with **human-readable** timestamps (not seconds since boot). Prove the dates look like calendar time.
2. [ ] Predict: without the human-time switch, timestamps look like seconds. Optional glance; prefer `-T` for this topic.
3. [ ] Privilege: as a normal user vs root. On some kernels the buffer is restricted. Record what you see (`dmesg: read kernel buffer failed` or full output).
4. [ ] Find the kernel **version** line and the boot **Command line** (root device, LVM, crashkernel) if still in the buffer. Recite one boot argument.
5. [ ] Predict: this is **not** `/var/log/messages`. Ring buffer vs syslog file. One sentence.
6. [ ] Search the buffer (pipe to `grep`) for NIC/disk/USB/OOM words relevant to this VM. One hit or “none”.
7. [ ] Wrong usage: treat `dmesg` as a follow-file (`-w` not in the cheat sheet). Stick to dump-with-timestamps.
8. [ ] Combined: a device missing in `lsblk`/`ip` — first place is this kernel diary. Recite the memory hook.
9. [ ] Human vs default: `-T` wall clock vs seconds-since-boot. Why `-T` is easier in an incident.
10. [ ] Predict: buffer is size-limited; old lines fall off. You might not see the original boot on a long-uptime host. Record uptime vs first timestamp.
11. [ ] Recite from memory: kernel messages + human timestamps.
12. [ ] Combined with `journalctl -b`: some kernel lines appear in both. Not a puzzle; note overlap.
13. [ ] What if output is huge? Pipe to `less`. Do not dump megabytes unread into the transcript.
14. [ ] Wrong usage: redirecting over `/var/log/dmesg` as root to truncate. Read-only drill.
15. [ ] Predict: NIC link down messages after you `ifconfig … down` a spare NIC (not SSH). Prove a new line appears (or not on this driver).
16. [ ] Recite: first place for “did the kernel even see this device?”
17. [ ] Combined: OOM killer lines vs `free -h` (memory topic). If no OOM, say so.
18. [ ] Privilege: `sudo dmesg -T` if the user read failed. Prove timestamps still human.
19. [ ] What if the command is busybox-limited? Still get a buffer dump; note missing `-T`.
20. [ ] Cleanup: none (read-only). Terminal not stuck in `less`.

## `journalctl`

1. [ ] Show journal lines for a **systemd unit** (Apache `httpd` if installed; otherwise `sshd` or another real unit). Recite: this is by **unit**, not a text file path.
2. [ ] Predict: if the unit name is wrong, you get empty or “No entries”. Prove with a bogus unit name, then a real one.
3. [ ] Show **priority error and worse**, for **this boot**, with **extra help texts** when available. Recite the three switches: priority, this-boot, explain.
4. [ ] Predict: `-p err` includes err/crit/alert/emerg, not info. Prove an info-only unit log is hidden by this filter (or find an err line).
5. [ ] Filter by **syslog identifier** `dockerd` (or `sshd` if Docker is absent). Recite: `-t` is identifier, `-u` is unit — not the same.
6. [ ] Predict `dockerd` vs `docker.service`: identifier vs unit. If Docker is missing, prove empty `-t dockerd` and use `-t sshd`.
7. [ ] Show entries **since 1 hour ago**. Recite relative `--since`. Prove the oldest line is not older than ~1 hour (or empty).
8. [ ] Show entries **since 2 days ago**. Predict more lines than the 1-hour window (unless the host is younger).
9. [ ] Show a **bounded window** with absolute timestamps: `--since` and `--until` on the same calendar range (use **today’s** dates on this lab, not 2015 — the cheat sheet is the *form*).
10. [ ] Predict: `--until` without `--since` vs both. Prove a 5-minute window has fewer lines than 2 days.
11. [ ] Privilege: normal user vs root. Persistent journal may hide other users’ units. Record the difference.
12. [ ] Wrong usage: `-u` with a PID. Recite: unit name, not PID.
13. [ ] Combined: `-p err -b -x` on a healthy lab — maybe few lines. Empty can be success.
14. [ ] Recite from memory: unit, priority+boot+explain, syslog identifier, since relative, since+until absolute.
15. [ ] Combined with classic logs: `sshd` failures might be in the journal **and** `/var/log/secure`. Compare one event if you have a failed login (lab only).
16. [ ] Human vs default: pager (`less` behavior). Quit with `q`. Do not leave the pager open.
17. [ ] Predict `-b` means **this boot**, not “background”. Prove by noticing you do not see previous-boot banners (or use `-b -1` only if you already know it; not required).
18. [ ] What if systemd is not pid 1 (rare lab)? Command fails. Record; use classic files.
19. [ ] Combined: `journalctl -u sshd` after a lab `systemctl restart sshd` — new start lines. Console/lab VM only.
20. [ ] Cleanup: quit pagers. No `journalctl -f` left following in the background.
21. [ ] Recite `-x`: extra help texts **when available**. Point at an “Explanation:” block or state there was none.
22. [ ] Wrong usage: `--since` with a garbage string. Exact error. Then use a valid relative or ISO-like stamp.

## Classic text logs

Cover every path from the cheat sheet. Use `less`, `grep`, and `tail -f` (interrupt — do not follow forever). On Debian vs RHEL, some names are missing; that is data.

1. [ ] Page **`/var/log/messages`** (global system + startup: mail, cron, daemon, kern, auth, …). If missing, say “RHEL-style not here” and try `syslog`.
2. [ ] Grep **`/var/log/secure`** for `sshd` / failed logins. Recite: authentication/authorization. If missing, try `auth.log`.
3. [ ] Show **`/var/log/cron`**. Recite: cron/anacron job starts. Empty or missing? Record the OS family.
4. [ ] Show **`/var/log/auth.log`**. Recite: authorization, logins, auth mechanisms (Debian-style). Missing on RHEL is expected.
5. [ ] Show **`/var/log/maillog`**. Recite: mail server (e.g. sendmail). Missing is OK on a host without a mailer.
6. [ ] Show **`/var/log/mail.log`**. Recite: same idea, Debian-style name. Do not confuse with `maillog`.
7. [ ] List **`/var/log/mail/`** if it exists (extra mail-server logs). If not a directory, record that.
8. [ ] List **`/var/log/sa/`**. Recite: daily **sar** files from **sysstat**. If empty, sysstat may be off.
9. [ ] Combined: `messages` vs `secure` vs `cron` — pick one line from each that matches the cheat-sheet purpose.
10. [ ] Privilege: as a normal user, which of these refuse to read? Prove; then sudo **read** only.
11. [ ] `tail -f` on a log you can read; trigger a harmless event (lab `sudo` or `logger`); see a new line; **Ctrl-C**. Do not leave `-f` running.
12. [ ] Predict: `tail -f` on a **rotated** file may stall after rotate. One sentence; do not force logrotate on production.
13. [ ] Grep `sshd` in the auth/secure file. Combined with `journalctl -u sshd` — same timestamp family or not?
14. [ ] Recite the eight locations from memory: messages, secure, cron, auth.log, maillog, mail.log, mail/, sa/.
15. [ ] Human vs default: `less` + `/search` vs `grep`. Find `error` case-insensitive once.
16. [ ] Wrong usage: `cat` a multi-gig log. Always `less`/`tail`. Prove you used a pager or last-lines.
17. [ ] Combined with `dmesg -T`: kernel lines might also land in `messages` (kern). Find one or say journal-only.
18. [ ] What if `/var/log/secure` is world-unreadable? That is the point of auth logs. Do not `chmod` it.
19. [ ] Predict Debian vs RHEL names: `auth.log` vs `secure`, `mail.log` vs `maillog`. You already proved which exist.
20. [ ] Cleanup: no `tail -f` jobs. Pagers quit. Do not truncate logs (`>`).
