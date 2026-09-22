# Tasks — Flask

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Use a **venv**. Prefer `python -m pip`.

## Warm-up

1. [ ] Lightweight framework. Recite the 6 lines. `Flask` instance = WSGI app. Why `__name__`?
2. [ ] `@app.route('/')` vs return body vs default HTML. `pip install flask` · `python start.py` · URL?

## Do

3. [ ] Write **`start.py`** exactly as in the notes. Install Flask. Run it. Open **http://127.0.0.1:5000/** — page is `Hello, World!`.
4. [ ] Add a second route (e.g. `/hi`) that returns different text. Hit both URLs. Recite what `route()` is for.
5. [ ] Return a small HTML string (`<h1>Hello, World!</h1>`). Confirm the browser **renders** it (default content type HTML).

## Complete

6. [ ] Without looking: import → `Flask(__name__)` → decorator → return → `app.run()`. One sentence linking this app to the [WSGI / framework layers](../22. web-application/theory.md).
