# New files must not be world-readable

Files `labdev` creates in an interactive shell must not be readable by “other”.

**Goal:** Create a file as that user in a new interactive login and show its mode. World-readable is a fail.
