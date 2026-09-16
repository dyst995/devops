# Labs — Remote access

**Where:** Windows OpenSSH or VM B as client; Rocky `rocky9-a` as server. Checkpoint on A before editing `sshd_config`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

On the client: `ssh-keygen -t rsa`. Set private key mode `600`. Copy the public key to A (`ssh-copy-id` or manual `authorized_keys`). Log in with `ssh` and with `ssh -i`. Log in with `-l` and `-p`. Use `ssh -v` once and read the auth lines.

## Lab 2

Run a single remote command with `ssh user@host whoami`. Try `ssh user@host whoami; pwd; ls` and then the same with the remote script quoted. Pipe a local script into `ssh user@host`. Use `ssh -t` for a `sudo` command that needs a tty.

## Lab 3

`scp` a file to the server, back again, and (if you have two remotes) remote-to-remote. Open `sftp` and `put`/`get`/`ls`/`bye`.

## Lab 4

Create `~/.ssh/config` mode `600` with a `Host` alias (user, port, `IdentityFile`). Connect using only the alias.

## Lab 5

If you have a jump host (VM B or EPAM bastion): connect to A with `ProxyCommand` as in the notes.

## Lab 6

Optional port forward: `ssh -N -L 8080:localhost:80` to A while `httpd` listens on A, then open `http://127.0.0.1:8080` on the client. Stop the SSH process when done.

## Lab 7

On A, **read** `/etc/ssh/sshd_config`. Do not enable an SFTP chroot until you have a checkpoint and a second session. If you do the Match User / `internal-sftp` / `ChrootDirectory` lab from the notes, keep a root console open, then `systemctl restart sshd`, test, and revert.

## Job and cert labs

## Lab 8 — harden sshd (console + checkpoint)

`PasswordAuthentication no` after keys work. `PermitRootLogin no` (or `prohibit-password`). Restart `sshd`, confirm key login still works, confirm password login fails. Revert if this is shared lab.

## Lab 9

`ProxyJump` (or `ProxyCommand`) via B to A. Add `JumpHost` in `~/.ssh/config`. This is the bastion pattern at work.

## Lab 10

`scp -r` a directory. `rsync -av -e ssh` the same tree (install rsync if needed). Compare.

## Lab 11

Rotate keys: generate a new key, install the new pubkey, log in with it, remove the old line from `authorized_keys`. Ticket: “compromised laptop.”

## Lab 12

`ssh-add` / agent if you use one. `IdentitiesOnly yes` in config so the wrong key is not offered first (`-v` to see).
