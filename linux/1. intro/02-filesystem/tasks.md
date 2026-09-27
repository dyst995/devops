# Tasks — File system

Close `theory.md`. Work in `/tmp/filesystem-tasks` when creating files. Do the action or write the answer, then check yourself.

## Warm-up

1. In one sentence: what is a file system?
2. List `/`. Say out loud why there is no `C:` here. What is the single root of the Linux tree?
3. From the notes: name at least four Linux filesystem **types** and the three classic Windows ones this course sticks to.
4. Memory hook check: Linux = one tree, root is `/`. Windows = many roots (`C:\`, `D:\`). Restate both hooks without looking.

## Linux model

5. Extra disks or partitions are **mounted** onto a directory. Name a typical mount directory from the notes (for example under `/mnt` or `/home`).
6. Predict: you attach a second disk on Linux. Do you get a new drive letter, or something else? Write the answer, then confirm with theory.
7. From the notes: does Linux **require** `filename.extension`? Who decides what a file “is” — the name, or content + permissions?
8. Why can a file named `notes` still be a script, and why is `run.sh` not automatically executable just because of `.sh`?

## Windows model (contrast)

9. From memory: how does Windows show storage (drive letters)? What range of letters does the notes mention?
10. On Windows, what decides that a file is treated as executable vs text vs library? Give three extension examples from the notes.
11. Predict: you plug in a second disk on Windows vs Linux. What does the user see in each model?

## Side-by-side table (recall)

12. Rewrite the side-by-side table from memory: how storage is shown, second disk, what decides file type, common local FS, path example. Then open theory and mark misses.

## Execute bit and shebang (hands-on)

13. Under `/tmp/filesystem-tasks`, create a file named `notes` (no suffix) whose first line names bash as interpreter and whose second line prints `ok`. Try to run it as `./notes`. What happens?
14. Turn on the execute bit with `chmod +x` and run it again. Which change mattered for Linux: the name or the permission?
15. Predict **before** trying: a file named `run.sh` with **no** execute bit — does Linux run it because of `.sh`? Then create one and check.
16. Create `hello.sh` with a shebang and a print line. Run it three ways: `bash hello.sh`, `sh hello.sh`, and (after `chmod +x`) `./hello.sh`. Which ways needed the execute bit?

## Commands: see the tree and mounts

17. Show block devices and their mount points (`lsblk`). Identify which device (if any) is mounted on `/`.
18. Show human-readable space used/free per mounted filesystem (`df -h`). Pick one line and explain what the columns mean in your own words.
19. Show the mount table (`findmnt`). Identify the mount for `/` and one other mount of your choice.
20. Write (do **not** run unless you have a throwaway lab disk) the `mount` command shape from the notes that attaches `/dev/sdb1` onto `/mnt/data`. What does that command do in the “one tree” model?
21. Read `/etc/fstab` (do not edit). In one sentence: what job does that file have for making mounts survive reboot?

## Scenario

22. A Windows admin asks for “the D: drive of the app data.” Translate that into the Linux model in one sentence, then name the directory you would actually use (and how a second disk would appear in the tree after `mount`).
