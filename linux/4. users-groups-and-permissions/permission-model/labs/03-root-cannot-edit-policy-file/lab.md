# Root cannot edit the policy file

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

Root cannot edit `/etc/lab-immutable.conf` (or the file setup created). Operations still needs to change a value in it.

**Goal:** File is editable, you make a change, then you may re-lock it if policy wants immutability.
