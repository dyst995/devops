# case never leaves the arm

A `case` on the first argument is meant to print `starting` or `stopping` and then finish that option. As written, Bash complains at the `case` / `esac` (or treats the next option as part of the first).

Commands on a **single line** in the same file are supposed to run one after another; that part works. The `case` branches do not.

**Goal:** Each option terminates the way the table requires. Same-line commands still use the **one**-character separator. Show `start` and `stop` each print only their own message.
