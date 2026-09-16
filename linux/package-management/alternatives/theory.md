# alternatives

Several packages can provide the **same command** — many versions of Java, Python, Ruby, Node.js, and so on. **`alternatives`** creates, removes, maintains, and displays the **symbolic links** that pick **which** implementation `/usr/bin/java` (or similar) actually points at.

You do not delete the other versions. You switch the **generic name** to a different real path.

**Memory hook:** `alternatives` = a managed symlink farm. One public name (`java`), many real binaries, one “current” choice.

On Debian/Ubuntu the same idea is **`update-alternatives`**. This course uses the Red Hat command **`alternatives`**.

## Synopsis

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
| `name` | Group name for this alternative, e.g. `java` |
| `path` | Real binary, e.g. `/usr/java/latest/bin/java` |
| `priority` | Integer. In **auto** mode, the **highest** priority wins |
| `--slave` | Extra symlinks that must switch **with** the master (man page, `javac`, …) |

| Action | What it does |
| --- | --- |
| `--install` | Register a new path in the group |
| `--remove` | Unregister that path |
| `--set` | Pin the group to a **specific** path (manual mode) |
| `--auto` | Let **priority** choose (automatic mode) |
| `--display` | Show status, paths, priorities |
| `--config` | **Interactive** menu to pick a number |

**Memory hook:** `--install` to add, `--config` to pick by menu, `--set` to pick by path, `--auto` to follow priority, `--display` to inspect, `--remove` to drop.

## Example: switch Java

Register `/usr/java/latest/bin/java` as provider of `java` with priority **5**, public link `/usr/bin/java`:

```bash
alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5
```

Then choose interactively:

```text
# alternatives --config java
There are 5 programs which provide 'java'.
 Selection Command
-----------------------------------------------
   1           /usr/lib/jvm/jre-1.4.2-gcj/bin/java
   2           /usr/java/jre1.6.0_13/bin/java
   3           /usr/java/jre1.6.0_18/bin/java
*+ 4           /usr/lib/jvm/jre-1.6.0-openjdk.x86_64/bin/java
   5           /usr/java/latest/bin/java
Enter to keep the current selection[+], or type selection number: 5
```

Markers in that menu:

- **`*`** — current selection
- **`+`** — the one that would be chosen in **auto** mode (highest priority)

Press **Enter** to keep the current (`[+]`). Type **`5`** to switch to `/usr/java/latest/bin/java`.

Verify:

```text
# java -version
java version "1.6.0_26"
```

`java` on your `PATH` is now the symlink target you selected — not a second copy of the JVM.

**Memory hook:** `--config java` → type a number → `java -version` must match that path. Enter = keep `*`.
