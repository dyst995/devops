# Tasks — Network configuration

Close `theory.md`. Console if you change the SSH NIC.

## Warm-up / find

1. Show interfaces that are up. Show **all** including down. Show one interface. Bring one lab interface up/down only if it is not your SSH path.
2. Show addresses on one NIC. Add a temporary extra IPv4 with prefix length `/24`. Show it. Remove it. Second address on the same NIC as in the notes.
3. Print the routing table. Find default via. Add a **host** route and a **network** route only if you have a safe next hop; delete them. Predict host vs prefix.
4. Reload ifcfg-style networking the old RHEL/SysV way **only** if you know this VM uses it — or write what that does from the notes and skip on NetworkManager-only boxes.

## Config files (find and label)

5. RHEL per-NIC script: IP, mask, GATEWAY, ONBOOT, BOOTPROTO — read one ifcfg if present.
6. RHEL global network file: NETWORKING, HOSTNAME (gateway deprecated there).
7. Debian: interfaces file, hostname file.
8. Resolver file (both families). Name-service switch file: order of files / dns / nis / ldap.

## Repeat

9. Same fact three ways: “what is this box’s IPv4 on the primary NIC?” — legacy listing, modern address show, config file.

## Scenario

10. Hostname must persist as `lab.example.test`. Set it using this topic’s files/tools as they exist on this OS. Prove now and after reboot (or after re-read of hostname files).
11. Temporary second IPv4 for a test, then only the original remains.
