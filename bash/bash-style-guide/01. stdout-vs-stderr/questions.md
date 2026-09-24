# STDOUT vs STDERR — Questions

Cover the Answers section. Answer first, then check.

1. Where should all error messages go? Why?
2. Recite the `err` function from the notes. What does `>&2` do? What is `"$*"`?
3. Recite the `date` format string. What does it look like?
4. After `if ! do_something; then` — what two lines follow? Why `exit 1`?
5. `script >out.txt` without `2>` — where do `err` lines go? Where do they go if you forgot `>&2`?

---

## Answers

1. STDERR. So normal status stays separate from issues (`>out` / `2>err`).
2. `echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2`. Send that echo to fd 2. All arguments as one message.
3. `%Y-%m-%dT%H:%M:%S%z` — e.g. `2026-09-24T15:38:00+0400`.
4. `err "Unable to do_something"` then `exit 1`. The script must fail, not continue.
5. Still the terminal (stderr not redirected). Into `out.txt` — mixed with status, looks like success.
