# Network configuration (study)

Linux talks TCP/IP through **interfaces** (`eth0`, `ens9`, `lo`). Inspect and change them live with **`ifconfig`** (older) or **`ip`** (current). Persistent settings live in distro config files. Name lookup order is **`/etc/nsswitch.conf`**.

`ifconfig` / `ip` = **now**. `ifcfg-*` or `/etc/network/interfaces` = **after reboot**. `nsswitch.conf` = **where** to look up names.

## Live: ifconfig and ip

**`ifconfig`** (net-tools, legacy): set **IP and netmask**, **enable or disable** an interface. RHEL 7+ prefers **`ip`**. Know both.

```bash
ifconfig           # interfaces that are up
ifconfig -a        # all, even if down
ifconfig eth0      # one interface
ifconfig eth0 up   # activate (`down` deactivates — logical, not unplug)
```

```bash
ip address add 192.168.2.223/24 dev eth1
ip address add 192.168.4.223/24 dev eth1    # a NIC can have more than one address
ip addr show dev eth1                       # addr = address
```

`/24` = netmask `255.255.255.0`. These changes are **runtime** — gone on reboot unless you write the distro files.

```bash
ip route add 192.0.2.1 via 10.0.0.2 dev eth0         # host route (/32)
ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0      # network route
ip route                                                 # print the table
```

`via` = next hop (gateway). `dev` = which NIC. **default** = where unknown destinations go. `metric` = preference (lower usually wins).

## Persistent files

Red Hat default gateway is composed by scripts that read **`/etc/sysconfig/network`** first, then **`ifcfg-*`** for interfaces that are **up**, in **numerically ascending** order. The **last `GATEWAY=`** wins. RHEL now **deprecates** putting the gateway only in the global network file — put `GATEWAY=` in the **per-interface** `ifcfg-*`. Apply on older RHEL: `service network restart`. On systemd: `systemctl restart network` (or `NetworkManager`).

### Red Hat

| File | Role |
| --- | --- |
| `/etc/sysconfig/network-scripts/ifcfg-ethX` | Per-NIC: IP, mask, gateway, DHCP, on-boot |
| `/etc/sysconfig/network` | Global on/off, hostname (legacy gateway) |
| `/etc/resolv.conf` | DNS (`nameserver`) |

```text
DEVICE=eth0
IPADDR=208.164.186.1
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
ONBOOT=yes
BOOTPROTO=dhcp          # dhcp vs static (`none`/`static` plus IPADDR)
```

### Debian

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

Both families still use **`resolv.conf`** for DNS.

## Name Service Switch (`/etc/nsswitch.conf`)

NSS decides **which sources** to query (users, groups, hostnames, …). **Order = search order.**

| Keyword | Meaning |
| --- | --- |
| `files` | Local files (`/etc/passwd`, `/etc/hosts`, …) |
| `dns` | DNS |
| `nis` | NIS |
| `ldap` | LDAP |
| `db` | Database lookup |

```text
hosts:      dns nis files
```

`ping myhost` might ignore `/etc/hosts` if `dns` comes first.
