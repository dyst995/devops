# Permission denied on ./deploy

A teammate’s script has a correct first line (`#!` plus an interpreter path). They run it as `./deploy` from the directory that contains the file and get **permission denied**. `bash deploy` from the same directory works.

**Goal:** `./deploy` runs successfully. `bash deploy` still works. Explain why the two invocations differed before the fix.
