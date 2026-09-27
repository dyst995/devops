# Tasks — STDOUT vs STDERR

Close `theory.md`. Work in `/tmp/stdout-vs-stderr-tasks` when writing practice scripts.

## Warm-up

1. From memory: where should **error messages** go? Where should **normal status** go? Why can you redirect them independently?
2. Recite the memory hook: errors → stderr (`>&2`). Status → stdout. One `err` function, then `exit 1`.
3. Write the redirect pattern that puts stdout and stderr in two files: `script >out.txt 2>err.txt`.

## The `err` helper

4. From memory, write the course `err()` function body: timestamp format, `"$*"`, and `>&2`. Save it in `/tmp/stdout-vs-stderr-tasks/err.sh`.
5. Explain each piece in one line: `err()`, `date +'%Y-%m-%dT%H:%M:%S%z'`, `"$*"`, `>&2`.
6. Call `err "hello"` and prove the line lands on **stderr** only (`2>err.txt`; stdout empty when you redirect `1>` separately or capture both).
7. Call `err "one" "two" "three"` — prove `"$*"` joins into **one** message word on the error line.

## Fail, report, exit

8. Write a stub `do_something` that returns nonzero. Wrap it with `if ! do_something; then err "Unable to do_something"; exit 1; fi`.
9. Run that script; confirm exit status is `1` and the error line is on stderr (timestamp present).
10. Change `do_something` to succeed (`return 0` / `true`). Predict: no `err`, exit `0`. Prove it.

## Status stays on stdout

11. Add a normal progress line (`echo "copied 3 files"`) on stdout. Run with `>out.txt 2>err.txt`. Confirm progress is only in `out.txt` and errors only in `err.txt`.
12. Force a failure path and a success path in two runs. Show that success leaves `err.txt` empty (or unchanged) and failure does not pollute `out.txt` with the error text.

## Break a rule, then fix it

13. **Break:** write an “err” helper that `echo`s the message **without** `>&2`. Redirect the script with `>out.txt` only. Prove the error disappears into the log and is missing from the terminal’s stderr view when you compare streams.
14. **Fix:** restore `>&2`. Re-run the same redirects; prove errors are back on fd 2 and out of the pure stdout log.
15. **Break:** after a failed command, call `err` but **omit** `exit 1`. Show the script continues and may exit `0` — bad style for a hard failure.
16. **Fix:** put `exit 1` back after `err`. Confirm the script stops with status `1`.

## Predict-then-prove

17. Predict what appears in `out.txt` vs `err.txt` for: success status echo + failed `err` line. Run and check.
18. Predict: `err "Unable to do_something" >out.txt` (redirecting the `err` call itself) — does `>&2` still win, or does the redirect steal it? Write the answer, then prove with a tiny script.

## Scenario

19. Ticket: “our backup script’s failures vanish into the success log because we redirect with `>backup.log`.” Write a minimal backup stub that uses `err` + `exit 1` for failures and a status `echo` for success. Demonstrate `./backup.sh >backup.log 2>backup.err` so operators still see (or file) real errors separately.
