# Commands to memorize

```bash
/etc/init.d/nginx start          # SysV script: start the service
/etc/init.d/nginx stop
/etc/init.d/nginx restart
/etc/init.d/nginx reload         # reread config without a full stop
/etc/init.d/nginx force-reload

systemctl start name.service     # start now (systemd)
systemctl stop name.service
systemctl restart name.service
systemctl reload name.service    # reload config if the unit supports it
systemctl status name.service    # running? recent logs?
systemctl is-active name.service # exit 0 if active
systemctl enable name.service    # start at boot (uses [Install] WantedBy)
systemctl disable name.service   # do not start at boot
systemctl daemon-reload          # after you edit a unit file
systemctl list-units --type service --all   # all service units, even inactive
```
