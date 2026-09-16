# Labs — cron

**Where:** Rocky VM (or any Linux with cron). Your user’s crontab only, unless you know you may edit another user.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Open `crontab -e`. Add a job that runs **every minute** and appends the date to `/tmp/cron-lab.txt`. Wait two minutes, read the file. Remove that job.

## Lab 2

Write crontab lines (on paper or in a comment) for each pattern in [commands.md](../commands.md): daily 02:00; 05:00 and 17:00; every minute; Sundays 17:00; every 10 minutes; Jan/May/Aug; Sun and Fri 17:00; first Sunday of the month (the `date +%d` line); every 4 hours; Sun+Mon at 04:00 and 17:00; every minute plus `sleep 30`; two commands in one slot. Check the notes after — do not paste the answers into this file.

## Lab 3

Install one of those schedules for real (pick a harmless `/tmp` append). After it has fired, read `/var/log/cron` or `journalctl -u crond` / `journalctl -u cron`. Delete the job and `/tmp/cron-lab.txt`.

## Job and cert labs

## Lab 4

Put a job in `/etc/cron.d/lab-job` (system crontab format: extra user field). Wait for it to run. Remove the file. This is how packages install cron jobs.

## Lab 5

`at now + 2 minutes` a one-shot command. `atq` / `atrm` as needed. Certs still ask `at` vs `cron`.

## Lab 6

Give a crontab an explicit `PATH=` line and a job that calls a command in `/usr/sbin`. Confirm it runs. Ticket: “works in my shell, not in cron.”

## Lab 7

Optional: a **systemd timer** that runs the same script as Lab 1 (`*.service` + `*.timer`, `enable --now`). `list-timers`. Disable when done.
