# Assignments — Logs

Close `commands.md`. Type and run. You need read access; `/var/log/secure` may be root. Do not `rm` logs. `journalctl` is read-only. Do not `dmesg` spam in a ticket without timestamps (`-T`).

## Kernel buffer (`dmesg`)

### Easy

1. [ ] `dmesg -T | less` — human timestamps. `q` after you see boot-ish lines.
2. [ ] `dmesg -T | grep` `-i` a word like `error` or a NIC name (grep topic). If permission denied, `sudo dmesg -T | less` on the lab.

### Medium

3. [ ] Last few kernel lines: `dmesg -T | tail`. Any I/O or net device?
4. [ ] Someone ran `dmesg` without `-T` and could not read the clock. Compare both.

### Hard

5. [ ] Combine: `dmesg -T | grep` a disk name from `lsblk`. Then `journalctl -p err -b` in the next set if you have journal.
6. [ ] `dmesg` empty/denied: use `sudo` on the lab or `/var/log/messages` / `kern.log` with `less` (classic files set).

## `journalctl`

### Easy

1. [ ] `journalctl -u` a unit that exists (`sshd`, `cron`, `crond`, or `httpd` if installed). `| less` if it is long.
2. [ ] `journalctl -p err -b -x` — errors this boot, extra text. `| less`.

### Medium

3. [ ] `journalctl -t` an identifier (try `sshd` or `dockerd` if Docker exists). Then `--since "1 hour ago"`.
4. [ ] `--since` and `--until` with a **today** window of a few minutes (course date form). If no lines, widen the window.

### Hard

5. [ ] Service failed? `systemctl status` + `journalctl -u` that unit + `-p err -b`. Do not restart unless it is a practice service.
6. [ ] Broken: `journalctl -u httpd` on a host without Apache. Read “no entries” vs unit not found. Try `sshd`. Combine `systemctl list-units --type service` from service-management.

## Classic text logs

### Easy

1. [ ] `ls /var/log`. `less` or `tail` a file you can read (`messages`, `syslog`, or a file in your home if `/var/log` is closed).
2. [ ] `tail -n 50` `/var/log/secure` or `auth.log` **if readable** (sudo on lab). Look for sshd.

### Medium

3. [ ] Course map: `messages` vs `secure`/`auth.log` vs `cron` vs `maillog`. `ls` which exist on **this** distro. `tail` one.
4. [ ] `tail -f` a log you can read, generate a line (`sudo` failed login or `cron` practice), Ctrl-C. If no write to the log, just Ctrl-C.

### Hard

5. [ ] Failed SSH story: `grep` ssh/`Failed` in `secure` or `auth.log` (sudo). Combine `last` only if you already know it — else `grep` + `tail`.
6. [ ] Combine: `journalctl -u sshd` vs `tail` `/var/log/secure`. `df -h /var` if logs might have filled the disk. Do not `rm` logs; the lab is for rotation later.
