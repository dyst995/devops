# Commands to memorize

```python
# start.py — 6 lines
from flask import Flask

app = Flask(__name__)          # WSGI app; __name__ → templates / static

@app.route('/')                # URL that triggers hello
def hello():
    return 'Hello, World!'     # default content type HTML

app.run()
```

```bash
pip install flask
python start.py
# http://127.0.0.1:5000/
```
