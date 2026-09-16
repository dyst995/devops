# Tasks — xargs

Close `theory.md`. Work in `/tmp/xargs-tasks`.

## Warm-up

1. From memory: what does this tool read, how does it split by default, and what command does it run if you give **none**?
2. Write the synopsis shape: options, command, initial arguments.

## Default echo (many lines → one)

3. A file with three names, one per line. Pipe it in with **no** extra command. Predict the output (one line vs three), then run.

## One process per item (repeat placeholder)

4. Same list: create an empty file per name using the default placeholder.
5. Same again with **`-I`** (modern spelling) and `{}`.
6. Same again with a **custom** placeholder letter as in the notes (`T`).
7. Predict: without a placeholder, one invocation with many args vs with placeholder, many invocations — which is which?

## Null-safe (spaces)

8. Create a `core` file whose **path contains a space**. Delete all `core` regular files under that tree using the **null-terminated** pairing from the notes. Confirm the spaced name was not split wrongly.

## Parallel

9. With a few URLs (or skip if offline): run up to **4** downloads at a time with a placeholder. What does **0** mean for max processes in the notes?

## Scenario

10. You have many `.log` files in a lab dir. Compress them in batch. Then chmod many files in batch using null-terminated names. Two contexts, same tool.
