# Tasks — Bash startup files

Close `theory.md`. Prefer an SSH login plus a nested shell.

## Warm-up (the two questions)

1. Write the two questions that decide which files Bash reads.
2. Draw the tree from the notes: interactive+login vs interactive+non-login, including logout.

## Find / construct

3. Decide whether **this** shell is a login shell (two methods from the notes). Record both results.
4. Start a login Bash explicitly. Repeat the check. Exit it.
5. List, in **order**, the files a login shell reads. Which of the three personal files is read if the first exists?
6. Which **one** file does an interactive non-login shell read? Which files does it **not** read?
7. Where do `PATH` / `umask` typically live vs aliases / `PS1` / completion?

## Predict, then prove

8. Put a unique message in the login personal file and a different unique message in the interactive-only file. Open a **new SSH** session. Which messages appear? Predict first.
9. From that SSH session, start a nested Bash **without** login. Which messages appear? Predict first.
10. If the login file does not pull in the interactive file, add the “if file exists, source it” block from the notes. Repeat 8–9. Then decide whether to keep it.
11. Add a message to the logout file. Exit an SSH login. Did it run?

## Repeat the map

12. Fill from memory: SSH vs `bash --login` vs desktop terminal — interactive? login? files? Then: what is `su` for, and what does `su -` add?
13. Predict: aliases only in the interactive file — does a pure login SSH see them **without** sourcing? PATH only in the login file — does a desktop terminal see it?

## Scenario

14. Ticket: “aliases work in my GUI terminal but not over SSH” (or the reverse). Fix it using only this topic’s sourcing idea. Demonstrate both entry points.
