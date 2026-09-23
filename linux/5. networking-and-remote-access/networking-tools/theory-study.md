# Networking tools (study)

These **test** the network. They do not replace persistent config from [network configuration](../network-configuration/theory.md).

| Question | Tool |
| --- | --- |
| Alive? | `ping` |
| Which hops? | `traceroute` / `tracepath` |
| Name ↔ IP? | `host` / `dig` / `nslookup` |
| Who is listening? | `netstat` (modern equivalent: `ss`) |
| Who owns the domain? | `whois` |
| What is on the wire? | `tcpdump` |

## Reachability and path

**`ping`** sends ICMP echo requests. Replies mean reachable **unless ICMP is blocked** — no reply ≠ always “down.”

```bash
ping google.com              # until Ctrl-C
ping -c 5 google.com         # stop after 5
```

**`traceroute`** / **`tracepath`**: hop-by-hop path (each router that answers). `tracepath` is a similar idea; often no root needed.

## DNS

**`host`** = short name ↔ IP (and reverse). **`dig`** = full DNS answer (question, answer, extra). **`dig -x`** = reverse (PTR).

**`nslookup`** queries DNS (interactive or one-shot). `Server` is **your** resolver (often from `/etc/resolv.conf`), port **53**. **Non-authoritative** = cached/recursive answer, not the domain’s own SOA servers. Reverse uses **`in-addr.arpa`** (IP octets reversed). One IP can have several names.

## Sockets and registration

**`netstat -ant`**: **a**ll, **n**umeric (no reverse DNS), **t** TCP. `LISTEN` = waiting; `ESTABLISHED` = session up. Local address:port then remote.

**`sudo netstat -nlpt`**: **l**istening, **p**rocess (pid/name) — root to see other users’ processes. Port **53** = DNS; **631** = CUPS. Bound to **127.0.0.1** = local only.

**`whois`** looks up **NIC** / registrar records (contacts, dates) — “who owns this domain?”, not “what IP is it?”

## tcpdump

Print **packets** that match an expression. Needs privilege for most interfaces.

```bash
tcpdump -i eth0
tcpdump host 1.2.3.4
tcpdump port 80 -w capture_file              # raw pcap, not text (Wireshark later)
tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'
```

Quotes keep `and`/`or` for tcpdump, not the shell. 3389 = RDP, 22 = SSH.
