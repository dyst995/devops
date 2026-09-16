# Batch account must not log in

Create a service account `batchd` that cron can use. It must **not** be able to get an interactive login shell. Your own account must stay unchanged.

**Goal:** Prove the restriction (failed interactive login) and that the account still exists in the user database.
