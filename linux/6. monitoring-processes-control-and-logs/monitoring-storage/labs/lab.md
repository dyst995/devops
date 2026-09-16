# Labs — Monitoring storage

**Where:** Rocky VM (`sysstat` for `iostat`).

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

`df -h`. `du -sh /etc/*` (or a smaller tree if `/etc` is slow).

## Lab 2

`lsof | less` (quit when you have seen the columns). `lsof` on a binary path such as `sshd`. `lsof -c sshd`. `lsof -i`.

## Lab 3

`vmstat -d`. `vmstat -p` on a real partition name from `lsblk` (not necessarily `sda2`). `iostat -t` and `iostat -d`.

## Job and cert labs

## Lab 4

Ticket: “disk is 100%.” `df -h`, `du -xhd1 /`, find the directory. `lsof +L1` or `lsof | grep deleted` if usage does not match `du` (deleted file still held by a process). Restart that process only if it is a lab service.

## Lab 5

After an `lvextend` (LVM labs), confirm `df` grew. If it did not, grow the filesystem — the classic “we added disk but df is unchanged” ticket.

## Lab 6

`iostat 1 5` while you `dd` a file on the lab LV. Watch `iowait` / tps. Delete the test file.
