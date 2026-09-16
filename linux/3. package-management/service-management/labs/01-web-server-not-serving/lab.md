# Web server not serving

Do not disable sshd if that is your only login.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

The web server unit is installed but **not serving**. Users need HTTP on port 80 again.

**Goal:** A request to port 80 on this host succeeds. The unit is healthy.
