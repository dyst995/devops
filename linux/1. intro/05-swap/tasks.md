# Tasks — Swap and swappiness

Close `theory.md`. Prefer **predict / write the commands you would run** for create/activate/remove steps. Run only non-destructive inspection (`cat /proc/swaps`, `free -h`, reading swappiness) unless you have a throwaway lab VM and know what you are doing. Never `rm` an active swap file. Keep written answers under `/tmp/swap-tasks` if useful.

## Warm-up — what swap is

1. In one sentence: what is swap, and when does the system move pages there?
2. Why is swap **not** a replacement for more RAM? (Disk vs physical memory speed.)
3. Predict: can you put swap on **Btrfs** according to the notes?
4. From memory: three **forms** swap can take. Which does Red Hat recommend, and why (contiguous area / throughput / seek)?
5. Why are swap **files** more flexible? From which kernel version are they “virtually as fast” as partitions **if** allocated contiguously? What does the kernel bypass?

## Checking swap (safe to run)

6. Show active swap devices/files (`cat /proc/swaps`).
7. Show RAM and swap usage in human units (`free -h`). Relate one line of output to “inactive pages moved to disk.”
8. Under `/tmp/swap-tasks`, write a two-line cheat: which command lists swap devices, which shows RAM+swap totals.

## Swappiness

9. Write the swappiness **range** and the **default**. What relative weights does it set (swapping cold anonymous pages vs dropping page cache)?
10. What does a **low** value prefer to evict? What does a **high** value prefer?
11. Desktop / interactive box with plenty of RAM vs batch / less interactive — which direction does the notes push swappiness, and why (latency vs throughput)?
12. Find the current swappiness on this machine (common paths: `/proc/sys/vm/swappiness` or `sysctl vm.swappiness`). Record the value. Do not change it unless this is a disposable lab and you change it back.

## Recommended size table (RHEL 7)

13. From memory, fill recommended swap for ≤2 GB RAM, >2–8 GB, >8–64 GB, >64 GB — **without** hibernation. Then check the notes.
14. Same table **with** hibernation. For >64 GB, what does the notes say about hibernation?
15. Why must hibernation swap be at least as large as RAM? What safety margin idea does the table use?
16. Interview tip from the notes: on huge-RAM systems, what else matters besides blindly matching RAM?

## Swap as LVM LV (write the sequence — do not run on OS VG)

17. Write the five-step sequence from the notes for a 2G swap LV `/dev/VolGroup00/LogVol02`: `lvcreate` → `mkswap` → fstab line → `systemctl daemon-reload` → `swapon -v …`.
18. Write the exact `fstab` line from the notes for that LV.
19. Predict: what goes wrong if you run a normal `mkfs.ext4` on that LV instead of `mkswap`?
20. Distinguishing flags: `-n LogVol02` and `-L 2G` on `lvcreate` — what do they set?

## Swap file (write the sequence)

21. For a **64 MB** swap file: show the arithmetic `64 * 1024 = 65536`. Write the full `dd` command from the notes (`bs=1024`, `count=65536`, `of=/swapfile`).
22. Complete the create sequence: `mkswap` → `chmod 0600` → fstab line → `daemon-reload` → `swapon`. Why `0600` (may hold RAM secrets)?
23. Write the exact `fstab` line for `/swapfile` from the notes.
24. Write the **remove** sequence in order: `swapoff -v` → remove fstab line → `daemon-reload` → `rm`. Predict what happens if you `rm` while swap is still active.

## Scenario

25. Ticket: “Add 1G of swap that survives reboot.” Choose **file** or **LV**. Write the full ordered command list (including fstab and verify with `/proc/swaps` and `free -h`). Do not apply on a production host; if you practice, use only a disposable VM and tear down with the correct `swapoff` order.
