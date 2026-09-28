# Sed (study)

**`sed`** = Stream EDitor. Transforms text from a file or pipe; writes to **stdout**. Does not edit the original file by itself — redirect to save.

```bash
sed OPTIONS... [SCRIPT] [INPUTFILE...]
```

No `INPUTFILE` (or `-`) → **stdin**.

## Substitute

```bash
sed 's/hello/world/' input.txt > output.txt
```

`s/old/new/` — replace (first match per line by default). Single-quote the script.

## Equivalent inputs

```bash
sed 's/hello/world/' input.txt > output.txt
sed 's/hello/world/' < input.txt > output.txt
cat input.txt | sed 's/hello/world/' - > output.txt
```

## `-n`

Default: print every line after the script runs on it.  
`-n` / `--quiet` / `--silent`: no automatic print — use **`p`** when you want output.

## Script shape

Program = one or more commands via `-e` / `-f`, or the first non-option argument.

```text
[addr]X[options]
```

- **addr** — optional: line number, `/regex/`, or range (`30,35`)
- **X** — one-letter command (`d` delete, `s` substitute, …)

```bash
sed '30,35d' input.txt > output.txt
sed '/^foo/d' input.txt > output.txt
sed '/^foo/d; s/hello/world/' input.txt > output.txt
```

Separate commands with `;` or newlines. **`a` / `c` / `i`**: no `;` separator — use newlines or place them last.

## Addresses

| Form | Runs on |
| --- | --- |
| (none) | every line |
| `144s/…/…/` | line 144 only |
| `/apple/s/…/…/` | lines matching `apple` |
| `/apple/!s/…/…/` | lines **not** matching `apple` |
| `30,35d` | line range |

Regex address: `/regexp/` — escape `/` inside the pattern, or use another delimiter: `\%regexp%`, `\;regexp;`.

```bash
sed -n '/^\/home\/alice\/documents\//p'
sed -n '\%^/home/alice/documents/%p'
```

## Common commands

| Cmd | Job |
| --- | --- |
| `a text` | append below |
| `i text` | insert above |
| `c text` | replace line(s) |
| `d` | delete |
| `p` | print |
| `r file` | read file in |
| `w file` | write out |
| `s/re/rep/flags` | substitute (`g` all, `i` ignore case) |
| `y/src/dst/` | transliterate chars |

```bash
seq 3 | sed '2a hello'
seq 10 | sed '2,9c hello'
seq 3 | sed 2d
seq 3 | sed '2i hello'
echo hello world | sed 'y/abcdefghij/0123456789/'
sed -i 's/erors/errors/g' copy.txt          # -i = edit file; use a copy
```
