# Assignments — Swap

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

**`mkswap` overwrites swap signatures on the target. `swapoff` can freeze a box that needs swap. Never `rm` an active swap file. Never `swapoff` production swap on a machine under memory pressure. Use a lab VM and throwaway files/LVs.**

## `cat`

1. [ ] Display the kernel’s list of **active** swap devices and files.
2. [ ] Recite from memory the path under `/proc` that holds that list.
3. [ ] Predict: if no swap is on, the file is empty or header-only — note what you actually see.
4. [ ] Privilege: predict a normal user can read this file.
5. [ ] What if the operand is missing: no path — predict stdin wait vs error. Cancel if it waits.
6. [ ] Wrong usage: a path that does not exist. Predict “No such file”.
7. [ ] Combine: after you activate lab swap, prove a new row appears here.
8. [ ] Combine: after `swapoff` on a throwaway file, prove that row is gone.
9. [ ] Human vs default: this file is raw text; it is not `free -h`. Predict Filename/Type/Size columns (or similar).
10. [ ] Recite: this shows what is **active**, not “files named swap” on disk.
11. [ ] Privilege: reading is safe; turning swap off is not this command.
12. [ ] Wrong usage: `cat` of `/swapfile` itself (binary/zeros). Predict garbage or a huge dump — do not do that on a large file; use this `/proc` file instead.
13. [ ] What if you `cat` a directory. Predict error.
14. [ ] Combine with `free -h`: both should agree whether swap is used/total.
15. [ ] Predict: a swap **file** vs swap **LV** look different in the Filename column.
16. [ ] Recite from memory: “which swap devices/files are active”.
17. [ ] Wrong usage: editing this `/proc` file to add swap. Predict you cannot enable swap by writing here.
18. [ ] Combine: identify whether the lab 2G LV or the 64MB file is the row you just enabled.
19. [ ] Predict: Size is in KB-ish units here vs human units in `free -h`.
20. [ ] Prove the command only reads: swap configuration does not change because you viewed `/proc/swaps`.

## `free`

1. [ ] Show RAM and swap usage in human-readable units.
2. [ ] Recite: the sheet uses the human flag — total/used/free for Mem and Swap.
3. [ ] Human vs default: run with the human flag and without. Prove `Mi`/`Gi` vs raw kibibytes (or similar).
4. [ ] Privilege: predict a normal user can run this.
5. [ ] What if the operand is missing: no extra args besides the human flag is enough. Predict a table, not an error.
6. [ ] Wrong usage: passing a filename. Predict it is not `cat`.
7. [ ] Combine: Swap total should match what `/proc/swaps` accounts for (approximate).
8. [ ] Predict: Swap used can be 0 even when Swap total is non-zero.
9. [ ] Recite from memory: “RAM and swap usage, human-readable”.
10. [ ] Privilege: viewing is safe. Do not start memory hogs to “make swap used” on a shared machine.
11. [ ] Combine: after `swapon` of a 64MB throwaway file, Swap total should rise by about 64MB.
12. [ ] Combine: after `swapoff` of that file, Swap total should drop again.
13. [ ] Human vs default: pick the Swap total in human form and write it down.
14. [ ] Wrong usage: expecting this to enable swap. It only reports.
15. [ ] What if the box has no swap: predict Swap total 0.
16. [ ] Predict Mem vs Swap rows — do not confuse cache/buff with swap.
17. [ ] Recite: swap is overflow RAM, not a replacement for RAM — this table is how you see both.
18. [ ] Combine with `cat` of `/proc/swaps`: if Swap total > 0, that file should list at least one device/file.
19. [ ] Wrong usage: `free -h /swapfile`. Predict extra operands are not how you inspect one file.
20. [ ] Prove running it does not allocate swap.

## `lvcreate`

1. [ ] Recite the swap-as-LV goal: create a **2G** LV named for swap use (sheet: `LogVol02` on `VolGroup00`).
2. [ ] Recite flag roles: VG name, `-n` name, `-L` size.
3. [ ] Privilege: predict root. Only on a throwaway VG with enough free space — never the OS VG on a real server.
4. [ ] What if the operand is missing: no VG. Predict usage error.
5. [ ] Wrong usage: `-L` bigger than free. Predict failure.
6. [ ] Combine: this LV is **not** swap until `mkswap`. Predict `swapon` would fail before format.
7. [ ] Recite: do **not** `mkfs.ext4` on a swap LV. Next step is `mkswap`.
8. [ ] Predict the path `/dev/VolGroup00/LogVol02` (or your lab names).
9. [ ] Human vs default: `-L 2G` is human size; this is the swap-chapter form (not `-l 100%FREE`).
10. [ ] Combine with `lvdisplay`: size ~2G, no mount.
11. [ ] Privilege / destructive: consuming 2G from the wrong VG can starve the OS. Confirm `vgdisplay` free first.
12. [ ] Wrong usage: reusing an existing LV name. Predict refusal.
13. [ ] What if `VolGroup00` does not exist on this distro — do not create it on the system disk; use a lab VG or skip the run and still recite the line.
14. [ ] Combine: `lvcreate` → `mkswap` → fstab line (recite) → `daemon-reload` → `swapon -v`.
15. [ ] Recite the order of arguments in the sheet (VG first in this chapter’s example).
16. [ ] Predict: creating the LV does not show up in `/proc/swaps` yet.
17. [ ] Wrong usage: `-n` without `-L` (or size). Predict the tool demands a size.
18. [ ] Human vs default: `2G` vs `2048M` — you may not try both on a small VG; recite that `-L` accepts human units.
19. [ ] Combine with `lsblk`: new LV appears, not mounted.
20. [ ] Prove you used a throwaway VG — write the VG name you targeted (or “recited only”).

## `mkswap`

**Destructive to whatever was on that LV or file (swap header). Throwaway only. Not `mkfs`.**

1. [ ] Format a throwaway LV as swap (sheet path under `VolGroup00`).
2. [ ] Format a throwaway swap **file** after `dd` created it.
3. [ ] Recite: this puts a swap signature on; it is **not** `mkfs`.
4. [ ] Privilege: predict root for a device; a file you own in `/tmp` may still want root for later `swapon`.
5. [ ] What if the operand is missing: no target. Predict usage error. Do not let it pick a disk.
6. [ ] Wrong usage: the root filesystem LV or `/dev/sda`. Refuse.
7. [ ] Wrong usage: `mkfs.ext4` on the swap LV. Recite why that is the wrong family.
8. [ ] Combine: after this, `/proc/swaps` still will not list it until `swapon`.
9. [ ] Predict output mentions swap space size (UUID maybe).
10. [ ] Recite both targets from the sheet: LV path and `/swapfile`.
11. [ ] Privilege / destructive: running again on the same throwaway is a re-format of the swap header; never on production swap while it is on.
12. [ ] What if the file is not a swap-sized file (tiny throwaway). Predict error or tiny swap — use the 64MB recipe, not `/etc/passwd`.
13. [ ] Combine: `chmod 0600` on the file form after (or before) this — recite why (RAM secrets).
14. [ ] Human vs default: no extra flags on the sheet; the type is implied by this command.
15. [ ] Combine: fstab line uses type `swap` not `ext4`. Recite the fstab fields; do not wreck a real fstab without a lab VM snapshot.
16. [ ] Wrong usage: `mkswap` on a mounted ext4. Never.
17. [ ] Recite memory hook: `lvcreate` → this → fstab → reload → `swapon`.
18. [ ] Predict: `file` vs `partition/LV` both work as operands.
19. [ ] Combine with `swapon -v` on the LV (lab only).
20. [ ] Prove Btrfs does not support swap (course fact) — do not create swap on a btrfs file for this lab; pick ext4/xfs/LV.

## `systemctl`

1. [ ] Recite why swap chapters call this: reread fstab into systemd after you add or remove a swap line.
2. [ ] Goal: reload systemd’s view of units/fstab (**daemon-reload**), not reboot.
3. [ ] Privilege: predict root is required.
4. [ ] What if the operand is missing: bare `systemctl`. Predict a huge unit list or help — not a reload. Do not get lost; you wanted the reload subcommand.
5. [ ] Wrong usage: `daemon-reload` without changing fstab. Predict it is harmless but does not add swap by itself.
6. [ ] Recite: this is **not** `swapon`. Reload ≠ activate.
7. [ ] Combine: add a **lab** fstab swap line, reload, then `swapon`. Only on a VM you can repair.
8. [ ] Combine: remove the lab fstab swap line, `swapoff` first, then reload, then `rm` the file.
9. [ ] Human vs default: the sheet uses `daemon-reload` for both LV swap and file swap.
10. [ ] Predict: forgetting this after fstab edits can mean systemd still has the old mount/swap units until later.
11. [ ] Privilege: do not `set-default` or `isolate` here — wrong topic. Only the reload from this cheat sheet.
12. [ ] Wrong usage: `restart` of a random service instead of reload. Predict that is not how fstab is reread.
13. [ ] What if fstab has a syntax error: reload/boot can get painful. Recite: edit lab fstab carefully; snapshot the VM.
14. [ ] Combine: order for add = format → fstab → this → `swapon`.
15. [ ] Combine: order for remove file = `swapoff` → fstab line gone → this → `rm`.
16. [ ] Recite the exact subcommand from the sheet.
17. [ ] Predict success is quiet.
18. [ ] Wrong usage: `daemon-reexec` or other lookalikes. Stick to reload.
19. [ ] Privilege / destructive: a bad fstab plus reboot is worse than a bad reload. Prefer lab VMs.
20. [ ] Prove swap is still not active from reload alone if you never ran `swapon` (check `/proc/swaps`).

## `swapon`

1. [ ] Activate a throwaway swap **LV** **now**, with verbose output (sheet `-v` on the LV).
2. [ ] Activate a throwaway swap **file** **now** (sheet: no `-v` on the file example).
3. [ ] Recite: `-v` is verbose; both forms turn that swap on immediately.
4. [ ] Privilege: predict root is required.
5. [ ] What if the operand is missing: no device/file. Predict usage or “must specify”. Do not `swapon -a` on a broken fstab as experimentation on a real server.
6. [ ] Wrong usage: activate before `mkswap`. Predict error.
7. [ ] Wrong usage: a world-readable swap file may be refused. Recite `chmod 0600` as the fix (file case).
8. [ ] Combine: after success, `/proc/swaps` and `free -h` show the extra swap.
9. [ ] Human vs default: with `-v` you get extra messages; without, it may be quiet on success.
10. [ ] Recite both sheet targets: LV path and `/swapfile`.
11. [ ] Privilege / destructive: enabling a random file as swap is wrong; only a file you prepared with `dd`+`mkswap`.
12. [ ] What if it is already on — predict “already enabled” or similar.
13. [ ] Combine: fstab makes it survive reboot; this command is “now”.
14. [ ] Predict: Swap total in `free -h` rises.
15. [ ] Wrong usage: `swapon` on an ext4 LV. Predict failure / disaster — never if that LV has data.
16. [ ] Recite: file example is 64MB class; LV example is 2G class — sizes differ on purpose.
17. [ ] Combine with `swapoff -v` on the **same throwaway** when you clean up.
18. [ ] Human vs default: verbose vs silent — run the LV form with `-v` so you can prove it.
19. [ ] Recite fstab type `swap` (comment on the sheet) — this command does not write fstab.
20. [ ] Prove you did not enable swap on a production path you did not create in this lab.

## `dd`

1. [ ] Recite the 64MB swap-file recipe: input `/dev/zero`, output a swap **file**, block size 1024, count 65536.
2. [ ] Recite the arithmetic: 64 × 1024 = 65536 blocks.
3. [ ] Privilege: writing `/swapfile` at the root of the real disk needs root and is easy to get wrong. Prefer a throwaway path under a lab dir **only if** you will still `mkswap`/`swapon` that same path consistently — or use a VM and the sheet path.
4. [ ] What if `of=` is missing: predict `dd` writes to stdout (disaster if huge). **Do not run `dd` without `of=`.**
5. [ ] Wrong usage: `of=/dev/sda` or the OS disk. Absolute refuse.
6. [ ] Wrong usage: huge `count` that fills the root filesystem. Keep 64MB unless the lab disk is disposable and you intend it.
7. [ ] Combine: this only makes an empty file; swap starts after `mkswap` then `swapon`.
8. [ ] Predict: `ls -l` size of the file is about 64MB (65536 × 1024).
9. [ ] Human vs default: `bs` and `count` together set size; default `dd` without them is not the 64MB example.
10. [ ] Recite `if=` vs `of=` — swapping them could wipe a device. Never reverse onto a real disk.
11. [ ] Privilege / destructive: `dd` is a classic foot-gun. Throwaway `of=` path only.
12. [ ] What if the destination exists — predict it overwrites. Do not point at a real file.
13. [ ] Combine: `chmod 0600` after the file exists (sheet order: dd → mkswap → chmod, or chmod before swapon).
14. [ ] Predict `dd` prints records in/out at the end.
15. [ ] Wrong usage: `if=/dev/urandom` for this lab — slower, not in the sheet. Stick to zeros.
16. [ ] Recite: swap **file** is flexible; partition/LV is what Red Hat recommends — this command is the file path.
17. [ ] Combine: do not `rm` until `swapoff` if you already activated.
18. [ ] Human vs default: `bs=1024` is 1 KiB blocks, not “human print”; size is still 64MB.
19. [ ] What if `count` is omitted — predict it copies until input EOF (`/dev/zero` never ends). **Do not try this.**
20. [ ] Prove the file is ordinary (`file` or `ls`) before `mkswap`, then a swap signature after.

## `chmod`

1. [ ] Set the throwaway swap file to mode **0600** (owner read/write only).
2. [ ] Recite why: the file may hold RAM secrets — not world-readable.
3. [ ] Privilege: owner can usually chmod their file; `/swapfile` at `/` may need root.
4. [ ] What if the operand is missing: mode but no file, or nothing. Predict usage error.
5. [ ] Wrong usage: `0777` on a swap file. Predict `swapon` may refuse; it is also insecure.
6. [ ] Combine: after 0600, `ls -l` shows `-rw-------`.
7. [ ] Human vs default: numeric `0600` vs symbolic; the sheet is numeric.
8. [ ] Predict: this does not enable swap; it only tightens permissions.
9. [ ] Recite the exact mode from the sheet.
10. [ ] Privilege: do not chmod `/` or `/etc` in “practice”.
11. [ ] Combine: `dd` → `mkswap` → this → fstab/reload → `swapon`.
12. [ ] Wrong usage: `+x` (execute) on a swap file — wrong lesson (that was scripts). Swap wants 0600.
13. [ ] What if the path does not exist yet — predict error; `dd` first.
14. [ ] Human vs default: `0600` vs `600` — predict both mean the same bits; use the sheet’s `0600`.
15. [ ] Combine with `swapon`: some kernels insist on this mode.
16. [ ] Predict: group/other have no `r` after success.
17. [ ] Recite: “not world-readable (may hold RAM secrets)”.
18. [ ] Wrong usage: chmod on the LV device node instead of the file — the file recipe is for `/swapfile`.
19. [ ] Privilege / destructive: `000` would lock you out of the file. Stick to 0600.
20. [ ] Prove `ls -l` after, then proceed to activate only that throwaway file.

## `swapoff`

**Can stall or OOM a machine that needs that swap. Lab only. Never the only swap on a loaded production host.**

1. [ ] Deactivate a throwaway swap **file** with verbose (`-v`) **before** deleting it.
2. [ ] Recite: never `rm` an active swap file — this command first.
3. [ ] Privilege: predict root is required.
4. [ ] What if the operand is missing: predict usage / nothing turned off. Do not `swapoff -a` on production.
5. [ ] Wrong usage: `rm` first while it is still on. Recite the failure mode; do not demonstrate on a real file if it is active.
6. [ ] Combine: after this, `/proc/swaps` loses that row; `free -h` Swap total drops.
7. [ ] Human vs default: `-v` is verbose as in the sheet.
8. [ ] Recite remove-file order: this → remove fstab line → `daemon-reload` → `rm`.
9. [ ] Predict: if pages are in that swap, they must be read back into RAM — why a tight box can freeze.
10. [ ] Privilege / destructive: turning off all swap (`-a`) is out of scope and dangerous. Only the throwaway path.
11. [ ] What if that file is not active — predict error “not swap” / already off.
12. [ ] Combine: you can `swapoff` an LV swap the same way (path to the LV) in a lab.
13. [ ] Wrong usage: `swapoff` then immediately `mkfs` on a device you still need. Stay on the file recipe for cleanup.
14. [ ] Recite the sheet target: `/swapfile`.
15. [ ] Predict success messages with `-v`.
16. [ ] Combine with `systemctl` reload after fstab edit — this command does not edit fstab.
17. [ ] Human vs default: without `-v` it may be silent; the sheet wants `-v` on the file teardown.
18. [ ] Wrong usage: swapping this with `swapon` in the add vs remove checklists.
19. [ ] Privilege: if RAM cannot hold the pages, the command may hang. That is why production is off-limits.
20. [ ] Prove the file still exists on disk after deactivate — delete is a later `rm`.

## `rm`

**Destructive. Only the throwaway swap file after `swapoff`. Never recursive delete of `/` or `/swap` guesses.**

1. [ ] Delete the throwaway swap **file** only after it is off and the fstab line is gone.
2. [ ] Recite: delete the file after it is off — last step in the sheet.
3. [ ] Privilege: `/swapfile` at `/` needs root; a lab file you created under `/tmp` you may own.
4. [ ] What if the operand is missing: predict usage error, nothing deleted.
5. [ ] Wrong usage: deleting while `/proc/swaps` still lists it. Stop; `swapoff` first.
6. [ ] Combine: `swapoff -v` → fstab → `daemon-reload` → this.
7. [ ] Human vs default: this is a file remove, not `rm -rf`. **Do not add `-r` or `-rf`.**
8. [ ] Predict: after delete, `ls` of that path fails; `free -h` already dropped at `swapoff`.
9. [ ] Recite: you do **not** `rm` a swap **LV** this way — LVs are `lvremove` (not on this sheet). File only.
10. [ ] Privilege / destructive: one wrong path (`/`, `/home`, `/dev/sda`) is catastrophic. Type the exact throwaway path.
11. [ ] What if the file is already gone — predict “No such file”.
12. [ ] Wrong usage: `rm -rf` on `/swapfile`’s parent. Forbidden in this lab.
13. [ ] Combine: prove `/proc/swaps` has no row, **then** remove.
14. [ ] Predict: this does not `swapoff` for you.
15. [ ] Recite the sheet command target: `/swapfile` (only if that is the lab file you created).
16. [ ] Human vs default: no `-i`; be sure before you run.
17. [ ] Wrong usage: removing `/proc/swaps` (you cannot meaningfully; do not try).
18. [ ] Privilege: if permission denied, you used the wrong user — not an excuse to `rm -rf`.
19. [ ] Combine with `free -h` after: Swap total should already reflect off; this just frees disk blocks.
20. [ ] Prove you only removed the lab swap file, not any other name in `/`.
