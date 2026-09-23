# Hands-on practice — Functions

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches. Earlier topics in this Bash section are in play.

---

## Easy

1. Write `print_args.sh` that defines a function taking two arguments and prints them as `first: …` / `second: …` using **function-local** names. Call it with `/tmp` and `hello`. After the function returns, `echo` those local names — they must be empty in the script body.

2. Write `ret-vs-exit.sh` with two functions like the notes: one **returns** `1`, one **exits** `1`. The script must print `still here` after the first function and must **not** print `never` after the second. Confirm the script’s status is `1`.

3. Write `ok-or-not.sh`. A function `check_dir` takes a path. It returns `0` if that path is a directory, `1` otherwise. The script calls it on `box` and on `note.txt` (create them if needed) and prints `yes` or `no` from the function’s status after each call. The function must not `exit` the script.

---

## Medium

4. `lib-math.sh` + `use-math.sh` — library file defines a function `double` that prints twice its integer argument. `use-math.sh` pulls the library into **this** shell and calls `double 6` (expect `12`). Running `lib-math.sh` by itself must do nothing visible (or only define, not print `12`).

---

## Hard

5. **Mini service.** `ctl.sh` accepts `start` / `stop` / `status` / anything else:
    - `start` — create `svc.lock` and write this script’s PID into it. Print `started`. If already started, print `already` and exit `0`.
    - `stop` — remove the lock if present; print `stopped` or `not-running`.
    - `status` — print `up` or `down` and exit `0` / `1` respectively.
    - else — usage, exit `1`.
    Implement start/stop/status as **functions**. `return` vs `exit` must not kill the script too early on `status`.

---

## Build from a spec

These use the whole Bash-syntax section. No hints about which feature to reach for.

6. **`apply.sh`**

    `./apply.sh COMMAND DIR`

    - `COMMAND` is `list` or `count` (anything else → usage, exit `1`).
    - `DIR` is required; defaulting is not allowed.
    - `list` — print each regular file’s name (not the directory prefix) **sorted**, one per line, to stdout; also write the same list to `apply.list`.
    - `count` — print a single number: how many regular files; do not print names.
    - If `DIR` is missing or not a directory, message on stderr, exit `1`.
    - Failed listing of a file must not abort `list` of the others.

7. **`job.sh`**

    A tiny “job runner” for practice files only.

    - `./job.sh submit NAME` — create `jobs/NAME.pending` (empty is fine). Refuse if `NAME` already exists as any `jobs/NAME.*`. Exit `1` on refuse.
    - `./job.sh start NAME` — if `NAME.pending` exists, move it to `NAME.running` and write the current date into it. Exit `1` if not pending.
    - `./job.sh finish NAME` — if running, move to `NAME.done`. Exit `1` otherwise.
    - `./job.sh status NAME` — print `pending`, `running`, `done`, or `unknown`. Exit `0` except `unknown` → `1`.
    - `./job.sh` with no args or a bad verb — usage, exit `1`.
    - Create `jobs/` if needed. One function per verb is a good shape; not required if the behavior is right.

---

## Done when

You can put repeated work in a function that **returns** a status without exiting the script, keep names `local`, and source a library of functions into the caller.