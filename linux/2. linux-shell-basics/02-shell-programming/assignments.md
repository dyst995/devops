# Assignments — Shell programming

Close `commands.md`. Recite, then type. Predict the result **before** you run. Practice in a throwaway directory under `/tmp`. Do not export secrets. Revert variables you export in this shell (`unset`) when you are done.

## Variable assignment

1. [ ] Recite the assignment form with **no spaces** around `=`. Assign `KEY=value` and print `KEY`.
2. [ ] Recite how you assign a value that contains spaces. Assign `ANOTHER_KEY` to a two-word phrase and print it quoted.
3. [ ] Recite the colon-separated multi-value form. Assign `KEY_MULTI=value1:value2` and print it.
4. [ ] Wrong-usage: `KEY = value` (spaces). Predict whether Bash runs a command named `KEY`. Prove it.
5. [ ] Wrong-usage: `KEY= value` (space after `=`). Predict the value vs “command not found.” Prove it.
6. [ ] Predict: names are case-sensitive. Set `HOME_PRACTICE=a` and `home_practice=b`. Print both. They must differ.
7. [ ] Recite the convention: environment-style names are `UPPER_CASE` with `_`. Invent `LOG_LEVEL=debug` and print it.
8. [ ] Combine: three assignments from the cheat sheet style (plain, quoted spaces, colon list) in one throwaway session. Print all three.
9. [ ] Privilege: a normal user can assign shell variables without sudo. Prove it.
10. [ ] Predict: `KEY=value echo "$KEY"` vs `KEY=value; echo "$KEY"` — which leaves `KEY` in **this** shell? Prove both.
11. [ ] Recite: `PATH` uses `:` between directories. Print `PATH` and count colons (roughly). Do not overwrite `PATH` yet.
12. [ ] Wrong-usage: assign `PATH=` empty in this shell. Predict `ls` failing. **If you try it**, restore `PATH` from a second terminal or re-login. Prefer predicting only.
13. [ ] Combine: `KEY=value1:value2:value3` then print. Split on `:` in your head: three fields.
14. [ ] Predict: `ANOTHER_KEY=Some other value` without quotes. How many words does the shell see? Prove the error or the partial assignment.
15. [ ] Recite why you quote `"$KEY"` on print (spaces / glob). Assign a value with `*` or spaces and print quoted vs unquoted.
16. [ ] Wrong-usage: `export KEY = value`. Predict. Then the correct `KEY=value` with no spaces.
17. [ ] Combine: assign `KEY`, print it, assign a new value to `KEY`, print again. Same name, new value.
18. [ ] Privilege: `sudo KEY=value` is **not** how you set a variable in **your** shell. Set it as yourself.
19. [ ] Recite: this assignment is still a **shell** variable until something exports it (next drills / next topic).
20. [ ] Combined: no-spaces rule; quoted spaces; colon list; the `KEY = value` failure — all predicted first.

## `echo`

1. [ ] Recite how to print one variable. Print `HOME` quoted.
2. [ ] Recite how to print `PATH`. Print it quoted. First directory on the left wins — name that rule.
3. [ ] Predict the exact path of your home **before** you print `HOME`. Then print it.
4. [ ] Wrong-usage: `echo $HOME` vs `echo "$HOME"` with a silly `HOME` that contains spaces (temporary assign, then restore or use another name). When do you need quotes?
5. [ ] Combine: print `HOME` and `PATH` on two lines. Recite both names from memory.
6. [ ] Predict: `echo '$HOME'` vs `echo "$HOME"`. Which is the literal dollar? Prove it.
7. [ ] Privilege: printing `HOME` needs no sudo. Prove it.
8. [ ] Recite: `PATH` is searched in order; first match wins. Print `PATH`, then `command -v ls` and say which directory won.
9. [ ] Wrong-usage: `echo HOME` (no `$`). Predict the word `HOME`. Then expand the variable.
10. [ ] Combine: assign `KEY=hello`, print `"$KEY"`, print `"$HOME"`. One is yours; one is the system.
11. [ ] Predict `echo "$PATH"` output is one line (or wrapped). Not a list of `export` lines. Run it.
12. [ ] Recite `USER` / `HOME` / `SHELL` if you remember the table. Print each quoted. Skip any that are empty.
13. [ ] Wrong-usage: `echo $path` (lowercase) on Bash. Predict empty or different. Print `"$PATH"`.
14. [ ] Combine: `echo "$HOME"` then `cd` to it another way (`cd ~`) and `pwd`. Same directory?
15. [ ] Predict: `echo "$KEY"` before `KEY` exists. Empty line? Then assign and print again.
16. [ ] Privilege: `echo "$PATH"` as yourself vs `sudo env` `PATH` — might differ. On a lab VM, compare; do not change root’s PATH.
17. [ ] Recite the interview line: “how do you print an environment variable in the shell?”
18. [ ] Wrong-usage: `echo ${HOME` missing brace. Predict the error. Then `"$HOME"`.
19. [ ] Combine: print `HOME`, print `PATH`, then `env | head` and find those names. `echo` is one name; `env` is the dump.
20. [ ] Combined: quoted `HOME` and `PATH`; first-match PATH rule; `'$HOME'` vs `"$HOME"`.

## `env`

1. [ ] Recite what `env` dumps. Run it. Confirm you see `PATH` and `HOME` (pipe through a pager if huge).
2. [ ] Predict: a variable you assigned but did **not** export — does it appear in `env`? Set `ONLYSHELL=1`, run `env`, grep for it.
3. [ ] Recite: `env` is exported environment, not every shell name. After `export ONLYSHELL`, run `env` again. Then `unset ONLYSHELL`.
4. [ ] Wrong-usage: `env $PATH` as if `env` printed one variable. What happens? Use `echo` or `printenv` for one name (this topic’s dump is the full list).
5. [ ] Combine: `echo "$HOME"` vs find `HOME=` in `env` output. Same value?
6. [ ] Privilege: `env` as yourself is your process environment. `sudo env` is root’s. Compare only on a lab VM.
7. [ ] Predict: `env` vs `set` — which is huge with functions? Run both piped to a pager; do not dump `set` unpaged.
8. [ ] Recite: applications inherit the **environment**. After `export KEY=visible`, `env | grep` that name (then unset).
9. [ ] Wrong-usage: `ENV=foo` thinking it is the `env` command. Print `"$ENV"` vs run `env`.
10. [ ] Combine: assign without export → missing from `env` → export → present → unset → gone.
11. [ ] Predict: `env` output format `NAME=value`. Pick three lines and read them aloud.
12. [ ] Recite why `PATH` in `env` matters to child processes (they search those dirs).
13. [ ] Wrong-usage: `env KEY` expecting one variable (GNU `env` may error or ignore). Predict; then dump and search.
14. [ ] Combine: `env` and `echo "$PATH"` — `PATH` must appear in both if it is exported (it almost always is).
15. [ ] Privilege: you do not need root to inspect **your** `env`. Prove it.
16. [ ] Predict: empty `env` in a cleared environment (`env -i` if your `env` supports it) — `HOME` gone? Try `env -i env` or `env -i printenv`. Recite what “clean env” means. Skip if `env -i` is missing.
17. [ ] Recite the interview contrast: `env` vs `set` in one sentence.
18. [ ] Wrong-usage: `env | echo` as if that filtered names. Use a pager or `grep`.
19. [ ] Combine: `KEY=value env` prefix (one-shot) vs `export` in the parent. Child sees it; parent `echo "$KEY"` after the one-shot — still unset? Prove with `env KEY=tmp true` then `echo "$KEY"`.
20. [ ] Combined: dump exported vars; prove unexported names are absent; contrast `set`; no sudo required.

## `set`

1. [ ] Recite what `set` dumps (shell vars + environment + functions). Run `set` **piped to a pager**. Do not flood the terminal.
2. [ ] Predict: `KEY=hello` without export — does `set` show `KEY`? Prove it (pager / grep).
3. [ ] Recite: `set` is huge. Why the cheat sheet mentions that. Page a few screens, then quit.
4. [ ] Wrong-usage: `set KEY` expecting to print one variable. What does `set` with extra args do in Bash (`-e` etc.)? Prefer `set |` pager for the dump.
5. [ ] Combine: `set` vs `env` for `KEY` unexported vs exported. Table: appears in `set`? in `env`?
6. [ ] Privilege: `set` as your user shows **your** functions too. No sudo.
7. [ ] Predict: `set` output includes functions like `name ()`. Find one function in the dump (or note none).
8. [ ] Recite when you would use `set` while debugging a script (see every name) vs `env` (what children inherit).
9. [ ] Wrong-usage: run `set` with no pager in a full-screen session and lose your scrollback. Always page it for this drill.
10. [ ] Combine: assign `KEY=value`, `set` grep it, `env` grep it, `echo "$KEY"`. Three views.
11. [ ] Predict: `set -x` is **not** this dump — that is debug tracing (`bash -x` later). Recite the difference, then `set +x` if you turned it on.
12. [ ] Recite: `set` with no options = dump. `set` with options = change shell behavior. Keep this assignment on the dump.
13. [ ] Wrong-usage: `unset set` or treating `set` as a variable. Run the command `set` piped to a pager.
14. [ ] Combine: `bash -c 'KEY=1; set | grep KEY'` vs `bash -c 'KEY=1; env | grep KEY'`. Predict which grep hits.
15. [ ] Privilege: `sudo set` is not a thing in the same way — `set` is a shell builtin. Run it in **your** Bash.
16. [ ] Predict a name that is in `set` but not `env` (a shell-only variable you just assigned). Prove it.
17. [ ] Recite the interview line: “`set` versus `env`.”
18. [ ] Wrong-usage: `SET` uppercase as a command. Predict not found. Builtin is `set`.
19. [ ] Combine: page `set`, find `PATH`, find `HOME`, find your `KEY`. Quit the pager.
20. [ ] Combined: dump is huge; unexported names live here; page it; never confuse with `set -x`.

## `bash`

1. [ ] Recite the flag that runs a script with each command printed (debug). Create `script.sh` in `/tmp` with two `echo` lines. Run it that way.
2. [ ] Predict the debug output: you see the commands **and** their results. Run it. Tick only if you predicted the `+` style lines.
3. [ ] Recite: the interpreter is Bash **reading the file line by line** (this topic’s model). The debug flag shows those lines as they run.
4. [ ] Wrong-usage: `bash x script.sh` (missing the dash). Predict. Then the correct debug flag.
5. [ ] Combine: write `script.sh` that sets `KEY=1` and `echo "$KEY"`. Run normally, then with debug. Difference is the trace, not the `echo` result.
6. [ ] Privilege: debugging **your** script needs no sudo. Prove it in `/tmp`.
7. [ ] Predict: `bash script.sh` without debug — quiet except `echo`. With debug — extra lines. Both exit 0 if the script is fine.
8. [ ] Recite why “add `echo`, run the line by hand, then the debug flag” is the course debugging story.
9. [ ] Wrong-usage: `bash -x` with **no** script. You drop into an interactive traced shell. Exit it (`exit` / Ctrl-D). Then pass a file.
10. [ ] Combine: put a failing command in the script (`false` or `ls` missing file). Debug-run it. You still see the traced line.
11. [ ] Predict: `bash -x` vs `set -x` inside the file. Either traces. Prefer the cheat-sheet form: flag on the `bash` invocation.
12. [ ] Recite: compiled vs interpreted — the debug flag only makes sense because the shell **reads text**. Say that, then run `-x`.
13. [ ] Wrong-usage: `sh -x script.sh` if the script uses Bash-only syntax. Prefer `bash` as on the cheat sheet.
14. [ ] Combine: `KEY=value` in the script (no spaces), `echo "$HOME"` in the script, debug-run. Trace shows the expansions.
15. [ ] Privilege: do not `bash -x` system init scripts as root “for practice.” Only `/tmp` throwaway scripts.
16. [ ] Predict: comments in the script — does `-x` print comment lines? Prove it.
17. [ ] Recite the exact interview command shape: interpreter, debug flag, script name.
18. [ ] Wrong-usage: `chmod +x` forgotten then `./script.sh` vs `bash -x script.sh` (interpreter does not need +x). Prove both.
19. [ ] Combine: `env` / `set` / `echo "$PATH"` from earlier, then a two-line script that prints `HOME`, debug-run it.
20. [ ] Combined: throwaway script; debug flag; `+` traces; no sudo; missing-dash failure.
