# 07 — Archives: zip, tar, gzip

Three layers you will mix constantly:

| Tool | Job |
| --- | --- |
| `zip` / `unzip` | Package **and** compress in one ZIP file (common with Windows / Java) |
| `tar` | Bundle **many files into one archive** (originally tape). Compression is optional (`z` = gzip). |
| `gzip` / `gunzip` / `zcat` | Compress or expand a **single stream/file**. `zgrep` searches inside gzip data. |

**Memory hook:** `tar` = tape archive (glue files). `gzip` = squeeze one stream. `tar.gz` = glue then squeeze. `zip` = glue + squeeze in one format.

## zip / unzip

**`zip`** — package and compress (archive) files.

**`unzip`** — list, test, and extract files from a ZIP archive.

```bash
zip -rp archive.zip /path/to/
# compress folder into .zip

unzip archive.zip
# extract into the current directory
```

| Flag (zip) | Meaning |
| --- | --- |
| `-r` | Recursive (directories) |
| `-p` | Store relative paths as given (course example uses `-rp` for a folder) |

More flags: `man zip` and `man unzip`.

**Memory hook:** `zip -r out.zip dir/` to pack. `unzip out.zip` to unpack **here**.

## tar

**`tar`** saves many files into a single tape or disk archive, and can restore individual files from it.

Classic flag cluster (order is a habit; `-f` **must** be last among these because the filename follows it):

| Flag | Meaning |
| --- | --- |
| `-c` | **c**reate archive |
| `-x` | e**x**tract |
| `-t` | lis**t** contents |
| `-v` | **v**erbose (print names) |
| `-f` | **f**ile (next argument is the archive name, or `-` for stdin/stdout) |
| `-z` | filter through **g**zip (`.tar.gz` / `.tgz`) |

```bash
tar -cvf archive.tar path/to/       # create
tar -xvf archive.tar                # extract
tar -tf archive.tar                 # list
tar -cvzf archive.tar.gz path/to/   # create gzip-compressed
```

**Memory hook:** **c**reate, e**x**tract, lis**t**. Always **f**ile. Add **z** for gzip. `cvf` / `xvf` / `tf` / `cvzf`.

### tar as a copy pipe

`-` as the archive name means **stdout** (create) or **stdin** (extract). That lets you copy trees without an intermediate `.tar` file.

Move a directory structure locally:

```bash
tar cf - dir1 | (cd dir2 && tar xf -)
```

Copy `dir1`’s contents into `dir2` through a tar stream.

Copy from **host1** to **host2**, piped through **your** machine:

```bash
ssh root@host1 "cd /somedir/tocopy/ && tar -cf - ." \
  | ssh root@host2 "cd /samedir/tocopyto/ && tar -xf -"
```

Host1 packs `.` to stdout → your SSH client → host2 unpacks from stdin.

**Memory hook:** `tar cf -` = send the tree down the pipe. `tar xf -` = receive it. No `.tar` left on disk.

More options: `man tar`.

## gzip, gunzip, zcat, zgrep

**`gzip`**, **`gunzip`**, **`zcat`** — compress or expand files.

**`zgrep`** — search in gzip archives (grep for `.gz` files).

```bash
gzip -c file1 > foo.gz          # compress file1 into foo.gz
gzip -c file2 >> foo.gz         # append another gzip member (file2)
cat file1 file2 | gzip > foo.gz # better compression than the two-step append
```

`-c` = write to **stdout** (leave the original file alone). `>>` concatenates **gzip members**; it works, but compressing both files in **one** gzip run usually shrinks better.

These three print the uncompressed content of `foo.gz` (here, `file1` then `file2`):

```text
zcat foo.gz
gunzip -c foo.gz
# equivalent result: cat file1 file2
```

**Memory hook:** `gzip -c` = squeeze to stdout. `zcat` = `gunzip -c` = peek without leaving a decompressed file. One `gzip` over concatenated input beats `gzip >>` twice.

Default `gzip file` **replaces** `file` with `file.gz`. Use `-c` or `-k` when you must keep the original.
