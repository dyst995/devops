# Tasks — Loops

Close `theory.md`. Write the output **before** you run.

## Warm-up

1. `while` vs `for` vs list comprehension — one sentence each.
2. `range(10)` includes 10? First and last printed numbers in the course `for`.
3. `break` vs `continue` vs loop-`else` (normal finish vs `break`).

## Usage

4. Recreate `i = 10` `while i > 0`. Full output.
5. Recreate `for i in range(10)`. Full output.
6. Recreate the comprehension. Exact list printed.

## break / continue

7. `"string"` + `break` on `"i"`. Match the notes (including `The end`).
8. Same with `continue`. Match the notes.
9. Swap only `break`/`continue` in your head: which letters disappear vs which stop the loop?

## else

10. `i = 10` then the notes’ `while`/`else` (`print("End")`). Does `End` print? Why (`i > 0 == False`)?
11. Same `while`, but `break` when `i == 7`. Does `End` print?
12. `for i in range(5)` with `else: print("End")`. Full output.
13. `for i in range(4)` with `break` after `print`. Full output. Why no `End`?

## Scenario

14. Walk `"string"`: stop at `"i"` (`break`) in one function; skip `"i"` only (`continue`) in another; a third `for` over `range(5)` must print `End` only if it **never** `break`s. Prove `else` skipped vs run.
