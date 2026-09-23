# Commands to memorize

```bash
# comment to end of line

echo a; echo b              # ;  two commands, one line

case "$x" in
  yes) echo ok ;;           # ;; ends this option
esac

. ./lib.sh                  # dot command = source (this shell)
./script.sh                 # ./  current-dir filename

echo "$HOME"                # ""  partial: $ still expands
echo '$HOME'                # ''  full: literal $HOME
echo \$HOME                 # \   next char literal

let "t2 = ((a = 9, 15 / 3))"  # ,  all run; value is last (t2=5, a=9)

echo `date`                 # backticks: output of date
:                           # null command, status 0
echo $?                     # $   value of a parameter
```
