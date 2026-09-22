# Assignments — SELinux

Close `commands.md`. Type and run. `setenforce 0` weakens enforcement — **lab VM**. Do not leave a shared host Permissive. `setsebool -P` persists across reboot — only for a boolean the lab tells you to change. `Disabled` in the config needs a **reboot** — do not disable SELinux on a machine you did not plan to.

## Mode (`getenforce`, `sestatus`, `setenforce`, `/etc/selinux/config`)

### Easy

1. [ ] `getenforce`. Write Enforcing, Permissive, or Disabled.
2. [ ] `sestatus`. Note policy and current mode. `cat /etc/selinux/config` — boot default `SELINUX=` vs what `getenforce` says now.

### Medium

3. [ ] Lab, SELinux **enabled**: `sudo setenforce 0`, `getenforce` (Permissive), then `setenforce 1` back to Enforcing. If Disabled, do **not** try to enable without the lab reboot plan.
4. [ ] Someone set `SELINUX=disabled` in the config and expected `getenforce` to change immediately. Course: reboot applies the file. Prove the file vs `getenforce` can differ.

### Hard

5. [ ] `sestatus` + `cat` config + `getenforce`. Three-line report: now, boot default, policy type. No mode change required.
6. [ ] Combine: `ls -l /etc/selinux/config`, `grep SELINUX` that file. Do not `setenforce 0` on a production-like VM and walk away.

## Booleans and modules (`semodule`, `semanage`, `getsebool`, `setsebool`)

### Easy

1. [ ] `semodule -l | less` — quit `less` after you see that modules have names. If `semodule` is missing, install policy tools only on the lab.
2. [ ] `getsebool ftpd_anon_write` (or another boolean from `semanage boolean -l | less` if ftpd is unknown).

### Medium

3. [ ] `semanage boolean -l | less` and find one boolean. Note current vs default columns.
4. [ ] Lab: `setsebool` that boolean `on` **without** `-P` (until reboot). `getsebool` to confirm. Set it back `off` unless the lab wants it on.

### Hard

5. [ ] Only if the lab asks to persist: `setsebool -P`. Otherwise skip `-P` and say what `-P` would do. `getsebool` after.
6. [ ] Broken: `setsebool ftpd_anon_write` without `on`/`off`. Fix. Combine `getenforce`: if Disabled, booleans may be irrelevant — do not fight the tools; record the mode.
