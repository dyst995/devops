# Storage drivers — Questions

Cover the Answers section. Answer first, then check.

1. What does Union FS do with branches? Same path in two branches?
2. Recite CoW: read of a lower-layer file? First modify?
3. Which layers are read-only? What is the thin r/w layer for? Where do new files go? Where does a read of CentOS base go?
4. Recite the four image layers from the figure (bottom to top).
5. 5 GB file, one-byte change — what gets copied? What happens on commit? Preferred image size?

---

## Answers

1. Overlay them into one coherent filesystem. Seen together in one merged directory.
2. Use the existing file (no copy). Copy into that layer, then edit the copy.
3. All **image** layers. The **delta** (container vs image). Thin r/w. The read-only CentOS layer.
4. CentOS base · CentOS updates · Java · Tomcat.
5. The **whole 5 GB** into r/w. Those 5 GB join the layer chain. About **100 MB**; watch writes.
