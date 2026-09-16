# Commands to memorize

```bash
ifconfig                         # state of interfaces that are up
ifconfig -a                      # all interfaces, including down
ifconfig eth0                    # one interface
ifconfig eth0 up                 # bring the interface up (down = disable)

ip address add 192.168.2.223/24 dev eth1     # add a static IPv4 (/24 = 255.255.255.0)
ip address add 192.168.4.223/24 dev eth1     # second address on the same NIC
ip addr show dev eth1                        # show addresses on eth1 (addr = address)

ip route add 192.0.2.1 via 10.0.0.2 dev eth0       # host route: this IP via this gateway
ip route add 192.0.2.0/24 via 10.0.0.3 dev eth0    # network route
ip route                                           # print routing table (look for default via)

service network restart          # reload ifcfg scripts (older RHEL / SysV)

cat /etc/sysconfig/network-scripts/ifcfg-eth0   # RHEL per-NIC: IP, mask, GATEWAY, ONBOOT, BOOTPROTO
cat /etc/sysconfig/network                      # RHEL global: NETWORKING, HOSTNAME (gateway deprecated here)
cat /etc/network/interfaces                     # Debian: auto/iface/address/netmask/gateway
cat /etc/hostname                               # Debian hostname
cat /etc/resolv.conf                            # DNS nameservers (both families)
cat /etc/nsswitch.conf                          # search order: files / dns / nis / ldap
```
