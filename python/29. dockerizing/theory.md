# Dockerizing

## Packaging for python application

Ways to ship a Python application (course list):

- Python’s **native packaging** (**wheel**, **archive**). See [packaging](../18. packaging/theory.md) (`bdist_wheel`, `sdist`).
- **System Package**, **RPM** or **DEB**.
- **Conda Package**.
- **Freezers** (**PyInstaller**, **PyOxidize**).
- **Container image** (**Docker**)
- **Virtual machines**
- **Hardware** (drag and plug).

**Memory hook:** wheel/sdist · rpm/deb · conda · freezer · **Docker** · VM · hardware. This topic is the **container** line.

## Dockerizing Python application

### Dockerfile

```dockerfile
# set base image (host OS)
FROM python:3.8
# set the working directory in the container
WORKDIR /code
# copy the dependencies file to the working directory
COPY requirements.txt .
# install dependencies
RUN pip install -r requirements.txt
# copy the content of the local src directory to the working directory
COPY src/ .
# command to run on container start
CMD [ "python", "./server.py" ]
```

| Instruction | Course comment |
| --- | --- |
| `FROM python:3.8` | set **base image** (host OS) |
| `WORKDIR /code` | set the **working directory** in the container |
| `COPY requirements.txt .` | copy the **dependencies** file to the working directory |
| `RUN pip install -r requirements.txt` | **install** dependencies |
| `COPY src/ .` | copy the content of the local **src** directory to the working directory |
| `CMD [ "python", "./server.py" ]` | command to run on **container start** |

Copy **`requirements.txt` first**, then `pip install`, then **`src/`**. That way a code-only change does not redo the install layer.

**Memory hook:** `FROM` → `WORKDIR` → `COPY` reqs → `RUN pip` → `COPY src` → `CMD python ./server.py`.

### Run application

```bash
$ docker build -t my-python-app .
$ docker run -it --rm --name my-running-app my-python-app
```

- **`docker build -t my-python-app .`** — build the image, tag **`my-python-app`**, context **`.`**
- **`docker run -it --rm --name my-running-app my-python-app`** — run it **interactive** (`-it`), **remove** the container on exit (`--rm`), name **`my-running-app`**

**Memory hook:** **build** `-t` tag · **run** `-it --rm --name`.

## docker-compose

Course slide: **docker-compose**.

Compose is how you declare **one or more** containers (app + extras) in a file instead of a long `docker run`. The slide is the figure; this topic’s runnable example is still the **Dockerfile** + **build** / **run** above.

## Base Python image

### `*-slim`

This image generally only installs the **minimal packages** needed to run your particular tool. It requires **Unix knowledge** to configure and extend it according to application needs.

### `*-alpine`

**Alpine** images are based on the **Alpine Linux Project**, which is an operating system that was built specifically for use **inside containers**. For a long time, these were the most popular image variations due to their **tiny size**. However, some teams are **moving away** from alpine because these images can cause **compatibility issues** that are hard to debug. This image is the most highly recommended **if space is a concern**.

### full official image: `python:x.x.x`

These images are based on the most recent **stable Debian** operating system release. It is good to use them at the **start of the project** when trying to get a project up and running **quickly** and when you are **not concerned about the size** of the resulting image. The **full image is the safest choice**.

| Tag | Course meaning |
| --- | --- |
| `python:3.8` (full, `python:x.x.x`) | Latest stable **Debian**. Fast start, **safest**, size OK. Course Dockerfile uses this. |
| `*-slim` | **Minimal** packages. Needs Unix to extend. |
| `*-alpine` | **Tiny**; Alpine Linux. Best if **space** matters; can be **hard to debug** (compat). |

**Memory hook:** **full = safest** (Debian). **slim = minimal** (you configure). **alpine = smallest** (compat risk).
