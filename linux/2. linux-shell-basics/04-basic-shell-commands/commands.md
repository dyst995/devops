# Commands to memorize

```bash
man cat                      # full manual for cat
man man                      # how man itself works
man -k list                  # keyword search in descriptions (apropos)
man -f ls                    # one-line whatis for ls
man 5 passwd                 # section 5 = file format (not the passwd command)
man 1 ls                     # section 1 = user command
info cat                     # GNU info page
info info

ls -la                       # long listing + hidden (dot) files
ls -lh                       # long + human sizes (K/M/G)
ls -lt                       # long + newest modification first
ls -lSh                      # long + largest first + human sizes
pwd                          # full path of current directory
cd /                         # filesystem root
cd ..                        # parent directory
cd ~                         # your home ($HOME)
cd -                         # previous directory (prints it)

touch newfile.txt                      # create empty file, or update timestamp
touch -d "next Friday" newfile.txt     # set timestamp from a date string
mkdir empty                            # one directory; fails if parents missing
mkdir -p dir/test{1..3}/empty          # parents as needed; brace expansion test1..3
mkdir -m MODE dir                      # create with given permissions

cp -r dir dir2/              # copy directory tree
cp -rp src dest              # recursive + keep mode/owner/timestamps
mv -b -S ".old" newfile dir/ # move; backup overwritten dest as name.old
mv -u src dest               # move only if source is newer or dest missing
cat 1.txt 2.txt > 3.txt      # concatenate files into 3.txt
rmdir empty                  # remove empty directory only
rm -v ~/1.txt                # delete file, verbose
rm -rfv dir/                 # recursive + force (no prompt) + verbose — dangerous
shred file                   # overwrite so recovery is harder

printenv                     # all environment (exported) variables
printenv PATH                # one env var
env                          # same dump; or run a command in a custom env
env VAR=tmp ./myscript       # run script with VAR set; your shell unchanged
export EDITOR=vim            # make a variable visible to child processes
unset EDITOR                 # delete shell and environment variable
set | less                   # everything: env + shell vars + functions

more file                    # page forward only
less /var/log/syslog         # page both ways; /pattern search, q quit
head /etc/passwd             # first 10 lines
head -n 5 /etc/passwd        # first 5 lines
head -n -2 file.txt          # all but the last 2 lines
tail /var/log/syslog         # last 10 lines
tail -n 50 /var/log/syslog   # last 50 lines
tail -n +20 file.txt         # from line 20 to end
tail -f /var/log/syslog      # follow file as it grows (logs); Ctrl-C to stop
```
