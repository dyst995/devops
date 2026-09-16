# Remote access

Daily admin work is usually **remote**, not sitting at the physical **console** (keyboard and screen on the machine). Console still matters for recovery when the network or SSH is down.

Remote access needs:

- a **protocol** (how the session is carried)
- a **program** (client you run)
- optionally **file copy** and **graphics**

## Protocols

| Protocol | Encrypted? | Notes |
| --- | --- | --- |
| **Telnet** | **No** | Login, password, and the whole session travel in the clear. Legacy only. Do not use on a real network. |
| **SSH** | **Yes** | Encrypted shell, remote commands, port forwarding, and file transfer (SCP/SFTP). This is the default for Linux. |

**Memory hook:** Telnet = postcard. SSH = sealed envelope.

## Programs

- **SSH** — the `ssh` client (OpenSSH on Linux/macOS; PuTTY and others on Windows). Login and commands.
- **WinSCP** — Windows GUI. **Basic file manager** for **remote file copying** over SSH (SFTP/SCP). You browse folders and drag files; you do not have to remember `scp` syntax.

## X-System and VNC

**X Window System** (X11) uses a **client–server** model and a **network-transparent** protocol. The **application** (X client) can run on the remote host; the **display** (X server) can be on your laptop. Because the protocol is network-transparent, it **can be used remotely** (often tunneled through SSH with X11 forwarding).

**VNC** is different: **VNC server** on the machine, **VNC client** on yours — you see a **full remote desktop**, not one application window.

**Memory hook:** X = one GUI program over the network. VNC = the whole desktop.

## SSH key generation

Password authentication works, but servers expect **key pairs**. Generate them on **your** machine:

```bash
cd ~
ssh-keygen -t rsa
```

`-t rsa` = RSA key type.

Interactive prompts (course example):

```text
Enter file in which to save the key (/home/user/.ssh/id_rsa):
Created directory '/home/user/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

- Default path: **`/home/user/.ssh/id_rsa`**. If `~/.ssh` does not exist, `ssh-keygen` **creates** it.
- **Passphrase can be empty.** Empty = the private key is usable without typing a phrase (convenient, weaker if the laptop is stolen). Non-empty = extra decrypt step before SSH can use the key.

Output:

```text
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
The key fingerprint is:
7e:f5:7e:51:ec:3d:2c:36:02:9d:5b:89:4a:3a:b7:b5 Linux Key
```

| File | Role |
| --- | --- |
| `~/.ssh/id_rsa` | **Private** identification. **Never distribute your private key to anyone.** |
| `~/.ssh/id_rsa.pub` | **Public** key — copy this to servers. |

The **fingerprint** is a short hash so you can recognize this key later (known_hosts, audit).

```bash
chmod 600 ~/.ssh/id_rsa
```

Owner read/write only. OpenSSH **refuses** to use a private key that is group- or world-readable.

**Memory hook:** `.pub` travels. `id_rsa` never leaves your control. `chmod 600`.

## SSH command flags

| Flag | Course wording |
| --- | --- |
| **`-i`** | **Key file location** (private key, e.g. `lab.pem` or `id_rsa`) |
| **`-l login_name`** | User to log in as on the **remote** machine (same idea as `user@host`) |
| **`-p port`** | **Port** to connect to on the remote host (default **22**) |
| **`-t`** | **Force pseudo-terminal allocation.** Used to run **screen-based** programs on the remote machine (e.g. **menu services**). **Multiple `-t`** options force tty allocation **even if ssh has no local tty**. Also required for **`sudo`**, which wants an interactive terminal. |
| **`-v`** | **Verbose mode** (repeat for more detail: `-vv`, `-vvv`) — debug auth and connection |
| **`-N`** | **Do not execute a remote command.** Useful for **just forwarding ports** (tunnel stays open without a shell) |

**Memory hook:** `-i` who you are (key), `-l`/`user@` who you become, `-p` where, `-t` give me a tty, `-N` tunnel only.

## SSH access (login with a key)

Put the **contents** of **local** `~/.ssh/id_rsa.pub` into **`~/.ssh/authorized_keys`** on the **account you will log into**. If `authorized_keys` **already exists**, **append** — do not overwrite other people’s keys.

Then connect (course host + key):

```bash
ssh -i ~/.ssh/lab.pem centos@ecsc00a058b0.epam.com

Last login: Thu Aug 22 13:33:34 2019 from 10.6.207.129
[centos@ecsc00a058b0 ~]$
```

`-i` points at the **private** key that matches the public line in `authorized_keys`. Cloud images often use `*.pem` instead of `id_rsa`.

**IMPORTANT:** SSH as **root is forbidden by default** on most systems. To allow it you must change **`/etc/ssh/sshd_config`** (e.g. `PermitRootLogin`) and **restart the sshd service**. Prefer a normal user plus `sudo`.

**Memory hook:** public key → remote `authorized_keys`. Private key stays with `-i`. Root = sshd_config + restart, not just `ssh root@…`.

## SSH remote command

You do not have to open an interactive shell. `ssh user@host command` runs **command** on the remote and prints the result.

```bash
# Single command
ssh centos@ecsc00a058b0.epam.com whoami

# Multiple commands
ssh centos@ecsc00a058b0.epam.com whoami; pwd; ls

# Sudo — sudo requires an interactive shell; enable with -t
ssh -t centos@ecsc00a058b0.epam.com sudo ls /root

# Local script execution — stdin of ssh is the script file
ssh centos@ecsc00a058b0.epam.com < script.sh
```

Without `-t`, `sudo` often fails with “must be run from a terminal.”

On **multiple commands**, the **local** shell sees `;`. Unquoted `whoami; pwd; ls` can run `pwd` and `ls` **locally** after `ssh` finishes `whoami`. Quote the remote string if everything must run on the server: `ssh user@host 'whoami; pwd; ls'`. The course shows the unquoted form — know both.

**Memory hook:** one-shot `ssh host cmd`. `sudo` → **`-t`**. Local file → remote: **`< script.sh`**.

## scp

**scp** copies files **over SSH**. Same authentication as `ssh` (keys, `user@host`). Useful to **transport files between computers**, for example **backup**.

The two commands are **very much alike**: user, host, `-i`, `-P` for port on scp (capital P, unlike ssh’s `-p`).

```bash
# local file → remote directory
scp examplefile centos@ecsc00a058b0.epam.com:/folder

# remote file → current directory (.)
scp centos@ecsc00a058b0.epam.com:/home/yourusername/examplefile .

# remote host A → remote host B (traffic through your machine)
scp centos@ecsc00a058b0.epam.com:/examplefile \
    root@ecsc00a058b9.epam.com:/home/user/
```

**Memory hook:** `scp source destination`. Colon after host starts the remote **path**. `.` = here.

## Bastion / SSH ProxyCommand

**Bastion hosts** are instances in your **public subnet**. You reach them with **SSH** (Linux) or **RDP** (Windows). The bastion is a **jump server**: from there you SSH/RDP to instances in a **private subnet** that have no public IP.

```bash
ssh -i ~/.ssh/lab.pem \
  -o "ProxyCommand ssh -W %h:%p -i key_for_jumpbox.pem jumpbox_user@jump.box.host" \
  centos@ecsc00a058b0.epam.com
```

What this does:

1. Outer `ssh` wants `centos@ecsc00a058b0.epam.com` using `lab.pem`.
2. **`ProxyCommand`**: instead of a direct TCP connect, run another `ssh` to the **jump box**.
3. **`ssh -W %h:%p`**: stdio forwarding to **target host** (`%h`) and **port** (`%p`).
4. Jump box uses **`key_for_jumpbox.pem`** and **`jumpbox_user@jump.box.host`**.

Two keys, two users: one pair for the bastion, one for the private VM.

**Memory hook:** public jump → private target. `-W %h:%p` = “connect me through to that host:port.”

## SSH config file

If you connect to **many** remotes daily, remembering **IPs, usernames, non-standard ports, and flags** is hard. OpenSSH lets you keep a **per-user** config with **different SSH options for each remote machine**.

```bash
touch ~/.ssh/config && chmod 600 ~/.ssh/config
```

Same permission idea as the private key: only you should read it (it can list IdentityFile paths).

```bash
ssh targaryen
```

is equal to:

```bash
ssh -i ~/.ssh/targaryen.key -p 7654 daenerys@192.168.1.10
```

That mapping lives in `~/.ssh/config`:

```text
Host targaryen
    HostName 192.168.1.10
    User daenerys
    Port 7654
    IdentityFile ~/.ssh/targaryen.key
```

`Host` is the **alias** you type. `HostName` is the real IP/DNS. You can add `ProxyJump` / `ProxyCommand` here too.

**Memory hook:** alias in `Host`, real machine in `HostName`. `chmod 600`.

## SFTP / FTP

**Main function:** **secure file transfer** between a **local** and a **remote** computer.

Typical client features (WinSCP-class tools and `sftp`):

- **SFTP** and **SCP** over **SSH-1 and SSH-2**, and **plain old FTP**
- **Batch** file scripting and a **command-line** interface
- **Integrated text editor**
- **Directory synchronization** (semi- or fully automatic)

Interactive OpenSSH client:

```bash
sftp access@192.168.0.14
```

**FTP** is the old unencrypted protocol. **SFTP** is SSH’s file protocol — encrypted, same port 22 unless you change sshd.

### SFTP-only user (no shell)

Restrict account **`access`** in **`/etc/ssh/sshd_config`**:

```text
Match User access
ForceCommand internal-sftp
PasswordAuthentication yes
ChrootDirectory /var/sftp
PermitTunnel no
AllowAgentForwarding no
AllowTcpForwarding no
X11Forwarding no
```

| Directive | Meaning |
| --- | --- |
| `Match User access` | Following lines apply only to that user |
| `ForceCommand internal-sftp` | No bash — only the internal SFTP server |
| `PasswordAuthentication yes` | This user may use a password (lab setup) |
| `ChrootDirectory /var/sftp` | After login they cannot see **above** this directory |
| `PermitTunnel` / `AllowAgentForwarding` / `AllowTcpForwarding` / `X11Forwarding` **no** | Not a jump box or X client |

Apply:

```bash
systemctl restart sshd
```

Always restart **sshd** after editing `sshd_config` (root login, SFTP jail, ports, …). A bad config can lock you out — keep a console session open.

**Memory hook:** SFTP = files over SSH. `internal-sftp` + `ChrootDirectory` = drop box. Restart sshd.
