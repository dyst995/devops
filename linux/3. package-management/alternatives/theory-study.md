# alternatives (study)

Several packages can provide the **same command** (many Javas, Pythons, …). **`alternatives`** maintains the **symbolic links** that pick which implementation `/usr/bin/java` (or similar) points at. You do not delete the other versions; you switch the **generic name** to a different real path.

On Debian/Ubuntu the same idea is **`update-alternatives`**. This course uses the Red Hat command **`alternatives`**.

```text
alternatives [options] --install link name path priority [--slave link name path]... [--initscript service]
alternatives [options] --remove name path
alternatives [options] --set name path
alternatives [options] --auto name
alternatives [options] --display name
alternatives [options] --config name
```

| Part | Meaning |
| --- | --- |
| `link` | Public symlink users run, e.g. `/usr/bin/java` |
| `name` | Group name, e.g. `java` |
| `path` | Real binary, e.g. `/usr/java/latest/bin/java` |
| `priority` | Integer. In **auto** mode, the **highest** wins |
| `--slave` | Extra symlinks that must switch **with** the master (man page, `javac`, …) |

| Action | What it does |
| --- | --- |
| `--install` | Register a new path in the group |
| `--remove` | Unregister that path |
| `--set` | Pin the group to a **specific** path (**manual** mode) |
| `--auto` | Let **priority** choose (automatic mode) |
| `--display` | Status, paths, priorities |
| `--config` | **Interactive** menu — type a number |

```bash
alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5
alternatives --config java
java -version
```

In the `--config` menu: **`*`** = current selection, **`+`** = auto-mode winner (highest priority). Enter keeps the current (`[+]`). After a switch, `java -version` must match the path you picked — `java` on `PATH` is the symlink, not a second copy of the JVM.
