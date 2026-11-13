/** View-only cartilage set — BodyParts3D meshes (CC BY 4.0). Not a quiz subject. */

export type CartilageRegion = 'thorax' | 'spine' | 'nose' | 'larynx'

export const CARTILAGE_REGIONS: { id: CartilageRegion; label: string }[] = [
  { id: 'thorax', label: 'Ribs' },
  { id: 'spine', label: 'Spine' },
  { id: 'nose', label: 'Nose' },
  { id: 'larynx', label: 'Larynx' },
]

export type CartilageItem = {
  id: string
  region: CartilageRegion
  meshNames: string[]
  displayName: string
  aliases: string[]
}

const ORD = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
] as const

const ORD_WORD = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
] as const

function costal(n: number): CartilageItem {
  const ord = ORD[n - 1]!
  const word = ORD_WORD[n - 1]!
  return {
    id: `costal${n}`,
    region: 'thorax',
    meshNames: [`costal_l${n}`, `costal_r${n}`],
    displayName: `${ord} costal cartilage`,
    aliases: [
      `${ord} costal cartilage`,
      `${word} costal cartilage`,
      `costal cartilage ${n}`,
      `rib cartilage ${n}`,
      `${ord} rib cartilage`,
      `${word} rib cartilage`,
      `left ${ord} costal cartilage`,
      `right ${ord} costal cartilage`,
      `left ${word} costal cartilage`,
      `right ${word} costal cartilage`,
    ],
  }
}

function disc(id: string, label: string, mesh: string, extra: string[] = []): CartilageItem {
  return {
    id,
    region: 'spine',
    meshNames: [mesh],
    displayName: `${label} disc`,
    aliases: [
      `${label} disc`,
      `${label} disk`,
      `${label} intervertebral disc`,
      `${label} intervertebral disk`,
      `intervertebral disc ${label}`,
      `intervertebral disk ${label}`,
      ...extra,
    ],
  }
}

export const CARTILAGE: CartilageItem[] = [
  costal(1),
  costal(2),
  costal(3),
  costal(4),
  costal(5),
  costal(6),
  costal(7),
  disc('disc_c2_c3', 'C2–C3', 'disc_c2_c3', ['axis disc', 'disc of axis', 'C2 C3 disc', 'C2/C3']),
  disc('disc_c3_c4', 'C3–C4', 'disc_c3_c4', ['C3 disc', 'C3 C4 disc', 'C3/C4']),
  disc('disc_c4_c5', 'C4–C5', 'disc_c4_c5', ['C4 disc', 'C4 C5 disc', 'C4/C5']),
  disc('disc_c5_c6', 'C5–C6', 'disc_c5_c6', ['C5 disc', 'C5 C6 disc', 'C5/C6']),
  disc('disc_c6_c7', 'C6–C7', 'disc_c6_c7', ['C6 disc', 'C6 C7 disc', 'C6/C7']),
  disc('disc_c7_t1', 'C7–T1', 'disc_c7_t1', ['C7 disc', 'C7 T1 disc', 'C7/T1']),
  disc('disc_t1_t2', 'T1–T2', 'disc_t1_t2', ['T1 disc', 'T1 T2 disc', 'T1/T2']),
  disc('disc_t2_t3', 'T2–T3', 'disc_t2_t3', ['T2 disc', 'T2 T3 disc', 'T2/T3']),
  disc('disc_t3_t4', 'T3–T4', 'disc_t3_t4', ['T3 disc', 'T3 T4 disc', 'T3/T4']),
  disc('disc_t4_t5', 'T4–T5', 'disc_t4_t5', ['T4 disc', 'T4 T5 disc', 'T4/T5']),
  disc('disc_t5_t6', 'T5–T6', 'disc_t5_t6', ['T5 disc', 'T5 T6 disc', 'T5/T6']),
  disc('disc_t6_t7', 'T6–T7', 'disc_t6_t7', ['T6 disc', 'T6 T7 disc', 'T6/T7']),
  disc('disc_t7_t8', 'T7–T8', 'disc_t7_t8', ['T7 disc', 'T7 T8 disc', 'T7/T8']),
  disc('disc_t8_t9', 'T8–T9', 'disc_t8_t9', ['T8 disc', 'T8 T9 disc', 'T8/T9']),
  disc('disc_t9_t10', 'T9–T10', 'disc_t9_t10', ['T9 disc', 'T9 T10 disc', 'T9/T10']),
  disc('disc_t10_t11', 'T10–T11', 'disc_t10_t11', ['T10 disc', 'T10 T11 disc', 'T10/T11']),
  disc('disc_t11_t12', 'T11–T12', 'disc_t11_t12', ['T11 disc', 'T11 T12 disc', 'T11/T12']),
  disc('disc_t12_l1', 'T12–L1', 'disc_t12_l1', [
    'T12 disc',
    'T12 L1 disc',
    'T12/L1',
    'thoracolumbar disc',
  ]),
  disc('disc_l1_l2', 'L1–L2', 'disc_l1_l2', ['L1 disc', 'L1 L2 disc', 'L1/L2']),
  disc('disc_l2_l3', 'L2–L3', 'disc_l2_l3', ['L2 disc', 'L2 L3 disc', 'L2/L3']),
  disc('disc_l3_l4', 'L3–L4', 'disc_l3_l4', ['L3 disc', 'L3 L4 disc', 'L3/L4']),
  disc('disc_l4_l5', 'L4–L5', 'disc_l4_l5', ['L4 disc', 'L4 L5 disc', 'L4/L5']),
  disc('disc_l5_s1', 'L5–S1', 'disc_l5_s1', [
    'L5 disc',
    'L5 S1 disc',
    'L5/S1',
    'lumbosacral disc',
  ]),
  {
    id: 'nasal_alar',
    region: 'nose',
    meshNames: ['nasal_alar_l', 'nasal_alar_r'],
    displayName: 'major alar cartilage',
    aliases: [
      'major alar cartilage',
      'alar cartilage',
      'greater alar cartilage',
      'lower lateral cartilage',
      'left major alar cartilage',
      'right major alar cartilage',
    ],
  },
  {
    id: 'nasal_lateral',
    region: 'nose',
    meshNames: ['nasal_lateral_l', 'nasal_lateral_r'],
    displayName: 'lateral nasal cartilage',
    aliases: [
      'lateral nasal cartilage',
      'upper lateral cartilage',
      'left lateral nasal cartilage',
      'right lateral nasal cartilage',
    ],
  },
  {
    id: 'nasal_septal',
    region: 'nose',
    meshNames: ['nasal_septal'],
    displayName: 'septal nasal cartilage',
    aliases: [
      'septal nasal cartilage',
      'nasal septum cartilage',
      'quadrate cartilage',
      'cartilaginous septum',
    ],
  },
  {
    id: 'thyroid_cartilage',
    region: 'larynx',
    meshNames: ['thyroid_cartilage'],
    displayName: 'thyroid cartilage',
    aliases: ['thyroid cartilage', 'adam’s apple', "adam's apple", 'laryngeal prominence'],
  },
  {
    id: 'cricoid',
    region: 'larynx',
    meshNames: ['cricoid'],
    displayName: 'cricoid cartilage',
    aliases: ['cricoid cartilage', 'cricoid'],
  },
  {
    id: 'arytenoid',
    region: 'larynx',
    meshNames: ['arytenoid_l', 'arytenoid_r'],
    displayName: 'arytenoid cartilage',
    aliases: [
      'arytenoid cartilage',
      'arytenoids',
      'left arytenoid cartilage',
      'right arytenoid cartilage',
    ],
  },
  {
    id: 'corniculate',
    region: 'larynx',
    meshNames: ['corniculate_l', 'corniculate_r'],
    displayName: 'corniculate cartilage',
    aliases: [
      'corniculate cartilage',
      'corniculate cartilages',
      'cartilages of santorini',
      'left corniculate cartilage',
      'right corniculate cartilage',
    ],
  },
  {
    id: 'cuneiform',
    region: 'larynx',
    meshNames: ['cuneiform_l', 'cuneiform_r'],
    displayName: 'cuneiform cartilage',
    aliases: [
      'cuneiform cartilage',
      'cuneiform cartilages',
      'cartilages of wrisberg',
      'left cuneiform cartilage',
      'right cuneiform cartilage',
    ],
  },
  {
    id: 'epiglottis',
    region: 'larynx',
    meshNames: ['epiglottis'],
    displayName: 'epiglottis',
    aliases: ['epiglottis', 'epiglottic cartilage'],
  },
]

export function getCartilage(id: string): CartilageItem | undefined {
  return CARTILAGE.find((c) => c.id === id)
}
