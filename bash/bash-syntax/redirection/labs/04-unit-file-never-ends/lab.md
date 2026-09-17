# unit.file never ends

A systemd-style snippet must be written with a **here document** (`cat <<EOF > unit.file` …) — Unit / Install / Service lines from the notes. The closer is a line with **only** the delimiter and **no trailing blanks**.

A second check: `grep -q txt` on a variable must use a **here string**, not `echo "$VAR" | …`.

**Goal:** `cat unit.file` shows the unit text, not a broken prompt waiting for EOF. `grep` reads `$VAR` from `<<<`. Optional: a `while read` loop whose stdin is a file (`done < file`).
