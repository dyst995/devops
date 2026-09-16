# Tasks — Boot loaders

Close `theory.md`. **Read-only** unless a task says otherwise. Checkpoint before any write.

## Warm-up (chain)

1. Write the power-on sequence from the notes: empty RAM → firmware → ? → kernel → ? → user space.
2. In one sentence: what job does the boot loader have that firmware does not finish?
3. What is **chain loading** / multi-stage?

## Distinguish LILO vs GRUB

4. Expand both acronyms. Which is older/weaker? Which originally had no GUI menu?
5. List the three GRUB features the notes call out.
6. Write the two **course** config paths. On this VM, find whether they exist and whether one is a symlink. Also note what GRUB2 actually uses here — but if an exam asks the course paths, which two do you give?

## Find this

7. Print the kernel command line of the running system. Circle `root=`, LVM, crashkernel if present (same story as a kernel log “Command line”).
8. Predict: if RAM is empty at power-on, where do OS and apps live while the machine is **off**?

## Scenario

9. After a patch, nobody knows which kernel is running vs which will be chosen next. Report both using whatever this distro exposes (stay read-only if you are unsure). Do not rewrite the boot config in this task.
