# Tasks — firewalld and iptables

Close `theory.md`. **Console.** Checkpoint. Prefer `--query` / `--get` / `--list` / `--info` before any change. Do **not** panic over the only SSH session. Revert what you add. Do the action or write the answer, then check yourself.

## Warm-up (model)

1. What is a **zone**? How is a zone bound (interface / source)? What does trust level control?
2. Runtime vs permanent: which is “now,” which is “on disk”? What copies disk → live?
3. List what firewalld supports from the notes (IPv4/IPv6, bridges, IP sets, runtime vs permanent, apps adding rules). One line each is enough.

## firewalld vs iptables service

4. iptables **service** files vs firewalld XML paths: where do IPv4/IPv6 rule dumps live (`/etc/sysconfig/iptables`, `ip6tables`)? Where are firewalld stock defaults vs your overrides (`/usr/lib/firewalld/` vs `/etc/firewalld/`)?
5. Why might `/etc/sysconfig/iptables` be **missing** on RHEL? Is that an error?
6. How does an iptables-service change apply (flush, reread, rebuild) vs firewalld (differences only)? Why might SSH survive a live firewalld change but die on a full iptables restart?
7. Who still filters in the kernel — firewalld itself or **netfilter**? What is firewalld’s role?

## Zones (recall)

8. From memory: one line each for **drop**, **block**, **public**, **external**, **internal**, **dmz**, **work**, **home**, **trusted**.
9. What ICMP does **block** send (IPv4 and IPv6 names from the notes)? How does that differ from **drop** for the remote client?
10. Which zone is the usual default on many servers? Which pair is the NAT gateway pair? Which is “wide open — use sparingly”?

## Services (query)

11. Show named services: `firewall-cmd --get-services`. Spot `ssh`, `http`, `ftp`.
12. Show what `ftp` actually opens: `firewall-cmd --info-service=ftp` (port + helper module). What is `nf_conntrack_ftp` for?
13. Also `--info-service=ssh` and `--info-service=http`. Write the ports. Prefer query only.

## Active zones (query)

14. Show active zones / default zone (`firewall-cmd --get-active-zones`, `--get-default-zone`, or `--list-all` if available). Which zone owns your lab NIC? Do not change zones over SSH without a console.

## Panic mode (console only)

15. From memory: what does `--panic-on` do? Is panic a zone?
16. From **console** only: `firewall-cmd --panic-on`, see that SSH/ping from outside dies, then `--panic-off` immediately. If you only have SSH, **write** the recovery path and **skip** the live panic. Never leave panic on.

## Masquerading (NAT)

17. Query masquerade on **external**: `firewall-cmd --zone=external --query-masquerade`. Do not toggle yet.
18. Add masquerade at **runtime**, query, then **remove**. Prefer a lab gateway VM.
19. Add masquerade **permanent**, `--reload`, query — then **remove permanent** and `--reload` so you do not leave NAT on. Warn yourself before `--permanent`.
20. Predict: masquerade belongs on **external** or **internal**? Why hide internal RFC1918 addresses?

## Port forwarding

21. Predict (exam trap): forward-port **without** masquerade — what happens? Write it from the notes before you try anything.
22. Add a forward (e.g. `port=22:proto=tcp:toport=3753` on `external`) **only if** you have masquerade, a listener plan, and a **console**. Then remove it. Do **not** forward away the SSH port you are using without a second path in.
23. Label the pieces: `port=`, `proto=`, `toport=` (and optional `toaddr=`). Permanent forward needs what two steps?

## Runtime vs permanent (predict + apply)

24. Predict: `--permanent` without `--reload` — is live traffic changed?
25. Predict: runtime-only change, then `--reload` — does the runtime-only rule survive?
26. Allow HTTP in the zone of your lab NIC **now** (runtime `--add-service=http` or the notes’ equivalent). Test from another host if you can. Remove runtime; test. Add permanent, reload, test. **Remove and reload** so you leave the box as you found it. Keep SSH working.

## Scenario

27. Web works on the box, remotes cannot connect. SSH must keep working. Fix with a service/port allow in the right zone. Prove remote HTTP. Revert if this is only a drill.
28. Port **8080** only from one source IP. Prove. Revert. Prefer rich-rule / source+port pattern your lab uses; do not lock yourself out of SSH.
