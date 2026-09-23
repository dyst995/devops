# Commands to memorize

```bash
function_name () {
  command...
}

function_name $arg1 $arg2     # inside: $1 $2 …

print_args () {
  local var1=$1
  local var2=$2
  echo "first function argument is:" $var1
  echo "second function argument is:" $var2
}
print_args /tmp hello

# exit status: return N   or last command;  script reads $?

retfunc() {
  echo "this is retfunc()"
  return 1                  # ends the function; script continues; $? is 1
}

exitfunc() {
  echo "this is exitfunc()"
  exit 1                    # ends the whole script
}
```
