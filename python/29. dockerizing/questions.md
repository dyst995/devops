# Dockerizing — Questions

Cover the Answers section. Answer first, then check.

1. Recite the seven packaging options (native, system, conda, freezers, container, VM, hardware). Two freezer names? Native formats?
2. Recite the Dockerfile (six instructions + course comments). Why copy `requirements.txt` before `src/`?
3. Two run commands (`build` tag, `run` flags and names)?
4. What is the docker-compose slide (idea)?
5. `*-slim` — how much is installed? What knowledge do you need?
6. `*-alpine` — based on what? Why popular? Why are teams leaving? When most recommended?
7. Full `python:x.x.x` — OS? When to use? Safest?

---

## Answers

1. Wheel/archive · RPM/DEB · Conda · PyInstaller, PyOxidize · Docker · VMs · hardware drag-and-plug.
2. `FROM python:3.8` · `WORKDIR /code` · `COPY requirements.txt .` · `RUN pip install -r requirements.txt` · `COPY src/ .` · `CMD ["python", "./server.py"]`. Install layer stays cached when only code changes.
3. `docker build -t my-python-app .` · `docker run -it --rm --name my-running-app my-python-app`
4. Multi-container / file instead of only `docker run` (figure on the slide).
5. Minimal packages for the tool. Unix, to configure and extend.
6. Alpine Linux Project; built for containers. Tiny size. Compatibility issues, hard to debug. When **space** is a concern.
7. Recent stable **Debian**. Start of project, get running quickly, size not a worry. Yes — safest choice.
