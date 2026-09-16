# Commands to memorize

```bash
ls -l                            # type, rwx for user/group/other, owner, group, size, name
chown user /home/myfolder        # set user (owner) of the path
chown user:group path            # set owner and group together
chown -R user path               # recursive
chgrp mytestgroup test.t         # set group owner
chgrp -R group path              # recursive

chmod g=rw test.t                # group exactly read+write (clears group x)
chmod 755 test.t                 # rwxr-xr-x  (7=rwx, 5=r-x, 5=r-x)
chmod o-r,g+w test.t             # take read from other, add write to group
chmod +x script.sh               # add execute for u/g/o that already make sense

chmod +t somedirectory           # sticky bit: in a shared dir, only delete your own files
chmod 1700 somedirectory         # leading 1 = sticky + 700
chmod -t somefile                # remove sticky
chmod 0700 somefile              # leading 0 = no SUID/SGID/sticky
chmod 4555 path_to_file          # leading 4 = SUID — run as file owner (binaries)
chmod 2555 path_to_folder        # leading 2 = SGID — run as group; dirs: new files inherit group
chmod 1777 /tmp                  # sticky + world rwx (typical /tmp)

lsattr                           # list ext attributes in current directory
lsattr /directory/or/file        # attributes of that path
lsattr -R                        # recursive
lsattr -d dir                    # directory itself, not its contents
chattr +i /sbin/lilo.conf        # immutable — no edit/delete until unlocked
chattr -i /sbin/lilo.conf        # unlock before you edit
chattr +A file                   # do not update atime on access
chattr +a file                   # append-only (dirs: add files, no rename/delete)
chattr +s file                   # on delete, zero the blocks (if the FS honors it)
```
