# Commands to memorize

```bash
# fds: stdin 0  stdout 1  stderr 2    extras 3–9    &0 &1 &2

grep search-word <filename          # input; same idea as: cat filename | grep search-word

ls -la > list_of_files.txt          # stdout → file (create or truncate)
: > filename                        # truncate to zero length
> filename                          # same, not in every shell

echo one > file
echo two >> file                    # append (create if missing)

&>filename                          # stdout + stderr (preferred)
>&filename                          # other form
>filename 2>&1                      # equivalent

java -version > version             # stderr still on screen; file empty
java -version &> version            # both in file
java -version 2> version            # stderr in file
ps aux &> /dev/null                 # suppress all output

cat *.txt | sort | uniq > result-file
echo ${PIPESTATUS[@]}               # 0 0 0  (array of each stage)
cat *.txt | tee -a result-file      # screen and append to file

cat <<EOF > unit.file
…lines…
EOF                                 # delimiter alone, no trailing blanks

grep -q "txt" <<< "$VAR"            # here string (instead of echo "$VAR" | grep -q txt)

# special names in redirections:
# /dev/fd/<fd>  /dev/stdin  /dev/stdout  /dev/stderr
# /dev/tcp/host/port  /dev/udp/host/port
cat </dev/tcp/time.nist.gov/13
exec 5<>/dev/tcp/www.tut.by/80
echo -e "GET / HTTP/1.0\n" >&5
cat <&5

while [ ... ]; do
  read name
  echo $name
  let "count += 1"
done < file
# cat file | ...
```
