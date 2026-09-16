# Labs — Text editors

**Where:** any Linux.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Set `EDITOR` to `vim`, then to `nano`, and confirm with `printenv EDITOR`. Leave it as the editor you will actually use for `crontab -e`.

## Lab 2

Create `/tmp/vim-lab.txt` in Vim. Practice from Command mode: insert text, move with `hjkl`, `w`/`b`, `0`/`$`, `gg`/`G`, delete a character and a line, yank and paste a line, undo, search, then save and quit. Open the file again and quit without saving a change (`:q!`).

Optional: run `vimtutor` once.

## Lab 3

Edit the same file in nano. Save, search, cut/paste a line, exit.

## Lab 4

Do **not** edit `/etc/sudoers` with vim. Run `sudo visudo` and quit without changing anything (or only if you know the visudo quit keys and make no edit).

## Job and cert labs

## Lab 5

`crontab -e` using your `EDITOR`. Add a comment line, save, `crontab -l`, remove the comment.

## Lab 6

With `visudo -f /etc/sudoers.d/labuser` (or `visudo`), grant a lab user `NOPASSWD` for a **single** command (for example `/usr/bin/systemctl restart httpd`). Test as that user, then delete the sudoers drop-in.

## Lab 7

Edit a systemd **drop-in** with `systemctl edit httpd` (or a lab unit): add a comment in an override, `daemon-reload`, `cat` the unit. Remove the drop-in directory when done.
