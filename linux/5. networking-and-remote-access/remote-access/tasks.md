# Tasks — Remote access

Close `theory.md`. Checkpoint before daemon config. Keep a **console**. Prefer practice keys under `/tmp` or a dedicated `~/.ssh` practice name so you do not overwrite your only login key. Do **not** restart `sshd` without a console warning and a second session. Do the action or write the answer, then check yourself.

## Warm-up (protocols and programs)

1. Telnet vs SSH: which is encrypted? Why is Telnet “postcard” and SSH “sealed envelope”?
2. Name the three needs for remote access from the notes (protocol, program, optionally file copy / graphics).
3. What is WinSCP for (platform + job)? How does that differ from an interactive `ssh` shell?
4. X Window System vs VNC: one GUI program over the network vs whole desktop — which is which? When might you tunnel X through SSH?

## Keys (ssh-keygen)

5. Create an RSA key pair with `ssh-keygen -t rsa`. Prefer a **practice path** (`/tmp/lab_rsa` or `~/.ssh/id_rsa_practice`) — do not clobber your only production `id_rsa` without a backup.
6. Confirm private + public files (`…` and `….pub`). What must never leave your control?
7. Set private key mode so it is not group/world readable (`chmod 600`). Predict: what does OpenSSH do if the private key is world-readable?
8. Same mode on the client config file if you create one (`chmod 600 ~/.ssh/config`). Why does that matter?
9. Empty passphrase vs non-empty: convenience vs laptop-theft risk — one sentence each from the notes. What is the fingerprint for?

## SSH flags and login

10. Log in with an explicit identity file (`ssh -i … user@host`). Use a lab host you own.
11. Log in specifying user and port (`-l` and `-p`, or `user@host` + `-p`). Default port is what?
12. Verbose once (`-v`) — read auth lines. What are you debugging?
13. Force a tty for a remote sudo that needs one (`ssh -t … sudo …`). Predict the failure without `-t`.

## Remote commands (predict quoting)

14. Run one command remotely (`ssh user@host whoami`).
15. Run `whoami`, `pwd`, `ls` — first **without** quoting the remote script, then **with** quoting so **all** run remotely. Predict the difference (local shell sees `;`).
16. Feed a local script into the remote shell (`ssh user@host < script.sh`). Keep the script in `/tmp`.

## Copy (scp / sftp)

17. Local file → remote path with `scp`. Remote file → here (`.`). Note: scp port flag is **`-P`** (capital), unlike ssh’s `-p`.
18. Remote-to-remote via you if you have two hosts; otherwise write the command pattern from the notes.
19. Interactive file transfer over SSH: `sftp` — list, put, get, quit. FTP vs SFTP in one sentence (cleartext vs encrypted / same port 22 idea).

## Client config / bastion / forward

20. Host alias in `~/.ssh/config` (`Host`, `HostName`, `User`, `Port`, `IdentityFile`). `touch` + `chmod 600`. Connect using **only** the alias.
21. Jump through a bastion using the notes’ proxy pattern (`ProxyCommand` + `ssh -W %h:%p`). Two keys, two users — write who uses which key. Lab only.
22. Local forward: no remote command (`-N`), local **8080** to remote `localhost:80`, while something listens on 80. Then stop. Do not leave tunnels hanging.

## Server (sshd_config) — read first

23. Read the daemon config (`/etc/ssh/sshd_config`). From the notes: what are `Match User` + `ForceCommand internal-sftp` + `ChrootDirectory` for (SFTP jail)? List the “no” directives that stop tunnel/agent/X abuse.
24. Root login: SSH as root is forbidden by default — what must change, and what must you restart? Prefer normal user + `sudo`.
25. Restart the daemon (`systemctl restart sshd`) **only** after a checkpoint, a **console**, and a second session if you change config. If you are not changing anything, write the restart command and the lockout risk — do not restart blindly.

## Scenario

26. Key login works, then password SSH must be off. Prove key works; prove password fails. Console remains open. Revert only if the lab says so.
27. Old laptop key compromised: new key works, old pubkey gone from `authorized_keys`. Append — do not wipe other keys by mistake. Prove old key fails.
28. Ticket: “need files only, no shell” for user `access`. Sketch the `Match User` block from the notes, the chroot path idea, and the safe apply order (edit → test config if available → restart with console). Do not lock out your admin account.
