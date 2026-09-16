# 06 — Disk Quotas

**Disk quotas** limit how much disk a user or group may use. They alert an administrator **before** a user eats an entire partition.

## What you can limit

Quotas apply to:

- **Individual users**
- **User groups**

That split matters: you can cap a person’s mail and home files **separately** from the space used by a **project group** they belong to.

You can limit two different resources:

| Limit | What it controls | Why it exists |
| --- | --- | --- |
| **Blocks** | Disk space consumed | Stop one user from filling the partition |
| **Inodes** | Number of files/directories that can be created | Inodes store file metadata; running out of inodes means “disk full” even with free gigabytes (classic: millions of tiny files) |

**Memory hook:** quotas = **space** (blocks) **and** **file count** (inodes), per **user** and per **group**.

## Why DevOps cares

- Shared `/home` or mail servers: one intern’s core dump should not page the whole team.
- Build agents: a runaway job can fill `/var` or `/tmp`.
- Multi-tenant jump hosts: prevent inode exhaustion from tiny log files.

Docs: [RHEL 7 — Disk Quotas](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/ch-disk-quotas.html)

Typical (not required to memorize every flag yet, but know they exist): enable quotas on the mount (`usrquota` / `grpquota` in `fstab`), `quotacheck`, `quotaon`, then `edquota` / `setquota` to set limits, `repquota` / `quota` to report.

Soft limit = warning / grace period. Hard limit = cannot go beyond.
