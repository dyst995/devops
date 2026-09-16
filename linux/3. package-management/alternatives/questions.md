# alternatives — Questions

Cover the Answers section. Answer first, then check.

1. What does `alternatives` manage, and for what kind of software?
2. Does switching alternatives uninstall the other Java/Python versions?
3. Recite the six main actions: `--install`, `--remove`, `--set`, `--auto`, `--display`, `--config`.
4. In `--install link name path priority`, what is each of `link`, `name`, `path`, and `priority`?
5. What are `--slave` links for?
6. Write the command that registers `/usr/java/latest/bin/java` as `java` at `/usr/bin/java` with priority 5.
7. How do you open the interactive picker for `java`?
8. In the menu, what do `*` and `+` mean? What does pressing Enter do?
9. You type `5` in that menu. What happens to `java -version`?
10. `--set` vs `--auto` vs `--config`.
11. Why do ops teams use this instead of overwriting `/usr/bin/java` by hand?
12. Debian/Ubuntu equivalent command name?

---

## Answers

1. The symbolic links that make up “alternatives” — several versions of the same command (java, python, ruby, nodejs, …).
2. No. It only retargets the generic symlink.
3. Register · unregister · pin to a path · follow highest priority · show info · interactive menu.
4. Public symlink · group name · real binary · integer used in auto mode (higher wins).
5. Extra symlinks that must change together with the master (related tools, man pages, services).
6. `alternatives --install /usr/bin/java java /usr/java/latest/bin/java 5`
7. `alternatives --config java`
8. `*` = currently selected. `+` = auto-mode winner. Enter keeps the current selection.
9. It should report the JVM at selection 5 (`/usr/java/latest/bin/java` in the notes).
10. `--set name path` = manual pin. `--auto name` = priority decides. `--config name` = interactive numbered list.
11. All versions stay installed and tracked; one switch updates the managed links instead of a fragile manual overwrite.
12. `update-alternatives`
