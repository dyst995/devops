# Flask

Docs: https://flask.palletsprojects.com/

**Flask** is a **lightweight** framework. It sits in the [web application](../22. web-application/theory.md) **framework** layer (with Django / FastAPI).

The simple **"Hello world"** Flask application contains only **6 lines** of code:

```python
# start.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

app.run()
```

So what did that code do?

1. First we imported the **`Flask`** class. An instance of this class will be our **WSGI application**.
2. Next we create an instance of this class. The first argument is the **name of the application’s module or package**. **`__name__`** is a convenient shortcut for this that is appropriate for most cases. This is needed so that Flask knows **where to look for resources** such as **templates** and **static files**.
3. We then use the **`route()`** decorator to tell Flask **what URL** should trigger our function.
4. The function **returns the message** we want to display in the user’s browser. The default content type is **HTML**, so HTML in the string will be **rendered by the browser**.
5. **`app.run()`** starts the development server (course script’s last line).

**Memory hook:** `Flask(__name__)` = WSGI app. `@app.route('/')` = URL. `return '…'` = body (HTML). `app.run()` = listen.

| Line | Role |
| --- | --- |
| `from flask import Flask` | Flask class |
| `app = Flask(__name__)` | WSGI app; `__name__` = this module (templates/static) |
| `@app.route('/')` | URL `/` runs the next function |
| `def hello():` / `return 'Hello, World!'` | response body |
| `app.run()` | start the server |

## To run the application

```bash
$ pip install flask
$ python start.py
```

Then just open the URL: **http://127.0.0.1:5000/**

**Memory hook:** install **`flask`** · run **`start.py`** · browser **`127.0.0.1:5000`** (default port **5000**). Prefer `python -m pip` in a venv ([pip](../02. pip/theory.md)).
