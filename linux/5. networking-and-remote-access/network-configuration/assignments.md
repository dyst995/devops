# Assignments — network configuration

Close `commands.md`. Recite, then type. Work on a **lab VM**. Do not disable the NIC you are using for SSH.

## `ifconfig`

1. [ ] Show the state of interfaces that are **up**. Name each interface and whether it has an IPv4 address.
2. [ ] Predict: will a **down** interface appear in that default listing? Then prove with the “all interfaces” form.
3. [ ] List **all** interfaces, including down ones. Find one that was missing from the up-only view (or confirm there is none).
4. [ ] Show **one** interface (use your lab NIC name if it is not `eth0`). Recite IP, netmask, and MAC before you explain them.
5. [ ] Predict what “UP” vs missing UP means on that interface. Point to the flag in the output.
6. [ ] On a **spare** NIC (not your SSH path), bring the interface **up**. Prove it appears in the up-only listing.
7. [ ] Disable that spare NIC (**down**). Prove it vanishes from the up-only listing but still appears in the all-interfaces listing.
8. [ ] Predict: `down` on the NIC carrying your SSH session — what happens to you? Do not test that on a remote-only VM.
9. [ ] Privilege: run the listing as a normal user. Does display work? Does **up/down** work without root?
10. [ ] Combined: up-only vs all vs one NIC vs bring-up. Four outcomes in one sitting on the spare interface.
11. [ ] Wrong usage: omit the interface name on **up**. What error? Recite the missing operand.
12. [ ] Predict: after **down**, do addresses you saw earlier still exist when you bring it **up** again? Prove on the spare NIC.
13. [ ] Human vs default: find the IPv4 address and broadcast in the one-NIC view. Convert the mask to CIDR in your head (`/24` = ?).
14. [ ] Compare two NICs (or one NIC up vs down). What fields stay the same (MAC) vs change (RUNNING)?
15. [ ] Predict: loopback — always up? Prove it is in the listing even when other NICs are down.
16. [ ] Recite from memory: default listing vs all vs one name vs up vs down. Type each once without looking.
17. [ ] If `eth0` does not exist, use the real name (`ens33`, `enp0s3`, …). Prove you can still target **one** interface by name.
18. [ ] Predict whether a **second address** you add with `ip` will show up here. Prove after the `ip` drills (or skip until then).
19. [ ] What if the binary is missing (some minimal images)? What is the modern equivalent family you will use next?
20. [ ] Cleanup: leave the spare NIC in the state the lab expects (up if it should be up). Confirm SSH still works.

## `ip`

1. [ ] On a **spare** NIC (not your SSH path), add a **static IPv4** with prefix `/24`. Predict the dotted mask (`255.255.255.0`) before you show it.
2. [ ] Show addresses on that device. Prove the new address is there. Recite that `addr` and `address` are the same object.
3. [ ] Add a **second** address on the **same** NIC (different prefix, as in the cheat sheet idea). Show both on one device.
4. [ ] Predict: two addresses on one NIC — one `dev` or two? Prove `show` lists both.
5. [ ] Wrong usage: add an address with no `dev`. What error? Recite the missing piece.
6. [ ] Privilege: add as a normal user. Exact failure? Then retry with rights.
7. [ ] Print the **routing table**. Find the **default via** line. Name the gateway and the device.
8. [ ] Predict: if there is no default via, can you reach the internet by name? One sentence; then look at the table.
9. [ ] Add a **host route** (one IP via a gateway on a device you control). Use documentation prefixes (`192.0.2.0/24` style) on a lab VM, not a real network you do not own.
10. [ ] Prove the host route appears in the table. Recite “this IP via this gateway”.
11. [ ] Add a **network route** (a `/24` via a gateway on a device). Prove it appears as a network, not a single host.
12. [ ] Predict host route vs network route: which matches more destinations? Point at both lines.
13. [ ] Combined: two addresses on one NIC + show + routing table. Do the new prefixes get connected routes automatically? Prove.
14. [ ] Wrong usage: `via` a gateway that is not on a connected network. Predict the error or silent failure; prove.
15. [ ] Recite from memory: add address, add second address, show device, host route, network route, print table.
16. [ ] Predict `/24` vs `/32` on an added address. What is the connected route in the table for each? Change only on a spare NIC.
17. [ ] What if `eth1` does not exist? List devices first; pick a real spare name. Never add routes that blackhole your default.
18. [ ] Human vs default: `ip` vs `ifconfig` for the same NIC — same IPv4? Note extra addresses `ifconfig` might hide or show.
19. [ ] Predict: addresses added this way vs ifcfg files — survive `service network restart` / reboot? (Prove in the `service` section or say the prediction.)
20. [ ] Cleanup: delete the extra addresses and lab routes you added. Show the device and table so only the original config remains. Confirm SSH.

## `service`

1. [ ] Recite what **network restart** does on older RHEL / SysV: reload **ifcfg** scripts. Predict who is interrupted (DHCP lease, SSH).
2. [ ] On a **lab VM with console**, restart the network service. Prove interfaces come back. Do **not** do this as the only test on a remote SSH session you cannot recover.
3. [ ] Privilege: try as a normal user. Exact denial? Then with root.
4. [ ] Predict: temporary `ip address add` lines — still there after restart? Prove (they should vanish if ifcfg does not list them).
5. [ ] Predict: ifcfg `ONBOOT=no` NIC — up or down after restart? Check the file first, then restart only if you have console.
6. [ ] Wrong usage: `service network` with no action. What does it print?
7. [ ] Combined: change nothing; restart; compare routing table default via before vs after. Same gateway?
8. [ ] What if the box is **systemd-only** and `service` is a wrapper? Recite the equivalent unit name you would use (`network` / `NetworkManager`). Do not disable NetworkManager on a cloud VM.
9. [ ] Predict SysV `service` vs `systemctl restart`: same ifcfg reload idea? One sentence.
10. [ ] Human vs default: after restart, `ifconfig` up-only vs `ip` show — same addresses as ifcfg?
11. [ ] Recite the ifcfg keys you expect to be applied: IP, mask, GATEWAY, ONBOOT, BOOTPROTO. Then cat the file (next section) and match.
12. [ ] Predict `BOOTPROTO=dhcp` vs `none`/`static` after restart: who assigns the address?
13. [ ] What if `/etc/sysconfig/network-scripts/` is missing (Debian)? Predict the error or “no such service”. Do not force a RHEL command on the wrong family.
14. [ ] Danger: restart while panic-on or with a broken ifcfg GATEWAY. Why you want a console. Do not break GATEWAY on a remote-only VM.
15. [ ] Prove hostname vs IP after restart: can you still resolve names (`resolv.conf` still used)?
16. [ ] Combined: spare NIC down in ifcfg vs you brought it up by hand — after restart, which state wins?
17. [ ] Recite: this is **not** `firewall-cmd --reload`. Different subsystem. One sentence.
18. [ ] Predict: existing SSH session through the restarted NIC — drop or survive? Note what you observe (lab console ready).
19. [ ] If restart fails, read the error. Do not loop-restart. Restore ifcfg from backup if you edited it.
20. [ ] Cleanup: lab network matches the original ifcfg. SSH/console still works. No leftover extra IPs.

## `cat`

1. [ ] Show the **RHEL per-NIC** file for your primary interface (name may not be `eth0`). Recite IPADDR / PREFIX or NETMASK, GATEWAY, ONBOOT, BOOTPROTO from the file.
2. [ ] Predict: if `ONBOOT` is `no`, will that NIC be up after boot? Match to what `ifconfig` showed.
3. [ ] Predict `BOOTPROTO=dhcp` vs static: which fields might be empty or ignored? Point at them.
4. [ ] Show the **RHEL global** network file. Recite NETWORKING and HOSTNAME. Note that **gateway here is deprecated**.
5. [ ] Predict: hostname in that global file vs `hostname` command vs `/etc/hostname` — which one did this host actually use?
6. [ ] What if `/etc/sysconfig/network-scripts/ifcfg-*` does not exist? You are probably not on RHEL-style networking. Say so and skip to Debian files.
7. [ ] Show **Debian** `/etc/network/interfaces` if present. Recite `auto` / `iface` / `address` / `netmask` / `gateway`. If missing, predict “No such file”.
8. [ ] Show `/etc/hostname`. Compare to `hostname` output. Same string?
9. [ ] Show `/etc/resolv.conf`. List nameserver lines. Predict: who rewrites this file (DHCP, NetworkManager, systemd-resolved stub)?
10. [ ] Predict: empty `resolv.conf` — ping by name vs by IP? Prove with a name lookup only if the lab allows outbound DNS.
11. [ ] Show `/etc/nsswitch.conf`. Find the `hosts:` line. Recite search order: **files** / **dns** / **nis** / **ldap**.
12. [ ] Predict: `hosts: files dns` vs `hosts: dns files` — which wins for a name in `/etc/hosts`? Prove with a throwaway hosts entry if you may edit it; revert.
13. [ ] Combined: ifcfg GATEWAY vs routing table default via. Same next hop?
14. [ ] Combined: resolv nameserver vs `nslookup` resolver (next topic). Predict they match.
15. [ ] Wrong usage: cat a directory (`network-scripts`). What happens? Recite the error.
16. [ ] Privilege: which of these files are world-readable? Prove you can read them as a normal user (or cannot).
17. [ ] Human vs default: do not confuse `/etc/sysconfig/network` (global) with `ifcfg-*` (per NIC). One difference: where GATEWAY belongs now.
18. [ ] Recite from memory the six paths: RHEL ifcfg, RHEL global, Debian interfaces, hostname, resolv, nsswitch. Type each cat without looking.
19. [ ] What if you are on a live lab that uses NetworkManager keyfiles instead? Still cat ifcfg if it exists; note when the file is a stub.
20. [ ] Do **not** rewrite these files blindly on a remote VM. Read-only drills unless the lab asks for a persistent change.
