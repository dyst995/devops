# Commands to memorize

```bash
python -m pip install package
python -m pip install package==1.2.3
python -m pip install 'package>=1.2,<2'
python -m pip install --upgrade package    # -U
python -m pip uninstall package
python -m pip list
python -m pip show package
python -m pip freeze
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
python -m pip install --upgrade pip
python -m pip install --user package       # home, not system; prefer venv

python -m venv .venv
source .venv/bin/activate                  # Unix / WSL
# .venv\Scripts\activate.bat               # Windows cmd
# .venv\Scripts\Activate.ps1               # Windows PowerShell
deactivate

python -m pip install --index-url https://pypi.org/simple/ package
python -m pip install --extra-index-url https://example.com/simple/ package

# Windows: py -m pip …
# Do not: sudo pip install  (OS Python)
```
