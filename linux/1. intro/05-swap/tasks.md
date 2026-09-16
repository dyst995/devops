# Tasks — Swap and swappiness

Close `theory.md`. Checkpoint before disabling swap on a tiny VM.

## Warm-up

1. Show active swap devices/files.
2. Show RAM and swap usage in human units.
3. From memory: three **forms** swap can take. Which does Red Hat recommend, and why (contiguous / throughput)?
4. Why are swap **files** more flexible? From which kernel version are they “virtually as fast” if contiguous?
5. Predict: can you put swap on Btrfs according to the notes?

## Swappiness (concept, then find)

6. Write the range and the **default**. What does a **low** value prefer to evict vs a **high** value?
7. Desktop with lots of RAM vs batch box — which direction does the notes push swappiness?
8. Find the current swappiness on this machine (you may need a sysctl/proc path you already know as Linux prerequisite).

## Size table (recall)

9. From memory, recommended swap for ≤2 GB RAM, 2–8 GB, 8–64 GB, >64 GB — with and without hibernation. Then check the notes.
10. Why must hibernation swap be at least RAM-sized?

## Construct: LV swap (repeat mkswap vs mkfs)

11. If you have a VG: create a 2G LV, format it **as swap** (not a filesystem), persist it the way the notes persist boot-time swap, reload systemd’s view of mounts, activate it, verify.
12. Predict what goes wrong if you run a normal `mkfs` on that LV instead.

## Construct: swap file (repeat permission + order)

13. Create a **64 MB** swap file using the notes’ block-size arithmetic (`bs` and `count`). Format, lock down mode so it is not world-readable, persist, reload, activate, verify.
14. Remove that file **in the correct order**. Predict what happens if you delete it while it is still active, then follow the notes’ order.

## Scenario

15. Ticket: “add 1G of swap that survives reboot.” Do it as file **or** LV. Prove with the two inspection methods from the notes.
