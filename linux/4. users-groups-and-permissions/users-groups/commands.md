# Commands to memorize

```bash
cat /etc/passwd                  # users: name:x:UID:GID:comment:home:shell
cat /etc/group                   # groups: name:x:GID:user,user
cat /etc/shadow                  # password hashes and expiry (root only)

id                               # UID, primary GID, all groups
id -u                            # numeric UID
id -g                            # primary GID
id -G                            # all GIDs
groups                           # group names of the current user
groups alice                     # groups of alice
chage -l user                    # password aging / account expiry

su - user                        # switch user, login env (home + profile); needs their password
su user                          # switch user, keep more of your environment
su                               # to root (asks for root password)
su root
sudo ifconfig                    # run one command as root; asks for YOUR password
sudo su                          # root shell without knowing root’s password (if sudoers allows)

useradd -d /home/mydir -s /bin/bash user1   # create user with home and shell
userdel user                     # delete account, leave home
userdel -r tester                # delete account AND home/files
usermod -d /home/newhome user    # change home path
usermod -l newname oldname       # rename login (UID/files unchanged)
usermod -s /bin/bash user        # change login shell
usermod -e YYYY-MM-DD user       # account expiration date
usermod -aG docker nika          # append extra group (-a); -G alone replaces extras
passwd                           # change password (yours, or passwd user as root)
passwd otheruser
finger user                      # login name, home, shell

groupadd mytestgroup             # create group
groupdel mytestgroup             # delete group
groupmod -n newname oldname      # rename group (GID unchanged)
gpasswd -a user group            # add user as supplementary member
```
