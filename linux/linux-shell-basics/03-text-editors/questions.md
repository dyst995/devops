# 03 — Text Editors — Questions

Cover the Answers section. Answer first, then check.

1. What are Unix text editors used for? What format do they edit?
2. Which two families of editors do the notes call the most popular today?
3. How do you set the default editor? Give an example for vim and for nano.
4. Who wrote the original vi, in what year, on what system? What company did he later co-found?
5. Why did vi become the Unix standard, and why must a DevOps engineer still know it?
6. What does Vim stand for, and what did the name used to mean? Why did it change?
7. Command to open `file_to_edit.txt` in Vim. Command that teaches Vim interactively.
8. Name Vim’s three modes. Which one is active when Vim starts?
9. In Command mode, are the keys you type inserted into the file? What can you do in that mode?
10. How do you return to Command mode from Insert or Last-line?
11. What does Insert (Input) mode do? Which single key from Command mode enters it?
12. How do you enter Last-line mode? Where does the cursor go?
13. Recite `h j k l`, `w b`, `0 $`, `gg G`.
14. What do `x`, `dd`, `dw`, `yy`, `p`, `u` do?
15. Search forward, search backward, next match, previous match — which keys?
16. Write the last-line commands to save, quit, save-and-quit, and quit without saving.
17. What does `:!ls` do?
18. nano is “modeless.” What does that mean? Which keys do *not* insert text?
19. How is Control written in nano docs? How is Meta written, and which physical keys is it?
20. Default bindings: cut a line, paste, copy a line without cutting.
21. Usual command to open a file in nano.
22. What file does `visudo` edit, and what command does that file configure?
23. Why must you never edit that file with a normal editor?
24. What extra thing does `visudo` do when you save?
25. Which editor does `visudo` traditionally open? What does Ubuntu use instead?

---

## Answers

1. Create and edit files. Plain text.
2. vi/vim and nano.
3. `EDITOR` environment variable. `export EDITOR=vim` or `export EDITOR=nano`.
4. Bill Joy, 1976, BSD Unix. Sun Microsystems.
5. It was a full-screen visual editor when that was new. It is still the standard editor on any Unix system — including minimal servers with no nano.
6. Vi IMproved; used to mean Vi IMitation. Too many improvements for “imitation.”
7. `vim file_to_edit.txt` · `vimtutor`
8. Command, Insert (Input), Last-line. Starts in Command.
9. No — they are commands (move, search, delete, rearrange). They are not shown as typed text in the file.
10. `Esc`
11. Everything typed is treated as file input. `i`
12. Type `:` from Command mode. Cursor jumps to the last line of the screen.
13. left/down/up/right · next/previous word · start/end of line · first/last line of file.
14. delete char · delete line · delete word · yank line · paste · undo.
15. `/pattern` · `?pattern` · `n` · `N`
16. `:w` · `:q` · `:wq` (or `:x`) · `:q!`
17. Runs the shell command `ls` from Last-line mode (`:!command`).
18. Normal keys always enter text. Only Control and Meta sequences are commands.
19. `^` = Ctrl. `M-` = Meta = Alt or Cmd.
20. `^K` cut · `^U` uncut/paste · `M-6` copy.
21. `nano file_to_edit.txt`
22. `/etc/sudoers`. It configures `sudo`.
23. A syntax error can break privilege escalation so you cannot get root.
24. It validates `/etc/sudoers` syntax and rejects a broken file.
25. vi. Ubuntu: nano.
