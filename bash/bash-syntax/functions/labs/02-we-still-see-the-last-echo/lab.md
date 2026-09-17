# We will never see this — but we still do

`func.sh` has `retfunc` (`return 1`) and `exitfunc` (`exit 1`). After `retfunc` the script must print `We are still here`. After `exitfunc` it must **not** print `We will never see this`.

Right now either the whole script dies on the first function, or both echos run after `exitfunc`.

**Goal:** Output matches the notes (`this is retfunc()`, `We are still here`, `this is exitfunc()`). `return` terminates the **function**; `exit` terminates the **script**. `$?` after `retfunc` is 1.
