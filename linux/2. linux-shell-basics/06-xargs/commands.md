# Commands to memorize

```bash
cat names.txt | xargs                    # default command is echo — join lines into one
cat names.txt | xargs -i touch {}        # one touch per line; {} is the placeholder
cat names.txt | xargs -I {} touch {}     # modern spelling of -i
cat names.txt | xargs -iT touch T        # same, but placeholder is T instead of {}

find /tmp -name core -type f -print0 | xargs -0 rm     # -0: split on NUL, not spaces
cat urls.txt | xargs -P 4 -I {} curl -O {}             # up to 4 processes at a time
```
