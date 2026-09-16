# No IPv4 after a clone

**Console recommended.** Checkpoint first.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

After a “clone,” this VM has no working IPv4 on the primary interface (or the connection will not start).

**Goal:** Restore connectivity you can ping from the hypervisor host or from another VM. Do not leave a throwaway address if this is your only SSH NIC — use the console.
