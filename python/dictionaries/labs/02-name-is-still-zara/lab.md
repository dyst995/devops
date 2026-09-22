# Name is still Zara

`{'Name': 'Zara', 'Name': 'Manni'}` should print **Manni** (keys unique, last wins). A second dict uses a **list** as a key and must raise `TypeError: unhashable type: 'list'`.

After `del d['Name']`, `clear()`, then `del d`, `print(d['Age'])` is **`NameError`**.

**Goal:** Manni, unhashable list, then NameError after deleting the whole dict — three different failures from the notes.
