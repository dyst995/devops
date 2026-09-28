# Commands to memorize

```bash
sed OPTIONS... [SCRIPT] [INPUTFILE...]

sed 's/hello/world/' input.txt > output.txt     # substitute; save via redirect
sed 's/hello/world/' < input.txt > output.txt   # same; stdin from file
cat input.txt | sed 's/hello/world/' - > output.txt   # same; pipe + -

# -n / --quiet / --silent
#   default: print pattern space each cycle
#   with -n: print only when script says p
sed -n 'p' file                                 # explicit print (with -n)

# Script: [addr]X[options]
#   addr = line number | /regex/ | range (e.g. 30,35)
#   X    = one-letter command
sed '30,35d' input.txt > output.txt             # delete lines 30–35
sed '/^foo/d' input.txt > output.txt            # delete lines matching /^foo/
sed '/^foo/d; s/hello/world/' input.txt > output.txt   # two commands (; or newline)
# a / c / i cannot use ; as separator — use newlines or put them last

# -e / --expression  ·  -f / --file  ·  or first non-option arg as script
sed -e 's/hello/world/' input.txt
sed -f script.sed input.txt

# Addresses
sed '144s/hello/world/' input.txt > output.txt      # only line 144
sed 's/hello/world/' input.txt > output.txt         # all lines (no address)
sed '/apple/s/hello/world/' input.txt > output.txt  # lines matching /apple/
sed '/apple/!s/hello/world/' input.txt > output.txt # lines NOT matching /apple/

# Regex address delimiters (same path idea; -n + p = print matches only)
sed -n '/^\/home\/alice\/documents\//p'
sed -n '\%^/home/alice/documents/%p'
sed -n '\;^/home/alice/documents/;p'

# Common commands (with seq demos)
seq 3 | sed '2a hello'                      # append after line 2
seq 10 | sed '2,9c hello'                   # change lines 2–9 to hello
seq 3 | sed 2d                              # delete line 2
seq 3 | sed '2i hello'                      # insert before line 2
seq 3 | sed '2r /etc/hostname'              # read file after line 2
echo hello world | sed 'y/abcdefghij/0123456789/'   # transliterate

# s/regexp/replacement/flags
#   g = all matches on the line · i = case-insensitive (GNU)
#   \1..\9 and & in replacement
sed -i 's/erors/errors/g' input.txt         # in-place; practice on a copy
# sudo sed -i 's/bash/false/g' /etc/passwd              # all bash → false (dangerous live)
# sudo sed -i '/vagrant/s/false/bash/g' /etc/passwd     # only vagrant line
```
