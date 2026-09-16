# Unit active check for monitoring

Monitoring will call a small wrapper with a **unit name** as the first argument.

**Goal:** Exit 0 if that unit is active, exit 1 otherwise. Demo with a unit that is up and one that is not (or a fake name).
