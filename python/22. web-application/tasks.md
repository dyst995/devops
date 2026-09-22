# Tasks — Python Web Application

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: architecture — draw and recite. No install required.

1. [ ] Why Python for the web (Instagram, Disqus)? Three backend layers + examples (Apache/Nginx, Gunicorn/uWSGI, Django/Flask).
2. [ ] Draw Client → web server → WSGI → framework → response (status + HTML/XML/JSON). FastAPI also named?
3. [ ] Web server job (HTTP + static). Why Apache and Nginx (ease, stability, security, market share)? Apache 20+ years vs Nginx top 100,000.
4. [ ] Why WSGI (traditional server cannot run Python)? Standard interface. Two popular WSGI servers.
5. [ ] Two benefits: **flexibility** (low coupling, any pairing, specialization, “does not care”) and **scaling** (thousands of dynamic requests = WSGI not framework).
6. [ ] Three problems you do **not** solve in app code (multiple web servers; lots of requests / load; multiple processes).
7. [ ] Framework: templates, ORM, auth, admin, sitemaps, RSS. You write **commercial logic**. Django / Flask / FastAPI.
8. [ ] Interview: why Nginx cannot `import` Flask. What sits in the middle?
9. [ ] Swap Django↔Flask without swapping Apache↔Nginx — because of what? Swap Gunicorn↔uWSGI without rewriting the app.
10. [ ] Combined: three-layer diagram with product names; flexibility vs scaling; the three “don’t implement” bullets; framework feature list.
