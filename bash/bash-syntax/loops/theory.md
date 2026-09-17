# Loops

A loop is a block of code that **iterates a list of commands** as long as the **loop control condition is true**.

**Memory hook:** loop = repeat this block **while the control condition is true**.

Bash has three loop kinds in the notes:

- **For**
- **While**
- **Until**

Plus **loop control**: `break` and `continue`.

## For loop

During each pass through the loop, **`arg` takes on the value of each successive variable in the list**.

```bash
for arg in [list]; do
    command(s)...
done
```

Example:

```bash
for file in "$( find . -type l )"; do
    echo "$file"
done | sort
```

`find . -type l` lists **symbolic links** under `.`. Each pass: `file` is the next item. `echo "$file"` then the whole loop output is **`sort`ed**.

**Memory hook:** `for arg in list; do …; done`. One pass per list item. `arg` is **this** item.

## While loop

This construct tests for a condition **at the top** of a loop, and keeps looping as long as that condition is **true** (returns a **0** exit status). In contrast to a `for` loop, a `while` loop finds use in situations where the **number of loop repetitions is not known beforehand**.

```bash
while [ condition ]; do
  command(s)...
done
```

Example:

```bash
LIMIT=10

while [ "$a" -le $LIMIT ] ; do
  echo -n "$a "
  let "a+=1"
done
```

`[ "$a" -le $LIMIT ]` is true while `a` is **≤ 10**. `echo -n` prints `a` and a space **without** a newline. `let "a+=1"` increments. Give `a` a starting value before the loop (empty `"$a"` is not a number).

**Memory hook:** `while` = **as long as true (status 0)**. Test at the **top**. Use when you do **not** know the count in advance. `for` = you already have a **list**.

## Until loop

This construct tests for a condition **at the top** of a loop, and keeps looping as long as that condition is **false**

(**opposite of while loop**).

```bash
until [ condition-is-true ] ; do
    command(s)…
done
```

The test is still at the **top**. The body runs while the condition is **false** (nonzero status). When the condition becomes **true** (0), `until` **stops**.

**Memory hook:** `while` = repeat **while true**. `until` = repeat **until true** (while false). Same `do` / `done`.

## Loop control

- **`break`:** the `break` command **terminates the loop** (breaks out of it).
- **`continue`:** the `continue` command causes a **jump to the next iteration** of the loop, **skipping all the remaining commands** in that particular loop cycle.

```bash
$ for i in {1..5}; do
    echo $i
    [[ $i -eq 3 ]] && break
  done
1
2
3
```

`{1..5}` is the list `1 2 3 4 5`. When `i` is **3**, `break` **leaves** the loop — **4** and **5** never print. `echo` runs **before** `break`, so **3** is printed.

If that line were `continue` instead of `break`, the loop would **skip the rest of that cycle** and go on to `4` and `5`. Here there is nothing after the `[[ … ]] && break` line, so `continue` in that same spot would still print `1` through `5`.

**Memory hook:** `break` = **out**. `continue` = **skip the rest of this pass**, next item. `[[ $i -eq 3 ]] && break` → print `1 2 3` then stop.
