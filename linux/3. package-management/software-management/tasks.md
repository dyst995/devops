# Tasks — Software management

Close `theory.md`. Prefer **query / list / cache** commands. For install/remove, use a disposable package if you install at all, or write the command you would run without executing destructive changes on a shared host. Use Debian tools on Ubuntu/WSL; know the Red Hat column even if you only have Rocky.

## Warm-up (families)

1. From memory: fill **package file**, **low-level tool**, **high-level tool** for Red Hat vs Debian.
2. What does low-level vs high-level mean (single file vs repos + deps)?
3. Interview line: yum is to rpm as ? is to ?
4. Expand RPM, YUM, APT, and the `.deb` naming story (Debra). Newer RHEL high-level name vs what this course says.
5. Memory hook: you do not copy random binaries onto a server — restate why packages matter (files, versions, deps).

## apt-get (construct — describe the job; prefer not to spoil the subcommand)

6. Refresh what the repositories **offer** without upgrading software. Then prove installed versions did not all jump (e.g. note a package version before/after).
7. Write the command that upgrades **already installed** packages. Predict: does this refresh the catalog alone?
8. Install a **disposable** package by **name**, not by `.deb` filename (or write the command you would run). Confirm it is present.
9. Remove it but leave config. Then remove it **and** config (purge). For each step, write the command first; run only if this is your machine and the package is disposable.
10. Verify there are no broken dependencies with the check subcommand from the notes.
11. Predict: `update` vs `upgrade` vs `install` — which changes the catalog vs what is on disk? Which takes a package **name** vs a `.deb` file?

## apt-cache (lookup only — always safe to run)

12. Search the cache with a regex for a known package family (e.g. `nginx` or `curl`).
13. Show the readable record for one package name.
14. Show general info (`showpkg`) and raw dependencies (`depends`) for the same name.
15. Predict: does `apt-cache` **install** anything? Prove by stating what family of tool it is (lookup vs change).

## sources

16. List the main list file and the drop-in directory (`ls` the paths from `commands.md`).
17. Read one `deb` (or `deb-src`) line and label each field: binary vs source, URL, release **codename**, **components** (`main` / `contrib` / `non-free`).
18. After adding a vendor list under `sources.list.d/`, what must you do before new package names exist? (Concept from the notes — write the command.)

## Red Hat column (recall + optional do)

19. Same ideas with the Red Hat high-level tool: search, install (disposable / write-only if needed), query the low-level database, remove. Map each step to the Debian command you already practiced.
20. Low-level only: write `rpm -i foo.rpm` vs `dpkg -i foo.deb` — when would you use these instead of yum/apt-get?

## Scenario

21. “Which package owns the remote-login daemon binary, and what version?” Answer with lookup tools only — no reinstall. On Debian-family: which package provides `sshd` / the binary path; show version from the readable record. On Red Hat-family: use the low-level query style you know (or write the commands if tools differ).
22. A teammate added a third-party `.list` under `sources.list.d/`, ran `install` immediately, and got “Unable to locate package.” Diagnose using only this topic (update vs install; where APT looks).
23. Fill a one-line cheat for yourself: `update` / `upgrade` / `install` / `remove` / `purge` / `check` / `search` / `show` / `depends` — six words or fewer each.
