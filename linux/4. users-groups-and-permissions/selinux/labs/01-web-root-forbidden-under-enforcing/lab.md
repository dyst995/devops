# Web root forbidden under enforcing

Rocky VM. **Checkpoint.** Not WSL.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

The web server runs, but the site in `/srv/www/lab` is not allowed to be served.

**Goal:** A client gets the lab page from that directory. SELinux remains **enforcing**. Turning it off is not an accepted fix.
