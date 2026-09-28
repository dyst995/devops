# Tasks — Monitoring storage

Close `theory.md`. Do not delete system files. Prefer read-only inspection; recover space only on files you created.

## Warm-up

1. Match tool to job: free space per mount · directory fatness · who has a file open · disk busy (`df` / `du` / `lsof` / `iostat`+`vmstat -d`).
2. Predict: filesystem 100% but `du` of `/` looks smaller — what class of problem do the notes hint at (deleted-but-held open files)?

## Space (`df` / `du`)

3. Free space per filesystem, human units (`df -h`). Read Size / Used / Avail / Use% / Mounted on for `/`.
4. Alert on **Use%**, not only Avail. Is `/` already tight on this box?
5. One human total per entry under `/etc/*` (`du -sh /etc/*`). Recite what `-s` and `-h` mean.
6. Typical hunt from the notes: `du -sh /*` then drill into a fat tree (e.g. `/var/*`). Stop when you find the directory — do not delete anything system-owned.
7. Does `df` tell you *which directory* ate the space? What tool does?

## Open files (`lsof`)

8. All open files (page it: `lsof | less`). Quit without changing anything.
9. Processes that have a given binary path open (e.g. `lsof /usr/bin/sshd` or another path that exists).
10. Open files for commands named `sshd` (`lsof -c sshd`). How is `-c` different from a path argument?
11. Internet sockets (`lsof -i`). Need root to see other users — note what you can and cannot see as yourself.

## Disk I/O (`vmstat` / `iostat`)

12. Per-disk read/write stats (`vmstat -d`). Name a real device from the listing (`sda`, `nvme0n1`, `dm-0`, …).
13. Detailed stats for a **real** partition name from the block listing (`vmstat -p …`) — not necessarily `sda2`.
14. I/O load with timestamp + CPU averages + devices (`iostat -t`). Read tps and kB_read/s / kB_wrtn/s.
15. Device-only view (`iostat -d`). Optional live: `iostat -d 1 5` — same interval/count idea as `sar`/`vmstat`.
16. `dm-0` vs `sda` in the sample: why might numbers look similar (LVM mapper)?

## Construct / distinguish

17. Write the commands from `commands.md` from memory (space, open files, disk stats). Run the safe ones once.
18. Same question “is the disk busy?” — space tools vs I/O tools. When would you use each?
19. Distinguish: `df` (capacity) vs `du` (which folder) vs `iostat`/`vmstat -d` (activity) vs `lsof` (who holds the file).

## Scenario

20. Ticket: filesystem 100% but deleting a log did not help. Using open-file listing, find a deleted-but-held file if present. Recover space only if it is a process/file you control; otherwise just name the diagnosis.
21. After growing an LV (other topic), `df` unchanged — what did you forget (filesystem grow)? If you did not grow, just state the check.
22. Ticket: high `%iowait` and rising tps. Space looks fine (`df`). Which tools do you open next, and what do you look for?
