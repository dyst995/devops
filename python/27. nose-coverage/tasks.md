# Tasks — Nose + Coverage

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite every flag. venv; need `test_*.py` and a package (course: `handlers/`).

1. [ ] What does **nose** do vs **coverage**? Two `pip install` lines. Quality gate idea ([testing](../25. testing/theory.md))?
2. [ ] Command to only run tests? How is that different from `python test_prime.py`?
3. [ ] Recite `--with-coverage --cover-package=handlers/ --cover-erase`. What does erase do? Why `handlers/`?
4. [ ] `--cover-min-percentage=90` — fail if under 90%. Gate: red means?
5. [ ] `--cover-html` — report path **`cover/index.html`**.
6. [ ] Recite the process: install → `nosetests` → coverage+package+erase → min 90 → html.
7. [ ] Run `nosetests` on a small suite. Then the coverage line with **your** package name; still recite course `handlers/`.
8. [ ] Add min 90. If it fails, explain the gate. Add html and open the index.
9. [ ] Interview: coverage % is not the same as “tests passed.” One sentence. `nose` unmaintained — slide command still `nosetests`.
10. [ ] Combined: four `nosetests` lines from memory; 90% gate; `cover/index.html`; [tox](../28. tox/theory.md) would run this in many envs.
