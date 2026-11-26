import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import assert from 'node:assert/strict'
import { MUSCLES, VIEW_ONLY_MUSCLES, allViewMuscles, COMMON_MUSCLE_IDS, filterCommonMuscles, filterMuscles, muscleVisibleAtLayer, MUSCLE_REGIONS } from '../src/data/muscles.ts'
import { TISSUE } from '../src/data/tissue.ts'
import { getTissueView, getMuscleView } from '../src/data/viewInfo.ts'
import { catalogCoverage, viewForMuscleId, viewForTissueId } from '../src/data/anatomicalViews.ts'
import { isTissueMeshKind } from '../src/data/tissue.ts'
import { ANKLE_LIGAMENT_MESHES, ANKLE_FRAME_MESHES } from '../src/data/ankleSprain.ts'
import { CARTILAGE } from '../src/data/cartilage.ts'
import { getCartilageView } from '../src/data/viewInfo.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const main = readFileSync(path.join(root, 'src/main.ts'), 'utf8')
const css = readFileSync(path.join(root, 'src/style.css'), 'utf8')
const pack = readFileSync(path.join(root, 'scripts/pack-models.mjs'), 'utf8')

function assertFile(rel: string) {
  const buf = readFileSync(path.join(root, 'public', rel.replace(/^\//, '')))
  assert.ok(buf.length > 12, rel + ' is empty')
  assert.equal(buf.subarray(0, 4).toString(), 'glTF', rel + ' is not a GLB')
}

// --- catalog ---
const ids = TISSUE.map((t) => t.id)
assert.deepEqual(
  ids,
  ['atfl', 'cfl', 'ptfl', 'aitfl', 'pitfl', 'trans_tibfib', 'deltoid_ligament', 'cervical_ligament', 'interosseous_talocalcaneal', 'flexor_retinaculum_ankle', 'long_plantar', 'spring_ligament', 'bifurcate', 'dorsal_tarsometatarsal', 'plantar_tarsometatarsal', 'cuneometatarsal_interosseous', 'acl', 'pcl', 'lcl', 'calcaneal_tendon', 'it_tract', 'flexor_retinaculum_wrist'],
)
assert.equal(new Set(ids).size, ids.length, 'tissue ids are unique')
assert.ok(!ids.includes('deltoid'), 'deltoid ligament must not use the muscle id')

const byId = Object.fromEntries(TISSUE.map((t) => [t.id, t]))
assert.deepEqual(byId.atfl.meshNames, ['atfl_l', 'atfl_r'])
assert.deepEqual(byId.cfl.meshNames, ['cfl_l', 'cfl_r'])
assert.deepEqual(byId.deltoid_ligament.meshNames, ['deltoid_l', 'deltoid_r'])
assert.equal(byId.calcaneal_tendon.kind, 'tendon')
assert.equal(byId.it_tract.kind, 'fascia')
assert.equal(byId.flexor_retinaculum_wrist.kind, 'fascia')
assert.ok(byId.calcaneal_tendon.aliases.some((a) => /achilles/i.test(a)))
assert.ok(byId.it_tract.aliases.some((a) => a === 'IT band'))
assert.ok(byId.flexor_retinaculum_wrist.aliases.some((a) => /transverse carpal/i.test(a)))
assert.equal(byId.flexor_retinaculum_ankle.kind, 'fascia')
assert.equal(byId.flexor_retinaculum_ankle.region, 'ankle')
assert.ok(byId.flexor_retinaculum_ankle.aliases.some((a) => /laciniate/i.test(a)))
assert.equal(byId.spring_ligament.region, 'foot')
assert.ok(byId.spring_ligament.aliases.some((a) => /spring/i.test(a)))
assert.equal(byId.acl.region, 'knee')
assert.equal(byId.pcl.region, 'knee')
assert.equal(byId.lcl.region, 'knee')
assert.ok(byId.acl.aliases.includes('ACL'))
assert.ok(byId.lcl.aliases.some((a) => /lateral collateral/i.test(a)))
assert.deepEqual(byId.acl.meshNames, ['acl_l', 'acl_r'])
assert.ok(byId.dorsal_tarsometatarsal.aliases.some((a) => /Lisfranc/i.test(a)))

assert.ok(byId.deltoid_ligament.aliases.includes('deltoid ligament'))
assert.ok(!byId.deltoid_ligament.aliases.includes('deltoid'))

for (const item of TISSUE) {
  const info = getTissueView(item.id)
  assert.ok(info, 'missing TISSUE_VIEW for ' + item.id)
  assert.ok((info.description ?? '').length > 40, item.id + ' description is short')
  assert.ok(viewForTissueId(item.id))
}

// packed files exist
const publicFiles = [
  'models/extra/tendons/calcaneal_r.glb',
  'models/extra/tendons/calcaneal_l.glb',
  'models/extra/tissue/it_tract_r.glb',
  'models/extra/tissue/it_tract_l.glb',
  'models/extra/tissue/flex_retinac_r.glb',
  'models/extra/tissue/flex_retinac_l.glb',
  'models/extra/ligaments/long_plantar_r.glb',
  'models/extra/ligaments/long_plantar_l.glb',
  'models/extra/ligaments/ptfl_r.glb',
  'models/extra/ligaments/ptfl_l.glb',
  'models/extra/ligaments/aitfl_r.glb',
  'models/extra/ligaments/aitfl_l.glb',
  'models/extra/ligaments/pitfl_r.glb',
  'models/extra/ligaments/pitfl_l.glb',
  'models/extra/ligaments/trans_tibfib_r.glb',
  'models/extra/ligaments/trans_tibfib_l.glb',
  'models/extra/muscles/masseter_sup_r.glb',
  'models/extra/muscles/masseter_deep_r.glb',
  'models/extra/muscles/temporalis_r.glb',
  'models/extra/muscles/masseter_sup_l.glb',
  'models/extra/muscles/masseter_deep_l.glb',
  'models/extra/muscles/temporalis_l.glb',
  'models/extra/ligaments/spring_r.glb',
  'models/extra/ligaments/spring_l.glb',
  'models/extra/ligaments/bifurcate_r.glb',
  'models/extra/ligaments/bifurcate_l.glb',
  'models/extra/ligaments/cervical_talocalc_r.glb',
  'models/extra/ligaments/cervical_talocalc_l.glb',
  'models/extra/ligaments/io_talocalc_r.glb',
  'models/extra/ligaments/io_talocalc_l.glb',
  'models/extra/ligaments/dorsal_tmt_r.glb',
  'models/extra/ligaments/dorsal_tmt_l.glb',
  'models/extra/ligaments/plantar_tmt_r.glb',
  'models/extra/ligaments/plantar_tmt_l.glb',
  'models/extra/ligaments/cuneometatarsal_io_r.glb',
  'models/extra/ligaments/cuneometatarsal_io_l.glb',
  'models/extra/ligaments/acl_r.glb',
  'models/extra/ligaments/acl_l.glb',
  'models/extra/ligaments/pcl_r.glb',
  'models/extra/ligaments/pcl_l.glb',
  'models/extra/ligaments/lcl_r.glb',
  'models/extra/ligaments/lcl_l.glb',
  'models/extra/tissue/flex_retinac_ankle_r.glb',
  'models/extra/tissue/flex_retinac_ankle_l.glb',
  'models/extra/muscles/edb_r.glb',
  'models/extra/muscles/edb_l.glb',
  'models/extra/cartilage/med_meniscus_r.glb',
  'models/extra/cartilage/med_meniscus_l.glb',
  'models/extra/cartilage/lat_meniscus_r.glb',
  'models/extra/cartilage/lat_meniscus_l.glb',
]
for (const f of publicFiles) assertFile(f)

for (const manifest of [
  'models/extra/ligaments/manifest.json',
  'models/extra/tendons/manifest.json',
  'models/extra/tissue/manifest.json',
  'models/extra/cartilage/manifest.json',
  'models/extra/muscles/manifest.json',
]) {
  const urls: string[] = JSON.parse(readFileSync(path.join(root, 'public', manifest), 'utf8'))
  assert.ok(urls.length > 0, manifest + ' empty')
  for (const url of urls) assertFile(url.replace(/^\//, ''))
}

// --- view-only muscles stay out of the quiz ---
assert.ok(VIEW_ONLY_MUSCLES.some((m) => m.id === 'masseter'))
assert.ok(VIEW_ONLY_MUSCLES.some((m) => m.id === 'temporalis'))
assert.ok(VIEW_ONLY_MUSCLES.some((m) => m.id === 'extensor_digitorum_brevis'))
assert.ok(!MUSCLES.some((m) => m.id === 'masseter' || m.id === 'temporalis' || m.id === 'extensor_digitorum_brevis'))
assert.ok(!COMMON_MUSCLE_IDS.includes('masseter'))
assert.ok(!COMMON_MUSCLE_IDS.includes('temporalis'))
assert.ok(!COMMON_MUSCLE_IDS.includes('extensor_digitorum_brevis'))
assert.ok(!filterCommonMuscles().some((m) => m.id === 'masseter' || m.id === 'extensor_digitorum_brevis'))
for (const r of MUSCLE_REGIONS) {
  assert.ok(!filterMuscles([r.id]).some((m) => m.id === 'masseter' || m.id === 'temporalis' || m.id === 'extensor_digitorum_brevis'))
}
assert.ok(allViewMuscles().some((m) => m.id === 'masseter'))
assert.ok(allViewMuscles().some((m) => m.id === 'extensor_digitorum_brevis'))
assert.ok(getMuscleView('masseter'))
assert.ok(getMuscleView('temporalis'))
assert.ok(getMuscleView('extensor_digitorum_brevis'))
assert.equal(viewForMuscleId('masseter'), 'lateral')
assert.equal(viewForMuscleId('temporalis'), 'lateral')
assert.equal(viewForMuscleId('extensor_digitorum_brevis'), 'anterior')
assert.equal(muscleVisibleAtLayer('edb_r', 'all'), true)
assert.equal(muscleVisibleAtLayer('edb_r', 'mid'), false)
assert.equal(muscleVisibleAtLayer('masseter_sup_r', 'all'), true)
assert.equal(muscleVisibleAtLayer('masseter_sup_r', 'mid'), false)
assert.equal(muscleVisibleAtLayer('masseter_deep_r', 'deep'), true)
assert.equal(muscleVisibleAtLayer('masseter_deep_r', 'mid'), true)
assert.equal(muscleVisibleAtLayer('temporalis_r', 'deep'), false)

const coverage = catalogCoverage()
assert.deepEqual(coverage.unknownOverrides, [])
assert.equal(coverage.muscles, MUSCLES.length)

// --- filter chip ---
assert.ok(main.includes('id="btn-view-tissue"'), 'Tissue chip missing')
assert.ok(main.includes('aria-label="Cartilage and tissue"'), 'Tissue should share the Cartilage group')
const groups = main.match(/<div class="view-filter-group"/g) ?? []
assert.equal(groups.length, 4, 'View should still have four filter groups so the phone 2×2 stays')
assert.match(main, /Both \/ Bones \/ Muscles, All \/ Mid \/ Deep, and the Cartilage and Tissue chips/)
assert.ok(!main.includes('id="btn-view-tissue"') || main.includes('viewTissueVisible'))
assert.ok(pack.includes("name: 'tendons'"))
assert.ok(pack.includes("name: 'tissue'"))

const kinds = ['ligament', 'tendon', 'fascia', 'bone', 'muscle', 'cartilage'] as const
assert.deepEqual(
  kinds.map((k) => [k, isTissueMeshKind(k)]),
  [
    ['ligament', true],
    ['tendon', true],
    ['fascia', true],
    ['bone', false],
    ['muscle', false],
    ['cartilage', false],
  ],
)

// desktop chips stay 32px; no new HUD bar
assert.ok(css.includes('.view-filters:not(.is-quiz) .view-filter-btn'))
assert.ok(!css.includes('.view-tissue-bar'))
assert.ok(!css.includes('#tissue-filters'))


// Ankle Learn/Quiz must still show only the original right ATFL, CFL, and named deltoid.
assert.deepEqual(
  [...ANKLE_LIGAMENT_MESHES],
  ['atfl_r', 'atfl_l', 'cfl_r', 'cfl_l', 'deltoid_r', 'deltoid_l'],
)
const newTissueMeshes = TISSUE.flatMap((item) => item.meshNames).filter(
  (name) => !['atfl_r', 'atfl_l', 'cfl_r', 'cfl_l', 'deltoid_r', 'deltoid_l', 'long_plantar_l', 'long_plantar_r', 'calcaneal_l', 'calcaneal_r', 'it_tract_l', 'it_tract_r', 'flex_retinac_l', 'flex_retinac_r', 'ptfl_l', 'ptfl_r', 'aitfl_l', 'aitfl_r', 'pitfl_l', 'pitfl_r', 'trans_tibfib_l', 'trans_tibfib_r'].includes(name),
)
for (const name of newTissueMeshes) {
  assert.ok(!ANKLE_LIGAMENT_MESHES.includes(name), name + ' must not be case anatomy')
  assert.ok(!ANKLE_FRAME_MESHES.includes(name), name + ' must not enter the ankle frame')
}

assert.ok(CARTILAGE.some((c) => c.id === 'medial_meniscus'))
assert.ok(CARTILAGE.some((c) => c.id === 'lateral_meniscus'))
assert.equal(CARTILAGE.find((c) => c.id === 'medial_meniscus')?.region, 'knee')
assert.ok(getCartilageView('medial_meniscus'))
assert.ok(getCartilageView('lateral_meniscus'))
assert.ok((getCartilageView('medial_meniscus')?.description ?? '').length > 40)

console.log('test-view-tissue: ok', TISSUE.length, 'tissue entries,', VIEW_ONLY_MUSCLES.length, 'view-only muscles')
