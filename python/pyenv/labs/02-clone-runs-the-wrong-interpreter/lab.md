# other clone runs the wrong interpreter

You set a Python version with `global` so **your** laptop works. A teammate clones the repo and still hits **their** global (or `system`). There is no version file in the repo.

**Goal:** `pyenv local` so `.python-version` is in the project. After `cd` into the clone, `pyenv version` uses **local**, not only global. `python -V` matches the pin. `shell` is not required for the teammate’s normal workflow.
