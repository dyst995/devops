# Comments

Four kinds: **file header**, **function**, **implementation**, **TODO**. Someone else should learn the program (or a library function) from the comments and `--help`, **without reading the code**.

## File header

Start each file with a description of its contents.

Every file must have a **top-level comment** including a brief overview. A copyright notice and author information are **optional**.

```bash
#!/bin/bash
#
# Perform hot backups of Oracle databases.
```

Sha-bang is line 1. The `#` block right under it is the overview — not a second sha-bang.

**Memory hook:** `#!` then `# what this file does`.

## Function comments

Any function that is **not both obvious and short** must be commented. Any function in a **library** must be commented **regardless of length or complexity**.

Describe the intended **API** using:

| Field | Meaning |
| --- | --- |
| Description | what the function does |
| **Globals** | global variables **used and modified** |
| **Arguments** | arguments taken |
| **Outputs** | what goes to **STDOUT** or **STDERR** |
| **Returns** | values other than the default exit status of the last command |

Omit a field only when it does not apply (`Arguments: None`). The `#` banner (`#######################################`) is the course style.

```bash
#######################################
# Cleanup files from the backup directory.
# Globals:
#   BACKUP_DIR
#   ORACLE_SID
# Arguments:
#   None
#######################################
function cleanup() {
  …
}

#######################################
# Get configuration directory.
# Globals:
#   SOMEDIR
# Arguments:
#   None
# Outputs:
#   Writes location to stdout
#######################################
function get_dir() {
  echo "${SOMEDIR}"
}

#######################################
# Delete a file in a sophisticated manner.
# Arguments:
#   File to delete, a path.
# Returns:
#   0 if thing was deleted, non-zero on error.
#######################################
function del_thing() {
  rm "$1"
}
```

**Memory hook:** Description · Globals · Arguments · Outputs · Returns. Libraries: always comment.

## Implementation comments

Comment **tricky, non-obvious, interesting, or important** parts.

This is general Google comment practice. **Do not comment everything.** If there is a complex algorithm or something out of the ordinary, put a **short** comment in.

**Memory hook:** comment the surprising line, not `i=0`.

## TODO comments

Use `TODO` for code that is **temporary**, a **short-term** solution, or **good-enough but not perfect**.

Format: **`TODO`** in all caps, then the **name, e-mail, or other identifier** of the person with the **best context** about the problem. Purpose: a consistent string you can **search**. A TODO is **not** a commitment that that person will fix it. When you create one, it is almost always **your** name.

```bash
# TODO(mrmonkey): Handle the unlikely edge cases (bug ####)
```

**Memory hook:** `# TODO(you):` what is missing. Searchable. Not a promise.
