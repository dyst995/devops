# Packaging

## Package directory structure

The project should be structured properly **before** creating an installation package. Let's demonstrate it in an example (the project is attached).

```text
zoo-example
├── animals
│   ├── handlers
│   │   ├── __init__.py
│   │   ├── walk.py
│   │   └── swim.py
│   ├── __init__.py
│   ├── crocodile.py
│   ├── monkey.py
│   └── zoo.py
├── README.md
└── setup.py
```

This is the [packages](../packages/theory.md) `animals` tree, plus **`zoo.py`**, wrapped as a **project** at `zoo-example/`.

- all code is moved to a separate directory: **`animals`**
- **`README.md`** file with project description is added
- **`setup.py`** is created

**Memory hook:** importable code under `animals/`. Distutils/setuptools metadata at the **project root**: `setup.py` + `README.md`.

## `setup.py`

The **setup script** is the centre of all activity in **building, distributing, and installing** modules using the **Distutils**. The main purpose of the setup script is to **describe your module distribution** to the Distutils, so that the various commands that operate on your modules do the **right thing**.

```python
from setuptools import setup, find_packages
setup(
    # name of package
    name="zoo-example",
    # packages (directories) to be included
    packages=find_packages(),
    # script entry point
    entry_points={
        "console_scripts": [
            "zoo = animals.zoo:main",
        ],
    },
    # package dependencies
    install_requires=[
        "termcolor==1.1.0",
    ],
    version="0.1",
    author="Captain Jack",
    author_email="captain_jack@gmail.com",
    description="Example of the test application",
    license="MIT")
```

**Memory hook:** `name` = what **pip** installs/uninstalls (`zoo-example`). `packages=` = which **directories** ship. `entry_points` = terminal command. `install_requires` = pip pulls these too.

| Field | Course meaning |
| --- | --- |
| `name` | name of package (`zoo-example`) |
| `packages=find_packages()` | packages (directories) to be included |
| `entry_points` / `console_scripts` | script entry point |
| `install_requires` | package dependencies (`termcolor==1.1.0`) |
| `version` / `author` / `author_email` / `description` / `license` | metadata (`0.1`, Captain Jack, MIT) |

## Entry points (console scripts)

**Entry points** are a type of **metadata** that can be exposed by packages on **installation**. They are a very useful feature of the Python ecosystem, and come especially handy when the package would like to provide **commands to be run at the terminal**. This functionality is known as **console scripts**.

```text
$ zoo
Welcome to the zoo!
```

When a user enters the **`zoo`** command, the **`main()`** function from **`zoo.py`** (located in the **animal** folder) is invoked.

Course mapping: `"zoo = animals.zoo:main"` → command **`zoo`** = `main` in module **`animals.zoo`** (file `animals/zoo.py`).

**Memory hook:** `command = package.module:function`. After install, `zoo` on PATH ≠ `python zoo.py`.

## `find_packages()`

**`find_packages()`** returns a list of **all Python packages** found within the directory.

**Memory hook:** you do not list `animals` and `animals.handlers` by hand — `find_packages()` walks for folders with `__init__.py`.

## Create package

### Create egg

```bash
python setup.py bdist_egg
```

### Create wheel (`pip install wheel`)

```bash
python setup.py bdist_wheel
```

### Help commands

```bash
python setup.py --help-commands
```

### Universal wheel

```bash
python setup.py bdist_wheel --universal
```

### Source archive

```bash
python setup.py sdist
```

**Memory hook:** `bdist_egg` = egg · `bdist_wheel` = wheel · `--universal` = one wheel for py2/py3 when the code allows · `sdist` = source tarball · `--help-commands` = Distutils command list.

### Create package: Example

```bash
pip install wheel
python setup.py bdist_wheel
```

We can find **new directories** after command execution. **`dist`** contains **distributives**. **`*.egg-info`** stores information about **files and packages** added to the distributive.

```text
zoo-example
...
├── dist
│   └── zoo_example-0.1-py3-none-any.whl
└── zoo_example.egg-info
    ├── dependency_links.txt
    ├── PKG-INFO
    ├── SOURCES.txt
    └── top_level.txt
```

Wheel file name: **`zoo_example-0.1-py3-none-any.whl`** (hyphens in `name` become underscores in the artifact). Tags: **py3** · **none** (ABI) · **any** (platform).

**Memory hook:** build output in **`dist/`**. Metadata next to the project as **`zoo_example.egg-info/`**.

## Install packages

### Install package

```bash
pip install <package_name>
```

### Upgrade already installed package

```bash
pip install --upgrade <package_name>
```

### Install package of particular version

```bash
pip install <package_name>=='version_num'
```

### Install version that satisfy a critirea

```bash
pip install <package_name> >= 'version_num'
```

(Course wording: **critirea**. Quote/`==` style as on the slide; in a real shell you usually quote the whole spec, e.g. `'pkg>=1.0'`.)

### Upgrading pip

```bash
pip install -U pip
```

(`-U` is `--upgrade`. Same idea as [pip](../pip/theory.md).)

### Search package

```bash
pip search "query"
```

(`pip search` on the CLI is **gone**; search on https://pypi.org/. Still memorize the course line.)

### Install package: Example

```bash
pip install .
```

or

```bash
pip install /home/user/zoo-example
```

or

```bash
pip install dist/zoo_example-0.1-py3-none-any.whl
```

Then:

```text
$ python
>>> import animals
>>> animals.__path__
['/home/user/.pyenv/versions/devops/lib/python3.7/site-packages/animals']
```

After install, **`animals`** lives in **site-packages** of **that** interpreter (here: pyenv env **`devops`**, Python **3.7**), not only the project folder.

```bash
pip uninstall zoo-example
```

Uninstall the **distribution name** (`zoo-example` from `setup(name=...)`), not the import name `animals`.

**Memory hook:** install **`.`** / path / **`.whl`**. Import **`animals`**. Uninstall **`zoo-example`**.
