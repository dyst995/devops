# 06 — Disk quotas (study)

**Disk quotas** limit how much disk a **user** or **group** may use. They alert an administrator **before** a user fills a partition.

You can cap a person’s mail and home **separately** from a **project group** they belong to.

| Limit | Controls | Why |
| --- | --- | --- |
| **Blocks** | Disk **space** consumed | One user cannot fill the partition |
| **Inodes** | Number of **files/directories** | Inodes store metadata; millions of tiny files can report “disk full” with gigabytes still free |

Soft limit = warning / grace period. Hard limit = cannot go beyond.

Typical path (know the names; flags come with practice): enable on the mount (`usrquota` / `grpquota` in `fstab`) → `quotacheck` → `quotaon` → `edquota` / `setquota` to set limits → `repquota` / `quota` to report.

Docs: [RHEL 7 — Disk Quotas](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/ch-disk-quotas.html).

Why this shows up in ops: shared `/home` or mail (one core dump should not page the team); build agents filling `/var` or `/tmp`; multi-tenant jump hosts and inode exhaustion from tiny logs.
