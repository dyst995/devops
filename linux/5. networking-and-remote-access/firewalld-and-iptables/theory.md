# firewalld and iptables

The **firewalld** daemon provides a **dynamically managed** firewall. It uses network **zones** to assign a **level of trust** to a network and to the **connections and interfaces** in that network.

It supports:

- **IPv4 and IPv6** firewall settings
- Ethernet **bridges**
- **IP sets**
- **Runtime** configuration (active now) separate from **permanent** configuration (on disk, for after reboot / `--reload`)
- An interface so **services or applications** can add firewall rules directly (you do not have to edit iptables by hand)

A zone is bound to an interface (or a source address). Traffic arriving on that interface is handled with that zone’s trust level: which services are open, whether NAT applies, and so on.

**Memory hook:** zone = “how much do I trust this NIC / this network?” Runtime = now. Permanent = XML on disk. `--permanent` then `--reload` copies disk → runtime.

## Comparison: firewalld vs system-config-firewall and iptables

Older RHEL used the **iptables service** (and the **system-config-firewall** GUI, which wrote the same files). firewalld replaces that model.

### Where configuration lives

| System | Files |
| --- | --- |
| **iptables service** | `/etc/sysconfig/iptables` (IPv4) and `/etc/sysconfig/ip6tables` (IPv6) — one big rule dump |
| **firewalld** | XML files in **`/usr/lib/firewalld/`** (stock defaults shipped with the package) and **`/etc/firewalld/`** (your overrides: zones, services, …) |

On **Red Hat Enterprise Linux**, firewalld is installed **by default**, so **`/etc/sysconfig/iptables` often does not exist**. That is normal — do not look for the old file unless you switched back to the iptables service.

### How a change is applied

With the **iptables service**, **every** change means:

1. **Flush** (delete) **all** old rules
2. **Read the entire** `/etc/sysconfig/iptables` again
3. Rebuild the whole filter from scratch

That tears down the firewall for a moment and typically **drops existing connections**.

With **firewalld**, the whole ruleset is **not** recreated. **Only the differences** are applied. You can change settings **during runtime** and **existing connections can stay up**.

The kernel still filters with **netfilter**. firewalld (or the iptables service) is the **manager** that programs it. The `iptables` **command** may still *display* the resulting chains.

**Memory hook:** iptables service = throw away the wall, rebuild from a file. firewalld = add/remove one brick. That is why live `firewall-cmd` does not kill your SSH session the way a full iptables restart often did.

## Firewalld zones

Zones are predefined **trust levels**. Assign an interface (or connection) to a zone. Incoming traffic is then treated according to that zone.

### drop

The **lowest** level of trust. **All incoming** connections are **dropped without a reply**. Only **outgoing** connections are possible. The remote side sees silence (timeout), not a rejection.

### block

Similar to drop, but incoming requests are **rejected** with an ICMP error: **`icmp-host-prohibited`** (IPv4) or **`icmp6-adm-prohibited`** (IPv6). The client is told “no,” instead of hanging.

### public

**Public, untrusted** networks (internet, café Wi‑Fi). You do **not** trust other computers. You **may** allow **selected** incoming connections **case by case** (typically `ssh`, maybe `http`). Default zone on many servers.

### external

**External** networks when **this machine is the gateway**. Configured for **NAT masquerading**: the **internal** network stays **private** (RFC1918 addresses not advertised) but hosts remain **reachable** through the firewall’s public IP.

### internal

The **other side** of that gateway — the **internal** LAN. Computers are **fairly trustworthy**; **some additional services** are available compared with public/external.

### dmz

**DMZ** (demilitarized zone): **isolated** computers that **will not have access to the rest of your network**. Only **certain incoming** connections are allowed (e.g. a public web server in a separate segment).

### work

**Work** machines. You **trust most** computers on that network. **A few more services** might be allowed than on public.

### home

A **home** environment. You generally **trust most** other computers; **a few more services** will be accepted.

### trusted

**Trust all** machines on the network. The **most open** option. Use **sparingly** (lab, fully private segment). Almost no filtering of incoming traffic from that zone.

**Memory hook:** drop = ignore. block = ICMP “no.” public = untrusted / select ports. external + internal = NAT gateway pair. dmz = isolated servers. work/home = more trust. trusted = wide open.

| Zone | One-line recap |
| --- | --- |
| drop | Incoming discarded, no reply |
| block | Incoming rejected with ICMP |
| public | Untrusted; allow only what you pick |
| external | Gateway WAN + masquerade |
| internal | Gateway LAN, more services |
| dmz | Isolated hosts, limited in |
| work | Office LAN, fairly open |
| home | Home LAN, fairly open |
| trusted | Trust everyone — rare |

## Services

firewalld ships **named services** (port + protocol + sometimes a kernel helper) so you allow `ftp` instead of remembering `21/tcp` and conntrack.

```text
# firewall-cmd --get-services
cluster-suite pop3s bacula-client smtp ipp radius bacula ftp mdns samba
dhcpv6-client dns openvpn imaps samba-client http https ntp vnc-server
telnet libvirt ssh ipsec ipp-client amanda-client tftp-client nfs tftp libvirt-tls
```

```text
# firewall-cmd --info-service=ftp
ftp
  ports: 21/tcp
  protocols:
  source-ports:
  modules: nf_conntrack_ftp
  destination:
```

| Field | Meaning (ftp example) |
| --- | --- |
| `ports` | Control channel **21/tcp** |
| `modules` | **`nf_conntrack_ftp`** helper so related data ports can be tracked |
| `protocols` / `source-ports` / `destination` | Extra constraints (empty here) |

**Memory hook:** `--get-services` = menu. `--info-service=` = what that name actually opens.

## Panic mode

Drop **all** packets immediately (incoming and, in practice, a full lock — emergency).

```bash
firewall-cmd --panic-on
firewall-cmd --panic-off
```

You can lock yourself out of SSH. Use only when you mean it; `--panic-off` from console if needed.

**Memory hook:** panic = nuclear drop. Not a zone — a global emergency switch.

## Masquerading (NAT)

If the firewall **is the network gateway** and you do **not** want everybody to know **internal addresses**, set up two zones:

- **internal** — LAN
- **external** — toward the internet

Turn **masquerading** on **external**. Then packets leaving toward the internet get the **firewall’s IP** as **source address**. Replies come back to the firewall, which un-NATs to the real internal host.

Runtime (temporary — gone after reboot / firewall restart):

```bash
firewall-cmd --zone=external --add-masquerade
# success
```

| Goal | Option |
| --- | --- |
| Remove masquerading | `--remove-masquerade` |
| Is it active in this zone? | `--query-masquerade` |
| Survive reboot | add **`--permanent`**, then **reload** the firewall |

```bash
firewall-cmd --zone=external --add-masquerade --permanent
firewall-cmd --reload
```

`--permanent` writes XML under `/etc/firewalld/`. It does **not** change the live rules until `--reload` (or a restart). Runtime-only changes vanish on reload unless you also made them permanent.

**Memory hook:** masquerade on **external**, not internal. Query / remove / permanent+reload.

## Port forwarding

**Port forwarding** sends **inbound** traffic for a **specific port** to another **internal address** or an **alternative port** (DNAT).

**Caution:** port forwarding **requires masquerading**. That is a **classic RHCE exam mistake** — forward-port without `--add-masquerade` and it will not work as expected.

Example: packets intended for **TCP port 22** should go to **TCP 3753** instead, on the **external** zone, **temporarily**:

```bash
firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753
# success
```

| Piece | Meaning |
| --- | --- |
| `port=22` | Port seen on the firewall |
| `proto=tcp` | Protocol |
| `toport=3753` | Where it is sent (same host unless you also set `toaddr=`) |

For a **permanent** forward, add `--permanent` and `--reload`, same as masquerade.

**Memory hook:** masquerade first, then `--add-forward-port=port=:proto=:toport=`.
