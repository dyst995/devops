# Labs — Process monitoring

**Where:** any Linux. Kill only processes you start.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Run `top`. Sort by CPU, then by memory, then quit. Do not kill anything from inside `top` in this lab.

## Lab 2

`ps aux` and find your shell. Start `sleep 3600 &` in another terminal (or background). Find its PID in `ps aux`.

## Lab 3

`kill` that `sleep` (default signal). Start another `sleep 3600`, then `kill -9` it. Start a process named in a way you can target, then `killall` it (and once with `-9` / `-KILL` on a **new** disposable `sleep` if you use that name carefully — `killall sleep` kills **every** `sleep`).

Confirm with `ps` that they are gone.

## Job and cert labs

## Lab 4

Start `sleep 3600 &`. `jobs`, `fg`, Ctrl-Z, `bg`. `disown` or `nohup` a command and close the terminal; see whether it survived.

## Lab 5

`nice` a CPU hog (`yes` or `stress`) at a high nice value, `renice` it. `top` / `ps -o pid,ni,comm`. Kill it.

## Lab 6

Ticket: “what is listening on 443?” `ss -tulpn` / `lsof -i :22`. Ticket: “kill all processes named X” — `pkill` / `killall` on **your** `sleep` only.

## Lab 7

`systemctl status` a service, read Main PID, `ps` that PID, `kill` it, see whether systemd restarts it (if Restart= is set).
