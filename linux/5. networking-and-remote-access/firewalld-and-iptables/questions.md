# firewalld and iptables — Questions

Cover the Answers section. Answer first, then check.

1. What does firewalld add on top of a plain packet filter (zones, IP versions, runtime vs permanent)?
2. Where does the **iptables service** store config vs **firewalld**? Why might `/etc/sysconfig/iptables` be missing on RHEL?
3. How does applying a change differ (flush all vs diff)? What happens to existing connections?
4. Recite the nine zones from least trust to most open, one phrase each.
5. drop vs block. public vs trusted. external vs internal. dmz.
6. `firewall-cmd --get-services` vs `--info-service=ftp`. What does `nf_conntrack_ftp` on ftp mean?
7. Panic on/off — what does it do? Why is it dangerous over SSH?
8. Why two zones (internal + external) for a gateway? Why masquerade only on **external**?
9. `--remove-masquerade` vs `--query-masquerade`.
10. What is port forwarding? What extra feature does it **require** (exam trap)?
11. Write the command to forward TCP 22 to 3753 on zone external (runtime).
12. `--permanent` without `--reload` — is the rule active now?

---

## Answers

1. Zones (trust per network/interface), IPv4+IPv6, bridges/IP sets, runtime vs permanent, API for apps to add rules.
2. iptables: `/etc/sysconfig/iptables` and `ip6tables`. firewalld: XML in `/usr/lib/firewalld/` and `/etc/firewalld/`. firewalld is default so the old iptables file may not exist.
3. iptables service reloads **all** rules (flush). firewalld applies **differences**. firewalld can change rules without dropping existing sessions.
4. drop · block · public · external · internal · dmz · work · home · trusted.
5. Silent drop vs ICMP reject. Untrusted/select incoming vs trust all. Gateway NAT outside vs inside LAN. Isolated hosts, limited incoming.
6. List service names. Show ftp details: **21/tcp** plus helper **nf_conntrack_ftp** so related FTP data ports can be tracked.
7. Drop all packets immediately / turn that off. Panic drops everything — including your SSH session.
8. LAN vs WAN. Masquerade on external so the internet sees the **firewall IP**, not RFC1918 internals. Runtime `--add-masquerade`; keep with `--permanent` and `--reload`.
9. Turn masquerade off · ask if it is on.
10. Send inbound traffic for a port to another IP/port. **Masquerading**.
11. `firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753`
12. No — permanent is on disk; runtime is unchanged until reload (or restart).
