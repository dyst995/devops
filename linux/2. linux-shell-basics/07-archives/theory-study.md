# 07 — Archives (study)

| Tool | Job |
| --- | --- |
| `zip` / `unzip` | Package **and** compress in one ZIP (common with Windows / Java) |
| `tar` | Bundle **many files into one archive** (originally tape). Compression optional (`z` = gzip) |
| `gzip` / `gunzip` / `zcat` | Compress or expand a **single stream/file**. `zgrep` searches inside gzip data |

`tar` = glue files. `gzip` = squeeze one stream. `tar.gz` = glue then squeeze. `zip` = glue + squeeze in one format.

## zip / unzip

```bash
zip -rp archive.zip /path/to/
unzip archive.zip              # extract into the current directory
```

| Flag (zip) | Meaning |
| --- | --- |
| `-r` | Recursive (directories) |
| `-p` | Store relative paths as given (course uses `-rp` for a folder) |

More flags: `man zip`, `man unzip`.

## tar

Saves many files into one tape or disk archive; can restore individual files. `-f` **must** be last among the classic cluster because the filename follows it.

| Flag | Meaning |
| --- | --- |
| `-c` | **c**reate |
| `-x` | e**x**tract |
| `-t` | lis**t** |
| `-v` | **v**erbose |
| `-f` | **f**ile (next arg is the archive name, or `-` for stdin/stdout) |
| `-z` | filter through **gzip** (`.tar.gz` / `.tgz`) |

```bash
tar -cvf archive.tar path/to/
tar -xvf archive.tar
tar -tf archive.tar
tar -cvzf archive.tar.gz path/to/
```

`-` as the archive name means **stdout** (create) or **stdin** (extract) — copy trees without an intermediate `.tar`:

```bash
tar cf - dir1 | (cd dir2 && tar xf -)

ssh root@host1 "cd /somedir/tocopy/ && tar -cf - ." \
  | ssh root@host2 "cd /samedir/tocopyto/ && tar -xf -"
```

Host1 packs `.` to stdout → your SSH client → host2 unpacks. More options: `man tar`.

## gzip / zcat / zgrep

**`gzip`**, **`gunzip`**, **`zcat`** compress or expand. **`zgrep`** is grep for `.gz` files.

`-c` writes to **stdout** and leaves the original file alone. Default `gzip file` **replaces** `file` with `file.gz`. Use `-c` or `-k` to keep the original.

```bash
gzip -c file1 > foo.gz
gzip -c file2 >> foo.gz          # second gzip member — works, worse ratio
cat file1 file2 | gzip > foo.gz  # one gzip of both — usually smaller
```

`zcat foo.gz` and `gunzip -c foo.gz` print the uncompressed content (here, `file1` then `file2`).
