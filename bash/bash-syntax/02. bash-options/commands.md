# Commands to memorize

```bash
set -o verbose               # enable option by name (here: verbose)
set -v                       # same; short form

set +o verbose               # disable that option
set +v                       # same; short form

set -e                       # exit the script when a command fails (errexit)
set -o errexit               # same as -e
set +e                       # default: do not exit on a failed command (+e)
```
