# Networking tools — Questions

Cover the Answers section. Answer first, then check.

1. `ping google.com` vs `ping -c 5 google.com`. Does no reply always mean the host is down?
2. What do `traceroute` and `tracepath` show?
3. `host ya.ru` vs `host 213.180.204.8`. `dig` vs `dig -x`.
4. In `nslookup epam.com`, what are `Server` and port `#53`? What does **non-authoritative** mean?
5. What does reverse nslookup query (`in-addr.arpa`)? Can one IP map to several names?
6. What is `netstat` for? Decode `-ant` and `-nlpt`. Why `sudo` for `-p`?
7. In netstat, `LISTEN` vs `ESTABLISHED`. Local `127.0.0.1:631` — who can connect?
8. What does `whois google.com` tell you that `host google.com` does not?
9. What does `tcpdump` print? `tcpdump -i eth0` vs `host 1.2.3.4` vs `port 80 -w capture_file`.
10. Explain `'src 10.0.2.4 and (dst port 3389 or 22)'`. Why the quotes? Ports 3389 and 22?
11. Pick a tool: “is it up?” · “which routers?” · “what IP is this name?” · “what process listens on 53?” · “who registered the domain?” · “capture HTTP to a file.”

---

## Answers

1. Ping forever vs 5 packets. No — ICMP may be blocked.
2. The hop-by-hop path toward the host.
3. Name → IP · IP → name. `dig` full DNS; `-x` reverse.
4. The resolver you queried, DNS port. Answer came from cache/recursion, not the domain’s own auth servers.
5. PTR / reverse DNS. Yes (epam.com, epam.by, …).
6. Connections, routes, stats, … `-a` all `-n` numeric `-t` TCP. `-l` listening `-p` process. Other users’ PIDs need root.
7. Waiting for clients vs session in progress. Only localhost (not the LAN).
8. Registrar/contact/dates — ownership records, not just A records.
9. Matching packets. One NIC · that host either direction · port 80 saved to pcap.
10. Source 10.0.2.4 and dest port RDP or SSH. Quotes stop the shell from eating `and`/`or`. 3389 = RDP, 22 = SSH.
11. ping · traceroute/tracepath · host/dig/nslookup · netstat -nlpt · whois · tcpdump port 80 -w file
