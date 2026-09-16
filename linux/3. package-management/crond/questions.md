# Crond — Questions

Cover the Answers section. Answer first, then check.

1. What is cron? What is a crontab?
2. From which directories should cron be started on a SysV-style system?
3. Where does cron look for **user** crontab files, and how are those files named?
4. Name two other places cron searches, and note that their format differs.
5. How often does cron examine jobs? Where does command **output** go by default? How do you change the mail recipient? How do you send output to syslog?
6. Commands to edit **your** crontab and **alice**’s crontab.
7. User crontab location on Red Hat/CentOS vs Debian/Ubuntu. Should you edit the spool file with vim?
8. Which files are system-wide, and who may edit them?
9. What happens if you drop a script in `/etc/cron.daily/`?
10. Recite the five fields in order, with ranges.
11. How does a line in `/etc/cron.d/` differ from a user crontab line?
12. Write crons for: 2am daily · twice a day at 5 and 17 · every minute · every Sunday 17:00 · every 10 minutes.
13. Write crons for: Jan/May/Aug every minute · Sun and Fri at 17:00 · every four hours · Sun and Mon at 4 and 17.
14. How do you run a job only on the **first Sunday** of the month at 2am? Why is the extra test needed?
15. How do you run something every **30 seconds** with cron?
16. How do you run two scripts from a **single** crontab line?
17. What site can you use to check a schedule?
18. `*/10` in the minute field vs `10` in the minute field.

---

## Answers

1. Daemon that runs scheduled commands. The text file that lists those jobs (cron table).
2. `/etc/rc.d/init.d` or `/etc/init.d`
3. `/var/spool/cron` (files named after `/etc/passwd` accounts), loaded into memory.
4. `/etc/anacrontab` and files in `/etc/cron.d/`
5. Every minute. Mailed to the crontab owner. Set `MAILTO` in the crontab. `cron -s` for syslog.
6. `crontab -e` · `crontab -u alice -e`
7. `/var/spool/cron` vs `/var/spool/cron/crontabs`. Prefer `crontab`; manual edits are not recommended.
8. `/etc/crontab` and `/etc/cron.d/` — administrators only.
9. It is run once a day (by the distro’s hourly/daily/weekly/monthly cron/anacron mechanism).
10. minute 0–59, hour 0–23, day of month 1–31, month 1–12, weekday 0–7 (0 and 7 = Sunday).
11. System files have a **username** after the five fields, then the command.
12. `0 2 * * * …` · `0 5,17 * * * …` · `* * * * * …` · `0 17 * * sun …` · `*/10 * * * * …`
13. `* * * jan,may,aug * …` · `0 17 * * sun,fri …` · `0 */4 * * * …` · `0 4,17 * * sun,mon …`
14. `0 2 * * sun [ $(date +%d) -le 07 ] && /script/script.sh` — cron has no “first Sunday” token; this keeps only Sundays whose date is 1–7.
15. Two lines: the command, and `sleep 30; ` the same command. Cron cannot schedule below one minute by itself.
16. `cmd1; cmd2` on one line.
17. https://crontab.guru/
18. `*/10` = every 10 minutes. `10` = only at minute 10 of each hour.
