# Tox — Questions

Cover the Answers section. Answer first, then check.

1. What does tox aim to do? Larger vision (three words: packaging / … / …)?
2. tox is a generic *what* and *what* tool?
3. Recite the three uses (install across Pythons, tests per env, CI).
4. What does “test tool of choice” mean? What does “frontend to CI” buy you (boilerplate, merge)?
5. System Overview — what does tox create, install, and run?

---

## Answers

1. Automate and **standardize testing**. Packaging, testing, **release**.
2. **virtualenv management** and **test command line** tool.
3. Package installs on different versions/interpreters · tests in each env · CI frontend.
4. unittest / nose / etc. — you configure it. Less boilerplate; CI and shell testing are the same.
5. A venv per env · the package · your tests. Same locally and on CI.
