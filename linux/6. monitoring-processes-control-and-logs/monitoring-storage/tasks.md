# Tasks — Monitoring storage

Close `theory.md`.

## Space

1. Free space per filesystem, human units (Size/Used/Avail/Use%/mount).
2. One human total per entry under `/etc/*` (summarize + human).

## Open files

3. All open files (page it). Processes that have a given binary path open. Open files for commands named `sshd`. Internet sockets.

## Disk I/O

4. Per-disk read/write stats (vmstat disk view). Detailed stats for a **real** partition name from the block listing (not necessarily `sda2`).
5. I/O load with timestamp + CPU averages + devices. Device-only tps / kB/s.

## Repeat

6. Same question “is the disk busy?” — space tools vs I/O tools. When would you use each?

## Scenario

7. Ticket: filesystem 100% but deleting a log did not help. Using open-file listing, find a deleted-but-held file if present. Recover space.
8. After growing an LV (other topic), `df` unchanged — what did you forget (filesystem grow)? If you did not grow, just state the check.
