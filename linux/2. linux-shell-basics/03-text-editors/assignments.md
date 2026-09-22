# Assignments — Text editors

Close `commands.md`. Practice in **throwaway files**. Do **not** edit `/etc/sudoers` with `vim`/`nano` directly — only `visudo`. Backup any real dotfile before you use it as a playground.

## Vim (modes, save/quit, search)

### Easy

1. [ ] Open a throwaway file with `vim`. Press `i`, type a line, `Esc`, save and quit with the last-line command that writes and exits.
2. [ ] Reopen the same file. Use `/` to search for a word you typed, then `n` if there is a second match. Quit.

### Medium

3. [ ] In Command mode: `dd` a line, `yy` another, `p` to paste, `u` to undo once. Save with `:w` and quit with `:q`.
4. [ ] Someone is stuck in Insert mode and types `:wq` into the file. `Esc` first, then save or quit. If you saved junk, delete that line with `dd` and `:wq`.

### Hard

5. [ ] Create a 10-line file. Using `gg`, `G`, `0`, `$`, `w`, `b` only (plus `i` if you must), jump around and change the **first** and **last** line. `:wq`.
6. [ ] Open `/etc/passwd` **read-only in your mind** — if you open it in vim, quit with `:q!` and do not write. Practice `/yourusername` then `:q!`. Combine with the shell topic: that line’s last field is the login shell.

## nano

### Easy

1. [ ] Open a throwaway file with `nano`, type a line, save (`^O`), exit (`^X`).
2. [ ] Reopen it, search (`^W`) for a word you typed, exit.

### Medium

3. [ ] Cut a line (`^K`) and paste it (`^U`). Save and exit.
4. [ ] Someone hits `^X` with unsaved edits. Answer the save prompt so the file **keeps** the new text. Open it again to prove it.

### Hard

5. [ ] Write a three-line practice “script” in nano, exit, `chmod +x`, run it. If you need to fix a typo, open nano again — do not start vim for this item.
6. [ ] `export EDITOR=nano`, then `crontab -e` **only if** you already have the cron topic or can quit crontab without saving (`nano` `^X`). If cron is unfamiliar, just `echo "$EDITOR"` and open `nano` on a file. `unset` or restore `EDITOR` afterward.

## `EDITOR` and `visudo`

### Easy

1. [ ] `export EDITOR=vim` (or `nano`). `echo` / `printenv` / `env` — whichever you already know — to prove `EDITOR` is set.
2. [ ] Run `sudo visudo` on a **lab VM** and **quit without changing** the file (vim `:q!` or nano `^X`). You are proving the tool opens, not editing sudoers.

### Medium

3. [ ] Switch `EDITOR` to the other editor, `visudo` again (lab), quit without saving. Then `unset EDITOR` or put back your original.
4. [ ] Someone opened `/etc/sudoers` with `vim` directly. Do **not** do that. Why does the course say `visudo` only? (syntax check)

### Hard

5. [ ] Combine: `export EDITOR=vim`, start `bash --login` in a nested shell — is `EDITOR` still set (`env`)? `exit`, `unset` if you do not want it sticky.
6. [ ] Lab only if you must change sudoers — **do not** for this pack. Instead: write a throwaway file that *looks* like a broken sudoers line, open it in `vim`, fix a typo, `:wq`. The real sudoers stays untouched.
