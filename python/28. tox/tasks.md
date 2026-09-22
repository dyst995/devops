# Tasks — Tox

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. This topic is **what tox is** (course had no `tox.ini` on the slide). Recite first.

## Warm-up

1. [ ] Automate + standardize. Packaging / testing / release. virtualenv manager + test CLI.
2. [ ] Three uses: install on many Pythons · tests in each env · CI frontend (boilerplate / merge).

## Do

3. [ ] From memory, draw System Overview: tox → venvs → install package → test tool → same on CI.
4. [ ] One sentence each: how tox differs from a single `python -m venv` ([pip](../02. pip/theory.md)); from `nosetests` alone ([nose + coverage](../27. nose-coverage/theory.md)); from [pyenv](../03. pyenv/theory.md) (interpreters vs tox envs).
5. [ ] Explain “merging CI and shell-based testing”: you run **tox** locally; CI runs **tox** — not a second YAML-only script.

## Complete

6. [ ] Recite the three bullet uses without looking. Quality-gate sentence: a tox env that fails install or tests blocks [CD](../25. testing/theory.md).
