# 08 — Runlevels and systemd Targets

A **runlevel** defines the **state of the machine after boot**: which services are on, whether you have networking, whether you have a GUI, whether the box is shutting down.

Classic SysV idea: the system is in **one** runlevel at a time.

## Classic SysV runlevels

In standard practice:

| Runlevel | Meaning |
| --- | --- |
| **0** | Halt / power off |
| **1** | Single-user / rescue-style maintenance (usually **no network services**) |
| **3** | Multi-user, text, networking (typical server) |
| **4** | Often unused / custom; some distros treat it like 3 |
| **5** | Multi-user **with graphical** desktop |
| **6** | Reboot |

Default runlevels are typically **3, 4, or 5**. Lower runlevels are for **maintenance or emergency repairs** because they usually offer **no network services**.

**Memory hook:** **0** = zero life (halt). **6** = full circle (reboot). **1** = lonely admin. **3** = server. **5** = GUI.

### Files

- `/etc/rc[0-6].d/` — per-runlevel start/stop scripts (symlinks)
- `K20nfs -> ../init.d/nfs` — **K**ill (stop) `nfs` at this runlevel; `20` is the order
- `S10network -> ../init.d/network` — **S**tart `network`; `10` is the order
- `/etc/inittab` — default runlevel, for example `id:3:initdefault:` (boot into runlevel 3)

**Memory hook:** **K**ill vs **S**tart + a two-digit order. Lower number runs first.

## systemd “runlevels” are targets

systemd does not really use runlevels. It uses **targets**. Old runlevel names exist as **compatibility symlinks**.

| Old runlevel | systemd target | Compatibility symlink |
| --- | --- | --- |
| 0 | `poweroff.target` | `runlevel0.target` → `poweroff.target` |
| 1 | `rescue.target` | `runlevel1.target` → `rescue.target` |
| 3 | `multi-user.target` | `runlevel3.target` → `multi-user.target` |
| 5 | `graphical.target` | `runlevel5.target` → `graphical.target` |
| 6 | `reboot.target` | `runlevel6.target` → `reboot.target` |
| (emergency) | `emergency.target` | — |

Notes:

- Runlevel 3 is **emulated** by `multi-user.target` (network + text, no GUI).
- Runlevel 5 is **emulated** by `graphical.target`.
- **Emergency** is its own target: `emergency.target` (even more minimal than rescue).

### Commands

View default target (what you boot into):

```bash
systemctl get-default
```

Set default target (example from the notes — this would boot into power-off, so do not do this on a real server):

```bash
systemctl set-default runlevel0.target
```

Safer everyday examples:

```bash
systemctl set-default multi-user.target    # server, no GUI
systemctl set-default graphical.target     # desktop
```

Switch **now** without changing the default: `systemctl isolate multi-user.target`.

**Memory hook:** `get-default` / `set-default`. Remember the mapping **0→poweroff, 1→rescue, 3→multi-user, 5→graphical, 6→reboot**.
