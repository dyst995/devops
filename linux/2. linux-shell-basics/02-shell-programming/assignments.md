# Assignments — Shell programming

Close `commands.md`. Type and run. Do not put secrets in variables you will screenshot. Prefer a nested shell if you will `export` / `unset` things you still need.

## Variables and `echo`

### Easy

1. [ ] Assign `KEY=value` with **no** spaces around `=`. `echo` it with quotes around the expansion.
2. [ ] Assign a value that contains spaces (quoted). `echo` that variable.

### Medium

3. [ ] Assign `KEY_MULTI` with two values separated by `:` (course form). `echo` it. Then `echo` `$HOME` and `$PATH`.
4. [ ] Someone typed `KEY = value` (spaces). Run it, then the correct assignment. What error did the spaces cause?

### Hard

5. [ ] `echo $HOME` vs `echo "$HOME"` vs `echo '$HOME'`. Which expands? Prove all three.
6. [ ] Write a two-line throwaway script that sets a variable and `echo`s `$0` and that variable. `chmod +x` (filesystem topic) and run it. Is that variable set in your **interactive** shell afterward?

## Environment (`env`, `set`, `export`, `unset`)

### Easy

1. [ ] Run `env` and find `PATH` or `HOME` in the dump (pipe to `less` if you already know it; otherwise scroll / `echo "$PATH"`).
2. [ ] `export` a variable named something unique (`PRACTICE_ENV=1`), then `env` and confirm it appears.

### Medium

3. [ ] `unset` that variable. Confirm it is gone from `echo` and from `env`.
4. [ ] Run `set` (huge). How is it different from `env`? You may `| less` if `less` is already familiar; otherwise `echo` a known shell-only vs exported name.

### Hard

5. [ ] `env VAR=tmp` plus a tiny script that `echo`s `VAR`. After it exits, is `VAR` set in **your** shell? Course: your shell unchanged.
6. [ ] Combine with startup files: `export EDITOR=nano` in this session, `env` to prove it, `unset EDITOR` when done. Do not leave a broken `EDITOR` if you already had one — restore or unset.

## Debugging a script (`bash -x`)

### Easy

1. [ ] Write `script.sh` with two `echo`s and one assignment. Run it with `bash -x`.
2. [ ] Run the same script **without** `-x`. What extra output did `-x` add?

### Medium

3. [ ] Put a **wrong** assignment (`KEY = value`) in the script. Run `bash -x` and find the failing line in the trace.
4. [ ] `chmod +x` and `./script.sh` vs `bash -x script.sh`. Both should run; only one prints each command.

### Hard

5. [ ] Script that `echo`s `$PATH` and `$HOME`. `bash -x` it. Then `source` a line that changes `PATH` **in a nested shell only**, `bash -x` again, `exit`. Do not wreck this session’s `PATH`.
6. [ ] A script “does nothing.” Add `bash -x` and decide: it never ran, it ran but `echo` was quoted wrong, or a command failed. Fix the script, not the kernel.
