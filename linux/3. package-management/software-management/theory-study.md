# Software packages and APT (study)

A **software package** is software in an archive so a **package management system** (or a self-contained installer) can install it. The manager **installs, upgrades, configures, and removes** packages — including dependencies. You do not copy random binaries onto a server; the manager tracks files, versions, and deps.

## Two families

| | Red Hat based | Debian based |
| --- | --- | --- |
| Package file | `*.rpm` | `*.deb` |
| Low-level tool | `rpm` | `dpkg` |
| High-level tool | `yum` | `apt` (`apt-get` / `apt-cache`) |

Low-level = a **single file** on disk (`rpm -i foo.rpm`, `dpkg -i foo.deb`). High-level = **repositories**, resolve dependencies, download, then call the low-level tool.

Interview: *yum is to rpm as apt is to dpkg*. Newer RHEL uses `dnf`; this course names yum.

**RPM** started at Red Hat; many distros use it. **YUM** (Yellowdog Updater, Modified) is the GPL high-level CLI for RPM-compatible systems.

**`.deb`** is the Debian binary package extension (from **Debra**, partner of Debian founder **Ian Murdock** — same “Deb” as Debian). **APT** (Advanced Packaging Tool) is the free UI + libraries that install and remove software on Debian GNU/Linux and variants (Ubuntu, Mint, …).

## apt-get vs apt-cache

**`apt-get`** downloads and installs. You type **`update`** and **`install`** most. It **changes** the system. **`apt-cache`** only **queries** APT’s binary cache.

| apt-get | Meaning |
| --- | --- |
| `update` | Refresh **lists** of what repos offer. Does **not** upgrade installed software |
| `upgrade` | Upgrade already installed packages |
| `install` | Install by **package name** (`nginx`), **not** the file (`nginx.deb`) |
| `remove` | Remove package; **config files may stay** |
| `purge` | Remove package **and** config files |
| `check` | Verify **no broken dependencies** |

| apt-cache | Meaning |
| --- | --- |
| `search` | Search the package list with a **regex** |
| `show` | Readable record |
| `showpkg` | General information for one package |
| `depends` | Raw **dependency** list |

```bash
sudo apt-get update
sudo apt-get install nginx
sudo apt-get remove nginx
sudo apt-get purge nginx
sudo apt-get upgrade
sudo apt-get check

apt-cache search nginx
apt-cache show nginx
apt-cache showpkg nginx
apt-cache depends nginx
```

## Where APT looks

- `/etc/apt/sources.list`
- `/etc/apt/sources.list.d/` — one extra list per vendor (Docker, Kubernetes, Terraform, …)

```text
deb http://ftp.by.debian.org/debian/ buster main non-free contrib
deb-src http://ftp.by.debian.org/debian/ buster main non-free contrib
```

| Field | Meaning |
| --- | --- |
| `deb` | Binary packages |
| `deb-src` | **Source** packages |
| URL | Mirror |
| `buster` | Debian **release** codename (Debian 10 here) |
| `main` `contrib` `non-free` | **Components** |

Typical extra stanzas: `buster/updates` (security), `buster-updates`, `buster-backports`. After you add a repo, `apt-get update` or APT will not see the new packages.
