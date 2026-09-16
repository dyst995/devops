# Commands to memorize

```bash
ssh-keygen -t rsa                      # create ~/.ssh/id_rsa (private) and id_rsa.pub (public)
chmod 600 ~/.ssh/id_rsa                # private key must not be group/world readable
chmod 600 ~/.ssh/config                # same for the SSH config file

ssh -i ~/.ssh/lab.pem centos@ecsc00a058b0.epam.com     # login with that private key
ssh -l centos -p 22 host               # -l user, -p port (default 22)
ssh -v user@host                       # verbose — debug auth/connection
ssh -N -L 8080:localhost:80 user@host  # no remote command; useful for port forwarding only
ssh -t centos@host sudo ls /root       # force tty so sudo/menus work

ssh centos@host whoami                 # run one command remotely
ssh centos@host whoami; pwd; ls        # careful: quote the remote script if all should run remotely
ssh centos@host < script.sh            # feed a local script to the remote shell

scp examplefile centos@host:/folder                              # local file → remote path
scp centos@host:/home/yourusername/examplefile .                 # remote → here
scp centos@hostA:/examplefile root@hostB:/home/user/             # remote → remote via you

ssh -i ~/.ssh/lab.pem \
  -o "ProxyCommand ssh -W %h:%p -i key_for_jumpbox.pem jumpbox_user@jump.box.host" \
  centos@ecsc00a058b0.epam.com
# jump through bastion (%h:%p = target host:port)

touch ~/.ssh/config && chmod 600 ~/.ssh/config
ssh targaryen                          # uses Host stanza (user, port, IdentityFile)

sftp access@192.168.0.14               # interactive secure file transfer over SSH

# sshd_config (then restart): Match User + ForceCommand internal-sftp + ChrootDirectory
systemctl restart sshd                 # apply /etc/ssh/sshd_config (root login, SFTP jail, …)
```
