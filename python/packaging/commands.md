# Commands to memorize

```text
zoo-example/
  setup.py
  README.md
  animals/
    __init__.py
    crocodile.py
    monkey.py
    zoo.py              # main() — console script target
    handlers/
      __init__.py
      walk.py
      swim.py
```

```python
from setuptools import setup, find_packages
setup(
    name="zoo-example",
    packages=find_packages(),
    entry_points={
        "console_scripts": [
            "zoo = animals.zoo:main",
        ],
    },
    install_requires=["termcolor==1.1.0"],
    version="0.1",
    author="Captain Jack",
    author_email="captain_jack@gmail.com",
    description="Example of the test application",
    license="MIT",
)
```

```bash
python setup.py bdist_egg
python setup.py bdist_wheel
python setup.py --help-commands
python setup.py bdist_wheel --universal
python setup.py sdist

pip install wheel
python setup.py bdist_wheel

pip install <package_name>
pip install --upgrade <package_name>
pip install <package_name>=='version_num'
pip install <package_name> >= 'version_num'
pip install -U pip
pip search "query"

pip install .
pip install /home/user/zoo-example
pip install dist/zoo_example-0.1-py3-none-any.whl
pip uninstall zoo-example
```

```python
import animals
animals.__path__
# ['.../site-packages/animals']
```
