# Commands to memorize

```text
Client
  → Web server     Apache / Nginx          HTTP + static
  → WSGI server    Gunicorn / uWSGI        Python ↔ HTTP; load; processes
  → Framework      Django / Flask / FastAPI   templates, ORM, auth, …
  ← status + HTML / XML / JSON
```

```text
WSGI  = standard interface (web server does not run Python by itself)

Flexibility  — low coupling; any framework + any web server if both speak WSGI
Scaling      — thousands of dynamic requests = WSGI’s job, not the framework

App code does not solve:
  - talking to multiple web servers
  - many requests at once / distributing load
  - keeping multiple app processes running
```
