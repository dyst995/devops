# Bash options

**Options** are settings that change **shell and/or script behavior**.

The **`set`** command enables options **within a script**. At the point in the script where you want the options to take effect, use **`set -o option-name`** or, in short form, **`set -option-abbrev`**. These two forms are equivalent:

```bash
set -o verbose
set -v
```

To **disable** an option within a script, use **`set +o option-name`** or **`set +option-abbrev`**.

```bash
set +o verbose
set +v
```

**Memory hook:** **`-`** turns the option **on**. **`+`** turns it **off**. That is the opposite of “plus = more.” `set -o name` = `set -abbrev`.

`verbose` / `-v` prints each command as the script reads it (useful while learning; noisy in production).

The long name that matches **`-e`** (next examples) is **`errexit`**: `set -o errexit` is the same as `set -e`.

## Example 1 — exit on error

```bash
#!/bin/bash

# exit_on_error.sh
set -e

echo "Check non-existing file"
cat non-existing-file.txt
echo "moving on"
```

```text
$ ./exit_on_error.sh
Check non-existing file
cat: non-existing-file.txt: No such file or directory
```

`cat` fails (file missing). With **`-e`**, the script **stops**. **`moving on` is not printed.**

## Example 2 — default: keep going

```bash
#!/bin/bash

# skip_error.sh
# default value is +e

echo "Check non-existing file"
cat non-existing-file.txt
echo "moving on"
```

```text
$ ./skip_error.sh
Check non-existing file
cat: non-existing-file.txt: No such file or directory
moving on
```

Default is **`+e`** (errexit **off**). `cat` still errors, but the script **continues**. **`moving on` is printed.**

**Memory hook:** default Bash = keep going after a failed command. `set -e` = one failure ends the script. Compare the last line of the two outputs.

You can turn `-e` on, run a sensitive block, then `set +e` to return to default for the rest of the file.
