# C:\nowhere ate the backslashes

`print('C:\\nowhere')` should show **one** backslash (`C:\nowhere`). `print(r'C:\\nowhere')` should show **two**. f-string `f"{a}+{b}={a+b}"` with `a, b = 1, 2` is `1+2=3`. `%s` / `%d` and `.format` samples from the notes must match.

Right now a raw string was used for the first print (or `\\` was doubled in the wrong place). `.format('{0}e', …)` must produce **Billie** (literal `e` after `{0}`).

**Goal:** Both `C:\` prints, f-string, `%`, and `.format` (including named `food` / `adjective` and Billi/Manfred/Georg) match the course.
