/**
 * View-only ligaments, tendons, and other soft tissue.
 * Not a quiz subject, and no new Rehab or Sport cards are attached here.
 */

export type TissueKind = 'ligament' | 'tendon' | 'fascia'

export type TissueRegion = 'ankle' | 'foot' | 'leg' | 'wrist'

export const TISSUE_REGIONS: { id: TissueRegion; label: string }[] = [
  { id: 'ankle', label: 'Ankle' },
  { id: 'foot', label: 'Foot' },
  { id: 'leg', label: 'Leg' },
  { id: 'wrist', label: 'Wrist' },
]

export type TissueItem = {
  id: string
  kind: TissueKind
  region: TissueRegion
  meshNames: string[]
  displayName: string
  aliases: string[]
}

const LR = (key: string): string[] => [`${key}_l`, `${key}_r`]

function item(
  id: string,
  kind: TissueKind,
  region: TissueRegion,
  meshNames: string[],
  displayName: string,
  aliases: string[],
): TissueItem {
  return { id, kind, region, meshNames, displayName, aliases }
}

/** Packed ligaments, tendons, and fascia that can be shown in View. */
export const TISSUE: TissueItem[] = [
  item('atfl', 'ligament', 'ankle', LR('atfl'), 'anterior talofibular ligament', [
    'anterior talofibular ligament',
    'ATFL',
    'anterior talo-fibular ligament',
    'anterior talofibular',
    'left anterior talofibular ligament',
    'right anterior talofibular ligament',
  ]),
  item('cfl', 'ligament', 'ankle', LR('cfl'), 'calcaneofibular ligament', [
    'calcaneofibular ligament',
    'CFL',
    'calcaneo-fibular ligament',
    'calcaneofibular',
    'left calcaneofibular ligament',
    'right calcaneofibular ligament',
  ]),
  item('ptfl', 'ligament', 'ankle', LR('ptfl'), 'posterior talofibular ligament', [
    'posterior talofibular ligament',
    'PTFL',
    'posterior talo-fibular ligament',
    'posterior talofibular',
    'left posterior talofibular ligament',
    'right posterior talofibular ligament',
  ]),
  item('aitfl', 'ligament', 'ankle', LR('aitfl'), 'anterior tibiofibular ligament', [
    'anterior tibiofibular ligament',
    'AITFL',
    'anterior inferior tibiofibular ligament',
    'AITFL ligament',
    'high ankle ligament',
    'syndesmotic ligament',
    'anterior tibio-fibular ligament',
    'left anterior tibiofibular ligament',
    'right anterior tibiofibular ligament',
  ]),
  item('pitfl', 'ligament', 'ankle', LR('pitfl'), 'posterior tibiofibular ligament', [
    'posterior tibiofibular ligament',
    'PITFL',
    'posterior inferior tibiofibular ligament',
    'posterior tibio-fibular ligament',
    'left posterior tibiofibular ligament',
    'right posterior tibiofibular ligament',
  ]),
  item('trans_tibfib', 'ligament', 'ankle', LR('trans_tibfib'), 'transverse tibiofibular ligament', [
    'transverse tibiofibular ligament',
    'transverse inferior tibiofibular ligament',
    'inferior transverse ligament',
    'transverse tibio-fibular ligament',
    'left transverse tibiofibular ligament',
    'right transverse tibiofibular ligament',
  ]),
  item('deltoid_ligament', 'ligament', 'ankle', LR('deltoid'), 'deltoid ligament', [
    'deltoid ligament',
    'medial ligament of ankle',
    'medial ankle ligament',
    'tibionavicular ligament',
    'tibiocalcaneal ligament',
    'posterior tibiotalar ligament',
    'left deltoid ligament',
    'right deltoid ligament',
  ]),
  item('long_plantar', 'ligament', 'foot', LR('long_plantar'), 'long plantar ligament', [
    'long plantar ligament',
    'long plantar',
    'plantar tarsal ligament',
    'left long plantar ligament',
    'right long plantar ligament',
  ]),
  item('calcaneal_tendon', 'tendon', 'leg', LR('calcaneal'), 'calcaneal tendon', [
    'calcaneal tendon',
    'Achilles tendon',
    'Achilles',
    'tendo calcaneus',
    'heel tendon',
    'left calcaneal tendon',
    'right calcaneal tendon',
    'left Achilles tendon',
    'right Achilles tendon',
  ]),
  item('it_tract', 'fascia', 'leg', LR('it_tract'), 'iliotibial tract', [
    'iliotibial tract',
    'iliotibial band',
    'IT band',
    'ITB',
    'IT tract',
    'fascia lata tract',
    'left iliotibial tract',
    'right iliotibial tract',
    'left IT band',
    'right IT band',
  ]),
  item('flexor_retinaculum_wrist', 'fascia', 'wrist', LR('flex_retinac'), 'flexor retinaculum of wrist', [
    'flexor retinaculum of wrist',
    'flexor retinaculum',
    'transverse carpal ligament',
    'TCL',
    'carpal flexor retinaculum',
    'left flexor retinaculum of wrist',
    'right flexor retinaculum of wrist',
  ]),
]

export const TISSUE_BY_ID = new Map(TISSUE.map((item) => [item.id, item]))

export function isTissueMeshKind(kind: string): boolean {
  return kind === 'ligament' || kind === 'tendon' || kind === 'fascia'
}
