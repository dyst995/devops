# Args glued into one word

`script.sh 1 apple hello 4` should print four numbered lines as in the notes. A second run passes two filenames with spaces.

With one quoting form, the loop sees **separate** arguments. With the other, all positional parameters arrive as a **single** word.

**Goal:** Match the four-line sample. Then demonstrate `"$*"` as one word vs `"$@"` as separate words. `$0` is the script name; `${10}` is required if you ever pass a tenth argument.
