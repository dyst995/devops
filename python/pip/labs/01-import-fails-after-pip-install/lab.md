# import fails after pip install

`python app.py` cannot import a package you “already installed.” `pip install` reported success. `which python` / `python -m pip --version` / `pip --version` do not agree.

**Goal:** The package imports in the **same** interpreter that runs `app.py`. Use that interpreter’s pip (`-m pip`), not a random `pip` on `PATH`. A venv is the usual fix. Do not `sudo pip` into OS Python.
