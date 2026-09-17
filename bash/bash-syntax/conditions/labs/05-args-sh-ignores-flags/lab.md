# args.sh ignores flags

The course `args.sh` (`-m` message, `-n` count default 5, `-h` help, `set -euo pipefail`).

With no arguments you should get usage and a failing status. `-m Hello` should print `Hello` five times. `-m Hi -n 1` should print `Hi` once.

Right now it always prints five empty lines, or always help.

**Goal:** Match all three sample runs from the notes. Empty `"$@"` triggers help and `exit 1`. `-h` prints help and `exit 0`.
