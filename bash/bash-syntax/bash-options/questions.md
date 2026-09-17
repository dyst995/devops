# Bash options — Questions

Cover the Answers section. Answer first, then check.

1. What are options, in one sentence from the notes?
2. Which command turns options on **inside a script**? Write both the long form and the short form, using `verbose`.
3. How do you **disable** the same option? Both forms.
4. Which sign means **on**, which means **off**? (`-` vs `+`)
5. In `exit_on_error.sh`, what does `set -e` do? Is `moving on` printed? Why?
6. In `skip_error.sh`, what is the default (`+e`)? Is `moving on` printed?
7. `set -o errexit` is equivalent to which short form from the examples?
8. You need `-e` only for a middle block of a script. How do you turn it off again after that block?

---

## Answers

1. Settings that change shell and/or script behavior.
2. `set -o verbose` · `set -v`
3. `set +o verbose` · `set +v`
4. `-` = on. `+` = off.
5. Exit when a command fails. No — `cat` failed, so the script stopped.
6. Errexit off (keep going). Yes — after the `cat` error.
7. `set -e`
8. `set +e` or `set +o errexit` after the block.
