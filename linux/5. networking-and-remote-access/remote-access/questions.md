# Remote access — Questions

Cover the Answers section. Answer first, then check.

1. Telnet vs SSH. Why is Telnet wrong on a real network?
2. What are WinSCP, X-System, and VNC each for?
3. Command to generate an RSA key. Default paths for private and public keys. May the passphrase be empty?
4. What must you **never** distribute? Why `chmod 600` on the private key?
5. Recite: `-i`, `-l`, `-p`, `-t`, `-v`, `-N`.
6. How do you enable passwordless login with a key you already generated?
7. Why is `ssh user@host sudo ls /root` likely to fail, and how do you fix it?
8. `ssh host whoami; pwd` vs `ssh host 'whoami; pwd'` — who runs `pwd` if you forget quotes? (Think carefully; the notes show unquoted multiples.)
9. How do you run a **local** `script.sh` on the remote machine?
10. Three `scp` directions: local→remote, remote→local, remote→remote.
11. What is a bastion? What does `ProxyCommand ssh -W %h:%p …` do?
12. Why `~/.ssh/config`? How do you create it safely? `ssh targaryen` equals which long command in the notes?
13. SFTP vs FTP. What do `ForceCommand internal-sftp` and `ChrootDirectory` do? What after editing `sshd_config`?
14. Root SSH by default? Where do you change it?

---

## Answers

1. Telnet is cleartext; SSH is encrypted. Passwords and the whole session can be sniffed on Telnet.
2. WinSCP: GUI copy over SSH. X: network-transparent GUI (app remote, display local). VNC: remote desktop.
3. `ssh-keygen -t rsa`. `~/.ssh/id_rsa` and `id_rsa.pub`. Yes, empty is allowed.
4. The private key (`id_rsa`). ssh refuses a key that other accounts can read.
5. Identity file · remote user · port · force tty · verbose · no remote command (forwarding only).
6. Append `id_rsa.pub` to remote `~/.ssh/authorized_keys`.
7. sudo wants an interactive tty. `ssh -t … sudo …`
8. Without quotes, the local shell may run `pwd`/`ls` locally after ssh returns from `whoami`. Safer: quote the remote command string. The course example is unquoted — know the pitfall.
9. `ssh user@host < script.sh`
10. `scp file user@host:/dir` · `scp user@host:/path .` · `scp user@A:/f user@B:/dir`
11. Jump host in a public subnet to reach private instances. First ssh to the jump box, then tunnel (`-W`) to target host:port.
12. Remember hosts/users/ports/keys. `touch ~/.ssh/config && chmod 600 ~/.ssh/config`. `ssh -i ~/.ssh/targaryen.key -p 7654 daenerys@192.168.1.10`
13. SFTP is SSH file transfer; FTP is typically plaintext. SFTP-only, no shell · jail to that directory. `systemctl restart sshd`
14. Forbidden. `/etc/ssh/sshd_config` then restart sshd. Prefer sudo.
