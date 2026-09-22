# Assignments — Text editors

Close `commands.md`. Recite, then type. Predict **before** you press keys. Use a throwaway file under `/tmp` (never `visudo` on a production sudoers without a lab VM). Set `EDITOR` only in this shell, then `unset` it if you do not want to keep it.

## `export`

1. [ ] Recite how the default editor is chosen for `visudo`, `crontab -e`, `git commit`. Export `EDITOR` to `vim` in this shell.
2. [ ] Recite the nano variant. Export `EDITOR` to `nano`. Print `EDITOR` to prove the new value.
3. [ ] Predict: after `export EDITOR=vim`, a **child** process sees it. Prove with a child that prints the environment (`bash -c` / `env`).
4. [ ] Wrong-usage: `EDITOR=vim` without `export`. Does a child see it? Prove, then export.
5. [ ] Combine: export vim, prove child sees `vim`, export nano, prove child sees `nano`.
6. [ ] Privilege: exporting `EDITOR` for **you** needs no sudo. Prove as a normal user.
7. [ ] Predict: `export EDITOR=vim` vs `export EDITOR=nano` — last one wins in this shell. Prove by printing.
8. [ ] Recite: `visudo` and `crontab -e` honor `EDITOR`. You will use `visudo` later; here only prove `EDITOR` is in `env`.
9. [ ] Wrong-usage: `export EDITOR = vim` (spaces). Predict. Then the no-space form.
10. [ ] Combine: `export EDITOR=vim` then `unset EDITOR` then print. Child should no longer see your choice (or it is empty/inherited from login — record which).
11. [ ] Predict `echo "$EDITOR"` after export. Then print it.
12. [ ] Recite why both vim and nano appear on the cheat sheet (you pick one default).
13. [ ] Wrong-usage: `export editor=vim` (lowercase). Child looking for `EDITOR` misses it. Prove case sensitivity.
14. [ ] Combine: `export EDITOR=nano` and open `nano` on a throwaway file; quit without depending on `EDITOR` (nano is explicit). `EDITOR` is for tools that **launch** an editor.
15. [ ] Privilege: `sudo visudo` may reset the environment. Recite that `sudo` might not pass `EDITOR` unless configured. Do not change sudoers yet.
16. [ ] Predict: `export EDITOR=vim` in this shell does **not** change another already-open terminal. Open a second shell and print `EDITOR` there.
17. [ ] Recite the interview line: “how do you set the default editor for the session?”
18. [ ] Wrong-usage: `export $EDITOR=vim`. Predict. Export the **name**, not its value.
19. [ ] Combine: export, `env` grep `EDITOR`, `echo "$EDITOR"`, child `bash -c`. All three agree.
20. [ ] Combined: vim then nano; child inherits; no spaces; `unset`; no sudo.

## `vim`

1. [ ] Recite: Vim starts in Command mode. Open a throwaway file. Prove you cannot type text until you enter Insert (try a letter, then undo/escape).
2. [ ] Recite `Esc` — back to Command from Insert or Last-line. From Insert, return to Command. Prove the status/mode.
3. [ ] Recite `i` — Insert; keys become file text. Insert a short sentence. Escape to Command.
4. [ ] Recite `:` — Last-line; save/quit live there. Enter Last-line and leave it with `Esc` without saving yet.
5. [ ] Recite `h j k l` — left / down / up / right. Move on a file that has at least three lines (type them in Insert first).
6. [ ] Recite `w` and `b` — next word / previous word. Place the cursor mid-sentence and jump both ways.
7. [ ] Recite `0` and `$` — start / end of line. Prove on a long line.
8. [ ] Recite `gg` and `G` — first / last line of the file. Prove on a 5-line throwaway file.
9. [ ] Recite `x` — delete character. Delete one character, then undo.
10. [ ] Recite `dd` — delete whole line. Delete one line, then undo.
11. [ ] Recite `dw` — delete to end of word. Prove, then undo.
12. [ ] Recite `yy` then `p` — yank line / paste. Duplicate a line without using Insert.
13. [ ] Recite `u` — undo. Make a change, undo it, confirm the file matches the previous state.
14. [ ] Recite `/pattern` then `n` — search forward / next match. Put `fun` twice in the file; search and jump to the second hit.
15. [ ] Recite `:w` — write. Save the throwaway file. Prove on disk (`ls` from another terminal or after quit).
16. [ ] Recite `:q` — quit. Quit when there are **no** unsaved changes. Predict `:q` with unsaved changes (it should refuse).
17. [ ] Recite `:wq` — save and quit. Change a line, save-and-quit, reopen, prove the change stuck.
18. [ ] Recite `:q!` — quit discarding changes. Change a line, discard, reopen, prove the change is gone.
19. [ ] Wrong-usage: type `:q` thinking you are in Insert — you insert those characters. `Esc` first, then Last-line. Prove it once, undo.
20. [ ] Combined from memory: Insert sentence → `Esc` → `0` `$` `gg` `G` `w` `b` → `dd` undo → `/` `n` → `:wq`. No cheat sheet.

## `vimtutor`

1. [ ] Recite what `vimtutor` is (interactive lesson). Start it. You do **not** need a filename.
2. [ ] Predict: it opens Vim on a **lesson file**, not your project. Confirm you are in a tutor buffer. Quit only when you mean to (`:q` from Command).
3. [ ] Recite: you still start in Command mode inside the tutor. Press `Esc` if you wander into Insert by accident.
4. [ ] Work the tutor’s **movement** section (`h j k l`) until you can move without the arrow keys. Tick when you did, not when you read.
5. [ ] Work the tutor’s **Insert** section (`i`). Type, then `Esc`. Same as the cheat sheet.
6. [ ] Work deletion (`x` / line delete if the lesson includes it). Match cheat-sheet `x` / `dd` in your head.
7. [ ] Privilege: `vimtutor` needs no sudo. Prove as yourself.
8. [ ] Wrong-usage: `vim tutor` as a filename vs `vimtutor`. Predict opening a file named `tutor`. Use the tutor command.
9. [ ] Combine: after one tutor lesson, open `/tmp/practice.txt` in Vim and repeat `i` `Esc` `:wq` without the tutor.
10. [ ] Predict: quitting the tutor with `:q!` discards tutor progress in that buffer — that is fine. Recite `:q!` vs `:wq`.
11. [ ] Recite why the cheat sheet lists `vimtutor` beside `vim` (muscle memory, not a second editor).
12. [ ] Wrong-usage: run `vimtutor` over SSH with a broken `TERM` so the screen is garbage. If that happens, set a sane `TERM` or use a proper terminal; do not blame Vim first.
13. [ ] Combine: `export EDITOR=vim` then `vimtutor`. `EDITOR` does not replace `vimtutor`; it is a different entry point.
14. [ ] Privilege: do not run `sudo vimtutor`. No reason.
15. [ ] Predict: `vimtutor` vs `man vim` — lesson vs manual. Start tutor, quit, open `man vim`, quit.
16. [ ] Recite three tutor goals you will steal: move, insert, save/quit.
17. [ ] Wrong-usage: Ctrl-C spam to leave the tutor. Use `Esc` then `:q!`.
18. [ ] Combine: 10 minutes in `vimtutor`, then the `vim` combined drill on a throwaway file.
19. [ ] Recite the command name from a blank page and start it.
20. [ ] Combined: start tutor → Command mode → leave with Last-line quit → open a real throwaway file in `vim`.

## `nano`

1. [ ] Recite: nano is modeless; cheatsheet is on screen. Open a throwaway file. Find the help line at the bottom (`^` = Ctrl).
2. [ ] Recite `^O` — save. Type a line, save, confirm the filename prompt. Prove the file on disk.
3. [ ] Recite `^X` — exit. Exit with no pending unsaved changes.
4. [ ] Recite `^X` with unsaved changes — nano should ask. Type a line, exit, answer so you **do not** lose the drill (save or discard on purpose).
5. [ ] Recite `^W` — search. Put `fun` in the file twice, search, land on the first hit.
6. [ ] Recite `^K` — cut line. Cut one line. The line should leave the buffer.
7. [ ] Recite `^U` — paste. Paste the cut line back. Prove cut-then-paste is a move/copy workflow.
8. [ ] Recite `M-6` — copy line without cutting (`M-` = Alt/Cmd). Copy a line, paste with `^U`, prove the original is still there.
9. [ ] Combine: type three lines → copy the middle with `M-6` → paste at the end with `^U` → save with `^O` → exit `^X`.
10. [ ] Wrong-usage: treat `^` as the caret key instead of Ctrl. Predict nothing useful. Use Control.
11. [ ] Privilege: editing `/tmp` files needs no sudo. Prove `nano` on a throwaway file as yourself.
12. [ ] Predict: `nano` vs `vim` — no Command/Insert modes. Type immediately. Prove by typing without `i`.
13. [ ] Recite: `export EDITOR=nano` makes tools launch nano. Here you launched nano **explicitly**.
14. [ ] Wrong-usage: `^Q` or Vim’s `:q` inside nano. Predict those keys insert or do something else. Use `^X`.
15. [ ] Combine: `^W` search, then `^K` cut the matched line, `^U` paste it elsewhere, `^O` save.
16. [ ] Privilege: `sudo nano /etc/sudoers` is the **wrong** lesson — use `visudo`. Recite why (syntax check). Do not do the wrong thing.
17. [ ] Predict `^O` then Ctrl-C at the filename prompt — save cancelled? Prove, then save for real.
18. [ ] Recite the six-key cheat sheet from a blank page: save, exit, search, cut, paste, copy-without-cut.
19. [ ] Wrong-usage: `M-6` on a Mac terminal that swallows Alt. If copy fails, use the terminal’s Meta setting or Esc-as-Meta; still recite `M-6`.
20. [ ] Combined: open throwaway → type → `^O` → `^W` → `^K`/`^U`/`M-6` → `^X`. Cheatsheet on screen, keys from memory.

## `sudo`

1. [ ] Recite: `visudo` is listed **with** `sudo` on the cheat sheet. Why (sudoers is root-owned)? Answer out loud.
2. [ ] Predict: `visudo` without privilege — permission denied. Prove on a lab VM, then use `sudo`.
3. [ ] Recite: `sudo` runs one command as root. You still should not use raw `vim` on sudoers.
4. [ ] Wrong-usage: `sudo vim /etc/sudoers` (cheat sheet says never). Recite the risk (syntax error, lock yourself out). Do **not** save a broken sudoers.
5. [ ] Combine: `export EDITOR=vim` then `sudo visudo` on a **lab VM** only. If sudo strips `EDITOR`, note it. **Quit without changing** (`:q` / nano `^X`).
6. [ ] Privilege: this whole section is privilege. Use a lab VM. Do not practice on a shared production host.
7. [ ] Predict: `sudo -E visudo` vs plain `sudo visudo` for `EDITOR`. If you try, still quit without writing.
8. [ ] Recite: your password vs root password for `sudo` (typical sudoers). Fail once on purpose with a wrong password if you can lock yourself out for a minute — optional, lab only.
9. [ ] Wrong-usage: `sudo sudo visudo`. Silly. One `sudo`.
10. [ ] Combine: `sudo -l` (if allowed) to see whether you may run `visudo`. Predict before you run.
11. [ ] Predict: after `sudo visudo` you are still **you** at the next prompt (sudo is per-command). Prove `whoami`.
12. [ ] Recite why GUI `sudo` typing a password in an editor session is easy to confuse with Vim Insert — stay calm, `Esc`/`^X`.
13. [ ] Wrong-usage: `sudo nano file_to_edit.txt` in `/tmp` when you own the file. Unneeded privilege. Edit as yourself.
14. [ ] Combine: edit `/tmp/x` without sudo; recite when you **would** need sudo (files you do not own).
15. [ ] Privilege warning: never `sudo visudo` then paste random internet sudoers lines. This course: look, maybe comment, revert.
16. [ ] Recite the interview line: “how do you edit sudoers safely?”
17. [ ] Wrong-usage: `su visudo`. Predict. The cheat sheet command is `sudo visudo`.
18. [ ] Combine: `EDITOR` export (user) + `sudo visudo` (root). Two different users’ environments.
19. [ ] Predict `sudo -v` refresh vs needing a password again after timeout. Optional lab check.
20. [ ] Combined: denied without sudo; never vim the sudoers file directly; lab VM; quit without breaking sudo.

## `visudo`

1. [ ] Recite what `visudo` edits and **why** it exists (syntax check). Name the file path from memory.
2. [ ] Recite: never use `vim` on that file directly. Repeat the reason (a typo can lock out sudo).
3. [ ] On a **lab VM**, open visudo via sudo, **make no changes**, leave the editor (`:q` / `^X`). Prove you can exit cleanly.
4. [ ] Predict: visudo uses `$EDITOR` if the environment is passed. Export `EDITOR=nano` or `vim` first; see which editor appears. Quit unchanged.
5. [ ] Wrong-usage: `visudo /etc/sudoers` extra path if your visudo does not want it. Use the cheat-sheet form (no extra path).
6. [ ] Combine: `export EDITOR=vim` → `sudo visudo` → Command mode `Esc` → quit without write.
7. [ ] Privilege: only lab VM. If you are not on a VM, skip the open and still recite the command and the path.
8. [ ] Predict: visudo will **refuse to save** a syntax error. You may read `man visudo` for that claim; do not introduce an error on purpose unless you have another root path.
9. [ ] Recite: `crontab -e` also uses `EDITOR` (cheat sheet comment). You are not drilling crontab here — just the coupling.
10. [ ] Wrong-usage: `vim /etc/sudoers` as root. Recite why visudo is mandatory. Do not save.
11. [ ] Combine: `export EDITOR=nano` → `sudo visudo` → `^X` without save.
12. [ ] Privilege: `visudo` without sudo fails. Prove, then the sudo form.
13. [ ] Predict: after a clean quit, `sudo -l` still works. That is the whole point of not breaking the file.
14. [ ] Recite the full cheat-sheet visudo line from memory (privilege + command).
15. [ ] Wrong-usage: stay in visudo for 20 minutes “reading.” Open, identify the file, quit. Keep the window short.
16. [ ] Combine: interview: “someone used vim on sudoers and now sudo fails.” What should they have used? How would you recover (root login / visudo -c) — say it; do not wreck the box.
17. [ ] Recite `visudo -c` as a **check** if your man page has it (parse only). Optional; still do not edit blindly.
18. [ ] Wrong-usage: copy-paste a `ALL=(ALL) NOPASSWD: ALL` line for practice. Do **not**. Recite the danger.
19. [ ] Combine: `EDITOR` vim vs nano with visudo (two quits, no writes).
20. [ ] Combined: path is `/etc/sudoers`; syntax check; sudo required; never raw vim; lab VM; quit unchanged.
