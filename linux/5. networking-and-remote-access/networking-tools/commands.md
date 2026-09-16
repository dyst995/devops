# Commands to memorize

```bash
ping google.com                              # ICMP echo until Ctrl-C — is the host reachable?
ping -c 5 google.com                         # stop after 5 packets

traceroute google.com                        # hop-by-hop path to the host
tracepath ya.ru                              # same idea; often works without root

host ya.ru                                   # DNS: name → IP (short)
host 213.180.204.8                           # reverse: IP → name
dig ya.ru                                    # DNS lookup with the full answer section
dig -x 213.180.204.8                         # reverse lookup (PTR)

nslookup epam.com                            # query DNS; shows your resolver (#53) and A record
nslookup 174.128.60.201                      # reverse; in-addr.arpa names

netstat -ant                                 # all TCP sockets, numeric (LISTEN / ESTABLISHED)
sudo netstat -nlpt                           # listening TCP + PID/program (root sees all processes)

whois google.com                             # registrar / NIC record (owner, dates), not DNS A lookup

tcpdump -i eth0                              # packets on that interface
tcpdump host 1.2.3.4                         # traffic to or from that IP
tcpdump port 80 -w capture_file              # port 80; write pcap to file
tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'
# from 10.0.2.4 and dest RDP (3389) or SSH (22); quotes keep and/or for tcpdump
```
