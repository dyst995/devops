# Script development and invocation — Questions

Cover the Answers section. Answer first, then check.

1. In the simplest case, what is a script? What effort does that save?
2. What is the sha-bang? Where must it sit? What comes immediately after it?
3. Recite the six example sha-bang lines from the notes (`sh`, `bash`, `perl`, `env python`, `sed`, `awk`).
4. Why `#!/usr/bin/env python` instead of a hardcoded python path? What do `-f` on sed/awk mean?
5. Two ways to invoke a script **by naming a shell**. Does the file need to be executable?
6. How do you make the script **directly executable** and run it? Why `./`?
7. `bash ./script` whose first line is `#!/bin/sh` — who interprets? `./script` after `chmod +x` — who interprets?
8. A script with no sha-bang, run as `./script` after chmod — should you rely on that?

---

## Answers

1. A list of system commands stored in a file. Saves retyping that sequence each time it is invoked.
2. `#!` at the **head** of the file. Tells the system to feed the file to the indicated **command interpreter**. Next: a **path name** to a shell, language, or utility.
3. `#!/bin/sh` · `#!/bin/bash` · `#!/usr/bin/perl` · `#!/usr/bin/env python` · `#!/bin/sed -f` · `#!/bin/awk -f`
4. `env` finds `python` on `PATH`. `-f` = the rest of the file is the sed/awk program.
5. `sh scriptname` or `bash scriptname`. No execute bit required.
6. `chmod` so it is executable, then `./scriptname`. Current directory is usually not on `PATH`.
7. `bash` (you named the interpreter). The sha-bang path (kernel).
8. No. Put the sha-bang in. Fallback to `/bin/sh` is not something to depend on.
