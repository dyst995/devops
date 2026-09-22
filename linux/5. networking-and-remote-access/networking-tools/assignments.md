# Assignments — Networking tools

Close `commands.md`. Type and run. `ping`/`traceroute` to **public** hosts only if the lab allows outbound ICMP. `tcpdump` needs privilege and can capture secrets — short captures on a **lab** NIC, write pcap to a file you delete. Do not `tcpdump` on a shared network and store dumps.

## Reachability (`ping`, `traceroute`, `tracepath`)

### Easy

1. [ ] `ping -c 5` a host you are allowed to (or your own gateway from `ip route`). Ctrl-C if you forgot `-c`.
2. [ ] `traceroute` or `tracepath` to that host. How many hops printed?

### Medium

3. [ ] `ping` without `-c` for a moment, Ctrl-C. Then `-c 5`. Compare.
4. [ ] Someone pings a name that does not resolve. Read the error. `ping` the IP from `ip addr` of **localhost** (`127.0.0.1`) to see a working path.

### Hard

5. [ ] Gateway ping works, far host fails (or the reverse). Use `ip route` + `ping -c` + `tracepath` to say where it dies. Do not change routes.
6. [ ] Combine: `ping -c 3` the default gateway vs a public name. `cat /etc/resolv.conf` if the name fails but an IP works.

## DNS (`host`, `dig`, `nslookup`)

### Easy

1. [ ] `host` a name you may query. Then `host` of an IP (reverse) if you have one from the first answer.
2. [ ] `dig` the same name. Find the **ANSWER** section.

### Medium

3. [ ] `dig -x` on an IP. Then `nslookup` the name and `nslookup` the IP. Which tool showed your resolver (`#53`)?
4. [ ] Someone used `whois` (later set) thinking it is an A record. Run `host`/`dig` for A vs `whois` in the whois set. Here: `dig` only.

### Hard

5. [ ] Name fails in `ping` but `dig` works (or the reverse). Use `cat /etc/nsswitch.conf` `hosts:` line + `resolv.conf` + `dig`.
6. [ ] Broken: `dig` with a typo TLD. Then a correct name. Combine `ping -c 1` after you have an IP from `host`.

## Sockets (`netstat`)

### Easy

1. [ ] `netstat -ant` — find `LISTEN` vs `ESTABLISHED`. Numeric ports.
2. [ ] `sudo netstat -nlpt` — listening TCP + program. If sudo is denied, run without sudo and note missing PIDs.

### Medium

3. [ ] Pick a listening port. Does it match a service you know (`sshd` 22, etc.)? `systemctl status` that service if safe.
4. [ ] Someone used `netstat` without `-n` and waited on DNS. Use `-n` / `-ant` as taught.

### Hard

5. [ ] Find what is listening on port 22 (or 80). `sudo netstat -nlpt` + `ps`/`systemctl` if needed. Do not `kill` it.
6. [ ] Combine: `sshd` listening? `grep` 22 in netstat output. Firewall topic comes next — do not change firewall yet.

## `whois`

### Easy

1. [ ] `whois` a public domain you are allowed to query. Find registrar/dates — **not** an A record.
2. [ ] Compare: `host` that domain vs `whois`. Different jobs.

### Medium

3. [ ] `whois` an IP if the lab allows. Note how the answer differs from `host` reverse.
4. [ ] Someone used `whois` to “see if the site is up.” Use `ping`/`host` for that. `whois` is registry data.

### Hard

5. [ ] Domain + `whois` + `dig` A + `ping -c 1` of that A. Three tools, three questions.
6. [ ] If `whois` is missing: `apt-cache search whois` and install only on the lab, or skip.

## `tcpdump`

### Easy

1. [ ] Lab: `sudo tcpdump -i` your NIC for a few packets, Ctrl-C. If you have no sudo, skip and write that you need privilege.
2. [ ] `sudo tcpdump host` your default gateway (from `ip route`) for a few packets, Ctrl-C.

### Medium

3. [ ] `sudo tcpdump port 80 -w` a file in `/tmp` (short). `ls -l` the pcap. Delete it after. You may generate traffic with `ping` or a browser if allowed — port 80 may be quiet.
4. [ ] Quoted filter from the course shape: `src` and `dst port` — use a **lab** IP and a port you use (22). Ctrl-C quickly.

### Hard

5. [ ] Capture to a file, then prove the file is non-empty (`ls -lh`). Do not leave pcaps in home. Combine `ping -c` while capturing `host` that IP.
6. [ ] Broken: `tcpdump src 10.0.2.4 and dst port 22` **without quotes** (shell eats `and`). Quote the expression as in the course. Do not capture passwords; use ICMP/`ping` if possible.
