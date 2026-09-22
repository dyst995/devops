# Jinja2 — Questions

Cover the Answers section. Answer first, then check.

1. What is Jinja2? Why not static configs per server? Recite the Apache `vhosts` block. Save as which file?
2. Two pip installs?
3. What is a `.j2` file? Recite `{{ }}` / `{% %}` / `{# #}` and the `webserver` / `nginx-version` example.
4. Hello world: import, `Template`, `render`, printed string?
5. Recite `conf.py`: open `data.yml` (which loader?), open `vhosts.j2`, `render`, write which file?
6. Four variable names moved to YAML? Command to render?
7. `if` around `ServerAdmin` — recite tags. How do you test “not defined”?
8. `for` — loop variable and list name? `ServerName` inside the loop? YAML shape? Test command?

---

## Answers

1. Python templating engine; many servers, changing configs. The `NameVirtualHost` / `<VirtualHost *:80>` example (`www.domain.tld`, `/www/domain`, `www-admin@foo.example.com`, `/usr/local/httpd/htdocs`). **`vhosts.j2`**.
2. `pip install Jinja2` · `pip install pyyaml`.
3. Text with variables replaced at runtime. Print variables · control (if/for) · comments. `The {{ webserver }} is running on  {{ nginx-version }}`.
4. `from jinja2 import Template` · `Template('Hello {{ name }}!')` · `render(name='John Doe')` · `Hello John Doe!`
5. `yaml.load(..., Loader=yaml.FullLoader)` · read template · `Template` · `render(config_data)` · **`vhosts.conf`**.
6. `servername` `documentroot` `serveradmin` `directorypath`. `python conf.py`.
7. `{% if serveradmin %} ServerAdmin {{ serveradmin }} {% endif %}`. Remove `serveradmin` from YAML, run `conf.py`.
8. `vhost` in `apache_vhosts`. `{{ vhost.servername }}`. List of maps under `apache_vhosts:`. `python conf.py`.
