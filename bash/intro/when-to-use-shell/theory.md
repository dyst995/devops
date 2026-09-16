# When to use the shell

Shell is **not** a general-purpose development language. Use it for **small utilities** or **simple wrapper scripts** — glue around other programs (`rsync`, `ssh`, `awk`, `systemctl`), not a product.

Google (and this course) treat a style guide as **recognition that people write shell**, not as a suggestion to deploy it everywhere.

**Memory hook:** shell = glue and automation. App, speed, or secrets in the algorithm → another language.

## When shell is acceptable

- You are **mostly calling other utilities**
- You do **relatively little data manipulation**

Example: start a service, copy some files, `grep` a log, exit. That is a wrapper.

## When to rewrite (even if it started as shell)

| Signal | What to do |
| --- | --- |
| **Performance** matters | Use something other than shell |
| Script **> 100 lines** | Rewrite in a structured language **now** |
| **Non-straightforward** control flow | Same — rewrite now |
| Scripts **grow** | Rewrite **early**; a late rewrite costs more |
| Others must **maintain** it | If only you understand it, it is already too complex |

The 100-line rule is a **smell**, not magic: a 40-line script with nested loops, arrays of arrays, and ad-hoc parsing is already a candidate.

**Memory hook:** 100 lines or tricky flow → Python/Go/etc. **today**, not after it becomes a 400-line job.

## Shell should **not** be used for

Same list as the Linux shell-programming notes — memorize it:

- **Resource-intensive** work where **speed** matters (sorting, hashing, **recursion**)
- **Complex** applications that need **structured** programming (**type-checking**, **function prototypes**)
- **Mission-critical** systems you would bet the **company** on
- **Security**-sensitive work: integrity, **intrusion**, cracking, vandalism
- Need **native multi-dimensional arrays**
- Need real **data structures** (linked lists, trees)
- Need to **generate / manipulate graphics or GUIs**
- Need to **use libraries** or talk to **legacy** code
- **Proprietary, closed-source** products — a script **is** the source; anyone who can read the file can see it

**Memory hook:** CPU, types, company risk, security, arrays/trees, GUI, libraries, secrecy → **not** shell.
