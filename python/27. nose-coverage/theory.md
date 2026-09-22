# Nose + Coverage

**nose** discovers and runs tests (the `test_*.py` files from [unit testing](../26. unit-testing/theory.md)). **coverage** measures **how much of the code** those tests executed. Together they are a [quality gate](../25. testing/theory.md): tests must pass, and coverage must stay high enough.

## Install nose and coverage

```bash
$ pip install nose
$ pip install coverage
```

Prefer `python -m pip` in a venv ([pip](../02. pip/theory.md)).

**Memory hook:** two packages — **nose** runs · **coverage** measures.

(`nose` is the course runner. It is unmaintained on current Python; the slide command is still **`nosetests`**.)

## Run tests

```bash
$ nosetests
```

Finds tests and runs them (same idea as `python test_prime.py`, but you do not name each file).

**Memory hook:** **`nosetests`** = just run the suite.

## Run tests and coverage calculation

```bash
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase
```

| Flag | Course meaning |
| --- | --- |
| `--with-coverage` | also calculate coverage |
| `--cover-package=handlers/` | measure the **`handlers/`** package (not the whole tree) |
| `--cover-erase` | drop last run’s coverage data so this run is **clean** |

**Memory hook:** **with-coverage** + **cover-package** + **cover-erase**. Package on the slide is **`handlers/`**.

## Check coverage

```bash
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase --cover-min-percentage=90
```

**`--cover-min-percentage=90`** — fail if coverage of that package is **under 90%**. A **quality gate**: red if you did not exercise enough lines.

**Memory hook:** **90** = minimum percent. Below 90 → not OK.

## Generate coverage report (`cover/index.html`)

```bash
$ nosetests --with-coverage --cover-package=handlers/ --cover-erase --cover-html
```

**`--cover-html`** writes an HTML report. Open **`cover/index.html`**.

**Memory hook:** **`--cover-html`** → **`cover/index.html`**.

## Testing process

Course slide: **Testing process** / **Testing**.

The process on this topic: **install** → **`nosetests`** → add **coverage** (package + erase) → **gate** at 90% → **HTML** report. Same pipeline idea as [testing](../25. testing/theory.md): automate, do not click.

```text
pip install nose + coverage
        ↓
   nosetests
        ↓
   + --with-coverage --cover-package=handlers/ --cover-erase
        ↓
   + --cover-min-percentage=90     (gate)
        ↓
   + --cover-html                  (cover/index.html)
```

To run that suite in **many virtualenvs / Pythons** (and on CI): [tox](../28. tox/theory.md).
