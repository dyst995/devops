# Commands to memorize

```bash
zip -rp archive.zip /path/to/            # pack folder into a ZIP (recursive)
unzip archive.zip                        # extract into the current directory

tar -cvf archive.tar path/to/            # create archive (c) verbose (v) file (f)
tar -xvf archive.tar                     # extract
tar -tf archive.tar                      # list contents
tar -cvzf archive.tar.gz path/to/        # create gzip-compressed .tar.gz (z)

tar cf - dir1 | (cd dir2 && tar xf -)    # copy tree via stdout/stdin; no .tar on disk
ssh root@host1 "cd /somedir/tocopy/ && tar -cf - ." | ssh root@host2 "cd /samedir/tocopyto/ && tar -xf -"
# pack on host1 → through your machine → unpack on host2

gzip -c file1 > foo.gz                   # compress to stdout; keep original file1
gzip -c file2 >> foo.gz                  # append another gzip member (works, worse ratio)
cat file1 file2 | gzip > foo.gz          # one gzip of both files — better compression
zcat foo.gz                              # print decompressed content
gunzip -c foo.gz                         # same as zcat
zgrep pattern foo.gz                     # grep inside gzip data
```
