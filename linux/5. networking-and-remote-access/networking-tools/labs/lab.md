# Labs — Networking tools

**Where:** Rocky VM with outbound DNS if you ping public names. Use a second VM or Windows host IP for local tests if the internet is blocked.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

`ping` a name until Ctrl-C. `ping -c 5` the same host.

## Lab 2

`traceroute` and/or `tracepath` to a host. `host` a name and a reverse IP. `dig` a name and `dig -x` an IP. `nslookup` a name and an IP.

## Lab 3

`netstat -ant` and `sudo netstat -nlpt` (install `net-tools` if needed). If `netstat` is gone, use `ss -tulpn` and still know what the notes say `netstat` flags mean.

## Lab 4

`whois` a domain if the command exists.

## Lab 5

With sudo, `tcpdump` on your interface for a few packets (`-c` to stop). Capture `host` one IP, then `port 80` to a file, then a quoted expression with `src` and `dst port` as in the notes. Ctrl-C / `-c` so you do not run forever. Delete the pcap when done.

## Job and cert labs

## Lab 6

Ticket: “site is down.” `ping` the IP, `ping` the name, `dig` the name, `curl -vI` the URL, `ss -tulpn` on the server. Write the order you used.

## Lab 7

`ss -tulpn` vs `netstat -nlpt`. Find what listens on 22 and 80.

## Lab 8

From the client, `curl` an open port and a closed port. On the server, `tcpdump port 80` while you curl.

## Lab 9

`nc` or `ncat`: listen on a high port on A, connect from B. Firewall may block — open it or use the console lab network.
