# Commands to memorize

```bash
alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5
# register a real binary: public link, group name, path, priority (higher wins in --auto)

alternatives --config java       # interactive menu; * current, + auto winner; type a number
alternatives --set java /usr/java/latest/bin/java    # pin this path (manual mode)
alternatives --auto java         # let highest priority win
alternatives --display java      # show paths, priorities, current choice
alternatives --remove java /usr/java/latest/bin/java # unregister that path
java -version                    # confirm which JVM /usr/bin/java now is
```
