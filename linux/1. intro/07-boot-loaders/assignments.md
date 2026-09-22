# Assignments — Boot loaders

Close `commands.md`. This topic is **paths**, not a daily CLI. Use `cat`, `ls`, and `ls -li` (and `echo`) only. Do **not** edit GRUB config on a machine you cannot reinstall. Read-only unless the lab says otherwise.

## GRUB config paths (`/boot/grub/grub.conf`, `/etc/grub.conf`)

### Easy

1. [ ] List `/boot/grub/` if it exists. Is there a `grub.conf` (or only `grub.cfg` / `grub2` on this distro)?
2. [ ] Use `cat` on `/etc/grub.conf` if the file exists. If `cat` errors, write the error — do not invent a file.

### Medium

3. [ ] If **both** course paths exist, `ls -li` them. Is `/etc/grub.conf` a **symlink** to the file under `/boot`? Same inode or a link?
4. [ ] Someone always opens `/boot/grub/grub.conf` on a GRUB2 box that only has `/boot/grub2/grub.cfg`. Find what **this** machine actually has. The course answer stays the two classic paths; the machine may differ.

### Hard

5. [ ] Using only listing and `cat`, decide: LILO leftovers (`/etc/lilo.conf` or similar) vs GRUB. Do not run a bootloader install. One sentence: this VM boots with …
6. [ ] Combine: from `lsblk` / `findmnt`, which filesystem is `/boot` on? Then list the GRUB files there. You are only **looking** — no `mount` changes.
