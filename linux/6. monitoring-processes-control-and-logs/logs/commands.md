# Commands to memorize

```bash
dmesg -T                     # kernel message buffer with human-readable timestamps

journalctl -u httpd           # journal lines for that systemd unit (Apache)
journalctl -p err -b -x       # priority error+ ; this boot ; extra help texts when available
journalctl -t dockerd         # only syslog identifier dockerd

journalctl --since "1 hour ago"
journalctl --since "2 days ago"
journalctl --since "2015-06-26 23:15:00" --until "2015-06-26 23:20:00"

# classic text logs (also: tail -f, less, grep)
# /var/log/messages     global system + startup (mail, cron, daemon, kern, auth, …)
# /var/log/secure       authentication/authorization; sshd including failed logins
# /var/log/cron         cron/anacron job starts
# /var/log/auth.log     authorization, logins, auth mechanisms
# /var/log/maillog      mail server (e.g. sendmail)
# /var/log/mail.log     same idea (Debian-style name)
# /var/log/mail/        extra mail-server logs
# /var/log/sa/          daily sar files from sysstat
```
