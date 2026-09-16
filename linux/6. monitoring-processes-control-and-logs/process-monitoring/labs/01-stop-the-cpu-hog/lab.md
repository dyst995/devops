# Stop the CPU hog

Do not kill sshd or the hypervisor agent.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

Load is high / a CPU hog is running.

**Goal:** Identify the responsible process. Stop it. If it ignores a polite stop, force it. Confirm load/CPU drops. Do not kill unrelated services.
