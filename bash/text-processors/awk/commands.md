# Commands to memorize

```bash
awk [options] 'program' file1 file2 …     # program on the command line
awk [options] -f program.awk file1 …      # program from a file
awk 'program'                             # no file → read stdin

awk -F: 'program' /etc/passwd             # field separator is :

# Rule shape
# pattern { action }

awk '$1 == "li" { print $0 }' file        # expression pattern
awk '/foo|bar|baz/ { print }' file        # regex pattern
awk '{ print $1 }' file                   # no pattern → every line

awk '
  BEGIN { action }                        # once, before any input
  /pattern/ { action }                    # per matching line
  END   { action }                        # once, after all input
' file

# Built-in variables
# $0          entire line
# $1 $2 $3 …  fields
# NR          record number (usually line number so far)
# NF          number of fields on this record
# FS          input field separator (default: whitespace); also -F
# RS          input record separator (default: newline)
# OFS         output field separator (default: space) — between print args
# ORS         output record separator (default: newline) — after print

awk '{ print NR, NF, $0 }' file           # line number, field count, whole line
awk 'BEGIN { FS=":" } { print $1 }' file  # set FS in BEGIN (like -F:)
awk 'BEGIN { OFS=":" } { print $1, $2 }' file   # colon between printed fields
awk 'BEGIN { ORS="|" } { print $1 }' file       # | instead of newline after print

# Examples on employee.txt (name role dept salary)
awk '{print}' employee.txt                # every line (default)
awk '/manager/ {print}' employee.txt      # lines matching manager
awk '{print $1,$4}' employee.txt          # name and salary
awk '{print NR,$0}' employee.txt          # line number + whole line
awk '{print $1,$NF}' employee.txt         # name and last field (salary)
```
