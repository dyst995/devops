# Assignments — Software management (APT)

Close `commands.md`. Type and run. `apt-get install` / `remove` / `purge` / `upgrade` change the system — **lab VM** or packages you are allowed to add. Prefer a small unused package for install/remove. `update` is safe; `upgrade` can change many packages — lab only if you mean it.

## Changing packages (`apt-get`)

### Easy

1. [ ] `sudo apt-get update`. Read the end of the output — lists refreshed, not a full upgrade.
2. [ ] `sudo apt-get check`. Any broken dependencies?

### Medium

3. [ ] Lab: `sudo apt-get install` a **small** practice package (not a whole desktop). Then `apt-cache show` it (next set) or `dpkg` if you already know it — otherwise just `ls` a binary it dropped (e.g. under `/usr/bin`).
4. [ ] `sudo apt-get remove` that package, then `sudo apt-get purge` if you want configs gone. What is the course difference? Do not purge packages you did not install.

### Hard

5. [ ] Someone ran `apt-get install nginx.deb` (filename as if it were the package name). Install by **package name** as taught. If nginx is too heavy, pick a tiny package. Remove it when done.
6. [ ] Combine: `update`, `check`, install practice package, `dpkg -L` only if you already know it — otherwise `find`/`ls` a file from the package, then `remove`/`purge`. Do not `upgrade` the whole VM unless the lab says so.

## Querying the cache (`apt-cache`)

### Easy

1. [ ] `apt-cache search` for a word you care about (e.g. `nginx` or `zip`).
2. [ ] `apt-cache show` one package from that list. Read the description and depends.

### Medium

3. [ ] `apt-cache depends` the same package. Then `apt-cache showpkg`. What extra do you get vs `show`?
4. [ ] Someone used `apt-cache search` with a regex that matches too much. Narrow the search string and pick one package to `show`.

### Hard

5. [ ] Before installing anything: `search` → `show` → `depends`. Decide if you still want it. Then install only on the lab and remove after.
6. [ ] Combine: `grep` a field inside `apt-cache show` output (pipe), or `less` the show text. `man apt-cache` if you forget a subcommand.

## Repo files (`sources.list`)

### Easy

1. [ ] `ls` `/etc/apt/sources.list` and `/etc/apt/sources.list.d/`.
2. [ ] `cat` `/etc/apt/sources.list` (may be almost empty on modern Ubuntu with only `sources.list.d`). Read a `deb` line: URL, release, components.

### Medium

3. [ ] `ls` the `.d` directory and `cat` one file there. Same `deb` shape?
4. [ ] Someone edited `sources.list` and `apt-get update` failed. Do **not** break yours. Read `update` errors if you have a lab snapshot; otherwise `cat` the files and say which line would be a bad URL.

### Hard

5. [ ] After `update`, `apt-cache search` a package that only exists if the repo is enabled. If search is empty, look back at `sources.list` components (`main`, etc.).
6. [ ] Combine: `ls -l` those files, `grep` `deb` lines, `apt-get update`, `apt-cache show` a package from that repo. Do not add random third-party repos on a shared host.
