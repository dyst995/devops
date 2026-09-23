# Remote access (study)

Daily admin is usually **remote**, not at the physical **console**. Console still matters when the network or SSH is down.

Remote access needs a **protocol**, a **program**, and optionally **file copy** and **graphics**.

| Protocol | Encrypted? | Notes |
| --- | --- | --- |
| **Telnet** | **No** | Login, password, and the whole session in the clear. Legacy only. Do not use on a real network. |
| **SSH** | **Yes** | Encrypted shell, remote commands, port forwarding, SCP/SFTP. Default for Linux. |

**Programs:** `ssh` client (OpenSSH; PuTTY on Windows). **WinSCP** — Windows GUI file manager over SSH (SFTP/SCP).

**X Window System (X11):** client–server, **network-transparent**. The **application** (X client) can run remote; the **display** (X server) on your laptop. Often tunneled through SSH (X11 forwarding). **VNC:** server on the machine, client on yours — a **full remote desktop**, not one window.

## Keys

Generate on **your** machine: `ssh-keygen -t rsa` (`-t` = type). Default path **`~/.ssh/id_rsa`**. If `~/.ssh` does not exist, `ssh-keygen` **creates** it. **Passphrase can be empty** (convenient; weaker if the laptop is stolen) or non-empty (decrypt before use).

| File | Role |
| --- | --- |
| `~/.ssh/id_rsa` | **Private**. **Never distribute.** OpenSSH **refuses** group- or world-readable keys → `chmod 600` |
| `~/.ssh/id_rsa.pub` | **Public** — copy to servers |

The **fingerprint** is a short hash so you can recognize this key later.

Put the **contents** of the local `.pub` into **`~/.ssh/authorized_keys`** on the **account you will log into**. If that file **already exists**, **append** — do not overwrite other keys. `-i` is the **private** key that matches. Cloud images often use `*.pem` instead of `id_rsa`.

**SSH as root is forbidden by default.** Allowing it means **`/etc/ssh/sshd_config`** (e.g. `PermitRootLogin`) and **restart sshd**. Prefer a normal user plus `sudo`.

## ssh flags and one-shot commands

| Flag | Meaning |
| --- | --- |
| **`-i`** | Private **key file** |
| **`-l login_name`** | Remote user (same idea as `user@host`) |
| **`-p port`** | Remote port (default **22**) |
| **`-t`** | **Force tty.** Screen-based programs / menus. Multiple `-t` even if ssh has no local tty. **`sudo`** wants an interactive terminal |
| **`-v`** | Verbose (`-vv`, `-vvv`) — debug auth |
| **`-N`** | **No remote command** — port-forward / tunnel only |

```bash
ssh -i ~/.ssh/lab.pem centos@ecsc00a058b0.epam.com
ssh centos@host whoami
ssh centos@host whoami; pwd; ls          # local shell sees `;` — pwd/ls may run *locally*
ssh user@host 'whoami; pwd; ls'          # all remote
ssh -t centos@host sudo ls /root
ssh centos@host < script.sh              # local script on remote stdin
```

Without `-t`, `sudo` often fails with “must be run from a terminal.”

## scp, bastion, config, SFTP

**`scp`** copies over SSH (same auth). **`-P`** is port on scp (capital — unlike ssh’s `-p`). Form: `scp source destination`. Colon after host starts the remote **path**. `.` = here. Remote A → remote B goes through your machine.

```bash
scp examplefile centos@host:/folder
scp centos@host:/home/you/examplefile .
```

**Bastion:** jump host in a **public** subnet; from there you reach **private** instances with no public IP. Linux: SSH. Windows: RDP.

```bash
ssh -i ~/.ssh/lab.pem \
  -o "ProxyCommand ssh -W %h:%p -i key_for_jumpbox.pem jumpbox_user@jump.box.host" \
  centos@ecsc00a058b0.epam.com
```

Outer ssh uses `lab.pem` for the target. **`ProxyCommand`** + **`ssh -W %h:%p`**: instead of a direct TCP connect, the jump box forwards stdio to **target host** (`%h`) and **port** (`%p`). Two keys, two users.

**`~/.ssh/config`:** per-user aliases (IP, user, port, key). `touch` + `chmod 600` (it can list IdentityFile paths).

```text
Host targaryen
    HostName 192.168.1.10
    User daenerys
    Port 7654
    IdentityFile ~/.ssh/targaryen.key
```

`ssh targaryen` equals the long command. You can add `ProxyJump` / `ProxyCommand` here too.

**SFTP** is SSH’s file protocol (encrypted, usually port 22). **FTP** is the old unencrypted one. Typical clients (WinSCP-class and `sftp`): SFTP/SCP over SSH-1/2, plain FTP, batch scripting, CLI, integrated editor, directory sync.

```bash
sftp access@192.168.0.14
```

SFTP-only user (no shell) in **`sshd_config`**:

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
| `ForceCommand internal-sftp` | No bash — only internal SFTP |
| `PasswordAuthentication yes` | This user may use a password (lab) |
| `ChrootDirectory /var/sftp` | Cannot see **above** this directory |
| forwarding / tunnel / X11 **no** | Not a jump box or X client |

Always **`systemctl restart sshd`** after editing `sshd_config`. A bad config can lock you out — keep a console session open.
