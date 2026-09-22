# Jinja2

## Configuration file

**Jinja2** is a powerful and easy-to-use **python-based templating engine** that comes in handy in an IT environment with **multiple servers** where configurations vary every other time. Creating **static** configuration files for each of these nodes is **tedious** and may not be a viable option since it will consume more time and energy. And this is where **templating** comes in.

Let's demonstrate Jinja2 usage by example. We have an **Apache** configuration that we should customize for **different environments**:

```apache
NameVirtualHost *:80

<VirtualHost *:80>
  ServerName www.domain.tld
  DocumentRoot /www/domain
  ServerAdmin www-admin@foo.example.com
  <Directory "/usr/local/httpd/htdocs">
     AllowOverride All
     Options Indexes FollowSymLinks
     Order allow,deny
     Allow from all
  </Directory>
</VirtualHost>
```

Save this configuration in **`vhosts.j2`** file.

**Memory hook:** one **`.j2`** template + data → many env-specific configs. Do not hand-write a static file per node.

## Installation

Install **Jinja2** and **PyYAML** before proceeding further:

```bash
pip install Jinja2
pip install pyyaml
```

**Memory hook:** `Jinja2` = templates. `pyyaml` = values in YAML. Prefer `python -m pip` ([pip](../02. pip/theory.md)).

## Basic example

A Jinja2 template file is a **text file** that contains **variables** that get **evaluated and replaced** by actual values upon **runtime** or code execution. In a Jinja2 template file, you will find the following tags:

| Tag | Course meaning |
| --- | --- |
| `{{ }}` | Double curly braces — widely used; **embed variables** and **print** their value. Example: `The {{ webserver }} is running on  {{ nginx-version }}` |
| `{%  %}` | **Control statements** — loops and if-else |
| `{#  #}` | **Comments** that describe a task |

Hello world example:

```python
from jinja2 import Template

template = Template('Hello {{ name }}!')
message = template.render(name='John Doe')

print(message)  # 'Hello John Doe!'
```

**Memory hook:** `Template('… {{ name }} …').render(name=…)` → string. `{{ }}` print · `{% %}` logic · `{# #}` comment.

## Using yaml

We will use a **yaml-file** to store values. The following script renders the template with provided values.

```python
import yaml
from jinja2 import Template

with open('data.yml') as data_file:
    config_data = yaml.load(data_file, Loader=yaml.FullLoader)

with open('vhosts.j2') as template_file:
    template_html = template_file.read()

template = Template(template_html)
vhosts_conf = template.render(config_data)

with open('vhosts.conf', 'w') as vhosts_file:
    vhosts_file.write(vhosts_conf)
```

Course flow: load **`data.yml`** → read **`vhosts.j2`** → `Template` → `render(config_data)` (YAML keys become template variables) → write **`vhosts.conf`**.

**Memory hook:** YAML dict **is** the `render(...)` kwargs. Out file is the real Apache config.

(`yaml.load(..., Loader=yaml.FullLoader)` is the slide. Safer load is `yaml.safe_load`, as in [debugging](../20. debugging/theory.md).)

## Variables

Let's update **`vhosts.j2`** created before. Our first step is to replace the following values with **`{{ }}`** variables. The values should be moved to **`data.yaml`**:

```text
{{ servername }}

{{ documentroot }}

{{ serveradmin }}

{{ directorypath }}
```

`data.yml`:

```yaml
servername: …
documentroot: …
...
```

(Course names **`data.yml`** in the script and **`data.yaml`** in the later steps — same idea, one file.)

It is time to verify updates and run rendering apache configuration from the template:

```bash
$ python conf.py
```

Map slide values into the Apache lines, e.g. `ServerName {{ servername }}`, `DocumentRoot {{ documentroot }}`, `ServerAdmin {{ serveradmin }}`, `<Directory "{{ directorypath }}">`.

**Memory hook:** literals leave the `.j2`. Keys live in YAML. `python conf.py` → `vhosts.conf`.

## If

The next step is to add **if-statement**. Let's check whether **`serveradmin`** is defined. If not, **ServerAdmin** section won't be added to apache configuration:

```jinja
{% if serveradmin %}
  ServerAdmin {{ serveradmin }}
{% endif %}
```

To test your updates in `vhosts.j2`, temporarily **remove `serveradmin`** value from `data.yaml` and run `conf.py`.

**Memory hook:** `{% if serveradmin %} … {% endif %}`. Empty/missing → no `ServerAdmin` line.

## For

The next structure that should be added is **for-loop**. In order to be able to add **several VirtualHost** sections to the apache configuration, surround VirtualHost section with **for-statement**:

```jinja
{% for vhost in apache_vhosts %}
    <VirtualHost *:80>
        ServerName {{ vhost.servername }}
        …
    </VirtualHost>
{% endfor %}
```

`data.yml` / `data.yaml` file should be updated accordingly:

```yaml
apache_vhosts:
- servername: …
  documentroot: …
       …
- servername: …
  documentroot: …
       …
```

Inside the loop, use **`vhost.`** — `{{ vhost.servername }}`, `{{ vhost.documentroot }}`, and so on (same keys as before, now **per list item**).

Test your changes:

```bash
$ python conf.py
```

**Memory hook:** YAML **list** `apache_vhosts` → `{% for vhost in apache_vhosts %}` → many `<VirtualHost>` blocks.
