# Tasks — pyenv

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first. Unix commands below; pyenv-win is the same jobs with a different install path.

1. [ ] What does pyenv manage? What does it **not** install? After pyenv picks `python`, what do you still use (pip / venv)?
2. [ ] Three “why” bullets: OS Python, two repos, CI vs laptop. Recite `eval "$(pyenv init -)"` and why shims must be **before** `/usr/bin`.
3. [ ] Recite `install -l`, `install 3.12.8`, `versions`, `uninstall`, `prefix`, `which python`. Shim vs real binary?
4. [ ] Recite shell / local / global: scope, file or env var, which wins. What does `local` write? `shell --unset`? What is `system`?
5. [ ] What is a shim? When do you `pyenv rehash`?
6. [ ] Recite pip-after-pyenv: `python -V`, upgrade pip, `venv`, activate. What happens if you `pyenv local` to another CPython but keep an old `.venv`?
7. [ ] What pyenv is **not** (pip, venv, Docker/CI images, `dnf install python3.12`). Build deps / compile — one sentence for an interviewer.
8. [ ] From memory: `pyenv version` vs `version-name`. `which python` vs `pyenv which python`.
9. [ ] Draw the lookup: **shell > local > global**. Point at `.python-version` (commit it) vs `~/.pyenv/version`.
10. [ ] Interview story: clone a repo, wrong interpreter. How do you pin 3.11.9 for the project without changing your laptop default 3.12.8?
