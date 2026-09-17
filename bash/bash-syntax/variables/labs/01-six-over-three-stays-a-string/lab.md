# 6/3 stays 6/3

A script sets `n=6/3` and prints `n = …`. Reviewers expect `n = 2`. What they get is `n = 6/3`.

Bash is not using a separate integer type unless you say so. The notes show `declare` / `typeset` as synonyms.

**Goal:** After the same assignment `n=6/3`, the script prints `n = 2`. Keep a copy that still prints `n = 6/3` so you can show both.
