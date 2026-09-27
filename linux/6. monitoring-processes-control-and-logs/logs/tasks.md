# Tasks — Logs

Close `theory.md`. Prefer read-only queries. Do not wipe journals or truncate production log files on a shared host.

## Warm-up

1. Memory hook: boot/hardware/driver → ? · unit/service since systemd → ? · classic syslog files → ?
2. Name the three places you read logs from this topic: kernel ring buffer, systemd journal, `/var/log/…`.
3. Predict: is `dmesg` the same file as `/var/log/messages`? Ring buffer — what happens to old lines?

## dmesg (kernel buffer)

4. Print the kernel message buffer with **wall-clock** times (`dmesg -T`), not seconds since boot.
5. Find kernel version, **Command line**, e820 usable vs reserved if present. When do the notes send you here (disk/NIC/USB missing, panic)?
6. Recite: `dmesg -T` = kernel diary with wall-clock times. First place for “did the kernel even see this device?”

## journald / journalctl

7. What service implements logging on modern Linux? What are journals (structured, indexed, **binary**)? Why centralize?
8. Why can’t you `tail` the journal as a text file? What do you use instead (`journalctl`, optionally `-f`)?
9. Show one **unit** (`journalctl -u httpd` or `nginx` / `sshd` if installed). Who said Starting vs a config warning in the notes’ httpd story?
10. Errors-or-above, **this boot**, with extra help texts (`journalctl -p err -b -x`). Recite what each of `-p`, `-b`, `-x` means. What does the help text add when available?
11. Filter by **syslog identifier** (`journalctl -t dockerd` if present, else `sshd` or `systemd`). How is `-t` different from unit name `-u`?
12. Last hour; last two days; an explicit `--since` / `--until` window with timestamps. Run all three forms from the notes.
13. Memory hook: `-u` unit · `-t` syslog name · `-p` level · `-b` this boot · `-x` extra help · `--since` / `--until` time box. Recite without looking.

## Classic files under `/var/log/`

14. Open if they exist: `messages` (or `syslog`), `secure`, `cron`, `auth.log`, `maillog`/`mail.log`, `mail/` subdirectory, `sa/`. Write from memory what each is for (mail/cron/daemon/kern/auth; sshd failures; cron jobs; Debian auth; sendmail; extra mail; sysstat daily).
15. Distro note: RHEL-family `secure` vs Debian-family `auth.log` — same story, different path. Which exists here?
16. Fail an SSH password from another host (or local if that is all you have). Find it in the auth/secure log. If you cannot fail SSH safely, `grep` an existing failure line instead.
17. Optional: inject a marked test message (`logger` if available) and show where it landed (journal and/or `messages`/`syslog`).

## Construct / distinguish

18. Write from memory: `dmesg -T`, one `-u` query, `journalctl -p err -b -x`, one `-t` query, one `--since` window. Run each once.
19. Same incident (web failed to start): kernel buffer vs unit journal vs `/var/log/messages`. Which first? Justify from the notes.
20. Distinguish: journal (binary, query with `journalctl`) vs classic text files (`tail`/`less`/`grep`).

## Scenario

21. Break a disposable unit on purpose (or use a lab that already did). Using **only** logs, diagnose, fix, show a healthy start line. If you cannot break a unit on this host, walk the diagnosis path on `sshd` or another unit that has recent journal lines.
22. Ticket: “disk vanished after reboot.” Which log do you open first (`dmesg -T`), and what strings do you hunt (device, driver, error)?
23. Ticket: “Apache failed an hour ago.” Name the `journalctl` flags you would combine (`-u`, `--since`, maybe `-p` / `-x`).
24. Ticket: “someone hammered SSH.” Which classic file(s), and what would you `grep` for?
