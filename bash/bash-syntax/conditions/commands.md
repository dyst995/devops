# Commands to memorize

```bash
test EXPRESSION
[ EXPRESSION ]                 # synonym for test (builtin)

test -f file.txt && echo "File exists"
[ -f file.txt ] && echo Indeed
[ -f file1.txt ] || echo No such file

ifup eth0
[ $? -ne 0 ] && rc=1           # last command failed → set rc

# test expressions
# ( EXPRESSION )   true (grouping)
# ! EXPRESSION     false / negate
# EXPR1 -a EXPR2   AND
# EXPR1 -o EXPR2   OR
# -n STRING        length nonzero
# -z STRING        length zero
# -d FILE          exists, directory
# -f FILE          exists, regular file
# -w FILE          exists, writable

[[ $a -lt $b ]]                # keyword; && || < > legal inside
if [[ -n $string_with_spaces ]]; then echo "The string is non-empty"; fi
# [ -n $string_with_spaces ]  →  [: too many arguments   (word split)

(( 0 && 1 )); echo $?          # 1  (value 0 → status 1)
var=-2 && (( var+=2 )); echo $?  # 1
# let …   same idea;  man bash  →  ARITHMETIC EVALUATION

if [ condition1 ]; then
  command1
elif [ condition2 ]; then
  command4
else
  default-command
fi

case EXPRESSION in
  case1) command1; command2 ;;
  case2) command3 ;;
  *)     default ;;
esac

command-1 && command-2 && command-3   # AND list: stop at first failure
command-1 || command-2 || command-3   # OR list:  stop at first success
```
