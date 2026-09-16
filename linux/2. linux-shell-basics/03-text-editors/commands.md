# Commands to memorize

```bash
export EDITOR=vim            # default editor for visudo, crontab -e, git commit
export EDITOR=nano

vim file_to_edit.txt         # open in Vim (starts in Command mode)
vimtutor                     # interactive Vim lesson
nano file_to_edit.txt        # modeless editor; cheatsheet on screen
sudo visudo                  # edit /etc/sudoers with syntax check — never use vim on that file directly
```

## Vim (from Command mode unless noted)

```text
Esc          back to Command from Insert or Last-line
i            Insert — keys become file text
:            Last-line — save/quit live here
h j k l      left / down / up / right
w b          next word / previous word
0 $          start / end of line
gg G         first / last line of file
x dd dw      delete character / whole line / to end of word
yy p         yank (copy) line / paste
u            undo
/pattern  n  search forward / next match
:w :q :wq :q!   write / quit / save+quit / quit discarding changes
```

## nano (`^` = Ctrl, `M-` = Alt/Cmd)

```text
^O save    ^X exit    ^W search
^K cut line    ^U paste    M-6 copy line without cutting
```
