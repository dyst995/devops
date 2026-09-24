# Commands to memorize

```bash
err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2   # errors to stderr
}

if ! do_something; then
  err "Unable to do_something"                      # timestamp + message on fd 2
  exit 1                                            # fail the script
fi

# script >out.txt 2>err.txt   — stdout vs stderr in two files
```
