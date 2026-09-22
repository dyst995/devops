# Tasks — Dockerizing

Close `theory.md`. Recite the Dockerfile from memory, then build in a throwaway folder.

1. [ ] **Memorize seven ways to ship:** wheel/archive; RPM/DEB; Conda; PyInstaller/PyOxidize; Docker; VMs; hardware.
2. [ ] **Write from memory:** six Dockerfile instructions + course comments (`FROM python:3.8` … `CMD python ./server.py`).
3. [ ] **Learn:** copy **requirements.txt before** `src/` (install layer cache).
4. [ ] **Memorize:** `docker build -t my-python-app .` and `docker run -it --rm --name my-running-app my-python-app`.
5. [ ] **Learn:** docker-compose slide = file for one or more containers vs a long `run`.
6. [ ] **Memorize slim:** minimal packages; needs Unix to extend.
7. [ ] **Memorize alpine:** Alpine Linux; tiny; space; teams leave (compat, hard to debug).
8. [ ] **Memorize full `python:x.x.x`:** Debian; quick start; size OK; **safest**. Course uses **3.8** full.
9. [ ] **Write:** tiny `requirements.txt` + `src/server.py`; `build` then `run` with **course names**.
10. [ ] **Memorize (cover):** seven ship options; six Dockerfile lines; build/run flags; full vs slim vs alpine.
