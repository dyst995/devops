# AND list still runs the rest

A deploy step is supposed to be an **AND list**: each command runs only if the previous one succeeded. At the first failure the chain must **stop** (that failed command is the last one that runs).

Right now later commands still run after a failure (nested `if` soup, or `||` used by mistake).

A second helper is supposed to be an **OR list**: keep trying until one command **succeeds**, then stop.

**Goal:** Demonstrate both chains with three commands each. Show which commands ran. No nested `if` required — lists can replace that, as the notes say.
