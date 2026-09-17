# It failed — but which failure?

You have three broken invocations:

- a misspelled command name
- a file that exists but is not an executable (`/dev/null` or a script without execute permission)
- `let` dividing by zero (or another impermissible operation from the notes)

**Goal:** Run each, record the three statuses, and map each number to the table’s meaning (not found vs cannot execute vs general error). Do not mix the meanings up.
