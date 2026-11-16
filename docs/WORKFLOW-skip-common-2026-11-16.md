# Workflow — Skip + Common muscle filter (2026-11-16)

Goal: In test, let the user skip when they don't know the name. In the muscle start menu, add an easy Common filter based on Yestin's anatomy notes (not all 132 names).

Steps:
1. Reuse existing `revealAnswer()` (Tab already reveals, counts as a miss, shows the name, advances). Add a visible Skip button in the play HUD so iPhone users can do the same without a Tab key.
2. Add a Common muscle preset from his course notes (list frozen in `src/data/muscles.ts`). Only include muscles already in the pack. Do not invent meshes.
3. Unit tests for the Common list; `npm test` + `npm run build`.
4. Visual QA, then publish to GitHub Pages only after the live index references the new JS hash.

Files:
- `src/main.ts`, `src/style.css` — Skip button, Common chip in muscle Quick filters
- `src/data/muscles.ts` — `COMMON_MUSCLE_IDS` + `filterCommonMuscles` / filter hook
- `scripts/test-answer-match.ts` — Common-list tests
- This workflow doc

Done when: Skip is tappable in bone and muscle tests (all type-it modes), shows the name, does not count as correct, then goes to the next item. Common chip narrows the muscle pool to the notes list and shows a count. Tab still reveals on a keyboard. Start menu with no Common chip still offers All + region chips.

Sources for Common (only names actually in his notes, and only if already in `MUSCLES`):
- HPHS4109 *Connective Tissue and Muscle Tissue*, “Major Skeletal Muscles”: SCM, trapezius, levator scapulae, rhomboid major/minor, serratus anterior, latissimus dorsi, pectoralis major/minor, deltoid, SITS cuff, biceps brachii, coracobrachialis, brachialis, brachioradialis, triceps brachii, rectus abdominis, external/internal oblique, transversus abdominis, erector spinae (iliocostalis, longissimus, spinalis).
- *Anatomy & Physiology for Exercise* slides: flexor carpi radialis/ulnaris, flexor digitorum superficialis/profundus, gastrocnemius, soleus.
- HPHS4107 injury notes / A&P examples: hamstrings (biceps femoris, semitendinosus, semimembranosus), gluteus maximus, quadriceps (rectus femoris + three vasti).

Out of scope: Sport, new meshes, splitting deltoid/trapezius heads, publishing until after QA.
