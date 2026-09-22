# Assignments — firewalld and iptables

Close `commands.md`. Recite the flag, then type it. Work on a **lab VM**, not a production host.

**Danger:** `--panic-on` drops **all** packets, including your SSH session. Use a console or a recoverable out-of-band session. Do **not** flush iptables/ip6tables on a live SSH-only box (the old service rebuilds by deleting every rule first).

## `firewall-cmd`

1. [ ] List every **named service** firewalld can allow. Confirm `ssh`, `http`, and `ftp` appear. Predict two more names before you look.
2. [ ] Show what the **ftp** service actually opens. Predict port, protocol (`21/tcp`), and whether a helper module is listed — then prove it.
3. [ ] Predict: allowing a **named service** vs opening a raw port — same effect for ftp? One sentence after you compare the service info to a port rule.
4. [ ] Privilege: run a services list as a normal user vs root. What fails, and what still works?
5. [ ] **Console only (not the only SSH session):** turn **panic** on. From another host, prove ping and SSH die (dropped, not a polite reject).
6. [ ] Leave panic mode. Prove connectivity returns. Predict: does panic persist across reboot?
7. [ ] Predict out loud: what happens if you panic-on over the **only** SSH session to a VM with no console? Do not do that on a host you cannot recover.
8. [ ] On zone **external**, **query** whether masquerade is on. Record yes/no before you change anything.
9. [ ] Enable **masquerade** on external at **runtime** only. Query again. Predict: does this survive reboot? Prove by saying what you would check after a reboot (do not reboot if it would strand you).
10. [ ] Remove masquerade on external (runtime). Query to prove it is off.
11. [ ] Add masquerade on external **permanently** (on disk). Predict **before** reload: is live NAT already changed? Prove with a query.
12. [ ] **Reload** so permanent config becomes runtime. Query masquerade on external. Predict: what happens to existing connections vs an iptables-service flush/rebuild?
13. [ ] Predict: `--permanent` without reload — is live traffic changed? One sentence; then prove with a harmless permanent add + query + reload + cleanup.
14. [ ] Recite from memory the **forward-port** pieces: inbound port, protocol, destination port. Add a forward of TCP/22 → 3753 on **external** only if this is a disposable lab and you have a way back in.
15. [ ] **RHCE trap:** predict whether that forward works **without** masquerade. One sentence from the notes; do not leave a broken SSH remap in place.
16. [ ] If you added a forward, **remove** it (runtime and permanent if needed) and reload so SSH is not left remapped. Query or list forwards to prove cleanup.
17. [ ] Combined: runtime masquerade vs permanent vs reload. Three short sentences: what is “now”, what is “on disk”, what is “after reboot”.
18. [ ] Predict: forwarding **port 22** on a box you use for SSH — what can go wrong for your current session vs new inbound clients?
19. [ ] Contrast: why a live firewalld change can keep SSH up, while an **iptables flush** / service restart often drops the session. Do **not** flush iptables to test this on an SSH-only host.
20. [ ] Cleanup: remove any permanent masquerade or forward you added, reload, query so the lab is back to baseline. Confirm panic is **off**.
