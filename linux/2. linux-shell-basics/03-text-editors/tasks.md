# Tasks — Text editors

Close `theory.md`. Checkpoint before sudoers.

## Warm-up

1. Set the default editor variable to vim, then to nano. Which tools in the notes honor it?
2. Who wrote vi, in what year, for which Unix? What does Vim stand for?

## Vim — modes (do, don’t list keys in a cheat sheet while doing)

3. Open a throwaway file. You are in which mode at startup? Type letters — did they enter the file or run commands?
4. Enter insert, type a sentence, return to command mode.
5. From command mode, open last-line mode. Save. Quit. Reopen, change a word, quit **discarding** changes. Reopen: is the change gone?
6. In command mode: move left/down/up/right; word forward/back; start/end of line; first/last line of file.
7. Delete a character, a word, a whole line. Yank a line and put it. Undo. Search forward for a word; go to the next match.
8. Show line numbers from last-line mode. Run a shell listing from last-line mode.
9. Save-and-quit using either of the two last-line forms in the notes. Memorize the panic sequence: back to command, then save-and-quit.

## nano

10. Open the same file in nano. Save, search, cut a line, paste it, copy a line **without** cutting, quit. Which modifier is Ctrl vs Meta in the notes’ notation?

## visudo (procedure)

11. Why must you never edit the sudoers file with a normal editor? What extra thing does the safe editor do on save?
12. Open the sudoers file the **safe** way and quit without changing it. On Ubuntu vs “traditional,” which editor might appear?

## Repeat

13. Change the default editor, then open a user schedule for editing (the tool from the notes that uses `EDITOR`). Abort without keeping a junk job.

## Scenario

14. Grant `labuser` the right to restart the web server as root without a password, without full root, without a syntax typo taking away **your** sudo. Use only this topic’s safe-edit rule.
