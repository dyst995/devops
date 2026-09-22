# Assignments — Monitoring storage

Close `commands.md`. Type and run. `du` on `/` is slow and noisy — use `/etc` or a throwaway dir. `lsof` can be huge — `| less`. Do not `kill` processes you found via `lsof` unless they are yours.

## Space (`df`, `du`)

### Easy

1. [ ] `df -h`. Which mount is fullest?
2. [ ] `du -sh /etc/*` (may print permission denied — OK). Which entry is largest?

### Medium

3. [ ] `df -h` vs `du -sh` on a directory on that filesystem (e.g. `/var` if permitted, else your home). Why can they disagree? (other dirs on the same mount; `du` is a subtree)
4. [ ] Someone used `du` without `-s` on `/etc` and drowned in lines. Use `-sh` on `/etc/*` or one dir.

### Hard

5. [ ] “Disk full” ticket: `df -h`, pick the full mount, `du -sh` **one** subtree you are allowed to read. Combine `findmnt`/`lsblk`.
6. [ ] Combine quotas if that lab FS has them: `df -h` vs `quota` — full FS vs user cap.

## Open files (`lsof`)

### Easy

1. [ ] `lsof | less` — `q` after a screenful.
2. [ ] `lsof -c sshd` or `-c bash`. A few lines of files that process has open.

### Medium

3. [ ] `lsof /usr/bin/sshd` if the path exists (who has that binary open). Then `lsof -i` (network sockets) — `| less`.
4. [ ] Someone used `lsof` without a filter and froze the terminal. Use `| less` or `-c` / a path.

### Hard

5. [ ] `lsof -i` + `netstat -nlpt`: same LISTEN ports? Do not kill listeners.
6. [ ] Combine: `lsof -c` a practice `sleep` or `tail -f` you started, then `kill` **that** PID only. `lsof` again — gone?

## Disk I/O (`vmstat -d`/`-p`, `iostat`)

### Easy

1. [ ] `vmstat -d`. Then `iostat -t` (timestamp + CPU + devices) if `iostat` exists.
2. [ ] `iostat -d` (device only). If missing, lab `sysstat`.

### Medium

3. [ ] `vmstat -p` a partition from `lsblk` (e.g. `sda1` — use **your** name). If it errors, pick a name from `lsblk`.
4. [ ] `iostat -t` vs `vmstat -d`: both speak tps/read/write. One sentence each.

### Hard

5. [ ] `iostat -d` twice while you `dd` a **small** file in `/tmp` (`count` modest). Any device busy? Remove the file.
6. [ ] Combine: `df -h`, `lsblk`, `iostat -d`, `lsof` if a mount is busy. Do not `umount` `/`.
