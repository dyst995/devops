# Assignments — Basic shell commands

Close `commands.md`. Type and run. Work in a **throwaway directory** under your home. `rm -rf` is dangerous — only on dirs you just created. Do not `shred` files you need. Do not `rm` system paths.

## Manual pages (`man`, `man -k`, `man -f`, `info`)

### Easy

1. [ ] Open the full manual for `ls` with `man`. Quit when you have seen the SYNOPSIS (`q` in `less`).
2. [ ] Use `man -f` on `ls` (one-line whatis). Then `man -k` with a keyword like `list`.

### Medium

3. [ ] Open `man 5 passwd` (file format) and `man 1` for a command you already use. What does the section number change?
4. [ ] Someone ran `man ls` and thought `-l` was not documented. Find the `-l` paragraph, then quit. Open `info` for `ls` or `info info` if you want the GNU browser — leave with its quit key.

### Hard

5. [ ] You forgot whether `mkdir` has a parents option. Use `man` (or `man -k`) to find it, then use that option in the mkdir set below — do not look at the cheat sheet.
6. [ ] `man man` — how do you request a section? Then open the passwd **file format** page again (`man 5 passwd`) and find the login-shell field (ties to the shell topic).

## Listing and moving around (`ls`, `pwd`, `cd`)

### Easy

1. [ ] `pwd`. Then `ls` with long listing **and** hidden files.
2. [ ] `cd` to `/`, `pwd`, `cd` to your home (`~`), `pwd`. Then `cd -` to jump back. What does `cd -` print?

### Medium

3. [ ] In a directory with files: `ls -lh`, then `ls -lt`, then `ls -lSh`. Which file is newest? Which is largest?
4. [ ] Someone ran `cd /root` as a normal user. What happens? `pwd` after the failed `cd` — did you move?

### Hard

5. [ ] From home: `cd` into `/etc`, `ls -la` for a hidden name, `cd ..`, `cd -` twice. End in a directory you can name with `pwd`.
6. [ ] Combine: `ls -li` (inodes topic) in a throwaway dir that has a hard link pair. Use `cd`/`pwd` only as needed. Point out the shared inode.

## Creating files and directories (`touch`, `mkdir`)

### Easy

1. [ ] `touch` an empty file. `ls -l` it. `touch` it again — what timestamp field changed?
2. [ ] `mkdir` one directory. Then `mkdir -p` a nested path including brace expansion `test{1..3}` as in the course.

### Medium

3. [ ] `touch -d` with a date string on a file. `ls -l` to see the timestamp you set.
4. [ ] `mkdir` without `-p` when a parent is missing — let it fail. Then create it with `-p`. Optional: `mkdir -m` with a mode on a practice dir, `ls -l` to see permissions.

### Hard

5. [ ] Build `dir/test{1..3}/empty` in one `mkdir` command, `touch` a file in one of those dirs, `ls -la` to prove hidden vs normal names.
6. [ ] Someone ran `touch dir/` thinking it creates a directory. What did you get? Create the directory the right way, then `touch` a file inside it.

## Copy, move, concatenate (`cp`, `mv`, `cat`)

### Easy

1. [ ] Copy a file with `cp`. Then `cat` the copy.
2. [ ] `mkdir` a dest dir, `mv` the copy into it. `ls` both places.

### Medium

3. [ ] `cp -r` a small directory tree you created. `cp -rp` a second time to another name. Compare `ls -l` timestamps/mode.
4. [ ] `cat` two files into a third with `>`. Then `mv -b -S ".old"` so an overwrite leaves a backup. Confirm the `.old` name.

### Hard

5. [ ] `mv -u`: make dest newer than source, run `mv -u`, see if source still sits there. Then make source newer and try again.
6. [ ] Wrong: `cp dir dest` without `-r`. Note the error. Copy the tree correctly. Then `cat` a file from the copy to prove content.

## Removing (`rmdir`, `rm`, `shred`)

### Easy

1. [ ] `mkdir` an empty dir, `rmdir` it. Then `mkdir` again, `touch` a file inside, `rmdir` — it should refuse.
2. [ ] `rm -v` that file, then `rmdir` the now-empty dir.

### Medium

3. [ ] Create a tiny tree, `rm -rfv` **only** that tree (full path under your throwaway dir). Watch verbose output.
4. [ ] Someone typed `rm -rf /` or `rm -rf ~`. Do **not** run those. Recreate a **named** practice dir and remove only that path.

### Hard

5. [ ] `shred` a throwaway file you do not need (not a symlink to something important). Then `ls` — is the name gone or empty? (behavior varies; record what **your** `shred` did.)
6. [ ] Combine: `mkdir -p`, `touch`, `cp -r`, `mv`, `rm -v` files, `rmdir` if empty, or `rm -rfv` the leftover practice tree. One sitting, one throwaway parent dir.

## Environment from the shell (`printenv`, `env`, `export`, `unset`, `set`)

### Easy

1. [ ] `printenv` and `printenv PATH`.
2. [ ] `export` a unique variable, `printenv` that name, `unset` it, `printenv` again.

### Medium

3. [ ] `env VAR=tmp` plus a command that prints `VAR` (a tiny script or `bash -c`). Afterward `printenv VAR` in your shell.
4. [ ] `set | less` — quit `less` with `q`. How is this dump bigger than `printenv`?

### Hard

5. [ ] `export EDITOR=vim`, `printenv EDITOR`, start `bash` nested, `printenv EDITOR`, `exit`, `unset EDITOR`.
6. [ ] Broken: `export EDITOR vim` (missing `=`). Fix it. Then `echo "$EDITOR"` vs `printenv EDITOR`.

## Pagers and file slices (`more`, `less`, `head`, `tail`)

### Easy

1. [ ] `head` `/etc/passwd` (default 10). Then `head -n 5` the same file.
2. [ ] `tail` `/etc/passwd`. Then `tail -n 5`.

### Medium

3. [ ] `less` a log or `/etc/passwd`: search `/` a username, `q` quit. Try `more` on the same file (forward only).
4. [ ] `head -n -2` on a small file you `cat`’d together. Then `tail -n +3` on the same file. What disappeared vs what remained?

### Hard

5. [ ] `tail -f` a log you are allowed to read (`/var/log/syslog` or similar). In another terminal, do something that might log (failed `cd /root` is enough noise sometimes). Ctrl-C the `tail`. If the file is unreadable, `less`/`tail` a file you own instead.
6. [ ] Combine: `ls -lt /var/log` (if permitted), pick a file, `tail -n 50`, `grep` comes next topic — for now `less` and search. Then `head` the same file. Do not `rm` logs.
