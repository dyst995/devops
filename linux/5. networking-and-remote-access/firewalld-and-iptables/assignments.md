# Assignments — firewalld

Close `commands.md`. Type and run. **`--panic-on` drops ALL packets** — you can lose SSH. Use a **lab console**. `--add-masquerade` / `--add-forward-port` / `--permanent` / `--reload` change connectivity. Prefer `query` and `get-services` first. Revert what you add.

## Services (`--get-services`, `--info-service`)

### Easy

1. [ ] `firewall-cmd --get-services`. Spot `ssh`, `http`, `ftp`.
2. [ ] `--info-service=ftp` (course: ports/modules, ftp → 21/tcp). Try `--info-service=ssh` too.

### Medium

3. [ ] `systemctl is-active firewalld` (or `status`). If firewalld is off, do not enable it on a remote-only host without a console.
4. [ ] Someone opened a **port number** in their head but the course uses **service names**. Pick `http` and read `--info-service`. What port is that?

### Hard

5. [ ] Combine: `netstat -nlpt` (tools topic) vs `--info-service=ssh`. Same port?
6. [ ] `firewall-cmd` not found: `apt-cache`/`rpm` only if you know them — or record that this VM uses another stack. Do not install firewalld on a production-like box for fun.

## Panic and masquerade

### Easy

1. [ ] `--zone=external --query-masquerade`. on or off? Do **not** toggle yet.
2. [ ] Read the cheat sheet: `--panic-on` means drop **all**. Do **not** turn it on over SSH.

### Medium

3. [ ] Lab **console**: `--panic-on`, try `ping` **from another machine** or locally, then `--panic-off` immediately. If you only have SSH, **skip** panic entirely.
4. [ ] Lab: `--zone=external --add-masquerade`, `--query-masquerade`, then `--remove-masquerade`. Not `--permanent` yet.

### Hard

5. [ ] Permanent masquerade **only** if the lab is a NAT exercise: `--add-masquerade --permanent`, `--reload`, `--query-masquerade`. Remove permanent + reload when done.
6. [ ] Broken: `--panic-on` then closed the laptop. How do you recover? (console `--panic-off`.) Combine `ping` after off.

## Forward ports and reload

### Easy

1. [ ] `--reload` on a lab **after** you know you have no accidental `--permanent` rules you forgot (or reload is a no-op). `status` firewalld.
2. [ ] Recite the course trap: forward-port needs **masquerade**. Do not add a forward yet.

### Medium

3. [ ] Lab NAT exercise only: `--add-forward-port` as in the course (`port=22:proto=tcp:toport=3753`) on `external`, with masquerade. Have a console. Remove the forward when done.
4. [ ] Someone added a runtime rule and rebooted — it vanished. Add `--permanent` + `--reload` **only** for a lab rule you intend to keep, then remove it the same way.

### Hard

5. [ ] Runtime vs permanent: add a **queryable** change (masquerade), reboot **only** if the lab allows, see if it survived. Prefer `--permanent` demonstration without reboot: add runtime, `--reload` (reload **drops** runtime-only). Query after.
6. [ ] Combine: do not forward SSH away on the NIC you use. Use `netstat`/`sshd` status to see what listens on 22. Revert all lab firewall changes.
