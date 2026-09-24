# Tasks — Docker architecture

Close `theory.md`. Recite, then draw or write.

1. [ ] **Memorize:** client–server. CLI sends; daemon builds/runs/distributes.
2. [ ] **Draw:** Client (CLI) · Server (daemon, Dockerfile → image → container) · Registry (images) with `build` `run` `pull` `push`.
3. [ ] **Memorize:** REST API over UNIX socket **or** network. Same host or remote daemon. One client, many daemons.
4. [ ] **Recite:** daemon — listen · manage four object types · talk to other daemons for services.
5. [ ] **Recite:** Hub default · private registry · DTR/DDC · AWS/Azure/GCP. Users + secure connection.
6. [ ] **Memorize:** `pull`/`run` fetch; `push` upload.
7. [ ] **Memorize (cover):** CLI → API → daemon → registry. Image is not the container.
