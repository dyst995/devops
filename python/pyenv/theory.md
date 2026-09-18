# pyenv

**pyenv** manages **Python interpreters** (versions): 3.11, 3.12, a project-local 3.10, without replacing the OS Python that `apt`/`dnf` owns.

It does **not** install PyPI packages. After pyenv picks a `python`, you still use **[pip](../pip/theory.md)** (`python -m pip`) and usually a **venv**.

**Memory hook:** pyenv = **which Python**. pip = **packages inside it**.

On **Unix** (Linux, WSL, macOS) this pack means [pyenv](https://github.com/pyenv/pyenv). On **Windows** the common port is **pyenv-win** (same jobs: install / global / local; slightly different install path). Practice on WSL or a VM if you want the Unix commands below.

## Why

- The **system** `python3` is for the distro (yum/apt scripts). Do not treat it as your app runtime.
- Two repos may need **different** versions.
- CI and laptops should share a **named** version (e.g. 3.12.8), not “whatever is on PATH today.”

## Install (Unix)

Needs a compiler and Python build deps (on Rocky/Fedora: development tools + `openssl-devel` `zlib-devel` `bzip2-devel` `readline-devel` `sqlite-devel` `libffi-devel` and friends; on Debian/Ubuntu: `build-essential` + the `lib*-dev` packages pyenv’s wiki lists). Then the official installer, and **shims** on `PATH` **before** `/usr/bin`:

```bash
# after pyenv is on PATH (see pyenv installer / ~/.bashrc):
eval "$(pyenv init -)"
```

Restart the shell. `pyenv --version` should work. `which python` should eventually show a **shim** once a version is selected — not only `/usr/bin/python3`.

**Memory hook:** pyenv **builds** CPython from source. Missing `-devel` libs → install fails at the end. `PATH` + `eval "$(pyenv init -)"` or shims never win.

**pyenv-win:** install via the project’s installer / pip / zip; use **User** PATH; same `install` / `global` / `local` idea.

## Versions on disk

```bash
pyenv install -l                 # list what you can install
pyenv install 3.12.8             # download, compile, store under pyenv
pyenv versions                   # installed; * = current
pyenv uninstall 3.12.8
pyenv prefix                     # directory of the current Python
pyenv which python               # real binary, not the shim
```

**Memory hook:** `install -l` = catalog. `install 3.x.y` = get it. `versions` = what you have. `which python` vs `pyenv which python` = shim vs real file.

## Which version is active?

Three layers (most specific wins when set):

| Command | Scope | Typical file / mechanism |
| --- | --- | --- |
| `pyenv shell 3.12.8` | **this shell only** | env var (`PYENV_VERSION`) |
| `pyenv local 3.12.8` | **this directory** (and children) | `.python-version` |
| `pyenv global 3.12.8` | **your user default** | `~/.pyenv/version` (Unix) |

```bash
pyenv global 3.12.8
pyenv local 3.11.9
pyenv shell 3.10.14
pyenv version                    # what is selected and why
pyenv version-name
```

`local` writes **`.python-version`** — commit it so the repo pins the interpreter. `shell` overrides until you close the terminal (or `pyenv shell --unset`).

**Memory hook:** **shell > local > global**. `.python-version` = this project. `global` = my laptop default. `shell` = temporary.

`system` means “use the OS Python” (the one pyenv did not install).

## Shims

pyenv puts **shim** scripts named `python`, `python3`, `pip` early on `PATH`. A shim looks at shell / `.python-version` / global, then **execs** the matching real binary.

After you install a new version or a tool that adds a console script:

```bash
pyenv rehash
```

**Memory hook:** shim = switchboard. `rehash` = refresh the switchboard.

## pip after pyenv

```bash
python -V                        # must match pyenv version
python -m pip install --upgrade pip
python -m venv .venv
source .venv/bin/activate        # then pip as in the pip topic
```

A venv created with **this** `python` is tied to **that** version. If you `pyenv local` to another CPython, make a **new** venv (or recreate `.venv`).

**Memory hook:** pyenv chooses interpreter → `python -m venv` → `python -m pip`. Do not mix a 3.11 venv with a 3.12 shim.

## What pyenv is not

- Not **pip**. Not **venv** (though **pyenv-virtualenv** is an optional plugin that names virtualenvs).
- Not a replacement for **Docker** / CI images; it is for **dev machines** (and sometimes images that install pyenv).
- `pyenv install` needs **network + compile time**; it is not `dnf install python3.12` (those are distro packages, different paths).
