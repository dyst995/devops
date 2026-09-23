# SELinux (study)

**SELinux** (Security-Enhanced Linux) is an extra access-control layer on most modern distros (especially RHEL/CentOS/Fedora). It implements **MAC** (Mandatory Access Control) **on top of** the **DAC** you already know (`chmod` / owner / group).

| | DAC | MAC (SELinux) |
| --- | --- | --- |
| Who decides | File **owner** (`chmod`, `chown`) | **System policy** (admin / distro), not the file owner |
| Example | `nika` can `chmod 777` her file | Even then, `httpd` may still be **denied** if policy says Apache must not read that path |

Both must say yes. The kernel still asks “does **policy** allow this **label**?”

## Modes

At any time SELinux is in **one** of:

| Mode | Policy loaded? | Denies? | Logs violations? |
| --- | --- | --- | --- |
| **Enforcing** | Yes | **Yes** | Yes (audit) |
| **Permissive** | Yes, **not** enforced | **No** — everything allowed | **Yes** — use this to **test** before enforcing |
| **Disabled** | **Not** loaded | No | No SELinux decisions |

```bash
getenforce          # Enforcing | Permissive | Disabled
sestatus            # longer status
```

Course lab starts **Disabled**.

## Config

Main file: **`/etc/selinux/config`**. On Red Hat, **`/etc/sysconfig/selinux`** is often the same file (symlink). Edit either, then **reboot** for mode changes to fully apply (especially enable/disable).

| Setting | Meaning |
| --- | --- |
| `SELINUX=enforcing` / `permissive` / `disabled` | Mode **after reboot** |
| `SELINUXTYPE=targeted` | Default: confine **selected** daemons (httpd, named, …), not every process |
| `minimum` | Even smaller targeted set |
| `mls` | Multi-Level Security (strict classifications; rare on ordinary servers) |

Temporary switch **when already enabled**: `setenforce 1` (enforcing) / `setenforce 0` (permissive). You **cannot** `setenforce` from fully **disabled** — that needs config + reboot (and often a filesystem relabel on first enable).

Safe enable path: set `permissive`, reboot, watch logs, then `enforcing` and reboot. Disable: `SELINUX=disabled` and reboot. Test in **permissive** before **enforcing**.

## Policy modules and booleans

Policy is modular. `semodule -l | less` lists modules loaded in memory (`abrt`, `apache`, …).

**Booleans** are on/off knobs (FTP home dirs, NFS, …) without writing new policy.

```bash
semanage boolean -l | less     # catalog: (current, default)
getsebool ftpd_anon_write
setsebool ftpd_anon_write on
```

`setsebool` without **`-P`** lasts until reboot. `setsebool -P name on` **persists**.
