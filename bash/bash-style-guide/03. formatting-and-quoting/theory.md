# Formatting and quoting

Layout first, then how you expand and quote. For **existing** files, stay faithful to what is already there.

## Indentation

Indent **2 spaces**. **No tabs**.

Use blank lines between blocks. Whatever you do, don’t use tabs. Existing files: keep their indentation.

**Memory hook:** two spaces. Never tab. Don’t restyle an old file.

## Line length and long strings

Maximum line length is **80** characters.

Longer strings: a **here document** or an **embedded newline** if possible. A literal that cannot be split is ok; strongly preferred to make it shorter.

```bash
# DO use 'here document's
cat <<END
I am an exceptionally long
string.
END

# Embedded newlines are ok too
long_string="I am an exceptionally
long string."
```

**Memory hook:** 80 cols. Split with `<<END` or a real newline inside `"…"`.

## Pipelines

If the pipeline **fits on one line**, keep it on one line.

If not: **one pipe segment per line**, pipe on the **newline**, **2-space** indent for the next piece. Same for `|` and for `||` / `&&`.

```bash
# All fits on one line
command1 | command2

# Long commands
command1 \
  | command2 \
  | command3 \
  | command4
```

**Memory hook:** short = one line. Long = `\` then `  | next`.

## Loops

Put `; do` and `; then` on the **same line** as `while` / `for` / `if`.

`else` on its **own** line. `fi` / `done` on their own line, **aligned** with the opener. Inside a function, consider `local` for the loop variable so it does not leak.

```bash
# If inside a function, consider declaring the loop variable as
# a local to avoid it leaking into the global environment:
# local dir
for dir in "${dirs_to_cleanup[@]}"; do
  if [[ -d "${dir}/${ORACLE_SID}" ]]; then
    log_date "Cleaning up old files in ${dir}/${ORACLE_SID}"
    rm "${dir}/${ORACLE_SID}/"*
    if (( $? != 0 )); then
      error_message
    fi
  else
    mkdir -p "${dir}/${ORACLE_SID}"
    if (( $? != 0 )); then
      error_message
    fi
  fi
done
```

**Memory hook:** `if …; then` / `for …; do`. `else` / `fi` / `done` alone.

## Case statement

- Indent alternatives **2 spaces** from `case` / `esac`.
- One-line alternative: **space** after `)` and **space** before `;;`.
- Long / multi-command: **pattern**, **actions**, and `;;` on **separate** lines. Actions indented one more level.
- Do **not** quote match expressions in general. Do **not** put `(` before the pattern. Avoid `;&` and `;;&`.

```bash
case "${expression}" in
  a)
    variable="…"
    some_command "${variable}" "${other_expr}" …
    ;;
  absolute)
    actions="relative"
    another_command "${actions}" "${other_expr}" …
    ;;
  *)
    error "Unexpected expression '${expression}'"
    ;;
esac
```

Simple commands may sit on the same line as the pattern and `;;` if readable (single-letter `getopts`). When they don’t fit: pattern alone, then actions, then `;;` alone.

```bash
verbose='false'
aflag=''
bflag=''
files=''
while getopts 'abf:v' flag; do
  case "${flag}" in
    a) aflag='true' ;;
    b) bflag='true' ;;
    f) files="${OPTARG}" ;;
    v) verbose='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done
```

**Memory hook:** `a) cmd ;;` with spaces. Long arms: three lines. No `;&`.

## Variable expansion

**Order of precedence** (recommended, take it seriously):

1. Stay **consistent** with existing code.
2. **Quote** your variables.
3. Don’t brace-delimit **single-character specials / positionals** unless required or to avoid confusion. Prefer braces on **all other** variables.

`"${var}"` is **not** quoting by itself — you still need the `"…"`.

```bash
# Preferred style for 'special' variables:
echo "Positional: $1" "$5" "$3"
echo "Specials: !=$!, -=$-, _=$_. ?=$?, #=$# *=$* @=$@ \$=$$ …"

# Braces necessary:
echo "many parameters: ${10}"

# Braces avoiding confusion:
# Output is "a0b0c0"
set -- a b c
echo "${1}0${2}0${3}0"

# Preferred style for other variables:
echo "PATH=${PATH}, PWD=${PWD}, mine=${some_var}"
while read -r f; do
  echo "file=${f}"
done < <(find /tmp)
```

Discouraged: unquoted vars, unbraced named vars, braces on `$` (`${$}`), and `"$10$20$30"` after `set -- a b c` (that is `"${1}0${2}0${3}0"`, **not** `${10}${20}${30}`).

**Memory hook:** quote. `$1` not `${1}`. `${10}` and `${1}0`. `"${PATH}"`.

## Quoting

- Always quote strings that contain **variables**, **command substitutions**, **spaces**, or **shell meta characters**, unless you need careful unquoted expansion or it is a shell-internal **integer** (next point).
- Use **arrays** for safe lists (especially flags): `"${FLAGS[@]}"`.
- Optionally skip quotes on readonly integer specials: `$?` `$#` `$$` `$!`. Prefer quoting **named** integers (`PPID`) for consistency.
- Prefer quoting **words** (not compulsory for every option/path).
- **Never** quote literal integers (`value=32` not `value="32"` as a rule here).
- Know `[[ … ]]` pattern-match quoting.
- Use `"$@"` unless you have a specific reason for `$*` (appending args into one message/log).

```bash
# 'Single' quotes: no substitution.
# "Double" quotes: substitution required/tolerated.

flag="$(some_command and its args "$@" 'quoted separately')"
echo "${flag}"

declare -a FLAGS
FLAGS=( --foo --bar='baz' )
readonly FLAGS
mybinary "${FLAGS[@]}"

if (( $# > 3 )); then
  echo "ppid=${PPID}"
fi

value=32
number="$(generate_number)"
readonly USE_INTEGER='true'

echo 'Hello stranger, and well met. Earn lots of $$$'
echo "Process $$: Done making \$\$\$."

grep -li Hugo /dev/null "$1"

git send-email --to "${reviewers}" ${ccs:+"--cc" "${ccs}"}
grep -cP '([Ss]pecial|\|?characters*)$' ${1:+"$1"}
```

`"$@"` vs `$*`:

| Form | What happens |
| --- | --- |
| `$*` / `$@` **unquoted** | split on spaces; empty args dropped |
| `"$@"` | each argument **as-is**; no args → nothing passed (what you want almost always) |
| `"$*"` | **one** argument, joined by `$IFS` (usually space); no args → **one empty string** |

```bash
(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$*"; echo "$#, $@")
(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$@"; echo "$#, $@")
```

**Memory hook:** quote substitutions and names. `"$@"`. Arrays for flags. Never quote `32`.
