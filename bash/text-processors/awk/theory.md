# Awk

**`awk`** searches input for lines (or other units of text) that match certain **patterns**. When a line matches, awk runs the **actions** you specified for that pattern. It keeps going until the end of the input.

**Memory hook:** pattern → action, line by line, until EOF.

## Fields

Awk breaks each input line into **fields**. By default a field is a run of characters separated by **whitespace**. Change the separator with **`-F`**.

Awk then works on each field separately. That makes it a good fit for **structured text** — tables and other data in consistent rows and columns.

**Memory hook:** line → fields (`$1`, `$2`, …). `-F` sets the delimiter.

## How you run it

You give awk an **awk program** that says what to do. If you do not name an input file, awk reads from **stdin** (typed input, or a pipe).

```bash
awk [options] 'program' input-file1 input-file2 …
awk [options] -f program-file input-file1 input-file2 …
```

| Form | Meaning |
| --- | --- |
| `'program'` | Program on the command line (usually in **single quotes**) |
| `-f program-file` | Program loaded from a file |
| input files | One or more files, in order; omit → **stdin** |

**Memory hook:** program in `'…'` or `-f file`. No file → stdin. Quotes stop the shell from eating `$` and other special characters.

## Rules: pattern and action

The program is a series of **rules**. Each rule has one **pattern** to look for and one **action** to run when it matches.

```text
pattern { action }
```

| Piece | Meaning |
| --- | --- |
| expression | e.g. `$1 == "li"` |
| `/search pattern/` | regular expression, e.g. `/foo\|bar\|baz/` |
| `{ action }` | statement(s) to run on a match |
| several rules | many pattern/action pairs in one program |

Single quotes around the program keep the shell from interpreting special characters inside it.

```bash
awk '
  expression or /search pattern1/ { action }
  expression or /search pattern2/ { action }
' input-file
```

**Memory hook:** `pattern { action }`. Many rules allowed. Quote the program for the shell.

## BEGIN and END

- **`BEGIN`** — runs **once**, **before** the first input record is read.
- **`END`** — runs **once**, **after** all input has been read.

```bash
awk '
  BEGIN { action }
  expression or /pattern/ { action }
  END   { action }
' input-file
```

**Memory hook:** `BEGIN` = setup before lines. `END` = summary after lines. Middle rules = per matching line.

## Built-in variables

Awk’s built-ins include the **field variables** and several counters / separators that control how records and fields are split and printed.

### Field variables

| Variable | Meaning |
| --- | --- |
| `$0` | The **entire** current line (record) |
| `$1`, `$2`, `$3`, … | Individual **fields** (words / pieces) of that line |

**Memory hook:** `$0` = whole line. `$n` = field n.

### Record and field counts

| Variable | Meaning |
| --- | --- |
| **`NR`** | Current count of **input records** read so far. Records are usually **lines**. Pattern/action runs once per record. |
| **`NF`** | Number of **fields** in the **current** input record. |

**Memory hook:** `NR` = which record (line) am I on? `NF` = how many fields on this line?

### Separators (input)

| Variable | Meaning | Default |
| --- | --- | --- |
| **`FS`** | **Field** separator — divides fields on the input line | whitespace (space and tab) |
| **`RS`** | **Record** separator — what ends an input record | newline (so one line = one record) |

Reassign `FS` (often in `BEGIN`) to change how fields are split. Same idea as `-F` on the command line.

**Memory hook:** `FS` = split fields. `RS` = split records. Change them when the file is not “words on lines.”

### Separators (output)

| Variable | Meaning | Default |
| --- | --- | --- |
| **`OFS`** | **Output** field separator — between values when `print` has several comma-separated arguments | one blank space |
| **`ORS`** | **Output** record separator — after whatever `print` prints | newline |

```bash
print a, b, c     # prints a OFS b OFS c ORS
```

**Memory hook:** `OFS` between printed fields. `ORS` at the end of each `print`.

## Examples (`employee.txt`)

Sample data (four whitespace fields: name, role, department, salary):

```text
ajay manager account 45000
sunil clerk account 25000
varun manager sales 50000
amit manager account 47000
tarun peon sales 15000
deepak clerk sales 23000
sunil peon sales 13000
satvik director purchase 80000
```

The course copy lives next to these notes: [`employee.txt`](employee.txt).

### Default behavior — print every line

No pattern means the action runs for **every** record. `{print}` (or `{print $0}`) prints the whole line.

```bash
awk '{print}' employee.txt
```

```text
ajay manager account 45000
sunil clerk account 25000
varun manager sales 50000
amit manager account 47000
tarun peon sales 15000
deepak clerk sales 23000
sunil peon sales 13000
satvik director purchase 80000
```

**Memory hook:** `{print}` with no pattern = dump the file, line by line.

### Print lines that match a pattern

A regex pattern selects lines. Here: lines that contain `manager`.

```bash
awk '/manager/ {print}' employee.txt
```

```text
ajay manager account 45000
varun manager sales 50000
amit manager account 47000
```

**Memory hook:** `/word/ {print}` = only matching lines.

### Splitting a line into fields

Whitespace splits the line into `$1`…`$4`. `$0` is still the whole line. Commas in `print` insert `OFS` (default: a space).

```bash
awk '{print $1,$4}' employee.txt
```

```text
ajay 45000
sunil 25000
varun 50000
amit 47000
tarun 15000
deepak 23000
sunil 13000
satvik 80000
```

**Memory hook:** `$1` = name, `$4` = salary on this table.

### `NR` — show the line number

`NR` is the current record count. Print it next to `$0`.

```bash
awk '{print NR,$0}' employee.txt
```

```text
1 ajay manager account 45000
2 sunil clerk account 25000
3 varun manager sales 50000
4 amit manager account 47000
5 tarun peon sales 15000
6 deepak clerk sales 23000
7 sunil peon sales 13000
8 satvik director purchase 80000
```

**Memory hook:** `NR` = “which line am I on?”

### `NF` / `$NF` — last field

`$NF` is the field whose number is `NF` — the **last** field on this line (salary here). Safer than hard-coding `$4` if the width can vary.

```bash
awk '{print $1,$NF}' employee.txt
```

```text
ajay 45000
sunil 25000
varun 50000
amit 47000
tarun 15000
deepak 23000
sunil 13000
satvik 80000
```

**Memory hook:** `$1` = first field. `$NF` = last field.
