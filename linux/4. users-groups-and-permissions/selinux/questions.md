# SELinux — Questions

Cover the Answers section. Answer first, then check.

1. What do SELinux and MAC/DAC stand for? How does MAC sit relative to DAC?
2. Even with `chmod 777`, why might `httpd` still be denied a file under SELinux?
3. Name the three modes. For each: is access denied? are violations logged?
4. Why use **permissive** before **enforcing**?
5. Commands to see the current mode (short and detailed). What do they show when SELinux is off?
6. Main config file? Red Hat alias path? Which two variables matter?
7. Recite `SELINUXTYPE` values: `targeted`, `minimum`, `mls`.
8. Steps to **enable** (course order) and to **disable**. What is required after editing the file?
9. Can you go from **disabled** to enforcing with only `setenforce 1`?
10. Command to list loaded policy **modules**.
11. What is a SELinux **boolean**? Commands to list all, read one, and turn `ftpd_anon_write` on.
12. `setsebool` vs `setsebool -P`.
13. `getenforce` vs `sestatus` vs `/etc/selinux/config` — runtime vs boot default.

---

## Answers

1. Security-Enhanced Linux. Mandatory Access Control on top of Discretionary Access Control. DAC is owner/chmod; MAC is system policy labels, both must allow.
2. Policy can still forbid that **process type** from using that **file type**, regardless of rwx.
3. Enforcing: deny + log. Permissive: allow + log. Disabled: no policy, no SELinux denials/logs.
4. You see what **would** be blocked (audit logs) without breaking the service.
5. `getenforce` → `Disabled`. `sestatus` → `SELinux status: disabled`.
6. `/etc/selinux/config`. Often `/etc/sysconfig/selinux`. `SELINUX=` and `SELINUXTYPE=`.
7. Targeted processes protected · smaller targeted set · Multi-Level Security.
8. Set `SELINUX=permissive`, reboot; then `enforcing`, reboot. Disable: `SELINUX=disabled`, reboot.
9. No. Disabled means no policy loaded; enable via config + reboot (then you can `setenforce` between enforcing/permissive).
10. `semodule -l` (pipe to `less`).
11. On/off policy toggle. `semanage boolean -l` · `getsebool ftpd_anon_write` · `setsebool ftpd_anon_write on`
12. Without `-P`: until reboot. `-P`: write persistently.
13. First two = **now**. Config file = **after reboot** (unless you also `setenforce`).
