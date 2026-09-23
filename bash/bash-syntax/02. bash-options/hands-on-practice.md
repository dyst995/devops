# Hands-on practice — Bash options

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches. Use this topic plus script invocation.

---

## Easy

1. Write `keep-going.sh` that: prints `before`, tries to display a file that does not exist, prints `after`. Run it. Both `before` and `after` must appear, and you must still see the missing-file error.

2. Write `stop-early.sh` with the **same three steps**, but the script must **end** when the missing file is displayed. `after` must **not** print. Turn that behavior on **inside** the script, not by extra flags on the `bash` command line.

3. In `stop-early.sh`, after the missing-file command, try to display a file that **does** exist, then print `after`. With the “stop on failure” setting still on, confirm the existing file is never shown. Then change the script so only the missing-file command is “strict”: if that command fails, skip ahead and still print `after` (the rest of the file is allowed to continue after a failure).

4. Write `noisy.sh` with three `echo` lines. Turn on the option that **prints each command as it is read**. Run `./noisy.sh`. You should see more than three lines of output. Turn that option off for the last `echo` only, so the last command is not echoed as source.

---

## Medium

5. `strict-ls.sh` — list `$1` (a directory). If listing fails, the script must stop immediately (no later steps). If it succeeds, append the listing to `dir.ok` (create on first success) and print `logged` to the screen. A missing directory must not create `dir.ok`.

---

## Hard

6. **Broken trace.** Save this **exactly** as `broken-trace.sh`, then fix behavior (not just add `echo`).

```bash
#!/bin/bash
set -e
echo start
ls /no/such/dir/for-practice
echo "this must still print"
```

Required: `start` prints, the `ls` error appears, `this must still print` appears, script exits `0`. You may change options around the `ls` line only.

---

## Done when

You can make a script stop — or keep going — after a failed command, on purpose, and you can turn verbose on and off inside the file.