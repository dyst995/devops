# Ctrl-C vs kill -9

Start a script that only `sleep`s for a long time.

Once, stop it with **Control-C**. Once, from another terminal, send signal **9** to that script.

**Goal:** Report both statuses. Show they fit **128+n** (including why Control-C is 130).
