# Tasks — Remote access

Close `theory.md`. Checkpoint before daemon config. Keep a console.

## Keys

1. Create an RSA key pair. Set private key mode so it is not group/world readable. Same mode on the client config file if you create one.
2. Log in with an explicit identity file. Log in specifying user and port. Verbose once — read auth lines.
3. Force a tty for a remote sudo that needs one.

## Remote commands (predict quoting)

4. Run one command remotely.
5. Run `whoami`, `pwd`, `ls` — first without quoting the remote script, then with quoting so **all** run remotely. Predict the difference.
6. Feed a local script into the remote shell.

## Copy

7. Local file to remote path. Remote file here. Remote-to-remote via you if you have two hosts.
8. Interactive file transfer over SSH: list, put, get, quit.

## Config / bastion / forward

9. Host alias in the client config (user, port, identity). Connect using only the alias.
10. Jump through a bastion using the notes’ proxy pattern (`%h:%p`).
11. Local forward: no remote command, local 8080 to remote localhost:80, while something listens on 80. Then stop.

## Server

12. Read the daemon config. What Match User + ForceCommand + ChrootDirectory is for (SFTP jail). Restart the daemon only after a checkpoint and a second session if you change it.

## Scenario

13. Key login works, then password SSH must be off. Prove both. Console remains.
14. Old laptop key compromised: new key works, old pubkey gone from authorized keys.
