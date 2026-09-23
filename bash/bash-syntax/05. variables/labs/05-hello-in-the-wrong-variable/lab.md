# Hello is in the wrong variable

`var=value` and `value=hello`. A later line should print `hello` by going **through** `var` (the name stored in `var`, not the letters `value` by hand).

Direct `echo $var` prints `value`. The notes’ indirect form is required.

**Goal:** Print `hello` using indirect referencing. Show `echo $var` still prints `value`.
