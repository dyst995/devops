# Tasks — Jinja2

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite tags and the Apache flow. venv; `pip install Jinja2 pyyaml`.

1. [ ] What is Jinja2? Why not static configs per server? Recite the Apache `vhosts` block. Save as which file?
2. [ ] Two pip installs. Recite `{{ }}` / `{% %}` / `{# #}` and the `webserver` / `nginx-version` example.
3. [ ] Hello world: `Template('Hello {{ name }}!')` `render(name='John Doe')` — exact string.
4. [ ] Recite `conf.py`: `yaml.load` + `FullLoader`, read `vhosts.j2`, `render(config_data)`, write **`vhosts.conf`**. `data.yml` vs `data.yaml` on the slides?
5. [ ] Four variable names (`servername` `documentroot` `serveradmin` `directorypath`). Command `python conf.py`.
6. [ ] `{% if serveradmin %} … {% endif %}`. How do you test “not defined”?
7. [ ] `{% for vhost in apache_vhosts %}` — `{{ vhost.servername }}`. YAML list of maps. Two VirtualHosts after render.
8. [ ] Interview: YAML dict keys become template variables. Flat keys vs `vhost.` after `for`.
9. [ ] Safer load: course `yaml.load(..., FullLoader)` vs `safe_load` (debugging notes). One sentence.
10. [ ] Combined: Hello John Doe; `vhosts.j2` + YAML; `if` omits ServerAdmin; `for` two hosts; `vhosts.conf` on disk.
