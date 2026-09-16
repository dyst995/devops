# Keep a unit down despite enable

Do not disable sshd if that is your only login.

Someone keeps turning a lab unit on after you told it not to start — including after package scripts run.

**Goal:** Stronger than a normal “off at boot”: it must not start until you reverse the block. Then reverse it.
