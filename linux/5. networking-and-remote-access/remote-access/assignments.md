# Assignments — Remote access (SSH)

Close `commands.md`. Type and run. Do not overwrite `~/.ssh/id_rsa` if you already have keys you need — use a **new** key file name for practice. `chmod 600` private keys. Do not `chmod 777` `.ssh`. Jump/ProxyCommand only with hosts you own. `systemctl restart sshd` can drop your session — **console** or a second session. Never commit private keys.

## Keys (`ssh-keygen`, `chmod`)

### Easy

1. [ ] `ls -la ~/.ssh` if it exists. If you already have `id_rsa`, **do not** overwrite it — generate a key with a **different** path (`ssh-keygen` and answer a new file name).
2. [ ] `chmod 600` that private key and `chmod 600 ~/.ssh/config` if the config file exists (create with `touch` + `chmod` if you are about to use config).

### Medium

3. [ ] `ls -l` the private vs `.pub` file. Which one is 600? Never copy the private key to a chat.
4. [ ] Someone ran `chmod 644` on the private key. SSH will refuse it. Set `600` again and retry `ssh -i` in the next set.

### Hard

5. [ ] `ssh-keygen -t rsa` into a practice path. `head -n 1` the `.pub` file (starts with `ssh-rsa`). Combine `lsattr` only if you want; do not `chattr +i` the key unless you remember `-i`.
6. [ ] Broken: `ssh-keygen` smashed `id_rsa` — if you did that for real, you have a problem. For practice, always pick a new filename. `ls ~/.ssh`.

## `ssh` (identity, user, port, verbose, one command)

### Easy

1. [ ] `ssh -l` USER `-p` 22 to a **lab** host, or `ssh user@host` if you have one. If you have no host, `ssh -V` / `man ssh` and skip live login.
2. [ ] `ssh -i` the practice key to the lab (if that key is authorized). `exit`.

### Medium

3. [ ] `ssh -v` user@host and read where auth fails or succeeds. `exit`.
4. [ ] `ssh user@host whoami` (remote one command). Then the course pitfall: `ssh user@host whoami; pwd` — which of `pwd` ran **locally**? Fix by quoting the remote command string.

### Hard

5. [ ] `ssh -t` user@host `sudo id` (or `sudo ls /root`) so sudo gets a tty. Then without `-t` if you want to see the difference.
6. [ ] `ssh user@host <` a **local** tiny `script.sh` (`echo`/`hostname`). Combine `chmod +x` locally only. Do not pipe a destructive script.

## Port forward, copy, SFTP (`-L`, `scp`, `sftp`)

### Easy

1. [ ] `scp` a small file to the lab `user@host:` path, then `scp` it back to `.`.
2. [ ] `sftp` to the lab, `ls`, `get`/`put` a tiny file, `exit` (or `quit`).

### Medium

3. [ ] `scp` remoteA to remoteB **only** if you have two hosts. Otherwise `scp` local → remote → local again.
4. [ ] `ssh -N -L 8080:localhost:80 user@host` **only** if something listens on 80 on the remote **and** you will Ctrl-C. Do not background and forget.

### Hard

5. [ ] Quoted remote `tar` is later; here: `ssh host 'ls /tmp'` vs unquoted. Then `scp` + `ls -l` both sides (ssh `ls`).
6. [ ] Broken: `scp file host:folder` when `folder` is missing. `ssh` `mkdir -p` then `scp`. Do not `scp` `/etc/shadow`.

## Config, jump host, `sshd`

### Easy

1. [ ] `touch ~/.ssh/config && chmod 600 ~/.ssh/config`. Add a `Host` stanza **only** for your lab (Host, HostName, User, IdentityFile, Port). `ssh` the short alias.
2. [ ] `ls -l ~/.ssh/config` is 600?

### Medium

3. [ ] Jump/ProxyCommand form from the course **only** if you have a bastion. Otherwise write the stanza in config as comments and `ssh -v` a direct host.
4. [ ] `sudo` `grep` a setting in `/etc/ssh/sshd_config` **read-only** (`PermitRootLogin`, `Port`). Do not change yet.

### Hard

5. [ ] Lab console: change a **practice** `sshd_config` value the lab specifies, `systemctl restart sshd`, reconnect from a **second** terminal **before** you close the first. Revert.
6. [ ] Broken: `ssh targaryen` with no config stanza. Add `Host`, `chmod 600`, retry. Combine `netstat -nlpt` to see sshd on 22. Do not `disable` sshd.
