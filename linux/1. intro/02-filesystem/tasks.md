# Tasks — File system

Close `theory.md`. Do not open `commands.md` unless you ask for help.

## Warm-up

1. List `/`. Say out loud why there is no `C:` here.
2. Find where a second disk would show up in the tree **after** it is attached (name a typical directory from the notes).
3. List three Linux filesystem **types** from the notes and three Windows ones from the notes.

## Construct / predict

4. Create a file in `/tmp` named `notes` (no suffix) whose first line names bash as interpreter and whose second line prints `ok`. Try to run it as a program. Then make the kernel treat it as executable and run it again. Which change mattered: the name or the permission?
5. Predict: a file named `run.sh` with no execute bit — does Linux run it because of `.sh`?
6. Predict: you plug in a second disk on Windows vs Linux. What does the user see in each model?

## Find this

7. Show block devices and their mount points.
8. Show human-readable space per mounted filesystem.
9. Show the mount table. Identify which device is `/`.

## Repeat

10. Write the side-by-side table from memory: how storage is shown, second disk, what decides file type, path example. Then open theory and mark misses.
11. Read `/etc/fstab` (do not edit). What job does that file have in the “one tree” model?

## Scenario

12. A Windows admin asks for “the D: drive of the app data.” Translate that into the Linux model in one sentence, then point at the directory you would actually use.
