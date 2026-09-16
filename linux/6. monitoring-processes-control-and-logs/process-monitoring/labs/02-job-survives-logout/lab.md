# Job must survive logout

Do not kill sshd or the hypervisor agent.

You start a job that must keep writing `/tmp/keep-running.log` every few seconds **after you log out**.

**Goal:** Log out, log in, see new lines with later timestamps.
