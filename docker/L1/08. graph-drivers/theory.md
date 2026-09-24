# Docker graph drivers

The **image graph** is the relationships between layers. The driver that handles those layers is a **graph driver** (storage driver). Tomcat writing a Catalina log knows **nothing** about layers — the **filesystem / graph driver** does the read-here / write-there work. Pick the driver for **this** host; there is **no** single “fastest.”

On a practice machine you will use **overlay2** (default).

## VFS

- Does **not** use Union FS or CoW
- Simple **validation / testing** of Engine parts
- Use when CoW **cannot** be used
- **Not** for production — **poor performance**

## AUFS

- **Default** on **Ubuntu / Debian** (older setups; may need extra packages)
- **Shared memory pages** when containers load the **same** libraries from the **same** layer
- **No quota** support

## Overlay2

- **Preferred** storage driver on **all currently supported** Linux distros
- **No extra configuration**
- Fixes **inode exhaustion** and other bugs of the original Overlay
- Shared memory across containers via the **same on-disk** shared libraries

## DeviceMapper

- Works on **block devices**
- **No** good “out of the box” performance — needs **tuning**
- Some features need specific **libdevmapper** versions; **above-average** skill to validate
- **Supported on Red Hat** (unlike Btrfs)

## Btrfs

- Graph-driver root must be a disk formatted **btrfs** (default path `/var/lib/docker`)
- **Not supported by Red Hat**
- **Quota** in the daemon from Docker **1.12** (PR #19651)
- **Simpler** than DeviceMapper, but you **must** have a btrfs filesystem for Docker’s files

## Practice vs production

| Driver | When |
| --- | --- |
| **overlay2** | Default on your practice machine; preferred everywhere supported |
| **AUFS** | Ubuntu/Debian only; extra packages possible |
| **VFS** | Tests only — no Union FS / CoW, slow |
| **DeviceMapper** | Production if the **block device** / mapper stack is prepared; lots of tuning; OK on RHEL |
| **Btrfs** | Production if `/var/lib/docker` (or your graph root) is **btrfs**; simple; **not** RHEL |

**Memory hook:** overlay2 default. AUFS = Ubuntu/Debian, no quota. VFS = no CoW, not prod. DM = blocks + tuning + RHEL. Btrfs = needs btrfs FS, not RHEL, quota since 1.12.
