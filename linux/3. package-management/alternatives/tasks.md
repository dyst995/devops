# Tasks — alternatives

Close `theory.md`. Do not delete real JVMs; dummy binaries in `/usr/local` are fine.

## Warm-up

1. What problem does this tool solve? What does it **not** do to the other versions?
2. Debian/Ubuntu equivalent name vs this course’s Red Hat name.
3. Define from memory: public **link**, group **name**, real **path**, **priority**, **slave**.

## Inspect

4. Display the `java` group (or another that exists). Read `*` vs `+` in the interactive menu **before** you open it — what do they mean?
5. Show `java -version` (or the public name you picked). Relate it to the symlink target.

## Construct

6. Register two dummy implementations with different priorities. Public name of your choosing.
7. Pick with the **interactive** menu. Verify the public name’s output.
8. Pin a **specific path** (manual). Prove it does not follow highest priority.
9. Return to **automatic** (highest priority). Prove it flipped.
10. Unregister the dummy paths. Remove dummy files.

## Predict

11. Enter on the interactive menu — keep current or change? What does `[+]` mean in the prompt?
12. After `--install` with priority 5 vs 10, who wins in auto mode?

## Scenario

13. App must keep Java X even if a package adds a higher-priority Java Y. Pin, prove, then restore auto if this is a shared VM.
