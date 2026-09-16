# Change then revert the firewall

**Hypervisor console.** Checkpoint. Do not lock yourself out of SSH.

Document the running firewall (zones, services, ports) as a “before” snapshot, make one intentional change, then put it **back**.

**Goal:** After revert, the snapshot matches again (spot-check).
