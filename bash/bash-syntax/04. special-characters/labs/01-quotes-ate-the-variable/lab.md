# Quotes ate the variable

A status line is supposed to show the **value** of `USER` (or another parameter). In the script it prints the **characters** `$USER` instead. A second line in the same script **does** show the real username.

The two lines look almost the same; only the quoting differs.

**Goal:** Make both lines show the value, or explain which quoting is full vs partial and why only one expands. Keep a copy of the “literal `$USER`” behavior so you can show both.
