# Labs — Boot loaders

**Where:** Rocky VM (not WSL). Checkpoint before any GRUB write. Do **not** run `grub2-mkconfig` in these labs.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

From memory, write the power-on sequence down to user space (firmware, boot loader, kernel, init/systemd). Compare with the theory file after you have written it.

## Lab 2

From memory, contrast LILO and GRUB using only what the notes mention. Then open theory and mark what you missed.

## Lab 3

On the VM, look for the course GRUB paths and whatever GRUB2 paths this distro actually uses. See whether `/etc/grub.conf` (or the GRUB2 equivalent) is a symlink. Read the beginning of the real config as root. Do not edit it.

## Lab 4

Print the kernel command line for the running system (`/proc/cmdline`). Optional: list kernels with `grubby` if the command exists. Do not change the default kernel.

## Job and cert labs

## Lab 5

List installed kernels (`grubby --info=ALL` or `rpm -q kernel`). Note which is default and which is running (`uname -r`). Do not change the default unless you have a checkpoint and will set it back.

## Lab 6

RHCSA-style (hypervisor console, checkpoint first): from the GRUB menu, boot **rescue** or **emergency**, reset the **root** password, handle relabel if the system uses SELinux, reboot, log in as root with the new password, then set a password you will remember. Only on the lab VM.

## Lab 7

Read `/etc/default/grub`. Identify which line feeds the kernel command line. Do not run `grub2-mkconfig` unless you have a checkpoint and a reason.
