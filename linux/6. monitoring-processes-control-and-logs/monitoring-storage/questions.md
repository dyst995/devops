# Monitoring storage — Questions

Cover the Answers section. Answer first, then check.

1. `df` vs `du` — what question does each answer?
2. What does `df -h` show? What does **Use%** 91% on `/` mean for you as an admin?
3. Decode `du -sh /etc/*`.
4. Why can `df` still show full after you delete a log, and which tool helps?
5. What does `lsof` list with no options? Why `| less`?
6. `lsof /usr/bin/sshd` vs `lsof -c sshd` vs `lsof -i`.
7. `vmstat -d` vs `vmstat -p sda2`.
8. What does `iostat` report? `iostat -t` vs `iostat -d`?
9. In iostat, what are **tps** and **kB_read/s**? What is `dm-0` often?
10. Pick a tool: `/` is 91% · which folder under `/var` · which PID has port 80 · disk transfers per second.

---

## Answers

1. `df` = space per **filesystem/mount**. `du` = space used by a **directory**.
2. Size/used/avail/percent per mount. `/` is almost full — clean logs, grow the FS, find the fat dir with `du`.
3. Human summary of **each** `/etc/*` entry, not every nested file (`-s`).
4. A process still has the deleted file open. `lsof` (and restart/close that process).
5. All open files of all processes. The list is huge.
6. Processes using that **path** · processes named **sshd** · **network** sockets.
7. All disks’ read/write stats · one **partition** (`sda2`).
8. I/O device load. Timestamp + CPU + devices · devices only.
9. I/O operations per second · read throughput. LVM device mapper on top of a disk.
10. `df -h` · `du -sh /var/*` · `lsof -i` · `iostat -d` (or `vmstat -d`)
