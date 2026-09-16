# Labs — Runlevels and systemd targets

**Where:** Rocky VM console if you isolate. Checkpoint first. Do **not** `set-default` to poweroff or reboot.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

From memory, write what SysV runlevels 0, 1, 3, 5, and 6 mean. Check theory after.

## Lab 2

Show the default target. List `runlevel*.target` under systemd’s unit directory and see what each name points at.

## Lab 3

Show the default target, set default to `multi-user.target`, show it again. If this VM booted to a GUI and you still want that, set default back to `graphical.target`.

Do **not** set default to `runlevel0.target`. If you try `isolate`, use the hypervisor console, not only SSH.

## Lab 4

List SysV-style `rc` directories and `/etc/init.d` if they exist. Open `/etc/inittab` if it exists. Do not change the default runlevel there.

## Job and cert labs

## Lab 5

Set the machine to boot as a **server** (no GUI): default `multi-user.target`. Confirm `get-default`. This is the usual RHEL exam/server state.

## Lab 6

Console only: `systemctl isolate rescue.target` (or `rescue`), then return to `multi-user.target`. Have a root password ready.

## Lab 7

`systemctl mask` a lab service (not `sshd`), reboot or check `is-enabled`/`status`, then `unmask`. Contrast with `disable`. Ticket: “service keeps coming back after disable.”
