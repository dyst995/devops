# Assignments — monitoring storage

Close `commands.md`. Recite, then type. Work on a **lab VM**. Do not `mkfs`, `dd` onto disks, or unmount `/`.

## `df`

1. [ ] Show **free space per filesystem** in **human** units. Recite Size, Used, Avail, Use%, and mount point for `/` and at least one other mount.
2. [ ] Predict: which filesystem is fullest (Use%)? Prove by reading the table, not guessing.
3. [ ] Privilege: normal user. Prove.
4. [ ] Wrong usage: `df` a missing path. Exact error.
5. [ ] Combined: human vs default (1K blocks). Prove `-h` is easier to read; both describe the same mounts.
6. [ ] Recite from memory: human per-filesystem free space.
7. [ ] Combined with `du`: `df` is **filesystem** capacity; `du` is **directory tree** usage. One sentence.
8. [ ] Predict: tmpfs entries appear. Point at one (or none). Recite it is RAM-backed, not a disk.
9. [ ] What if `/` is 100%? You would not fill it for a drill. Recite why `df` is the first “no space left” check.
10. [ ] Combined: inode exhaustion is **not** this `-h` view (that would be `-i`, not on the sheet). Recite: this drill is byte space.
11. [ ] Human vs default: GiB vs 1K-blocks for `/`. Same order of magnitude when converted?
12. [ ] Predict bind mounts or extra disks on this VM. Count rows. Match `lsblk` roughly (optional).
13. [ ] Recite Use% for `/` out loud. Available from the Avail column.
14. [ ] Wrong usage: filling `/` with a huge file to “see 100%”. Do not.
15. [ ] Combined with `lsof`: a deleted file can hold space until the PID exits. Recite; prove only if you already know that lab.
16. [ ] What if `df -h` shows overlay/docker mounts? Record; still identify `/`.
17. [ ] Privilege: no sudo required. Prove.
18. [ ] Combined: `df` Avail vs `free -h` — different resources. Do not mix RAM with disk.
19. [ ] Recite: Size/Used/Avail/Use%/mount.
20. [ ] Cleanup: none.

## `du`

1. [ ] Show **one human total per `/etc/*` entry** (summarize + human). Recite: `-s` is a total, `-h` is readable. You should get many lines, not one grand total of all of `/etc`.
2. [ ] Predict: a directory vs a file under `/etc/*` — both get a size line. Prove.
3. [ ] Privilege: some `/etc/*` paths may be unreadable. Note “Permission denied” vs sudo. Do not chmod `/etc`.
4. [ ] Wrong usage: `du -s` without `-h` vs with `-h`. Same trees, different units. Prove.
5. [ ] Combined: `du -sh /etc` (one total) vs `du -sh /etc/*` (per entry). Recite the glob difference. The sheet is per entry.
6. [ ] Recite from memory: summarize + human on `/etc/*`.
7. [ ] Combined with `df`: sum of `/etc/*` is **tiny** vs `/` Used. `/etc` is not the disk.
8. [ ] Predict: glob does not enter names starting with `.` unless they match. Note if any missed dotfiles matter.
9. [ ] Human vs default: pick the largest `/etc/*` line. Name it.
10. [ ] Wrong usage: `du -sh /` without thinking — slow and noisy. Do not; stick to `/etc/*`.
11. [ ] What if `/etc/*` expands too far? It should still be OK. If the shell errors “argument list too long”, say so (rare for `/etc`).
12. [ ] Combined: permission denied lines do not stop other totals. Count how many denials as a user.
13. [ ] Recite `-s` = summarize (do not print every nested file). Prove the output is one line per glob match, not thousands of files.
14. [ ] Privilege: `sudo du -sh /etc/*` if you need full totals. Still read-only.
15. [ ] Predict a tiny file (e.g. a small conf) vs a directory (`/etc/udev` or similar) — directory larger. Prove two lines.
16. [ ] Combined with `ls -l /etc`: `du` is disk usage (blocks), `ls` is file size. Optional one file compare.
17. [ ] Wrong usage: `du -sh` with no path — totals **cwd**. Recite; `cd` back if you wandered.
18. [ ] Recite: `-s` and `-h` together on a glob.
19. [ ] What if `/etc` is a symlink farm? Still report what `du` printed. Do not follow-filesystem rabbit holes.
20. [ ] Cleanup: cwd is your home. No sudo shells left open.

## `lsof`

1. [ ] List **all open files for all processes**, **paged**. Recite: this is huge. Quit `less` with `q` after you have seen COMMAND/PID/USER/FD/TYPE/NAME.
2. [ ] Predict: without a pager the terminal floods. Prove you used a pager.
3. [ ] Show processes that have **`/usr/bin/sshd`** (or the real `sshd` path from `command -v sshd`) **open**. Recite: path argument = who has this file open.
4. [ ] Predict: if the path is wrong, empty output. Prove with a bogus path, then the real sshd binary path.
5. [ ] Show open files for commands **named** `sshd` (`-c`). Recite: `-c` is command **name**, not a full path.
6. [ ] Predict: `-c sshd` vs path to the binary — overlapping PIDs? Prove.
7. [ ] List **Internet sockets** (`-i`). Recite: network connections. Find `:22` or your SSH. Combined with `netstat` numeric TCP.
8. [ ] Privilege: as a user you see **your** files; **root** sees everyone. Prove PID count or sshd lines differ with sudo.
9. [ ] Wrong usage: `-c` with a path (`-c /usr/bin/sshd`). Recite that `-c` wants a name. Prove empty vs `-c sshd`.
10. [ ] Recite from memory: all+page, this path, command name sshd, Internet sockets.
11. [ ] Combined: `-i` vs `netstat -nlpt` — same listener on 22? Point at PID.
12. [ ] Human vs default: NAME column for a TCP line (host:port). Recite ESTABLISHED vs LISTEN if present.
13. [ ] What if `lsof` is not installed? Record. Do not confuse with `ls`.
14. [ ] Combined: deleted-but-open files (`(deleted)` in NAME) hold `df` space. Search `(deleted)` once; none is OK.
15. [ ] Predict: `less` on the all-files list — `/sshd` search inside less. Find a line; quit.
16. [ ] Wrong usage: running unpaged `lsof` over SSH on a busy box. Always page or filter.
17. [ ] Recite: `-c` command name vs path-open vs `-i` sockets vs everything.
18. [ ] Combined with process topic: PID from `lsof -c sshd` vs `ps aux` sshd. Same PID. Do **not** `kill -9` it.
19. [ ] Privilege: `sudo lsof -i` to see all users’ sockets. Prove more lines than unprivileged `-i`.
20. [ ] Cleanup: quit all `less`. No leftover `lsof | less`. Do not kill sshd.

## `vmstat`

1. [ ] Show **per-disk** read/write statistics. Recite: this `-d` is **disks**, not the memory snapshot from the memory topic.
2. [ ] Predict: disk names (`sda`, `vda`, `nvme0n1`). Point at reads/writes columns. Quiet lab: small numbers still OK.
3. [ ] Show **detailed stats for one partition** (sheet uses `sda2` — use a **real** partition from `lsblk`, e.g. `vda1`). Recite `-p` is **partition**, not a directory.
4. [ ] Predict: wrong partition name (`sda2` on a VM that has `vda1`). Error or empty. Then retry with the real name.
5. [ ] Privilege: normal user. Prove both `-d` and `-p`.
6. [ ] Wrong usage: `-p` with a disk name that is not a partition. Record the error; use a partition.
7. [ ] Combined: `-d` lists disks; `-p` zooms into one partition. Recite both flags.
8. [ ] Recite from memory: per-disk vs detailed partition.
9. [ ] Combined with `iostat`: similar I/O story. `vmstat -d` vs `iostat -d` — both about devices.
10. [ ] Human vs default: not `-h`; counts/sectors. Recite units from the header.
11. [ ] What if there is no `sda2`? Always `lsblk` first. Never guess and `mkfs`.
12. [ ] Combined with `df`: a mount’s device vs `-p` that partition. Same disk?
13. [ ] Predict: loop/dm devices appear in `-d` on LVM labs. Point or say none.
14. [ ] Wrong usage: `vmstat -d 1` forever. Interrupt if you try interval; sheet forms are snapshots.
15. [ ] Recite: `-d` disks, `-p NAME` partition. Different from `-a`/`-f`/`-s` (memory topic).
16. [ ] Combined: generate a little lab disk read (`ls -R /usr >/dev/null`) then `-d` again. Optional; do not `dd` to a block device.
17. [ ] Privilege: no sudo required typically. Prove.
18. [ ] What if `vmstat` missing (`procps`)? Record.
19. [ ] Recite partition name you actually used, not `sda2` if that disk does not exist.
20. [ ] Cleanup: no infinite vmstat. No `dd` of disks.

## `iostat`

1. [ ] Show **I/O load with a timestamp**, plus **CPU averages** and **devices**. Recite `-t` adds time; you should see CPU **and** device sections.
2. [ ] Predict: CPU `%idle` high on a quiet lab, matching `mpstat`/`vmstat` idleness. Prove.
3. [ ] Show **device I/O only** (tps, kB/s read/write) with `-d`. Recite: **no** CPU block in this form (or CPU omitted). Prove the difference vs `-t`.
4. [ ] Privilege: normal user. Prove both.
5. [ ] Wrong usage: `-d -t` combined if you try — note what your version prints. Still be able to produce **timestamped full** vs **device-only** as on the sheet.
6. [ ] Recite from memory: `-t` timestamp + CPU + devices; `-d` device I/O only.
7. [ ] Combined with `vmstat -d`: both speak tps/reads/writes. Pick one device name that appears in both.
8. [ ] Human vs default: kB/s vs human GiB. Sheet is default iostat units. Recite tps meaning (transfers per second).
9. [ ] What if `sysstat` is not installed? Same family as `mpstat`/`sar`. Record.
10. [ ] Combined: `-t` header date vs `date` command. Close enough?
11. [ ] Predict first report is since-boot average until you pass an interval (not required). Recite that gotcha if you see huge numbers.
12. [ ] Wrong usage: `iostat 1` forever. Interrupt. Sheet is flag snapshots.
13. [ ] Recite: `-d` is devices, not directories (`du` is directories).
14. [ ] Combined with `df`: iostat device `vda` vs `df` `/dev/vda1` mounted on `/`. Related, not the same line.
15. [ ] Privilege: no sudo typically. Prove.
16. [ ] Combined: generate light read (`ls -R /usr >/dev/null`) then `-d` again. Optional; no disk wipe.
17. [ ] Recite columns: tps, kB_read/s, kB_wrtn/s (names may vary slightly). Point at them.
18. [ ] What if only `loop` devices show? Still complete `-t` and `-d`. Note the real disk name from `lsblk`.
19. [ ] Recite `-t` vs `-d` in one sitting. Two outputs, two purposes.
20. [ ] Cleanup: no infinite iostat. No write tests to block devices.
