# Labs — Logs

**Where:** Rocky VM. `httpd` and `sysstat` help. Failed SSH is easier from Windows or VM B.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

`dmesg -T` and find boot/kernel lines (version, command line, hardware). Do not dump the whole buffer into notes.

## Lab 2

`systemctl start httpd` (install if needed). `journalctl -u httpd`. `journalctl -p err -b -x`. `journalctl -t` with an identifier that exists on this box (try `systemd` or `sshd` if `dockerd` is absent).

## Lab 3

`journalctl --since "1 hour ago"`, `--since "2 days ago"`, and a `--since` / `--until` window using explicit timestamps.

## Lab 4

Open, if they exist: `/var/log/messages`, `/var/log/secure`, `/var/log/cron`, `/var/log/auth.log`, `/var/log/maillog` or `mail.log`, `/var/log/mail/`, `/var/log/sa/`. From another host, fail an SSH password once and find that event in the auth/secure log.

From memory, write what each of those paths is for; check theory after.

## Job and cert labs

## Lab 5

Break `httpd` on purpose (bad `Listen` or missing DocumentRoot). `journalctl -u httpd -e --no-pager`. Fix and start. This is the on-call loop.

## Lab 6

Failed SSH as a user. Find it in `/var/log/secure` (or `journalctl -u sshd`). Count failures with `grep`.

## Lab 7

`journalctl --since "10 min ago" -p err`. `journalctl -b -1` if a previous boot exists. Persistent journal: check `/var/log/journal` and whether vacuum is needed (read-only unless you intend to change Storage=).

## Lab 8

`logger -t labticket "test"` and find it in journal and/or `/var/log/messages`.

## Lab 9

OOM or disk error: `dmesg -T | tail` correlated with `journalctl -k`. Ticket: “box died, we rebooted.”
