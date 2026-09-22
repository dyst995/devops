# Requests — Questions

Cover the Answers section. Answer first, then check.

1. Docs URL? What is Requests (HTTP version)? What do you not add by hand (query / form)? What to use nowadays? Download/depend numbers? Install line?
2. Recite `get` to `api.github.com` and both `if` blocks (`status_code` 200/404 and `if response`).
3. `response.content` vs `.text` vs `.json()` — types and GitHub-shaped values?
4. Two auth forms (GitHub `auth=` vs Epam GitLab `headers=`). Slide typo on Bearer?
5. `params=payload` with `key1`/`key2` — `r.url` on the slide?
6. JSON `j` — path to num=2 price? Value?
7. urllib docs URL? requests vs urllib (install vs stdlib)?

---

## Answers

1. https://requests.readthedocs.io/ · HTTP library, HTTP/1.1. Query strings; form-encode PUT/POST — use the JSON method. ~30M/week; 1,000,000+ repos. `pip install requests`.
2. `requests.get('https://api.github.com')`. `200` Success! · `404` Not Found. Truthy Success! · else An error has occurred.
3. bytes `b'{…current_user_url…}'` · str same JSON · `dict` with `current_user_url`.
4. `auth=('user', 'pass')` on `/user`. `headers={'Authorization': 'Bearer myToken'}` on `https://git.epam.com/api/v4/projects` (slide drops a quote).
5. `https://some.org/obj?key2=value2&key1=value1`
6. `j[0]["items"][1]["price"]` → **50**.
7. https://docs.python.org/3/howto/urllib2.html · requests is pip; urllib is stdlib (course spelling **urlib**).
