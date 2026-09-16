# Commands to memorize

```bash
firewall-cmd --get-services              # list named services you can allow (ssh, http, ftp, …)
firewall-cmd --info-service=ftp          # ports/modules for that service (ftp → 21/tcp)

firewall-cmd --panic-on                  # drop ALL packets (emergency)
firewall-cmd --panic-off                 # leave panic mode

firewall-cmd --zone=external --add-masquerade       # NAT: hide internal IPs behind the firewall (runtime)
firewall-cmd --zone=external --remove-masquerade    # turn masquerade off
firewall-cmd --zone=external --query-masquerade     # is masquerade on in this zone?

firewall-cmd --zone=external --add-masquerade --permanent
firewall-cmd --reload                    # load permanent config into runtime

firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753
# inbound TCP/22 → port 3753; needs masquerade (RHCE trap)
```
