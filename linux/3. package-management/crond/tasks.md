# Tasks — cron

Close `theory.md`. Use **your own user crontab** only unless a task explicitly asks you to *write* (not install) a system-style line. Throwaway scripts and output files go under `/tmp`. Do not edit other users’ crontabs or production system drop-ins on a shared host.

## Warm-up

1. Daemon vs table of jobs — which word is **cron**, which is **crontab**? How do you edit **your** table vs someone else’s?
2. Each **minute**, what does the daemon do?
3. Name the three load sources from the notes (user spool, anacron table, drop-in dir). The extra **username** field lives in which kind of file?
4. Where do user crontab files live on Red Hat vs Debian paths in the notes? Why prefer `crontab` over hand-editing the spool?
5. What happens to job output by default? What if `MAILTO` is set? What does `-s` on the daemon do?
6. What do you drop in `/etc/cron.hourly/` · `daily` · `weekly` · `monthly`? What do you **not** have to write yourself?

## Syntax (write lines, then check)

7. Draw the five fields (minute through weekday). Ranges for each. What is **0** and **7** on weekday?
8. From memory, write crontab lines for each pattern in the notes:
   - 02:00 daily
   - 05:00 and 17:00
   - every minute
   - Sundays 17:00
   - every 10 minutes
   - every minute in Jan/May/Aug
   - 17:00 Sun and Fri
   - every 4 hours on the hour
   - 04:00 and 17:00 on Sun and Mon  
   Check each against [crontab.guru](https://crontab.guru/) or the theory table.
9. First Sunday of the month at 02:00 — why is a `date` test needed? Write the full line from the notes.
10. Every 30 seconds — write the **two-line** trick. Two commands in one minute — how on a single line?
11. System file format: insert the **username** in the right place. Write a `root` job line (on paper / in a scratch file — do **not** install it into `/etc/cron.d` on a shared host unless you own the box and will remove it).

## Do (user crontab only)

12. Create `/tmp/cron-lab.sh` that appends the date to `/tmp/cron-lab.txt`. Add a **user** crontab job that runs it every minute (`crontab -e`). Wait at least one minute. Prove with `cat /tmp/cron-lab.txt`. Remove the job and the temp files.
13. List your crontab (`crontab -l` if available, or open `-e` and note lines). Confirm you know how to leave the editor without leaving a junk job.
14. Schedule something **once** in about two minutes: either a one-shot tool you already know (`at`), or a cron line you delete after it fires. Prove the `/tmp` marker file appeared, then clean up.
15. Troubleshoot on purpose: put a job that calls a command by short name that works in your interactive shell but fails under cron (missing `PATH`). Using the notes: fix with a **full path** or a `PATH=` line in the crontab. Redirect so you are not mailed (`>> /tmp/... 2>&1`).

## Predict

16. `* * * * sun` vs `0 2 * * sun [ $(date +%d) -le 07 ] && …` — which runs every Sunday, which only the first?
17. Finest grain cron can express alone? How do you fake sub-minute?
18. True or false: editing `/var/spool/cron/...` by hand is the supported workflow. What should you use instead?

## Scenario

19. You need a nightly backup at 02:00 **and** a monitor every 10 minutes. Write both as **user** crontab lines that append to `/tmp/backup-lab.log` and `/tmp/monitor-lab.log` (redirect so you are not mailed). Install temporarily, prove at least the monitor fired, then remove both jobs and the logs.
20. A job “never writes.” Checklist from this topic before you change the schedule: daemon running? five fields match **this** minute? full path / `PATH`? mail / syslog / redirected log? Prove you checked at least three.
