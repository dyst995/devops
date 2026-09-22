# Requests

Docs: https://requests.readthedocs.io/

**Requests** is a simple, yet elegant, **HTTP library**. Requests allows you to send **HTTP/1.1** requests extremely easily. There’s no need to manually add **query strings** to your URLs, or to **form-encode** your **PUT & POST** data — but nowadays, just use the **JSON** method.

Requests is one of the most downloaded Python packages today, pulling in around **30M downloads/week**— according to GitHub, Requests is currently depended upon by **1,000,000+** repositories. You may certainly put your trust in this code.

```bash
$ pip install requests
```

```python
import requests

response = requests.get('https://api.github.com')

if response.status_code == 200:
    print('Success!')
elif response.status_code == 404:
    print('Not Found.')

if response:
    print('Success!')
else:
    print('An error has occurred.')
```

**Memory hook:** `pip install requests` · `requests.get(url)` · check **`status_code`** or the response as a **bool**. Prefer `python -m pip` ([pip](../02. pip/theory.md)).

| Check | Course meaning |
| --- | --- |
| `response.status_code == 200` | Success! |
| `response.status_code == 404` | Not Found. |
| `if response:` | truthy → Success! |
| `else:` | An error has occurred. |

A `Response` is **truthy** for a successful HTTP status (typically **2xx / 3xx**), **falsy** for client/server errors (**4xx / 5xx**). You can test `if response:` without spelling `== 200`.

## Requests — response

```python
>>> response = requests.get('https://api.github.com')
>>> response.content
b'{"current_user_url":"https://api.github.com/user",...}'

>>> response.text
'{"current_user_url":"https://api.github.com/user",...}'

>>> response.json()
{'current_user_url': 'https://api.github.com/user', }
```

| Attribute / method | What you get |
| --- | --- |
| `response.content` | **bytes** (`b'…'`) — raw body |
| `response.text` | **str** — decoded body |
| `response.json()` | **Python object** (`dict` / `list`) from JSON |

**Memory hook:** `.content` bytes · `.text` string · `.json()` parse. GitHub example starts with `current_user_url`.

## Requests — Authentication

```python
requests.get('https://api.github.com/user', auth=('user', 'pass'))


requests.get('https://git.epam.com/api/v4/projects',
             headers={'Authorization': Bearer myToken'})
```

- **`auth=('user', 'pass')`** — HTTP basic auth (username, password).
- **`headers={'Authorization': …}`** — token in a header (GitLab-style `git.epam.com` API).

Course header line is missing a quote: write `headers={'Authorization': 'Bearer myToken'}`.

**Memory hook:** `auth=(user, pass)` **or** `headers=` with **Bearer**.

## Requests — Parameters

```python
>>> payload = {'key1': 'value1', 'key2': 'value2'}
>>> r = requests.get('https://some.org/obj', params=payload)
>>> print(r.url)

https://some.org/obj?key2=value2&key1=value1
```

`params=` builds the **query string**. You do **not** concatenate `?key1=…` yourself. Dict key order in the printed URL may be `key2` then `key1` (slide).

**Memory hook:** `params=dict` → `?key=value&…` on `r.url`.

## Requests — JSON

```python
j = [{"name": "cat", "items": [{"num": 1, "price": 30}, {"num": 2, "price": 50}]}]
```

How to get **num = 2** price?

```python
result = j[0]["items"][1]["price"]
```

(Course may show curly quotes `“items”` — use normal `"items"`.)

Walk: `j[0]` first (only) object · `["items"]` the list · `[1]` second item (`num` 2) · `["price"]` → **50**.

**Memory hook:** list → dict → list → dict. `j[0]["items"][1]["price"]` is **50**.

## urllib

Docs: https://docs.python.org/3/howto/urllib2.html

**urllib** (course also writes **urlib**) is the **standard-library** HTTP client. Requests is the third-party library above; urllib is built in, more verbose. Same job (HTTP), different API.

**Memory hook:** **requests** = `pip install`, easy. **urllib** = stdlib, see the HOWTO.
