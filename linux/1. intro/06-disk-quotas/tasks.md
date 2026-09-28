# Tasks — Disk quotas

Close `theory.md`. Prefer **predict / write the commands and fstab options you would use**. Run only safe read-only checks unless you have a dedicated lab filesystem (never the root FS of a shared machine). Keep written answers under `/tmp/disk-quotas-tasks` if useful.

## Warm-up — concepts

1. In one sentence: what do disk quotas do, and when do they alert an admin?
2. Quotas apply to which two **kinds of identity** (individual users and …)?
3. You can limit which two **resources**? Fill the table from memory: **blocks** vs **inodes** — what each controls and why it exists.
4. Soft vs hard: which is warning / grace period, which cannot be exceeded?
5. Why would a volume report “disk full” with gigabytes of free space? Tie the answer to inodes and tiny files.

## Why DevOps cares

6. Give three DevOps situations from the notes where quotas matter (shared `/home` or mail, build agents, multi-tenant jump hosts). One sentence each.
7. Distinguish: capping a person’s mail/home files vs capping a **project group** they belong to — why both matter on the same volume.

## Enable and operate (procedure — write, don’t break prod)

8. Write the two **fstab** mount option names from the notes that enable quota accounting for users and groups (`usrquota`, `grpquota`). Where do they go (on the mount line)?
9. After adding those options, what remount idea would you use before quotas can work? (Write the idea; do not remount `/` on a shared host.)
10. What does `quotacheck` do (scan the FS and build/update quota files)?
11. What does `quotaon` do? Predict: if you `setquota` before quotas are on / files exist, what might go wrong conceptually?
12. Distinguish `edquota` vs `setquota`: interactive editor vs non-interactive setter. When would you use each?
13. Distinguish `repquota` vs `quota`: admin report of usage vs limits vs show quota for the current (or named) user.
14. Write a one-page ordered checklist under `/tmp/disk-quotas-tasks`: fstab options → remount → `quotacheck` → `quotaon` → set limits (`edquota` / `setquota`) → report (`repquota` / `quota`).

## Predict / construct limits

15. Construct: for a test user, you want soft and hard **block** limits and soft and hard **inode** limits. In words, what four numbers are you setting?
16. Predict: user hits soft block limit — what kind of behavior (warning/grace)? User hits hard block limit — what cannot happen?
17. Predict: user creates millions of empty files under a soft/hard inode cap — which limit fires first if space (blocks) is still plentiful?

## Safe observation on this machine

18. Check whether any mounted filesystem mentions quota-related options (`findmnt` / `mount` / read `/etc/fstab` — read-only). Note what you find; do not edit.
19. If `quota` or `repquota` is installed, try a read-only view for your own user (`quota`). If tools are missing or quotas are off, write what output you would expect when quotas are configured.

## Scenario

20. Shared `/home`-style volume: intern must not fill it; project group has a separate cap. Write the full plan: fstab options, enable commands, user limits, group limits, and the report you would paste into a ticket (`repquota`). Do not apply on a production root filesystem — lab-only if you practice.
