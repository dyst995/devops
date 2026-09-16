# Tasks — Basic shell commands

Close `theory.md` / `commands.md`. Work in `/tmp/cmd-tasks`. Do not destroy `$HOME`.

## Manuals

1. Open the full manual for `cat`. Open the manual of the manual program itself.
2. Search manuals by keyword `list`. Show the one-line description of `ls`.
3. Open section **5** of passwd (file format) vs section **1** of `ls` (command). Why are the section numbers different?
4. Open the GNU info page for `cat`, then for info itself.

## Where am I / listing (repeat flags)

5. Print the full path of the current directory. Go to `/`, parent, home, previous directory (and see it printed).
6. Long listing **with hidden files**. Long listing **human sizes**. Long listing **newest first**. Long listing **largest first** with human sizes.

## Create / copy / move / delete

7. Create an empty file. Update its timestamp from a date string like “next Friday”.
8. Create one directory (should fail if parents missing). Create a tree with parents as needed and brace expansion `test{1..3}`. Create a directory with an explicit mode.
9. Copy a tree. Copy a tree **keeping** mode/owner/timestamps.
10. Move a file so an overwritten destination is backed up with suffix `.old`. Move only if source is newer or dest missing.
11. Concatenate two files into a third.
12. Remove an **empty** directory only. Delete a file verbosely. Recursively force-delete **only** a disposable dir you created. Overwrite a throwaway file so recovery is harder.

## Environment (repeat export)

13. Dump all exported variables. Print `PATH` alone. Dump env another way.
14. Run a script with a variable set only for that command. Export an editor variable so children see it; start a nested shell; unset it.
15. Page through the huge dump of shell vars + env + functions.

## Viewing files (repeat head/tail)

16. Page a file **forward only**, then page both ways with search.
17. First 10 lines of the user database; first 5; all but the last 2 of a file you create.
18. Last 10 lines of a log; last 50; from line 20 to the end of a file.
19. Follow a growing log and stop when you have seen a new line.

## Scenario

20. Ticket: “keep a log of an install that fails, both output and errors, while I watch.” Produce `/tmp/install.log` from a command that writes both streams.
