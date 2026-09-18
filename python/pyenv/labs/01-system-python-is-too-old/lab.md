# system Python is 3.9, the app wants 3.12

The app’s docs name a Python **3.12.x**. `python -V` / `python3 -V` is the **OS** interpreter (older). Installing packages with OS `pip` is not an acceptable workaround.

**Goal:** A pyenv-installed 3.12 is selected for this project (`local` / `.python-version`). `python -V` in that directory is 3.12. OS Python is unchanged for the rest of the machine (`system` / previous `global`).
