# Commands to memorize

```bash
getenforce                       # Enforcing | Permissive | Disabled — mode right now
sestatus                         # longer status (policy, mode, config)
setenforce 1                     # enforcing now (only if SELinux is already enabled)
setenforce 0                     # permissive now — log but do not deny
cat /etc/selinux/config          # boot default: SELINUX= and SELINUXTYPE= (reboot to apply)

semodule -l | less               # policy modules loaded in memory
semanage boolean -l | less       # catalog of on/off policy switches (current, default)
getsebool ftpd_anon_write        # read one boolean
setsebool ftpd_anon_write on     # turn it on until reboot
setsebool -P ftpd_anon_write on  # -P = persist across reboot
```
