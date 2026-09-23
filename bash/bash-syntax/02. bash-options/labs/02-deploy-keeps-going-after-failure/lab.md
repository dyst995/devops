# Deploy keeps going after a failed command

`deploy.sh` must not continue after a failed command (missing file, failed copy, and so on). Right now it always prints a later `done` line even when an earlier command failed.

The default shell behavior is the reason.

**Goal:** After the change, a failed command ends the script and `done` does not print. A successful run still prints `done`.
