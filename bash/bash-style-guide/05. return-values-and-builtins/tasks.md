# Tasks — Return values and builtins

Close `theory.md`. Work in `/tmp/return-values-and-builtins-tasks` when writing practice scripts.

## Warm-up

## Checking unpiped commands

1. In `/tmp/return-values-and-builtins-tasks`, create a couple of disposable files and a dest dir. Write the course `if ! mv "${file_list[@]}" "${dest_dir}/"; then … >&2; exit 1; fi` pattern with an informative error that uses `"${file_list[*]}"` in the message.
2. Write the alternate form: run `mv`, then `if (( $? != 0 )); then` with the same stderr message and `exit 1`.
3. Force a failure (e.g. bad dest or missing source). Confirm the error is on **stderr** and the script exits `1`.
4. Explain `"${file_list[@]}"` vs `"${file_list[*]}"` in one sentence (each path vs one string in the message).
5. **Break:** ignore the `mv` status (no check). Show a silent partial failure. **Fix:** restore `if !` or `$?` check + stderr + `exit 1`.

## Pipes and `PIPESTATUS`

6. Write the course tar pipe: `tar -cf - ./* | ( cd "${dir}" && tar -xf - )` under a scratch tree (create a few files first). Check `(( PIPESTATUS[0] != 0 || PIPESTATUS[1] != 0 ))` and print an informative error on stderr.
7. From memory: `PIPESTATUS` is an array — status of **each** stage. It is **overwritten** by the next command; `[` is a command and **wipes** it.
8. Write the copy-immediately form: `return_codes=( "${PIPESTATUS[@]}" )` then branch differently on `[0]` vs `[1]` (`do_something` / `do_something_else` stubs are fine).
9. **Prove the wipe:** after a pipe, run `[ 1 = 1 ]` (or another command) **before** reading `PIPESTATUS`, then show you lost the pipe statuses. Contrast with copying first.
10. **Break:** only check `$?` after a pipe and assume it tells you about **both** stages. Write why that is wrong, then fix with `PIPESTATUS` / `return_codes`.

## Builtins over external processes

11. Write `addition=$(( X + Y ))` with sample `X`/`Y`. Print the result. Do **not** use `expr`.
12. Write `substitution="${string/#foo/bar}"` with `string=foobar` (or similar). Print before/after. Do **not** use `echo | sed`.
13. **Break:** implement the same addition with `addition="$(expr "${X}" + "${Y}")"` and the same substitution with `sed`. **Fix:** replace both with the builtin forms; note why the notes prefer them (robust / fewer processes).

## Predict-then-prove

14. Predict `PIPESTATUS` after `true | false` and after `false | true`. Run and record both arrays.
15. Predict whether `(( $? != 0 ))` right after `return_codes=( "${PIPESTATUS[@]}" )` still reflects the **pipe** or the **assignment**. Prove it.

## Scenario

16. Ticket: “our deploy copies a tree with `tar | tar` and sometimes the source tar fails but the script still exits 0; also someone used `expr` for a counter.” Write a small deploy stub that (1) copies with the tar pipe, (2) copies `PIPESTATUS` immediately and fails with a clear stderr message if either stage fails, and (3) bumps a counter with `$(( ))` only. Demonstrate a forced producer failure vs a forced consumer failure with different messages if you branched on `[0]` vs `[1]`.
