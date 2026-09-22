# Assignments — cron

Close `commands.md`. Recite, then type. Edit **your** crontab unless a drill says otherwise. Throwaway jobs only; delete them when done. Do not schedule destructive commands.

## `crontab`

1. [ ] Open **your** job table in `$EDITOR`. Recite which flag means “edit,” and whose table you get with no extra flags.
2. [ ] Predict: if `EDITOR` is unset, which editor opens? Set `EDITOR` to something you know, edit, abort without saving if you only wanted to see it.
3. [ ] Add a harmless one-line job (append a timestamp to a file under `/tmp`). Save, wait one matching minute, prove it ran, then remove the line.
4. [ ] Recite why you use this editor tool instead of hand-editing the spool file.
5. [ ] Name the user-spool directory on Red Hat vs Debian from the notes. List yours only if you have privilege; do not rewrite it by hand.
6. [ ] Privilege: try to edit **another** account’s table without extra rights. Predict the error.
7. [ ] With privilege, open a throwaway user’s table (create the user if needed). Recite the flag that names the account, then the edit flag — order on the command line.
8. [ ] Predict: ` -u` without a username vs `-u` with a username but no `-e`. What happens?
9. [ ] Recite: daemon vs table of jobs — which word is **cron** and which is **crontab**.
10. [ ] After saving an edit, prove the daemon will see it without you restarting `crond` (wait for the next minute or check the tool’s “installing” message).
11. [ ] Wrong-usage: put a system-style **username** field in a **user** crontab. Predict whether that line runs.
12. [ ] Recite where **system** drop-ins live (`/etc/cron.d/`) and that they insert a user field. Do not leave a leftover file there.
13. [ ] Recite the hourly/daily/weekly/monthly directories: what you drop there, and what you do **not** have to write.
14. [ ] Predict default job output: mailed to whom? What if `MAILTO` is set? Redirect a test job so you are not mailed.
15. [ ] Combine: as yourself, add a job; as root (if allowed), list or edit another user. Prove the two tables are separate.
16. [ ] Recite: each **minute** the daemon compares the five fields to “now.” You do not start a long-running daemon per line.
17. [ ] Try to edit while another `crontab -e` of the **same** user is open (second terminal). Predict lock / “already editing.”
18. [ ] After a syntax-invalid line, predict: whole file rejected vs that line skipped? Fix or delete the bad line.
19. [ ] Recite three load sources from the notes (user spool, anacron table, drop-in dir). Which one does `crontab -e` change?
20. [ ] Cleanup: empty or restore your crontab to what it was. Remove `/tmp` files your jobs wrote. Leave other users’ tables alone.

## cron schedule

Write the five fields (then a dummy command). Do **not** leave these on a production crontab unless you are testing and will delete them. Cover every example pattern from `commands.md`.

1. [ ] Recite the five fields in order: minute, hour, day-of-month, month, weekday. Valid ranges for each. What are 0 and 7 on weekday?
2. [ ] Write a line that runs a backup script at **02:00 every day**. Recite which fields are `0` and `2` and which are `*`.
3. [ ] Write a line that runs at **05:00 and 17:00** (comma list in the hour field). Predict: does it also run at 12:00? Prove by reading the fields, not by waiting.
4. [ ] Write a line that runs **every minute** (all five stars). Predict how many times per hour that fires.
5. [ ] Write a line that runs **Sundays at 17:00** using a weekday **name**. Recite that names like `sun` are allowed.
6. [ ] Write a line that runs **every 10 minutes** (step in the minute field). List the minutes in an hour when it fires (0, 10, 20, …).
7. [ ] Write a line that runs **every minute in January, May, and August** (comma list in the month field, names). Predict: does it run in June?
8. [ ] Write a line that runs at **17:00 on Sunday and Friday** (comma list of weekday names). Predict Saturday 17:00: fire or not?
9. [ ] Write the **first Sunday of the month at 02:00** pattern: every Sunday at 02:00 **plus** a `date` test that keeps only days 1–7. Recite why cron cannot say “first Sunday” alone.
10. [ ] Predict: the first-Sunday line **without** the `date` test — how many Sundays per month would it run?
11. [ ] Write a line that runs **every 4 hours, on the hour** (minute 0, step on the hour). List the hours: 0, 4, 8, 12, 16, 20.
12. [ ] Write a line that runs at **04:00 and 17:00 on Sunday and Monday**. Predict Tuesday 04:00: fire or not? Sunday 12:00: fire or not?
13. [ ] The cheat sheet repeats an **every minute** job as a second slot. Recite: two identical five-star lines are two jobs (or a reminder that every-minute is the 0-second tick).
14. [ ] Write the **sub-minute** trick: one every-minute line, and a second every-minute line that `sleep`s 30 seconds then runs the same job. Recite: cron’s finest grain is one minute.
15. [ ] Predict: a single line `*/30 * * * *` — is that every 30 **seconds** or every 30 **minutes**? Prove you know the difference from the sleep trick.
16. [ ] Write **two commands in one slot** (semicolon). Recite that both share the same five fields.
17. [ ] Predict: if the first command in a semicolon list fails, does the second still run (shell `;` vs `&&`)?
18. [ ] System-file extra: take any of the lines above and insert a **username** after the five fields (as in `/etc/cron.d/`). Recite the field order.
19. [ ] Combine: nightly backup at 02:00 **and** a monitor every 10 minutes — two separate lines. Name which example each matches.
20. [ ] Recite the token table: `*` = every; `5,17` = those two; `*/10` = step; month/weekday **names** allowed. Then delete any test lines you actually installed.
