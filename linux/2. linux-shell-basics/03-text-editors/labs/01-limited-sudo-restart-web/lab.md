# Limited sudo to restart the web server

Checkpoint before changing sudo policy.

User `labuser` (create if needed) must be able to restart the **web server** as root **without a password**, and must **not** get full root. A typo in the policy file must not lock everyone out of sudo.

**Goal:** That user can restart the service; a random privileged command still fails; sudo still works for your admin account.
