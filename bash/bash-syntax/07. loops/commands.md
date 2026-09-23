# Commands to memorize

```bash
for arg in [list]; do
    command(s)...
done

for file in "$( find . -type l )"; do
    echo "$file"
done | sort

while [ condition ]; do
  command(s)...
done

LIMIT=10
while [ "$a" -le $LIMIT ] ; do
  echo -n "$a "
  let "a+=1"
done

until [ condition-is-true ] ; do
    command(s)…
done

break       # terminate the loop (break out)
continue    # next iteration; skip rest of this cycle

for i in {1..5}; do
  echo $i
  [[ $i -eq 3 ]] && break
done
# prints 1 2 3
```
