# Assignments — alternatives

Close `commands.md`. Type and run. `--install` / `--remove` / `--set` change **system** links — **lab VM**. Use a throwaway group name or a practice binary under `/usr/local` if the lab prepared one. Do not `--remove` `java` on a machine that needs it unless you can `--install` it back.

## Registering and inspecting (`--install`, `--display`)

### Easy

1. [ ] `alternatives --display` on a group that exists on this box (`java` if present, or another name you discover). Read paths and priorities.
2. [ ] `java -version` (or the command the group provides) and match it to the path `--display` says is current.

### Medium

3. [ ] Lab: `--install` a practice slave/link only if the lab gives you two binaries. Use a **higher** priority number as in the course. `--display` again.
4. [ ] Someone used `--install` with the arguments in the wrong order (link, name, path, priority). Check `man alternatives` or the cheat sheet order, then display — do not guess on `/usr/bin/java` if you are unsure.

### Hard

5. [ ] After install, `--display` should list **two** paths if you added one. Which has the higher priority? `java -version` (or your command) — is it the auto winner?
6. [ ] Combine: `ls -l` the public link (e.g. `/usr/bin/java`) — symlink into alternatives. `read` it with `ls -li`. Do not `ln -s` over it by hand.

## Choosing a target (`--config`, `--set`, `--auto`, `--remove`)

### Easy

1. [ ] Lab: `alternatives --config` on your practice group. Note `*` current and `+` auto winner. Type the number of the **already selected** entry (no change) or quit if the UI allows.
2. [ ] `--display` after config. Still the same path?

### Medium

3. [ ] `--set` the group to a **specific path** (manual mode). `--display` should show manual. Confirm with `java -version` or your binary.
4. [ ] `--auto` to return to highest priority. `--display` and the version command again.

### Hard

5. [ ] `--remove` **only** the practice path you added — not the last remaining system JVM unless the lab is disposable. `--display` / version command afterward.
6. [ ] Broken: `--set java` without a path. Fix with a full path from `--display`. Combine `chmod`/`ls` only to inspect; do not chmod the JVM.
