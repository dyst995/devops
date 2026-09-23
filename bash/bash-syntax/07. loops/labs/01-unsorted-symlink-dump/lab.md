# Unsorted symlink dump

You need a sorted list of **symbolic links** under the current directory (and below). A `for` loop should walk the list from `find` (type **l**), echo each path, and the combined output should be sorted — as in the notes.

Right now either directories/files are mixed in, or the names are not sorted, or a `while` is counting instead of walking a list.

**Goal:** Each pass, the loop variable is the next symlink. Final output is sorted. `for` / `in` / `do` / `done`.
