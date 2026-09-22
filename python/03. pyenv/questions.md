# pyenv — Questions

Cover the Answers section. Answer first, then check.

1. What does pyenv manage? What does it **not** install (packages)?
2. pyenv vs pip vs venv — one sentence each.
3. Why not use only OS `python3` for apps?
4. Unix: what must be on `PATH`, and which `eval` line? Why build deps?
5. `install -l` vs `install 3.12.8` vs `versions` vs `uninstall` vs `prefix` vs `which python`?
6. Recite shell / local / global: scope and file/mechanism. Which wins?
7. What file does `local` write? Commit it?
8. What is a shim? When `rehash`?
9. After switching versions, how do you install packages? What if `.venv` was made with another version?
10. `system` means what? pyenv-win vs Unix pyenv?

---

## Answers

1. Python **interpreters** (versions). Not PyPI packages (pip does that).
2. pyenv = which Python binary. pip = packages into an interpreter. venv = isolated site-packages for a project.
3. Distro owns it; projects need pinned / different versions.
4. pyenv shims before `/usr/bin`. `eval "$(pyenv init -)"`. It compiles CPython.
5. Catalog · build/install that version · list installed · remove · current prefix dir · real python path.
6. This shell (`PYENV_VERSION`) · this directory (`.python-version`) · user default (`~/.pyenv/version`). shell > local > global.
7. `.python-version`. Yes, so the repo shares the pin.
8. Small `PATH` wrapper that picks the real binary. After new versions/tools so shims exist.
9. `python -m pip` (usually in a new venv from that python). Recreate the venv.
10. OS Python, not a pyenv build. Windows port; same jobs, different install.
