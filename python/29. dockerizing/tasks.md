# Tasks — Dockerizing

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: recite the Dockerfile and image variants. Docker only needed for the build/run item.

1. [ ] Recite seven packaging options: native **wheel/archive**; **RPM/DEB**; **Conda**; freezers **PyInstaller/PyOxidize**; **Docker**; **VMs**; **hardware** drag-and-plug.
2. [ ] Recite the Dockerfile with course comments: `FROM python:3.8`, `WORKDIR /code`, copy `requirements.txt`, `RUN pip install -r`, `COPY src/`, `CMD ["python", "./server.py"]`.
3. [ ] Why copy **requirements.txt before** `src/` (layer cache)?
4. [ ] Recite `docker build -t my-python-app .` and `docker run -it --rm --name my-running-app my-python-app`. What is `-it`, `--rm`, `--name`?
5. [ ] docker-compose slide: many containers / file vs a long `docker run` — one sentence.
6. [ ] `*-slim`: minimal packages; needs **Unix** to extend.
7. [ ] `*-alpine`: Alpine Linux Project; built for containers; **tiny**; teams leaving (compat, hard to debug); recommended if **space** is a concern.
8. [ ] Full `python:x.x.x`: stable **Debian**; start of project, quick, size not a worry; **safest** choice. Course uses **3.8** full.
9. [ ] Interview: Docker image vs [wheel/sdist](../18. packaging/theory.md) vs freezer — when would you pick each (one line each)?
10. [ ] Combined: seven ship options; six Dockerfile instructions from memory; build/run flags; full vs slim vs alpine table; safest = full Debian.
