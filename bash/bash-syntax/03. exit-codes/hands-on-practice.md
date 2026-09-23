# Hands-on practice — Exit codes

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches. Use this topic plus scripts and options you already have.

---

## Easy

1. In the current shell (not a script), run a command that succeeds. Immediately capture its status into a file `last-ok.txt` as a single number. Then run a command that cannot be found. Capture **that** status into `last-missing.txt`. Open both files: one number must be `0`, the other must be the “not found” status from the notes.

2. Write `status-report.sh`. It runs `ls` on a path you pass as the first argument. It prints only one line: `ok` or `fail`. The word must follow whether `ls` succeeded. When you pass a real directory vs a nonsense path, the printed word must change. The script’s **own** exit status must be `0` on `ok` and `1` on `fail`.

3. Write `cannot-run.sh` that tries to “run” something the kernel will refuse (the notes use a device node as an example). After that attempt, write **only** the numeric status to `cannot-run.status`. That number should be the “invoked, cannot execute” status, not “command not found.”

4. Write `leave.sh` so that:
    - `./leave.sh` exits `0`
    - `./leave.sh 7` exits `7`
    - `./leave.sh 3.14` does **not** exit `3` — you should see the invalid-`exit` situation from the notes
    Prove each case by printing the status **from the shell that launched the script**, not from inside `leave.sh` after `exit`.

5. Start `sleep 60` in the **background**. From the same shell, send it signal **9**. Capture the status of `wait` on that job (or of the `sleep` if it is already gone) into `killed.status`. The number should match **128 + 9**. Clean up; do not signal other processes.

---

## Medium

6. `each-status.sh` — arguments are commands **as separate words you will run** (keep it simple: `ls`, `true`, `false`, a typo). For each, run it, then append `command:STATUS` to `statuses.log` (`STATUS` is the status of that run). Failed commands must not abort the whole script. At the end print how many arguments you processed.

---

## Hard

7. **Classify exit.** `classify.sh` runs `"$1"` with no extra arguments (e.g. `./classify.sh ls`, `./classify.sh /dev/null`, `./classify.sh nosuchcmd`). It prints one word: `success`, `notfound`, `cannot-run`, or `other` based on the status **families** in the notes. Then exits `0` if it printed `success`, else `1`. Do not look up a table in the script comments — encode the numbers you already practiced.

---

## Done when

You inspect a command’s status right after it runs, make a script exit `0` vs non-zero on purpose, and you can tell “not found” from “found but cannot run.”