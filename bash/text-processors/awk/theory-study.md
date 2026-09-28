# Awk (study)

**`awk`** walks input line by line. Each **rule** is `pattern { action }`. Match → run the action. Continue until EOF.

## Fields

Each line is split into fields (default: whitespace). `$1`, `$2`, … are the fields; `$0` is the whole line. `-F` changes the delimiter.

## Invocation

```bash
awk [options] 'program' file1 file2 …
awk [options] -f program-file file1 …
```

No input file → **stdin**. Put the program in **single quotes** so the shell does not expand `$` and friends.

## Patterns and actions

| Pattern | Example |
| --- | --- |
| expression | `$1 == "li"` |
| regex | `/foo\|bar\|baz/` |
| empty | `{ print $1 }` — every line |

Several rules can appear in one program.

## BEGIN / END

```bash
awk '
  BEGIN { … }    # once, before first record
  /pat/ { … }    # matching lines
  END   { … }    # once, after all input
' file
```

## Built-in variables

| Var | Job | Default |
| --- | --- | --- |
| `$0` | whole line | — |
| `$1`… | fields | — |
| `NR` | input record count so far | — |
| `NF` | fields on **this** record | — |
| `FS` | input field separator | whitespace |
| `RS` | input record separator | newline |
| `OFS` | between `print` args | space |
| `ORS` | after each `print` | newline |

Set `FS` / `OFS` / `ORS` / `RS` in `BEGIN` when you need non-default splitting or printing. `-F` sets `FS` from the command line.

## Quick examples (`employee.txt`)

```bash
awk '{print}' employee.txt             # every line
awk '/manager/ {print}' employee.txt   # match pattern
awk '{print $1,$4}' employee.txt       # fields 1 and 4
awk '{print NR,$0}' employee.txt       # line number + line
awk '{print $1,$NF}' employee.txt      # first + last field
```
