# Hands-on practice — Variables

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

---

## Easy

1. Write `label.sh` that assigns a three-word sentence to a variable (spaces in the value) and prints it as **one** line. If you omit quoting in the assignment, the script should fail or behave wrongly — fix the assignment, not `echo`.

2. Write `suffix.sh` that sets `unit=web` and prints `webapp` by expanding the variable **glued** to the letters `app`. If `$unitapp` is empty, you used the wrong form.

3. Write `as-int.sh` that assigns `n=8/2` and prints `n` twice: once as the **string** `8/2`, once as the **integer result** `4`. The second print must use the integer property from the notes, not a different tool.

4. Using the course demo string `abcABC123ABCabc` (assign it once), write `string-ops.sh` that prints, each on its own line:
    - character count (`15`)
    - five characters starting at index `2` (`cABC1`)
    - shortest front strip of `a*C`
    - longest front strip of `a*C`
    - first `abc` replaced by `xyz`
    - every `abc` replaced by `xyz`
    Match the notes’ results. Do not type those results as literals except to check yourself.

5. Write `open.sh`. If you pass a filename, it prints `using: ` and that name. If you pass nothing, it prints `using: generic.data`. An empty first argument must behave like “nothing.” Do not write an `if` yet if you can do it with a default at assignment time.

6. Write `need-user.sh` that **aborts** with status `1` if `USER` is unset, using the “required or die” form (null command + required parameters is fine). Force the failure by running it in an environment where `USER` is unset (`env -u USER ./need-user.sh` if you already know `env`; otherwise `unset USER` in a **nested** shell, run the script, `exit`). On success it prints `hello, ` and the username.

7. Write `args-list.sh` that prints `count=N` where `N` is how many arguments you passed, then one line per argument: `1: first`, `2: second`, … Include a run with **four** arguments and a run with **zero**. `$0` must not appear as an argument line.

8. Write `arr.sh` that builds the course array `zero one two three four five`, adds `six` at index `6`, then prints:
    - the element at index `6`
    - all elements on one line
    - the **element count** (must be `7`, not the length of `zero`)

---

## Medium

9. `backup-name.sh` — first argument is a filename (e.g. `app.log`). Print a backup name that is the original with a `.bak` suffix, using string work on the argument, not by typing `app.log.bak` as a literal. If no argument, use `generic.data` as the original name.

10. `ext-only.sh` — arguments are paths like `a/b/report.tar.gz`. For each argument, print only the part after the **last** dot (`gz` for that example). Skip any argument that has no dot; print `skip: ` and the argument to **stderr**, and continue with the rest. Exit `0` if at least one name was printed to stdout, else `1`.

11. `env-child.sh` — set `PRACTICE_MARK=1` in a way that a **child** script `show-mark.sh` can see it (`show-mark.sh` only prints `PRACTICE_MARK=` and the value). Run `show-mark.sh` as its own process. Then unset the mark and run `show-mark.sh` again — the value must be gone. Do not put the assignment inside `show-mark.sh`.

---

## Hard

12. **Rotate.** `rotate-logs.sh` looks at `var-log/` (create dummy `app.log`, `app.log.1`, `app.log.2`). After a run: `app.log` becomes `app.log.1` (contents preserved), old `.1` becomes `.2`, old `.2` is removed. A fresh empty `app.log` is left behind. If `var-log/app.log` is missing, exit `1` with a message on stderr. Running twice in a row must not leave two files with the same content under the same name.

---

## Done when

You can assign and expand names (including glued suffixes), use defaults for missing arguments, export something a child can see, and get array **element count** rather than the length of the first element.