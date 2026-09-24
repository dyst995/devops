# Commands to memorize

```text
# graph driver = handles the layer graph (Tomcat does not)

VFS           no Union FS / CoW; test only; poor performance
AUFS          default Ubuntu/Debian; shared pages; no quota
overlay2      preferred, all supported distros; no extra config; inode fix
DeviceMapper  block devices; must tune; libdevmapper; OK on RHEL
Btrfs         needs btrfs at graph root (/var/lib/docker); not RHEL; quota 1.12+

# practice → overlay2
# production → DeviceMapper (prepared device) or Btrfs (btrfs FS)
```
