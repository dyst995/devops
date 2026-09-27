# Tasks — Bash options

Close `theory.md`. Work in `/tmp/bash-options-tasks` when creating scripts. Predict before you run where useful. Put `exit` only **inside scripts**, never in your interactive shell session.

## Warm-up

1. In one sentence: what are options?
2. At the point in a script where behavior should change, which builtin do you use?
3. Write the **on** pair and the **off** pair for `verbose` (long name and abbreviation).
4. Which character enables, which disables? Predict: `set +v` — is verbose on or off?
5. Recite the memory hook: **`-`** turns the option **on**. **`+`** turns it **off**. What is the long name that matches `-e`?

## Enable / disable forms

6. In a short script, turn verbose **on** with `set -o verbose`, run two `echo`s, then turn it **off** with `set +o verbose`, then one more `echo`. Which lines are echoed as they are **read**?
7. Repeat task 6 using only short forms (`set -v` / `set +v`). Same visible behavior?
8. Write `set` using the **option name** that matches `-e` (`errexit`). Confirm it behaves like the notes’ example 1.

## `set -e` vs default

9. Recreate `exit_on_error.sh` from the notes (missing file `cat`, then a line that would print `moving on`). Predict the full output. Run it. Was `moving on` there?
10. Recreate `skip_error.sh` (notes: default is `+e`). Predict the full output. Run it. Compare the last line with task 9.
11. Same script as 9, but enable `-e` only **after** an early `echo` that must always run, then fail `cat`, then an `echo` after. What prints?
12. Enable `-e`, run a **successful** command, then a failing one, then an echo. Confirm only the success and the failure’s error message appear (no later echo).

## Toggle around a block

13. Script: `set -e`, fail intentionally, prove it stops. Then a second script: `set -e`, `set +e` before a failing `cat`, then `echo still going`. Does `still going` print?
14. Three invocations of the same failing `cat` in one script file’s three modes: (a) no `set`; (b) `set -e` before `cat`; (c) `set -e` then `set +e` before `cat`. For each, does the following `echo` run? Record yes/no three times.

## Verbose + errexit together

15. Script with `set -v` and `set -e`. Include a failing command and a later echo. Predict: do you see the failing line echoed as it is read? Do you see the later echo?

## Scenario

16. A deploy script must **stop** if any command fails, except one optional cleanup that is allowed to fail. Implement with options turning on and off at the right points under `/tmp/bash-options-tasks`. Demonstrate both a failure that stops the script and a failure in cleanup that does not (show “cleanup failed but we finished”).
