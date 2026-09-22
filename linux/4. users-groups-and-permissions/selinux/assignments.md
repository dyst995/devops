# Assignments — SELinux

Close `commands.md`. Recite, then type. Prefer a Rocky/RHEL VM. Course labs often start **Disabled**. Changing `SELINUX=` needs a **reboot**; do not jump disabled → enforcing on a box you need. Temporary `setenforce` only works if SELinux is already enabled.

## `getenforce`

1. [ ] Print the mode **right now**. Recite the three possible words: Enforcing, Permissive, Disabled.
2. [ ] Recite the memory hook: enforcing = lock the door; permissive = write down who tried; disabled = no SELinux.
3. [ ] Predict: does this command print the **boot** default from the config file, or the **current** mode? Prove by comparing with the config file if they differ.
4. [ ] If the output is `Disabled`, recite that `setenforce 1` cannot enable it — config + reboot (and often relabel).
5. [ ] If the output is `Enforcing` or `Permissive`, recite that policy is **loaded**. Only enforcing **denies**.
6. [ ] Combine: print mode, then longer status. The short word must match the longer report.
7. [ ] Privilege: run as a normal user. Prove you do not need root to **read** the mode.
8. [ ] Wrong-usage: pass an extra argument. Predict usage / ignore / error on your distro.
9. [ ] Recite: this is the “short checker” from the notes.
10. [ ] After a temporary switch (if enabled), print mode again. Prove it changed without a reboot.
11. [ ] After you edit the config but **before** reboot, print mode. Predict it still shows the old live mode.
12. [ ] Recite DAC vs MAC in one sentence: even `chmod 777` can be denied for `httpd` if labels say no.
13. [ ] Predict missing SELinux userspace: command not found. This drill is not for stock WSL unless the tool exists.
14. [ ] Combine with `echo $?` — typically 0 when it successfully prints a mode.
15. [ ] Recite the table: which modes apply policy, which deny, which log.
16. [ ] If lab setup leaves it Disabled, write that word down as your checkpoint before any enable experiment.
17. [ ] Interview: “How do you see SELinux mode in one word?” This is the command.
18. [ ] Do not parse `/sys` by hand for this drill — use the tool.
19. [ ] Recite: Permissive still **logs**; Disabled does not make SELinux decisions.
20. [ ] Leave mode as the lab requires; do not “fix” Disabled unless the exercise is enable.

## `sestatus`

1. [ ] Print **longer** status: policy, mode, config. Recite at least three fields you see (status, current mode, config file).
2. [ ] If SELinux is off, find the line the notes mention (`SELinux status: disabled` or equivalent).
3. [ ] Compare “Current mode” vs “Mode from config file.” Recite: live vs boot default.
4. [ ] Note the policy type (`targeted` / `minimum` / `mls`) if shown. Recite what `targeted` means (confine usual daemons).
5. [ ] Privilege: run as a normal user. Prove lookup does not need root.
6. [ ] Combine: short checker word vs this report’s current mode — must agree.
7. [ ] Recite why this is better than the one-word tool when you need policy name and config path.
8. [ ] Wrong-usage: a bogus flag. Predict the error; do not keep guessing flags not on the cheat sheet.
9. [ ] After `setenforce` (only if already enabled), run this again. Current mode changed; config-file mode may not.
10. [ ] Recite: you **read** status here; you do not **set** mode.
11. [ ] If loaded, look for “Policy MLS status” / “Loaded policy name” if present. Recite one extra fact.
12. [ ] Predict: on Disabled, many fields are N/A or omitted. Describe what **your** box prints.
13. [ ] Combine with reading `/etc/selinux/config`: the config-file mode in status should match `SELINUX=`.
14. [ ] Recite the cheat-sheet comment: longer status (policy, mode, config).
15. [ ] Do not reboot just to refresh this output unless a lab requires enable/disable.
16. [ ] Interview: difference between the one-word tool and this one.
17. [ ] If `sestatus` is missing, recite you are on a non-SELinux userspace; skip remaining SELinux drills that need it.
18. [ ] Pipe through a pager only if the output is long. Recite you are still only reading.
19. [ ] Recite MAC: system policy, not the file owner, decides.
20. [ ] Leave the system as you found it.

## `setenforce`

**Warn:** switching to enforcing on a mislabeled box can break logins and daemons. Prefer permissive first. You **cannot** use this from fully Disabled.

1. [ ] Recite: `1` = enforcing **now**; `0` = permissive **now** — only if SELinux is already enabled.
2. [ ] Predict from Disabled: try (if you may) and prove it refuses. Recite config + reboot to enable.
3. [ ] If already enabled: switch to permissive. Prove with the short checker (`Permissive`) and that denials are not blocking.
4. [ ] Switch back to enforcing. Prove with the short checker. Recite this does **not** write `/etc/selinux/config`.
5. [ ] Privilege: as a normal user, try to set mode. Predict permission denied. Use root/sudo only when you intend to change it.
6. [ ] Recite: this is **temporary** until reboot (boot default comes from the config file).
7. [ ] Wrong-usage: `setenforce 2` or `setenforce yes` — predict what your distro accepts (`Enforcing`/`Permissive` words sometimes work; stick to 1 and 0 from the sheet).
8. [ ] Combine: set 0 → short checker → longer status current mode → set 1 → both checkers again.
9. [ ] Recite you cannot Disabled ↔ on with this tool.
10. [ ] Predict reboot after `setenforce 0` with `SELINUX=enforcing` in config: you come back **enforcing**.
11. [ ] Recite the safe enable path from the notes: config permissive, reboot, watch logs, then enforcing.
12. [ ] Do **not** use this as a “fix” for a denied web root — fix labels/booleans; enforcing must remain the success test in labs.
13. [ ] Combine with a boolean drill later: permissive to see AVC logs, then enforcing to prove the real fix.
14. [ ] Recite: permissive still **loads** policy and **logs**.
15. [ ] Missing operand: run with no 0/1. Predict usage message.
16. [ ] Interview: “How do you go permissive without editing the file?” This tool, if already enabled.
17. [ ] If the box must stay Disabled for the course lab, **do not** enable just to practice 1/0. Recite the predict-only answers.
18. [ ] After practice, leave current mode as the lab checkpoint (often Disabled or Enforcing as assigned).
19. [ ] Recite numeric: 1 and 0 from the cheat sheet — not a service restart.
20. [ ] Never `setenforce 0` on a production host as a permanent workaround.

## `cat`

1. [ ] Print `/etc/selinux/config`. Recite the two keys: `SELINUX=` (mode after reboot) and `SELINUXTYPE=` (policy).
2. [ ] Recite allowed `SELINUX=` values: enforcing, permissive, disabled — from the comments in the file.
3. [ ] Recite `SELINUXTYPE=` values from the notes: `targeted` (default), `minimum`, `mls`.
4. [ ] Predict: editing this file **without** reboot does not change `getenforce`. Prove if you have a lab that already differs, or recite the prediction.
5. [ ] Recite: on Red Hat, `/etc/sysconfig/selinux` is often the **same** file (symlink). If present, prove with a listing; still **read**, do not wreck it.
6. [ ] Privilege: read as a normal user. Prove typical world-readable.
7. [ ] Wrong-usage: `cat` a directory `/etc/selinux`. Predict “Is a directory.” List first.
8. [ ] Recite: change `SELINUX=` then **reboot** for enable/disable to fully apply.
9. [ ] Recite first-enable often needs a filesystem **relabel**. Do not relabel casually on a shared VM.
10. [ ] Combine: cat config, then longer status “Mode from config file.” They must match the `SELINUX=` line.
11. [ ] Do **not** set `SELINUX=enforcing` on a Disabled lab box unless the lab says to (and you have a snapshot).
12. [ ] Predict a typo `SELINUX=enforecing` — bad boot default. Recite: do not save typos; restore.
13. [ ] Recite `targeted` = jail the usual suspects (httpd, ftp, …), not every process.
14. [ ] Recite `mls` = multi-level security; rare on ordinary servers.
15. [ ] Combine with `setenforce`: live mode vs this file — two different knobs.
16. [ ] Wrong-usage: `cat` without the path (hangs on stdin). Cancel. Recite you need the config path.
17. [ ] If the file is missing, you are not on an SELinux policy distro. Recite that; skip writes.
18. [ ] Interview: “Where is the boot default?” This file.
19. [ ] Do not leave `SELINUX=` changed unless the lab requires it.
20. [ ] Close the file unchanged after reading, or revert if you edited for a drill.

## `semodule`

1. [ ] List policy **modules loaded in memory**. Recite this is not `ls /etc`.
2. [ ] Pipe the list to a pager (`less`). Recite why (long catalog). Quit the pager.
3. [ ] Recite: modules are pieces of policy; booleans are on/off switches **inside** policy (different command).
4. [ ] Privilege: list as a normal user if allowed; if denied, use root **read-only**.
5. [ ] Wrong-usage: omit `-l`. Predict help / other default. Recite `-l` means list.
6. [ ] Predict: this list does **not** install RPM packages; it is SELinux policy modules.
7. [ ] Combine: count roughly how many modules (`wc` if you want) — targeted policy is many small modules.
8. [ ] Recite you will **not** `-r` remove modules in this practice unless a lab says so (can break the box).
9. [ ] Find a name you recognize (`httpd`, `ftp`, …) in the list. Recite targeted policy confines those daemons.
10. [ ] Missing pager: list still works; `less` is only for reading.
11. [ ] If SELinux is Disabled, predict this may fail or be empty. Record what happens.
12. [ ] Interview: “How do you see loaded policy modules?” List flag + pager.
13. [ ] Recite: `semodule` vs `semanage` — modules vs (among other things) booleans catalog.
14. [ ] Do not pipe to `rm` or other destructive commands.
15. [ ] Combine with longer status: policy name vs module list — related but not the same output.
16. [ ] Wrong-usage: `-l` plus a fake module name. Note the error.
17. [ ] Recite the cheat-sheet pipeline: list, then page.
18. [ ] Predict: adding a third-party `.pp` is advanced; out of scope unless a lab.
19. [ ] Leave modules as loaded; no uninstall.
20. [ ] Exit the pager if you left it open.

## `semanage`

1. [ ] List the catalog of on/off **policy switches** (booleans): current and default. Pipe to a pager.
2. [ ] Recite the subcommand family from the cheat sheet: `boolean -l`.
3. [ ] In the listing, pick `ftpd_anon_write` (or another ftp-related boolean). Note current vs default columns.
4. [ ] Privilege: listing may need root on some distros. Predict; try as yourself first.
5. [ ] Recite: this catalog is **not** `getenforce`. Mode vs boolean are different knobs.
6. [ ] Wrong-usage: `semanage` with no subcommand. Predict help text.
7. [ ] Combine: find a boolean here, then read it with the one-boolean tool (`getsebool`). Values must agree.
8. [ ] Recite you can **read** with this list; **changing** a boolean is `setsebool` on the cheat sheet.
9. [ ] If Disabled, predict failure. Record it.
10. [ ] Search the paged list (less `/`) for `httpd`. Recite several httpd-related booleans exist on targeted policy.
11. [ ] Recite current vs default: default is what `-P` persist would align toward after reboot (concept).
12. [ ] Do not `semanage login` / fcontext in this file unless a later lab; this cheat sheet is booleans.
13. [ ] Interview: “Where is the boolean catalog?” This list.
14. [ ] Predict a huge list — that is why `less` is on the cheat sheet.
15. [ ] Wrong-usage: `boolean -l` typo `boolen`. Predict error.
16. [ ] Combine with `setsebool`: change one throwaway boolean (ftp anon write) only if you will set it back.
17. [ ] Recite MAC: booleans are admin/distro policy switches, not `chmod`.
18. [ ] Exit the pager.
19. [ ] Leave booleans at lab defaults if you are not in the setsebool section yet.
20. [ ] Recite the cheat-sheet comment: current, default.

## `getsebool`

1. [ ] Read **one** boolean (`ftpd_anon_write` from the sheet). Recite on/off (or true/false) in the output.
2. [ ] Predict: this does not change policy. Prove by reading twice.
3. [ ] Privilege: try as a normal user. Record if it works without root.
4. [ ] Wrong-usage: a boolean name that does not exist. Predict the error.
5. [ ] Missing operand: no boolean name. Predict usage.
6. [ ] Combine: catalog list → pick name → read one. Same value as the catalog’s current column.
7. [ ] Recite the cheat-sheet example name even if ftp is not installed — the boolean can still exist.
8. [ ] After `setsebool` on (until reboot), read again. Prove it flipped.
9. [ ] After persist (`-P`) or a reboot story, recite that this read shows **live** value.
10. [ ] Recite: get = read, set = write (next command).
11. [ ] If Disabled, predict error / off. Record.
12. [ ] Interview: “How do you read one switch without paging the whole catalog?”
13. [ ] Combine with mode: boolean on **and** enforcing still needed for the allow to matter.
14. [ ] Wrong-usage: `getsebool on` as if it were set. Recite get vs set.
15. [ ] Recite ftp anonymous write as the sheet’s example: what it **means** (anon FTP may write) even if you do not run vsftpd.
16. [ ] Read a second boolean (`httpd_can_network_connect` or similar if present) to prove the tool is general.
17. [ ] Do not grep `/sys` for this drill — use the tool.
18. [ ] Predict output format: `name --> on` or `off`.
19. [ ] Leave the boolean as you found it if you have not started the set drills.
20. [ ] Recite the cheat-sheet comment: read one boolean.

## `setsebool`

**Warn:** persistent `-P` writes policy; always set **back** both ways (live and persist) after practice. Prefer the sheet’s `ftpd_anon_write` and restore it.

1. [ ] Turn `ftpd_anon_write` **on until reboot** (no persist flag). Prove with the read tool.
2. [ ] Recite: without `-P` this is **not** guaranteed after reboot.
3. [ ] Turn it **on persistently** (`-P`). Recite `-P` = persist across reboot.
4. [ ] Read the catalog defaults/current if you can: persist should move the stored default toward on.
5. [ ] Set it **off** until reboot, then **off** with persist, so you do not leave FTP anon-write enabled.
6. [ ] Privilege: as a normal user, try to set. Predict denied. Use root only to set and to restore.
7. [ ] Wrong-usage: omit `on`/`off`. Predict usage.
8. [ ] Wrong-usage: a fake boolean name. Predict error; nothing persisted.
9. [ ] Recite get vs set vs persist: three sentences.
10. [ ] Combine: read → set on (temp) → read → persist on → read → persist off → temp off → read.
11. [ ] Predict: persist on, then `setenforce` — boolean is independent of enforcing/permissive.
12. [ ] Recite you still need correct **file labels** for many denials; a boolean is not a universal allow.
13. [ ] If Disabled, predict set fails. Do not force-enable to practice this.
14. [ ] Interview: “Make a boolean survive reboot.” The persist flag.
15. [ ] Recite the cheat-sheet: on until reboot vs `-P` on.
16. [ ] Do not persist random httpd booleans “just in case.”
17. [ ] After labs that needed a boolean, restore **both** live and persistent state to the original read-back.
18. [ ] Missing `-P` when you wanted persist: reboot would drop it. Recite that trap.
19. [ ] Combine with longer status: still Enforcing if the lab requires it — boolean change is not turning SELinux off.
20. [ ] Final prove: `getsebool ftpd_anon_write` matches the lab’s original value.
