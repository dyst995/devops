# Assignments — xargs

Close `commands.md`. Type and run. Build a `names.txt` of **paths you created**. Never pipe `find /` into `xargs rm`. `-P` with `curl` only if the lab allows network; otherwise use `touch` / `echo` as the command.

## Basic `xargs` (`echo` default, `-i` / `-I`)

### Easy

1. [ ] Put three words on separate lines in `names.txt`. `cat names.txt | xargs` (default command is `echo`). One line of output?
2. [ ] `cat names.txt | xargs -I {} touch {}` (or `-i` / `{}` as in the course). `ls` the new files.

### Medium

3. [ ] Same list with `-iT` and placeholder `T` (`touch T`). Prove the files exist. Remove them with `rm -v` **only** those names.
4. [ ] Someone ran `xargs touch` without `-I`/`-i` and one `touch` got **all** names as arguments (usually fine) vs one file per line. Compare `xargs touch` vs `xargs -I {} touch {}` using `ls -l` timestamps if you `sleep 1` between styles.

### Hard

5. [ ] `find` your throwaway `*.log` files `-print` | `xargs` a safe command (`ls` or `wc` if you know it — otherwise `echo`). Then do the course `touch`/`rm` pattern only on those files.
6. [ ] Broken: `cat names.txt | xargs -I touch {}` (missing placeholder token). Fix it so each line becomes a file.

## Safe batching and parallel (`xargs -0`, `-P`)

### Easy

1. [ ] Create a file whose name contains a **space**. `find` it `-print0` | `xargs -0 ls -l` (or `echo`). Does the name stay one argument?
2. [ ] Without `-0`, `find -print | xargs` on that spaced name — what splits wrong? Do **not** `rm` from this broken pipeline.

### Medium

3. [ ] Recreate the course `/tmp` `core` example **in your throwaway dir**: `-print0 | xargs -0 rm` only your `core` files.
4. [ ] If the lab allows outbound HTTP: `urls.txt` with one or two URLs, `xargs -P 2 -I {}` plus `curl -O {}`. If no network, `xargs -P 2 -I {} echo {}` instead and still use `-P`.

### Hard

5. [ ] Combine `find` + space in names + `-print0` + `xargs -0` + `ls -li`. Then delete those files the same safe way.
6. [ ] Someone used `find … -print | xargs rm` on photos with spaces. Write what goes wrong, then run the **null-separated** form on a **practice** spaced name only.
