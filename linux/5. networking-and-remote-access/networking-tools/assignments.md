# Assignments — networking tools

Close `commands.md`. Recite, then type. Work on a **lab VM**. Do not flood production hosts; prefer lab names/IPs or a few packets only.

## `ping`

1. [ ] Prove a well-known name is reachable by ICMP echo. Stop with **Ctrl-C**. Recite what RTT and loss mean on the summary.
2. [ ] Predict: name vs IP — if name fails and IP works, is that ICMP or DNS? Prove both.
3. [ ] Send **exactly five** packets, then stop by itself. Confirm the transmitted count is 5.
4. [ ] Predict infinite vs count: which one hangs until you interrupt? Do not leave an infinite ping running in the background.
5. [ ] Wrong usage: ping with no operand. What error?
6. [ ] Privilege: unprivileged ping on this OS — works or needs cap/`sudo`? Prove.
7. [ ] Human vs default: find min/avg/max RTT on the five-packet run. One sentence: is this LAN or WAN-ish?
8. [ ] Predict: unreachable host — timeout vs “Name or service not known”. Trigger a safe failure (bogus name vs unused RFC1918).
9. [ ] Combined: five packets to a name; then five to its IP. Similar RTT? Same loss?
10. [ ] Predict: firewall dropping ICMP — ping fails while TCP 22 still works. Do not panic-on a production firewall to test.
11. [ ] Recite from memory: default (until interrupt) vs stop-after-N.
12. [ ] What if ICMP is blocked in the lab? Record “filtered” and still complete the count syntax drill toward a local address (`127.0.0.1`).
13. [ ] Ping loopback. Predict loss 0% and tiny RTT. Prove.
14. [ ] Predict: ping your own NIC IPv4 vs loopback — different path? Prove RTT difference or lack of it.
15. [ ] Do not ping-flood (`-f`) on a shared network. Say why.
16. [ ] Combined with later DNS tools: if ping by name fails, which command proves the name has no A record?
17. [ ] Predict TTL in the reply — whose hop limit is that? Optional: watch TTL on five packets.
18. [ ] Wrong usage: a name with a typo. Exact resolver error vs 100% loss.
19. [ ] Recite: ICMP echo is **not** “the host is fully healthy” — only that echo replies arrive. One sentence.
20. [ ] Cleanup: no ping left running. `jobs` empty.

## `traceroute`

1. [ ] Show the hop-by-hop path to a lab or public name. Recite what each line’s IP and RTT columns mean.
2. [ ] Predict: first hop is your default gateway from `ip route`. Prove they match.
3. [ ] Predict `* * *` on a hop: filtered, not necessarily down. Find one such hop or say none.
4. [ ] Privilege: does this work unprivileged? If it needs root, record that; do not guess UDP vs ICMP without looking at the output.
5. [ ] Wrong usage: no hostname. What error?
6. [ ] Combined: traceroute vs ping to the same name — ping works, traceroute stalls. One sentence why that can happen.
7. [ ] Human vs default: count how many hops until the destination (or last responding hop).
8. [ ] Predict: traceroute to loopback — how many hops? Prove.
9. [ ] What if UDP traceroute is blocked? Note the last useful hop; do not hammer the path.
10. [ ] Recite: this is path discovery, not a port-open test. One sentence.
11. [ ] Combined with routing table: if default via is missing, predict traceroute fails immediately. Glance at `ip route`.
12. [ ] Do not traceroute production internal networks you do not own. Lab or your own VM gateway only if unsure.
13. [ ] Compare two destinations (lab DNS vs another name). Different second hop? Record.
14. [ ] Predict IPv4 vs a name that is IPv6-only on this host — what do you see? Optional.
15. [ ] Wrong usage: a typo name. DNS error vs hop list?
16. [ ] Recite from memory the one-operand form.
17. [ ] Combined: last hop IP vs `host`/`dig` A record — same? Prove.
18. [ ] Predict: extra latency on hop 5 only — is the path slow or that hop’s ICMP deprioritized? One sentence (you cannot know for sure).
19. [ ] What if the binary is missing? Record; use `tracepath` next.
20. [ ] Cleanup: stop any long run with interrupt. No background traceroute.

## `tracepath`

1. [ ] Show the path to a name using **tracepath**. Recite: often works **without root**. Prove as a normal user.
2. [ ] Predict: same first hop as traceroute? Prove.
3. [ ] Compare hop count / last IP to traceroute on the same target. Differences?
4. [ ] Privilege: unprivileged success vs traceroute needing sudo on this image. Record.
5. [ ] Wrong usage: no operand. Error text?
6. [ ] Combined: ping works, tracepath shows `no reply`. Path vs ICMP policy?
7. [ ] Human vs default: pMTU / “asymm” notes in the output — one sentence what they mean if present.
8. [ ] Predict loopback path. Prove.
9. [ ] Recite from memory: same idea as traceroute, different binary, often no root.
10. [ ] What if it is not installed? Record the package manager error; do not install unless the lab allows.
11. [ ] Do not run against random corporate hosts. Lab/public name you already used.
12. [ ] Combined with `ip route`: default via equals hop 1?
13. [ ] Wrong usage: typo name. DNS vs timeout.
14. [ ] Predict: IPv6-only vs IPv4 name on this VM. Optional one run.
15. [ ] Recite: not a DNS lookup tool. Who does the name resolution (system resolver)?
16. [ ] Combined: five-packet ping RTT vs last-hop RTT here — same order of magnitude?
17. [ ] What if every hop is `no reply` but ping works? One hypothesis (ICMP/UDP filter).
18. [ ] Human: copy the destination IP from the output; reverse it later with `host`.
19. [ ] Recite both path tools: when you pick tracepath over traceroute (no root).
20. [ ] Cleanup: interrupted runs gone.

## `host`

1. [ ] Resolve a name to IP (short answer). Recite: this is DNS, not ICMP.
2. [ ] Reverse-lookup an IP to a name (use a documented public IP from the cheat sheet idea, or an IP you just resolved). Predict PTR vs “not found”.
3. [ ] Predict: forward then reverse — do you get the same name back? Prove with the pair you just used.
4. [ ] Wrong usage: no operand. Error?
5. [ ] Combined: `host` short vs `dig` full answer — same A record? Prove.
6. [ ] Predict NXDOMAIN vs SERVFAIL vs timeout. Trigger a safe NXDOMAIN with a bogus name.
7. [ ] Recite: short name→IP vs reverse IP→name. Two invocations from memory.
8. [ ] What if `/etc/resolv.conf` has no nameserver? Predict failure. Do not empty the file on a remote VM.
9. [ ] Combined with nsswitch: `host` talks DNS; it does not read `/etc/hosts` the same way `ping` might. Prove with a hosts-only name if you can add a throwaway line; revert.
10. [ ] Privilege: works as a normal user? Prove.
11. [ ] Human vs default: one-line answer vs extra records (MX/AAAA). Note what you got.
12. [ ] Reverse a private RFC1918 IP. Predict no public PTR. Prove.
13. [ ] Combined: ping by name vs `host` — if host works and ping fails, ICMP is filtered.
14. [ ] Wrong usage: reverse lookup but you pass a name. What happens?
15. [ ] Recite: reverse uses PTR. You will confirm with `dig`’s reverse form next.
16. [ ] What if DNS is slow? Time one lookup; do not loop.
17. [ ] Combined with `nslookup`: same resolver IP? Predict they match `resolv.conf`.
18. [ ] Do not query internal hostnames of a company you do not administer unless this is that lab.
19. [ ] Predict CNAME: `host` shows alias vs final A? Use a name you know or skip if none.
20. [ ] Cleanup: no extra hosts-file lines left.

## `dig`

1. [ ] Look up a name and read the **ANSWER** section. Recite status (NOERROR) and the A/AAAA you got.
2. [ ] Reverse-lookup an IP with the reverse form. Recite that this is **PTR**. Compare to `host` reverse.
3. [ ] Predict: `dig` is verbose; `host` is short. Same data in ANSWER vs `host` one-liner? Prove.
4. [ ] Wrong usage: no name. What does it query by default (root/NS)? Note; then query a real name.
5. [ ] Combined: QUESTION vs ANSWER vs AUTHORITY vs ADDITIONAL. Point at each once.
6. [ ] Privilege: normal user. Prove.
7. [ ] Predict NXDOMAIN in STATUS. Prove with a bogus name.
8. [ ] Recite from memory: forward lookup vs reverse (`-x` idea without pasting the cheat-sheet line).
9. [ ] Combined with `resolv.conf`: SERVER line at the bottom — same nameserver IP?
10. [ ] Human vs default: Query time and MSG SIZE. One sentence.
11. [ ] Wrong usage: reverse form but you pass a hostname. What happens?
12. [ ] Combined: `dig` vs `ping` by name — dig does not send ICMP. Prove by a host that resolves but does not echo.
13. [ ] What if DNS port 53 is blocked? Timeout. Do not change firewalld panic to test.
14. [ ] Recite: ANSWER is the record; not whois/registrar data.
15. [ ] Combined with traceroute last hop: same IP as A record? Not always (anycast/CDN). Record what you see.
16. [ ] Predict: +short would be briefer — optional; default full output is the drill.
17. [ ] Look at the question name for reverse: `in-addr.arpa` style. Recite why that exists.
18. [ ] Do not `dig ANY` flood against public servers. One A and one PTR is enough.
19. [ ] Recite both forms from memory; type them at a lab name and an IP you own/resolved.
20. [ ] Cleanup: none (read-only).

## `nslookup`

1. [ ] Query a name. Recite the **resolver** it shows (port **53**) and the A record.
2. [ ] Reverse-lookup an IP. Recite `in-addr.arpa` in the output if present.
3. [ ] Predict: same A as `host`/`dig`? Prove all three on one name.
4. [ ] Wrong usage: no operand — interactive mode. Exit (`exit`/Ctrl-D). Do not stay stuck.
5. [ ] Privilege: normal user. Prove.
6. [ ] Combined: resolver IP vs `/etc/resolv.conf` nameserver. Match?
7. [ ] Predict NXDOMAIN vs “server can’t find”. Prove with a bogus name.
8. [ ] Recite: this is DNS, **not** whois. One sentence.
9. [ ] Combined: reverse IP vs `dig` reverse vs `host` reverse. Same PTR or all empty?
10. [ ] Human vs default: Address line for the server vs Address line for the answer. Do not mix them up.
11. [ ] Wrong usage: mistype `nslookup`. Shell error vs DNS error.
12. [ ] What if you pass `-port` incorrectly? Skip exotic flags; master the two cheat-sheet cases.
13. [ ] Combined with ping `-c`: resolve first, then five echoes to the IP. Split DNS vs reachability.
14. [ ] Predict: two nameservers in resolv.conf — which one did nslookup use? Point at it.
15. [ ] Recite from memory: forward vs reverse invocations.
16. [ ] Do not use interactive mode to change the live system resolver. Read-only queries.
17. [ ] Combined: `nsswitch` files-first vs nslookup always DNS. Prove with `/etc/hosts` if you added a throwaway; revert.
18. [ ] What if it hangs? Ctrl-C; check network/DNS. Do not kill -9 the shell.
19. [ ] Recite port **53** — TCP or UDP typically for this lookup? One sentence.
20. [ ] Cleanup: left interactive mode.

## `netstat`

1. [ ] List **all TCP** sockets with **numeric** addresses (no DNS delay). Find LISTEN and ESTABLISHED. Recite what those states mean.
2. [ ] Predict: `-n` avoids reverse DNS. Why is that faster/safer on a broken resolver? Prove by timing or by seeing raw IPs.
3. [ ] As **root**, list **listening TCP** with **PID/program**. Find what owns port 22 (or 80). Recite PID and binary.
4. [ ] Predict: without root, some PIDs are hidden. Prove by comparing user vs sudo on the listen+PID form.
5. [ ] Wrong usage: invert listen vs all. Recite which listing is “everything” vs “listening only”.
6. [ ] Combined: listening on 22 vs `sshd` process. Same PID as `lsof` later? Optional note.
7. [ ] Human vs default: numeric vs names. Run once without numeric if it is quick; note `localhost` vs `127.0.0.1`.
8. [ ] Recite from memory: all TCP numeric vs listening TCP with PID (needs root for all processes).
9. [ ] What if `netstat` is missing (`net-tools`)? Record; do not confuse with `ss` unless you already know it.
10. [ ] Predict ESTABLISHED to a remote IP — that is not LISTEN. Point at one line of each.
11. [ ] Combined with firewalld: LISTEN on 80 locally vs remote cannot connect. Local listen ≠ open in firewall.
12. [ ] Privilege: sudo vs not for `-p`. Exact difference in the PID column.
13. [ ] Wrong usage: UDP-only when you meant TCP. Stick to the TCP drills from the sheet; say what you would add for UDP.
14. [ ] Find `127.0.0.1` vs `0.0.0.0` listeners. Recite: bound to all vs loopback only.
15. [ ] Combined: ping does not show sockets. netstat does. One sentence.
16. [ ] Predict: your current SSH session appears as ESTABLISHED. Prove (foreign address = your client).
17. [ ] Recite: numeric means no DNS. Important when DNS is the incident.
18. [ ] Do not kill PIDs you see here. This topic is inspection only.
19. [ ] Combined with tcpdump: you will capture port 80 only if something LISTENs or talks on 80. Check first.
20. [ ] Cleanup: none.

## `whois`

1. [ ] Fetch the **registrar / NIC** record for a public domain. Recite owner/registrar and dates if present — **not** the DNS A record.
2. [ ] Predict: whois vs `host`/`dig` — different databases. Prove by comparing an A IP vs whois org name.
3. [ ] Wrong usage: whois an IP vs a domain. Try a domain from the sheet’s idea; note IP whois is a different registry.
4. [ ] Privilege: normal user. Prove.
5. [ ] Combined: `dig` A record IP vs whois on the **domain**. Do not expect the A IP inside whois.
6. [ ] Predict: rate-limit / “try again”. If blocked, record it; do not loop.
7. [ ] Recite: this is registration metadata, not reachability.
8. [ ] Human vs default: find Expiration / Registrar / Name Server fields if present.
9. [ ] Combined: whois nameservers vs `dig` NS. Same hosts? Optional one compare.
10. [ ] Wrong usage: whois a local hostname (`localhost`). Useless/error. Prove.
11. [ ] What if the command is not installed? Record; skip install unless lab allows.
12. [ ] Do not whois-scan random people/domains. One or two public domains is enough.
13. [ ] Recite from memory the one-operand form.
14. [ ] Combined: ping proves ICMP; whois proves nothing about ICMP. One sentence.
15. [ ] Predict redacted GDPR whois — fields missing. That is OK; still identify it as whois output.
16. [ ] Combined with reverse DNS: PTR name vs whois registrant — often unrelated (CDN).
17. [ ] Wrong usage: extra flags you do not know. Stick to the cheat-sheet case.
18. [ ] Recite: NIC record (owner, dates) ≠ A lookup.
19. [ ] What if network has no outbound 43/tcp? Timeout. Do not open firewall panic to test.
20. [ ] Cleanup: none.

## `tcpdump`

1. [ ] Capture packets on a real interface (name from `ifconfig`/`ip`, not always `eth0`). Privilege: expect root. Interrupt after a few packets. Recite src/dst/ports you saw.
2. [ ] Predict: capturing on the SSH NIC will show your SSH traffic. Use a short interrupt so you do not flood the terminal.
3. [ ] Capture traffic **to or from one IP** you control (lab peer or your client IP). Prove packets match that host.
4. [ ] Capture **port 80** and **write a pcap file**. Prove the file exists and is non-empty (or empty if no HTTP). Recite: `-w` writes, it does not print.
5. [ ] Recite a filter: source IP **and** (destination port RDP **or** SSH). Use **quotes** so the shell does not steal `and`/`or`. Run briefly; interrupt.
6. [ ] Predict without quotes: `and`/`or` become shell syntax. Wrong usage: prove the shell errors or misparses; then retry quoted.
7. [ ] Combined: port 80 capture vs `netstat` LISTEN on 80 — if nothing listens, file may stay tiny. Explain.
8. [ ] Human vs default: without `-w`, packets print; with `-w`, terminal is quiet. Prove both once.
9. [ ] Wrong usage: invalid interface name. Exact error.
10. [ ] Privilege: as a normal user. Exact failure (permissions / `bpf`).
11. [ ] Recite from memory: interface, host, port+write, quoted compound filter.
12. [ ] Combined with ping: capture ICMP on an interface while five-pinging a peer. See echo request/reply if on-path.
13. [ ] Do not write pcap into a shared/production path. Use `/tmp` or a lab home file; delete after.
14. [ ] Predict: filter `port 80` is either side. `dst port` is one direction. Recite which the compound example used for 3389/22.
15. [ ] What if the interface is down? Error or zero packets? Prove on a spare NIC, not SSH NIC down.
16. [ ] Recite ports: 80 HTTP, 22 SSH, 3389 RDP — from the cheat sheet filter.
17. [ ] Combined: `host` DNS vs tcpdump `host` — different meanings. One is a DNS tool; one is a filter keyword.
18. [ ] Do not run tcpdump forever on a busy NIC in a shared lab. Always interrupt; no background dump.
19. [ ] Predict: writing pcap while printing — you typically choose one. The sheet writes to a file for port 80.
20. [ ] Cleanup: stop all captures; delete the lab pcap. Confirm no tcpdump process left (`ps`/`jobs`).
