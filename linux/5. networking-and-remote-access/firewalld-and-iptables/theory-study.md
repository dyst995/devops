# firewalld and iptables (study)

**firewalld** is a **dynamically managed** firewall. **Zones** assign a **trust level** to a network and to the **connections and interfaces** in it. A zone is bound to an interface (or a source address). Incoming traffic gets that zone’s rules: which services are open, whether NAT applies.

It supports IPv4 and IPv6, Ethernet **bridges**, **IP sets**, **runtime** vs **permanent** config, and an interface so **services** can add rules without editing iptables by hand.

Runtime = active now. Permanent = XML on disk. `--permanent` then `--reload` copies disk → runtime. Runtime-only changes vanish on reload unless you also made them permanent.

## vs the old iptables service

Older RHEL used the **iptables service** (and **system-config-firewall**, which wrote the same files).

| | iptables service | firewalld |
| --- | --- | --- |
| Files | `/etc/sysconfig/iptables` (IPv4), `ip6tables` (IPv6) — one big dump | XML in **`/usr/lib/firewalld/`** (stock) and **`/etc/firewalld/`** (your overrides) |
| Applying a change | **Flush all** rules, reread the whole file, rebuild — tears down the firewall and typically **drops existing connections** | **Only the differences**; existing connections can stay up |

On RHEL, firewalld is **default**, so **`/etc/sysconfig/iptables` often does not exist** — normal unless you switched back.

The kernel still filters with **netfilter**. firewalld (or the iptables service) **programs** it. The `iptables` **command** may still *display* the resulting chains. Live `firewall-cmd` usually does not kill SSH the way a full iptables restart often did.

## Zones

| Zone | Trust | Incoming |
| --- | --- | --- |
| **drop** | Lowest | **Dropped with no reply** (timeout). Outgoing still possible |
| **block** | Very low | **Rejected** with `icmp-host-prohibited` (IPv4) or `icmp6-adm-prohibited` (IPv6) |
| **public** | Untrusted (internet, café). Default on many servers | Only **selected** services (`ssh`, maybe `http`) |
| **external** | This machine is the **gateway** (WAN) | **NAT masquerading**: internal RFC1918 stays private; hosts reachable via the firewall’s public IP |
| **internal** | Other side of that gateway (LAN) | Fairly trustworthy; **more services** than public/external |
| **dmz** | Isolated hosts with **no** access to the rest of your network | Only **certain** incoming (e.g. a public web server) |
| **work** | Office LAN — trust most | A few more services than public |
| **home** | Home LAN — trust most | A few more services |
| **trusted** | Trust **all** — use sparingly | Almost no filtering |

## Services, panic, NAT, forward

Named services = port + protocol + sometimes a kernel helper (`ftp` instead of remembering `21/tcp` and conntrack).

```bash
firewall-cmd --get-services
firewall-cmd --info-service=ftp
# ports: 21/tcp; modules: nf_conntrack_ftp (related data ports)
```

**Panic** drops **all** packets immediately (global emergency, not a zone). You can lock yourself out of SSH — `--panic-off` from a console.

```bash
firewall-cmd --panic-on
firewall-cmd --panic-off
```

**Masquerading:** gateway with **internal** (LAN) + **external** (internet). Turn masquerade on **external**. Leaving packets get the **firewall’s IP** as source; replies un-NAT to the real host.

```bash
firewall-cmd --zone=external --add-masquerade
firewall-cmd --zone=external --remove-masquerade
firewall-cmd --zone=external --query-masquerade
firewall-cmd --zone=external --add-masquerade --permanent
firewall-cmd --reload
```

**Port forwarding** (DNAT): inbound traffic for a port → another **internal address** or **alternative port**. **Requires masquerading** — classic RHCE trap.

```bash
firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753
```

`port=` seen on the firewall; `toport=` destination (same host unless you also set `toaddr=`). Permanent: `--permanent` + `--reload`.
