# Return values and builtins

Always **check return values** and give **informative** errors. Prefer a **builtin** over a separate process.

## Checking return values

For **unpiped** commands, use `$?` or check directly in `if` — keep it simple.

```bash
if ! mv "${file_list[@]}" "${dest_dir}/"; then
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi

# Or
mv "${file_list[@]}" "${dest_dir}/"
if (( $? != 0 )); then
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi
```

`if ! cmd` — fail → then-block. `(( $? != 0 ))` — same, after the command. Error text on **stderr**. `"${file_list[@]}"` = each path; `"${file_list[*]}"` = one string in the message.

**Pipes:** `PIPESTATUS` is an array — status of **each** stage. If you only care whether the **whole** pipe failed:

```bash
tar -cf - ./* | ( cd "${dir}" && tar -xf - )
if (( PIPESTATUS[0] != 0 || PIPESTATUS[1] != 0 )); then
  echo "Unable to tar files to ${dir}" >&2
fi
```

`PIPESTATUS` is **overwritten** by the next command. `[` is a command and **wipes** it. If you must act **differently** per stage, copy it **immediately**:

```bash
tar -cf - ./* | ( cd "${DIR}" && tar -xf - )
return_codes=( "${PIPESTATUS[@]}" )
if (( return_codes[0] != 0 )); then
  do_something
fi
if (( return_codes[1] != 0 )); then
  do_something_else
fi
```

**Memory hook:** `if ! cmd` or `(( $? != 0 ))`. Pipe → copy `"${PIPESTATUS[@]}"` before anything else (including `[`).

## Built-in commands vs external commands

Given the choice between a **shell builtin** and a **separate process**, choose the builtin.

Parameter expansion in `bash(1)` is more **robust** and **portable** than `sed` / `expr`.

```bash
# Prefer this:
addition=$(( X + Y ))
substitution="${string/#foo/bar}"

# Instead of this:
addition="$(expr "${X}" + "${Y}")"
substitution="$(echo "${string}" | sed -e 's/^foo/bar/')"
```

`$(( ))` = arithmetic. `${string/#foo/bar}` = replace **prefix** `foo` (variables topic). `expr` and `echo | sed` spawn processes and are easier to get wrong.

**Memory hook:** `$(( ))` not `expr`. `${var/#pat/rep}` not `sed`.
