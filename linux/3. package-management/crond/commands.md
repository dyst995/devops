# Commands to memorize

```bash
crontab -e                       # edit this user’s crontab in $EDITOR
crontab -u username -e           # edit someone else’s (needs privilege)
```

Five fields: **minute hour day-of-month month weekday**, then the command.

```bash
0 2 * * * /bin/sh backup.sh                         # 02:00 every day
0 5,17 * * * /scripts/script.sh                     # 05:00 and 17:00
* * * * * /scripts/script.sh                        # every minute
0 17 * * sun /scripts/script.sh                     # Sundays at 17:00
*/10 * * * * /scripts/monitor.sh                    # every 10 minutes
* * * jan,may,aug * /script/script.sh               # every minute in Jan, May, Aug
0 17 * * sun,fri /script/script.sh                  # Sun and Fri at 17:00
0 2 * * sun [ $(date +%d) -le 07 ] && /script/script.sh
# Sundays at 02:00 only if date is 1–7 (first Sunday)
0 */4 * * * /scripts/script.sh                      # every 4 hours, on the hour
0 4,17 * * sun,mon /scripts/script.sh               # Sun+Mon at 04:00 and 17:00
* * * * * /scripts/script.sh                        # every minute (second 0)
* * * * * sleep 30; /scripts/script.sh              # same job 30s later (cron has no sub-minute)
* * * * * /scripts/script.sh; /scripts/script2.sh   # two commands in one slot
```
