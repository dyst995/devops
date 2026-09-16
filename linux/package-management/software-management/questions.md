# Software packages and APT — Questions

Cover the Answers section. Answer first, then check.

1. What is a software package? What is a package management system for?
2. Fill the table: Red Hat vs Debian — file extension, low-level tool, high-level tool.
3. What is the difference between the low-level and high-level tools?
4. What does RPM stand for, and who originally developed it?
5. What does YUM stand for, what does it manage, and under which license was it released?
6. Where does the name `deb` / Debian come from?
7. What does APT stand for, and what does it handle?
8. Which two `apt-get` commands are used most often?
9. Recite what `update`, `upgrade`, `install`, `remove`, `purge`, and `check` do.
10. When installing with `apt-get`, do you pass `libc6` or `libc6.deb`?
11. `remove` vs `purge`.
12. Does `apt-get update` upgrade nginx? What does it actually refresh?
13. What is `apt-cache` for? Does it install packages?
14. Recite `showpkg`, `search`, `show`, `depends`.
15. Which two paths hold APT repository configuration?
16. Why do Docker/Kubernetes/Terraform appear as separate files under `sources.list.d/`?
17. Decode: `deb http://ftp.by.debian.org/debian/ buster main non-free contrib`
18. What is `deb-src` vs `deb`?
19. After adding a new `.list` file, what must you run before `install` will see those packages?
20. You are on Ubuntu and need `ripgrep` from the distro repos. Write the two-command sequence.

---

## Answers

1. Software in an archive meant to be installed by a package manager (or a self-contained installer). Automates install, upgrade, configure, and remove.
2. RPM / `rpm` / `yum` · DEB / `dpkg` / `apt`.
3. Low-level operates on a local package file. High-level uses repositories, resolves dependencies, downloads, then calls the low-level tool.
4. Red Hat Package Manager. Red Hat (for Red Hat Linux); now used by many distros.
5. Yellowdog Updater, Modified. RPM-compatible systems, command line. GNU GPL.
6. Debra, then girlfriend (now ex-wife) of Debian founder Ian Murdock.
7. Advanced Packaging Tool. Installation and removal of software on Debian and variants.
8. `update` and `install`.
9. New package lists · upgrade installed packages · install by package name · remove · remove plus configs · verify no broken deps.
10. `libc6` — the package name, not the `.deb` filename.
11. `remove` leaves config files. `purge` deletes packages and their config files.
12. No. It only retrieves new **lists** of available packages from the repos.
13. Query/manipulate APT’s binary cache. No — lookup only.
14. General info for one package · regex search of the package list · readable record · raw dependencies.
15. `/etc/apt/sources.list` and `/etc/apt/sources.list.d/`
16. Third-party / extra repos each get their own list file instead of cluttering the main `sources.list`.
17. Binary packages from that Debian **buster** mirror, components main, non-free, and contrib.
18. `deb` = binaries. `deb-src` = source packages.
19. `apt-get update`
20. `sudo apt-get update` then `sudo apt-get install ripgrep`
