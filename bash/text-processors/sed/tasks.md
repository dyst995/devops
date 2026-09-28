# Tasks — Sed

Close `theory.md`. Work in `/tmp/sed-tasks`. Copy [`input.txt`](input.txt) there (or recreate it). Predict output before you run. Do not overwrite course files in the repo — write results under `/tmp`.

## Warm-up

1. What does sed read from, and where does the result go by default?
2. Does a basic `sed '…' file` change `file` on disk? How do you keep the transformed text?
3. Why are there no “output file” arguments in the basic syntax?

## Invocation and input sources

4. Write the general synopsis: options, script, input file(s).
5. Using `input.txt`, replace `hello` with `world` and redirect to `output.txt`. Show `output.txt`.
6. Run the same substitute three ways from the notes (filename arg, `<` redirect, pipe with `-`). Diff the three `output` files — identical?
7. What does `-` mean as the input file after a pipe?

## Substitute script

8. On `input.txt`, how many lines still contain the word `hello` after `s/hello/world/`? Why might some `hello`s remain (think: first match per line only, if that is what your sed does)?
9. Put the script in double quotes instead of single quotes with a `$` inside a pattern sometime — what risk does the shell introduce? Prefer which quotes for scripts?

## `-n` / quiet

10. From memory: what does sed print by default at the end of each cycle?
11. Run sed with `-n` and a script that does **not** use `p`. How much output do you get?
12. Run `sed -n 'p' input.txt`. Compare to plain `cat input.txt`.
13. Name the three long/short option spellings for quiet mode from the notes.

## Script overview (`[addr]X`, `-e` / `-f`)

14. Write the command shape `[addr]X[options]`. What does each piece mean?
15. Three ways to supply a program: `-e`, `-f`, and “first non-option argument.” Give one example of each (write the commands; run `-e` and the bare-script form).
16. Create a file with at least 40 short lines. Delete lines 30–35 with an address range and `d`. Confirm those lines are gone in the output and the original is unchanged.
17. On `input.txt`, delete lines matching `/^foo/`. Which lines disappear? Which stay (e.g. `notfoo`, `foo` in the middle)?
18. One script, two commands separated by `;`: delete `/^foo/` lines **and** `s/hello/world/`. Show before/after.
19. From the notes: which three commands must **not** use `;` as a separator, and what should you use instead?

## Addresses (line, regex, `!`, delimiters)

20. On a file with many lines, run `Ns/hello/world/` for one chosen line number `N` that contains `hello`. Confirm only that line changed.
21. Same substitute **without** an address. How many lines change vs task 20?
22. On `input.txt`, replace `hello` with `world` only on lines that contain `apple`. Which lines change?
23. Same idea with negation: `/apple/!s/hello/world/`. Which lines change now?
24. Write three equivalent `-n` … `p` commands that select lines starting with `/home/alice/documents/` — one with escaped `/`, one with `%` delimiters, one with `;` delimiters. Run all three on `input.txt` (or a path-heavy sample). Same matches?
25. Why prefer `\%…%` when a regex is full of slashes?

## Common commands (`a` `c` `d` `i` `r` `y`)

26. `seq 3 | sed '2a hello'` — predict the four output lines, then run.
27. `seq 10 | sed '2,9c hello'` — how many lines of output? What happened to 2–9?
28. `seq 3 | sed 2d` — predict. Same idea with an address range on a longer `seq`.
29. `seq 3 | sed '2i hello'` — how is this different from `2a`?
30. `seq 3 | sed '2r /etc/hostname'` (or any small text file). Where does the file content appear?
31. `echo hello world | sed 'y/abcdefghij/0123456789/'` — predict, then run. Which letters changed?

## Substitute `s` and `-i`

32. On a **copy** of `input.txt`, run `s/hello/world/` once without `g` and once with `g` on a line that has two `hello`s (add such a line if needed). Difference?
33. What do `\1` and `&` mean in the replacement side?
34. Name the `g` and `i` flags. Which one is a GNU extension?
35. Copy a fake passwd-style file under `/tmp` (do **not** edit real `/etc/passwd`). Change all `bash` to `false` with `-i` and `s///g`. Then restore **only** the `vagrant` line with `/vagrant/s/false/bash/g`.

## Scenario

36. Pipeline: `cat input.txt | sed 's/hello/world/' -` and save under `/tmp/sed-tasks/out.txt`. Confirm the original is unchanged.
37. Build a small `script.sed` with two newline-separated commands. Run with `-f`. Same as a `;` one-liner?
38. One script: delete `/^foo/` lines, then substitute `hello`→`world` only on lines containing `apple`. Show before/after.
39. Chain: from `seq 5`, insert a label before line 3, append a note after line 4, delete line 1. Predict full output, then run.
40. Explain in one sentence when you would use `-n` instead of the default printing behavior.
