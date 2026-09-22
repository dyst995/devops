# Tasks — Jinja2

Close `theory.md`. Recite tags, then write `vhosts.j2` + `conf.py`. venv; Jinja2 + pyyaml.

1. [ ] **Learn:** templating engine; many servers, changing configs. Recite Apache block. File **`vhosts.j2`**.
2. [ ] **Memorize:** `pip install Jinja2` and `pyyaml`. Tags: `{{ }}` print, `{% %}` if/for, `{# #}` comment.
3. [ ] **Write:** `Template('Hello {{ name }}!').render(name='John Doe')` → `Hello John Doe!`
4. [ ] **Write:** `conf.py` — `yaml.load` FullLoader, read `.j2`, `render(config_data)`, write **`vhosts.conf`**.
5. [ ] **Memorize four keys:** `servername` `documentroot` `serveradmin` `directorypath`. Command `python conf.py`.
6. [ ] **Write:** `{% if serveradmin %} ServerAdmin … {% endif %}`. Test by removing the YAML value.
7. [ ] **Write:** `{% for vhost in apache_vhosts %}` — `{{ vhost.servername }}`. Two YAML items → two VirtualHosts.
8. [ ] **Learn:** YAML keys = template variables. Flat vs `vhost.` after `for`.
9. [ ] **Learn:** slide `FullLoader` vs `safe_load`.
10. [ ] **Memorize (cover):** three tags; Hello John Doe; `conf.py` flow; `if` / `for`; `vhosts.conf`.
