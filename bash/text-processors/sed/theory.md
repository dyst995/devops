# Sed

**`sed`** (Stream EDitor) performs basic transformations on text read from a **file** or a **pipe**. The result goes to **standard output**. Sed does **not** change the original input unless you redirect (or use an in-place option later).

There is no output-file argument in the basic syntax — save results with shell redirection (`> output.txt`).

**Memory hook:** read stream → transform → print to stdout. Original file stays intact.

## Syntax

```bash
sed OPTIONS... [SCRIPT] [INPUTFILE...]
```

| Piece | Meaning |
| --- | --- |
| `OPTIONS` | e.g. `-n` (quiet) |
| `SCRIPT` | editing commands (often in single quotes) |
| `INPUTFILE` | one or more files; omit or use `-` → **stdin** |

**Memory hook:** `sed 'script' file`. No file / `-` = stdin. Quote the script for the shell.

## Find and replace (first example)

Sed is often used to **find and replace** on lines that match a pattern. The `s` command substitutes.

Replace the first `hello` on each line with `world`, write the result to a new file:

```bash
sed 's/hello/world/' input.txt > output.txt
```

`s/hello/world/` means: substitute (`s`) the pattern `hello` with `world` (first match per line by default).

**Memory hook:** `s/old/new/` = replace. Redirect to keep the result.

## Same job, three ways to feed input

These are equivalent:

```bash
sed 's/hello/world/' input.txt > output.txt
sed 's/hello/world/' < input.txt > output.txt
cat input.txt | sed 's/hello/world/' - > output.txt
```

| Form | Input comes from |
| --- | --- |
| `sed '…' input.txt` | named file |
| `sed '…' < input.txt` | stdin via redirection |
| `… \| sed '…' -` | pipe; `-` means “read stdin” |

**Memory hook:** file arg, `<` redirect, or pipe + `-` — all feed sed the same stream.

## Option: `-n` / `--quiet` / `--silent`

By default, sed prints the **pattern space** at the end of each cycle (so you see every line after edits).

`-n` (also `--quiet` / `--silent`) turns that **automatic printing off**. Sed then prints only when you ask — typically with the **`p`** (print) command.

**Memory hook:** default = print every line. `-n` = silent unless `p`.

## Script overview

A sed **program** is one or more sed **commands**. You pass them with:

| How | Meaning |
| --- | --- |
| `-e` / `--expression` | script text on the command line |
| `-f` / `--file` | script loaded from a file |
| first non-option argument | used as the script if you used **none** of `-e` / `-f` |

You can combine several `-e` and `-f` pieces; they form one program.

### Command shape: `[addr]X[options]`

| Piece | Meaning |
| --- | --- |
| `[addr]` | Optional **line address**. If present, command `X` runs only on matching lines. Can be a **line number**, a **regex**, or a **range**. |
| `X` | A single-letter sed command |
| `[options]` | Extra options some commands take |

**Memory hook:** address (optional) + letter command. No address → every line.

### Address examples with `d` (delete)

Delete lines **30 through 35** (numeric range):

```bash
sed '30,35d' input.txt > output.txt
```

Delete any line that matches the regex `/^foo/` (starts with `foo`):

```bash
sed '/^foo/d' input.txt > output.txt
```

**Memory hook:** `30,35d` = delete that range. `/^foo/d` = delete matching lines.

### Several commands in one script

Separate commands with **semicolons** (`;`) or **newlines**.

Delete lines matching `/^foo/`, then substitute `hello` → `world`:

```bash
sed '/^foo/d; s/hello/world/' input.txt > output.txt
```

**Note:** commands **`a`**, **`c`**, and **`i`** (append / change / insert) cannot use `;` as a separator because of their syntax. End them with a **newline**, or put them at the **end** of the script / script-file.

**Memory hook:** `;` or newline between commands. Exception: `a` / `c` / `i` need newlines.

## Addresses overview

**Addresses** decide **which line(s)** a sed command runs on.

| Address style | Effect |
| --- | --- |
| none | command runs on **all** lines |
| line number | only that line |
| `/regexp/` | lines whose content matches |
| range (e.g. `30,35`) | from start address through end address |
| `addr!` | **negate** — lines that do **not** match |

### Line number

Replace `hello` with `world` **only on line 144**:

```bash
sed '144s/hello/world/' input.txt > output.txt
```

### No address — every line

```bash
sed 's/hello/world/' input.txt > output.txt
```

### Regex address — match by content

Replace `hello` with `world` only on lines that contain `apple`:

```bash
sed '/apple/s/hello/world/' input.txt > output.txt
```

**Memory hook:** `Ns/…/…/` = line N. `/pat/s/…/…/` = lines matching pat. Bare `s/…/…/` = all lines.

### `/regexp/` vs other delimiters

**`/regexp/`** — select lines matching `regexp`. If the regexp itself contains `/`, escape each with `\`.

**`\%regexp%`** — same match, but `%` (or **any** other single character) is the delimiter. Useful when the pattern is full of slashes so you are not escaping every `/`. If the regexp contains the chosen delimiter, escape those too.

These three print the same idea (paths under `/home/alice/documents/`); `-n` + `p` prints only matches:

```bash
sed -n '/^\/home\/alice\/documents\//p'
sed -n '\%^/home/alice/documents/%p'
sed -n '\;^/home/alice/documents/;p'
```

**Memory hook:** lots of `/` in the pattern → pick another delimiter (`%`, `;`, …).

### Negate with `!`

Put **`!`** after the address (before the command letter) to invert the match: the command runs on lines that do **not** match.

Replace `hello` with `world` only on lines that do **not** contain `apple`:

```bash
sed '/apple/!s/hello/world/' input.txt > output.txt
```

**Memory hook:** `/apple/s/…/` = only apple lines. `/apple/!s/…/` = every line **except** apple lines.

## Common commands

| Command | Result |
| --- | --- |
| `a text` | Append text **below** the current line |
| `c text` | **Change** (replace) the current line with new text |
| `d` | **Delete** the line |
| `i text` | **Insert** text **above** the current line |
| `p` | **Print** the pattern space |
| `r filename` | **Read** a file (insert its contents) |
| `s/regexp/replacement/flags` | **Search and replace** |
| `w filename` | **Write** the pattern space to a file |
| `y/source-chars/dest-chars/` | **Transliterate** — each char in source maps to the matching dest char |

**Memory hook:** `a` after · `i` before · `c` replace line · `d` drop · `s` substitute · `y` translate chars.

### Append — `a`

Add `hello` **after** line 2:

```bash
seq 3 | sed '2a hello'
```

```text
1
2
hello
3
```

### Change — `c`

Replace lines **2 through 9** with a single `hello`:

```bash
seq 10 | sed '2,9c hello'
```

```text
1
hello
10
```

### Delete — `d`

Delete the second input line:

```bash
seq 3 | sed 2d
```

```text
1
3
```

### Insert — `i`

Insert `hello` **before** line 2:

```bash
seq 3 | sed '2i hello'
```

```text
1
hello
2
3
```

### Read file — `r`

After line 2, insert the contents of a file (example uses `/etc/hostname`):

```bash
seq 3 | sed '2r /etc/hostname'
```

```text
1
2
fencepost.gnu.org
3
```

(Your hostname string will differ.)

### Transliterate — `y`

Map each character in the first set to the matching character in the second set:

```bash
echo hello world | sed 'y/abcdefghij/0123456789/'
```

```text
74llo worl3
```

`h`→`7`, `e`→`4`, `d`→`3`; letters outside `a`–`j` stay as they are.

**Memory hook:** `y` is position-based (`a`↔`0`, `b`↔`1`, …), not a regex replace.

## The `s` command (substitute)

Most important sed command. Syntax:

```text
s/regexp/replacement/flags
```

Sed tries to match `regexp` against the pattern space. On success, the matched portion is replaced with `replacement`.

| In replacement | Meaning |
| --- | --- |
| `\1` … `\9` | nth parenthesized group from the match |
| `&` | the **entire** matched text |

### Common flags

| Flag | Meaning |
| --- | --- |
| `g` | replace **all** matches on the line, not only the first |
| `i` | case-insensitive match (**GNU** extension) |

In-place edit of a file (`-i` is a sed **option**, not the `s` flag):

```bash
sed -i 's/erors/errors/g' input.txt
```

**Memory hook:** `s/old/new/g` = every match on the line. `-i` on the command = edit the file in place (practice on a **copy**).

### Examples with address + `s`

Replace `bash` with `false` everywhere in a passwd-style file (destructive on a live system — use a copy when practicing):

```bash
sudo sed -i 's/bash/false/g' /etc/passwd
```

Set the login shell back to `bash` **only** for the `vagrant` user (regex address + `s`):

```bash
sudo sed -i '/vagrant/s/false/bash/g' /etc/passwd
```

**Memory hook:** `/vagrant/s/…/…/` = substitute only on the vagrant line(s).
