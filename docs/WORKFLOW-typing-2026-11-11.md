# Workflow: typing experience + muscle success — 2026-11-11

Goal: Make type-it feel correct on muscles: a right answer succeeds, a wrong letter shows a signal while typing, and the cursor sits on the current letter instead of at the end of the blanks. Then test it myself.

Steps:
1. Inspect muscle names + answer-matching (why "correct" answers may not succeed).
2. Inspect typing UI (cursor at end of blanks; no mid-type wrong-letter feedback).
3. Fix matching if broken; move cursor onto the current letter; show a wrong signal on a bad letter.
4. Rebuild, then test myself in the preview (muscles Memory, including vastus medialis / trapezius cases from Yestin's screenshots).
5. If the test passes, publish the same fix to the public Pages site.

Files:
- /workspace/anatomy-3d/src/main.ts
- /workspace/anatomy-3d/src/style.css
- /workspace/anatomy-3d/src/data/muscles.ts
- /workspace/anatomy-3d/docs/WORKFLOW-typing-2026-11-11.md

Done check:
- Correct muscle names (e.g. vastus medialis, trapezius) show success.
- A wrong letter mid-word (e.g. "vactus") shows a wrong signal and does not succeed.
- Cursor is on the letter being typed, not parked at the end of the underline.
- Self-tested in preview.
