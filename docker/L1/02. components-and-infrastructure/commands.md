# Commands to memorize

```text
# start a service — daemon accepts options, then:
#   docker (daemon) → containerd → containerd-shim → runC (exits) → shim watches

docker                 # daemon: UX, highest-level Docker product
docker-containerd      # UNIX socket + gRPC: storage, images, networks, containers
docker-containerd-shim # between containerd and runC; stays after runC exits
docker-runc            # run the container: cgroups, namespaces
docker-proxy           # container ports → host interface
```
