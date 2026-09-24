# Commands to memorize

```bash
# Client → daemon (REST API over UNIX socket or network)
docker run …                 # client sends; daemon runs a container (pulls image if needed)
docker pull                  # daemon fetches image from configured registry
docker push                  # daemon uploads image to configured registry

# Same host or remote daemon — client can talk to more than one daemon
# Default registry: Docker Hub
# Dockerfile --build--> Image --run--> Container
# Image --push--> Registry --pull--> Image
```
