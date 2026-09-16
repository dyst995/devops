# Tasks — firewalld and iptables

Close `theory.md`. **Console.** Checkpoint. Do not panic over the only SSH session.

## Warm-up (model)

1. What is a **zone**? Runtime vs permanent? What copies disk → live?
2. iptables **service** files vs firewalld XML paths (vendor vs your overrides). Why might `/etc/sysconfig/iptables` be **missing** on RHEL?
3. How does an iptables-service change apply (flush, reread, rebuild) vs firewalld (differences only)? Why might SSH survive a live firewalld change?

## Zones (recall then apply)

4. From memory: one line each for drop, block, public, external, internal, dmz, work, home, trusted. What ICMP does **block** send (v4/v6 names)?
5. Show named services. Show what `ftp` actually opens (port + helper module).
6. Show active zones / default zone.

## Panic / NAT / forward (construct)

7. From **console**: panic on, see that SSH/ping from outside dies, panic off.
8. Query masquerade on **external**. Add at runtime, query, remove. Add permanent, reload, then remove permanent and reload so you do not leave NAT on.
9. Predict: forward-port without masquerade — exam trap from the notes. Then add a forward (e.g. 22 → 3753) only if you have a listener and masquerade; remove it.
10. Predict: `--permanent` without reload — is live traffic changed?

## Repeat runtime vs permanent

11. Allow HTTP in the zone of your lab NIC **now**. Test from another host. Remove runtime; test. Add permanent, reload, test. Remove and reload.

## Scenario

12. Web works on the box, remotes cannot connect. SSH must keep working. Fix. Prove remote HTTP.
13. Port 8080 only from one source IP. Prove. Revert.
