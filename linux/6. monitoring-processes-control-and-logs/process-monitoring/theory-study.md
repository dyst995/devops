# Process monitoring (study)

A **process** is a running program (**PID** = process ID). Monitoring: **see** what is running, then **stop** it if needed.

| Tool | Role |
| --- | --- |
| `top` | **Live**, updating screen (CPU, memory, PID, user, command) until you quit |
| `ps` | **Snapshot** once |
| `kill` | Signal by **PID** |
| `killall` | Signal by **command name** |

## top and ps

`top` refreshes by itself. Load averages and memory sit at the top; the table is the process list.

| Key in `top` | Action |
| --- | --- |
| `q` | quit |
| `P` | sort by CPU |
| `M` | sort by memory |
| `k` | kill a PID (asks for PID and signal) |

(`P`/`M`/`k` are not in the course snippet; you will hit them.)

```bash
ps aux
```

BSD-style: **`a`** = all users, **`u`** = user-oriented columns (USER, %CPU, %MEM, …), **`x`** = no controlling terminal (**daemons**). Read `USER`, `PID`, `%CPU`, `%MEM`, `STAT`, `COMMAND`. Use **PID** with `kill`.

```bash
ps aux | grep nginx          # grep also matches itself
```

## kill and killall

Default signal is **TERM (15)** — “please exit cleanly.” **`-9`** is **SIGKILL** (same as `-KILL`): force; the process cannot catch it; **no cleanup** (temp files, children may remain). You cannot `kill` another user’s process unless you are **root**.

```bash
kill 156
kill -9 156
killall top
killall -9 top
killall -KILL top
```

`killall java` kills **every** Java. Prefer `kill PID` when you mean one process.
