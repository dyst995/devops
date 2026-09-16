# 05 — Filesystem Search

Three different jobs, three tools:

| You need | Tool | Looks at |
| --- | --- | --- |
| Files that **match criteria** (name, owner, type, …) | `find` | The **live** directory tree |
| Files whose **name** you roughly know, fast | `locate` | A **database** (can be stale) |
| **Lines inside** files that match a pattern | `grep` | File **contents** |

**Memory hook:** `find` = walk the tree. `locate` = phone book of names (update it). `grep` = search **inside** files.

## find

**`find`** looks for files and directories that match given criteria.

```text
find [-H] [-L] [-P] [-D debugopts] [-Olevel] [path...] [expression]
```

You almost always care about **path** (where to start) and **expression** (what to match / what to do).

```bash
find / -name hosts          # name is exactly hosts, start at /
find /home -user user       # owned by user user, under /home
```

`-name` matches the **basename** (not the whole path). `hosts` matches `/etc/hosts`, not `hosting`. Globs must be quoted so the shell does not expand them: `find . -name '*.log'`.

`-user` matches owner. `-type f` = regular file, `-type d` = directory.

These two are presented as **equal** (delete every regular file named `core` under `/tmp`):

```bash
find /tmp -name core -type f -exec rm {} \;
find /tmp -name core -type f -print | xargs /bin/rm -
```

| Form | Idea |
| --- | --- |
| `-exec rm {} \;` | For **each** match, run `rm` with that path substituted for `{}`. `\;` ends the `-exec`. |
| `-print \| xargs rm` | Print paths, then `xargs` batches them as arguments to `rm` (fewer process starts). See [06 — xargs](../06-xargs/theory.md). |

`find` has many more tests (`-mtime`, `-size`, `-perm`, `-maxdepth`, …). Learn them with `man find`.

**Memory hook:** `find PATH TESTS ACTIONS`. Start narrow (`/home`, `/var/log`) — `find /` walks the whole machine.

## locate

**`locate`** finds files and directories by **name**, using its own database — not a live walk.

```text
$ locate passwd
/etc/passwd
```

The default database is:

`/var/lib/mlocate/mlocate.db`

**Results can be stale.** A file you just created may not show up until the database is rebuilt. Run **`updatedb`** (usually as root) before `locate` when you need current names.

**Memory hook:** `locate` is fast because it does not crawl the disk. Fast + possibly wrong until `updatedb`. New file missing? `updatedb` then `locate`, or use `find`.

## grep

**`grep`** prints **lines** that match a pattern.

Example: files under `HOME` that contain the word `fun` (recursive):

```text
$ grep -r "fun" ~
/home/vagrant/.bash_profile:# Get the aliases and functions
/home/vagrant/.bashrc:# User specific aliases and functions
```

`-r` = recursive (descend directories). Pattern can be a **regular expression**. `grep` is highly customizable; `man grep` is worth it.

Useful companions you will type constantly:

```bash
grep pattern file.txt
grep -i pattern file.txt     # ignore case
grep -n pattern file.txt     # line numbers
grep -r pattern /etc         # whole tree
```

**Memory hook:** `find`/`locate` = *which files*. `grep` = *which lines*. Combine later: `find … | xargs grep` or `grep -r`.
