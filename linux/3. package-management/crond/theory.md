# Crond

**cron** is the daemon that **executes scheduled commands**. The table of jobs is a **crontab**. Together they are how classic Linux runs “every night at 2am” without a human at the keyboard.

Start the daemon from **`/etc/rc.d/init.d`** or **`/etc/init.d`** (SysV). On systemd boxes it is usually `crond.service` / `cron.service`.

```text
cron [-n | -p | -s | -m]
cron -x [ext,sch,proc,pars,load,misc,test,bit]
```

**Memory hook:** **cron** = the clock daemon. **crontab** = that user’s schedule file. Edit with `crontab -e`, not a random text file, unless you are an admin on the system files.

## What cron loads

Each **minute**, cron checks every stored job and runs those whose fields match **this** minute.

| Source | What it is |
| --- | --- |
| `/var/spool/cron` | User crontab files, **named after accounts in `/etc/passwd`**. Loaded into memory. |
| `/etc/anacrontab` | Anacron table (different format; jobs that should still run if the machine was off) |
| `/etc/cron.d/` | Extra system drop-in files (**different format** from user crontabs — includes a **user** field) |

When a job prints anything, output is **mailed** to the crontab owner, or to **`MAILTO`** if that variable is set in the crontab. With **`-s`**, job output can also go to **syslog**.

Debian/Ubuntu user crontabs often live in **`/var/spool/cron/crontabs`**. Red Hat / CentOS: **`/var/spool/cron`**. You *can* edit those files by hand; **`crontab`** is the supported way.

**Memory hook:** user jobs = spool dir named like the account. System jobs = `/etc/crontab` and `/etc/cron.d/`. Mail unless you redirect (`>> log 2>&1`).

## Edit

```bash
crontab -e                 # current user’s crontab, in $EDITOR
crontab -u username -e     # someone else’s (needs privilege)
```

Two kinds of files:

- **User** crontabs — one per account (spool directory above)
- **System-wide** — `/etc/crontab` and `/etc/cron.d/*`, editable only by admins

On most distros you can also drop scripts in:

`/etc/cron.hourly/` · `/etc/cron.daily/` · `/etc/cron.weekly/` · `/etc/cron.monthly/`

and they run on that cadence (via a system cron/anacron hook), **without** writing a five-field line yourself.

**Memory hook:** `crontab -e` = my jobs. `/etc/cron.d` = machine jobs. `cron.daily` = “just put a script in the folder.”

## Crontab syntax

Five time fields, then the command (user crontabs):

```text
* * * * *  command
│ │ │ │ │
│ │ │ │ └── weekday     (0–7; 0 and 7 = Sunday; names like sun work)
│ │ │ └──── month       (1–12 or jan, feb, …)
│ │ └────── day of month (1–31)
│ └──────── hour        (0–23)
└────────── minute      (0–59)
```

System files (`/etc/crontab`, `/etc/cron.d/`) insert a **username** after the five fields:

```text
* * * * *  root  /usr/local/bin/job.sh
```

| Token | Meaning |
| --- | --- |
| `*` | every value |
| `5,17` | 5 **and** 17 |
| `*/10` | every 10 (minutes, hours, …) |
| `jan,may,aug` | those months |
| `sun,fri` | those weekdays |

Practice builder: [crontab.guru](https://crontab.guru/).

## Examples (memorize the pattern)

| When | Line |
| --- | --- |
| 2am daily | `0 2 * * * /bin/sh backup.sh` |
| Twice a day (05:00 and 17:00) | `0 5,17 * * * /scripts/script.sh` |
| Every minute | `* * * * * /scripts/script.sh` |
| Every Sunday 17:00 | `0 17 * * sun /scripts/script.sh` |
| Every 10 minutes | `*/10 * * * * /scripts/monitor.sh` |
| Every minute in Jan, May, Aug | `* * * jan,may,aug * /script/script.sh` |
| 17:00 on Sun and Fri | `0 17 * * sun,fri /script/script.sh` |
| First Sunday of the month, 02:00 | `0 2 * * sun [ $(date +%d) -le 07 ] && /script/script.sh` |
| Every four hours (on the hour) | `0 */4 * * * /scripts/script.sh` |
| 04:00 and 17:00 on Sun and Mon | `0 4,17 * * sun,mon /scripts/script.sh` |
| Every 30 seconds | two lines: the job, and `sleep 30; same job` |
| Two tasks in one minute | `* * * * * /scripts/script.sh; /scripts/script2.sh` |

Cron’s finest grain is **one minute**. “Every 30 seconds” is a trick: run at second 0 of the minute, and again after `sleep 30`.

**First Sunday:** cron cannot say “first Sunday” alone. `0 2 * * sun` is *every* Sunday at 2am; the `[ $(date +%d) -le 07 ]` keeps only days 1–7.

**Memory hook:** min hour dom month dow. `*/n` = step. Lists with commas. Day-of-week names allowed. Sub-minute = `sleep`.
