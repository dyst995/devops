# Tasks — Text editors

Close `theory.md`. Work in `/tmp/text-editors-tasks` — copy practice files there; do **not** practice destructive edits on real system configs. Do the action or write the answer, then check yourself.

## Warm-up

1. Set the default editor variable to vim, then to nano (`export EDITOR=…`). Which tools in the notes honor it (`visudo`, `crontab -e`, `git commit`, …)?
2. Who wrote vi, in what year, for which Unix? What does Vim stand for (both old and current meanings from the notes)?
3. Recite the memory hook: on a server you will live in an editor — know **vim** and **nano**; never “just open” which file?

## Vim — modes

4. Copy a throwaway file into `/tmp/text-editors-tasks/practice.txt` (or create one). Open it with `vim`. You are in which mode at startup? Type letters — did they enter the file or run commands?
5. Enter insert with `i`, type a sentence, return to command mode with `Esc`.
6. From command mode, open last-line mode with `:`. Save (`:w`). Quit (`:q`). Reopen, change a word, quit **discarding** changes (`:q!`). Reopen: is the change gone?
7. Save-and-quit using either `:wq` or `:x`. Memorize the panic sequence: back to command (`Esc`), then save-and-quit.
8. Optional: run `vimtutor` for 10–15 minutes (or one lesson). Note one motion you did not know before.

## Vim — navigation (command mode)

9. In command mode on your practice file: move left/down/up/right with `h` `j` `k` `l`.
10. Word forward / back with `w` `b`. Start / end of line with `0` `$`.
11. First / last line of file with `gg` `G`. Jump to line *n* with `:n` then Enter.
12. Half page up / down with `Ctrl-u` / `Ctrl-d` (if the file is long enough — pad it first).

## Vim — editing

13. Delete a character (`x`), a word (`dw`), a whole line (`dd`).
14. Yank a line (`yy`) and put it (`p` / `P`). Undo (`u`). Redo (`Ctrl-r`) if available.
15. Insert before cursor (`i`) vs append after (`a`). Open a new line below (`o`) and above (`O`), then `Esc` back to command.

## Vim — searching

16. Search forward for a word (`/pattern`). Go to the next match (`n`) and previous (`N`).
17. Search backward (`?pattern`). Recite the memory hook: `/` like a URL forward; `n` = next.

## Vim — last-line extras

18. Show line numbers (`:set number`). Run a shell listing from last-line mode (`:!ls`). Confirm you return to the editor afterward.

## nano

19. Open the same practice file in nano. Ordinary keys — do they type text? (Modeless: yes.)
20. Save (`^O`), search (`^W`), cut a line (`^K`), paste it (`^U`), copy a line **without** cutting (`M-6`), quit (`^X`). Which modifier is Ctrl vs Meta in the notes’ notation (`^` vs `M-`)?
21. Recite: nano shows the cheatsheet on screen. Cut/paste is kill/uncut — which bindings?

## EDITOR and tools that honor it

22. `export EDITOR=nano`, then open a user crontab for editing (`crontab -e`). Abort without keeping a junk job (quit without saving / delete the temp change per your editor).
23. Switch `EDITOR` to `vim` and repeat the abort drill once so both editors feel familiar in that context.

## visudo (procedure — careful)

24. Why must you never edit `/etc/sudoers` with a normal editor? What extra thing does `visudo` do on save?
25. Open the sudoers file the **safe** way (`sudo visudo`) and quit **without** changing it. On Ubuntu vs “traditional,” which editor might appear?
26. Predict: if `EDITOR=vim` is set, what might `visudo` open? Confirm or note Ubuntu’s override from the notes.

## Repeat / memory hooks

27. Without looking: Command → Insert key? Insert → Command? Command → Last-line? Panic combo?
28. Without looking: `dd` / `yy` / `p` / `x` / `/pattern` — one word each.

## Scenario

29. Grant a practice user (or describe the exact `sudoers` line you would add) the right to restart a web server unit as root without a password, without full root, without a syntax typo taking away **your** sudo. Use only this topic’s safe-edit rule (`visudo`). If you cannot create the user on this box, write the line and the `visudo` procedure step-by-step as if you would run it.
