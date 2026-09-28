# Tasks — Awk

Close `theory.md`. Work in `/tmp/awk-tasks`. Copy [`employee.txt`](employee.txt) there (or recreate it). Build extra small tables when a drill needs them. Predict output before you run.

## Warm-up

1. In one sentence: what does awk do with patterns and actions as it reads input?
2. What is a **field** by default? How do you change the delimiter?
3. Why put the awk program in **single quotes** on the command line?

## Invocation

4. Write both invocation shapes: program on the command line, and program from a file (`-f`).
5. Run a one-liner with **no** input file. Feed it two lines from the keyboard (or a here-string / pipe). Where did the data come from?
6. Create `a.txt` and `b.txt` with a few lines each. Run one awk program naming **both** files. Does it process them in order?

## Fields and default print (`employee.txt`)

7. Print every line of `employee.txt` with the default action from the notes. How many lines?
8. Print only column 2 (role) for every line.
9. Print the **whole** line using the field that means “entire record.”
10. Print name and salary as `$1` and `$4`. Then print name and salary as `$1` and `$NF`. Same output? When would `$NF` be safer?

## Patterns

11. Print only lines that contain `manager`. How many?
12. Expression pattern: print lines where field 1 equals a word you chose. Include matching and non-matching rows if you use a custom file.
13. Regex pattern: print lines that match `/foo|bar|baz/` on a small custom file.
14. Two rules in one program: one expression rule and one regex rule, different actions. Prove both can fire on the same file.
15. A rule with **no** pattern — only `{ … }`. Which lines get the action?

## BEGIN and END

16. Print a header once before any data (`BEGIN`), then print `$1` for every line, then print a footer once (`END`).
17. `BEGIN`-only program: print one line without waiting for a matching input line.
18. Count lines: initialize in `BEGIN`, increment per line, print the total in `END`. Compare that total to `NR` in an `END`-only print of `NR`.

## Built-in variables (`NR`, `NF`, separators)

19. Print `NR` and `$0` for every line of `employee.txt`. What is `NR` on the last line?
20. Print `NF` for each line. What value do you get on this file, and why?
21. Set `FS` in `BEGIN` to `:` on a small colon-separated file (no `-F`). Print `$1`. Same idea as `-F:`?
22. `print $1, $2` with default `OFS`, then again after setting `OFS` to `-` in `BEGIN`. What sits between the values?
23. Set `ORS` to `|` and print `$1` for each employee. How does the output differ from the default?

## Scenario

24. From `employee.txt`: print a title once, then `NR: name  salary` for every row (custom `OFS`), then in `END` print how many records (`NR`) and a done line. One program with `BEGIN` / middle / `END`.
25. Report only **sales** people: name and last field. Then report only salaries above a threshold you choose (expression on `$4` or `$NF`).
