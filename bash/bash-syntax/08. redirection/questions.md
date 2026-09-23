# Redirection — Questions

Cover the Answers section. Answer first, then check.

1. Three default files (what they are)? What is redirection (course sentence)?
2. Fds for stdin / stdout / stderr? Written as `&…`? Extra descriptors? Why duplicate 0/1/2 onto one of them?
3. Input redirect: what is opened, for what, on which fd if `n` omitted? `grep search-word <filename` vs `cat | grep`?
4. Output `>`: create vs existing file? `ls -la > list_of_files.txt`? `: > filename` vs `> filename`?
5. `>>`: append on which fd by default? `echo one > file` then `echo two >> file` — `cat file`?
6. Two formats for stdout **and** stderr? Which is preferred? Equivalent form with `2>&1`?
7. `java -version > version` vs `&>` vs `2>` — screen vs `cat version`? Why?
8. Suppress all output of `ps aux`?
9. Pipe vs `>`? The `cat *.txt | sort | uniq > result-file` pipeline does what?
10. `$PIPESTATUS` — type? `${PIPESTATUS[@]}` after that pipeline?
11. Print **and** write (append) at once?
12. Here document: when does input stop (delimiter rules)? Is the delimiter stored in `unit.file`?
13. Here string vs here document? `<<<` vs `echo "$VAR" | grep -q txt`?
14. Recite `/dev/fd/<fd>` `/dev/stdin` `/dev/stdout` `/dev/stderr` `/dev/tcp/host/port` `/dev/udp/host/port`.
15. `exec 5<>/dev/tcp/www.tut.by/80` then `echo … >&5` then `cat <&5` — what is fd 5?
16. `done < file` on a `while read` loop vs `cat file | …`?

---

## Answers

1. stdin keyboard · stdout screen · stderr errors to the screen. Capturing output from a file/command/program/script/code block and sending it as input to another.
2. 0 1 2 · `&0` `&1` `&2` · 3–9 · temporary duplicate so you can restore after complex redirection.
3. Filename opened for reading on n, or fd 0. Same idea as `cat filename | grep search-word`.
4. Created if missing; truncated to zero if it exists. stdout of `ls -la` into that file (overwrite). Both truncate; bare `>` fails in some shells.
5. n, or fd 1. `one` then `one` / `two`.
6. `&>filename` and `>&filename`. First preferred. `>filename 2>&1`.
7. `>` still prints banner (stderr), file empty. `&>` and `2>` put the banner in `version`. `java -version` uses stderr.
8. `ps aux &> /dev/null`
9. Pipe chains processes (more general). Concatenate txt files, sort, drop duplicate lines, save to `result-file`.
10. Array. `0 0 0`
11. `cat *.txt | tee -a result-file`
12. Line containing **only** the delimiter, **no trailing blanks**. No — closer is not part of the document.
13. Stripped-down here document: `command <<< $word` (expanded → stdin). Replaces `echo | grep`.
14. Duplicate fd · duplicate 0 · 1 · 2 · open TCP socket · open UDP socket (valid host + port/service).
15. TCP connection, read+write, extra descriptor 5. Write GET there; read HTTP response.
16. Whole loop’s stdin is `file`. Pipe is the chaining form of feeding the file.
