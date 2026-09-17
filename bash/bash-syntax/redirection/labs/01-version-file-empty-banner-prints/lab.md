# version file is empty but the banner still prints

`java -version` (or another command that writes its banner on **stderr**) is redirected with `>` into `version`. The banner still hits the terminal. `cat version` is empty.

`&>` and `2>` are supposed to put that banner in the file instead. A later run must discard **all** output (`ps aux` in the notes uses `/dev/null`).

**Goal:** Show `>` vs `&>` vs `2>` as in the notes. Then suppress everything. Prefer `&>filename` over `>&filename`; know the `>filename 2>&1` equivalent.
