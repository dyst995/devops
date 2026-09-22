# Assignments — Boot loaders

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

This topic has **no daily CLI** on the cheat sheet — only GRUB config **paths**. Recite them. If you inspect files, **read-only**. Do not edit GRUB on a machine you cannot repair.

## GRUB config paths

1. [ ] Recite from memory the **main GRUB config path under `/boot`**.
2. [ ] Recite from memory the **`/etc` GRUB config path**.
3. [ ] Predict: which of those two is described as the main file under `/boot`, and which often **points at** the other.
4. [ ] Recite: `/etc/grub.conf` is **often a symlink** to the file under `/boot`.
5. [ ] Prove (read-only): if both exist, they are the same inode or the `/etc` name is a symlink — use a long listing **without** changing anything.
6. [ ] Predict: if `/etc/grub.conf` is a symlink, deleting the **target** would dangle the `/etc` name (do **not** delete either).
7. [ ] What if `/boot/grub/grub.conf` is missing on this box: predict you might be on **GRUB2** (`grub.cfg`) — still **answer the course with the two sheet paths**.
8. [ ] Recite the two course paths as a pair, in `/boot` then `/etc` order.
9. [ ] Wrong usage: confusing `grub.conf` (course/GRUB1-style name) with `grub.cfg` (common GRUB2 name). Write both spellings and which the sheet wants.
10. [ ] Wrong usage: treating `/boot/grub2/grub.cfg` or an EFI path as the course answer unless asked — default answers remain the two sheet paths.
11. [ ] Privilege: opening these files for **read** may need root. Predict permission denied as a normal user; do not `chmod` them.
12. [ ] What if you have no operand/path in your head: you cannot “guess `/boot/grub.conf`” without the `grub/` directory component. Recite the **full** `/boot` path.
13. [ ] Combine: firmware (BIOS/UEFI) loads a boot loader; the boot loader reads **this config** to find the kernel. Name the config location you would give in an exam.
14. [ ] Combine: LILO is the older loader; GRUB is the one whose config paths you memorized. Recite **LILO vs GRUB** in one line, then the two paths.
15. [ ] Human vs default: `/etc/grub.conf` looks like a normal etc config; the real bytes often live under `/boot`. Predict which copy you would edit on a symlink system (the target — but you are **not** editing in this assignment).
16. [ ] Predict output of a read-only dump of the `/boot` file: kernel lines / default boot entry (if the file exists). If it does not exist, record that and still recite the path.
17. [ ] Wrong usage: `rm` or `mv` of either path. State why that can make the next reboot unbootable. Do not run it.
18. [ ] Recite GRUB features from theory only as context (CLI, network boot, MD5 passwords) — then return to paths: where would an admin look first?
19. [ ] Combine with inodes/links: prove `/etc/grub.conf` → `/boot/grub/grub.conf` is the same pattern as `ln -s` (if your box matches). Read-only `ls`.
20. [ ] Closed-book: write both paths on paper/blank file in a throwaway directory, then compare to the sheet. They must match exactly: `/boot/grub/grub.conf` and `/etc/grub.conf`.
