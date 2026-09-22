# Assignments — Filesystem

Close `commands.md`. Type and run. Do **not** `mount` or unmount disks you did not attach yourself. Prefer a lab VM for any mount work.

## Inspecting disks and mounts (`lsblk`, `df`, `findmnt`)

### Easy

1. [ ] Use `lsblk` to list block devices and their mount points.
2. [ ] Use `df` with the human-readable option. Which filesystem has the least free space?

### Medium

3. [ ] Show the current mount table. Pick one mount and confirm the same device appears in both `lsblk` and `df`.
4. [ ] Someone ran `df` without `-h` and cannot tell how full the disk is. Run both forms and say what `-h` changes in the output.

### Hard

5. [ ] From the three inspection commands, answer: which device is `/` on, how full is it, and what type of filesystem is mounted there? Use only tools from this topic (and `echo`/`cat` if you need to jot a path).
6. [ ] A teammate says “the disk is full” but `df` shows free space on `/`. Use `lsblk` and `findmnt` to check whether they might be looking at a **different** mounted filesystem.

## `mount`

### Easy

1. [ ] Recheck what is already mounted (`findmnt` or `lsblk`). Do **not** mount anything yet — just confirm you can read the tree.
2. [ ] On a **lab VM** with a spare, unused partition you created for practice: attach it to an empty directory you own (or `/mnt/...` if that is the lab convention). Use `mount`.

### Medium

3. [ ] After a successful mount, prove it with `lsblk` **and** `df -h`. The new mount point must appear in both.
4. [ ] Someone typed `mount /mnt/data /dev/sdb1` (arguments reversed). Do **not** run that on a real disk. Say what is wrong, then write the correct argument order (device, then directory).

### Hard

5. [ ] Lab VM only: create an empty mount-point directory (use `echo`/`cat` plus whatever you already know for listing), `mount` a practice partition there, then confirm with `findmnt` that that directory is the mount. Unmount only if you already know `umount` from later notes or the lab; otherwise leave it and note the path.
6. [ ] Without mounting anything new, find a mount that is **not** `/` and explain in one line: device, mount point, and how you would remount it if it were a practice disk.

## Execute bit (`chmod +x`)

### Easy

1. [ ] In a throwaway directory, create a tiny `script.sh` (a couple of `echo` lines is enough) and turn on the execute bit with `chmod`.
2. [ ] Run the script by path ( `./script.sh` ). If it fails, fix only the execute bit and try again.

### Medium

3. [ ] Linux does not care about `.sh`. Copy or recreate the same script **without** a `.sh` suffix, give it execute permission, and run it.
4. [ ] Someone used `chmod +x` on a **directory** by mistake. Run `ls` on that directory, then put `+x` on your **file** instead. What does execute mean on a file vs why you should not sprinkle it on random dirs?

### Hard

5. [ ] Write a one-line script that prints `$SHELL` and `$0`, make it executable, run it. Compare those values to the same `echo`s in your interactive shell.
6. [ ] A script exists but `./name` says permission denied. Use listing (you will use `ls` constantly later; for now try running it and `chmod`) to get it executable **without** changing anything else on the machine.
