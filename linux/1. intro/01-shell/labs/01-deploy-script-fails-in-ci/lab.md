# Deploy script fails in CI

The team’s `deploy.sh` works on your machine. CI runs it with `/usr/bin/env sh` and it fails.

**Goal:** One script at `/tmp/deploy.sh` that either works under both `sh` and `bash`, or refuses to run with a non-zero status and a clear reason. Demonstrate both interpreters.
