# leftover package after uninstall

A package was installed for a trial. `list` still shows it (or `show` still finds it) after you thought you removed it. You may have uninstalled with a **different** pip than the one you listed.

**Goal:** `list` / `show` no longer include that package **in the environment you care about**. Prove you used that environment’s `python -m pip uninstall`.
