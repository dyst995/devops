# Tasks — alternatives

Close `theory.md`. Do not delete real JVMs or system alternatives. Dummy binaries under `/usr/local` (or similar) are fine for install/remove practice.

## Warm-up

1. What problem does `alternatives` solve? What does it **not** do to the other installed versions?
2. Memory hook in one line: public name vs real binaries vs “current” choice.
3. Debian/Ubuntu equivalent command name vs this course’s Red Hat name.
4. From memory, define each part: public **link**, group **name**, real **path**, **priority**, **slave**.
5. Match action to job without looking: `--install`, `--remove`, `--set`, `--auto`, `--display`, `--config`.

## Inspect

6. Run `alternatives --display` on `java` (or another group that exists on this host). List every path and priority you see.
7. Before you open the interactive menu, state what `*` and `+` mean. Then run `alternatives --config` for that group, press **Enter** only (keep current), and confirm nothing changed.
8. Show `java -version` (or the public name you picked). Relate the output to the symlink target under the public link path (e.g. `readlink -f` / `ls -l` on `/usr/bin/java`).

## Construct

9. Create two tiny dummy “binaries” (shell scripts that print different version strings). Register both with `alternatives --install`: same public link and group name, **different** real paths and priorities (e.g. 5 vs 10).
10. Optionally register a `--slave` that switches with the master (e.g. a dummy man page or companion command). Show with `--display` that the slave is tied to the group.
11. Pick with the **interactive** menu (`--config`). Verify the public name’s output matches the path you chose.
12. Pin a **specific** path with `--set` (manual mode). Prove the public name does **not** follow highest priority even if another path ranks higher.
13. Return to **automatic** with `--auto`. Prove it flipped to the highest-priority path.
14. Unregister each dummy path with `--remove`. Delete the dummy files. Confirm `--display` no longer lists them (or the group is gone if you only added dummies).

## Predict

15. On the interactive menu prompt, what does pressing **Enter** do? What does `[+]` in that prompt refer to?
16. After `--install` with priority **5** vs **10**, who wins in `--auto` mode? Who wins after `--set` to the priority-5 path?
17. True or false: switching alternatives copies the JVM. Justify from the notes.

## Scenario

18. An app must keep Java X even if a later package registers Java Y with a **higher** priority. Write the exact `--set` (or `--config`) steps you would use, prove with `java -version` / `--display`, then restore `--auto` if this is a shared lab VM.
19. A teammate ran `--config`, typed a number, and swears “nothing changed.” List three checks (markers `*`/`+`, `--display`, public-link target vs `-version`) before you blame the package.
