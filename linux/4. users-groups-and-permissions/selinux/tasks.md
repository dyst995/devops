# Tasks — SELinux

Close `theory.md`. Rocky VM. Checkpoint. Not WSL.

## Warm-up (DAC vs MAC)

1. Who decides DAC vs MAC? Give the notes’ Apache vs `chmod 777` example in your own words.
2. Three modes: policy loaded? denies? logs? Memory hook: lock / write down / no SELinux.

## Find this

3. Current mode (short). Longer status. If disabled, what line does status show?
4. Read `/etc/selinux/config` (and the sysconfig symlink idea). `SELINUX=` vs `SELINUXTYPE=` (`targeted` / `minimum` / `mls`).

## Construct (mode)

5. From disabled, can you switch enforcing **without** reboot using the temporary switch? Predict from the notes, then try.
6. If already enabled: temporary permissive, then enforcing, without editing the file. Confirm with the short checker.
7. Boot default: set permissive in the config (safe path in the notes), reboot if you are practicing enable. Do not jump disabled → enforcing on a box you need.

## Policy knobs

8. List loaded modules (page it). List booleans (current, default).
9. Read one boolean. Turn it on until reboot. Confirm. Persist with the flag that survives reboot, then set it back both ways.

## Repeat

10. Course lab often starts disabled — write what `getenforce` prints then. Why reboot to enable/disable fully? Relabel idea from the notes (first enable).

## Scenario

11. Web content in a non-default directory is denied while the daemon runs. Fix **without** turning SELinux off. Enforcing must remain the success test.
