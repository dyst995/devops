# Assignments — Bash options

Close `theory.md`. Recite the **ideas**, then prove with throwaway scripts. Options are settings, not a pile of unrelated commands.

1. [ ] What are **options**, in one sentence from the notes?
2. [ ] Which **builtin** turns them on **inside a script**, at the point they should take effect?
3. [ ] Recite long form and short form to **enable** `verbose`. The two forms are equivalent — say that.
4. [ ] Recite long form and short form to **disable** `verbose`.
5. [ ] Which sign means **on**, which **off** (`-` vs `+`)? Why is that the opposite of “plus = more”?
6. [ ] Recite: `set -o name` = `set -abbrev`.
7. [ ] What does **verbose** / `-v` **do** (when the script **reads** a command)? Useful while learning — why noisy in production?
8. [ ] Recite the **long name** that matches **`-e`**. Write `set -e` and `set -o errexit`.
9. [ ] Recreate `exit_on_error.sh` from the notes. Predict full output. Is **`moving on`** printed? Why (errexit)?
10. [ ] Recreate `skip_error.sh` (default **`+e`**). Predict full output. Is **`moving on`** printed?
11. [ ] Memory hook: default Bash after a failed command? `set -e` after a failed command?
12. [ ] Compare the **last line** of the two example outputs in one sentence.
13. [ ] You need `-e` only for a **middle block**. How do you return to default after that block?
14. [ ] Turn `-e` on, fail `cat` of a missing file, prove the following echo does **not** run. Then `set +e` before the same `cat` and prove the echo **does** run.
15. [ ] Enable verbose for two echoes, then disable, then a third echo. Which lines are printed as they are **read**?
16. [ ] Interview: deploy must **stop** on failure except optional cleanup. Where do `-e` and `+e` go? Demonstrate both a stopping failure and a cleanup failure that does not stop `done`.
17. [ ] Wrong idea: `set +e` means “more strict.” What does `+e` actually do? Prove.
18. [ ] `set -o errexit` vs `set -e` — same behavior on the missing-file script. Prove.
19. [ ] Recite both example **filenames** and which one prints `moving on`.
20. [ ] Combined (no notes): options = behavior; `set` ±o / ±abbrev; minus on plus off; verbose traces reads; default `+e` keeps going; `-e` stops; `+e` after a sensitive block.
