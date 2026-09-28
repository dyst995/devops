# Tasks — xargs

Close `theory.md`. Work in `/tmp/xargs-tasks`. Never pipe a whole-filesystem find into a destructive `rm`. Do the action or write the answer, then check yourself.

## Warm-up

1. From memory: what does `xargs` read, how does it split by default, and what command does it run if you give **none**?
2. Write the synopsis shape: `xargs [OPTIONS] [COMMAND [initial-arguments]]`.

## Default echo (many lines → one)

3. Create `names.txt` with three names, one per line (`one`, `two`, `three`). Pipe it in with **no** extra command (`cat names.txt | xargs`). Predict the output (one line vs three), then run.
4. Same input: `cat names.txt | xargs echo` — same idea? Confirm.

## One process per item (placeholder)

5. Same list: create an empty file per name using the older `-i` form and `{}` (`xargs -i touch {}`). List the directory.
6. Same again with **`-I`** (modern spelling) and `{}` (`xargs -I {} touch {}`). Clean up or use new names so you can see it work.
7. Same again with a **custom** placeholder letter as in the notes (`xargs -iT touch T`).
8. Predict: without a placeholder, one invocation with many args vs with placeholder, many invocations — which is which? Prove by wrapping a command that prints its PID or argument count (e.g. a tiny script that echoes `"$# args: $*"`).
9. Bare `xargs touch` with three names (no `-I`) — how many `touch` processes conceptually? With `-I {} touch {}` — how many?

## Null-safe (spaces)

10. Create a `core` file whose **path contains a space** under `/tmp/xargs-tasks`. Also create a normal `core` without spaces.
11. Delete all `core` regular files under that tree using the **null-terminated** pairing from the notes (`find … -print0 | xargs -0 rm`). Confirm the spaced name was not split wrongly.
12. Predict what would go wrong if you used default whitespace splitting on a path with a space — write the wrong split, then do **not** run a destructive wrong version on anything outside `/tmp/xargs-tasks`.

## Parallel (`-P`)

13. From memory: what does `-P` / `--max-procs` do? What is the default? What does **0** mean for max processes in the notes?
14. Create `urls.txt` with a few lines (local file paths or `file://` / echo placeholders if offline). Run up to **4** processes at a time with a placeholder (`xargs -P 4 -I {} …`). If `curl` is unavailable offline, use `xargs -P 4 -I {} sh -c 'echo start {}; sleep 1; echo done {}'` and observe overlapping output.
15. Optional: try `-P 0` on a tiny safe command and note why the notes say be careful.

## Batch drills (same tool, different jobs)

16. Many `.log` files in `/tmp/xargs-tasks`: create several, then compress them in batch with `xargs` (e.g. `gzip` or `gzip -I {}` per file — keep originals with `-k` / `-c` if you prefer).
17. Chmod many files in batch using null-terminated names (`find … -print0 | xargs -0 chmod …`). Confirm modes.

## Find + xargs (bridge from topic 05)

18. Recreate a few disposable `core` files. Delete them two ways from the notes’ sibling topic: `-exec rm {} \;` once, and `find … -print | xargs rm` once (scratch tree only).
19. Explain in one sentence when you prefer `-print0 | xargs -0` over plain `-print | xargs`.

## Scenario

20. You have many `.log` files in a lab dir. Compress them in batch. Then chmod many files in batch using null-terminated names. Two contexts, same tool. Show before/after listings for both steps.
