# STDOUT vs STDERR

All **error messages** should go to **STDERR**.

This makes it easier to separate **normal status** (stdout) from **actual issues** (stderr). You can redirect them independently: `script >out.txt 2>err.txt`.

A function to print error messages along with other status information is recommended.

```bash
err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}

if ! do_something; then
  err "Unable to do_something"
  exit 1
fi
```

| Piece | Meaning |
| --- | --- |
| `err()` | helper: timestamp + message |
| `date +'%Y-%m-%dT%H:%M:%S%z'` | ISO-like stamp, e.g. `2026-09-24T15:38:00+0400` |
| `"$*"` | all arguments as **one** word (the message) |
| `>&2` | send this `echo` to **stderr** (fd 2) |
| `if ! do_something` | run it; enter the block if it **failed** (nonzero) |
| `exit 1` | fail the script after the error line |

Normal progress (`echo "copied 3 files"`) stays on stdout. Do **not** `echo` errors without `>&2` — they would mix into `> log` and disappear from the terminal.

**Memory hook:** errors → stderr (`>&2`). Status → stdout. One `err` function, then `exit 1`.
