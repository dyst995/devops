# Tox

**tox** aims to **automate and standardize testing** in Python. It is part of a larger vision of easing the **packaging**, **testing**, and **release** process of Python software.

**Memory hook:** tox = **standardize** how you test. Same idea as [testing](../25. testing/theory.md) (pipeline, not one-off clicks) plus [packaging](../18. packaging/theory.md) / release.

## What is tox?

**tox** is a generic **virtualenv management** and **test command line** tool you can use for:

- **checking that your package installs correctly** with **different Python versions and interpreters**
- **running your tests** in **each** of the environments, configuring your **test tool of choice**
- acting as a **frontend to Continuous Integration servers**, greatly reducing **boilerplate** and **merging CI and shell-based testing**

| Job | Course wording |
| --- | --- |
| Install check | package installs correctly on **different Python versions and interpreters** |
| Tests per env | run tests in **each** environment; you pick the tool ([unittest](../26. unit-testing/theory.md), [nose](../27. nose-coverage/theory.md), …) |
| CI frontend | less boilerplate; **CI** and **shell** testing look the **same** |

**Memory hook:** **venvs + test CLI**. Many Pythons · tests in each · one config for laptop **and** CI.

Different interpreters = e.g. **3.7** and **3.10**, or CPython vs another interpreter [pyenv](../03. pyenv/theory.md) can install. Each tox env is a **venv** ([pip](../02. pip/theory.md)): install the package, then run the test command.

## System Overview

Course slide: **System Overview**.

tox reads a config, **creates virtualenvs** (one per Python / env you listed), **installs the package** into each, **runs the test command** in each, and reports pass/fail. That is the “generic virtualenv management and test” tool from the slide.

```text
tox
  → virtualenv for pyA, pyB, …
  → install package (did it install?)
  → run your test tool in each env
  → same command locally and on CI
```
