# Tasks — Tox

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: three jobs of tox. Course had no `tox.ini` on the slide — recite the model.

1. [ ] tox aims to **automate and standardize testing**. Larger vision: packaging, testing, **release**.
2. [ ] tox is a generic **virtualenv management** and **test command line** tool. Recite that phrase.
3. [ ] Use 1: check the package **installs correctly** on **different Python versions and interpreters**.
4. [ ] Use 2: **run tests in each** environment; configure **test tool of choice** (unittest / nose / …).
5. [ ] Use 3: **frontend to CI** — less **boilerplate**; **merge CI and shell-based testing**.
6. [ ] System Overview: tox → venv per env → install package → run tests → report. Same locally and on CI.
7. [ ] How tox differs from one `python -m venv` ([pip](../02. pip/theory.md)); from `nosetests` alone; from [pyenv](../03. pyenv/theory.md) (interpreters vs tox envs).
8. [ ] Interview: “CI runs tox, I run tox” — why that beats a YAML-only test script.
9. [ ] Quality gate: a tox env that fails **install** or **tests** blocks [CD](../25. testing/theory.md).
10. [ ] Combined: three bullets without looking; draw System Overview; packaging+testing+release; CI === shell.
