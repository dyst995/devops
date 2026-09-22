# Python Web Application — Questions

Cover the Answers section. Answer first, then check.

1. Why Python for the web (sites named)? Three backend layers, with examples?
2. Recite the request path (client → … → response types).
3. Web server: receive/send what? Static data? Why Apache and Nginx (criteria)? Apache vs Nginx market claim?
4. Why WSGI (traditional web server + Python)? What is WSGI? Two popular WSGI servers?
5. Two main benefits of a good WSGI server? Recite flexibility (low coupling, pairing, specialization, “does not care”). Recite scaling (thousands, whose domain, what WSGI does, segregation).
6. Three problems WSGI means you do **not** solve in app code?
7. Framework: what does it implement (list)? What do you develop? Three framework names?

---

## Answers

1. Popular for Web; Instagram, Disqus. Web server (Apache/Nginx) · WSGI (Gunicorn/uWSGI) · framework (Django/Flask).
2. HTTP request → web server (static or pass on) → WSGI → framework → status + HTML/XML/JSON back.
3. HTTP requests; responses with status and HTML/XML/JSON. Pages, images, files. Ease of use, stability, security, market share. Apache most deployed 20+ years; Nginx second on top 100,000 sites.
4. Server cannot run Python. Standard interface for modules/containers. Gunicorn, uWSGI.
5. Flexibility and promote scaling. Layers loosely coupled; pick any server+framework pair; specialists stay in their layer; any app if it speaks WSGI. Dynamic thousands = WSGI not framework; WSGI takes requests from the web server to a framework process; split duties to scale.
6. Talk to many web servers · many requests / load · keep multiple app processes up.
7. Templates, ORM, auth, content admin, sitemaps, RSS, more. Commercial/business logic. Django, Flask, FastAPI.
