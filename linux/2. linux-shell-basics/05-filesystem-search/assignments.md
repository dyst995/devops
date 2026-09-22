# Assignments — Filesystem search

Close `commands.md`. Type and run. `find /` is slow and can print “Permission denied” — that is normal; do not `sudo find /` unless the lab needs it. `updatedb` is usually **root**. Do not `-exec rm` except on files **you** created in `/tmp` or a throwaway dir.

## `find`

### Easy

1. [ ] From `.` in a throwaway dir, create a file named `hosts` and `find . -name hosts`.
2. [ ] `find` your home (`/home/...` or `~`) for files owned by you (`-user`). You may add `-type f` if you already saw it in `man find`.

### Medium

3. [ ] Create `one.log` and `two.LOG`. `find . -name '*.log'` with the glob **quoted**. Why quote? Run once **unquoted** after `touch` extra matches if you want to see the shell expand it.
4. [ ] In `/tmp` (or your throwaway): create a regular file named `core`, `find` it with `-type f`, then delete **that** file with `-exec rm {} \;` (only your file). Confirm with `ls`.

### Hard

5. [ ] Same `core` file recreated: `-print` piped to `xargs` (course form). Then a name **with a space**: use `-print0` and `xargs -0` so you do not delete the wrong thing. Only your files.
6. [ ] Combine: `find` a file, `ls -li` it, `head` it. Someone used `-name *.log` without quotes and `find` got the wrong args — fix the quoting.

## `locate` and `updatedb`

### Easy

1. [ ] `locate passwd` and glance at the paths. Is `/etc/passwd` in the list?
2. [ ] `locate` a file you **just** `touch`’d in your throwaway dir. Is it missing? That is the stale-DB lesson.

### Medium

3. [ ] On a **lab VM**, `sudo updatedb` (or skip if you have no sudo). `locate` the new file again.
4. [ ] Someone expects `locate` to see a file created one second ago. Prove the gap with `find` (sees it) vs `locate` (maybe not).

### Hard

5. [ ] `locate` vs `find` for `hosts`: one is a database, one walks the tree. Time them mentally — which printed faster? Which is current?
6. [ ] Combine: `ls` / `find` / `locate` a name under `/etc`. `man -k` if you forget `locate`. Do not `updatedb` on a shared host if policy forbids it.

## `grep`

### Easy

1. [ ] `grep` a known string in `/etc/passwd` (your username).
2. [ ] Same search with `-i` and with `-n`. What extra columns/behavior do you get?

### Medium

3. [ ] `grep -r` a short string under a **small** tree you own (not `/`). Then `grep -r` in `~` for a unique word you put in a practice file.
4. [ ] Someone ran `grep pattern` with no file and sat on stdin. Ctrl-C. Then grep a real file. Optional: `grep` a pattern that matches nothing — empty output, not an editor.

### Hard

5. [ ] `find` files named `*.log` (quoted) and `grep` a word in one of them. Or `grep -r` on that directory. Then `less` + search vs `grep -n` — same line?
6. [ ] Combine with `head`/`tail`: `grep` your user in `/etc/passwd`, then `head`/`tail` that file to see the same line in context. Do not use `sudo` to grep `/etc/shadow` unless you are on a lab and already know shadow from the users topic.
