# Labs — Software management

**Where:** Rocky VM for `rpm`/`dnf` (course: `yum`). Ubuntu WSL or a Debian VM for `apt-get`. Do not `upgrade` a production box; this is a lab VM.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1 — Debian family (WSL Ubuntu is enough)

Refresh package lists. Search the cache for `nginx`. Show the package record, `showpkg`, and `depends`. Install `nginx` (or another small package if you prefer). Remove it, then purge it. Run `apt-get check`. List `sources.list` and `sources.list.d`.

## Lab 2 — Red Hat family (Rocky VM)

Using `yum` or `dnf`: search, install a small package (for example `tree` or `httpd`), inspect it with `rpm -qi` / `rpm -ql`, remove it. Find where repo files live (`/etc/yum.repos.d/`).

## Lab 3

From memory, write the table: Red Hat vs Debian (package file, low-level tool, high-level tool). Check theory after. Do not fill this file in.

## Job and cert labs

## Lab 4

`rpm -qf $(command -v sshd)` (or `httpd`). `rpm -ql` that package | `head`. Ticket: “which package owns this binary?”

## Lab 5

`dnf provides /usr/bin/tree` (or another path). Install from the result. `dnf history` and `dnf history undo` the last transaction if you are comfortable rolling it back.

## Lab 6

Download an rpm (`dnf download` or copy a small rpm) and install it with `rpm -ivh` / `dnf localinstall`. Query it, then remove it.

## Lab 7

Disable a repo, try to install a package that lives there, re-enable. List repos (`dnf repolist`). Do not leave appstream disabled.
