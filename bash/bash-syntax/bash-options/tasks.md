# Tasks — Bash options

Close `theory.md`. Do not open `commands.md` unless you ask for help.

## Warm-up

1. In one sentence: what are options?
2. At the point in a script where behavior should change, which builtin do you use?
3. Write the **on** pair and the **off** pair for `verbose` (long name and abbreviation).
4. Which character enables, which disables? Predict: `set +v` — is verbose on or off?

## Predict, then run

5. Recreate `exit_on_error.sh` from the notes (missing file, then a line that would print `moving on`). Predict the full output. Run it. Was `moving on` there?
6. Recreate `skip_error.sh` (notes: default is `+e`). Predict the full output. Run it. Compare the last line with task 5.
7. Same script as 5, but disable errexit **after** the failed `cat` would be too late — instead, enable it only **after** an early `echo` that must always run, then fail `cat`. What prints?

## Construct

8. Turn verbose **on** for three lines of a script, then **off**. Run it. Which lines are echoed as they are read?
9. Write `set` using the **option name** that matches `-e`. Confirm it behaves like example 1.

## Repeat

10. Three invocations of the same failing `cat`: no `set`; `set -e`; `set -e` then `set +e` before `cat`. For each, does the following `echo` run?

## Scenario

11. A deploy script must **stop** if any command fails, except one optional cleanup that is allowed to fail. Implement with options turning on and off at the right points. Demonstrate both a failure that stops the script and a failure in cleanup that does not.
