# Assignments — remote access

Close `commands.md`. Recite, then type. Work on a **lab VM** and a **lab user**. Do **not** SSH to real/production hosts (ignore example EPAM hostnames in the cheat sheet — they are not your target).

## `ssh-keygen`

1. [ ] Create an **RSA** key pair for lab use. Predict the two filenames (private vs `.pub`). Prove both exist under `~/.ssh/`.
2. [ ] Predict: which file is secret? Never paste or commit the private key. Prove the public file is one line starting with `ssh-rsa`.
3. [ ] Wrong usage: overwrite an existing key without meaning to. If `id_rsa` already exists, use a **different** filename for this drill (`-f` a lab path) rather than destroying your real key.
4. [ ] Recite from memory: type RSA; default names `id_rsa` and `id_rsa.pub`.
5. [ ] Privilege: you do **not** need root to make a key in your home. Prove as the lab user.
6. [ ] Predict passphrase empty vs set: which is easier in automation and weaker if the file leaks? Choose empty only on a disposable lab key.
7. [ ] Combined: after generation, `chmod` the private file (next section). Predict ssh will refuse a world-readable private key.
8. [ ] Human vs default: fingerprint after generation — copy it; you will match it later if the server shows a key warning.
9. [ ] What if `~/.ssh` does not exist? Recite whether the tool creates it. Prove directory mode is tight (700-ish).
10. [ ] Wrong usage: `-t` with a bogus type. Exact error.
11. [ ] Combined: public key goes on the **server** `authorized_keys`; private stays on the **client**. One sentence; do not copy the private key to the server.
12. [ ] Recite: two files, only `.pub` is shareable.
13. [ ] Predict: generating a new key does not change the server until you install the `.pub`. Prove by SSHing (lab) still using the old method if any.
14. [ ] Do not generate keys on a shared `/tmp` and leave them. Lab home only.
15. [ ] Combined with `ssh -v`: you will watch it offer this key. Remember the path.
16. [ ] What if the disk is full? Error; do not retry in a loop.
17. [ ] Recite RSA vs “I will use this for `-i` later”.
18. [ ] Predict comment (`user@host`) at the end of `.pub`. Show it.
19. [ ] Cleanup: if you created an extra lab key file, keep it for the ssh/scp drills or remove both private+pub together when done.
20. [ ] Confirm you still have **only** keys you intend. `ls -l ~/.ssh/` — no surprise files.

## `chmod`

1. [ ] Set the **private key** so it is **not** group/world readable (mode **600**). Prove `ls -l` shows `-rw-------`.
2. [ ] Predict: if the private key is `644`, OpenSSH refuses it. Temporarily prove with a **copy** of a lab key (`/tmp` copy), then delete the copy. Do not weaken your only real key.
3. [ ] Set `~/.ssh/config` to **600** as well (create it first if the `touch` drills have not). Prove mode.
4. [ ] Predict: why config is secret (IdentityFile paths, jump hosts). One sentence.
5. [ ] Recite from memory: 600 on private key **and** on config.
6. [ ] Privilege: chmod your own `~/.ssh` files as your user. You should not need root.
7. [ ] Wrong usage: `chmod 600` a directory by mistake. Recite directory vs file. Fix `~/.ssh` to **700** if you broke listing.
8. [ ] Combined: `chmod 600` then `ssh -i` that key. Success vs “UNPROTECTED PRIVATE KEY FILE”.
9. [ ] Human vs default: 600 vs 400 vs 644 — which does ssh accept? Prove 600 (and optionally 400) on a lab key copy.
10. [ ] What if you `chmod 777` the private key? Predict refusal. Fix immediately to 600.
11. [ ] Recite: never `chmod` system files (`/etc/ssh/ssh_host_*`) for this drill.
12. [ ] Combined: after `touch` on config, always chmod 600 in the same sitting.
13. [ ] Predict `~/.ssh` 755 vs 700 — ssh may warn. Prefer 700. Prove listing still works for you.
14. [ ] Wrong usage: chmod without a mode. Error?
15. [ ] Combined with `ls -l`: numeric 600 equals `rw-------`. Recite.
16. [ ] Do not recursively chmod `/` or `/etc`. Lab files under `~/.ssh` only.
17. [ ] Recite both cheat-sheet targets: `id_rsa` (or your lab key) and `config`.
18. [ ] What if the file does not exist yet? Error; create then chmod (see `touch`).
19. [ ] Predict: public `.pub` can be 644. Prove; do not chmod `.pub` to 600 as a requirement (it is not secret).
20. [ ] Cleanup: private key 600, config 600 if present, `~/.ssh` 700. SSH still works to the lab.

## `ssh`

1. [ ] Log in to a **lab** host with an **explicit private key** (`-i`). Prove you landed as the intended user (`whoami`, hostname). Not a production/EPAM hostname.
2. [ ] Log in passing **user** with `-l` and **port** with `-p` (22 unless the lab uses another). Predict default port is 22 if omitted.
3. [ ] Connect **verbose**. Recite one auth line you see (key offered, password, accept host key). Debug-only; then exit.
4. [ ] **Local forward** only: no remote command (`-N`) and map a local port to `localhost:80` on the lab host. Predict: your shell “hangs” because `-N` runs no command. Interrupt when done. Do not background-forget it.
5. [ ] Force a **tty** (`-t`) so `sudo` or a menu works. Prove `sudo ls /root` (or a lab-safe sudo) vs the same without `-t` if sudo complains about tty.
6. [ ] Run **one remote command** without an interactive shell (`whoami`). Prove you return to the local prompt. Recite: the command runs **there**.
7. [ ] Predict: `ssh user@host whoami; pwd; ls` — which of those run **local** vs **remote**? Prove. Then quote the remote script so **all** run remotely.
8. [ ] Feed a **local script** into the remote shell via stdin. Script should print hostname and `whoami`. Prove output is the lab host, not your laptop.
9. [ ] Jump through a **lab bastion**: `ProxyCommand` with `%h:%p` and a jump key. Recite: `%h:%p` is the **target** host:port. Do **not** use real jump boxes from the cheat-sheet example.
10. [ ] After `~/.ssh/config` has a **Host** stanza (user, port, IdentityFile), connect by the **alias** only. Prove you did not type user/port/key on the CLI.
11. [ ] Privilege: ssh as your user; remote root login may be disabled. Predict “Permission denied” vs landing as `centos`/`lab`. Do not brute-force.
12. [ ] Wrong usage: wrong key with `-i`. Verbose mode: “not accepted”. Fix with the lab key.
13. [ ] Combined: `-v` plus `-i` — watch which key file is offered. Match the path you chmod’d.
14. [ ] Predict host-key warning (changed key). Do **not** blindly type yes on production. On a lab VM you control, verify out of band.
15. [ ] Recite from memory: key file, login-name, port, verbose, no-command + local forward, force tty, one remote command, quoting, stdin script, jump, config alias.
16. [ ] Combined with `scp`: same key and user. If ssh works and scp fails, it is path/permission on the far side.
17. [ ] Danger: port-forward `-L` to services you should not expose. Lab only; close the forward when done.
18. [ ] What if the lab sshd is not on 22? `-p` from the sheet is the pattern. Prove with the real lab port.
19. [ ] Combined: `-t` needed for remote `sudo`/`top`. Without tty, `top` may fail. Optional prove.
20. [ ] Cleanup: exit all sessions; no leftover `-N` forwards (`jobs` / `ps`). You are on the local prompt.
21. [ ] Predict: `-N` without `-L` still opens a session with no command — useful? One sentence. Interrupt.
22. [ ] Recite quoting rule: unquoted `;` is your **local** shell. Prove once more with `hostname` so you cannot fool yourself.

## `scp`

1. [ ] Copy a **local** throwaway file to a **lab** remote path. Prove it exists on the server (`ssh … ls`).
2. [ ] Copy a **remote** file back to **here** (`.`). Prove the local copy exists and matches (`cmp` or checksum).
3. [ ] Copy **remote A → remote B** via your client (two lab accounts/hosts if you have them). Predict: data flows through you. If you have only one host, skip and say why.
4. [ ] Recite from memory: local→remote, remote→local, remote→remote.
5. [ ] Combined: same `-i`/config alias as `ssh`. Prove scp uses the key without a password prompt (lab keys).
6. [ ] Wrong usage: reversed arguments (empty source). Error? No clobber of a home directory; use throwaway names.
7. [ ] Privilege: writing into `/root` on the far side as a non-root user. Predict Permission denied. Use a home folder.
8. [ ] Predict: trailing path `/folder` vs filename. Where did the file land? Prove with `ls`.
9. [ ] Combined with quoting: spaces in filenames need quotes. Prove with a throwaway name or skip if unused.
10. [ ] Human vs default: progress meter vs silent. Note what you see.
11. [ ] What if the remote path does not exist? Exact error. Do not `scp` into a random system dir.
12. [ ] Recite: scp is file copy over SSH, not interactive (`sftp` is next).
13. [ ] Combined: `ssh host cat` vs scp — different jobs. One sentence.
14. [ ] Danger: remote→remote as **root@** only if the lab says so. Prefer your lab user.
15. [ ] Wrong usage: omit user@ on a host that is not in config. Whose account did it try?
16. [ ] Predict: scp uses the same port as ssh. If ssh needs `-p`, scp needs the port flag too (or Host stanza). Prove on the lab.
17. [ ] Combined with chmod: copying a private key to another machine is usually a mistake. Do not scp `id_rsa`. Copy `.pub` if needed.
18. [ ] Recite three arrows: laptop→VM, VM→laptop, VM→VM via you.
19. [ ] What if disk full on the destination? Error; delete throwaway files.
20. [ ] Cleanup: delete throwaway files on both sides. No extra copies of secrets.

## `touch`

1. [ ] Ensure `~/.ssh/config` **exists** (create empty if missing) and then lock it down with `chmod 600` (same sitting as the cheat sheet). Prove `ls -l`.
2. [ ] Predict: `touch` on an existing config **does not wipe** contents; it updates mtime. Prove by putting a comment line in, touching again, file still has the comment.
3. [ ] Wrong usage: `touch` without creating `~/.ssh` first if the directory is missing. Error? Create the directory 700 then touch.
4. [ ] Recite: create-if-needed, then 600. Config is as sensitive as a key.
5. [ ] Privilege: your home only. Do not touch `/etc/ssh/sshd_config` here (that is root + `systemctl` later).
6. [ ] Combined: after touch, add a **Host** stanza (lab alias, user, port, IdentityFile). Prove `ssh alias` works (see ssh drills).
7. [ ] Human vs default: empty config vs missing config — ssh still works with CLI flags. Prove missing vs empty.
8. [ ] What if you touch `config` with umask 022 so it is 644? ssh may warn. chmod 600 immediately.
9. [ ] Predict: `&& chmod` — if touch fails, chmod should not run. Recite why `&&` is used.
10. [ ] Wrong usage: touch a directory `~/.ssh`. Error or mtime change? Do not replace the directory with a file.
11. [ ] Combined with ssh-keygen: config `IdentityFile` points at the private key you generated. Path must be correct.
12. [ ] Recite the two-step from memory: ensure file exists, then 600.
13. [ ] Do not put production passwords in config. Keys only. Lab Host entries only.
14. [ ] Predict `Host *` vs `Host labalias` — which is safer for a first stanza? Prefer an explicit alias.
15. [ ] Combined: `chmod 600` config vs 600 key — both required for the cheat sheet. Prove both `ls -l`.
16. [ ] What if config has Windows CRLF from a paste? ssh parse errors. Keep UNIX newlines.
17. [ ] Recite: `touch` is not `ssh-keygen`. It does not create a key pair.
18. [ ] Combined with sftp: config can also set Host for sftp alias. Optional prove.
19. [ ] Wrong usage: `touch ~/.ssh/config /etc/ssh/ssh_config` as extra. Do not modify system client config.
20. [ ] Cleanup: keep a valid 600 config if you use aliases; otherwise empty file 600 is fine. No world-readable config.

## `sftp`

1. [ ] Open an **interactive** secure file transfer session to a **lab** account. Recite that this is SSH-based, not FTP port 21.
2. [ ] In the session, list remote files (`ls`), local files (`lls` if supported), then `exit`/`quit`.
3. [ ] Put a throwaway local file and get it back under a new name. Prove both sides.
4. [ ] Predict: `sftp` vs `scp` — interactive vs one-shot. One sentence.
5. [ ] Combined: same key/config as `ssh`. Prove you are not prompted if keys work.
6. [ ] Wrong usage: FTP (`ftp` client) to port 21 vs sftp. Do not use cleartext FTP for this drill.
7. [ ] Privilege: landing in a **chroot** SFTP jail vs full home. If the lab has a jail, `cd /` stays inside the cage. Record what you see.
8. [ ] Recite from memory: user@host interactive client.
9. [ ] Combined with sshd_config later: `ForceCommand internal-sftp` + `ChrootDirectory` + `Match User` — predict this user cannot `ssh` to a shell.
10. [ ] What if you `get` a missing file? Error inside the client; session stays up.
11. [ ] Human vs default: prompt `sftp>` vs ssh shell `$`. You should not get a bash prompt.
12. [ ] Danger: `put` into system directories. Use home/throwaway paths only.
13. [ ] Combined: `scp` three directions vs sftp interactive put/get. When pick which?
14. [ ] Wrong usage: wrong port. Use config Host or the port flag analog. Prove.
15. [ ] Predict: disconnect with `exit` leaves no remote shell. Prove local prompt.
16. [ ] Recite: not whois, not tcpdump — file transfer over SSH.
17. [ ] What if the lab user is shell-jailed already? sftp may still work. Record.
18. [ ] Combined with chmod: uploaded private keys accidentally 644 on the server. Do not upload private keys.
19. [ ] Recite `Match User` + `internal-sftp` + `ChrootDirectory` as the **server** side story (you apply it in `systemctl` drills, not inside the sftp client).
20. [ ] Cleanup: quit sftp; delete throwaway put/get files.

## `systemctl`

1. [ ] Recite: after editing **`/etc/ssh/sshd_config`**, you must **restart sshd** for Match User / ForceCommand / ChrootDirectory (or root-login changes) to apply. Do this only on a **lab VM with console**.
2. [ ] Predict: restart sshd **drops** existing SSH sessions or not? Note what happens to your current session on the lab. Have a console.
3. [ ] Privilege: restart as a normal user. Exact denial. Then root.
4. [ ] Combined: `sshd -t` config test **before** restart (if available). Predict: a syntax error plus restart can block new logins. Console required.
5. [ ] Wrong usage: `restart ssh` (wrong unit name) vs `sshd` / `ssh`. What does this OS call the unit? Prove status after.
6. [ ] Recite the jail pieces from the cheat-sheet comment: **Match User**, **ForceCommand internal-sftp**, **ChrootDirectory**. Do not apply a jail to your only admin user.
7. [ ] If you add a jail, use a **dedicated lab user**, then prove: sftp works, `ssh user@host` does not give a shell.
8. [ ] Predict: `PermitRootLogin` change + restart — your non-root key login still works? Prove before you lock root.
9. [ ] Combined with `ssh -v`: after restart, new connections see the new config; old sessions may keep old rules. One sentence.
10. [ ] Danger: restart sshd with a broken `ListenAddress` or port. You will not get back in without console. Do not change Port unless the lab says.
11. [ ] Human vs default: `status` after restart — active/running vs failed. If failed, **do not** loop restart; read the journal (other topic) from console.
12. [ ] Recite: this is the **server** daemon, not the `ssh` client.
13. [ ] Combined: client `~/.ssh/config` does not need systemctl. Server `/etc/ssh/sshd_config` does.
14. [ ] What if firewall blocks 22 after you change Port? Client `-p` must match. Lab only.
15. [ ] Predict reload vs restart for sshd on this OS — which did the cheat sheet demand? Use **restart**.
16. [ ] Wrong usage: `enable` vs `restart`. Recite: enable is boot; restart is now.
17. [ ] Combined with panic-on (firewall topic): restarting sshd while panic-on still will not accept packets. Do not combine those tests.
18. [ ] Recite from memory: apply sshd_config → restart sshd. Console. Lab VM.
19. [ ] Cleanup: revert any sshd_config jail/root-login experiments; restart; prove you can still SSH as the admin lab user.
20. [ ] Confirm `systemctl is-active` on sshd is active. No leftover Match blocks that jail your admin user.
