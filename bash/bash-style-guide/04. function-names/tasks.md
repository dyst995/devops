# Tasks — Function names

Close `theory.md`. Work in `/tmp/function-names-tasks` when writing practice scripts.

## Warm-up

1. Recite the memory hook: `snake_case()`. Package: `lib::snake_case()`. Same `function` style everywhere, or nowhere.
2. From memory: case? How are words separated? What separates a library/package from the function name?
3. Are parentheses after the name required? Is the `function` keyword required?

## Single-script names

4. Write `my_func() { … }` — lower_case, underscores, parentheses required, 2-space body. Save under `/tmp/function-names-tasks/single.sh`.
5. Call `my_func` and confirm it runs. Prefer this form for a function used only in **one** script / this file.
6. Write two more helpers in the same style (`cleanup_temp`, `print_status`) so the file is consistently `snake_case()`.

## Package / library names

7. Write `mypackage::my_func() { … }`. Explain in one sentence why `::` exists (two libraries must not clash).
8. Add a second namespaced function (`mypackage::cleanup` or `backuplib::run_backup`). Call both.
9. Predict: without a namespace, what goes wrong if `lib_a` and `lib_b` both define `init`? Write the clash in words, then show how `lib_a::init` / `lib_b::init` avoid it.

## The optional `function` keyword

10. Recite: `function` is **optional** but must be used **consistently** in a project.
11. Rewrite one helper once **with** `function my_func() { … }` and once **without**. Pick **one** style and stick to it in a second file that has three functions — all matching.
12. **Break:** mix `function foo() {` and `bar() {` in the same project file. **Fix:** make every definition match one style.

## Break naming rules, then fix

13. **Break:** use CamelCase or hyphenated names (`MyFunc`, `my-func`) or omit `()`. Note what fails or what style forbids. **Fix:** restore `snake_case()`.
14. **Break:** define a “library” helper as bare `load_config` in a shared file meant to be sourced by many scripts. **Fix:** rename to `mypackage::load_config` (or your package name).
15. **Break:** put a space wrongly or drop parentheses in a way your Bash rejects — record the error, then fix to `name() {`.

## Cover-and-recall

16. Cover the notes. Write from memory: one local `snake_case()`, one `lib::snake_case()`, and one sentence on `function` consistency.
17. Given three names — `DoStuff`, `do_stuff`, `mypkg::do_stuff` — mark which are course-correct for script-local vs library.

## Scenario

18. Ticket: “we sourced two vendor snippets and both define `setup`; production randomly gets the wrong one.” Create two tiny “library” files under `/tmp/function-names-tasks` that each export a namespaced `::setup`, source both from a driver script, and call each explicitly so there is no clash. Also show the broken same-name version (commented or in a separate `broken/` copy) for contrast.
