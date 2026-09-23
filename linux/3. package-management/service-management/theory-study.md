# Service management (study)

Modern Linux uses **systemd** as the default **init system and service manager**. Many systems still accept legacy **init.d** scripts. You need both: old boxes and vendor scripts vs unit files and `systemctl`.

Boot “mode” (runlevels vs targets) is in [runlevels](../../1. intro/08-runlevels/theory.md). This page is **how a single service starts and stops**.

init.d = a **shell script** per service. systemd = a **declarative unit file** + `systemctl`.

## init.d

Legacy Unix-style: scripts in **`/etc/init.d/`**. Each script starts, stops, or restarts the service using standard arguments. They ran at boot and shutdown. systemd has mostly replaced this; the directory and wrappers still exist. On some systems `service nginx start` wraps the same scripts.

```text
/etc/init.d/<command> <option>
```

`<option>`: `start` · `stop` · `reload` · `restart` · `force-reload`.

The file **is** the API — a `case` on `$1`. Unknown options print usage and exit **1**. Example from the notes (static routes): `start` adds routes; `stop` is a no-op (routes are not deleted).

```sh
#!/sbin/sh
GW=10.204.223.1
case "$1" in
  start)
    /usr/sbin/route add -net 10.204.0.0 -netmask 255.255.0.0 $GW
    /usr/sbin/route add -net 10.200.0.0 -netmask 255.255.0.0 $GW
    exit 0
    ;;
  stop)
    exit 0
    ;;
  *)
    echo "Usage: $0 { start | stop }"
    exit 1
    ;;
esac
```

## systemd

More than PID 1: **journald** (logs), **logind** (sessions), **networkd** (network), and others.

- **System instance** reads `system.conf` and `system.conf.d/`
- **User instance** reads `user.conf` and `user.conf.d/`

**Targets** (`.target`) group units and mark boot stages (SysV runlevel replacements). Servers typically want **`multi-user.target`**.

| Unit path | Who puts files there |
| --- | --- |
| `/usr/lib/systemd/system/` | Packages (RPM/deb) |
| `/run/systemd/system/` | Created **at runtime** (volatile) |
| `/etc/systemd/system/` | **Admin / user-created** units |

| Suffix | For |
| --- | --- |
| `service` | Daemons / long-running programs |
| `socket` | Socket activation |
| `device` | Devices |
| `mount`, `automount` | Filesystem mounts |
| `swap` | Swap |
| `target` | Groups / boot stages |
| `path` | Path-based activation |
| `timer` | Scheduled tasks (cron-like) |
| `snapshot`, `slice`, `scope` | Advanced resource management |

Full keys: `man systemd.unit`.

### Unit file sections (`.ini`-like)

**`[Unit]`** — metadata and dependencies

| Key | Meaning |
| --- | --- |
| `Description=` | Human-readable summary |
| `Documentation=` | man pages or URLs |
| `Requires=` | **Strong** dep — if they fail, this fails |
| `Wants=` | **Weak** dep — start them, but they need not succeed |
| `BindsTo=` | If the bound unit stops, this stops too |
| `PartOf=` | Stopping/restarting the listed units also stops/restarts this one |
| `Conflicts=` | Cannot be active at the same time |
| `Before=` / `After=` | Ordering |
| `OnFailure=` | Units to start if this fails |

**`[Service]`** — the process systemd supervises

| Key | Meaning |
| --- | --- |
| `Type=` | `simple`, `forking`, `oneshot`, `notify`, … |
| `ExecStart=` | Command that **starts** the service |
| `ExecStartPre=` / `ExecStartPost=` | Before / after `ExecStart` |
| `ExecReload=` / `ExecStop=` | Reload / stop |
| `Restart=` | If the process fails or exits |
| `PIDFile=` | Daemon PID file (typical with `forking`) |
| `User=` / `Group=` | Run as |
| `WorkingDirectory=` | cwd |
| `Environment=` | Inline env vars |
| `EnvironmentFile=` | File of `KEY=value` lines |

**`[Install]`** — what `systemctl enable` / `disable` does

| Key | Meaning |
| --- | --- |
| `WantedBy=` | Targets that should pull this unit in when enabled |
| `RequiredBy=` | Targets that **require** this unit |
| `Alias=` | Extra names |
| `Also=` | Other units to install/uninstall together |

`Wants` is polite; `Requires` is strict. `WantedBy=multi-user.target` = start on a normal server boot.

```ini
# /etc/systemd/system/tomcat.service
[Unit]
Description=Tomcat Application server
After=network.target

[Service]
Type=forking
ExecStart=/apps/tomcat/bin/startup.sh
ExecStop=/apps/tomcat/bin/shutdown.sh
User=tomcat55
Group=staff

[Install]
WantedBy=multi-user.target
```

`Type=forking` = the start script **daemonizes** (parent exits, child stays). `After=network.target` = wait until networking is up.

### systemctl (everyday)

```bash
systemctl start name.service
systemctl stop name.service
systemctl restart name.service
systemctl reload name.service
systemctl status name.service
systemctl is-active name.service
systemctl list-units --type service --all
```

After **editing** a unit file: `systemctl daemon-reload`, then `restart`. `enable` / `disable` control **boot**; `start` / `stop` control **now**.
