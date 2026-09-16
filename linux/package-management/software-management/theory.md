# Software packages and APT

A **software package** is software packed in an archive so a **package management system** (or a self-contained installer) can install it.

A **package management system** is the set of tools that **install, upgrade, configure, and remove** those packages automatically — including dependencies.

**Memory hook:** you do not copy random binaries onto a server. You install a **package**; the manager tracks files, versions, and deps.

## Two families

| | Red Hat based | Debian based |
| --- | --- | --- |
| Package file | `*.rpm` | `*.deb` |
| Low-level tool | `rpm` | `dpkg` |
| High-level tool | `yum` | `apt` (`apt-get` / `apt-cache`) |

Low-level = talk to a **single file** on disk (`rpm -i foo.rpm`, `dpkg -i foo.deb`). High-level = talk to **repositories**, resolve dependencies, download, then call the low-level tool.

**Memory hook:** Red Hat = RPM + yum. Debian/Ubuntu = DEB + apt. Interview: *yum is to rpm as apt is to dpkg*.

### RPM and yum

**RPM** (Red Hat Package Manager) started at Red Hat for Red Hat Linux; many distros use it now.

**YUM** (Yellowdog Updater, Modified) is an open-source **command-line** package manager for RPM-compatible systems, licensed **GNU GPL**. It is the high-level layer on top of RPM (newer RHEL uses `dnf`; this course names yum).

### deb and APT

**`.deb`** is the Debian binary package extension. The name comes from **Debra**, then partner of Debian founder **Ian Murdock** (same “Deb” as in Debian).

**APT** (Advanced Packaging Tool) is the free user interface + libraries that **install and remove** software on Debian GNU/Linux and its variants (Ubuntu, Mint, …).

## apt-get

**`apt-get`** is a simple CLI for downloading and installing packages. The commands you will type most are **`update`** and **`install`**.

| Subcommand | Meaning |
| --- | --- |
| `update` | Retrieve **new lists** of packages (refresh what the repos offer). Does **not** upgrade installed software by itself. |
| `upgrade` | Perform an upgrade of already installed packages |
| `install` | Install new packages. The name is the **package name** (`libc6`), **not** the file (`libc6.deb`) |
| `remove` | Remove packages (config files may stay) |
| `purge` | Remove packages **and config files** |
| `check` | Verify there are **no broken dependencies** |

```bash
sudo apt-get update
sudo apt-get install nginx
sudo apt-get remove nginx
sudo apt-get purge nginx
sudo apt-get upgrade
sudo apt-get check
```

**Memory hook:** `update` = refresh the catalog. `upgrade` / `install` = change what is on disk. `remove` keeps configs; `purge` does not. Install `nginx`, not `nginx.deb`, when using apt-get.

## apt-cache

**`apt-cache`** is a low-level tool that reads APT’s **binary cache** and **queries** it. It does not install anything.

| Subcommand | Meaning |
| --- | --- |
| `showpkg` | General information for one package |
| `search` | Search the package list with a **regex** |
| `show` | Readable record for the package |
| `depends` | Raw **dependency** information |

```bash
apt-cache search nginx
apt-cache show nginx
apt-cache showpkg nginx
apt-cache depends nginx
```

**Memory hook:** `apt-get` changes the system. `apt-cache` only **looks up** the cache.

## Where APT looks: sources

APT reads repository lists from:

- `/etc/apt/sources.list`
- `/etc/apt/sources.list.d/` (one extra list per vendor — Docker, Kubernetes, Terraform, …)

```text
$ ls /etc/apt/sources.list /etc/apt/sources.list.d/
/etc/apt/sources.list

/etc/apt/sources.list.d/:
docker-ce.list      kubernetes.list        winehq.list
gns3.list           terraform.list         aws.list
```

A `sources.list` line looks like:

```text
deb http://ftp.by.debian.org/debian/ buster main non-free contrib
deb-src http://ftp.by.debian.org/debian/ buster main non-free contrib
```

| Field | Meaning |
| --- | --- |
| `deb` | Binary packages |
| `deb-src` | **Source** packages |
| URL | Repository mirror |
| `buster` | Debian **release** codename (here: Debian 10) |
| `main` `contrib` `non-free` | **Components** (free vs contrib vs non-free) |

Typical extra stanzas: `buster/updates` (security), `buster-updates`, `buster-backports`.

**Memory hook:** extra vendors drop a file in `sources.list.d/`. `apt-get update` after you add a repo, or APT will not see the new packages.
