# Labs — Service management

**Where:** Rocky VM. Install `httpd` if needed. Do not disable `sshd` if that is how you are logged in.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1 — systemd

For `httpd` (or `nginx`): `start`, `status`, `is-active`, `reload` (if supported), `restart`, `stop`. `enable` it, reboot or check `is-enabled`, then `disable` if you do not want it at boot.

## Lab 2

List all service units (`list-units --type service --all`). Read the unit file path from `systemctl cat httpd`. Do not break the unit. If you add a drop-in, `daemon-reload` and then remove the drop-in.

## Lab 3 — SysV-style

If `/etc/init.d/` still has a script for a service you may touch, run `start` / `status` / `stop` on that script. Compare with the `systemctl` commands for the same service.

## Lab 4

From memory, write when you would `reload` vs `restart`, and `enable` vs `start`. Check theory after.

## Job and cert labs

## Lab 5 — custom unit (RHCSA/job)

Write `/etc/systemd/system/labhello.service`: `simple` or `oneshot`, `ExecStart` a script that appends a timestamp to `/tmp/labhello.log`. `daemon-reload`, `start`, `status`, `enable`, reboot if you can, confirm the log. `disable` and remove the unit when done.

## Lab 6

`systemctl edit labhello` (or `httpd`): add `Restart=on-failure` in a drop-in. Kill the process (`kill` the Main PID) and see whether systemd brings it back. Remove the drop-in.

## Lab 7

Ticket: “httpd failed to start after a config change.” Break a test config (or stop the service), use `systemctl status` and `journalctl -u httpd -e` to diagnose, fix, start.

## Lab 8

`mask` vs `disable` vs `stop` on the lab unit. `is-enabled` after each. Unmask.
