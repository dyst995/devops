# Tasks — Python Web Application

Close `theory.md`. Draw and recite. No install.

1. [ ] **Learn:** Python for the web (Instagram, Disqus). **Three layers** + examples.
2. [ ] **Write (draw):** Client → Apache/Nginx → Gunicorn/uWSGI → Django/Flask/FastAPI → status + HTML/XML/JSON.
3. [ ] **Memorize web server:** HTTP in/out + **static**. Apache 20+ years #1; Nginx #2 on top 100,000. Criteria: ease, stability, security, market share.
4. [ ] **Learn:** web server cannot run Python → **WSGI** standard. Gunicorn, uWSGI.
5. [ ] **Memorize two benefits:** flexibility (low coupling, any pairing) and scaling (thousands of dynamic requests = WSGI).
6. [ ] **Memorize three things app code does not solve:** talk to many web servers; lots of requests/load; keep multiple processes up.
7. [ ] **Memorize framework:** templates, ORM, auth, admin, sitemaps, RSS. You write **commercial logic**. Django Flask FastAPI.
8. [ ] **Learn:** Nginx cannot `import` Flask — WSGI in the middle.
9. [ ] **Learn:** swap framework without swapping web server (and reverse) because of WSGI.
10. [ ] **Memorize (cover):** three-layer diagram with names; flexibility vs scaling; three “don’t implement”; framework list.
