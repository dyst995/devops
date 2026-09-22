# Nose + Coverage — Questions

Cover the Answers section. Answer first, then check.

1. Two pip installs? What does each tool do?
2. Command to only run tests?
3. Recite the coverage-calculation line (three flags + package). What is `--cover-erase`?
4. Extra flag to require 90%? What happens if you are under 90%?
5. Extra flag for the HTML report? File path?
6. Recite the process: install → run → measure → gate → report.

---

## Answers

1. `pip install nose` · `pip install coverage`. Runner · line coverage.
2. `nosetests`
3. `nosetests --with-coverage --cover-package=handlers/ --cover-erase`. Wipe previous coverage data.
4. `--cover-min-percentage=90`. Fail / gate red.
5. `--cover-html`. **`cover/index.html`**
6. Install both · `nosetests` · with-coverage + package + erase · min 90 · cover-html.
