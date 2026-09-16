# Labs — Shell programming

**Where:** any Linux. Work in `/tmp/sh-lab`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Assign variables with and without spaces in the value. Print `$HOME` and `$PATH`. Run `env` and `set` (pipe `set` to `less`).

## Lab 2

Write `script.sh` with a bash shebang that: sets a variable, uses `if` to test an argument, and loops over a list. Make it executable and run it with and without an argument.

## Lab 3

Run the same script with `bash -x` and read the trace. Break the script on purpose (typo, missing quote), run it, fix it.

Delete `/tmp/sh-lab` when finished.

## Job and cert labs

## Lab 4

Write `backup.sh`: `set -euo pipefail`, require root (`id -u`), tar a small directory to `/tmp/backup-YYYYMMDD.tar.gz`, print the path, exit 0. Run it as you and as root. Schedule it once with cron or run by hand.

## Lab 5

Script that takes a service name as `$1`, runs `systemctl is-active`, and exits 0/1 accordingly (monitoring wrapper). Test with `httpd` and a fake name.

## Lab 6

Handle arguments: `./script.sh --file X` or positional. Print usage and exit 2 if missing args. This is how you keep install scripts from running with empty variables.
