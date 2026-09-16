# Tasks — Runlevels and systemd targets

Close `theory.md`. Checkpoint. Do **not** make poweroff or reboot the lasting default.

## Warm-up (SysV numbers)

1. From memory, write 0, 1, 3, 4, 5, 6. Which are typical **defaults**? Why are 0/1/6 not?
2. Memory hook check: zero life, lonely admin, server, GUI, full circle — map them.

## Files

3. What directory holds per-runlevel start/stop scripts? Decode `K20nfs` and `S10network` (letter + digits).
4. Which file stored the default runlevel? Write an example `id:3:initdefault:` in words: what boots?

## systemd mapping (repeat until automatic)

5. Map 0, 1, 3, 5, 6 to target names **and** to `runlevelN.target` compatibility names.
6. What extra target is more minimal than rescue?
7. On disk, list the compatibility symlinks and see what they point at.

## Construct (now vs next boot)

8. Show the default target (next boot).
9. Set default to the **server / no GUI** target. Show it again. Put it back if this VM should stay graphical.
10. Switch **now** to multi-user without changing the default. Use the console if this would drop a GUI. Then return.
11. Predict: `set-default` of the poweroff compatibility name — what happens on the next boot? Do **not** apply it.

## Scenario

12. This box is a server. After reboot there must be no graphical desktop; text + network must work. Configure the default. Prove what the next boot will use.
