# Commands to memorize

```bash
eval "$(pyenv init -)"           # Unix shell startup (see installer)

pyenv install -l
pyenv install 3.12.8
pyenv uninstall 3.12.8
pyenv versions
pyenv version                    # selected + why
pyenv version-name
pyenv prefix
pyenv which python

pyenv global 3.12.8              # user default
pyenv local 3.11.9               # writes .python-version (this dir)
pyenv shell 3.10.14              # this terminal only
pyenv shell --unset

pyenv rehash

python -V
python -m pip install --upgrade pip
python -m venv .venv
# then pip as in ../02. pip/commands.md
```
