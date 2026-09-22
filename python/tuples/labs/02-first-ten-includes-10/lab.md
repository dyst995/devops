# slice still includes 10 in the first ten

`t = tuple(i for i in range(16))`. Course slices:

- `[10:]` starts at 10
- `[:10]` is `0`–`9` (10 excluded)
- `[:10:2]` even numbers through 8
- `[10::-1]` 10 down to 0
- `[::-1]` 15 down to 0

Right now `[:10]` includes `10`, or reverse slices go the wrong way.

**Goal:** Every REPL tuple in the notes matches. Stop is excluded; step `-1` walks backward.
