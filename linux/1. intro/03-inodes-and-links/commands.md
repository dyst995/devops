# Commands to memorize

```bash
ln original.txt another-name.txt              # hard link: extra name for the same inode
ln -s /var/www/html/current /srv/app          # symlink: pointer to a path (can dangle)
ls -li                                        # first column = inode number (same number = hard link)
```
