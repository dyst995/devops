# Debugging in Python

In order to debug an error in Python, we can use **debuggers** and, in addition, add **logging** to the application.

## Logging

Logging is a very useful tool in a programmer’s toolbox. It can help you develop a better understanding of the **flow** of a program and discover **scenarios** that you might not even have thought of while developing.

Logs provide developers with an extra set of eyes that are constantly looking at the flow that an application is going through. They can store information, like which **user or IP** accessed the application. If an error occurs, then they can provide more insights than a **stack trace** by telling you what the **state of the program** was before it arrived at the line of code where the error occurred.

By logging useful data from the right places, you can not only **debug errors** easily but also use the data to **analyze the performance** of the application to plan for **scaling** or look at **usage patterns** to plan for **marketing**.

Python provides a logging system as a part of its **standard library**, so you can quickly add logging to your application. In this article, you will learn why using this module is the best way to add logging to your application as well as how to get started quickly, and you will get an introduction to some of the **advanced** features available.

**Memory hook:** logs = extra eyes on flow + state **before** the crash. Stdlib — no extra install for `logging`.

## syslog

```python
# debug.py
from syslog import syslog
syslog('This is a debug message.')
```

```bash
$ python debug.py
$ tail /var/log/syslog
```

Writes to the **OS syslog** (typical Linux path `/var/log/syslog`). On macOS/Windows the log file path differs; the course command is `tail /var/log/syslog`.

**Memory hook:** `from syslog import syslog` → OS log, not Python’s `logging` module.

## The `logging` module

The **`logging`** module in Python is a ready-to-use and powerful module that is designed to meet the needs of **beginners** as well as **enterprise** teams. It is used by most **third-party Python libraries**, so you can integrate your log messages with the ones from those libraries to produce a **homogeneous** log for your application.

`logging` supports different **levels** of errors:

```python
import logging

logging.debug('This is a debug message')
logging.info('This is an info message')
logging.warning('This is a warning message')
logging.error('This is an error message')
logging.critical('This is a critical message')
```

Examples of logging messages:

```text
WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message
```

Default level is **WARNING**: `debug` and `info` are **not** printed unless you lower the threshold. Format: **`LEVEL:loggername:message`**. Default logger name is **`root`**.

| Call | Level (low → high) | Default visible? |
| --- | --- | --- |
| `logging.debug` | DEBUG | no |
| `logging.info` | INFO | no |
| `logging.warning` | WARNING | yes |
| `logging.error` | ERROR | yes |
| `logging.critical` | CRITICAL | yes |

**Memory hook:** five rungs: debug < info < warning < error < critical. Out of the box you see **warning and up**.

## Specify the level

You can specify the level of logging. In this case, only messages of **defined level and higher** are output:

```python
import logging

logging.basicConfig(level=logging.INFO)
logging.info('This will get logged')
logging.debug('This will not get logged')
```

`level=logging.INFO` → **INFO** and above (INFO, WARNING, ERROR, CRITICAL). **DEBUG** still hidden.

**Memory hook:** `basicConfig(level=...)` = cutoff. Named level **and higher**. Call `basicConfig` **before** the first log (first config wins).

## Customize the output format (file)

The output format can be customized:

```python
import logging

logging.basicConfig(filename='app.log', filemode='w',
                    format='%(name)s - %(levelname)s - %(message)s')
logging.error('This will get logged to a file')
```

```text
# root - ERROR - This will get logged to a file
```

- **`filename='app.log'`** — write to a file, not only the console
- **`filemode='w'`** — rewrite the file each run (`'a'` would append)
- **`format=`** — `%(name)s` logger name · `%(levelname)s` level word · `%(message)s` the text

**Memory hook:** `basicConfig` can aim at a **file** and a **format string**. Course line in `app.log`: `root - ERROR - This will get logged to a file`.

## Configuration file (`dictConfig` + YAML)

Complex configuration can be provided in a **configuration file**. Here is an example of a configuration file and its loading in python code:

```yaml
version: 1
formatters:
  simple:
    format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: simple
    stream: ext://sys.stdout
  file:
    class : logging.handlers.RotatingFileHandler
    formatter: precise
    filename: logconfig.log
    maxBytes: 1024
    backupCount: 3
loggers:
  simpleExample:
    level: DEBUG
    handlers: [console]
    propagate: no
root:
  level: DEBUG
  handlers: [console]
```

```python
import logging
import logging.config
import yaml

with open('config.yaml', 'r') as f:
    config = yaml.safe_load(f.read())
    logging.config.dictConfig(config)

logger = logging.getLogger("simpleExample")

logger.debug('This is a debug message')
```

Course YAML: **`version: 1`** (required for dict config). Formatter **`simple`** with **asctime**. Handlers: **console** (`StreamHandler`, DEBUG, `ext://sys.stdout`) and **file** (`RotatingFileHandler`, `logconfig.log`, `maxBytes: 1024`, `backupCount: 3`). Logger **`simpleExample`**: DEBUG, console, **`propagate: no`**. **root**: DEBUG, console.

The file handler names formatter **`precise`**, which is **not** defined in this snippet — that is the slide. For a working file handler, point `formatter` at **`simple`** (or add a `precise` formatter). `yaml` is not stdlib — `pip install pyyaml` if needed ([pip](../02. pip/theory.md)).

**Memory hook:** YAML → `yaml.safe_load` → `logging.config.dictConfig`. Then `getLogger("simpleExample")` — named logger, not only `root`.

## Python debugger

Let's use a small script for debugging:

```python
# debug.py

a = "aaa"
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

```bash
python –m pdb debug.py
```

(Course dash may be an en-dash **`–`**. The command is **`python -m pdb debug.py`**.)

Python has an **embedded command line debugger**. It is convenient to use it in environments **without GUI** installed (for instance, **inside a docker container**).

```text
$ python -m pdb debug.py
> /home/user/debug.py(1)<module>()
-> a = "aaa"
```

Stops **before** line 1. `->` is the **current** line (not executed yet). `(Pdb)` is the debugger prompt.

**Memory hook:** `python -m pdb script.py` = CLI debugger. No GUI — useful in **Docker**.

## pdb commands

```text
$ python -m pdb debug.py
> /home/auser/projects/devops/debug.py(1)<module>()
-> a = "aaa"
```

### `n(ext)` and `s(tep)`

Continue execution until the **next line in the current function** is reached or it returns. (The difference between **next** and **step** is that **step** stops **inside a called function**, while **next** executes called functions at (nearly) **full speed**, only stopping at the next line in the **current** function.)

```text
(Pdb) n
> /home/auser/projects/devops/debug.py(2)<module>()
-> b = "bbb"
(Pdb) s
> /home/auser/projects/devops/debug.py(3)<module>()
-> c = "ccc"
```

On this script there is no nested call, so `n` and `s` both move one line (`aaa` done → `bbb`, then `ccc`).

**Memory hook:** **`n`** = next line **here** (skip into calls). **`s`** = step **into** the call.

### `p(rint)`

Evaluate the expression in the **current context** and print its value.

```text
(Pdb) p a,b
('aaa', 'bbb')
```

**Memory hook:** `p a,b` → `('aaa', 'bbb')` — names already assigned; `c` not yet if you stopped on `c = "ccc"`.

### `c(ontinue)`

Continue execution, only stop when a **breakpoint** is encountered.

```text
(Pdb) c
aaabbbccc
The program finished and will be restarted
> /home/user/debug.py(1)<mdule>()
-> a = "aaa"
```

Prints **`aaabbbccc`**. pdb then **restarts** the script from line 1 (course shows `<mdule>()` — meaning `<module>()`).

**Memory hook:** **`c`** = run until breakpoint or **end**. pdb **restarts** after finish.

### `q(uit)`

Quit from the debugger. The program being executed is **aborted**.

```text
(Pdb) q
$
```

**Memory hook:** **`q`** = abort and leave pdb. Back to the shell.

| Command | Full name | Course meaning |
| --- | --- | --- |
| `n` | next | next line in **this** function; calls run at full speed |
| `s` | step | next line; **enter** a called function |
| `p` | print | evaluate expression **here**, print value |
| `c` | continue | run until **breakpoint** (or end) |
| `q` | quit | abort the program, leave pdb |

## `pdb.set_trace()`

`pdb.set_trace()` **inserts a breakpoint** in the current position.

```python
# debug.py
import pdb
a = "aaa"
pdb.set_trace()
b = "bbb"
c = "ccc"
final = a + b + c
print(final)
```

Script execution will be **stopped** and **pdb mode is enabled** when the Python interpreter reaches the line with the breakpoint.

```text
$ python debug.py
> /home/user/debug.py(4)<module>()
-> b = "bbb"
(Pdb)
```

Run with **`python debug.py`** (no `-m pdb`). Stops at **`b = "bbb"`** — the line **after** `set_trace()`. `a` is already `"aaa"`.

**Memory hook:** `-m pdb` = start under the debugger from line 1. `pdb.set_trace()` = breakpoint **in the file**; normal `python debug.py`.
