# Labs — SELinux

**Where:** Rocky VM only (not WSL). Checkpoint before changing `/etc/selinux/config`. Course labs often start **Disabled**; enabling needs a reboot and often a relabel.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Run `getenforce` and `sestatus`. Read `/etc/selinux/config`.

## Lab 2

If SELinux is **Disabled**: snapshot, set the config to `permissive`, reboot (relabel if the boot asks). Confirm `getenforce` after boot.

If it is already enabled: `setenforce 0`, `getenforce`, then `setenforce 1`. Note that `setenforce` does not work from fully Disabled.

## Lab 3

List booleans (`semanage boolean -l` or `getsebool -a`). Read one boolean with `getsebool`. Flip a **harmless** boolean with `setsebool` without `-P`, reboot or wait, see whether it stuck. Set it back. Use `-P` only if you intend it to persist, then set it back with `-P` too.

## Lab 4

List loaded modules (`semodule -l`). Start `httpd` if you use it. Put a file in a path Apache should not read (or follow the notes’ docroot experiment). Check `/var/log/audit/audit.log` or `ausearch`. Use `chcon` / `restorecon` as in the notes. Return labels to default.

Do not leave the VM in a mode you do not understand. Prefer **permissive** until you are ready for enforcing, then snapshot first.

## Job and cert labs

## Lab 5 — httpd context (RHCSA)

Serve a page from a **non-default** directory (for example `/srv/www/lab`). Set `DocumentRoot`, `restorecon` / `semanage fcontext`. In **enforcing**, get a working page. If it fails, read AVC denials (`ausearch -m avc -ts recent` or `journalctl`), fix context, do not just `setenforce 0` as the permanent fix.

## Lab 6

Boolean ticket: allow httpd to connect out (`httpd_can_network_connect` or whatever `getsebool -a | grep httpd` suggests). `-P` if you want it after reboot, then set it back.

## Lab 7

Listen on port **8080** (or 8888). If SELinux blocks the port, `semanage port -a` / `-l | grep http`. Revert the port and httpd config.

## Lab 8

`ls -Z` on `/var/www/html` vs your lab dir vs `/etc/httpd`. `chcon` a file, reboot or `restorecon -v`, see which change survived.
