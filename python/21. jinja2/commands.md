# Commands to memorize

```bash
pip install Jinja2
pip install pyyaml
python conf.py
```

```text
{{ variable }}              # print
{% if … %} {% endif %}      # control
{% for x in xs %} {% endfor %}
{# comment #}
```

```python
from jinja2 import Template
template = Template('Hello {{ name }}!')
message = template.render(name='John Doe')
# Hello John Doe!
```

```python
# conf.py
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

```jinja
{{ servername }}
{{ documentroot }}
{{ serveradmin }}
{{ directorypath }}

{% if serveradmin %}
  ServerAdmin {{ serveradmin }}
{% endif %}

{% for vhost in apache_vhosts %}
    <VirtualHost *:80>
        ServerName {{ vhost.servername }}
        …
    </VirtualHost>
{% endfor %}
```

```yaml
# data.yml — first: flat keys; later: list
apache_vhosts:
- servername: …
  documentroot: …
- servername: …
  documentroot: …
```
