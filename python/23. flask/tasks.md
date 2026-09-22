# Tasks — Flask

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite the 6 lines. venv; `python -m pip`.

1. [ ] Docs URL? Lightweight? Which [web-application](../22. web-application/theory.md) layer? How many lines in Hello world? File `start.py`?
2. [ ] Recite the 6 lines from memory. `Flask` instance = **WSGI application**.
3. [ ] Why `Flask(__name__)` (module/package name, shortcut, templates/static)?
4. [ ] `@app.route('/')` — what does it tell Flask? `hello` return value? Default content type (HTML rendered in the browser)?
5. [ ] Last line `app.run()`? Two shell commands? URL and port **5000**?
6. [ ] Write `start.py` exactly. Install Flask. Open http://127.0.0.1:5000/ — `Hello, World!`.
7. [ ] Second route (e.g. `/hi`) different text. Hit both URLs. Recite what `route()` is for.
8. [ ] Return `<h1>Hello, World!</h1>` — browser **renders** HTML (default content type).
9. [ ] Interview: this `app` is the WSGI app; production would sit behind Gunicorn/uWSGI + Nginx — one sentence.
10. [ ] Combined: import → `Flask(__name__)` → decorator → return → `app.run()`; 127.0.0.1:5000; HTML default; WSGI layer.
