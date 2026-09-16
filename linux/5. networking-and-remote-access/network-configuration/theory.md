# Network configuration

Linux talks TCP/IP through **interfaces** (`eth0`, `ens9`, `lo`). You inspect and change them live with **`ifconfig`** (older) or **`ip`** (current). Persistent settings live in distro config files. Name lookup order is **`/etc/nsswitch.conf`**.

**Memory hook:** `ifconfig` / `ip` = **now**. `ifcfg-*` or `/etc/network/interfaces` = **after reboot**. `nsswitch.conf` = **where** to look up names (files vs DNS vs LDAP).

## ifconfig

Configure and control TCP/IP network interfaces. Common uses: set **IP and netmask**, **enable or disable** an interface.

```bash
ifconfig           # current state of interfaces that are up
ifconfig -a        # all interfaces, even if down
ifconfig eth0      # one interface
ifconfig eth0 up   # activate (down deactivates)
```

**Memory hook:** `-a` = even the sleeping NICs. `up`/`down` = cable logically on/off (not unplug).

`ifconfig` is legacy (net-tools). New docs and RHEL 7+ prefer **`ip`**. Know both for this course.

## ip address (static IPs)

```bash
ip address add 192.168.2.223/24 dev eth1
ip address add 192.168.4.223/24 dev eth1    # a NIC can have more than one address
ip addr show dev eth1
```

`/24` is CIDR for netmask `255.255.255.0`. `dev eth1` = which interface. `ip addr` = `ip address`.

Example output has two `inet` lines on the same NIC — both addresses are active.

These changes are **runtime**. They vanish on reboot unless you also write the distro config files.

**Memory hook:** `ip addr add IP/MASK dev IFACE`. `show` to verify. Add twice = two IPs on one card.

## ip route (static routes)

```bash
ip route add 192.0.2.1 via 10.0.0.2 dev eth0         # host route (/32)
ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0      # network route
ip route                                                 # print the table
```

`via` = next hop (gateway). `dev` = which NIC to send on.

```text
default via 10.0.0.10 dev ens9  proto static  metric 1024
192.168.122.0/24 dev ens9  proto kernel  scope link  src 10.0.0.1
```

**default** = default gateway (where unknown destinations go). `metric` = preference (lower usually wins).

**Memory hook:** `ip route add DEST via GATEWAY dev IFACE`. No dest match → **default via**.

## Default gateway (Red Hat scripts)

The default gateway is composed by network scripts that read:

1. **`/etc/sysconfig/network`** first
2. Then **`ifcfg-*`** files for interfaces that are **up**, in **numerically ascending** order

The **last `GATEWAY=`** that is read becomes the default route.

RHEL now **deprecates** putting the gateway only in the global `/etc/sysconfig/network` file. Put `GATEWAY=` in the **per-interface** `ifcfg-*` file instead.

```bash
service network restart      # apply ifcfg changes (SysV / older RHEL)
```

On systemd: `systemctl restart network` (or `NetworkManager`).

**Memory hook:** last `GATEWAY=` wins. Prefer `ifcfg-eth0`, not the global network file.

## Persistent files

### Red Hat based

| File | Role |
| --- | --- |
| `/etc/sysconfig/network-scripts/ifcfg-ethX` | Per-NIC: IP, mask, gateway, DHCP, on-boot |
| `/etc/sysconfig/network` | Global networking on/off, hostname (legacy gateway) |
| `/etc/resolv.conf` | DNS servers (`nameserver`) |

```text
DEVICE=eth0
IPADDR=208.164.186.1
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
ONBOOT=yes
BOOTPROTO=dhcp          # dhcp vs static (static would omit dhcp / set none or static)
```

`ONBOOT=yes` = bring up at boot. `BOOTPROTO=dhcp` asks DHCP; a static example would use `none`/`static` plus `IPADDR`.

### Debian based

| File | Role |
| --- | --- |
| `/etc/network/interfaces` | Interfaces, static/DHCP, gateway |
| `/etc/hostname` | Hostname (one line) |
| `/etc/resolv.conf` | DNS |

```text
auto lo eth0
iface eth0 inet static
address 192.168.0.10
netmask 255.255.255.0
gateway 192.168.0.1
```

**Memory hook:** RHEL = `ifcfg-eth0`. Debian = `interfaces` + `hostname`. Both still use **`resolv.conf`** for DNS.

## Name Service Switch (`/etc/nsswitch.conf`)

NSS decides **which sources** to query for databases: users, groups, hostnames, and more.

Sources you will see:

| Keyword | Meaning |
| --- | --- |
| `files` | Local files (`/etc/passwd`, `/etc/hosts`, …) |
| `dns` | DNS server |
| `nis` | NIS |
| `ldap` | LDAP |
| `db` | Database lookup |

**Order = search order.** First listed source is tried first.

```text
passwd:     files ldap
shadow:     files
group:      files ldap
hosts:      dns nis files
```

`hosts: dns nis files` → resolve a hostname via **DNS**, then NIS, then `/etc/hosts`.

**Memory hook:** `nsswitch.conf` = phone book index. `hosts:` line is why `ping myhost` might ignore `/etc/hosts` if `dns` comes first.
