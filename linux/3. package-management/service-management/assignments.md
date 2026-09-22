# Assignments — Service management

Close `commands.md`. Type and run. **start/stop/restart/isolate-like actions** affect the machine. Prefer a **lab** service you installed (e.g. a practice nginx) — not `sshd` on a remote box you cannot console. `enable`/`disable` change boot. `daemon-reload` after **your** unit edits only.

## SysV scripts (`/etc/init.d`)

### Easy

1. [ ] `ls /etc/init.d/` and pick a name you recognize. Do **not** stop it yet.
2. [ ] If the lab has a practice service script: `/etc/init.d/NAME status` or `start` only that practice service.

### Medium

3. [ ] Practice service: `stop`, then `start`, then `restart`. Confirm with `ps` if you already know it, or `systemctl status` from the next set.
4. [ ] Someone ran `/etc/init.d/nginx` with no argument. What happens? Use `start`/`stop`/`reload` as taught. `reload` vs `restart` — which is “reread config without a full stop”?

### Hard

5. [ ] `force-reload` on the practice service if the script supports it. If not, use `reload`. Do not force-reload `sshd` on a host you cannot reach another way.
6. [ ] Combine: `ls /etc/rc*.d/` or `ls /etc/init.d` from runlevels topic, find `S`/`K` links for a service. Read-only unless the lab is about SysV.

## systemd everyday (`start`, `stop`, `restart`, `reload`, `status`, `is-active`)

### Easy

1. [ ] `systemctl status` on a service that should be running (`sshd` or `cron`/`crond`). Read active/inactive and recent logs.
2. [ ] `systemctl is-active` the same unit. Exit status: 0 if active (you can `echo $?` if you know it from bash).

### Medium

3. [ ] Lab practice unit: `stop`, `is-active`, `start`, `status`. Do not stop `sshd` over SSH without a console.
4. [ ] `reload` vs `restart` on a service that supports reload (nginx if installed). `status` after each. If reload is not supported, read the error and use restart **only** on the practice service.

### Hard

5. [ ] `systemctl list-units --type service --all` and find an **inactive** service. Do not start random ones. Then `status` your practice unit.
6. [ ] Broken: `systemctl start nginx` without `.service` — often still works. Try `systemctl start name` vs `name.service`. Then a typo unit name — read the error. Combine `journalctl` only after the logs topic; for now `status`.

## Boot and unit files (`enable`, `disable`, `daemon-reload`)

### Easy

1. [ ] `systemctl is-enabled` or `status` and look for “enabled/disabled” on a known service. (If `is-enabled` was not on the cheat sheet, `status` is enough.)
2. [ ] Lab practice unit: `enable`, then `disable`. Confirm with `status` (Loaded line).

### Medium

3. [ ] Enable the practice service, `get-default` from runlevels — enabled means start at boot **for this** unit, not the same as default target. One sentence.
4. [ ] Someone edited a unit file and ran `start` without `daemon-reload`. On the lab, after a **practice** drop-in or unit edit: `daemon-reload`, then `restart` that unit.

### Hard

5. [ ] Do not enable `runlevel0` anything. Enable/disable only the practice package you installed. Prove with `status` and a listing of `/etc/systemd/system/*.wants/` if you want (`ls`).
6. [ ] Combine: install a tiny service package (software-management), `start`/`enable`/`status`, `disable`/`stop`, `apt-get remove` if you added it. Lab VM.
