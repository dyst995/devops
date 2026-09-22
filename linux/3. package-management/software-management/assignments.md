# Assignments — software management

Close `commands.md`. Recite, then type. Prefer a lab VM. **`purge` removes package config files** — use a throwaway package, not a service you need.

## `apt-get`

1. [ ] Refresh package **lists** from the repositories without upgrading installed software. Prove installed versions did not all jump (`dpkg -l` sample, or note the output said “Hit/Get” lists, not “Unpacking”).
2. [ ] Recite: that refresh is **not** an upgrade. Interview line: catalog vs disk.
3. [ ] Upgrade **already installed** packages. Recite that this does not install brand-new names you never had (unless the tool reports new deps).
4. [ ] Predict `update` vs `upgrade`: which changes the index, which changes on-disk packages?
5. [ ] Install a package by **package name**, not by `.deb` filename. Recite: you type `nginx`, not `nginx.deb`.
6. [ ] After install, prove the files exist (binary on `PATH` or `dpkg -L` a few paths).
7. [ ] Remove the package but leave configuration. Recite that configs **may stay**.
8. [ ] **Warn:** purge that throwaway package so configs go too. Recite: purge = package **and** its config files. Do **not** purge a package whose config you need (sshd, your editor, the desktop).
9. [ ] After remove vs after purge, look for leftover files under `/etc` for that package. Predict which operation leaves them.
10. [ ] Verify there are **no broken dependencies** (the check subcommand). Recite what “broken” means here (unsatisfied Depends).
11. [ ] Privilege: run install **without** root. Predict permission denied / “could not open lock.” Then use sudo (or root) only if you intend to install.
12. [ ] Wrong-usage: pass a `.deb` filename to install-by-name. Predict: “unable to locate package” vs `dpkg -i` territory.
13. [ ] Combine: refresh lists → install a tiny throwaway → check deps → remove (keep config) → purge. Prove each step.
14. [ ] Recite the six subcommands from the cheat sheet in order of a typical story: refresh, upgrade, install, remove, purge, check.
15. [ ] Predict: `upgrade` with a stale index (skip refresh). Might you miss newer versions? Why refresh first?
16. [ ] Recite low-level vs high-level: this tool talks to **repos** and then calls `dpkg`. You are not running `rpm` here.
17. [ ] If you are on Rocky/RHEL for this hour, recite the yum/dnf equivalents of refresh / install / remove; still know the apt-get names for the exam.
18. [ ] Predict missing package name on install. What usage or error do you get?
19. [ ] After a failed install (break it with a fake name), run the dependency check. Recite that check does not install anything.
20. [ ] Leave the box without extra throwaway packages, or keep only what the lab needs. If you purged, you accepted config loss.

## `apt-cache`

1. [ ] Search the package cache with a **regex** for a name you know (web server). Recite: this family **does not install**.
2. [ ] Show the **readable record** for one package (description, version, deps in prose).
3. [ ] Show **general info** for one package (the denser “showpkg” view). Recite how it differs from the readable record.
4. [ ] Show the **raw dependency list** for that package. Name at least one Depends line.
5. [ ] Predict: search vs show vs showpkg vs depends — which one is “find names,” which is “read the card,” which is “edges in the graph”?
6. [ ] Run a search that matches many packages. Recite that the argument is a regex, not only a literal name.
7. [ ] Wrong-usage: depends on a name that is not in the cache. Predict the error. Fix by refreshing lists with apt-get, then retry.
8. [ ] Privilege: run these lookups as a normal user. Prove you do **not** need root to query the cache.
9. [ ] Combine: search → pick a name → readable record → general info → raw depends. Same package all the way.
10. [ ] Predict: does `apt-cache install` exist? Try a fake subcommand. Recite: cache tool looks up; get tool changes the system.
11. [ ] After `apt-get update`, search again for a name that previously failed. Recite why a fresh index matters for cache queries.
12. [ ] Recite: binary cache vs the text `sources.list` — this command reads the **cache**, not the list file directly.
13. [ ] Compare `show` Version field with what `dpkg -l` says if the package is installed. Same or different (candidate vs installed)?
14. [ ] From `depends`, predict whether removing a package would drag others (reverse is not this subcommand — just reason about Depends).
15. [ ] Search with a regex that is too broad (single letter). Predict a flood. Narrow it.
16. [ ] Recite the four cheat-sheet subcommands from memory, then run each once on `nginx` or another name.
17. [ ] Predict missing operand: `search` with no pattern. What happens?
18. [ ] Showpkg on a virtual package or a name with providers if you find one. Recite “provides” as extra general info.
19. [ ] Pipe a long `depends` or `search` to a pager if needed. Recite that you are still only reading.
20. [ ] Interview: “Does apt-cache change the disk?” Answer no; name the apt-get verbs that do.

## `sudo`

1. [ ] Recite: this prefix runs **one command** as root (or another user) and asks for **your** password, not root’s (typical sudoers).
2. [ ] Run a harmless package-list refresh **with** this prefix. Prove it succeeded (or that you are in sudoers).
3. [ ] Run the same refresh **without** it. Predict lock / permission error on APT.
4. [ ] Predict wrong-usage: `sudo` with no command. What happens (usage vs root shell, depending on distro)?
5. [ ] Recite why APT writes under `/var/lib/apt` and `/var/cache/apt` need privilege.
6. [ ] Combine: `sudo` + apt-get update, then **without** sudo run apt-cache search. Recite which step needed root.
7. [ ] Privilege: a user **not** in sudoers tries the prefix. Predict the mail-to-root / “not in sudoers” message. Do not lock yourself out.
8. [ ] Recite: `sudo apt-get` vs logging in as root — same disk changes, different audit (your name in logs).
9. [ ] After a correct password, a second sudo within the timeout may not ask again. Predict that; prove with two quick privileged commands.
10. [ ] Recite `-u` (run as another user) even if the cheat sheet only shows default root. Do not use it to attack another account.
11. [ ] Predict: `sudo apt-cache show` — unnecessary but should work. Recite that lookups did not need it.
12. [ ] Wrong-usage: sudo only the inner word (`apt-get` forgotten). Predict “command not found” for a subcommand name.
13. [ ] Recite the cheat-sheet pattern: every **mutating** apt-get line in the notes is prefixed; cache and `ls`/`cat` of sources are not.
14. [ ] If `sudo` asks for a password and you cancel, predict exit status non-zero and no package change.
15. [ ] Combine with purge **only** on a throwaway: you need this prefix. Recite the config-loss warning again.
16. [ ] Recite `/etc/sudoers` is the policy file; you do not edit it in this drill (use `visudo` in the editors topic if at all).
17. [ ] Predict: root shell via `sudo su` vs one-shot `sudo apt-get`. When is a full root shell overkill for one install?
18. [ ] Try `sudo -k` (if available) to forget cached credentials, then a privileged command — password asked again.
19. [ ] Recite: Ubuntu/Debian desktops often have the first user in sudoers; Rocky may use `wheel`. Check `groups` for yourself.
20. [ ] Do not leave a root shell open on a shared VM. Exit if you opened one.

## `ls`

1. [ ] List the **main** APT list file **and** the drop-in directory in one invocation. Recite both paths from memory.
2. [ ] Predict: the main path is a **file**; the drop-in path is a **directory**. Prove with the listing (no slash vs trailing `/` or `ls -ld` if you need).
3. [ ] List only the drop-in directory’s contents. Recite that vendor snippets often live here as `*.list`.
4. [ ] If the drop-in dir is empty, recite that Ubuntu still may have only `sources.list` or `ubuntu.sources` (newer format). Describe what you actually see.
5. [ ] Privilege: list those paths as a normal user. Prove `/etc/apt/` is readable for listing on a typical box.
6. [ ] Wrong-usage: list a typo path. Predict “No such file.”
7. [ ] Recite: this listing answers “where APT looks for repos,” not “what packages exist.”
8. [ ] After someone adds a vendor `.list` in the drop-in dir, list again. Prove the new file is visible **before** `apt-get update` (the file exists; the cache may not know packages yet).
9. [ ] Combine: list the two locations, then refresh package lists. Recite that new files need update before `apt-cache search` finds new names.
10. [ ] Predict missing operand: `ls` with no paths lists **cwd**, not sources. Always pass the APT paths for this drill.
11. [ ] Use long listing on the main file: owner, mode, size. Recite who may edit it (root).
12. [ ] List `/etc/apt/` itself. Name `sources.list`, `sources.list.d`, and `apt.conf.d` if present — which one is the cheat-sheet pair?
13. [ ] Recite Debian vs Ubuntu: same paths. If you are on RPM, recite that this `ls` is the Debian story; yum uses `/etc/yum.repos.d/`.
14. [ ] Predict: `sources.list.d` without the final slash vs with — same directory listing?
15. [ ] If a `*.sources` (DEB822) file appears instead of classic `deb` lines, still list it; recite that APT can use either format.
16. [ ] Combine with `test -f` / `test -d` in your head: prove you know file vs directory before you `cat` a directory by mistake.
17. [ ] Recite the cheat-sheet comment: these two paths are **where APT looks**.
18. [ ] List with a glob of `*.list` inside the drop-in dir. Predict if `*.sources` files are excluded.
19. [ ] Wrong-usage: `ls` a package name (`nginx`). Recite that this is not `apt-cache search`.
20. [ ] Do not delete or rename these files in this section.

## `cat`

1. [ ] Print the **main** repo list file. Recite that you are reading `deb` (or DEB822) stanzas, not installing.
2. [ ] On a classic `deb` line, label: binary vs source (`deb` vs `deb-src`), URL, release/codename, components (`main` / `universe` / `contrib` / `non-free`).
3. [ ] Predict: `deb-src` lines — do they install binary packages by themselves? Recite they enable source packages.
4. [ ] Privilege: read the file as a normal user. Prove it is world-readable on a typical install.
5. [ ] Wrong-usage: `cat` the drop-in **directory**. Predict “Is a directory.” List it first, then cat a file inside.
6. [ ] If the main file is a stub that says “see `.sources`,” open that file instead and still label URI, suite, components.
7. [ ] Recite: after you **edit** this file (do not, unless a lab says so), you must refresh package lists before new names exist.
8. [ ] Combine: cat the main file, then ls the drop-in dir, then cat one snippet. Recite APT merges all of them.
9. [ ] Predict a commented line (`#`). Does APT use it? Recite comments are ignored.
10. [ ] Find the release codename (jammy, bookworm, …). Recite it is not the same as the archive URL host.
11. [ ] Recite components: `main` vs extra pockets on Debian (`contrib`, `non-free`) / Ubuntu (`universe`, `restricted`, `multiverse`) at a high level.
12. [ ] Wrong-usage: cat `/etc/apt/sources.list.d` without picking a file. Fix.
13. [ ] Compare a `deb` line’s URL with what `apt-cache policy` (if you know it) would show — optional; at least recite URL + suite + components.
14. [ ] Predict missing file (you `cat` a path you invented). “No such file.”
15. [ ] Recite you do **not** `cat` `/etc/passwd` here — this topic’s `cat` is the APT list.
16. [ ] If the file is empty or all comments, predict: `apt-get update` may do little until another source exists in the drop-in dir.
17. [ ] Do **not** paste third-party repos from random websites. Recite supply-chain risk; only cat what is already on the VM.
18. [ ] Combine with sudo: you needed root to **edit**, not to **read**. Prove read without sudo.
19. [ ] Recite the cheat-sheet comment: main repo list = deb URL, release, components.
20. [ ] Leave the file unchanged. If a lab required an edit, refresh lists and then restore per the lab.
