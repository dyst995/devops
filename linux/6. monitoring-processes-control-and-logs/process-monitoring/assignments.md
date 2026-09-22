# Assignments — Process monitoring

Close `commands.md`. Type and run. `kill` / `killall` only PIDs **you** started (a `sleep`, `top`, `ping`). Never `kill -9 1`. Never `killall` `sshd` or `bash` on a shared box. `top` — quit with `q`.

## Watching processes (`top`, `ps`)

### Easy

1. [ ] Run `top`, find your user and a high-CPU line if any, quit with `q`.
2. [ ] `ps aux` and `grep` your username (or `less`). Find the `ps` line itself.

### Medium

3. [ ] Start `sleep 300` in the background (`&` if you know it) or another terminal. Find its PID in `ps aux`. Do not kill it yet.
4. [ ] Someone thinks `ps` is live like `top`. Run `ps aux`, wait, run again — snapshot. Use `top` for a live view, `q`.

### Hard

5. [ ] `ps aux` + `top`: find `sshd` or `cron`. Note PID. Combine `systemctl status` that service. Do not kill it.
6. [ ] Combine: `ps aux` | `grep` a practice `ping -c 100`, then `netstat` only if you want; mainly get the PID for the kill set.

## Stopping processes (`kill`, `killall`)

### Easy

1. [ ] Start `sleep 300` (other terminal or background). `kill` that PID (SIGTERM, no `-9`). `ps` — is it gone?
2. [ ] Start `sleep 300` again. `kill -9` that PID. `ps` again.

### Medium

3. [ ] Start `top` in another terminal. `killall top` (TERM). Confirm the other terminal’s `top` exited. Do not `killall bash`.
4. [ ] `killall -9` or `-KILL` on a practice `sleep` you started by name. Course: `-KILL` is the same as `-9`.

### Hard

5. [ ] Start a script that traps/ignores TERM if you can write `sleep` only — `kill` (TERM) vs `kill -9`. `ps` between. Only your PID.
6. [ ] Broken: `kill 156` when 156 is not yours / does not exist. Read the error. Then `ps aux` to pick a **sleep** you own. Combine `top` to watch it disappear. Never `kill -9` a system PID.
