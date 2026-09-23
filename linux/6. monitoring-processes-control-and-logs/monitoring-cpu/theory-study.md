# Monitoring CPU (study)

| Command | Job |
| --- | --- |
| **`lscpu`** | **Architecture**: CPUs, threads, cores, sockets, NUMA |
| **`mpstat`** | **Per-CPU** utilization |
| **`sar`** | Same utilization idea; often from collected history; can also sample live (`sysstat`) |

## lscpu

| Field | Meaning |
| --- | --- |
| `CPU(s)` | Logical processors the OS sees |
| `Thread(s) per core` | 1 = no extra hyperthread visible; 2 = SMT |
| `Core(s) per socket` | Physical cores on one package |
| `Socket(s)` | CPU packages on the board |
| `NUMA node(s)` | Memory domains — cores closer to some RAM than other |

Check: sockets × cores × threads ≈ `CPU(s)` (course sample: 4 × 10 × 1 = **40**). That inventory is what you size VMs and `taskset` against.

## mpstat and sar

Default `mpstat` report is **CPU utilization**. **No interval** = **since boot** (long average), not “right now.” `-P ALL` = every logical CPU plus a summary line **`all`**.

```bash
mpstat -P ALL
mpstat -P ALL 1 5          # every 1s, 5 times — live
sar -P ALL 1 1             # interval 1s, count 1
```

| Column | Rough meaning |
| --- | --- |
| `%usr` / `%user` | User-space |
| `%nice` | Niced (low-priority) user time |
| `%sys` / `%system` | Kernel |
| `%iowait` | Idle **waiting for disk/network I/O** — storage, not “need more CPU” |
| `%irq` / `%soft` | Hardware / software interrupts |
| `%steal` | Hypervisor took time from this VM (noisy neighbor) |
| `%guest` | Running a guest (KVM host) |
| `%idle` | Nothing to do |

`sar` can replay **historical** data (`/var/log/sa/`) or print a live sample. Same utilization story as `mpstat`. `all` is the average; one core can be busy while another is idle.
