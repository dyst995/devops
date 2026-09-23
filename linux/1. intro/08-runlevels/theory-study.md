# 08 — Runlevels and systemd targets (study)

A **runlevel** is the **state of the machine after boot**: which services are on, networking, GUI, or shutting down. Classic SysV: the system is in **one** runlevel at a time.

## Classic SysV

| Runlevel | Meaning |
| --- | --- |
| **0** | Halt / power off |
| **1** | Single-user / rescue-style (usually **no network services**) |
| **3** | Multi-user, text, networking (typical server) |
| **4** | Often unused / custom; some distros treat it like 3 |
| **5** | Multi-user **with graphical** desktop |
| **6** | Reboot |

Default is typically **3, 4, or 5**. Lower levels are for **maintenance** because they usually offer **no network services**.

| Path / name | Role |
| --- | --- |
| `/etc/rc[0-6].d/` | Per-runlevel start/stop scripts (symlinks) |
| `K20nfs` | **K**ill (stop) `nfs`; `20` is order — **lower number runs first** |
| `S10network` | **S**tart `network`; `10` is order |
| `/etc/inittab` | Default runlevel, e.g. `id:3:initdefault:` |

## systemd targets

systemd uses **targets**, not runlevels. Old names exist as **compatibility symlinks**.

| Old | Target | Compatibility symlink |
| --- | --- | --- |
| 0 | `poweroff.target` | `runlevel0.target` |
| 1 | `rescue.target` | `runlevel1.target` |
| 3 | `multi-user.target` | `runlevel3.target` |
| 5 | `graphical.target` | `runlevel5.target` |
| 6 | `reboot.target` | `runlevel6.target` |
| (emergency) | `emergency.target` | — (even more minimal than rescue) |

Runlevel 3 is **emulated** by `multi-user.target`. Runlevel 5 is **emulated** by `graphical.target`.

```bash
systemctl get-default                          # what you boot into
systemctl set-default multi-user.target        # server, no GUI
systemctl set-default graphical.target         # desktop
systemctl set-default runlevel0.target         # poweroff — do not do this on a real server
systemctl isolate multi-user.target            # switch **now**; does **not** change the default
```
