# Service management: init.d and systemd — Questions

Cover the Answers section. Answer first, then check.

1. What is the default init/service manager on modern Linux? Why still learn init.d?
2. Where do init.d scripts live? What are they written as?
3. Write the init.d syntax. List the usual options.
4. In the static-routes script, what is `$1`? What happens on an unknown option?
5. systemd system instance vs user instance — which config files?
6. Name three other systemd components besides the init daemon.
7. What are `.target` files for, relative to SysV runlevels? Give one compatibility name.
8. Three unit-file directories and who owns each.
9. Recite at least six unit **types**.
10. Three main sections of a `.service` file. One-line job of each.
11. `Requires=` vs `Wants=`. `Before=` vs `After=`.
12. What do `BindsTo=`, `PartOf=`, `Conflicts=`, `OnFailure=` do?
13. `[Service]`: `Type=`, `ExecStart=`, `ExecStop=`, `Restart=`, `User=`/`Group=`, `Environment=` vs `EnvironmentFile=`.
14. `[Install]`: `WantedBy=` vs `RequiredBy=`. Why does Tomcat use `WantedBy=multi-user.target`?
15. From the Tomcat unit: why `After=network.target`? Why `Type=forking`?
16. Recite the `systemctl` commands from the notes (start through list-units).
17. `systemctl start` vs `systemctl enable`. What after you edit a unit file?
18. Rewrite `/etc/init.d/nginx restart` as systemd.

---

## Answers

1. systemd. Backward compatibility: old systems and leftover SysV scripts.
2. `/etc/init.d/`. Shell scripts.
3. `/etc/init.d/<command> <option>` — start, stop, reload, restart, force-reload.
4. The option (`start`/`stop`). Usage message and exit 1.
5. System: `system.conf` + `system.conf.d/`. User: `user.conf` + `user.conf.d/`.
6. journald, logind, networkd (among others).
7. Group units and mark boot stages; flexible replacement for runlevels. Example: `runlevel3.target`.
8. `/usr/lib/systemd/system/` packages · `/run/systemd/system/` runtime · `/etc/systemd/system/` admin-created.
9. service, socket, device, mount/automount, swap, target, path, timer, snapshot/slice/scope.
10. `[Unit]` metadata/deps · `[Service]` process · `[Install]` enable/disable / which target wants it.
11. Requires = hard fail if dep fails. Wants = start dep but OK if it fails. Before/After = order only.
12. Bound unit stop → this stops · listed units stop/restart → this too · cannot be active together · start these if this fails.
13. Startup style · start command · stop command · restart-on-fail policy · run-as · inline env vs env file.
14. WantedBy = targets that pull this in when enabled (weaker). RequiredBy = targets that require it. `multi-user.target` = normal multi-user server boot (no GUI required).
15. Do not start Tomcat before networking. The startup script forks a daemon and the parent exits.
16. `start` `stop` `restart` `reload` `status` `is-active` · `list-units --type service --all`
17. start = now. enable = on boot (uses `[Install]`). `systemctl daemon-reload` then restart.
18. `systemctl restart nginx` (or `nginx.service`).
