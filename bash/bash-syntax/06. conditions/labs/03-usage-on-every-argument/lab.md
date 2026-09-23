# Usage on every argument

An init-style script should:

- `start` → run a `start` action
- `stop` → run a `stop` action
- `condrestart` → `stop` then `start` only if a given process is running (notes: `test` + `pidof`)
- anything else → usage line and **exit 1**

Right now every argument, including `start`, prints usage.

**Goal:** `$1` selects the right branch. `;;` ends each clause. `esac` ends the statement. `*` is only the default. Prove `start`, `stop`, a bad argument (status 1), and `condrestart` with vs without that process.
