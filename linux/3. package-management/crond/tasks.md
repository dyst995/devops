# Tasks — cron

Close `theory.md`. Use your own crontab unless a task says system-wide.

## Warm-up

1. Daemon vs table of jobs — which word is which? How do you edit **your** table vs someone else’s?
2. Each **minute**, what does the daemon do?
3. Three load sources from the notes (user spool, anacron table, drop-in dir). Extra user field lives in which kind of file?
4. Where are user files on Red Hat vs Debian paths in the notes? Why prefer the editor tool over hand-editing spool?
5. What happens to job output by default? What if `MAILTO` is set? What does `-s` on the daemon do?
6. Hourly/daily/weekly/monthly directories — what do you drop there, and what do you **not** have to write?

## Syntax (write lines, then check)

7. Draw the five fields (minute through weekday). Ranges. What is 0 and 7 on weekday?
8. Write lines for: 02:00 daily; 05:00 and 17:00; every minute; Sundays 17:00; every 10 minutes; every minute in Jan/May/Aug; 17:00 Sun and Fri; every 4 hours on the hour; 04:00 and 17:00 on Sun and Mon.
9. First Sunday of the month at 02:00 — why is a `date` test needed? Write the line from the notes.
10. Every 30 seconds — two-line trick. Two commands in one minute — how?
11. System file: insert the **username** in the right place. Write a `root` job.

## Do

12. Add a job that appends the date to `/tmp/cron-lab.txt` every minute. Wait. Prove it. Remove it.
13. Put a **system** drop-in job as `labdev` or `nobody`. Prove the extra field. Remove it.
14. Schedule something **once** in two minutes (not a repeating five-field job if you use the one-shot tool from general Linux knowledge; if you only use cron, a line you delete after it fires).

## Troubleshoot

15. A job uses a command that works in your shell but not from cron. Using the notes: PATH, mail, syslog. Fix by full path or a `PATH=` line.

## Scenario

16. Nightly backup at 02:00 plus a monitor every 10 minutes. Both as system jobs. Redirect output so you are not mailed. Prove with logs or the output file.
