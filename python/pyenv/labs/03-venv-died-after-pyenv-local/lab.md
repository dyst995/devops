# venv died after pyenv local

`.venv` was created yesterday. Today `pyenv local` points at another CPython (or you installed a new patch). `python` in the venv errors, or `pip` talks to the **old** prefix.

**Goal:** Recreate the venv with the **currently selected** `python` (`python -V` matches `pyenv version-name`). `python -m pip` inside the venv matches that version. Explain shims vs the venv’s own `python` binary.
