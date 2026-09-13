# 08 — Runlevels and systemd Targets — Questions

Cover the Answers section. Answer first, then check.

1. What does a runlevel define?
2. What happens at runlevel 0? At runlevel 6?
3. Which runlevels are typical defaults? Why use a lower runlevel?
4. Where do SysV per-runlevel scripts live?
5. What do `K20nfs` and `S10network` mean? What does the number do?
6. Those names are symlinks. Where do they usually point?
7. How did SysV record the default runlevel? Give the example from the notes.
8. What does systemd call runlevels?
9. Map runlevels 0, 1, 3, 5, 6 to systemd targets.
10. What are `runlevel0.target`, `runlevel3.target`, and `runlevel5.target` on a systemd system?
11. What target matches emergency mode?
12. Command to **view** the default target.
13. Command to **set** the default to `runlevel0.target`. Why is that a dangerous example?
14. You want a server to boot to text + networking, no GUI. Which target?
15. You want a graphical desktop at boot. Which target and which old runlevel?
16. Rescue vs emergency — which old runlevel is rescue, and which target is even more minimal?
17. A host is in runlevel 1. Should you expect SSH and NFS to be up? Why?

---

## Answers

1. The state of the machine after boot (which services / how much of the OS is running).
2. 0 = halt / power off. 6 = reboot.
3. Defaults are typically 3, 4, or 5. Lower levels are for maintenance / emergency; they usually have no network services.
4. `/etc/rc[0-6].d/`
5. `K20nfs`: stop (Kill) nfs, order 20. `S10network`: start network, order 10. The number is start/stop sequence (lower first).
6. `../init.d/nfs` and `../init.d/network` (the real scripts in `/etc/init.d/`).
7. `/etc/inittab`, for example `id:3:initdefault:`.
8. Targets.
9. 0 → `poweroff.target`; 1 → `rescue.target`; 3 → `multi-user.target`; 5 → `graphical.target`; 6 → `reboot.target`.
10. They are symbolic links to `poweroff.target`, `multi-user.target`, and `graphical.target`.
11. `emergency.target`.
12. `systemctl get-default`
13. `systemctl set-default runlevel0.target`. The machine would treat power-off as the default boot target.
14. `multi-user.target` (runlevel 3).
15. `graphical.target` / runlevel 5.
16. Rescue = runlevel 1 = `rescue.target`. Emergency = `emergency.target` (more minimal).
17. No. Lower runlevels usually do not offer network services — that is why they are used for repair.
