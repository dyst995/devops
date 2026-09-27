# Tasks — Networking tools

Close `theory.md`. Internet optional; use LAN IPs / lab names if needed. Prefer query tools; delete any capture files you create. Do the action or write the answer, then check yourself.

## Warm-up

1. Memory hook from the notes: ping = ? traceroute = ? host/dig/nslookup = ? netstat = ? whois = ? tcpdump = ?
2. In one sentence: these tools **test** the network — what do they **not** replace? (link to network-configuration idea)

## Reachability (ping)

3. ICMP echo to a reachable name or IP until you interrupt (Ctrl-C).
4. Same target but stop after **5** packets (`-c`).
5. Predict: no reply — is the host always “down”? What else can drop ICMP?

## Path (traceroute / tracepath)

6. Hop-by-hop path with **traceroute** toward a host you may reach.
7. Same idea with **tracepath** (often works without root). Compare: did both show hops? Which needed privilege on this box?
8. Memory hook: traceroute = map of the road — how is that different from ping alone?

## DNS — short (host)

9. Short name → IP with `host`.
10. Reverse: IP → name with `host` on an address you looked up (or a known lab IP).

## DNS — full (dig)

11. Full answer section for a name with `dig` (question, answer, extra).
12. Reverse lookup with the flag for PTR (`dig -x`). Compare the detail level to `host`.

## DNS — resolver view (nslookup)

13. Query a name with `nslookup`. Find **your** resolver on port **53** and the A record. What does **Non-authoritative** mean from the notes?
14. Reverse lookup with `nslookup` on an IP. Spot the `in-addr.arpa` style. Can one IP have several names?

## Distinguish (whois vs DNS)

15. Registrar/NIC record (owner, dates, contacts) vs A record — which tool is **not** DNS A lookup? Run `whois` on a domain you are allowed to query.
16. In one sentence: when would you use `whois` instead of `dig`/`host`?

## Sockets (netstat; know ss)

17. All TCP sockets, numeric: `netstat -ant`. Spot **LISTEN** vs **ESTABLISHED**. Read local address:port then remote.
18. Listening TCP plus PID/program: `sudo netstat -nlpt` (needs privilege for all processes). Find something on **53** or **631** or **22** if present; note bind to `127.0.0.1` vs `0.0.0.0`.
19. From the notes: what is the modern equivalent of `netstat`? Run `ss -ant` or `ss -nlpt` once if available and compare the picture — do not invent flags not in the notes.

## Packets (tcpdump)

20. Capture a few packets on an interface (`tcpdump -i …`). Stop with Ctrl-C. Needs privilege for most interfaces.
21. Filter **host** an IP (source or dest).
22. Filter **port** 80 writing to a file (`-w`). Confirm the file is raw pcap, not text. Delete the capture file when done.
23. Filter **src** and dest ports **3389** or **22** with quotes so the shell does not eat `and`/`or`. Write the expression first, then run briefly. Delete any leftover capture.

## Repeat / order

24. Same name three ways: short (`host`), full (`dig`), resolver-aware (`nslookup`). Note which shows your DNS server.
25. Same IP reverse three ways: `host`, `dig -x`, `nslookup`. Spot `in-addr.arpa` where it appears.

## Scenario

26. “Site is down.” Order: reach IP (`ping`), reach name (`ping` name), DNS (`host`/`dig`/`nslookup`), sockets on 80 (`netstat`/`ss`), packet proof of a client hitting 80 (`tcpdump`). Write the order you used and the evidence. Do not skip to a random fix.
27. Ticket: “DNS works for some names, not others / wrong IP.” Using only this topic, which tools prove resolver (#53), A record, and reverse PTR? Which tool proves ownership of the domain (not the A record)?
28. Ticket: “port 80 is open but users get nothing.” Prove LISTEN vs ESTABLISHED, which process owns the port, and whether packets arrive (`tcpdump port 80`). Prefer show/list; do not restart services here.
