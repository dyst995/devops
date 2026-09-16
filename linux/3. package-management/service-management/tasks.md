# Tasks — Service management

Close `theory.md`. Do not stop `sshd` if that is your login.

## init.d

1. Where do the legacy scripts live? What is the calling shape (`directory / name / option`)?
2. List the option words from the notes (`start` through `force-reload`).
3. If `/etc/init.d/` still has a script you may touch, start/status/stop it. Compare with the systemd verbs for the same service.
4. Read the static-route example in theory once more **after** you try: what is `$1`? What does unknown option do (exit code)?

## systemd — concepts

5. System vs user instance: which conf files?
6. Name journald, logind, networkd’s jobs from the notes.
7. Vendor units vs admin units vs runtime: three directory paths.
8. List unit **suffixes** from the notes (service, socket, timer, …).
9. From memory: `[Unit]` vs `[Service]` vs `[Install]` — one sentence each.
10. `Requires` vs `Wants`; `WantedBy=multi-user.target` means what at enable time?
11. Read the Tomcat example: why `Type=forking`? why `After=network.target`?

## systemctl (do, then repeat enable vs start)

12. For `httpd` or `nginx`: start, status, is-active, reload if supported, restart, stop.
13. Enable at boot; check enabled; disable. Predict: does enable start it **now**?
14. List all service units including inactive.
15. After you edit a unit (or a drop-in), what must you run before restart? Do a harmless drop-in and undo it.

## Scenario

16. Ship a small unit that appends a heartbeat to a log, starts on a normal server boot (`WantedBy` from the notes), and comes back if the process dies (`Restart=`). Prove start, kill, boot if you can.
17. Web unit is failing. Use status + logs. Fix. Do not guess without evidence.
