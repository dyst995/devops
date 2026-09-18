# Tasks — pyenv

Close `theory.md`. Unix commands assume WSL/Linux/macOS with pyenv on `PATH`. Windows: same jobs with pyenv-win.

## Warm-up

1. pyenv vs pip vs venv.
2. Recite shell / local / global and which wins.
3. Shim vs `pyenv which python`. When `rehash`?

## Do

4. `pyenv --version`. `pyenv versions`. Is `system` there? `python -V` vs `which python`.
5. `install -l` and pick a version **not** already current (smaller patch is enough). Install it. `versions` shows it.
6. `global` to that version. New shell: `python -V`. Then set `global` back if you need OS default.
7. In a throwaway directory: `local` another installed version. Confirm `.python-version` and `pyenv version`. Parent directory still uses global?
8. `pyenv shell` a third version (or the same). `version` says shell. Unset shell. Back to local/global.
9. `python -m venv .venv`, activate, `python -V` matches pyenv. `python -m pip --version` uses **that** tree.

## Scenario

10. Repo A pins 3.12 in `.python-version`, repo B pins 3.11. `cd` between them and show `python -V` changes **without** `shell`. pip installs in A’s venv must not be required for B.
