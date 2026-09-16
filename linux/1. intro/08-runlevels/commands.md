# Commands to memorize

```bash
systemctl get-default                         # which target the machine boots into
systemctl set-default multi-user.target       # default = server (text + network, no GUI)
systemctl set-default graphical.target        # default = desktop GUI
systemctl set-default runlevel0.target        # default = poweroff — do not use on a real server
systemctl isolate multi-user.target           # switch to that target now; does not change default
```
