# Tasks — Service management

Close `theory.md`. Prefer `status` / `list-units` / `is-active`. Do **not** stop `sshd` (or whatever keeps your login). Do **not** mask critical units. For start/stop/reload, use a disposable lab unit or a non-critical service you may touch.

## Warm-up — init.d

1. Where do the legacy scripts live? What is the calling shape (`directory / name / option`)?
2. List the option words from the notes (`start` through `force-reload`).
3. Memory hook: init.d = a **shell script** per service; systemd = a **declarative unit** + `systemctl`. Restate in your own words.
4. Read the static-route example: what is `$1`? What does an unknown option print, and what exit code?

## Warm-up — systemd concepts

5. System vs user instance: which conf files does each read?
6. Name journald, logind, and networkd’s jobs from the notes.
7. Vendor units vs admin units vs runtime: three directory paths. Who puts files where?
8. List unit **suffixes** from the notes (service, socket, timer, …). One-line purpose for `service`, `timer`, and `target`.
9. From memory: `[Unit]` vs `[Service]` vs `[Install]` — one sentence each.
10. `Requires=` vs `Wants=`; `WantedBy=multi-user.target` means what at **enable** time?
11. Other `[Unit]` keys from the notes — give one-line meanings for `After=` / `Before=`, `Conflicts=`, `OnFailure=` (pick any three if you cannot recite all).
12. `[Service]` keys: what are `Type=`, `ExecStart=`, `Restart=`, `User=` / `Group=` for? When is `PIDFile=` typical?
13. Read the Tomcat example: why `Type=forking`? why `After=network.target`? What does `WantedBy=multi-user.target` do when you enable?

## init.d — do (safe)

14. If `/etc/init.d/` still has a script you may inspect, list options by reading the script or running it with a bad option (expect usage / exit 1). Compare the verbs to systemd’s `start` / `stop` / `restart` / `reload`.
15. Write (do not necessarily install) the `/etc/init.d/name option` lines for start, stop, restart, reload, and force-reload for a service named `nginx` as in `commands.md`.

## systemctl — inspect and practice

16. For a unit you may observe (`cron`/`crond`, `nginx`, `httpd`, or a lab unit): run `systemctl status`, `systemctl is-active`, and note Active / Main PID / recent log lines.
17. `systemctl list-units --type service --all` — find one **inactive** and one **active** service. What does `--all` add vs without it?
18. Predict, then verify on a disposable unit (or write-the-command-only if you must not change state): does `enable` start the service **now**? What do `start` / `stop` control vs `enable` / `disable`?
19. Write the exact commands for: start, stop, restart, reload (if supported), enable, disable, `daemon-reload`. Do not run destructive stops on login-critical units.
20. After you edit a unit (or a drop-in under `/etc/systemd/system/`), what must you run before restart? Create a **harmless** drop-in for a lab unit if you have one, `daemon-reload`, then undo the drop-in and reload again.

## Scenario

21. Ship a small unit under `/etc/systemd/system/` (lab only) that appends a heartbeat to `/tmp/labhello.log`, starts on a normal server boot (`WantedBy=` from the notes), and comes back if the process dies (`Restart=`). Prove: `start`, `status` / `is-active`, kill the process and watch it return, then `stop` and remove/disable the unit. Do not leave it enabled on a shared VM.
22. A web unit is failing. Use `status` + recent logs (journal from status, or the unit’s log lines). Name the evidence you would collect **before** guessing a fix. Fix only if this is your lab service.
23. Someone proposes `systemctl mask sshd` “just to test.” Using this topic’s safety rules: refuse and say what you would run instead to inspect state.
