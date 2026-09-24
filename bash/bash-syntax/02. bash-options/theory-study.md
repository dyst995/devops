# Bash options (study)

**Options** change **shell and/or script behavior**.

`set` turns them on **from that point** in a script:

```bash
set -o verbose          # long name
set -v                  # short; same thing
set +o verbose          # off
set +v
```

**`-`** = option **on**. **`+`** = option **off** (opposite of “plus = more”). `set -o name` = `set -abbrev`.

`verbose` / `-v` prints each command **as the script reads it**. Useful while learning; noisy in production.

`errexit` / `-e`: `set -o errexit` is the same as `set -e`.

## `set -e` vs default

Default is **`+e`** (errexit **off**). A failed command still errors, but the script **continues**.

With **`set -e`**, the first failed command **ends the script**. Later lines do not run.

```bash
set -e
echo "Check non-existing file"
cat non-existing-file.txt
echo "moving on"          # not printed if cat fails
```

Without `set -e`, `moving on` **is** printed after the same `cat` error.

You can `set -e` for a sensitive block, then `set +e` to return to default for the rest of the file.
