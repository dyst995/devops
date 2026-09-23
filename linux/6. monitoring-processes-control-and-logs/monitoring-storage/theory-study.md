# Monitoring storage (study)

Disk fills up, a process holds a deleted file, or I/O waits.

| Command | Job |
| --- | --- |
| **`df`** | **Free space per filesystem** (mount points) |
| **`du`** | **Usage of a directory** |
| **`lsof`** | **Open files** (and sockets) by process |
| **`vmstat -d` / `-p`** | **Disk / partition** read–write counters |
| **`iostat`** | **I/O load**: tps, kB/s (`sysstat`, like `sar`/`mpstat`) |

## Space: df and du

**`df -h`**: one row per **mounted** filesystem. Watch **Use%** (`/` at 91% is already tight). Each **Mounted on** path can fill independently (course sample includes Windows/WSL-style `C:` / `E:`). `df` does **not** say *which directory* ate the space.

**`du -sh /etc/*`**: `-s` = one total per argument (not every nested file); `-h` = human. Typical hunt: `du -sh /*` then `du -sh /var/*`. Deleted files that are **still open** do not shrink `du` until the process closes them — then you need `lsof`.

## lsof

On Linux **everything is a file**. **`lsof`** lists **open files** of **active processes**. No options = everything (huge — `| less`). **Root** to see other users’ files.

```bash
lsof | less
lsof /usr/bin/sshd          # who has this path open
lsof -c sshd                # command name starts with sshd
lsof -i                     # Internet (TCP/UDP) sockets
```

(`lsof +L1` for deleted-but-still-open files is a later trick the notes mention.)

## Disk I/O: vmstat and iostat

Same `vmstat` as [memory](../monitoring-memory/theory.md). **`-d`** = per-device reads/writes (totals, merged ops, sectors, ms, current IO). **`-p sda2`** = detailed stats for **one partition**.

**`iostat -t`**: **timestamp** plus **CPU** averages **and** a **Device** table. **`iostat -d`**: devices only. Live: `iostat -d 1 5` (same interval/count idea as `sar`/`vmstat`).

| Column | Meaning |
| --- | --- |
| **tps** | Transfers (I/O requests) per second |
| **kB_read/s** / **kB_wrtn/s** | Throughput |
| **kB_read** / **kB_wrtn** | Totals since boot (if no interval) |

`dm-0` is often an LVM mapper on `sda` — similar numbers are expected. Watch **iowait** + **tps** together with `df`.
