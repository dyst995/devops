# Network configuration — Questions

Cover the Answers section. Answer first, then check.

1. What is `ifconfig` for? Name two common uses from the notes.
2. `ifconfig` vs `ifconfig -a` vs `ifconfig eth0` vs `ifconfig eth0 up`.
3. Why learn `ip` if `ifconfig` still works?
4. Add two static addresses to `eth1` and show them. What does `/24` mean?
5. Are `ip address add` changes still there after reboot? How do you make them persist on RHEL vs Debian?
6. Add a host route and a network route with `ip route`. What do `via` and `dev` mean?
7. What is the **default** route? Command to print the table.
8. On RHEL, which files are parsed for `GATEWAY=`, in what order, and which value wins?
9. Why should you put `GATEWAY=` in `ifcfg-*` rather than only `/etc/sysconfig/network`?
10. Command to apply ifcfg changes on older RHEL (`service …`).
11. Recite the three Red Hat network files and the three Debian ones.
12. In `ifcfg-eth0`, what do `ONBOOT` and `BOOTPROTO` do?
13. Decode the Debian `iface eth0 inet static` stanza (address, netmask, gateway).
14. What is NSS? What do `files`, `dns`, `nis`, `ldap` mean?
15. `hosts: dns nis files` — which source is tried first for hostnames? Why might `/etc/hosts` seem “ignored”?

---

## Answers

1. Configure/control TCP/IP interfaces. Set IP/netmask; enable or disable an interface.
2. Up interfaces · all including down · one NIC · activate that NIC (`down` deactivates).
3. `ifconfig` is legacy; `ip` is the modern replacement (`ip addr`, `ip route`).
4. `ip address add 192.168.2.223/24 dev eth1` and `…4.223/24…`; `ip addr show dev eth1`. `/24` = 255.255.255.0.
5. No — runtime only. RHEL: `ifcfg-ethX`. Debian: `/etc/network/interfaces`.
6. `ip route add 192.0.2.1 via 10.0.0.2 dev eth0` · `ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0`. Next hop · which interface.
7. Where packets go if no more specific route matches. `ip route`.
8. `/etc/sysconfig/network` first, then `ifcfg-*` of **up** interfaces, numerically ascending. **Last** `GATEWAY=` wins.
9. Global file is deprecated on RHEL; gateway belongs in the per-interface file.
10. `service network restart`
11. RHEL: `ifcfg-ethX`, `/etc/sysconfig/network`, `/etc/resolv.conf`. Debian: `/etc/network/interfaces`, `/etc/hostname`, `/etc/resolv.conf`.
12. Bring up at boot · how to get an address (`dhcp` vs static/`none`).
13. Static IPv4 `192.168.0.10/255.255.255.0`, default gateway `192.168.0.1`, auto-start with `lo`.
14. Name Service Switch — which databases to use for passwd/hosts/…. Local files · DNS · NIS · LDAP.
15. DNS first. If DNS answers (even wrongly), `files` (`/etc/hosts`) may never be consulted.
