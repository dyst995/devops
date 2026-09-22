# Assignments — Runlevels and systemd targets

Close `commands.md`. Type and run. **`systemctl isolate` and `set-default` change the running system.** Do not `set-default` to `runlevel0.target` / poweroff on any machine you need. Prefer a lab VM. `isolate` can kill your GUI or SSH session — have a console or second way in.

## Default target (`systemctl get-default`, `set-default`)

### Easy

1. [ ] Show the default target this machine boots into (`get-default`).
2. [ ] On a **lab VM**: set the default to `multi-user.target`, then `get-default` again. Set it **back** to whatever it was if you still want a GUI next boot.

### Medium

3. [ ] `get-default` printed `graphical.target` or `multi-user.target`. In SysV language, is that closer to runlevel 5 or 3? Do not change anything for this item.
4. [ ] Someone ran `systemctl set-default runlevel0.target`. Do **not** run that. What does the course say that default means? How would you set a **server** default instead?

### Hard

5. [ ] Lab VM: record the current default, switch default to `multi-user.target`, confirm with `get-default`. You do **not** need to reboot for this item — default ≠ current state.
6. [ ] Look at `/etc/systemd/system/default.target` with `ls -li` (symlink). Does it agree with `get-default`? Do not replace it with `ln` unless the lab is disposable and you already know what you are doing.

## Switching state now (`systemctl isolate`)

### Easy

1. [ ] Read the current default again (`get-default`). `isolate` is a **different** command — say in one line what isolate does **not** change (the default).
2. [ ] Lab VM with a console: `isolate multi-user.target`. Did the GUI go away? `get-default` should be **unchanged**.

### Medium

3. [ ] After an isolate, get back to `graphical.target` with isolate **if** this is a desktop lab and you still need the GUI. Confirm you can open a terminal again.
4. [ ] Someone used `set-default` when they only wanted to switch **right now**. Which command should they have used? Prove `get-default` vs what you isolated.

### Hard

5. [ ] Lab only, console available: isolate to `multi-user.target`, confirm with whatever you can still run (`get-default`, maybe `ls`). Isolate back. Do not isolate `poweroff.target`.
6. [ ] Combine: default is X, you isolated to Y. Write both. Which one applies **after reboot**? Use `get-default` as evidence — do not reboot unless the lab asks.
