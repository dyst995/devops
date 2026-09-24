# Conditions (study)

Six tools:

| Tool | Role |
| --- | --- |
| `test` / `[ ]` | Classic comparisons and file tests (builtin; `[` is a synonym for `test`) |
| `[[ ]]` | Extended test — **keyword**, one element; safer |
| `(( ))` / `let` | Arithmetic; status from the **value** |
| `if` / `then` | Structure (tests **any** command’s status) |
| `case` | Pattern match on an expression |
| `&&` / `||` | AND / OR lists |

## `test` / `[ ]`

Arguments are comparison or file tests. Exit status **0 = true**, **1 = false** (same as command success/fail). Spaces: `[ -f file.txt ]`.

```bash
test -f file.txt && echo "File exists"
[ -f file.txt ] && echo Indeed
[ -f file1.txt ] || echo No such file
```

`&&` runs the next command only if the test is **true (0)**. `||` only if **false (1)**.

After a command, `[ $? -ne 0 ] && rc=1` — if the last command **failed**, set `rc=1` (notes example: `ifup eth0`).

| Expression | Meaning |
| --- | --- |
| `( EXPRESSION )` | EXPRESSION is true (grouping; often `\(` `\)` with `[`) |
| `! EXPRESSION` | negate |
| `EXPRESSION1 -a EXPRESSION2` | AND (inside `[` / `test`) |
| `EXPRESSION1 -o EXPRESSION2` | OR (inside `[` / `test`) |
| `-n STRING` | length **nonzero** |
| `-z STRING` | length **zero** |
| `-d FILE` | exists, **directory** |
| `-f FILE` | exists, **regular file** |
| `-w FILE` | exists, **writable** |

## `[[ ]]`

Bash **2.02+**. **`[[` is a keyword, not a command.** Bash sees `[[ $a -lt $b ]]` as a **single element**. Prevents many logic errors.

`&&`, `||`, `<`, `>` work **inside** `[[ ]]`. They **error** inside `[ ]`. `[` still wants `-a` / `-o`.

```bash
string_with_spaces='some spaces here'
[[ -n $string_with_spaces ]]     # ok — one test
[ -n $string_with_spaces ]       # [: too many arguments  (word-split)
```

## `(( ))` / `let`

Arithmetic. If the **value** is **non-zero**, return status is **0**; if the value is **0**, status is **1** (opposite of the number you just computed). Use for arithmetic comparisons. See `man bash` **ARITHMETIC EVALUATION**.

```bash
(( 0 && 1 )); echo $?            # 1  (value 0)
var=-2 && (( var+=2 )); echo $?  # 1  (value 0)
```

## `if` / `then`

Runs the then-branch if the **exit status of a list of commands is 0**. Can test **any command**, not only brackets.

```bash
if [ condition1 ]; then
  command1
elif [ condition2 ]; then
  command4
else
  default-command
fi
```

`fi` is `if` backwards.

Init-script examples from the notes:

- `[[ "$rootfs" == nfs* || "$rootopts" =~ _r?netdev ]]` — pattern `== nfs*` **or** regex `=~`; then `exit 1`.
- `[ ! -d /proc/net/vlan ] && ! modprobe 8021q >/dev/null 2>&1` — `if` tests a **list**, not only brackets.

## `case`

```bash
case EXPRESSION in
  case1) command1; command2 ;;
  case2) command3 ;;
  *)     default ;;
esac
```

Each arm is a **pattern**. Each clause ends with **`;;`**. Statement ends with **`esac`** (`case` backwards).

Init example: `$1` is `start` / `stop` / `condrestart` / `*`. `*` → usage with `$0`, `exit 1`. `condrestart` uses `test "x\`pidof anacron\`" != x` (PID printed vs empty).

Args-script example from the notes: `set -euo pipefail` (errexit / nounset / pipefail). Empty `"$@"` → `help` and `exit 1`. `-m` / `-n` / `-h` in `case` with `shift`. Default `COUNT=5`. `./args.sh -m Hello` prints `Hello` five times; `-m Hi -n 1` prints `Hi` once.

## Lists

Can replace nested `if`/`case`.

**AND (`&&`):** each command runs if the previous returned **true (0)**. First **false** stops the chain (that failure is the last command that ran).

**OR (`||`):** each command runs if the previous returned **false**. First **true** stops the chain.
