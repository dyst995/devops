# Crond (study)

**cron** is the daemon that **executes scheduled commands**. The table of jobs is a **crontab**. Together they run “every night at 2am” without a human at the keyboard.

Start the daemon from **`/etc/rc.d/init.d`** or **`/etc/init.d`** (SysV). On systemd it is usually `crond.service` / `cron.service`.

```text
cron [-n | -p | -s | -m]
cron -x [ext,sch,proc,pars,load,misc,test,bit]
```

Each **minute**, cron checks every stored job and runs those whose fields match **this** minute. Finest grain is **one minute**.

| Source | What it is |
| --- | --- |
| `/var/spool/cron` | User crontabs, **named after accounts in `/etc/passwd`**, loaded into memory. Debian/Ubuntu often `/var/spool/cron/crontabs` |
| `/etc/crontab` and `/etc/cron.d/` | System-wide. **Different format** — extra **username** field after the five times. Admin-only |
| `/etc/anacrontab` | Anacron (different format; jobs that should still run if the machine was off) |
| `/etc/cron.{hourly,daily,weekly,monthly}/` | Drop a script; it runs on that cadence via a system hook — **no** five-field line |

You *can* edit spool files by hand; **`crontab`** is the supported way.

```bash
crontab -e                 # current user, in $EDITOR
crontab -u username -e     # someone else’s (needs privilege)
```

When a job prints anything, output is **mailed** to the crontab owner, or to **`MAILTO`** if set. With **`-s`**, output can also go to **syslog**. Redirect (`>> log 2>&1`) if you do not want mail.

## Syntax

User crontabs: five time fields, then the command.

```text
* * * * *  command
│ │ │ │ │
│ │ │ │ └── weekday     (0–7; 0 and 7 = Sunday; names like sun work)
│ │ │ └──── month       (1–12 or jan, feb, …)
│ │ └────── day of month (1–31)
│ └──────── hour        (0–23)
└────────── minute      (0–59)
```

System files insert a **username** after the five fields: `* * * * *  root  /usr/local/bin/job.sh`.

| Token | Meaning |
| --- | --- |
| `*` | every value |
| `5,17` | 5 **and** 17 |
| `*/10` | every 10 (of that field) |
| `jan,may,aug` / `sun,fri` | those months / weekdays |

Practice builder: [crontab.guru](https://crontab.guru/).

| When | Line |
| --- | --- |
| 2am daily | `0 2 * * * /bin/sh backup.sh` |
| 05:00 and 17:00 | `0 5,17 * * * /scripts/script.sh` |
| Every minute | `* * * * * /scripts/script.sh` |
| Sunday 17:00 | `0 17 * * sun /scripts/script.sh` |
| Every 10 minutes | `*/10 * * * * /scripts/monitor.sh` |
| Every minute in Jan, May, Aug | `* * * jan,may,aug * /script/script.sh` |
| 17:00 Sun and Fri | `0 17 * * sun,fri /script/script.sh` |
| First Sunday, 02:00 | `0 2 * * sun [ $(date +%d) -le 07 ] && /script/script.sh` |
| Every four hours on the hour | `0 */4 * * * /scripts/script.sh` |
| 04:00 and 17:00 Sun and Mon | `0 4,17 * * sun,mon /scripts/script.sh` |
| Every 30 seconds | two lines: the job, and `sleep 30; same job` |
| Two tasks in one minute | `* * * * * /scripts/script.sh; /scripts/script2.sh` |

**First Sunday:** cron cannot say that alone. `0 2 * * sun` is *every* Sunday at 2am; `[ $(date +%d) -le 07 ]` keeps only days 1–7.

**Every 30 seconds:** run at second 0 of the minute, and again after `sleep 30`.
