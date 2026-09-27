# Tasks — Boot loaders

Close `theory.md`. This topic is mostly concepts and paths — stay **read-only**. Do not rewrite boot config. Work answers under `/tmp/boot-loaders-tasks` if you keep notes.

## Warm-up — why a boot loader exists

1. While the computer is **off**, where do OS, apps, and data sit — RAM or non-volatile storage (disk)?
2. At power-on, RAM is empty. Where does the CPU get the first small program (firmware)? Name BIOS / UEFI from the notes.
3. In one sentence: what job does the **boot loader** have that firmware does not finish?
4. What is **chain loading** / multi-stage? Why is the first stage tiny?

## Power-on sequence

5. Write the full sequence from the notes: Power on → Firmware in ROM → ? → Kernel in RAM → ? → user space. Fill every box.
6. Memory hook: boot loader = the first “real” program on disk that knows how to find and load the Linux kernel. Restate in your own words.
7. After the kernel starts, what comes next in the notes’ chain before your shell and services (`init` / `systemd`)?

## LILO

8. Expand **LILO**. On what kinds of distributions did it ship as standard?
9. Compared to GRUB: older and …? What did it originally lack (GUI menu for choosing OS / kernel)?
10. Predict: will you install LILO on a new server today? What should you still know it as (historical default)?

## GRUB

11. Expand **GRUB**. Why do the notes call it easier to administer?
12. List the three GRUB features the notes call out (CLI, network boot, MD5 passwords).
13. Write the two **course** config paths from `commands.md` / theory: `/boot/grub/grub.conf` and `/etc/grub.conf`. Which is often a symlink into `/boot`?
14. On this machine, check read-only whether those paths exist and whether one is a symlink (`ls -l`). Also note what GRUB2 actually uses here if present (`/boot/grub2/grub.cfg`, EFI path, etc.) — but if an exam asks the **course** paths, which two do you give?
15. Memory hook: LILO = old, simple, weak. GRUB = admin-friendly, CLI, netboot, password. Config under `/boot/grub/` and `/etc/grub.conf`. Restate without looking.

## Find this (read-only)

16. Print the kernel command line of the running system (common: `cat /proc/cmdline`). Circle or note `root=`, LVM-style roots, or crashkernel if present.
17. Predict: if RAM is empty at power-on, where do OS and apps live while the machine is **off**? (Same idea as task 1 — lock it in.)
18. Under `/tmp/boot-loaders-tasks`, write a one-screen summary: sequence, LILO vs GRUB (3 bullets), two course config paths.

## Scenario

19. After a patch, nobody knows which kernel is running vs which will be chosen next boot. Report both using whatever this distro exposes (for example `uname -r`, read-only GRUB/menu entries if visible). Stay read-only — do not rewrite the boot config. Note which findings are “running now” vs “configured for next boot.”
