# Tasks — When to use the shell

Close `theory.md`. Work in `/tmp/when-to-use-shell-tasks` when creating files (tiny wrapper sketches only). This topic is a **decision list**, not a CLI — no extra commands to memorize. Do the action or write the answer, then check yourself.

## Warm-up

1. In one sentence: is shell a general-purpose development language? What is it for instead?
2. The notes say a style guide is recognition that people write shell — not a suggestion to do what? Answer in your own words.
3. Name two qualities of an acceptable shell use case (mostly calling utilities; little data work).

## When shell is acceptable

4. From memory: list the two “when shell is acceptable” bullets from the notes.
5. Sketch (3–8 lines, under `/tmp/when-to-use-shell-tasks`) a wrapper that only starts a service, copies a file, greps a log, and exits. Label why this fits “glue around other programs.”
6. For each ticket, say **shell OK** or **rewrite** and why, using only the acceptable-use rule:
   - nightly `rsync` of one directory to a backup host
   - thin wrapper around `systemctl restart …` with a log line
   - parse nested JSON into a typed object graph and serve it over HTTP
7. Predict: a 20-line script that only calls `ssh`, `awk`, and `grep` — acceptable or not? A 20-line script that implements its own recursive merge of complex trees — same question?

## When to rewrite

8. From memory, fill the rewrite table signals: Performance…; Script > … lines; Non-straightforward …; Scripts …; Others must …
9. The 100-line rule is a **smell**, not magic. Give one example from the notes (or your own) of a **short** script that is already a rewrite candidate.
10. For each situation, pick **keep** or **rewrite now** and name the signal:
   - 120-line deploy script that keeps growing every sprint
   - 15-line cron that only rotates one log with `mv` + `gzip`
   - 60 lines with nested loops, arrays of arrays, and ad-hoc parsing
   - works fine but only you understand the control flow; three teammates must maintain it
11. Write (do not implement a full app): what language family would you move a growing 100+ line ops script toward, and **when** (today vs after it hits 400 lines)?

## Shell should **not** be used for

12. From memory, list all nine “should not” cases from the notes (resource-intensive / complex apps / mission-critical / security / multi-dim arrays / data structures / GUIs / libraries-legacy / closed-source).
13. Match each scenario to the **one best** “should not” reason:
   - implement AES / intrusion detection in Bash
   - company payment ledger that must never be wrong
   - native multi-dimensional arrays and linked lists
   - desktop GUI with menus and canvases
   - call a proprietary C library / legacy COM stack
   - ship a closed-source product where customers must not see the source
   - sort/hash/recurse over huge datasets where speed matters
14. Why does “proprietary / closed-source” clash with shell scripts specifically? One sentence from the notes’ idea (the file **is** the source).

## Decision drills (mix)

15. Ticket triage — for each, answer **shell**, **rewrite**, or **never shell**, and cite the rule:
   - restart a unit if down; email on failure (under ~30 lines)
   - build a typed REST API with schemas and tests
   - security audit tool that inspects binary integrity
   - 90-line backup glue that is about to add another nested state machine
   - sort a 50 GB file with custom recursive partitioning in pure Bash
16. Rewrite early vs late: in one sentence, why does the notes say rewrite **early** when scripts grow?
17. Someone says “the Google shell style guide means we should write everything in Bash.” Correct them using only this topic’s framing.

## Tiny wrapper vs product (hands-on sketch)

18. Under `/tmp/when-to-use-shell-tasks`, write a **short** acceptable wrapper (comments + fake commands OK): call two existing utilities, almost no data manipulation. Count lines. Confirm it stays under the smell threshold and has straightforward flow.
19. Same directory: outline (comments only, no full implementation) a **bad** “shell product” that hits at least three “should not” cases. Label each violation.

## Scenario

20. Ops asks you to own a script that started as 40 lines of `rsync` + `ssh` glue. It is now ~180 lines, has nested control flow, and the on-call rotation must maintain it. Performance of an inner loop is starting to matter. Using only this topic: list the rewrite signals that fire, say whether shell is still acceptable, and recommend what to do **today**. Optionally sketch the boundary: what stays as a tiny shell wrapper vs what moves to another language.
