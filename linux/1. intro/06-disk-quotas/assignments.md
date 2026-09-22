# Assignments — Disk quotas

Close `commands.md`. Type and run. Enable quotas and edit limits only on a **lab VM** filesystem the lab says is OK (often a practice mount, not `/`). Do not lock yourself out of a shared home directory.

## Turning quotas on (`quotacheck`, `quotaon`)

### Easy

1. [ ] Find whether the practice filesystem already has quota options. Use `findmnt` or `cat` on `fstab` and look for `usrquota` / `grpquota` (course: those flags on the mount).
2. [ ] If the lab mount is prepared: run `quotacheck` on it, then `quotaon`. If the mount is **not** prepared, stop and write what is missing instead of forcing it on `/`.

### Medium

3. [ ] After `quotaon`, run `quota` as yourself. You should get a report (even if limits are zero/unlimited). If the command errors, say whether quotas are off or you are on the wrong filesystem.
4. [ ] Someone added quota flags in `fstab` but never remounted and never ran `quotacheck`. What two steps are still missing before `quota` can work?

### Hard

5. [ ] Lab only: confirm the mount options, run `quotacheck`, `quotaon`, then prove with `quota` and `repquota` (next set if you are the admin user). Do not do this on a production `/home`.
6. [ ] `quotaon` failed. Use `findmnt` / `cat` of fstab and the error: missing quota files, wrong mount, or already on? Fix only the practice filesystem.

## Setting limits (`edquota`, `setquota`)

### Easy

1. [ ] As a user who may edit quotas (lab root): open `edquota` for a **practice** user. Look at the soft/hard columns — you may quit without saving if you only needed to see the form.
2. [ ] Set a modest limit with `setquota` (non-interactive) for that practice user on the practice filesystem. Use values the lab suggests, not “1 block” on your own home.

### Medium

3. [ ] Soft vs hard: set a soft limit **below** a hard limit. Then `quota` that user and confirm both numbers appear.
4. [ ] Someone ran `edquota` on the **wrong** username. How do you check who you edited (`quota` / `repquota`) before you change anything else?

### Hard

5. [ ] Put a **small** hard block limit on a practice user, then as that user (or a second session) create files on the quota filesystem until you hit the cap (`echo`/`cat` into a file, or `dd` a small file). What error do you see? Raise or remove the lab limit when done.
6. [ ] Same idea for **inodes** if the lab tools allow (course: quotas limit blocks **and** inodes). Create many tiny files vs one large file — which limit bites first? Reset the practice user when finished.

## Reporting (`quota`, `repquota`)

### Easy

1. [ ] Run `quota` with no extra arguments. Whose usage is this?
2. [ ] Run `repquota` on the practice filesystem (needs privilege). How is it different from `quota`?

### Medium

3. [ ] After setting a limit, show that user’s line in **both** `quota` (named user) and `repquota`. Same numbers?
4. [ ] Someone ran `quota` and thought the disk was full because `df -h` looks fine. Explain using both outputs: quota is **per user**, `df` is the **filesystem**.

### Hard

5. [ ] A practice user is “out of space” but `df -h` shows free space. Use `quota`, `repquota`, and `df -h` to prove it is a **quota** hit, then raise the limit or delete their practice files.
6. [ ] Combine with earlier topics: which mount is quota-enabled (`findmnt`/`cat` fstab), how full is it (`df -h`), and who is closest to their hard limit (`repquota`)?
