# Labs — Network configuration

**Where:** Rocky VM. Extra IP/route labs can break SSH — use the hypervisor console. Do not persist a wrong gateway on the only NIC you use for SSH.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck. Interface names may be `eth0`, `ens3`, or `enp0s3` — use `ip -br a`, not the notes’ `eth0`, if yours differs.

## Lab 1

Show interfaces with `ifconfig` and `ifconfig -a` (install `net-tools` if missing). Show addresses with `ip addr`. Print the route table (`ip route`).

## Lab 2

Read the distro config files that exist on this box: RHEL `ifcfg-*` and `/etc/sysconfig/network`, and/or Debian `/etc/network/interfaces`, plus `/etc/hostname`, `/etc/resolv.conf`, `/etc/nsswitch.conf`. Do not rewrite them in this lab.

## Lab 3

Add a **temporary** extra address on a spare NIC or as a second address on a lab interface (`ip address add …`). Show it. Remove it the same way (`ip address del`). Do not confuse this with a permanent `ifcfg` change.

## Lab 4

Print routes. Add a host route or network route only if you have a real next hop that will not blackhole your SSH. Delete the route when done. If unsure, skip adding routes and only read the table.

## Job and cert labs

## Lab 5 — static IP with NetworkManager (RHCSA)

`hostnamectl set-hostname lab.example.test`. With `nmcli`, set a connection to a **static** IPv4, prefix, gateway, and DNS that match your lab network (or a dummy address on a **second** NIC). `nmcli con up`. `ping` the gateway. Reboot and confirm. Put DHCP back if this is your SSH NIC and you are not sure.

## Lab 6

`nmcli con show`, `nmcli dev status`. Add a second IP on a connection (`+ipv4.addresses`). Remove it.

## Lab 7

Change DNS in `nmcli` (or `/etc/resolv.conf` if that is how this VM works). `dig` / `getent hosts`. Do not leave yourself without a resolver.

## Lab 8

Ticket: “server has no network after clone.” Compare MAC in the connection file with `ip link`. Fix or recreate the NM connection. Console if SSH dies.
