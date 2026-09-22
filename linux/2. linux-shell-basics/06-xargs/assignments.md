# Assignments — xargs

Close `commands.md`. Recite, then type. Predict the result **before** you run. Use a throwaway directory under `/tmp`. **Never** pipe random `find /` output into delete commands. `rm` via `xargs` is still `rm` — only names you created.

## `xargs`

1. [ ] Recite the default command when you omit one. Feed a two-line name list on stdin and prove the lines are **joined into one** echoed line.
2. [ ] Predict: stdin is split on blanks **and** newlines. Feed `a b` on one line and `c` on the next. How many words does the default command get? Prove it.
3. [ ] Recite the old `-i` form: one invocation per input item, `{}` placeholder. From a file of names, create **one empty file per line** that way. Prove with `ls`.
4. [ ] Recite the modern `-I {}` spelling of the same idea. Repeat the one-file-per-line create. Same result as `-i`.
5. [ ] Recite `-i` with a **custom** placeholder (cheat sheet uses `T`, not `{}`). Create files using `T` as the placeholder. Prove the names match the list.
6. [ ] Predict: if you forget the placeholder on `-I`/`-i`, `touch` gets no filename (or the wrong args). Prove the failure, then fix it.
7. [ ] Combine: same `names.txt` → default join-echo → then `-I {}` one `touch` each. Two different shapes of argv.
8. [ ] Recite `-0`: split on NUL, not spaces. Create a throwaway file whose name contains a **space**. Drive `rm` with NUL-separated `find` (type `-f`, `-print0`, `-0` from memory). Prove the spaced name is deleted and nothing else.
9. [ ] Predict: **without** `-0`, a name with a space becomes two arguments. Prove with `echo` or a harmless `ls` — do not `rm` the halves. Then the `-0` fix.
10. [ ] Recite `-P` with a replacement: up to N processes at a time. Use four parallel workers and a placeholder to run a **safe** command per line (e.g. `touch` or `echo`, not a download storm). Prove more than one process can overlap (`ps` while it runs, or a slow `sleep` in a throwaway).
11. [ ] Recite the cheat-sheet combine: parallel + `-I {}` + `curl -O` on a URL list. **Do not** hit random production URLs. Either skip the network and recite the argv shape, or use a local file URL / lab endpoint. Recite `-O` (output to a file named from the URL).
12. [ ] Wrong-usage: `xargs rm` on an empty stdin. Predict whether `rm` runs with no args (GNU `xargs` often **skips**; some Unix run `rm` and it errors). Prove on your machine with a dummy command like `echo` first, then say the `rm` risk.
13. [ ] Wrong-usage: `-i` and `-I` together, or `-I` without a placeholder string. Predict the error. Then one correct form.
14. [ ] Combine: `find` regular files named `core` under a **throwaway** tree (create two fake `core` files) → `-print0` → `xargs -0 rm`. Prove both gone. Recite `-type f`.
15. [ ] Privilege: `xargs` as you cannot delete files you do not own. Predict `rm` failing on a root-owned file. Do **not** `sudo xargs rm`. Stay in `/tmp`.
16. [ ] Predict: default `xargs` batches many args onto **one** command line until it fills. `-I` forces **one item per command**. Prove by wrapping `echo` with both forms on a 5-line list (one line vs five lines of output).
17. [ ] Recite: `cat list | xargs` vs `xargs < list` — same stdin idea. Prove default echo join both ways.
18. [ ] Wrong-usage: `xargs -i touch {}` with **no** stdin (you sit at the keyboard). Ctrl-D to finish. Prefer a file. Recite that stdin is the list.
19. [ ] Combine: custom placeholder `T` + `touch` + a list that includes a name with a dash. Predict `touch` treating dashes as flags — then `--` or a `./` prefix if you hit that snag.
20. [ ] Combined: default echo-join; `-i` `{}`; `-I {}`; `-iT`; `-0` with spaces; `-P` with `-I`; never `rm` outside the throwaway tree. **Warning:** `xargs rm` / `xargs -0 rm` is destructive. Never against `/`.
