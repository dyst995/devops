# printme printed the docstring

`printme` should print only the **passed string** (the two EPAM lines). The first expression in the body is documentation (`"""This prints a passed string."""`), not output.

A second function has no `return` (or `return` with no value). Callers that print the result should see **`None`**.

**Goal:** Both course calls match. Docstring is not printed by the call. Skipped / bare `return` is `None`. `def name():` with indent.
