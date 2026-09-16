# User cap on a shared volume

Use a **non-root** filesystem. Checkpoint before editing mount options.

Shared volume `/mnt/share`. User `quota1` (create if needed) must not be able to store more than **10 MiB** there. Other users must not inherit that cap.

**Goal:** `quota1` hits a hard stop near 10 MiB. Another user can still write. Show both.
