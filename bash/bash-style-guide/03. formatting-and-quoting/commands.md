# Commands to memorize

```bash
# indent 2 spaces, no tabs; max 80 columns

cat <<END
I am an exceptionally long
string.
END

long_string="I am an exceptionally
long string."

command1 | command2

command1 \
  | command2 \
  | command3 \
  | command4

for dir in "${dirs_to_cleanup[@]}"; do
  if [[ -d "${dir}/${ORACLE_SID}" ]]; then
    …
  else
    …
  fi
done

case "${expression}" in
  a)
    variable="…"
    some_command "${variable}" …
    ;;
  *)
    error "Unexpected expression '${expression}'"
    ;;
esac

# one-liner: space after ) and before ;;
a) aflag='true' ;;

echo "Positional: $1" "$5" "$3"
echo "many parameters: ${10}"
set -- a b c
echo "${1}0${2}0${3}0"          # a0b0c0  — not $10
echo "PATH=${PATH}"

flag="$(some_command "$@" 'quoted separately')"
echo "${flag}"
mybinary "${FLAGS[@]}"
value=32
number="$(generate_number)"

# "$@" keep args   "$*" one joined word
```
