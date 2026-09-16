# Tasks — Networking tools

Close `theory.md`. Internet optional; use LAN IPs if needed.

## Reachability

1. ICMP echo until you interrupt. Same host but stop after **5** packets.
2. Hop-by-hop path (two tools in the notes; one often works without root).

## DNS (repeat name vs reverse)

3. Short name → IP. Reverse IP → name.
4. Full answer section for a name. Reverse lookup with the flag for PTR.
5. Query that also shows your resolver on 53 and the A record. Reverse via in-addr.arpa style.

## Distinguish

6. Registrar/NIC record (owner, dates) vs A record — which tool is **not** DNS A lookup? Run it on a domain.

## Sockets

7. All TCP sockets, numeric, see LISTEN vs ESTABLISHED.
8. Listening TCP plus PID/program (needs privilege for all processes).

## Packets

9. Capture on an interface (few packets). Filter **host** an IP. Filter **port** 80 writing to a file. Filter **src** and dest ports 3389 or 22 with quotes so the shell does not eat `and`/`or`. Delete the capture file.

## Scenario

10. “Site is down.” Order: reach IP, reach name, DNS, sockets on 80, packet proof of a client hitting 80. Write the order you used and the evidence. Do not skip to a random fix.
