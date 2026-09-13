# 07 — Boot Loaders — Questions

Cover the Answers section. Answer first, then check.

1. Where is the OS while the computer is powered off? Why can it not just start from RAM?
2. What does the firmware in ROM do at power-on?
3. What is a bootstrap / boot loader, and what is its *only* job?
4. What is chain loading (multi-stage boot)?
5. Put these in order: kernel, boot loader, systemd/init, BIOS/UEFI, your login shell.
6. What does LILO stand for, and on what systems did it come standard?
7. Two limitations of LILO from the notes.
8. Why is GRUB described as easier to administer?
9. Three GRUB capabilities listed in the notes.
10. Two GRUB config file paths to memorize.
11. You need to boot a kernel over the network. LILO or GRUB?
12. Why do we still learn LILO if GRUB won?

---

## Answers

1. On non-volatile storage (disk). RAM is volatile and empty at power-on; nothing of the OS is there yet.
2. Run a small program that can access non-volatile devices and start loading the OS into RAM.
3. The small program that starts that sequence. Its only job is to load other data and programs that then execute from RAM.
4. Several programs of increasing complexity load one after another.
5. BIOS/UEFI → boot loader → kernel → systemd/init → login shell.
6. LInux LOader. It came standard on (older) Linux distributions.
7. Older and less powerful; originally no GUI menu to choose a kernel/OS.
8. Richer admin features than LILO (CLI, network boot, passwords, better menus).
9. Command-line interface, network boot, MD5 passwords.
10. `/boot/grub/grub.conf` and `/etc/grub.conf`.
11. GRUB (network boot).
12. It was the old standard; interview / legacy hosts / understanding the history of the boot path.
