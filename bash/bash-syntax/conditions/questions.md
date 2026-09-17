# Conditions — Questions

Cover the Answers section. Answer first, then check.

1. Six condition tools Bash has (course list)?
2. `[` vs `test`? Built-in why? True/false exit statuses?
3. Write `test EXPRESSION` and `[ EXPRESSION ]`. Recite the file.txt / file1.txt three demos and what prints.
4. After `ifup eth0`, what does `[ $? -ne 0 ] && rc=1` mean?
5. Recite the TEST COMMAND EXPRESSIONS table: `( )` `!` `-a` `-o` `-n` `-z` `-d` `-f` `-w`.
6. `[[` — version? Keyword or command? What does Bash see `[[ $a -lt $b ]]` as? Which operators work in `[[ ]]` but error in `[ ]`?
7. `string_with_spaces='some spaces here'`: `[[ -n … ]]` vs `[ -n … ]` — outputs / error.
8. `(( ))` and `let`: when is status 0 vs 1? `(( 0 && 1 ))` → `$?`? `var=-2 && (( var+=2 ))` → `$?`? Where to read arithmetic?
9. What does `if/then` test (exit status)? Can `if` test commands that are not brackets? Recite `if` / `then` / `elif` / `else` / `fi`.
10. Network example: what does the `[[ "$rootfs" == nfs* || … =~ _r?netdev ]]` branch do? The `[ ! -d /proc/net/vlan ] && ! modprobe …` branch?
11. `case` syntax: what ends a clause? What ends the statement? What is each case?
12. Init `case "$1"`: `start` / `stop` / `condrestart` / `*`?
13. `args.sh`: no args? `-m Hello` how many lines? `-m Hi -n 1`? What does `[[ -z "$@" ]]` do? Default `COUNT`?
14. AND list: when does the next command run? When does the chain stop?
15. OR list: when does the next command run? When does the chain stop?

---

## Answers

1. `test`/`[ ]` · `[[ ]]` · `(( ))` and `let` · `if/then` · `case` · list constructs.
2. `[` is a synonym for `test`, built-in for efficiency. 0 true, 1 false.
3. `test -f file.txt && echo "File exists"` → File exists. `[ -f file.txt ] && echo Indeed` → Indeed. `[ -f file1.txt ] || echo No such file` → No such file.
4. If `ifup` failed (status ≠ 0), set `rc=1`.
5. Group true · negate · AND · OR · nonzero length · zero length · directory · regular file · exists and writable.
6. Bash 2.02. Keyword. A single element (exit status). `&&` `||` `<` `>` .
7. Non-empty message. `[` → `-bash: [: too many arguments`.
8. Non-zero **value** → status 0; zero value → status 1. Both examples `$?` is `1`. `man bash` ARITHMETIC EVALUATION.
9. Whether a command list’s status is 0. Yes, any command. Syntax as in the notes; `fi` closes.
10. Exit 1 if root is nfs* or rootopts matches that regex. If vlan proc dir missing **and** `modprobe 8021q` fails, log no 802.1Q support.
11. `;;` · `esac` · pattern match on EXPRESSION.
12. Call `start` · call `stop` · if `pidof anacron` nonempty then stop then start · usage and `exit 1`.
13. Usage/help, exit 1. Five `Hello`. One `Hi`. Empty args → help and fail. 5.
14. Previous returned true (0). First false (nonzero) stops; that failed command is last to run.
15. Previous returned false. First true stops; that successful command is last to run.
