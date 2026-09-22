# Tasks — Dockerizing

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Recite first. Docker is required only for the build/run item.

## Warm-up

1. [ ] Seven packaging lines (wheel/archive, RPM/DEB, Conda, PyInstaller/PyOxidize, Docker, VM, hardware).
2. [ ] Recite the Dockerfile. Recite `build` and `run`. slim vs alpine vs full (`python:x.x.x`).

## Do

3. [ ] From memory, write the six Dockerfile instructions with the course comments (base OS, WORKDIR, reqs, pip, src, CMD).
4. [ ] Layout a tiny `requirements.txt` + `src/server.py` (e.g. print one line). `docker build -t my-python-app .` then `docker run -it --rm --name my-running-app my-python-app`. Same names as the notes.
5. [ ] Recite why **full** is safest, when **slim** needs Unix, when **alpine** is recommended and why teams leave it. Course file uses **`python:3.8`** (full).

## Complete

6. [ ] Without looking: `FROM` → `WORKDIR /code` → copy reqs → `pip -r` → `COPY src/` → `CMD python ./server.py`. One sentence: Docker image vs [wheel / sdist](../18. packaging/theory.md).
