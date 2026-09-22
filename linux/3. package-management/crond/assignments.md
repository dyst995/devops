# Assignments — cron

Close `commands.md`. Type and run. `crontab -e` edits **your** jobs — use a harmless command (`echo` into a file in your home, `date >>`). Do not schedule `rm -rf`. Do not `-u` another user on a shared host. Remove practice lines when done.

## Editing a crontab (`crontab -e`, `-u`)

### Easy

1. [ ] `export EDITOR` to `nano` or `vim` (editors topic), then `crontab -e`. Quit **without** saving if the file is empty and you are just proving it opens — or add a commented line `# practice`.
2. [ ] `crontab -e` again and add a job that writes the date to a file under your home **every minute** (`* * * * *`). Wait a minute, `tail` that file. Remove the line when done.

### Medium

3. [ ] Lab with sudo: `crontab -u` a **practice** user `-e` only if the lab created that user. Otherwise skip `-u` and say why you need privilege.
4. [ ] Someone edited `/var/spool/cron/...` with `vim` directly. Course: use `crontab`. Open `crontab -e` instead. `ls` the spool path **read-only** if you want to see the filename.

### Hard

5. [ ] Two commands in one slot (course: `cmd1; cmd2`) appending to two files or one file twice. Prove with `tail`. Delete the job.
6. [ ] Combine: `MAILTO` or redirect `>> log 2>&1` as theory said output is mailed. Use a file redirect so you do not mail a shared account. `grep`/`tail` the log. `crontab -e` to delete practice jobs.

## Schedule fields (minute hour dom month dow)

### Easy

1. [ ] In `crontab -e`, add a job for **02:00 every day** (course `0 2 * * *`) that `echo`s once into a file. You do not need to wait until 02:00 — write the line, save, reopen and read it, then delete it or keep it if the lab wants overnight.
2. [ ] Write a line for **every 10 minutes** (`*/10`). Same: confirm the five fields, then remove if you do not want it running.

### Medium

3. [ ] Line for 05:00 **and** 17:00 (`0 5,17 * * *`). Then a Sunday 17:00 line (`0 17 * * sun`). You may put `#` comments and not leave them active.
4. [ ] Someone wrote `* * * * *` thinking it is once a day. What does that line actually do? Change it to daily 02:00 or delete it.

### Hard

5. [ ] Build (commented is OK) the course “first Sunday” line (`0 2 * * sun` plus the `date +%d` test). Then the every-4-hours line (`0 */4 * * *`). Explain each field out loud, then delete or comment.
6. [ ] Sub-minute: course uses `sleep 30` in a second `* * * * *` line. Add **one** practice pair that appends to a file, wait ~90 seconds, `tail` the file, remove both lines. Do not leave `* * * * *` jobs behind.
