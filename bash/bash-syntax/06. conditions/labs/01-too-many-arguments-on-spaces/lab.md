# too many arguments on a non-empty string

`string_with_spaces='some spaces here'`. A check meant to print `The string is non-empty` instead dies with:

```text
-bash: [: too many arguments
```

The same check written the other way (notes: keyword vs `test`) prints the message.

**Goal:** Show both behaviors. End with a version that prints `The string is non-empty` for that variable. Explain why `[` split the value and `[[` did not.
