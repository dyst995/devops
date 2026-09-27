# Tasks — Network configuration

Close `theory.md`. Console if you change the SSH NIC. Prefer `show` / `cat` before any `add` / `up` / `down` / restart. Do the action or write the answer, then check yourself.

## Warm-up

1. In one sentence: what do interfaces (`eth0`, `ens9`, `lo`) carry, and which two tools inspect them live?
2. Memory hook from the notes: `ifconfig` / `ip` = **now**; `ifcfg-*` or `/etc/network/interfaces` = **after reboot**; `nsswitch.conf` = **where**?
3. Why does the course still teach `ifconfig` if RHEL 7+ prefers `ip`?

## ifconfig (live state)

4. Show interfaces that are **up**. Show **all** including down. Show **one** named interface.
5. Predict: what does `-a` add that bare `ifconfig` hides? Prove it.
6. Bring one **lab** interface up (and optionally down) **only if it is not your SSH path**. If every NIC is the SSH path, write the `up`/`down` commands you would use and skip the live change.
7. From memory: `up`/`down` = cable logically on/off — does that unplug the physical cable?

## ip address (runtime IPs)

8. Show addresses on one NIC with `ip addr show` (or `ip address show`) and `dev`.
9. Add a temporary extra IPv4 with prefix length `/24` on a **lab** NIC (or a safe unused address the lab allows). Show it. What does `/24` mean as a netmask?
10. Add a **second** address on the **same** NIC as in the notes. Show both `inet` lines. Remove both temporary addresses when done (`ip address del` / lab reset).
11. Predict: do `ip address add` changes survive reboot without writing distro config files? Write the answer before you reboot anything.

## ip route (static routes)

12. Print the routing table. Find `default via`. Which NIC does the default route use? What is `metric` for?
13. From memory: write a **host** route (`/32`-style single IP) and a **network** route (`/24`) using `via` and `dev`.
14. Add a host route and a network route **only if you have a safe next hop**; then delete them. If you do not, write the exact commands and predict host vs prefix without applying.
15. Memory hook: no dest match → where do packets go?

## Default gateway (Red Hat scripts)

16. From the notes: which two places compose the default gateway, and in what order? Which `GATEWAY=` wins when several interfaces are up?
17. Where does RHEL prefer `GATEWAY=` now — global `/etc/sysconfig/network` or per-interface `ifcfg-*`? Why is the global file deprecated for gateway?
18. Reload ifcfg-style networking the old RHEL/SysV way (`service network restart`) **only** if you know this VM uses it and you have a console — or write what that does from the notes and skip on NetworkManager-only boxes. On systemd, name the equivalent idea (`systemctl restart network` / NetworkManager) without restarting your only SSH path.

## Persistent files (find and label)

19. RHEL per-NIC script: `cat` one `ifcfg-*` if present. Label `DEVICE`, `IPADDR`, `NETMASK`, `GATEWAY`, `ONBOOT`, `BOOTPROTO` (or note which are missing). What does `ONBOOT=yes` mean? `BOOTPROTO=dhcp` vs static?
20. RHEL global network file: `cat /etc/sysconfig/network`. Find `NETWORKING`, `HOSTNAME`. Is gateway still supposed to live only here?
21. Debian: `cat /etc/network/interfaces` and `/etc/hostname` if present (or write the layout from the notes if this is RHEL-only). Label `auto`, `iface`, `address`, `netmask`, `gateway`.
22. Resolver file (both families): `cat /etc/resolv.conf`. What do `nameserver` lines do?
23. Name-service switch: `cat /etc/nsswitch.conf`. Find `hosts:`. Explain search order for `files` / `dns` / `nis` / `ldap`. Predict: if `hosts: dns files`, when is `/etc/hosts` ignored for a name that DNS answers?

## Repeat / distinguish

24. Same fact three ways: “what is this box’s IPv4 on the primary NIC?” — legacy listing (`ifconfig`), modern address show (`ip addr`), and the config file that would persist it (ifcfg or interfaces). Write the three answers.
25. Distinguish in one line each: runtime `ip addr add` vs writing `ifcfg-*` / `interfaces`; `resolv.conf` vs `nsswitch.conf`.

## Scenario

26. Hostname must persist as `lab.example.test`. Set it using this topic’s files/tools as they exist on this OS (RHEL global/`hostnamectl` idea vs Debian `/etc/hostname`). Prove **now** and after reboot (or after re-read of hostname files). Do not break SSH.
27. Temporary second IPv4 for a test, then only the original remains. Prove with `ip addr show` before and after cleanup. No leftover routes.
28. Ticket: “after clone, no IPv4 / wrong gateway.” Using only this topic, list the files and live commands you would check first (`ifconfig`/`ip`, `ip route`, ifcfg/`interfaces`, `resolv.conf`, `nsswitch` `hosts:`). Write the order; do not shotgun-edit.
