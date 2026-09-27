# Tasks — Runlevels and systemd targets

Close `theory.md`. Prefer display / predict. Do **not** make `poweroff` or `reboot` the lasting default. Do not `isolate` to poweroff/reboot. Work answers under `/tmp/runlevels-tasks` if useful.

## Warm-up — SysV runlevels

1. From memory, write the meaning of runlevels **0, 1, 3, 4, 5, 6**.
2. Which runlevels are typical **defaults** (3, 4, or 5)? Why are 0 / 1 / 6 not used as everyday defaults?
3. Memory hook check: zero life, lonely admin, server, GUI, full circle — map each phrase to a number.
4. What does runlevel **1** usually lack that makes it useful for maintenance (network services)?
5. What is runlevel **4** often used for (unused / custom; some distros like 3)?

## SysV files and K/S scripts

6. What directory holds per-runlevel start/stop scripts (`/etc/rc[0-6].d/`)?
7. Decode `K20nfs -> ../init.d/nfs`: what does **K** mean, what is `20`, what service?
8. Decode `S10network -> ../init.d/network`: what does **S** mean, what is `10`? Memory hook: lower number runs first.
9. Which file stored the default runlevel historically? Write `id:3:initdefault:` in words: what boots?
10. On this machine (read-only): check whether `/etc/inittab` and any `/etc/rc*.d/` dirs exist. Note “SysV legacy present / not present.” Do not edit.

## systemd targets (mapping)

11. Map runlevels **0, 1, 3, 5, 6** to systemd **target** names from the notes.
12. Map the same numbers to compatibility symlink names (`runlevelN.target`). What do those symlinks point at?
13. What extra target is more minimal than rescue (`emergency.target`)?
14. Runlevel 3 is emulated by which target? Runlevel 5 by which? One sentence each (text+network vs GUI).
15. Under `/tmp/runlevels-tasks`, rewrite the full mapping table from memory (old runlevel → target → compatibility symlink). Check theory after.

## Commands — default vs now

16. Show the default target this machine boots into (`systemctl get-default`). Safe to run.
17. Write the `systemctl set-default` command for **server / no GUI** (`multi-user.target`). Write the one for **desktop GUI** (`graphical.target`).
18. Write `systemctl set-default runlevel0.target`. Predict what the next boot does. Do **not** apply it on a real server.
19. Distinguish `set-default` vs `isolate`: which changes the next boot, which switches **now** without changing the default?
20. Write `systemctl isolate multi-user.target`. Predict the effect on a graphical session. Do not run it on a machine you care about staying graphical unless you know how to return (`isolate graphical.target` / reboot).

## Safe observation on this machine

21. List the compatibility symlinks if present (`ls -l /lib/systemd/system/runlevel*.target` or `/usr/lib/systemd/system/runlevel*.target` — paths vary). Confirm they point at `poweroff`, `rescue`, `multi-user`, `graphical`, `reboot` as expected.
22. Compare `systemctl get-default` with the mapping table. Is this box configured more like a server (3 / multi-user) or a desktop (5 / graphical)?

## Scenario

23. This box is a server. After reboot there must be no graphical desktop; text + network must work. Write the exact `set-default` command, then the proof command (`get-default`). If you apply it on a lab VM, put graphical back afterward if needed. Never set the default to `runlevel0.target` / `poweroff.target` or `reboot.target` as a “test.”
