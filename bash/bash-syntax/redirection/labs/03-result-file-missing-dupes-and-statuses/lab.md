# result-file missing dupes and statuses

Several `.txt` files. The pipeline should **sort**, drop **duplicate** lines, and save to `result-file`. `${PIPESTATUS[@]}` should show each stage.

You also need the text on the **screen** while **appending** to `result-file`.

Right now either duplicates remain, or the terminal is silent, or only one status is checked (`$?` instead of the pipe array).

**Goal:** Match the notes’ `cat | sort | uniq > result-file` and `0 0 0` on success. Use the notes’ screen-and-file command for the append case.
