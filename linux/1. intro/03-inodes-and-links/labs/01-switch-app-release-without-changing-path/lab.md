# Switch app release without changing the client path

Releases are directories `/opt/app/releases/1.0` and `/opt/app/releases/1.1` (create them with different `index.html` contents). Clients must always open `/opt/app/current`.

**Goal:** Activate 1.0, prove clients see 1.0, then switch to 1.1 **without** changing the path clients use. Prove they now see 1.1.
