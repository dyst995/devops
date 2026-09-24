# Commands to memorize

```bash
docker build …               # run the Dockerfile → image (immutable snapshot)
docker run …                 # image → create/start a container
# store: Docker Registry (https://hub.docker.com)
# send:  layers — only missing layers go over the network
docker pull                  # fetch image (and missing layers) from registry
docker push                  # send image layers to registry
```
