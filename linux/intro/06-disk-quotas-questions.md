# 06 — Disk Quotas — Questions

Cover the Answers section. Answer first, then check.

1. What problem do disk quotas solve for an administrator?
2. For whom can quotas be configured?
3. Why support both user quotas and group quotas on the same system?
4. Quotas can limit two things. What are they?
5. Why would you limit inodes, not only disk blocks?
6. A user has free space left but cannot create new files. How can quotas explain that?
7. A project directory is owned by group `frontend`. Users also have mail in their home directories. How would you think about quotas?
8. Soft limit vs hard limit — what is the difference? (from the elaborated note)
9. Name two real DevOps situations where quotas help.

---

## Answers

1. They restrict disk use and warn the admin before a user consumes too much space or a partition fills up.
2. Individual users and user groups.
3. User-specific files (email, home) can be capped separately from project space shared via a group.
4. Disk blocks (space) and inodes (number of files).
5. Inodes hold file metadata. Controlling inodes controls how many files can be created, not just how many bytes.
6. The user (or group) hit the **inode** quota, or the file system ran out of inodes — blocks can still be free.
7. User quota on home/mail; group quota on the project group so the team share has its own cap.
8. Soft = can exceed for a grace period (warning). Hard = hard stop, cannot exceed.
9. Shared `/home` or mail; CI agents filling `/var` or `/tmp`; multi-tenant hosts; preventing inode exhaustion from huge numbers of small files.
