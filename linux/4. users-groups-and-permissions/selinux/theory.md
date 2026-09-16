# SELinux

**SELinux** (Security-Enhanced Linux) is an extra access-control layer on most modern distros (especially RHEL/CentOS/Fedora). It implements **MAC** (Mandatory Access Control) **on top of** the **DAC** you already know (`chmod` / owner / group from the [permission model](../permission-model/theory.md)).

| | DAC | MAC (SELinux) |
| --- | --- | --- |
| Who decides | File **owner** (`chmod`, `chown`) | **System policy** (admin / distro), not the file owner |
| Example | `nika` can `chmod 777` her file | Even then, `httpd` may still be **denied** if policy says Apache must not read that path |

**Memory hook:** DAC = owner’s choice. SELinux = the kernel still asks “does **policy** allow this **label**?” Both must say yes.

## Three modes

At any time SELinux is in **one** of:

| Mode | Policy applied? | Denies access? | Logs violations? |
| --- | --- | --- | --- |
| **Enforcing** | Yes | **Yes** — unauthorized users/processes are blocked | Yes (audit logs) |
| **Permissive** | Loaded, but **not** enforced | **No** — everything is allowed | **Yes** — great for **testing** before enforcing |
| **Disabled** | **Not** loaded | No | No SELinux decisions |

**Memory hook:** enforcing = lock the door. permissive = door open, but **write down** who tried the lock. disabled = no SELinux at all.

### Check mode

```bash
getenforce          # Enforcing | Permissive | Disabled
sestatus            # longer status; when off: "SELinux status: disabled"
```

Course lab starts **Disabled**, so:

```text
# getenforce
Disabled
```

## Configuration file

Main file: **`/etc/selinux/config`**

On Red Hat, **`/etc/sysconfig/selinux`** is often the same file (symlink). Edit either, then **reboot** for mode changes to fully apply (especially enable/disable).

```text
$ cat /etc/selinux/config
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled

# SELINUXTYPE=
#     targeted - Targeted processes are protected
#     minimum  - Modification of targeted; only selected processes
#     mls      - Multi Level Security protection
SELINUXTYPE=targeted
```

| Setting | Meaning |
| --- | --- |
| `SELINUX=enforcing` / `permissive` / `disabled` | Mode after reboot |
| `SELINUXTYPE=targeted` | Default: confine **selected** daemons (httpd, named, …), not every process |
| `minimum` | Even smaller targeted set |
| `mls` | Multi-Level Security (strict classifications; rare on ordinary servers) |

**Memory hook:** `targeted` = “jail the usual suspects (Apache, FTP…).” `mls` = military-style levels. Change `SELINUX=` then **reboot**.

Temporary switch **without** disable (when already enabled): `setenforce 1` (enforcing) / `setenforce 0` (permissive). You **cannot** `setenforce` from fully **disabled** — that needs config + reboot (and often a filesystem relabel on first enable).

## Enable and disable

**Enable** (safe path: permissive first, watch logs, then enforcing):

```bash
# vi /etc/sysconfig/selinux
SELINUX=permissive
reboot

# then
SELINUX=enforcing
reboot
```

**Disable:**

```bash
# vi /etc/sysconfig/selinux
SELINUX=disabled
reboot
```

**Memory hook:** disabled ↔ enabled always goes through a **reboot**. Test in **permissive** before **enforcing**.

## Policies

Policy is modular. List modules loaded in memory:

```bash
semodule -l | less
# abrt, apache, antivirus, ...
```

**Booleans** are on/off knobs inside the policy (FTP home dirs, NFS, …) without writing new policy.

```bash
semanage boolean -l | less
# ftp_home_dir  (off, off)  Allow ftp to home dir
# mount_anyfile (on,  on)   Allow mount to anyfile

getsebool ftpd_anon_write
# ftpd_anon_write --> off

setsebool ftpd_anon_write on
getsebool ftpd_anon_write
# ftpd_anon_write --> on
```

`semanage boolean -l` shows **(current, default)**. `setsebool` without **`-P`** lasts until reboot; `setsebool -P name on` **persists**.

**Memory hook:** `semodule -l` = which policy packs are loaded. `getsebool` / `setsebool` = flip a named switch. `semanage boolean -l` = catalog of switches.
