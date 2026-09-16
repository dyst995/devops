# Commands to memorize

```bash
df -h                        # free space per filesystem (Size/Used/Avail/Use%/mount)

du -sh /etc/*                # disk usage: one human total per /etc/* entry (-s summarize, -h human)

lsof | less                  # all open files, all processes (page it)
lsof /usr/bin/sshd           # processes that have this file/path open
lsof -c sshd                 # open files for commands named sshd
lsof -i                      # network connections (Internet sockets)

vmstat -d                    # per-disk read/write statistics
vmstat -p sda2               # detailed stats for partition sda2

iostat -t                    # I/O load + timestamp + CPU averages + devices
iostat -d                    # device I/O only (tps, kB/s read/write)
```
