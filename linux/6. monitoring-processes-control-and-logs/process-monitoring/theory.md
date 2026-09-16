# Process monitoring

A **process** is a running program (PID = process ID). Monitoring means **see** what is running, then **stop** it if needed.

**Memory hook:** `top` = live screen. `ps` = snapshot. `kill` = by PID. `killall` = by **name**.

## top — live task list

**`top`** shows a **dynamically updating** list of running processes (CPU, memory, PID, user, command). It refreshes by itself until you quit.

```bash
top
```

Useful keys inside `top` (not in the course snippet, but you will hit them):

| Key | Action |
| --- | --- |
| `q` | quit |
| `P` | sort by CPU |
| `M` | sort by memory |
| `k` | kill a PID (asks for PID and signal) |

Load averages and memory summary sit at the top of the screen; the table is the process list.

**Memory hook:** `top` = dashboard. `q` to leave.

## ps — snapshot of processes

**`ps`** prints a **list** of processes **once** (not a live UI).

```bash
ps aux
```

Classic BSD-style flags:

| Flag | Meaning |
| --- | --- |
| `a` | processes of **all** users (not only yours) |
| `u` | **user**-oriented columns (USER, %CPU, %MEM, …) |
| `x` | include processes with **no** controlling terminal (daemons) |

Columns you will read: `USER`, `PID`, `%CPU`, `%MEM`, `STAT`, `COMMAND`. Use the **PID** with `kill`.

```bash
ps aux | grep nginx          # find PIDs by name (careful: grep matches itself too)
```

**Memory hook:** `ps aux` = everyone, including daemons. Frozen photo, not a movie.

## kill — stop by PID

**`kill`** sends a **signal** to a process. Default signal is **TERM (15)** — “please exit cleanly.”

```bash
kill 156                     # SIGTERM — polite stop
kill -9 156                  # SIGKILL — force; process cannot catch this
```

`-9` is **SIGKILL** (same as `-KILL`). Use when TERM is ignored. It does **not** run cleanup (temp files, child processes may remain).

You cannot `kill` another user’s process unless you are **root**.

**Memory hook:** `kill PID` = ask. `kill -9 PID` = shotgun. Need the number from `ps`/`top`.

## killall — stop by name

**`killall`** sends the signal to **all processes with that command name**.

```bash
killall top                  # TERM all processes named top
killall -9 top               # KILL by name
killall -KILL top            # same as -9 (signal name instead of number)
```

Dangerous on a busy box: `killall java` kills **every** Java, not one PID.

**Memory hook:** `killall name` = every match. Prefer `kill PID` when you mean one process.
