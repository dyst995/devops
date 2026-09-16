# Labs — firewalld and iptables

**Where:** Rocky VM **console** (not only SSH). Checkpoint first. Do not `--panic-on` over the only SSH session.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

List firewalld services. Show info for `ftp` and `http` / `ssh`. Show active zones and the default zone.

## Lab 2

From memory, write one line for each zone name in the notes (drop, block, public, external, internal, dmz, work, home, trusted). Check theory after.

## Lab 3

Runtime: allow `http` in the zone that serves your lab NIC. From another machine (or Windows), `curl` port 80 after `httpd` is running. Remove the runtime rule and try again. Add the same rule `--permanent`, `--reload`, test again. Remove the permanent rule and `--reload` when finished.

## Lab 4

On the **console**: `--panic-on`, try to ping/SSH from outside, then `--panic-off`.

## Lab 5

Query masquerade on `external`. Add masquerade at runtime, query, remove. Add `--permanent` masquerade, `--reload`, then remove permanent and `--reload` so you do not leave NAT on.

Add a forward-port rule as in the notes only if you have a process listening on the target port; remove it after. Note the notes’ remark about masquerade.

## Lab 6

Find where firewalld stores XML vs where the old iptables service stored rules. See whether `/etc/sysconfig/iptables` exists on this box.

## Job and cert labs

## Lab 7 — app ports (RHCSA)

Permanent: allow `http` and `https` (and a **custom port** 8080/tcp) in the default zone. `--reload`. Test from another host. Remove the custom port when done. Never remove `ssh` from the zone you use to log in.

## Lab 8

Rich rule: allow `8080/tcp` only from one source IP (your client). Test from that IP and, if you can, from another. Remove the rich rule.

## Lab 9

Assign a **second** NIC to `internal` (or `trusted` on a lab-only network). List `--get-active-zones`. Put it back.

## Lab 10

`firewall-cmd --list-all`. Save a copy of that output as “before” in a ticket. Change something, `--list-all` again, revert.
