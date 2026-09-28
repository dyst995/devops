# Tasks — SELinux

Close `theory.md`. Rocky / RHEL-family VM preferred. Checkpoint. Not WSL. Prefer `getenforce`, `sestatus`, `getsebool`, `ls -Z` for inspection. Do **not** jump a needed box from disabled → enforcing without the safe path; warn yourself before permanent `SELINUX=` changes.

## Warm-up (DAC vs MAC)

1. Who decides DAC vs MAC? Give the notes’ Apache vs `chmod 777` example in your own words.
2. Why use **permissive** before **enforcing** when enabling?

## Find this (mode and config)

3. Current mode short (`getenforce`). Longer status (`sestatus`). If disabled, what line does status show?
4. Read `/etc/selinux/config` (and the `/etc/sysconfig/selinux` symlink idea). `SELINUX=` vs `SELINUXTYPE=`.
5. Recite `SELINUXTYPE` values: `targeted`, `minimum`, `mls` — one phrase each from the notes.
6. Pick a file or process path you care about and show its label with `ls -Z` (or `ps -Z` if the notes/lab use it). You are only **reading** contexts here.

## Construct (mode) — careful

7. From **disabled**, can you switch enforcing **without** reboot using `setenforce`? Predict from the notes, then try only if you may. What must happen first?
8. If already enabled: temporary permissive (`setenforce 0`), then enforcing (`setenforce 1`), without editing the file. Confirm with `getenforce` each time.
9. Boot default: write the **safe** enable path from the notes (`permissive` in config → reboot → watch → `enforcing`). Do not jump disabled → enforcing on a box you need. If you edit config, note that a **reboot** (and often a relabel on first enable) is required.

## Policy knobs

10. List loaded modules (`semodule -l | less`). Name two you recognize (e.g. apache-related).
11. List booleans (`semanage boolean -l | less`). What do the two values in parentheses mean (current, default)?
12. Read one boolean (`getsebool …`). Turn it on until reboot (`setsebool … on`). Confirm. Persist with `-P`, then set it **back** both ways (runtime and persistent) so you leave the box as you found it.

## Repeat / distinguish

13. Course lab often starts disabled — write what `getenforce` prints then. Why reboot to enable/disable fully?
14. Relabel idea from the notes (first enable): in one sentence, why might the filesystem need a relabel?
15. Runtime vs boot default: `getenforce` / `sestatus` vs `/etc/selinux/config` — which is “now,” which is “after reboot”?
16. `setsebool` vs `setsebool -P` — until reboot vs survives reboot. When would you use each while testing?

## Scenario

17. Web content in a non-default directory is denied while the daemon runs (lab or your own test path). Inspect with `ls -Z` / audit clues. Fix **without** turning SELinux off. **Enforcing** must remain the success test — permissive-only “fixes” do not count.
18. Optional stretch (if a lab asks): you used a temporary label; make the mapping **permanent** so a full restore of labels on that tree does not drift back. Still leave enforcing on.
