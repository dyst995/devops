# Assignments — Exit codes

Close `theory.md`. Recite meanings **before** you run. `echo $?` **immediately** after the command (the next command overwrites it).

1. [ ] Range of an exit status? Convention for **0** vs **non-zero**? Where does the shell store the last status?
2. [ ] Why must you `echo $?` **right after** the command?
3. [ ] Recite the whole table from memory: 1, 2, 126, 127, 128, 128+n, 130, 255 — meaning in a few words each.
4. [ ] **1** — catchall. Course example (`let` divide by zero). If the notes do not give a more specific number, think **1**.
5. [ ] **2** — misuse of builtins. Course example (unfinished `empty_function() {`). Also `diff` on binary files / some permission wording.
6. [ ] **126** vs **127**: found it but **cannot run** vs **never found**. Examples: `/dev/null` as a command vs `Illegal_command`.
7. [ ] Trigger 127: typo a command name. Confirm `$?`. Recite `$PATH` / typo.
8. [ ] Trigger 126 if you can: `chmod -x` a script you wrote, `./it`. Confirm cannot execute vs not found.
9. [ ] **128** — invalid argument to `exit`. Course example `exit 3.14159`. Recite: `exit` takes integers **0–255** only.
10. [ ] **128+n** — killed by signal n. `kill -9` is signal **9** → **137**. Recite 128+9.
11. [ ] **130** — Control-C. Signal **2** (SIGINT). Recite 128+2=130. Run `sleep 30`, Ctrl-C, `echo $?`.
12. [ ] **255** — out of range. Course `exit -1`. Same rule as 128: byte 0–255.
13. [ ] Memory hook: 126 = found, cannot run. 127 = never found. 128+n = killed. Ctrl-C → 130.
14. [ ] Successful `true` or `echo ok` — `$?` is 0. Prove.
15. [ ] `false` — non-zero (usually 1). Prove.
16. [ ] Interview: “command not found” vs “Permission denied” on `./file` — which table row each?
17. [ ] Interview: script killed with SIGKILL vs user hit Ctrl-C — 137 vs 130 and why.
18. [ ] Recite: `exit` is a **byte**. Negative and fractions are not legal statuses.
19. [ ] After a pipeline or two commands, `$?` is only the **last** one. Prove with `false; true` then `$?`.
20. [ ] Combined: 0 = OK; table 1 / 2 / 126 / 127 / 128 / 137 / 130 / 255; `$?` immediately; exit 0–255 only.
