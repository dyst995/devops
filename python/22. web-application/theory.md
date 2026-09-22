# Python Web Application

Python has become one of the most popular languages for **Web development**. Many famous websites such as **Instagram**, **Disqus**, and so on use it.

There are **three common components (layers)** in the **backend** side of a Python web application:

1. A **web server** (such as **Apache** / **Nginx**)
2. A **WSGI application server** (such as **Gunicorn** / **uWSGI**)
3. A **web application framework** (such as **Django** / **Flask**)

Their relationships are as follows:

```text
Client (browser)
    │  HTTP request
    ▼
Web server          Apache / Nginx
    │  static files here; dynamic work passed on
    ▼
WSGI server         Gunicorn / uWSGI
    │  WSGI interface (standard)
    ▼
Framework + app     Django / Flask / FastAPI
    │
    ▼
HTTP response (status + HTML / XML / JSON) back through the same path
```

(Course slide shows this stack. Client never talks to Django/Flask directly in this model.)

**Memory hook:** **HTTP → Apache/Nginx → Gunicorn/uWSGI → Django/Flask**. Three layers, not one process that does everything.

## 1. Web Server layer

First, we need a **web server** to receive **HTTP requests** and send back **responses** containing **status codes** and other contents such as **HTML**, **XML** or **JSON**. Also, a web server is responsible for providing **static data**: static web pages, images, files and etc.

There are lots of web server implementations suitable for Python web service. Considering the **ease of use**, **stability**, **security**, **market share**, and other issues, **Apache** and **Nginx** are the most popular. The **Apache HTTP Server** has been the most commonly deployed web server on the Internet for **20+ years**. **Nginx** is the **second** most widely used server for the **top 100,000 websites**.

**Memory hook:** web server = HTTP in/out + **static** files. Popular pair: **Apache** (long #1) · **Nginx** (#2 on large sites).

## 2. WSGI Server layer

A traditional web server does **not** understand or have any way to **run Python applications**. Therefore, the Python community came up with **WSGI** as a **standard interface** that modules and containers could implement. **WSGI** is now the commonly accepted approach for running Python web applications on web servers.

Because WSGI is just a **standard interface**, there are also different **implementations** of WSGI server based on that to help Python applications **communicate with web servers**. **Gunicorn** and **uWSGI** are two most popular WSGI servers.

There are two main benefits of a good WSGI server:

### Flexibility

The WSGI makes the three layers of Python web server **low coupling**. It would **separate the choice of application frameworks** from the **choice of web servers**, freeing developers to choose a pairing that suits them, while freeing framework and server developers to **focus on their preferred area of specialization**. It does not really care what we used to build our web application — as long as it can be interacted with using the **WSGI interface**.

### Promote scaling

Serving **thousands of requests** for **dynamic** content at once is the domain of **WSGI servers**, not frameworks. WSGI servers handle **processing requests from the web server** and decide how to **communicate those requests** to an application framework’s process. The **segregation of responsibilities** is important for efficiently **scaling** web traffic.

To summarize, the WSGI server takes care of everything which happens **in-between** the web server and the web application. This way, when coding up a Python application we don’t need to find solutions for:

- Communicating with **multiple web servers**
- Reacting to **lots of web requests at once** and **distributing the load**
- **Keeping multiple processes** of the web application running

**Memory hook:** WSGI = **contract** so Apache/Nginx can talk to Python. **Gunicorn** / **uWSGI** do the talking, load, and processes. Framework stays out of that.

## 3. Web application framework layer

Python’s web application framework makes the process of **app development** much easier. A framework implements **common issues** for a web application (such as **template system**, **ORM (Object Relational Mapping)** systems, **user authentication**, **content administration**, **site maps**, **RSS feeds**, and many more tasks) and we just need to develop our **commercial logic** upon it.

There are also many application frameworks for Python web development. Such as **Django**, **Flask**, and **FastAPI**.

**Memory hook:** framework = templates, ORM, auth, admin, … You write **business logic**. Course names: **Django** · **Flask** · **FastAPI**.

| Layer | Job | Course examples |
| --- | --- | --- |
| Web server | HTTP + static | Apache, Nginx |
| WSGI server | Python ↔ web server; scale dynamic requests | Gunicorn, uWSGI |
| Framework | Common web features + your logic | Django, Flask, FastAPI |
