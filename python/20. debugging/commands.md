# Commands to memorize

```python
# syslog — OS log
from syslog import syslog
syslog('This is a debug message.')
```

```bash
python debug.py
tail /var/log/syslog
```

```python
import logging

logging.debug('This is a debug message')
logging.info('This is an info message')
logging.warning('This is a warning message')
logging.error('This is an error message')
logging.critical('This is a critical message')
# default: WARNING:root:…  ERROR:root:…  CRITICAL:root:…

logging.basicConfig(level=logging.INFO)
logging.info('This will get logged')
logging.debug('This will not get logged')

logging.basicConfig(filename='app.log', filemode='w',
                    format='%(name)s - %(levelname)s - %(message)s')
logging.error('This will get logged to a file')
# app.log: root - ERROR - This will get logged to a file

import logging.config
import yaml
with open('config.yaml', 'r') as f:
    config = yaml.safe_load(f.read())
    logging.config.dictConfig(config)
logger = logging.getLogger("simpleExample")
logger.debug('This is a debug message')
```

```yaml
# config.yaml (course) — version: 1
# formatters.simple / handlers.console + file / loggers.simpleExample / root
```

```python
# debug.py — pdb sample
a = "aaa"
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

```bash
python -m pdb debug.py
```

```text
(Pdb) n          # next line in this function
(Pdb) s          # step into a called function
(Pdb) p a,b      # ('aaa', 'bbb')
(Pdb) c          # continue → aaabbbccc, then restart
(Pdb) q          # quit, abort
```

```python
# debug.py — breakpoint in the file
import pdb
a = "aaa"
pdb.set_trace()
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

```bash
python debug.py
# > ...debug.py(4)<module>()
# -> b = "bbb"
# (Pdb)
```
