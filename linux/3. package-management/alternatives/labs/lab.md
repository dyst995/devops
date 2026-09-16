# Labs — alternatives

**Where:** Rocky VM. Checkpoint if you change the system `java` or `python3` links. Prefer a throwaway group name if you do not want to touch `java`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

If `java` is installed: `alternatives --display java` and `java -version`. If not, pick another group that exists (`python3`, `editor`) or skip to Lab 2.

## Lab 2

Install two small packages that provide similar commands, or copy two dummy binaries into `/usr/local/bin` (for example `lab-tool-a` and `lab-tool-b` that echo different strings). Register both with `alternatives --install` under one public name (for example `/usr/local/bin/lab-tool`) with different priorities.

## Lab 3

Use `--config` to pick one, then `--set` to pin a path, then `--auto`. After each change, run the public name and `--display`.

## Lab 4

`--remove` the paths you registered. Delete dummy binaries if you created them.

## Job and cert labs

## Lab 5

Ticket: “the app must use Java X, the OS default is Java Y.” If two JDKs exist, switch with `alternatives` and show `java -version` plus `readlink -f $(command -v java)`. Switch back.

## Lab 6

Same idea for `python3` or `editor` if java is not installed. Document (in your own notes) how you would pin this so a package update does not surprise you (`--set` vs `--auto`).
