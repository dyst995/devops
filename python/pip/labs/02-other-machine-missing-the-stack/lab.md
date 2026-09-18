# other machine missing the stack

This project works on your laptop. On a clean venv (or a teammate’s machine) imports fail: no record of what was installed.

**Goal:** A `requirements.txt` from **this** environment (`freeze`). A **new** venv can `install -r` that file and run the same imports. Pins should be `name==version` lines, not a vague memory of package names.
