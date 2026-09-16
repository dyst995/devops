# Auditor read without group membership

File `/srv/app/secret.env` is owned by `appuser:appgrp`. User `auditor` must **read** it without being added to `appgrp` and without making the file world-readable.

**Goal:** `auditor` can read; a third user not granted access cannot.
