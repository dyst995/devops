# Assignments — Swap

Close `commands.md`. Type and run. **Lab VM** for any `mkswap` / `swapon` / `swapoff` / `dd` of a swap file. Never `swapoff` the only swap on a host you share. Never `rm` a swap file that is still **on**.

## Inspecting swap (`/proc/swaps`, `free`)

### Easy

1. [ ] Use `cat` on `/proc/swaps`. Which swap devices or files are active, and what sizes?
2. [ ] Use `free` with the human-readable option. How much swap is used vs free?

### Medium

3. [ ] Compare `/proc/swaps` to the swap line from `free -h`. Same story? If one swap is a **file** vs an **LV**, which command made that obvious?
4. [ ] Someone ran `free` without `-h` and misread the units. Run both and say what `-h` changes.

### Hard

5. [ ] Using only inspection, decide: is swap an LV (name looks like `/dev/VG/...`), a partition, or a file? Cross-check with `lsblk` from the filesystem topic.
6. [ ] `free -h` shows swap total 0. Confirm with `/proc/swaps`. Do **not** add swap yet — just record that this machine has none.

## Formatting and turning swap on (`mkswap`, `swapon`)

### Easy

1. [ ] Lab only, **practice** LV or file that is **not** already system swap: put a swap signature on it with `mkswap` (not `mkfs`).
2. [ ] Activate that swap with `swapon`. Use verbose (`-v`) if you are activating an LV, as in the course. Confirm in `/proc/swaps`.

### Medium

3. [ ] After `swapon`, `free -h` should show more swap. Write the before/after totals.
4. [ ] Someone ran `mkfs.ext4` on a volume they meant to use as swap. Do **not** do that to a live disk. What is the correct format command for swap, and how would `/proc/swaps` look if they mounted it as ext4 instead?

### Hard

5. [ ] Lab LVM path from the course: create a **small** practice LV (only if the VG has free space), `mkswap`, add the `fstab` line **only if the lab allows**, `systemctl daemon-reload`, `swapon`. Inspect first with `lvdisplay` / `lsblk`.
6. [ ] `swapon` failed. Use `/proc/swaps`, `lsblk`, and the error text to decide: already swap? not `mkswap`’d? permission on a swap **file**? Fix only the practice device.

## Swap file lifecycle (`dd`, `chmod`, `swapoff`, `rm`)

### Easy

1. [ ] Lab only: create a **small** swap file with `dd` (`if=/dev/zero`, a path under `/` or `/swapfile` if the lab uses that, modest `count` — not gigabytes unless you intend to). Then `mkswap` on that file.
2. [ ] Set the swap file mode to `0600` with `chmod`. Why does the course insist it is not world-readable?

### Medium

3. [ ] `swapon` the file, confirm in `/proc/swaps` and `free -h`. Then **deactivate** with `swapoff -v` **before** you delete anything.
4. [ ] Someone ran `rm /swapfile` while it was still in `/proc/swaps`. Do **not** repeat that. What is the correct order (`swapoff`, fstab/`daemon-reload` if you added a line, then `rm`)?

### Hard

5. [ ] Full file path on the lab: `dd` → `mkswap` → `chmod 0600` → `swapon` → prove with `/proc/swaps` → `swapoff` → `rm`. Tick only if `/proc/swaps` no longer lists the file **before** `rm`.
6. [ ] After removal, `free -h` should drop that swap. If it does not, you still have another swap (LV or leftover fstab). Find it with `/proc/swaps` — do not `swapoff` the system swap unless this is a disposable VM and you know how to turn it back on.
