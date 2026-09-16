# Monitoring storage

Disk fills up, a process holds a deleted file, or I/O waits. These tools answer **space**, **who has the file**, and **how busy the disks are**.

| Command | Job |
| --- | --- |
| **`df`** | **Free space per filesystem** (mount points) |
| **`du`** | **Usage of a directory** (what is filling `/var`?) |
| **`lsof`** | **Open files** (and network sockets) by process |
| **`vmstat -d` / `-p`** | **Disk / partition** read–write counters |
| **`iostat`** | **I/O load**: tps, kB/s read/write |

**Memory hook:** `df` = disks. `du` = folders. `lsof` = who has it open. `iostat` / `vmstat -d` = how hard the disk is working.

## df — filesystem free space

Show **available drive space** in the system — one row per **mounted** filesystem.

```bash
df -h
```

`-h` = human-readable (`G`, `M`).

```text
Filesystem      Size  Used Avail Use% Mounted on
rootfs          120G  109G   12G  91% /
...
C:              120G  109G   12G  91% /c
E:              119G   49G   70G  42% /e
```

**Use%** is what paging systems watch (`/` at **91%** is already tight). `C:` / `E:` in the sample is a Windows/WSL-style mount — same idea: each **Mounted on** path is a tree that can fill independently.

`df` does **not** tell you *which directory* ate the space — that is `du`.

**Memory hook:** `df -h` = “is `/` full?” Alert on **Use%**, not only Avail.

## du — directory usage

Show **disk usage** for a given folder (and children).

```bash
du -sh /etc/*
```

| Flag | Meaning |
| --- | --- |
| `-s` | **Summarize** — one total per argument, not every nested file |
| `-h` | Human sizes |

```text
4.0K    /etc/BUILDTIME
20K     /etc/X11
16K     /etc/bash_completion.d
```

Typical hunt: `du -sh /*` then `du -sh /var/*` until you find the fat directory. Deleted files that are **still open** do not shrink `du` until the process closes them — then you need `lsof`.

**Memory hook:** `df` = which mount. `du -sh dir/*` = which folder inside it.

## lsof — list open files

On Linux **everything is a file** (regular files, dirs, sockets, devices). **`lsof`** lists **open files** belonging to **active processes**.

With **no options**: all open files, all processes (huge — pipe to `less`).

```bash
lsof | less
lsof /usr/bin/sshd          # processes that have this path open (the binary)
lsof -c sshd                # files for processes whose **command name** starts with sshd
lsof -i                     # Internet (and HP-UX x.25) **network** files — TCP/UDP connections
```

`-c` = command name. `-i` = network (who is listening / connected). Need **root** to see other users’ files.

**Memory hook:** no args = everything. `-c nginx` = that program. `-i` = sockets. `lsof +L1` (later) = deleted-but-still-open files holding space.

## vmstat — disk stats

Same `vmstat` as [memory](../monitoring-memory/theory.md); extra flags for **block devices**.

```bash
vmstat -d
```

**Report disk statistics** — reads/writes per device (`sda`, `dm-0` LVM, …): totals, merged ops, sectors, time in ms, current IO.

```text
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda     8527     11  416987   19655   3189    460  751675  164139      0     15
```

```bash
vmstat -p sda2
```

**Detailed statistics about a partition** (`sda2`): reads, read sectors, writes, requested writes.

**Memory hook:** `-d` = each disk. `-p name` = one partition.

## iostat — device I/O load

**Monitors and reports system input/output device loading** (from `sysstat`, like `sar`/`mpstat`).

```bash
iostat -t
```

`-t` = print a **timestamp**. Output has **CPU** averages **and** a **Device** table.

```text
avg-cpu:  %user  %nice %system %iowait %steal %idle
           0.17   0.00  0.06    0.02    0.00   99.75

Device:     tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda         0.57   10.12        18.24        208569     375857
dm-0        0.53    8.93        18.13        183982     373769
```

| Column | Meaning |
| --- | --- |
| **tps** | Transfers (I/O requests) per second |
| **kB_read/s** / **kB_wrtn/s** | Throughput |
| **kB_read** / **kB_wrtn** | Totals since boot (if no interval) |

`dm-0` is often an LVM mapper sitting on `sda` — similar numbers are expected.

```bash
iostat -d
```

**Device only** — no CPU block. Same disk columns.

Live sample: `iostat -d 1 5` (every 1s, 5 times), same interval/count idea as `sar`/`vmstat`.

**Memory hook:** `iostat -t` = time + CPU + disks. `iostat -d` = disks only. Watch **iowait** + **tps** together with `df`.
