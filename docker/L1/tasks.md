# L1 — Practical tasks

Work on the **course VM**. After **all** tasks, run `checkup-basics`. It checks your work and prints **secret phrases**. Enter each phrase in the course fields under the matching task.

Do not use this file as a command list. The course already names the images and messages you must use. You choose the flags.

Write outputs only where a path is given. Each of those lines starts on a **new line**.

---

## Task 1 — Engine on the VM

1. [ ] Install Docker Engine. Prove it is installed.
2. [ ] Check the Docker **version**.
3. [ ] Run `docker --help` and confirm usage help appears.
4. [ ] Confirm the **docker service** is up and running.
5. [ ] Add user **`debian`** to the **`docker`** group so you can run Docker **without `sudo`**. Re-login to the VM if the group does not apply yet.

---

## Task 2 — busybox image and containers

1. [ ] Download the **`busybox`** image from the registry.
2. [ ] Print a list of **all images**.
3. [ ] Run a **busybox** container. See what happens, and think **why**.
4. [ ] Run busybox again so it prints `hey from busybox container` using `echo 'hey from busybox container'`.
5. [ ] Run `docker ps`. Read the output. Think what it is showing (and what it is **not**).
6. [ ] Print a list of **all** containers (not only running).

---

## Task 3 — Names and conflicts

1. [ ] Start a new container from **busybox** named **`busybox-container-1`**.
2. [ ] List **all** containers. Compare names from Task 2 vs this name.
3. [ ] Start **another** busybox container with the **same** name `busybox-container-1` and print `My named container`. You should get a **name conflict**. **Remove** `busybox-container-1`, then start it again with that name and print `My named container`.
4. [ ] List **all** containers. The **COMMAND** column should differ from the earlier unnamed/echo runs.
5. [ ] Recreate the **conflict**, but **do not delete** the second container. **Rename** it to **`busybox-container-2`**.
6. [ ] List **all** containers. **Names** differ; **COMMANDs** should match.

---

## Task 4 — Interactive and one-shot remove

1. [ ] Start **`Interactive-container`** from busybox in **interactive** mode. Inside, use **`sh`**. Run `ls` and `echo 'WoW! I am in a container!!!'`.
2. [ ] Start **`Remove-container`** from busybox, run `echo 'container will be removed'`, and **remove it** — **one** command. Prove the container **does not exist**.

---

## Task 5 — Detached getting-started + inspect

1. [ ] Start **`docker/getting-started`** in **detached** mode. Publish container port **80** to host port **80**. Do **not** use `--rm`. In a browser, open the Getting Started tutorial.
2. [ ] List **running** containers. This one must be **Up**.
3. [ ] From that container, get **full Id**, **Pid**, **IPAddress**, **MacAddress**. Save them to **`/opt/docker/basics/task5/task5.txt`**, one field per line, in this shape (values will differ):

```text
"Id": "c61c9d913dc9882c4523ee7dd90917995ad99bce4f6c1c5c562b9dd1b6b9ec95"
"Pid": 859
"IPAddress": "172.17.0.2"
"MacAddress": "02:42:ac:11:00:02"
```

4. [ ] **Stop** that container.

---

## Task 6 — Kernel: VM vs container

1. [ ] Kernel version on the **VM**.
2. [ ] Start a **busybox** container and check the kernel version **inside** it.
3. [ ] Save step 1 and step 2 to **`/opt/docker/basics/task6/task6.txt`**, each on a new line.
4. [ ] Compare the two versions. Why do they look that way? (Host kernel — earlier notes.)

---

## Task 7 — PID namespace

1. [ ] Start **two** containers from **`nginx:alpine`**, **detached**, **removed on stop**, named **`SRV1`** and **`SRV2`**.
2. [ ] Attach to **SRV1** interactively. `ps` — nginx PIDs **inside** the container.
3. [ ] Same for **SRV2**.
4. [ ] nginx PIDs as seen on the **VM**.
5. [ ] Compare **master** PIDs of SRV1 vs SRV2 (as seen **inside** each container). Write **`EQUAL`** or **`DIFF`** to **`/opt/docker/basics/task7/task7_1.txt`**.
6. [ ] **Stop SRV1** (it should disappear).
7. [ ] Start **SRV1** again from **`nginx:alpine`**, detached, remove-on-stop, in the **same PID namespace as SRV2**.
8. [ ] Attach to SRV1. `ps` — nginx PIDs.
9. [ ] Compare those **master** PIDs. Write **`EQUAL`** or **`DIFF`** to **`/opt/docker/basics/task7/task7_2.txt`**.

---

## After all tasks

```text
checkup-basics
```

Copy the secret phrases into the course form.
