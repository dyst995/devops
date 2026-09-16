# Tasks — Disk quotas

Close `theory.md`. Use a **non-root** filesystem. Checkpoint before changing mount options.

## Warm-up (concepts)

1. Quotas apply to which two **kinds of identity**?
2. You can limit which two **resources**? What does each stop in practice?
3. Soft vs hard: which is warning/grace, which cannot be exceeded?
4. Why would a volume report “disk full” with gigabytes free? Tie it to inodes.

## Find / construct (procedure from the notes)

5. Enable quota accounting on a lab mount using the **fstab option names** from the notes (user and group). Remount. Prove the options are active.
6. Build/update quota files, then turn quotas **on**.
7. Set limits for a test user with the interactive editor **and** with the non-interactive setter. Include both block and inode numbers.
8. Report usage vs limits as admin, then as that user.

## Repeat in another context

9. Cap a **group** on the same volume. Two members write files. Show the group report.
10. Hit the **soft** block limit, then the **hard**. Describe what you observe (without needing extra tools beyond this topic).

## Scenario

11. Shared `/home`-style volume: intern must not fill it; project group has a separate cap. Implement both. Produce a report you could paste into a ticket.
