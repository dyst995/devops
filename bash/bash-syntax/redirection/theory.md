# Redirection

There are always **three default files** open:

- **stdin** (the keyboard)
- **stdout** (the screen)
- **stderr** (error messages output to the screen)

These, and any other open files, can be **redirected**. Redirection simply means **capturing output** from a file, command, program, script, or even code block within a script and **sending it as input** to another file, command, program, or script.

Each open file gets assigned a **file descriptor**. The file descriptors for stdin, stdout, and stderr are **0**, **1**, and **2**, respectively, i.e. **`&0`**, **`&1`**, **`&2`**.

For opening additional files, there remain descriptors **3 to 9**. It is sometimes useful to assign one of these additional file descriptors to stdin, stdout, or stderr as a **temporary duplicate link**.

This simplifies **restoration to normal** after complex redirection.

**Memory hook:** 0 keyboard, 1 screen, 2 errors. Redirect = capture here, send there. Extra fds **3–9** = spare copies so you can put 0/1/2 back.

## Redirecting input

Redirection of input causes the file whose name results from the expansion of **filename** to be opened for **reading** on file descriptor **n**, or the **standard input (file descriptor 0)** if **n** is not specified.

```bash
$ grep search-word <filename # cat filename | grep search-word
```

`<filename` feeds the file to `grep` on stdin. Same idea as `cat filename | grep search-word`.

**Memory hook:** `<` = read **from** this file (fd **0** unless you write `n<`).

## Redirecting output

Redirection of output causes the file whose name results from the expansion of **filename** to be opened for **writing** on file descriptor **n**, or the **standard output (file descriptor 1)** if **n** is not specified.

If the file does **not exist** it is **created**; if it **does exist** it is **truncated to zero size**.

```bash
$ ls -la > list_of_files.txt # redirect stdout to a file. Creates the file if not present, otherwise overwrites it.

$ : > filename # truncates file "filename" to zero length

$ > filename # same as above but doesn't work in some shells
```

`:` is the **null command** (special characters). `: > filename` opens the file for write and truncates it. Bare `> filename` is the same in Bash; other shells may reject it.

**Memory hook:** `>` = write stdout (fd **1**). Missing file → create. Existing file → **wipe**. `: > file` = empty the file.

## Appending redirected output

Redirection of output in this fashion causes the file whose name results from the expansion of **filename** to be opened for **appending** on file descriptor **n**, or the **standard output (file descriptor 1)** if **n** is not specified. If the file does **not exist** it is **created**.

```bash
$ echo one > file
$ cat file
one
$ echo two >> file
$ cat file
one
two
```

**Memory hook:** `>` replace. `>>` **add to the end**. First `>` made `one`; `>>` kept `one` and added `two`.

## Redirecting standard output and standard error

This construct allows both the **standard output (file descriptor 1)** and the **standard error output (file descriptor 2)** to be redirected to the file whose name is the expansion of **filename**.

There are **two formats** for redirecting standard output and standard error:

```bash
&>filename
# and
>&filename
```

Of the two forms, the **first is preferred**. This is semantically equivalent to:

```bash
>filename 2>&1
```

`2>&1` = send fd **2** to wherever fd **1** currently goes.

Examples:

```bash
$ java -version > version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu1~18.04.1-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
$ cat version


$ java -version &> version
$ cat version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu1~18.04.1-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
$ java -version 2> version
$ cat version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu1~18.04.1-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
```

`java -version` writes that banner on **stderr**. `> version` only redirects **stdout** — the banner still hits the **screen**, `version` is **empty**. `&> version` captures **both**; `2> version` captures **stderr** (here, the whole banner).

Suppressing all command's output:

```bash
$ ps aux &> /dev/null
```

**Memory hook:** `&> file` preferred (same as `>file 2>&1`). `>& file` is the other form. `2>` = errors only. `&> /dev/null` = throw everything away.

## Pipe

General purpose **process and command chaining** tool. Similar to `>`, but **more general** in effect. Useful for chaining commands, scripts, files, and programs together.

```bash
$ # sorts output of all the .txt files and deletes duplicate lines,
$ # finally saves results to "result-file".
$ cat *.txt | sort | uniq > result-file
```

Stdout of `cat` becomes stdin of `sort`, then `uniq`, then `>` writes the file.

**Memory hook:** `|` = next command’s **stdin**. `>` = a **file**. Pipe chains **processes**.

Exit code of each command in a pipe are stored in variable **`$PIPESTATUS`**. It's an **array**, so to get exit codes of all commands in a pipe:

```bash
$ cat *.txt | sort | uniq > result-file
$ echo ${PIPESTATUS[@]}
0 0 0
```

Three commands → three statuses (here all success).

Sometimes it's necessary to **print to stdout and write output to a file**:

```bash
$ cat *.txt | tee -a result-file
```

`tee -a` **appends** to `result-file` **and** still shows the text on the screen.

**Memory hook:** `${PIPESTATUS[@]}` = status of **each** stage. `tee -a` = screen **and** append to file.

## Here documents

This type of redirection instructs the shell to read input from the current source until a line containing **only delimiter** (with **no trailing blanks**) is seen. All of the lines read up to that point are then used as the **standard input** for a command.

```bash
$ cat <<EOF > unit.file
[Unit]
Description=Raise network interfaces
Documentation=man:interfaces(5)

[Install]
WantedBy=multi-user.target
WantedBy=network-online.target
[Service]
Type=oneshot
EnvironmentFile=-/etc/default/networking
EOF
$ cat unit.file
[Unit]
Description=Raise network interfaces
Documentation=man:interfaces(5)

[Install]
WantedBy=multi-user.target
WantedBy=network-online.target
[Service]
Type=oneshot
EnvironmentFile=-/etc/default/networking
```

The closer is a line that is **only** `EOF` (no spaces after it). That line is **not** stored in `unit.file`; `cat unit.file` shows the unit text.

**Memory hook:** `<<EOF` … `EOF` = stdin is these lines. Delimiter alone on a line, no trailing blanks.

## Here string

A here string can be considered as a **stripped-down form of a here document**. It consists of nothing more than **`command <<< $word`**, where `$word` is **expanded** and fed to the **stdin** of `command`.

Instead of:

```bash
if echo "$VAR" | grep -q txt; then
  …;
fi
```

You can use:

```bash
if grep -q "txt" <<< "$VAR" ; then
```

**Memory hook:** `<<<` = this **word** is stdin. No pipe, no `echo`.

## Special filenames

Bash handles several filenames specially when they are used in **redirections**, as described in the following table.

| Filename | Meaning |
| --- | --- |
| `/dev/fd/<fd>` | If `fd` is a valid integer, file descriptor `fd` is **duplicated**. |
| `/dev/stdin` | File descriptor **0** is duplicated. |
| `/dev/stdout` | File descriptor **1** is duplicated. |
| `/dev/stderr` | File descriptor **2** is duplicated. |
| `/dev/tcp/host/port` | If `host` is a valid hostname or Internet address, and `port` is an integer port number or service name, bash attempts to open a **TCP** connection to the corresponding socket. |
| `/dev/udp/host/port` | If `host` is a valid hostname or Internet address, and `port` is an integer port number or service name, bash attempts to open a **UDP** connection to the corresponding socket. |

```bash
$ cat </dev/tcp/time.nist.gov/13
58731 19-09-05 14:30:23 50 0 0 366.6 UTC(NIST) *
```

```bash
$ # open file "/dev/tcp/www.tut.by/80" for reading and writing
$ # and assign file descriptor "5" to it.
$ exec 5<>/dev/tcp/www.tut.by/80

$ echo -e "GET / HTTP/1.0\n" >&5

$ cat <&5
HTTP/1.1 301 Moved Permanently
Server: nginx
Date: Thu, 05 Sep 2019 14:48:22 GMT
Content-Type: text/html
Content-Length: 178
...
```

`exec 5<>` opens fd **5** for **read and write** on that TCP socket (spare descriptor **3–9**). `>&5` writes the GET to fd 5. `<&5` reads the response.

**Memory hook:** `/dev/stdin` `/dev/stdout` `/dev/stderr` = fds 0 1 2. `/dev/tcp/host/port` and `/dev/udp/host/port` = Bash sockets. `n<>` = read+write on fd **n**.

## Redirecting code blocks

```bash
while [ ... ]; do
  read name
  echo $name
  let "count += 1"
done < file

cat file | ...
```

The `while` loop’s stdin is **`file`** (`done < file`). Each `read name` takes the next line. `cat file | …` is the pipe form of feeding a file into a command list.

**Memory hook:** `done < file` = the **whole loop** reads from that file. Same idea as `cat file | while …` but the notes show both.
