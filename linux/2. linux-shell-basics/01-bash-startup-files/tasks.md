# Tasks — Bash startup files

Close `theory.md`. Prefer an SSH login plus a nested shell. When you create scratch messages or snippets, keep them temporary and easy to undo. Do the action or write the answer, then check yourself.

## Warm-up

1. Write the two questions that decide which files Bash reads.
2. Draw the tree from the notes: interactive+login vs interactive+non-login, including logout.
3. From memory: what does “interactive” mean? What does “login” mean? Give one real example of each path (SSH vs desktop terminal icon).

## Login vs non-login — decide what you are in

4. Decide whether **this** shell is a login shell using both methods from the notes (`echo $0` and `shopt login_shell`). Record both results.
5. Start a login Bash explicitly with `bash --login`. Repeat both checks. Exit it.
6. Start a login Bash with the short form `bash -l`. Confirm `shopt login_shell` is `on`. Exit it.
7. Start a nested Bash **without** `--login` / `-l`. Predict: login or not? Confirm with `shopt`. Exit it.

## Files read — construct from memory

8. List, in **order**, the files a login shell reads. Which of the three personal files is read if the first exists?
9. If `~/.bash_profile` exists and is readable, what happens to `~/.bash_login` and `~/.profile`?
10. Which **one** file does an interactive non-login shell read? Which files does it **not** read (`/etc/profile`, the profile trio)?
11. Where do `PATH` / `umask` typically live vs aliases / `PS1` / completion?
12. Recite the memory hooks: login = **profile** family; non-login = **rc** only. What does “rc” stand for in the notes’ idea?

## `su` vs `bash --login`

13. From memory, fill the comparison: job, password, UID change?, whose startup files — for `su` vs `bash --login`.
14. What does bare `su` do? What does `su -` (or `su -l`) add? Is either of them “the other way to start a login shell as you”?
15. Predict: `su user` vs `su - user` — what differs about the environment? Write it without looking, then check the notes.

## Predict, then prove — sourcing

16. Put a unique message (e.g. `echo LOGIN_MARKER`) in the login personal file you actually use, and a different unique message in `~/.bashrc`. Open a **new SSH** session (or `bash --login`). Which messages appear? Predict first, then prove.
17. From that login session, start a nested Bash **without** login. Which messages appear? Predict first, then prove.
18. If the login file does not pull in the interactive file, add the “if file exists, source it” block from the notes (use `.`, not `source`, in the profile). Repeat 16–17. Then decide whether to keep the block.
19. Explain in one sentence: what does “referred to” / sourcing mean here — subshell or current shell? Why does that matter for aliases and `export`?
20. At a Bash prompt, run `. ~/.bashrc` (or `source ~/.bashrc`). Did aliases/functions reload without opening a new terminal?

## `.` vs `source` / POSIX

21. From memory: which of `.` and `source` is POSIX / required in `sh`? Which is Bash-specific?
22. Predict: under `/bin/sh` (often dash), does `source ~/.bashrc` work? Try a one-liner that would fail on dash if `source` is missing — or state the expected error from the notes.
23. Need a space: is `.~/.bashrc` valid? Fix it. Write the portable form used in `~/.profile` / `/etc/profile`.

## Logout

24. Add a unique message to `~/.bash_logout`. Exit an SSH login (or a `bash --login` you started). Did it run? When does logout **not** run (non-login nested shell)?

## Quick map — recall

25. Fill from memory: SSH vs `bash --login` vs desktop terminal — interactive? login? files?
26. Predict: aliases only in `~/.bashrc` — does a pure login SSH see them **without** sourcing? `PATH` only in `~/.bash_profile` — does a desktop terminal see it?
27. Ticket drill (write the diagnosis only): “My `PS1` / aliases work in the GUI terminal but not over SSH.” Which file is missing from the login path, and what is the usual fix?

## Scenario

28. Ticket: “aliases work in my GUI terminal but not over SSH” (or the reverse). Fix it using only this topic’s sourcing idea. Demonstrate both entry points (login shell and non-login nested Bash) so the same alias works in both.
