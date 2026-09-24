# Commands to memorize

```text
# Six namespaces (Docker Engine):
#   MNT   mount points / filesystems          Linux 2.4.19
#   UTS   kernel / version IDs (timesharing)  Linux 2.6.19
#   IPC   inter-process communication         Linux 2.6.19
#   PID   process isolation                   Linux 2.6.24
#   NET   network interfaces                  Linux 2.6.24
#   USER  user / UID mapping                  Linux 3.8

# docker run  →  Docker creates a set of namespaces

# Most used: namespaces · cgroups · chroot
# cgroups     — share / limit RAM, CPU, …
# chroot      — process sees only a slice of the filesystem
# virt eth    — not the host NIC; port bind host → container
```
