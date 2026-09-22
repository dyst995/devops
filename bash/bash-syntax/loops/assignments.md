# Assignments — Loops

Close `theory.md`. Recite the construct, then run a tiny example. Predict prints **before** you run.

1. [ ] What is a loop (block that iterates **while the control condition is true**)?
2. [ ] Three kinds in the notes: **for**, **while**, **until**. Plus control: **break**, **continue**.
3. [ ] `for arg in [list]; do …; done`. Each pass, `arg` takes the **next** list item.
4. [ ] Recreate (or the idea of) `for file in "$( find . -type l )"; do echo "$file"; done | sort`. What is `-type l`? Why `sort` after the loop?
5. [ ] `while`: test at the **top**; loop while condition is **true (status 0)**. Use when the **count is not known** beforehand. Contrast with `for` (you already have a **list**).
6. [ ] Recreate the LIMIT=10 while: `-le`, `echo -n`, `let "a+=1"`. Give `a` a start value. Predict the numbers printed.
7. [ ] `until`: test at the **top**; loop while condition is **false** (**opposite of while**). Stops when the condition becomes **true**.
8. [ ] Recite `until [ condition-is-true ]; do …; done`. Same `do`/`done`.
9. [ ] `break` **terminates** the loop (out). `continue` **skips the rest of this cycle**, next iteration.
10. [ ] Recreate `for i in {1..5}` with `[[ $i -eq 3 ]] && break`. Exact prints: **1 2 3** — not 4 and 5. Echo is **before** break so **3** prints.
11. [ ] Same loop with `continue` in that spot: notes say there is nothing after the test, so **1 through 5** still print. Recite why.
12. [ ] Interview: `while` vs `until` in one sentence (repeat while true vs until true).
13. [ ] Interview: `for` vs `while` (list vs unknown count).
14. [ ] Write a while that counts to 3 using `[ "$a" -le 3 ]`. Start `a` at 1.
15. [ ] Write an until that stops when `a` is greater than 3 (condition becomes true). Same prints as a while if you set it up as the opposite test.
16. [ ] Nested: `break` leaves **one** loop. Say it, then prove with two `for`s if you want.
17. [ ] Recite memory hooks: `for arg in list`; `while` as long as true at top; `until` opposite; `break` out; `continue` skip this pass.
18. [ ] `{1..5}` is the list `1 2 3 4 5`. Recite. Use it in a for.
19. [ ] Empty list on `for` — body never runs. Predict, then prove.
20. [ ] Combined: three loop kinds; while vs until; for list; break prints 1 2 3; continue vs break; unknown count → while.
