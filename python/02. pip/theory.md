# pip

**pip** is the **package installer** for Python. It downloads packages (and their dependencies) from an **index** — by default **PyPI** (https://pypi.org/) — and installs them into **that Python’s** site-packages.

**Memory hook:** pip = **packages into one interpreter**. Always the pip that belongs to the `python` you will run.

## Which pip?

```bash
python -m pip install requests
python3 -m pip install requests
```

`python -m pip` runs pip **as a module of that interpreter**. Prefer this over a bare `pip` or `pip3` on `PATH` (those can point at a **different** Python than `python`).

On Debian/Ubuntu the distro command is often `pip3`. On Windows the py launcher is `py -m pip`.

**Memory hook:** `python -m pip …` = this Python, this pip. Bare `pip` can lie.

Do **not** `sudo pip install` into the **OS** Python on Linux. That fights `apt`/`dnf` and can break the system. Use a **venv**, or a pyenv-installed Python (see [pyenv](../03. pyenv/theory.md)).

## Virtual environment (where pip should write)

```bash
python -m venv .venv
# Unix / WSL / macOS:
source .venv/bin/activate
# Windows (cmd):
.venv\Scripts\activate.bat
# Windows (PowerShell):
.venv\Scripts\Activate.ps1

python -m pip install requests
deactivate
```

A **venv** is a directory with its own `python` and `pip`. Activate it so `python` / `pip` hit **that** tree. `deactivate` leaves it.

**Memory hook:** project folder → `.venv` → activate → pip. OS Python stays clean.

## Install, uninstall, inspect

```bash
python -m pip install package
python -m pip install package==1.2.3
python -m pip install 'package>=1.2,<2'
python -m pip install --upgrade package
python -m pip uninstall package
python -m pip list
python -m pip show package
python -m pip freeze
```

- **`install`** — fetch from the index (PyPI unless you pass another).
- **`==`** — exact version (reproducible). **`>=` / `<`** — range.
- **`--upgrade` / `-U`** — newer version if one exists.
- **`uninstall`** — remove that package from **this** environment.
- **`list`** — what is installed (name + version).
- **`show`** — metadata: version, location, requires.
- **`freeze`** — `name==version` lines, suitable for a lock-style file.

**Memory hook:** `list` = what’s here. `show` = one package’s card. `freeze` = pin list.

## requirements.txt

```text
requests==2.32.3
PyYAML>=6.0
```

```bash
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

`-r` = install **every** line. Commit `requirements.txt` so another machine (or CI) gets the same set. Recreate: new venv, then `-r`.

**Memory hook:** freeze **out** → file. `-r` file **in**.

## Upgrade pip itself

```bash
python -m pip install --upgrade pip
```

Old pip fails on newer package formats. Upgrade **inside** the venv you are using.

## User install (no venv)

```bash
python -m pip install --user package
```

Writes under the user’s home (`~/.local` on Unix), not system site-packages. Still easy to mix with the wrong `PATH`. Prefer a venv for project work.

## Other indexes (DevOps)

```bash
python -m pip install --index-url https://pypi.org/simple/ package
python -m pip install --extra-index-url https://example.com/simple/ package
```

Private CI often uses a **company index** (`--index-url`) or PyPI plus a **second** index (`--extra-index-url`). `PIP_INDEX_URL` / `pip.conf` can set the default.

**Memory hook:** default index = PyPI. `--index-url` = **replace** default. `--extra-index-url` = **also** look here.

## What pip is not

- Not a **Python version** manager — that is [pyenv](../03. pyenv/theory.md).
- Not a substitute for **OS packages** (`python3-requests` via `dnf`/`apt`) when the distro owns that interpreter.
- `pip search` on the CLI is **gone**; search on https://pypi.org/.
