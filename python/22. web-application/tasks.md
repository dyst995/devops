# Tasks — Python Web Application

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. This topic is **architecture** (no install required). Recite first; then draw.

## Warm-up

1. [ ] Three layers + examples (Apache/Nginx · Gunicorn/uWSGI · Django/Flask). Instagram / Disqus.
2. [ ] Web server: HTTP + static. Why Apache vs Nginx (20+ years / top 100,000).
3. [ ] WSGI: why it exists. Flexibility vs scaling. Three things you do **not** implement in the app.
4. [ ] Framework: templates, ORM, auth, admin, sitemaps, RSS. You write commercial logic. FastAPI is also named.

## Do

5. [ ] From memory, draw Client → web server → WSGI → framework → response (status + HTML/XML/JSON). Label each layer with the course product names.
6. [ ] Explain to yourself (aloud or on paper) why Nginx cannot `import` your Flask app, and what Gunicorn/uWSGI sit in the middle to do.
7. [ ] One pairing sentence: you can swap **Django ↔ Flask** without swapping **Apache ↔ Nginx**, because of WSGI. Then the reverse: swap **Gunicorn ↔ uWSGI** without rewriting the app.

## Complete

8. [ ] Recite the full “to summarize” list (multiple web servers / lots of requests / multiple processes) and the two benefit headings without looking.
