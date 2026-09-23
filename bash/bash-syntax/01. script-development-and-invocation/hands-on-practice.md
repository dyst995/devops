# Hands-on practice — Script development and invocation

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

Earlier material is fair game. Later Bash-syntax topics are not required yet.

---

## Easy

1. Create `hello.sh`. Line 1 must name **Bash** as the interpreter. The script prints `ready` and your username. Run it **without** making it executable. Then make it executable and run it as a program from this directory. Both runs must print the same two lines.

2. Copy `hello.sh` to `hello-sh.sh` and change only the first line so a **POSIX `sh`** interpreter is named. Run it three ways: feed it to `sh`, feed it to `bash`, run it as `./hello-sh.sh`. Note whether the first line matters for each method.

3. Create `nopath.sh` (sha-bang + `echo ok`), `chmod +x`, and try to run it as `nopath.sh` (no `./`). Then run it with `./`. Record the two outcomes. Do not change `PATH`.

4. Write `wrongbang.sh` whose first line points at a path that does **not** exist (example idea: `/bin/this-interpreter-is-missing`). Make it executable and run `./wrongbang.sh`. Then run `bash wrongbang.sh`. The two failures should not look the same.

---

## Done when

You can put a real sha-bang on line 1, run a file with `sh`/`bash` without the execute bit, and run `./name` after `chmod +x` — and you know which method uses the sha-bang.