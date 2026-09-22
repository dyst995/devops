# Commands to memorize

```text
Ship a Python app
  native: wheel, archive
  system: RPM, DEB
  Conda
  freezers: PyInstaller, PyOxidize
  container: Docker
  VMs
  hardware (drag and plug)
```

```dockerfile
FROM python:3.8
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ .
CMD [ "python", "./server.py" ]
```

```bash
docker build -t my-python-app .
docker run -it --rm --name my-running-app my-python-app
```

```text
python:x.x.x   full Debian — safest; quick start; size OK
*-slim         minimal packages — needs Unix to extend
*-alpine       tiny Alpine — space; compat issues (hard to debug)
```
