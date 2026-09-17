# ifup failed but rc stayed 0

A script runs a command that can fail (the notes use `ifup eth0`; any command with a visible status is fine). On failure it is supposed to set `rc=1` by testing the **exit status**, then continue.

Right now `rc` stays 0 even when that command failed. Success must leave `rc` unchanged from 0.

**Goal:** Failed command → `rc=1`. Successful command → `rc` is not set to 1. Use the notes’ `[ $? -ne 0 ]` pattern, not a rewritten `if` unless you can explain it is the same test.
