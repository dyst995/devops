# Commands to memorize

```bash
var=value
var2="one two three"
var3=one\ two\ three

echo $var
echo ${var}

var=value; value=hello
eval b=\$$var                 # indirect: $b is hello

declare -i n                  # typeset -i n  (synonyms)
n=6/3                         # n is 2 only after declare -i

echo ${#var}                  # length (array name: first element)
echo ${var:position:length}   # substring, 0-based

echo ${var#Pattern}           # shortest strip, front
echo ${var##Pattern}          # longest strip, front
echo ${var%Pattern}           # shortest strip, back
echo ${var%%Pattern}          # longest strip, back

echo ${var/Pattern/Replacement}    # first replace (omit Replacement = delete)
echo ${var//Pattern/Replacement}   # all replaces
echo ${var/#Pattern/Replacement}   # prefix only
echo ${var/%Pattern/Replacement}   # suffix only

echo ${parameter-default}     # unset → default
echo ${parameter:-default}    # unset or null → default
filename=${1:-$DEFAULT_FILENAME}

echo ${parameter=default}     # unset → assign default
echo ${parameter:=default}    # unset or null → assign default

echo ${parameter+alt_value}   # set (even empty) → alt
echo ${parameter:+alt_value}  # set and not empty → alt

: ${HOSTNAME?} ${USER?} ${MAIL?}   # unset → err_msg, abort, status 1
# ${parameter:?err_msg}  also treats null as missing

local var=$1                  # function only
export MYVAR=value            # current session (and children)
. ~/my_env_vars               # or: source ~/my_env_vars
env                           # list environment

# $0 script  $1 $2 …  ${10}  $# count  "$*" one word  "$@" separate words

echo $?   $$   $-   $_   $!   # status, PID, set flags, last arg, bg PID

my_array=( zero one two three four five )
my_array[6]=six
declare -a new_array
echo ${my_array[6]}
echo ${my_array[@]}           # all (also ${my_array[*]})
echo ${#my_array[@]}          # element count (also ${#my_array[*]})
```
