# Service management: init.d and systemd

Modern Linux uses **systemd** as the default **init system and service manager**. Many systems still accept legacy **init.d** scripts for compatibility. You need both: old boxes and vendor scripts vs unit files and `systemctl`.

Runlevels vs targets (the boot “mode”) are in [linux/intro — runlevels](../../intro/08-runlevels/theory.md). This page is **how a single service starts and stops**.

**Memory hook:** init.d = a **shell script** per service. systemd = a **declarative unit file** + `systemctl`.

## init.d

**init.d** is the legacy Unix-style manager: shell scripts in **`/etc/init.d/`**. Each script says how that service **starts, stops, or restarts**, using standard arguments (`start`, `stop`, `restart`). Those scripts ran at boot and shutdown. systemd has mostly replaced this, but the directory and wrappers still exist on many distros.

### Syntax

Scripts are SysV-style:

```text
/etc/init.d/<command> <option>
```

- `<command>` — service / script name
- `<option>` — `start` · `stop` · `reload` · `restart` · `force-reload`

```bash
/etc/init.d/nginx start
/etc/init.d/nginx stop
/etc/init.d/nginx restart
```

(On some systems `service nginx start` is a wrapper around the same scripts.)

### Example: static routes

```sh
#!/sbin/sh
# Add static routes
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

`$1` is the option (`start` / `stop`). Unknown options print usage and exit **1**. `stop` here is a no-op (routes are not deleted).

**Memory hook:** `/etc/init.d/name start|stop|restart`. The file **is** the API — a `case` on `$1`.

## systemd

**systemd** is the modern system and service manager.

- **System instance** reads `system.conf` and `system.conf.d/`
- **User instance** reads `user.conf` and `user.conf.d/`

It is more than PID 1: a suite including **journald** (logs), **logind** (sessions), **networkd** (network), and others.

**Targets** (`.target`) group units and mark boot stages. They replace SysV **runlevels**, with compatibility names like `runlevel3.target` still present. Servers typically want **`multi-user.target`**.

### Unit file locations

Unlike init.d’s per-service scripts, systemd uses **unit files** (declarative). Search order / typical use:

| Path | Who puts files there |
| --- | --- |
| `/usr/lib/systemd/system/` | Packages (RPM/deb): nginx, Apache, MySQL |
| `/run/systemd/system/` | Created **at runtime** (tmp, volatile) |
| `/etc/systemd/system/` | **Admin / user-created** units (your Tomcat example) |

**Memory hook:** vendor = `/usr/lib/...`. You customize or add = `/etc/systemd/system/`. Runtime = `/run/...`.

### Resource types (unit suffixes)

| Type | For |
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

### Unit file syntax

`.ini`-like sections: **`[Unit]`**, **`[Service]`**, **`[Install]`**.

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
| `Before=` / `After=` | Ordering (this starts before / after those) |
| `OnFailure=` | Units to start if this fails |

**`[Service]`** — the process systemd supervises

| Key | Meaning |
| --- | --- |
| `Type=` | Startup style: `simple`, `forking`, `oneshot`, `notify`, … |
| `ExecStart=` | Command that **starts** the service |
| `ExecStartPre=` / `ExecStartPost=` | Before / after `ExecStart` |
| `ExecReload=` / `ExecStop=` | Reload / stop commands |
| `Restart=` | What to do if the process fails or exits |
| `PIDFile=` | File holding the daemon PID (typical with `forking`) |
| `User=` / `Group=` | Run as this user/group |
| `WorkingDirectory=` | cwd of the process |
| `Environment=` | Inline env vars |
| `EnvironmentFile=` | File of `KEY=value` lines |

**`[Install]`** — what `systemctl enable` / `disable` does

| Key | Meaning |
| --- | --- |
| `WantedBy=` | Targets that should pull this unit in when enabled |
| `RequiredBy=` | Targets that **require** this unit |
| `Alias=` | Extra names |
| `Also=` | Other units to install/uninstall together |

**Memory hook:** `[Unit]` = who I wait for. `[Service]` = how I run. `[Install]` = which target **enables** me (`WantedBy=multi-user.target` = start on a normal server boot). `Wants` is polite; `Requires` is strict.

### Example: Tomcat

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

`Type=forking` = the start script **daemonizes** (parent exits, child stays). `After=network.target` = wait until networking is up. Enable would link this into `multi-user.target`.

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

**Memory hook:** init.d `start|stop|restart` → `systemctl start|stop|restart`. Add `status`, `enable`, `daemon-reload`.
