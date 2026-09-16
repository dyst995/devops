# Deploy script will not run in place

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

Deploys run `/mnt/appdata/run.sh` **in place**. Right now that fails even though the file exists and looks like a script.

**Goal:** That path runs successfully without copying the script off the volume. If you change mount policy, it must still survive a remount.
