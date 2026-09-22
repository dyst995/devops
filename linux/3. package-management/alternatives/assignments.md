# Assignments — alternatives

Close `commands.md`. Recite, then type. Dummy binaries under `/usr/local` or `/tmp` are fine. Do not delete real JVMs.

## `alternatives`

1. [ ] Register a dummy implementation: public symlink, group name, real path, integer priority. Recite those four arguments in order.
2. [ ] Predict: two registered paths, priorities 5 and 10, group in automatic mode — which public target wins, and why?
3. [ ] After registering two paths, prove the losing binary is still on disk (this tool switches a name; it does not uninstall the other version).
4. [ ] Display the group. List every registered path and its priority. Mark which one is current.
5. [ ] Before opening the interactive menu, recite what `*` means and what `+` means.
6. [ ] Open the interactive chooser. Press Enter only. Prove you kept the current selection (`[+]`).
7. [ ] Open the interactive chooser. Type a number for a different path. Prove the public name now follows that path.
8. [ ] Pin a specific real path (manual mode) without using the menu. Prove the group no longer follows “highest priority.”
9. [ ] While pinned, register or raise another candidate’s priority. Prove the pin still holds.
10. [ ] Return the group to automatic mode. Prove it flipped to the highest priority.
11. [ ] Recite three ways to pick: interactive number, pin-by-path, automatic-by-priority. One sentence each.
12. [ ] Unregister one dummy path. Prove it vanishes from display while the other path remains.
13. [ ] Predict wrong-usage: swap path and priority in the register line. What fails, and at which argument?
14. [ ] Predict: omit the group name vs omit the real path — which error do you get?
15. [ ] Privilege: try to register a public link under `/usr/bin` as a non-root user. Predict permission denied; prove it.
16. [ ] Combine: register two dummies → pin the lower priority → confirm with display → auto → remove both.
17. [ ] Recite what a slave link is for (man page, `javac`, …) even if this drill only installs a master.
18. [ ] Name the Debian/Ubuntu equivalent of this tool, then use the Red Hat name from the cheat sheet.
19. [ ] After unregistering the last dummy, predict whether the public symlink still exists and what running that public name does.
20. [ ] Cleanup: unregister every dummy you added and delete dummy files you created. Leave real system alternatives alone.

## `java`

1. [ ] Print which JVM the public `java` name currently is (version string).
2. [ ] Predict: does that output name the file on disk, or only a vendor/version line?
3. [ ] After you change the `java` alternative, prove the version string matches the path you selected.
4. [ ] Run the real binary by absolute path and via the public name. Same version or different? Why?
5. [ ] Recite: switching alternatives does not copy a second JVM into `/usr/bin` — it retargets a symlink.
6. [ ] Locate the public `java` on your `PATH`. Prove it is (or is not) a symlink to the path in alternatives display.
7. [ ] Predict: two JVMs installed, public name still pointing at the old one — what must you do besides unpacking the new tree?
8. [ ] Combine: display the group, then print the version. Map each menu path to the version it would report.
9. [ ] Privilege: as a normal user, can you change which `java` the public name uses? Predict, then try.
10. [ ] Wrong-usage: invoke `java` with a flag that is not the version checker. Prove the version checker is a distinct flag.
11. [ ] If the public name is missing after you removed the last alternative, predict the shell error (`command not found` vs a JVM error).
12. [ ] Recite why an app that hard-codes `/usr/java/latest/bin/java` ignores your alternatives switch.
13. [ ] Prove `JAVA_HOME` (if set) can disagree with the public `java` on `PATH`. Say which one a typical CLI uses.
14. [ ] After `--auto java`, print the version again. Did it change? Relate that to the `+` winner.
15. [ ] After `--set` to a specific path, print the version. Did it ignore a higher-priority install?
16. [ ] Predict: `java -version` writes to stderr on many JVMs. How will you still “see” it?
17. [ ] Compare OpenJDK vs a vendor tree if both exist: same public name, different version lines. Switch and prove.
18. [ ] If this box has no `java` group, pick another public name from `alternatives` display (or a dummy). Same verification idea.
19. [ ] Recite the memory hook: interactive pick → type a number → version output must match that path. Enter = keep current.
20. [ ] Restore whatever `java` group you found (auto or the original pin) so a shared VM is not left on your dummy.
