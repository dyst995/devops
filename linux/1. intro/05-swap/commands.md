# Commands to memorize

```bash
cat /proc/swaps              # which swap devices/files are active
free -h                      # RAM and swap usage, human-readable
```

## Swap as LVM LV (2G)

```bash
lvcreate VolGroup00 -n LogVol02 -L 2G                    # create 2G LV for swap
mkswap /dev/VolGroup00/LogVol02                          # format as swap (not mkfs)
# fstab: /dev/VolGroup00/LogVol02 swap swap defaults 0 0  # enable at boot
systemctl daemon-reload                                  # reread fstab into systemd
swapon -v /dev/VolGroup00/LogVol02                       # turn this swap on now
```

## Swap file (64 MB example)

```bash
dd if=/dev/zero of=/swapfile bs=1024 count=65536         # create 64MB empty file (64*1024 blocks)
mkswap /swapfile                                         # put a swap signature on it
chmod 0600 /swapfile                                     # not world-readable (may hold RAM secrets)
# fstab: /swapfile swap swap defaults 0 0
systemctl daemon-reload
swapon /swapfile                                         # activate now
```

## Remove swap file

```bash
swapoff -v /swapfile         # deactivate first — never rm an active swap file
# remove fstab line
systemctl daemon-reload
rm /swapfile                 # delete the file after it is off
```
