# Assignments — Runlevels

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

**`set-default runlevel0.target` boots into poweroff — do not use it on a real server. `isolate` switches the live system now (can kill the GUI/SSH-unfriendly states). Prefer a lab VM. Recite dangerous targets; do not demonstrate poweroff/reboot defaults on production.**

## `systemctl`

1. [ ] Show which target the machine **boots into** (the default).
2. [ ] Recite from memory the subcommand that **gets** that default.
3. [ ] Predict: the answer is a `.target` name (for example `graphical.target` or `multi-user.target`), not a random `.service`.
4. [ ] Recite: **set** the default to **server** — text + network, no GUI (`multi-user.target`).
5. [ ] Recite: **set** the default to **desktop GUI** (`graphical.target`).
6. [ ] Recite: `runlevel0.target` as default means **poweroff**. **Do not apply this on a real server.**
7. [ ] Predict: `runlevel0.target` is a compatibility name for `poweroff.target`. Write that mapping.
8. [ ] Recite SysV memory hook: **0** halt, **3** server, **5** GUI, **6** reboot — then name the systemd targets for 3 and 5.
9. [ ] Privilege: predict `get-default` may work as a user; `set-default` and `isolate` need root.
10. [ ] What if the operand is missing: `systemctl` with no subcommand. Predict a unit dump/help — not the default target. Then use the get-default form.
11. [ ] Wrong usage: `set-default` without a unit name. Predict usage error. Do not guess `runlevel0.target` to “try something”.
12. [ ] Human vs default: `get-default` **reads**; `set-default` **writes** the boot default. Predict only the latter changes the next boot.
13. [ ] Switch to `multi-user.target` **now** without changing the default (sheet: isolate). **Lab VM only** if you are on a GUI you still need — this can drop the desktop.
14. [ ] Recite: `isolate` = now, does **not** change default; `set-default` = next boots, does not by itself mean “switch this instant”.
15. [ ] Combine: `get-default`, then isolate to multi-user (lab), then `get-default` again — predict the default **string is unchanged**.
16. [ ] Combine: map `runlevel3.target` → `multi-user.target` and `runlevel5.target` → `graphical.target`. Prove with a listing of those names if they exist (`ls` of the systemd unit, read-only).
17. [ ] Wrong usage: isolating `poweroff.target` / `runlevel0.target` as a “test”. That **halts the machine**. Recite only.
18. [ ] Wrong usage: `set-default graphical.target` on a headless server you do not intend to boot to a display manager. Recite the safer server default.
19. [ ] What if the target name is misspelled (`multiuser.target` without the hyphen). Predict unit-not-found; do not keep substituting `runlevel0`.
20. [ ] Closed-book: write the five cheat-sheet lines as **goals** (get default; default server; default GUI; default poweroff = forbidden on real servers; isolate multi-user now). Then type only the safe ones (`get-default`, and set/isolate on a lab VM).
