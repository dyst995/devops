# Flask — Questions

Cover the Answers section. Answer first, then check.

1. Docs URL? Lightweight? How many lines in Hello world? File name?
2. Recite `start.py` from memory.
3. What is an instance of `Flask`? Why `Flask(__name__)` (first argument, shortcut, resources)?
4. What does `@app.route('/')` do? What does `hello` return? Default content type?
5. Last line of the script? Two shell commands? URL and port?

---

## Answers

1. https://flask.palletsprojects.com/ · yes · **6** · `start.py`.
2. `from flask import Flask` · `app = Flask(__name__)` · `@app.route('/')` · `def hello():` · `return 'Hello, World!'` · `app.run()`.
3. The **WSGI application**. Module or package name; `__name__` for most cases; templates and static files.
4. Which URL triggers the function (`/`). The browser message. **HTML**.
5. `app.run()`. `pip install flask` · `python start.py`. **http://127.0.0.1:5000/**
