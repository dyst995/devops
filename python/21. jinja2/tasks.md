# Tasks — Jinja2

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Work in a throwaway folder. Use a venv ([pip](../02. pip/theory.md)).

## Warm-up

1. [ ] Why Jinja2 for many servers? Recite `{{ }}` / `{% %}` / `{# #}`. Hello `Template` + `render` → `Hello John Doe!`.
2. [ ] Recite `conf.py` (YAML load, `.j2` read, `render`, write `vhosts.conf`). Four variable names. `if serveradmin`. `for vhost in apache_vhosts`.

## Do

3. [ ] `pip install Jinja2` and `pyyaml`. Recreate Hello world exactly.
4. [ ] Save the course Apache block as **`vhosts.j2`**. Write **`conf.py`** and a **`data.yml`** with the four keys filled in (`servername`, `documentroot`, `serveradmin`, `directorypath`). Replace those spots in the `.j2` with `{{ }}`. `python conf.py` — `vhosts.conf` matches the values.
5. [ ] Wrap `ServerAdmin` in `{% if serveradmin %} … {% endif %}`. Remove `serveradmin` from YAML (or leave it empty). Re-run. No `ServerAdmin` line. Put the value back and confirm the line returns.
6. [ ] Change YAML to **`apache_vhosts:`** with **two** items. Surround `<VirtualHost>` with `{% for vhost in apache_vhosts %} … {% endfor %}`. Use `{{ vhost.servername }}` (and the other `vhost.` fields). Two VirtualHost blocks in `vhosts.conf`.

## Complete

7. [ ] Recite the Apache starter block from memory (ServerName / DocumentRoot / ServerAdmin / Directory). One sentence: flat YAML keys vs list + `vhost.` after you add `for`.
