# Tasks — Software management

Close `theory.md`. Use Debian tools on Ubuntu/WSL; know the Red Hat column even if you only have Rocky.

## Warm-up (families)

1. From memory: fill package file, low-level tool, high-level tool for Red Hat vs Debian.
2. What does low-level vs high-level mean (single file vs repos + deps)?
3. Interview line: yum is to rpm as ? is to ?
4. Expand RPM, YUM, APT, `.deb` naming story (Debra). Newer RHEL high-level name vs what this course says.

## apt-get (construct — do not type the subcommand in the task text as a giveaway; describe the job)

5. Refresh what the repositories **offer** without upgrading software. Then prove installed versions did not all jump.
6. Upgrade **already installed** packages.
7. Install a package by **name**, not by `.deb` filename.
8. Remove it but leave config. Remove it **and** config. Verify no broken dependencies.
9. Predict: `update` vs `upgrade` vs `install` — which changes the catalog vs the disk?

## apt-cache (lookup only)

10. Search the cache with a regex. Show the readable record. Show general info. Show raw dependencies. Predict: does this family **install** anything?

## sources

11. List the main list file and the drop-in directory. Read one `deb` line and label: binary vs source, URL, release codename, components (`main` / `contrib` / `non-free`).
12. After adding a vendor list, what must you do before new package names exist? (Concept from the notes.)

## Repeat on Rocky if you have it

13. Same ideas with the Red Hat high-level tool: search, install, query the low-level database, remove.

## Scenario

14. “Which package owns the remote-login daemon binary, and what version?” Answer without reinstalling.
