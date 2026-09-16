# Tasks — Logs

Close `theory.md`.

## dmesg (kernel buffer)

1. Print the kernel message buffer with **wall-clock** times, not seconds since boot.
2. Find kernel version, **Command line**, e820 usable vs reserved if present. When do the notes send you here (disk/NIC/USB missing, panic)?
3. Predict: is this the same file as `/var/log/messages`? Ring buffer — what happens to old lines?

## journald / journalctl

4. What service implements logging on modern Linux? What are journals (structured, indexed, **binary**)? Why centralize?
5. Why can’t you `tail` the journal as a text file?
6. Show one **unit** (web server if installed). Who said Starting vs the ServerName warning in the notes’ story?
7. Errors-or-above, **this boot**, with extra help texts. Recite what each of the three flags means. What does the help text add when available?
8. Filter by **syslog identifier** (dockerd if present, else sshd or systemd). How is that different from unit name?
9. Last hour; last two days; an explicit `--since` / `--until` window with timestamps.

## Classic files (find + one-line purpose)

10. Open if they exist: messages, secure, cron, auth.log, maillog/mail.log, mail/ subdirectory, sa/. Write from memory what each is for (mail/cron/daemon/kern/auth; sshd failures; cron jobs; Debian auth; sendmail; extra mail; sysstat daily).
11. Fail an SSH password from another host. Find it in the auth/secure log.

## Repeat

12. Same incident (web failed to start): kernel buffer vs unit journal vs `/var/log/messages`. Which first?

## Scenario

13. Break the web unit on purpose (or use a lab that already did). Using **only** logs, diagnose, fix, show a healthy start line. Inject a marked test message and show where it landed.
