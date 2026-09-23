# Dot command vs ./file

`helpers.sh` sets a variable (for example `STAGE=prod`). A runbook says “load helpers, then start `./app.sh`.”

A teammate typed a **dot**, a **filename**, and thought that covered both “load” and “run.” After their version, either `STAGE` is missing in the current shell, or `app.sh` never runs as its own command — depending which form they used for both files.

**Goal:** Load `helpers.sh` so `STAGE` is set **in the current shell**. Run `app.sh` as a file in the **current directory**. Explain why the two dots are different table rows.
