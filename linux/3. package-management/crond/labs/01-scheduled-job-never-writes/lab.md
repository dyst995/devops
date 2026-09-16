# Scheduled job never writes

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

A scheduled job was added for `labdev` but `/tmp/cron-ok` never appears.

**Goal:** Every minute (or the next minute) the file is updated. Then remove the job.
