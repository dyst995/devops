# Commands to memorize

```bash
find / -name hosts                       # walk from / for basename exactly hosts
find /home -user user                    # files under /home owned by user
find . -name '*.log'                     # quote globs so the shell does not expand them
find /tmp -name core -type f -exec rm {} \;           # regular files named core; rm each match
find /tmp -name core -type f -print | xargs /bin/rm - # same job, xargs batches args to rm
find /tmp -name core -type f -print0 | xargs -0 rm    # null-separated — safe if names have spaces
man find                                 # all tests: -mtime, -size, -perm, -maxdepth, …

locate passwd                            # fast name search via database (can be stale)
updatedb                                 # rebuild locate DB (usually as root)

grep -r "fun" ~                          # lines containing fun, recursively under home
grep pattern file.txt                    # matching lines in one file
grep -i pattern file.txt                 # ignore case
grep -n pattern file.txt                 # show line numbers
grep -r pattern /etc                     # recurse a tree
```
