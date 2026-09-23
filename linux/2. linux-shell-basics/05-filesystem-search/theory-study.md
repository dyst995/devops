# 05 — Filesystem search (study)

Three jobs, three tools:

| You need | Tool | Looks at |
| --- | --- | --- |
| Files that **match criteria** (name, owner, type, …) | `find` | The **live** directory tree |
| Files whose **name** you roughly know, **fast** | `locate` | A **database** (can be stale) |
| **Lines inside** files that match a pattern | `grep` | File **contents** |

## find

Looks for files and directories that match criteria. You almost always care about **path** (where to start) and **expression** (what to match / what to do).

```text
find [-H] [-L] [-P] [-D debugopts] [-Olevel] [path...] [expression]
```

```bash
find / -name hosts          # basename exactly hosts, start at /
find /home -user user       # owned by user, under /home
```

`-name` matches the **basename**, not the whole path (`hosts` matches `/etc/hosts`, not `hosting`). Quote globs so the shell does not expand them: `find . -name '*.log'`.

`-user` = owner. `-type f` = regular file, `-type d` = directory. More tests (`-mtime`, `-size`, `-perm`, `-maxdepth`, …): `man find`.

Start narrow (`/home`, `/var/log`) — `find /` walks the whole machine.

These two are presented as **equal** (delete every regular file named `core` under `/tmp`):

```bash
find /tmp -name core -type f -exec rm {} \;
find /tmp -name core -type f -print | xargs /bin/rm -
```

| Form | Idea |
| --- | --- |
| `-exec rm {} \;` | For **each** match, run `rm` with that path as `{}`. `\;` ends `-exec` |
| `-print \| xargs rm` | Print paths; `xargs` batches them (fewer process starts). See [xargs](../06-xargs/theory.md) |

## locate

Finds by **name** using its own database — not a live walk. Default DB: `/var/lib/mlocate/mlocate.db`.

**Results can be stale.** A file you just created may not show until **`updatedb`** (usually as root). Fast because it does not crawl the disk; wrong until the DB is rebuilt. New file missing? `updatedb` then `locate`, or use `find`.

## grep

Prints **lines** that match a pattern (can be a **regular expression**). Highly customizable; `man grep`.

```bash
grep -r "fun" ~              # recursive under home
grep pattern file.txt
grep -i pattern file.txt     # ignore case
grep -n pattern file.txt     # line numbers
grep -r pattern /etc         # whole tree
```

`find`/`locate` = *which files*. `grep` = *which lines*. Combine later: `find … | xargs grep` or `grep -r`.
