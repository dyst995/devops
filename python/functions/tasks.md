# Tasks — Functions

Close `theory.md`. Predict print / return / exception **before** you run.

## Warm-up

1. `def` line pieces. Docstring = first expression. Indent.
2. Skipped `return` and bare `return` — value?
3. Positional vs keyword vs default vs `*args` vs `**kwargs` in one line each.

## Declaration / call / return

4. Recreate `printme` with the course docstring. Both example calls.
5. A function with no `return`. `print(that_function())` — what is printed after the body?
6. `return` with no expression. Same?

## By reference

7. Recreate `changeme`. Inside and outside prints. Then `append` vs assigning `mylist = [0]` inside — does the caller’s list become `[0]`?

## Arguments

8. `add(1, 2)`, `add(a=1, b=2)`, `add(b=2, a=1)`, `add(1, b=2)`.
9. `add(a=1, 2)` and `add(2, a=1)` — exact exception types/messages from the notes.
10. `add(a, b=2)`: `add(1)`, `add(1, 2)`, keyword forms. Then `def add(a=1, b)`.
11. Recreate `echo`. All five calls. Match `args` tuple and `kwargs` dict.

## Scenario

12. One function: required `a`, default `b`, `*args`, `**kwargs`. Mutate a passed list (visible outside). Return nothing (prove `None`). Show the SyntaxError and TypeError from the notes on a tiny `add`.
