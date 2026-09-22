# Assignments — Disk quotas

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

Practice on a **lab filesystem** you can remount. Do not enable quotas on the OS root of a production server. Recite `usrquota` / `grpquota` on the fstab mount — those are mount options, not a separate binary.

## `quotacheck`

1. [ ] Recite the pipeline: fstab quota options → this scan → `quotaon` → set limits → report.
2. [ ] Goal: scan the filesystem and **build/update quota files**.
3. [ ] Recite: this is a scan/build step, not the “turn quotas on” step.
4. [ ] Privilege: predict root is required.
5. [ ] What if the operand is missing: no filesystem. Predict usage / “specify filesystem”. Do not point it at `/` on a real server.
6. [ ] Wrong usage: run against a mount that has **no** `usrquota`/`grpquota` in fstab. Predict it cannot do useful accounting until the mount options exist.
7. [ ] Recite the fstab idea: `usrquota,grpquota` on **that** mount so accounting is enabled.
8. [ ] Combine: remount or reboot a **lab** mount with those options, then run this scan.
9. [ ] Human vs default: this command’s job is quota file creation, not a pretty usage table (`repquota` is the report).
10. [ ] Predict: it may want the filesystem quiescent; on a busy production mount it is the wrong place to experiment.
11. [ ] Privilege / destructive: scanning `/` on a live host can be heavy. Lab disk or throwaway partition only.
12. [ ] What if quota files already exist — predict it **updates** them (sheet: build/update).
13. [ ] Combine: after a successful scan, `quotaon` should be able to turn quotas on.
14. [ ] Wrong usage: confusing this with `fsck`. Recite: quota files vs filesystem repair.
15. [ ] Recite from memory: “scan the FS and build/update quota files”.
16. [ ] Predict: user and group quota files appear on that filesystem (classic `aquota.*` names — note what your distro uses).
17. [ ] Wrong usage: a throwaway directory that is not a mount point. Predict you must target a real mount.
18. [ ] Combine with `quotaon`: order is check/build first, then on.
19. [ ] Human vs default: verbose flags exist in the wild; the sheet is the bare name — know the **goal**, not a flag zoo.
20. [ ] Prove fstab options are the prerequisite: write the two option names from memory (`usrquota`, `grpquota`).

## `quotaon`

1. [ ] Turn quotas **on** for a lab filesystem that already has quota files.
2. [ ] Recite: this enables enforcement/accounting; it is not `quotacheck` and not `setquota`.
3. [ ] Privilege: predict root is required.
4. [ ] What if the operand is missing: no filesystem. Predict usage error.
5. [ ] Wrong usage: turn on before `quotacheck` built files. Predict failure.
6. [ ] Wrong usage: mount lacks `usrquota`/`grpquota`. Predict quotas cannot really be on.
7. [ ] Combine: fstab options → `quotacheck` → this.
8. [ ] Human vs default: “on” vs later editing limits — on does not set the numbers; `edquota`/`setquota` do.
9. [ ] Predict success is quiet or a short confirmation; then `quota`/`repquota` start to mean something.
10. [ ] Recite from memory: “turn quotas on”.
11. [ ] Privilege: do not enable on production `/` as a first practice.
12. [ ] What if quotas are already on — predict “already on” / no-op error.
13. [ ] Combine: after this, a user hitting a **hard** limit should fail to write more (lab user only).
14. [ ] Recite: quotas can be user **and** group; these options pair with this command.
15. [ ] Wrong usage: `quotaon` a file in a throwaway dir. Predict it wants a mount/filesystem.
16. [ ] Predict: turning on does not print every user’s usage (`repquota` does).
17. [ ] Combine with `quota`: current user sees limits only once this is on and limits exist.
18. [ ] Human vs default: counterpart conceptually is “off” (not on the sheet) — you still practice **on** as the cheat-sheet verb.
19. [ ] Recite soft vs hard (theory): on + limits; soft warns/grace, hard is the ceiling.
20. [ ] Prove the mount is the unit of quotas — one filesystem, not one random subdirectory, unless that dir is the mount.

## `edquota`

1. [ ] Recite: edit a user’s or group’s **soft/hard** limits (interactive).
2. [ ] Goal: open the quota editor for a **lab** user (not a production account).
3. [ ] Privilege: predict root is required to set others’ quotas.
4. [ ] What if the operand is missing: no username. Predict usage / it does not know whom.
5. [ ] Wrong usage: a username that does not exist. Predict error.
6. [ ] Recite: this is interactive (editor); `setquota` is the non-interactive twin.
7. [ ] Combine: quotas must be on (`quotaon`) or edits may not apply as you expect — note what your lab does.
8. [ ] Human vs default: you will see blocks **and** inodes (space and file-count). Recite both resources.
9. [ ] Predict: soft = warning/grace, hard = cannot go beyond. Put a hard block limit on the lab user.
10. [ ] Privilege: abort the editor without saving if you opened the wrong user. Do not save wild numbers for `root`.
11. [ ] What if the editor is `vi` and you are unprepared — practice `:q!` on a throwaway edit rather than saving garbage.
12. [ ] Combine: after save, `quota` as that user (or `repquota`) should show the new limits.
13. [ ] Wrong usage: editing limits on the filesystem that holds the OS until the disk is unusable. Lab FS only; keep hard limits small but non-zero for a test user.
14. [ ] Recite user vs group: you can cap a person separately from a project group.
15. [ ] Human vs default: interactive vs `setquota` scripting — know when you’d pick this (humans, one-off).
16. [ ] Predict: changing limits does not delete the user’s files.
17. [ ] Combine: set a tiny hard limit, then as the lab user create files until write fails (throwaway files in their tree on that FS).
18. [ ] Wrong usage: this is not `passwd` and not `edquota` of fstab — you edit quota records.
19. [ ] Recite from memory: “edit a user’s/group’s soft/hard limits (interactive)”.
20. [ ] Prove blocks and inodes are separate columns — a user can have space left but be out of inodes (describe the test: many empty files) on the lab FS only.

## `setquota`

1. [ ] Recite: set limits **non-interactively** (scriptable).
2. [ ] Goal: apply block/inode soft/hard numbers for a lab user without opening an editor.
3. [ ] Privilege: predict root is required.
4. [ ] What if the operand is missing: no user/fs/limits. Predict usage error.
5. [ ] Wrong usage: swap this with `edquota` in a script — this is the one that does not need `$EDITOR`.
6. [ ] Combine: after setting, `quota` or `repquota` must reflect the numbers.
7. [ ] Human vs default: you pass numbers on the command line (human-facing editors are `edquota`).
8. [ ] Recite: still two resources (blocks and inodes) and user vs group forms.
9. [ ] Predict: a hard block of 0 may mean “no limit” or “zero allowed” depending on implementation — check `quota` output and do not lock out a real user.
10. [ ] Privilege: never set a production human to hard 0 on `/home` as a joke.
11. [ ] What if the filesystem has quotas off — predict the set fails or does not enforce until `quotaon`.
12. [ ] Combine: `quotacheck` → `quotaon` → this → `repquota`.
13. [ ] Wrong usage: a non-existent mount. Predict error.
14. [ ] Recite from memory: “set limits non-interactively”.
15. [ ] Human vs default: same limits you would type in `edquota`, without the interactive file.
16. [ ] Combine: set a group limit (lab group) and prove `repquota` group view (if you use the group form).
17. [ ] Predict success is quiet.
18. [ ] Wrong usage: treating this as `chmod` or `chown`. Quotas are not file modes.
19. [ ] Recite soft vs hard again, then set **soft < hard** for a saner lab test.
20. [ ] Prove you can round-trip: set → `quota` as that user → numbers match.

## `repquota`

1. [ ] Report usage vs limits (admin view) on the lab filesystem.
2. [ ] Recite: admin report — not the per-user `quota` command.
3. [ ] Privilege: predict root is required for a full report of everyone.
4. [ ] What if the operand is missing: no filesystem. Predict usage / default confusion. Pass the lab mount.
5. [ ] Wrong usage: run as an unprivileged user and expect every account’s numbers.
6. [ ] Combine: after `setquota`/`edquota`, prove the lab user’s used/soft/hard appear.
7. [ ] Human vs default: this is the human admin table; `quota` is “me” (or named user).
8. [ ] Predict columns for blocks and inodes, used vs limits.
9. [ ] Recite from memory: “report usage vs limits (admin)”.
10. [ ] Privilege: reporting is read-only; it should not change limits.
11. [ ] What if quotas are off — predict empty, error, or zeros. Note what you see.
12. [ ] Combine: identify who is over **soft** (grace) vs at **hard**.
13. [ ] Wrong usage: this does not turn quotas on.
14. [ ] Recite: why DevOps cares — one user filling `/home` or inodes — this is how you see it.
15. [ ] Human vs default: you want the table, not raw quota file bytes (`cat` of aquota files is the wrong lesson).
16. [ ] Combine with `quota` for the same lab user: used numbers should agree.
17. [ ] Predict: users with no limits and no files may be omitted or zero — note your distro.
18. [ ] Wrong usage: a throwaway file path instead of a mount.
19. [ ] Recite user **and** group reporting as a concept (space and file count).
20. [ ] Prove you can answer “who is closest to their hard block limit?” from one report.

## `quota`

1. [ ] Show quota for the **current** user.
2. [ ] Show quota for a **named** lab user (as admin).
3. [ ] Recite: current or named user — not the full admin dump (`repquota`).
4. [ ] Privilege: a normal user can usually see **their** quota; others’ may need root.
5. [ ] What if the operand is missing: no name → current user. Predict your own report, not usage error.
6. [ ] Wrong usage: a user that does not exist. Predict error.
7. [ ] Combine: as the lab user, create throwaway files on the quota FS, then this command — used blocks/inodes rise.
8. [ ] Human vs default: output is a small table for one user; compare to `repquota`’s many rows.
9. [ ] Predict: if no quota applies, you may see “none” / empty — note it.
10. [ ] Recite from memory: “show quota for the current (or named) user”.
11. [ ] Privilege: do not probe random production users on a shared box; use a lab account.
12. [ ] What if over **soft** but under **hard** — predict a warning/grace, writes still work.
13. [ ] What if at **hard** — predict writes fail; then `rm` throwaway files to recover.
14. [ ] Combine: `setquota` then this — numbers must match.
15. [ ] Wrong usage: expecting this to *set* limits (that is `edquota`/`setquota`).
16. [ ] Recite blocks vs inodes in the output — identify both.
17. [ ] Human vs default: units may be blocks not GiB; do not assume `df -h` units.
18. [ ] Combine with `df`: `df` is the whole FS; this is **your** cap on that FS.
19. [ ] Wrong usage: `quota` of a directory path like `chmod`. It wants a user, not a file.
20. [ ] Prove current-user vs named-user: same numbers when you name yourself.
