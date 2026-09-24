# Comments — Questions

Cover the Answers section. Answer first, then check.

1. What must every file start with (after the sha-bang)? Are copyright and author required?
2. Recite the five function-comment fields. When must a library function be commented? When may a script function skip a comment?
3. Recite the `cleanup` / `get_dir` / `del_thing` banners: which fields does each include? What does `get_dir` write, and where?
4. What belongs in an implementation comment? What should you **not** comment?
5. Recite a `TODO` line. What goes in the parentheses? Is it a promise that that person will fix it? Whose name do you usually put?

---

## Answers

1. A top-level `#` overview of the file. Optional.
2. Description · Globals · Arguments · Outputs · Returns. Always (any length). If it is **both** obvious **and** short.
3. `cleanup`: Globals + Arguments None. `get_dir`: Globals + Arguments None + Outputs stdout. `del_thing`: Arguments (path) + Returns 0 / nonzero. `echo "${SOMEDIR}"` to **stdout**.
4. Tricky / non-obvious / interesting / important. Not every obvious line.
5. `# TODO(mrmonkey): Handle the unlikely edge cases (bug ####)`. Name / email / id of the person with context. No. Yours.
