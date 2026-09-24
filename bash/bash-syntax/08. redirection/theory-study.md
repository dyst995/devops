# Redirection (study)

Three default files are always open. Each open file has a **file descriptor**.

| Stream | Usual | fd |
| --- | --- | --- |
| stdin | keyboard | **0** (`&0`) |
| stdout | screen | **1** (`&1`) |
| stderr | errors on the screen | **2** (`&2`) |

**Redirect** = capture output from a file, command, program, script, or code block and **send it as input** to another.

Descriptors **3–9** are extras. Assign one as a **temporary duplicate** of 0/1/2 so you can **restore** after complex redirection.

## Input / output / append

| Form | Meaning |
| --- | --- |
| `<filename` | open for **reading** on fd **0** (or `n<` for fd n). Same idea as `cat filename \| grep …` |
| `>filename` | open for **writing** on fd **1** (or `n>`). Missing → **create**. Exists → **truncate to zero** |
| `>>filename` | **append** on fd **1** (or `n>>`). Missing → **create** |

```bash
grep search-word <filename
ls -la > list_of_files.txt
: > filename                 # null command; truncate to zero length
> filename                   # same in Bash; some other shells reject it
echo one > file              # one
echo two >> file             # one then two
```

`:` is the null command (special characters). `: > file` empties the file.

## stdout and stderr together

Preferred: **`&>filename`**. Other form: `>&filename`. Same as `>filename 2>&1`.

`2>&1` = send fd **2** wherever fd **1** currently goes.

`java -version` writes its banner on **stderr**:

- `> version` — stdout only; banner still on **screen**; `version` **empty**
- `&> version` — **both** in the file
- `2> version` — **stderr** in the file (here, the whole banner)

```bash
ps aux &> /dev/null          # throw everything away
```

`2>` = errors only.

## Pipe

Stdout of one command becomes **stdin** of the next. More general than `>` (chains **processes**, not only a file).

```bash
cat *.txt | sort | uniq > result-file
echo ${PIPESTATUS[@]}        # 0 0 0  — array: status of each stage
cat *.txt | tee -a result-file   # screen and append to file
```

`$PIPESTATUS` is an **array**. `|` = next command’s stdin. `>` = a file. `tee -a` = screen **and** append.

## Here document / here string

**Here document:** read until a line that is **only** the delimiter (**no trailing blanks**). Those lines become stdin. The delimiter line is **not** stored.

```bash
cat <<EOF > unit.file
[Unit]
Description=Raise network interfaces
…
EOF
```

**Here string:** stripped-down form. `command <<< $word` — `$word` is **expanded** and fed as stdin.

```bash
# instead of:  if echo "$VAR" | grep -q txt; then
if grep -q "txt" <<< "$VAR"; then
```

## Special names in redirections

| Filename | Meaning |
| --- | --- |
| `/dev/fd/<fd>` | duplicate that fd (if `fd` is a valid integer) |
| `/dev/stdin` | duplicate fd **0** |
| `/dev/stdout` | duplicate fd **1** |
| `/dev/stderr` | duplicate fd **2** |
| `/dev/tcp/host/port` | Bash opens a **TCP** socket |
| `/dev/udp/host/port` | Bash opens a **UDP** socket |

```bash
cat </dev/tcp/time.nist.gov/13
exec 5<>/dev/tcp/www.tut.by/80    # fd 5, read+write (spare 3–9)
echo -e "GET / HTTP/1.0\n" >&5
cat <&5
```

`n<>` = read and write on fd **n**.

## Redirecting a code block

```bash
while [ ... ]; do
  read name
  echo $name
  let "count += 1"
done < file
```

`done < file` = the **whole loop** reads from that file. Notes also show `cat file | …`.
