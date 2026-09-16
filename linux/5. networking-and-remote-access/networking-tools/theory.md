# Networking tools

These commands **test** the network: reachability, path, DNS, sockets, registration, and packets. They do not replace persistent config from [network configuration](../network-configuration/theory.md).

**Memory hook:** ping = alive? traceroute = which hops? host/dig/nslookup = DNS. netstat = who is listening? whois = who owns the domain? tcpdump = what is on the wire?

## ping

Send ICMP echo requests. If replies come back, the host is reachable (unless ICMP is blocked).

```bash
ping google.com              # until you Ctrl-C
ping -c 5 google.com         # stop after 5 packets
```

**Memory hook:** `-c` = count. No reply ≠ always “down” — firewalls often drop ping.

## traceroute / tracepath

Show the **hop-by-hop path** toward a host (each router that answers).

```bash
traceroute google.com
tracepath ya.ru              # similar idea; often no root needed
```

**Memory hook:** traceroute = map of the road, not just destination alive.

## host / dig

Translate **name ↔ IP**.

```bash
host ya.ru                   # name → address
host 213.180.204.8           # address → name (reverse)
dig ya.ru                    # full DNS answer (question, answer, extra)
dig -x 213.180.204.8         # reverse lookup (`-x`)
```

**Memory hook:** `host` = short. `dig` = full packet. `-x` = reverse (PTR).

## nslookup

Query Internet **domain name servers** (interactive or one-shot).

Forward (name → IP):

```text
# nslookup epam.com
Server:         10.99.158.150
Address:        10.99.158.150#53
Non-authoritative answer:
Name:           epam.com
Address:        174.128.60.201
```

`Server` is **your** resolver (often from `/etc/resolv.conf`), port **53**. **Non-authoritative** = cached/recursive answer, not the domain’s own SOA servers.

Reverse (IP → name):

```text
# nslookup 174.128.60.201
201.60.128.174.in-addr.arpa     name = epam.com.
```

The IP is reversed under **`in-addr.arpa`**. One IP can have several names.

**Memory hook:** nslookup shows **which DNS you asked** (#53) and whether the answer is authoritative.

## netstat

Display **connections**, routing tables, interface stats, and more. (Modern equivalent: `ss`.)

```bash
netstat -ant
# -a all  -n numeric (no reverse DNS)  -t TCP
```

```text
tcp  0  0  127.0.0.1:631     0.0.0.0:*     LISTEN
tcp  0  0  192.168.1.2:49058 173.255.230.5:80  ESTABLISHED
```

`LISTEN` = server waiting. `ESTABLISHED` = session up. Local address:port then remote.

```bash
sudo netstat -nlpt
# -l listening only  -p process (pid/name)  — needs root for other users’ processes
```

```text
tcp  0  0  127.0.1.1:53   0.0.0.0:*   LISTEN  1144/dnsmasq
tcp  0  0  127.0.0.1:631  0.0.0.0:*   LISTEN  661/cupsd
```

Port **53** = DNS (dnsmasq). **631** = CUPS (printing). Bound to **127.0.0.1** = local only.

**Memory hook:** `-ant` = TCP picture. `-nlpt` = **who owns** the listening port.

## whois

Look up records in **NIC** databases (registrar, contacts, dates).

```bash
whois google.com
```

Shows registrant, creation/expiry, contacts — useful when you need “who owns this domain?” not “what IP is it?”

## tcpdump

Print **packets** on an interface that match an expression. Needs privilege for most interfaces.

```bash
tcpdump -i eth0                              # that interface
tcpdump host 1.2.3.4                         # that IP as source or dest
tcpdump port 80 -w capture_file              # TCP/UDP port 80; write to a file (Wireshark later)
tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'
# from 10.0.2.4 AND destined to RDP (3389) or SSH (22)
```

Quotes keep `and`/`or` for tcpdump, not the shell. `-w` writes **raw pcap**, not text.

**Memory hook:** `-i` interface. `host` / `port` / `src` / `dst`. `-w` save. Parentheses for AND/OR.
