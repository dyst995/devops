# Assignments — Network configuration

Close `commands.md`. Type and run. `ifconfig … up/down` and `ip address add` / `ip route add` change live networking — **lab VM**. Do not `down` the NIC you are using for SSH. Do not add routes that blackhole your default gateway. Config files: `cat` only unless the lab says to edit.

## `ifconfig`

### Easy

1. [ ] `ifconfig` (interfaces that are up). Note an address and a NIC name.
2. [ ] `ifconfig -a` and `ifconfig` on **one** interface name. What extra does `-a` show?

### Medium

3. [ ] Lab console (not the only SSH NIC): `ifconfig IFACE` then `up` if it was down. Do not `down` `eth0`/`ens*` you are logged in through.
4. [ ] Someone ran `ifconfig` and saw nothing (all down). Use `-a`. Combine `ip addr show` from the next set if `ifconfig` is missing — install only on the lab, or use `ip`.

### Hard

5. [ ] Compare `ifconfig` output to `cat /etc/resolv.conf` — one is L3 on the NIC, the other is DNS. Write both.
6. [ ] Combine: `ifconfig -a`, `ls /sys/class/net` if you want names, `ping` comes next topic. For now `echo` the IPv4 you would ping.

## `ip address` and `ip route`

### Easy

1. [ ] `ip addr show` on your main NIC (`dev NAME`). Read the `/24` (or other prefix).
2. [ ] `ip route` and find `default via`.

### Medium

3. [ ] Lab extra NIC or extra address: `ip address add` a **lab-approved** unused IP/`24` on that NIC. `ip addr show` to prove it. Remove it only if you already know `ip address del` — otherwise leave a note for the lab reset.
4. [ ] Someone ran `ip address add` without `dev`. Read the error. Then `ip route add` only a **lab** host route (`via` a real gateway). Do not replace the default route.

### Hard

5. [ ] `ip route` + `ip addr show`: which NIC is the default route using? Same as `ifconfig`?
6. [ ] Broken: `ip address add 192.168.2.223` without `/24`. Add the prefix as in the course if the lab IP plan allows. Combine `ping -c` after the tools topic; here just show the address.

## Persistent config files

### Easy

1. [ ] `cat` the RHEL-style `ifcfg-*` **or** Debian `/etc/network/interfaces` — whichever exists. `cat /etc/hostname` if present.
2. [ ] `cat /etc/resolv.conf` and `cat /etc/nsswitch.conf`. Where do nameservers come from? What is the `hosts:` line order?

### Medium

3. [ ] On RHEL-like: `cat /etc/sysconfig/network` and one `ifcfg-*`. Find `BOOTPROTO`, `ONBOOT`, `IPADDR`/`GATEWAY` if set.
4. [ ] Someone changed `resolv.conf` and DNS broke. `cat` it only. Do not point nameserver at `1.2.3.4` on a shared host.

### Hard

5. [ ] `service network restart` **only** on an older RHEL lab with a console. On systemd+NetworkManager boxes this may not be the tool — if it errors, stop. SSH users: skip restart.
6. [ ] Combine: `grep` `nameserver` in `resolv.conf`, `ip route`, `ifconfig`/`ip addr`. One paragraph: address, gateway, DNS, nsswitch `hosts` order. No live `ip address add` required.
