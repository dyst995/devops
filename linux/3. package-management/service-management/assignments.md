# Assignments — service management

Close `commands.md`. Recite, then type. Use a service you may touch (`nginx`, `httpd`, a lab unit). **Do not stop `sshd` if that is your login.**

## `/etc/init.d`

1. [ ] Recite the calling shape: directory, script name, option word. Where do the legacy scripts live?
2. [ ] List the option words from the cheat sheet: start, stop, restart, reload, force-reload. One sentence each.
3. [ ] Start a service whose SysV script you may touch. Prove it is up (process, port, or status).
4. [ ] Stop that same service. Prove it is down. Start it again so you do not leave it broken.
5. [ ] Restart it (full stop then start). Predict: running processes get new PIDs? Check if you can.
6. [ ] Reload it (reread config without a full stop). Predict: when would you choose reload over restart?
7. [ ] Force-reload it. Recite how that differs from a polite reload on typical SysV scripts (retry / restart if reload is unsupported).
8. [ ] Predict unknown option: pass a garbage word as `$1`. What does the static-route example in the notes do (usage, exit 1)?
9. [ ] Recite: the script **is** the API — a `case` on `$1`. Open a script you may read and find the `start)` / `stop)` branches.
10. [ ] Privilege: run start as a normal user. Predict permission denied or a wrapper that asks for root.
11. [ ] Wrong-usage: omit the option word. Predict usage message vs default start.
12. [ ] Combine: start → reload → restart → stop → start. After each, one proof (status or curl).
13. [ ] Recite that on some systems `service name start` wraps the same scripts. If `service` exists, compare it to calling the file directly.
14. [ ] Predict: if `/etc/init.d/name` is missing but `systemctl` knows the unit, which path still works?
15. [ ] Compare SysV `reload` vs systemd `reload` for the same daemon: same idea (config reread), different caller.
16. [ ] Recite: `force-reload` is in the SysV option list; do not invent a systemd verb of the same name unless the unit defines it.
17. [ ] If the box has no nginx SysV script, pick another script in `/etc/init.d/` you may inspect (even if you only read, not start).
18. [ ] Predict: `restart` vs `stop` then `start` — should the end state match? Prove with a harmless service.
19. [ ] Recite the static-route example’s `stop)` branch: it can be a no-op. Not every script undoes `start`.
20. [ ] Leave the service in the state you found it (enabled and running if that was production-like).

## `systemctl`

1. [ ] Start a unit **now**. Recite that this does not by itself make it start at boot.
2. [ ] Stop that unit. Prove with status. Start it again if it should stay up.
3. [ ] Restart it. Predict PID change vs reload. Confirm in status if the main PID is shown.
4. [ ] Reload the unit if it supports reload. If status says the unit cannot reload, recite that and skip breaking it.
5. [ ] Show status: running? recent logs? Recite two things status is for.
6. [ ] Ask whether the unit is active in a way that yields **exit 0** if active. Prove `echo $?` after an active unit and after a stopped one.
7. [ ] Enable the unit at boot. Recite that enable uses the `[Install]` `WantedBy=` line (often `multi-user.target`).
8. [ ] Predict: does enable start the unit **right now**? Prove (enable a stopped lab unit, check is-active).
9. [ ] Disable the unit so it does not start at boot. Recite: disable ≠ stop. Prove it can still be running until you stop it.
10. [ ] After you edit a unit file or drop-in, reload systemd’s view of units. Recite **when** you must do this (before restart of that unit).
11. [ ] List **all** service units, including inactive. Recite the type filter and the flag that includes inactive.
12. [ ] Predict missing operand: `systemctl start` with no unit name. What happens?
13. [ ] Wrong-usage: `start` a typo unit name. Read the error (not-found vs inactive).
14. [ ] Privilege: as a normal user, start a **system** unit. Predict auth failure; try a **user** unit only if you have one.
15. [ ] Combine for one web unit you may touch: start, status, is-active, reload-if-supported, restart, stop. Record each result.
16. [ ] Recite enable vs start in one sentence each, then disable vs stop.
17. [ ] After a harmless drop-in, daemon-reload, then undo the drop-in and daemon-reload again. Prove status no longer mentions your drop-in.
18. [ ] Recite: `name.service` — the suffix can be omitted for service units on many systems. Try with and without `.service`; same unit?
19. [ ] List units filtered to type service **without** `--all`. Predict you see fewer (inactive hidden). Then list with `--all`.
20. [ ] Restore enablement and running state to what you found. Do not leave `sshd` or the lab’s login path disabled.
