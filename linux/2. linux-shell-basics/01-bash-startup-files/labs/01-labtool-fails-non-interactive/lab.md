# labtool fails non-interactive

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

User `labdev` can run `labtool` in an **interactive SSH** session. The same command over a **non-interactive** remote invocation fails.

**Goal:** Both work for `labdev` without wrapping every call. Demonstrate interactive and non-interactive success.
