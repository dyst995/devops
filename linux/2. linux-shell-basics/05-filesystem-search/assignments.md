# Assignments — Filesystem search

Close `commands.md`. Recite, then type. Predict the result **before** you run. Use a throwaway directory under `/tmp`. **Never** `find / … -exec rm` or `xargs rm` except on files **you just created**. `updatedb` is usually root — lab VM only.

## `find`

1. [ ] Recite: `find` walks a **live** tree. From `/` (or a smaller tree if `/` is huge), look for a basename **exactly** `hosts`. Predict whether you will see `/etc/hosts`. Interrupt with Ctrl-C if the walk is too slow; retry from `/etc`.
2. [ ] Recite `-name` vs the starting path. Start at `.` in a throwaway dir, create `hosts` and `myhosts`, search exact basename `hosts`. Only one hit?
3. [ ] Recite `-user`. Under a directory you own, find files owned by **you**. Predict your username first.
4. [ ] Predict: `-user` with a name that does not exist. What does `find` print? Prove it.
5. [ ] Recite: quote globs so the **shell** does not expand them. Create `a.log` and `b.log`. Search `*.log` **quoted**. Then try **unquoted** in a dir with matching files — predict the shell expanding first.
6. [ ] Recite `-type f` (regular files). Create a directory named `core` and a file named `core`. Find only the **file**.
7. [ ] Recite `-exec` with `{}` and `\;`. In a throwaway dir only: two files named `core`, `-type f`, delete **each match**. Prove they are gone. **Warning:** this is `rm`. Never against `/tmp` at large, never `/`.
8. [ ] Predict: forget `\;` (or `;`) on `-exec`. What error? Prove, then the correct terminator.
9. [ ] Recite `-print` piped to `xargs` as the “same job, batched args” alternative to `-exec rm`. Recite why the cheat sheet uses `/bin/rm` and a trailing `-` (end of options). Practice with `echo` first, not `rm`.
10. [ ] Recite `-print0` (NUL between names). Create `core` with a **space** in another filename you will delete only if you meant to — better: create `my core` file **not** named core; create `core` files without spaces first. Then a file with a space **and** `-name` that matches. Prove NUL is the safe split.
11. [ ] Combine: `-name` + `-type f` + `-exec` on throwaway `core` files. Then the `print0` + `xargs -0` form on a second pair. Same end state.
12. [ ] Recite tests you look up in the manual: `-mtime`, `-size`, `-perm`, `-maxdepth`. Open the manual, find each once, then close it.
13. [ ] Privilege: `find /` as a normal user prints “Permission denied” on some dirs. Predict that. Do **not** sudo-find the whole disk for practice.
14. [ ] Wrong-usage: `find -name hosts` with no path (GNU find may default to `.`; some Unix errors). Predict for **your** find, then always give a path.
15. [ ] Combine: `find /home -user` your name vs `find . -user` your name in `/tmp`. Starting path limits the walk.
16. [ ] Predict: `-name hosts` does **not** match `Hosts` (case). Prove with a throwaway `Hosts` file unless your find is case-folded.
17. [ ] Recite `-maxdepth` after reading `man find`. Limit a walk to one level in a throwaway tree. Prove a nested file is skipped.
18. [ ] Wrong-usage: `-exec rm {}` without `\;` **and** without `-type f` on a dir named `core`. Stay in throwaway. Recite why `-type f` is on the cheat sheet.
19. [ ] Combine: quoted `*.log`, `-user` you, `-type f`, `-maxdepth` 2, in one throwaway tree. List matches; do not delete unless they are yours and throwaway.
20. [ ] Combined: exact `-name`; quoted glob; `-user`; `-type f`; `-exec … {} \;`; `-print0` for spaces; never `rm` outside the sandbox. **Warning:** `-exec rm` and `xargs rm` destroy data.

## `xargs`

1. [ ] Recite the cheat-sheet pipeline: `find` prints paths, `xargs` turns them into arguments to `rm`. Draw stdin → argv. Do not run `rm` yet.
2. [ ] In a throwaway dir, create two regular files named `core`. Recite `-print` (newline-separated). Pipe to `xargs` running **`echo`** so you see the batched argv.
3. [ ] Recite `/bin/rm` and a lone `-` meaning “end of options / files follow.” Run the delete form **only** in that throwaway dir. Prove both `core` files are gone.
4. [ ] Predict: a filename with a space and `-print` (newlines/spaces as split). Will `rm` see one file or two? Prove with `echo` as the xargs command, not `rm`.
5. [ ] Recite `-print0` on `find` paired with `-0` on `xargs`. Repeat the space-name proof with `echo`, then delete only throwaway matches with `rm`.
6. [ ] Combine: same two `core` files — first `-exec rm {} \;`, recreate, then `print | xargs rm`. Recite “same job.”
7. [ ] Privilege: do not `sudo xargs rm`. If `find /tmp` lists other users’ `core` files, you must **not** delete them. Restrict `-path` / throwaway prefix.
8. [ ] Wrong-usage: `find / -name core -print | xargs rm`. Recite why that is a disaster. Never run it.
9. [ ] Recite: GNU `xargs` may refuse to run with empty stdin. Empty the list on purpose (`find` no matches) and predict whether `rm` is invoked.
10. [ ] Combine: `-type f` so a directory named `core` is not passed to `rm`. Prove with a throwaway dir named `core`.
11. [ ] Predict: `xargs /bin/rm -` vs `xargs rm -f` — you are still deleting. Tick only after you used a sandbox.
12. [ ] Recite `-0` in one sentence (NUL delimiter). Pair it with `-print0` only; mixing `-print` with `-0` is wrong. Predict garbage, prove with `echo`.
13. [ ] Wrong-usage: `xargs rm {}` as if `xargs` used `{}` by default. Default appends args at the **end**. Recite `-I` only if you need a placeholder (this topic’s sheet uses default append / `-0`).
14. [ ] Combine: `find` `-name core` `-type f` `-print0` `|` `xargs -0 rm` from memory on sandbox files.
15. [ ] Privilege: Permission denied on `rm` of someone else’s file — expected. Do not escalate.
16. [ ] Predict `xargs` batching: many `core` files (create 20 empty ones) go to **few** `rm` invocations vs `-exec` once per file. Optional `echo` to count.
17. [ ] Recite the interview contrast: `-exec {} \;` vs `xargs` batches.
18. [ ] Wrong-usage: `find … | xargs` without a command — default `echo`. Harmless. Adding `rm` is the sharp edge.
19. [ ] Combine: space in the path + `-print0` + `-0` + `rm` in `/tmp/your-sandbox-only`.
20. [ ] Combined: batched `rm`; trailing `-`; `-print0`/`-0`; never `/`; **Warning:** this pipeline deletes.

## `man`

1. [ ] Recite: the rest of `find` tests live in the manual. Open the `find` page. Quit when you have seen the tests list (`q` in `less`-style man).
2. [ ] Find `-mtime` in that page. Recite in one sentence (age in days). Close the pager.
3. [ ] Find `-size` in that page. Recite (file size test). Close.
4. [ ] Find `-perm` in that page. Recite (permissions). Close.
5. [ ] Find `-maxdepth` in that page. Recite (how far to walk). Close.
6. [ ] Predict: `man find` vs `man 1 find` — same user-command section? Open section 1 explicitly.
7. [ ] Wrong-usage: `man -name` as if man were find. Predict. Then `man find`.
8. [ ] Combine: without the cheat sheet, name four tests (`-mtime` `-size` `-perm` `-maxdepth`) then confirm in `man find`.
9. [ ] Privilege: `man` needs no sudo. Prove it.
10. [ ] Recite how to search **inside** the man page (same as `less`: `/pattern`). Search for `print0`.
11. [ ] Predict: `man find` on a machine with no `find` page. Unlikely; if it fails, `man man` for how pages are found.
12. [ ] Wrong-usage: `man FIND` — case. Prove whether man is case-sensitive on your box.
13. [ ] Combine: `man find` then a tiny `find . -maxdepth 1` in the throwaway dir.
14. [ ] Recite: cheat sheet ellipsis means “more tests exist.” Interview: “don’t memorize every test, know `man find`.”
15. [ ] Privilege: you cannot `man` a command that has no page. `man updatedb` or `man locate` — open one of them too.
16. [ ] Predict `man 5 find` — probably no page / wrong section. Prove, then section 1.
17. [ ] Recite `q` to quit man. Open and quit three times (muscle memory).
18. [ ] Wrong-usage: leave man with Ctrl-C vs `q`. Prefer `q`.
19. [ ] Combine: `man find` → `-exec` syntax → go back to the throwaway `-exec` drill if needed.
20. [ ] Combined: four tests found in the page; `/` search; section 1; no sudo.

## `locate`

1. [ ] Recite: `locate` is a **fast name search via a database** (can be stale). Search `passwd`. Predict you will see path names, not file contents.
2. [ ] Predict: `locate passwd` vs `find / -name passwd` — which is faster? Time both if `/` find is acceptable, or compare to `find /etc -name passwd`.
3. [ ] Recite: results can be **stale**. Create a new file with a unique name in `/tmp`. Run `locate` on that unique name **before** updating the DB. Predict a miss.
4. [ ] Wrong-usage: `locate -name passwd` (find’s flag). Predict. Locate takes a pattern, not find’s tests.
5. [ ] Combine: `locate passwd` and pick one hit. `ls` that path. Does the file still exist? Stale DB would miss deletes too.
6. [ ] Privilege: `locate` as a user is fine. It may not see dirs you cannot read **at index time**. Recite “database,” not a live walk.
7. [ ] Predict: `locate PASSWD` vs `passwd` — case. Prove on your `locate` (often case-sensitive unless `-i`).
8. [ ] Recite: you **roughly know the name**. That is this tool’s job vs `find` criteria vs `grep` contents.
9. [ ] Wrong-usage: `locate /` expecting every file. Too many hits / useless. Use a distinctive substring.
10. [ ] Combine: `locate hosts` vs `find /etc -name hosts`. Live vs DB. Note extra hits from `locate`.
11. [ ] Predict: after `updatedb` (next section, if you can run it), the unique `/tmp` file appears. If you cannot `updatedb`, recite the dependency.
12. [ ] Recite `man locate` for pattern rules (`*` globs). Try `locate '*.log'` vs `locate .log` — predict extra matches.
13. [ ] Privilege: some systems have no `locate` until a package is installed. If missing, record that; do not pretend you ran it.
14. [ ] Wrong-usage: treat `locate` output as “safe to rm.” It is just names. Never xargs-rm locate output for practice.
15. [ ] Combine: three-tool table from memory — `find` walk, `locate` DB, `grep` inside files.
16. [ ] Predict a deleted file still showing in `locate` until the DB rebuilds. Delete a throwaway file you previously indexed **only if** you know it was indexed; otherwise recite the story.
17. [ ] Recite the interview line: “why is locate fast, and why can it be wrong?”
18. [ ] Wrong-usage: `locate -user`. That is `find`. Prove locate rejects or ignores it.
19. [ ] Combine: `locate passwd` | count lines (pager). Recite “many passwd strings exist.”
20. [ ] Combined: fast; stale; unique new file missed; not `find` syntax; never delete from locate output blindly.

## `updatedb`

1. [ ] Recite: `updatedb` rebuilds the **locate** database. Usually as **root**. Recite why a normal user might get permission denied.
2. [ ] Predict: without a rebuild, `locate` can miss new files. That is this command’s reason to exist.
3. [ ] Privilege: on a **lab VM**, run the rebuild with sudo if you are allowed. Time it. Then `locate` your unique `/tmp` name from the `locate` drills.
4. [ ] If you **cannot** run it (no sudo): still tick this item by reciting “usually as root” and predicting the denied error. Optional: run it unprivileged and record the error.
5. [ ] Wrong-usage: `updatedb /tmp` thinking it takes a start path like `find`. Check `man updatedb` — config files, not find syntax.
6. [ ] Combine: create unique file → `locate` miss → `updatedb` (lab) → `locate` hit. That is the proof chain.
7. [ ] Recite: cron often runs `updatedb` for you. Interview: “why did locate miss a file I created five minutes ago?”
8. [ ] Privilege warning: do not `updatedb` in a tight loop on a shared production box (IO load). Once on a lab VM is enough.
9. [ ] Predict: after rebuild, a **deleted** file disappears from `locate`. Prove only if you control the file and the DB.
10. [ ] Wrong-usage: `sudo locate` instead of `updatedb` to “refresh.” Recite which command writes the DB.
11. [ ] Combine: `man updatedb` — name the default DB path if the page lists it.
12. [ ] Recite: `locate` reads; `updatedb` writes. Two binaries, one index.
13. [ ] Privilege: `sudo updatedb` then `locate` as **yourself**. The DB is system-wide. Prove you do not need sudo to **query**.
14. [ ] Wrong-usage: `updatedb -name passwd`. Nonsense. Rebuild, then locate.
15. [ ] Predict a long run on a large disk. You may interrupt on a huge lab disk; still recite the job.
16. [ ] Combine: three-tool table again, with “stale until `updatedb`.”
17. [ ] Recite the cheat-sheet comment “usually as root” from memory.
18. [ ] Wrong-usage: `updatedb` as root in `/` with a broken config that indexes `/proc`. Do not change config for this course. Default once.
19. [ ] Combine: `locate passwd` before and after a rebuild — counts may change slightly. Record both if you ran it.
20. [ ] Combined: rebuild = locate DB; root/lab; then query as you; do not confuse with `find`.

## `grep`

1. [ ] Recite: `grep` searches **inside** files (lines matching a pattern). In a throwaway file, put `fun` on one line and `boring` on another. Search `fun`. Predict only one line of output.
2. [ ] Recite recursive `-r` under a tree. Put `fun` in a nested file. Search from the parent. Predict the path in the output.
3. [ ] Recite the cheat-sheet home recursive search for `"fun"`. Prefer `grep -r "fun"` on your **throwaway** dir, not all of `~`, unless you want a huge noisy dump.
4. [ ] Recite `-i` — ignore case. Put `Fun` in the file. Search `fun` without `-i` (miss) then with `-i` (hit).
5. [ ] Recite `-n` — show line numbers. Prove the number matches `nl` or your editor.
6. [ ] Recite `-r` again on a directory (`/etc` on the sheet). Prefer a small tree (`/etc` may need permission skips). Predict “Is a directory” without `-r` if you pass a dir on some grep versions.
7. [ ] Combine: `-r` + `-n` + `-i` on the throwaway tree for pattern `fun`. Recite each flag’s job.
8. [ ] Privilege: `grep -r` as you will skip unreadable files. Do not `sudo grep -r /etc` just to practice — too much data / secrets. Use `/tmp` + maybe one `/etc` filename you know is world-readable (`/etc/passwd` as a **file**, not a secret hunt).
9. [ ] Wrong-usage: `grep -name fun` (find’s flag). Predict. Then pattern + file.
10. [ ] Combine: `grep pattern file.txt` (one file, no recurse). Contrast `find -name` (names) vs `grep` (contents).
11. [ ] Predict: no matches → exit status non-zero. Prove with `echo $?` after a miss vs a hit.
12. [ ] Recite quoting `"fun"` — why quotes when the pattern is a simple word? Recite for patterns with spaces or `*`.
13. [ ] Wrong-usage: `grep -r fun ~` on a huge home (slow, privacy). Use a throwaway dir for drills 1–7; only recite the `~` example.
14. [ ] Combine: create `a.txt` / `b.txt`, only `b.txt` contains `pattern`. `grep pattern` both files. Which filenames print?
15. [ ] Recite `-n` on one file: line 3 of 5 is a match. Prove.
16. [ ] Privilege: grepping other users’ homes is not your homework. Stay in `/tmp`.
17. [ ] Predict binary files: `grep` on a binary may say “binary file matches.” Optional: grep a small binary; recite the message.
18. [ ] Wrong-usage: `grep -user`. That is `find`. Keep the three-tool table straight.
19. [ ] Combine: `find . -name '*.txt'` then grep those files — or `grep -r --include` if you know it; this sheet only needs `-r` / `-i` / `-n`.
20. [ ] Combined: one file; `-i`; `-n`; `-r` on a sandbox tree; contents not names; do not sudo-grep the OS.
