/**
 * Lisfranc injury. A Rehab case of its own, after high ankle sprain and
 * before Achilles tendinopathy. Facts are the course notes where they
 * exist, and the public sources named on the Learn sources line where the
 * lecture is silent. No new meshes. The packed dorsal, plantar, and
 * interosseous groupings stay as they are.
 */
import { matchAliases, normalizeAnswerText, type AnswerMatchMode } from './answerMatch'

export type LisfrancHit =
  | 'dorsal'
  | 'plantar'
  | 'interosseous'
  | 'bone'
  | 'tendon'
  | 'atfl'
  | 'cfl'
  | 'ptfl'
  | 'deltoid'
  | 'aitfl'
  | 'pitfl'
  | 'trans_tibfib'
  | 'other-foot'
  | 'other'

/** Dorsal is the tap target. Plantar and the interval bands are anatomy. */
export type LisfrancLight = 'dorsal' | 'plantar' | 'interval'

/** Dorsal midfoot, the sole, or a closer look at the interval bands. */
export type LisfrancSpan = 'dorsal' | 'plantar' | 'interval'

export type LisfrancLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  light: LisfrancLight
  span: LisfrancSpan
  motion: boolean
}

export type LisfrancReject = {
  aliases: string[]
  message: string
}

export type LisfrancTypeStep = {
  kind: 'type'
  id: string
  region: string
  prompt: string
  official: string
  aliases: string[]
  hint: string
  reveal: string
  light: LisfrancLight
  span: LisfrancSpan
  /** A finished wrong or incomplete phrase. Not marked correct. */
  rejects?: LisfrancReject[]
}

export type LisfrancTapStep = {
  kind: 'tap'
  id: string
  region: string
  prompt: string
  accept: LisfrancHit[]
  revealName: string
  correct: string
  wrong: Record<LisfrancHit, string>
  light: LisfrancLight
  span: LisfrancSpan
}

export type LisfrancQuizStep = LisfrancTypeStep | LisfrancTapStep

export type LisfrancSourceLink = {
  label: string
  href: string
}

/** Right dorsal pack. This is the official tap target. */
export const LISFRANC_DORSAL_MESHES: readonly string[] = ['dorsal_tmt_r', 'dorsal_tmt_l']

/** Right and left plantar packs. Shown, not tapped. */
export const LISFRANC_PLANTAR_MESHES: readonly string[] = ['plantar_tmt_r', 'plantar_tmt_l']

/**
 * A set of short interval bands. Not a single labelled ligament from the
 * medial cuneiform to the second metatarsal.
 */
export const LISFRANC_INTEROSSEOUS_MESHES: readonly string[] = ['cuneometatarsal_io_r', 'cuneometatarsal_io_l']

/** Midfoot bones kept solid so the joints read. */
export const LISFRANC_MIDFOOT_BONES: readonly string[] = [
  'cuneiform_med_r',
  'cuneiform_int_r',
  'cuneiform_lat_r',
  'cuboid_r',
  'navicular_r',
  'metatarsal1_r',
  'metatarsal2_r',
  'metatarsal3_r',
  'metatarsal4_r',
  'metatarsal5_r',
]

/** Metatarsals whose bases belong in the frame. Shafts are clipped. */
export const LISFRANC_METATARSALS: readonly string[] = [
  'metatarsal1_r',
  'metatarsal2_r',
  'metatarsal3_r',
  'metatarsal4_r',
  'metatarsal5_r',
]

/** Share of each metatarsal, measured from the tarsal end, kept in the frame. */
export const LISFRANC_BASE_FRACTION = 0.28

/** Ankle ligaments and the calcaneal tendon, dim, so a wrong tap has a landing. */
export const LISFRANC_CONTRAST: readonly string[] = [
  'atfl_r',
  'cfl_r',
  'ptfl_r',
  'deltoid_r',
  'aitfl_r',
  'pitfl_r',
  'trans_tibfib_r',
  'calcaneal_r',
]

export const LISFRANC_SOURCE_LINKS: readonly LisfrancSourceLink[] = [
  {
    label: 'Wynter & Grigg, Australian Family Physician 2017',
    href: 'https://www.racgp.org.au/afp/2017/march/lisfranc-injuries',
  },
  {
    label: 'AAOS OrthoInfo, Lisfranc (Midfoot) Injury',
    href: 'https://orthoinfo.aaos.org/en/diseases--conditions/lisfranc-midfoot-injury/',
  },
  {
    label: 'Radiopaedia, Lisfranc injury',
    href: 'https://radiopaedia.org/articles/lisfranc-injury',
  },
  {
    label: 'Radiopaedia, Lisfranc ligament',
    href: 'https://radiopaedia.org/articles/lisfranc-ligament',
  },
  {
    label: 'BOFAS Hyperbook, Lisfranc Injury',
    href: 'https://www.bofas.org.uk/hyperbook/trauma/lisfranc-injury',
  },
  {
    label: 'Welck, Zinchenko & Tudor, The BMJ 2016 (anatomy and the published case only)',
    href: 'https://www.bmj.com/content/352/bmj.i882',
  },
  {
    label: 'Sripanich and colleagues, 2021',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7944543/',
  },
  {
    label: 'DeHeer and colleagues, 2021',
    href: 'https://www.fastracjournal.org/article/S2667-3967(21)00022-7/fulltext',
  },
]

export const LISFRANC_SOURCE_LEAD =
  'Course notes: HPHS4107 outline (“Lisfranc Fracture from Rugby Game”); Foot & Ankle summary row; MCQ 25. The lecture has no Lisfranc section.'

export const LISFRANC_SOURCE_TAIL =
  'Keiserman and colleagues, Foot & Ankle International, 2003, named the piano-key gesture. Course texts named but not quoted: Sports Medicine Australia 2007; Brukner & Khan.'

export const LISFRANC_LEARN: readonly LisfrancLearnCard[] = [
  {
    id: 'scenario',
    kicker: 'Rehab · Lisfranc',
    title: 'A midfoot injury, not only a fracture',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'A Lisfranc injury is an injury of the tarsometatarsal joint complex — the midfoot, where the metatarsal bases meet the cuneiforms and the cuboid.',
      'It is a spectrum. It can be ligamentous, bony, or both: a sprain or tear of the midfoot ligaments, a fracture, a dislocation, or a mixed injury. The course summary names it a Lisfranc injury. The course assignment titles the same case “Lisfranc Fracture from Rugby Game.” Do not treat every Lisfranc injury as a fracture, and do not treat a bony injury as if it were only a sprain.',
      'Even a subtle Lisfranc injury is not a simple sprain to walk off. Missed or unstable injuries can leave the midfoot unstable.',
    ],
  },
  {
    id: 'anatomy',
    kicker: 'Anatomy',
    title: 'Tarsometatarsal joint complex',
    light: 'plantar',
    span: 'plantar',
    motion: false,
    paragraphs: [
      'The Lisfranc, or tarsometatarsal, joints are formed by the five metatarsal bases distally and by the three cuneiforms and the cuboid proximally. The first three metatarsals meet the three cuneiforms; the fourth and fifth meet the cuboid.',
      'The ligaments of this complex fall into dorsal, plantar, and interosseous groups. The model can show those three packed groupings. The packed interosseous mesh is a set of short bands in the intervals, not a single labelled ligament.',
      'The ligament often singled out as the Lisfranc ligament runs from the medial cuneiform to the base of the second metatarsal. Some anatomy references describe that connection as three bands: dorsal, interosseous (sometimes called the Lisfranc ligament proper), and plantar. The packed interosseous object is the set of interval bands, not that one band alone.',
      'There is no transverse ligament between the first and second metatarsals, which is one reason this joint can be vulnerable.',
      'The interosseous Lisfranc ligament is often described as the most important stabilizer of this joint, and the dorsal ligaments as the weaker set (Wynter and Grigg, 2017). That is a cited description, not a quiz fact.',
    ],
  },
  {
    id: 'mechanism',
    kicker: 'Mechanism of injury',
    title: 'Axial load on a plantarflexed foot',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'The mechanism in the course notes is an axial load on a plantarflexed foot.',
      'The same notes distinguish two energy patterns: low energy (athletes, ligamentous) versus high energy (car accidents). Low-energy injuries in sport are often mostly ligamentous. High-energy injuries, such as a motor-vehicle collision or a fall from a height, more often include fractures and dislocations. That is a typical pattern, not a rule that every athletic injury is ligament-only, or that every high-energy injury is bony.',
      'Rugby is the setting of the course assignment. Low-energy Lisfranc injuries are reported in collision sports, including rugby, when a plantarflexed foot is axially loaded and twisted or forced sideways. That supports the setting. It does not create a match story.',
      'This is not the inversion and plantarflexion mechanism of a common lateral sprain, and not the dorsiflexion, eversion, and tibial internal rotation mechanism of a high ankle sprain.',
    ],
  },
  {
    id: 'palpation',
    kicker: 'Assessment',
    title: 'Palpate the midfoot',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'The course notes start the assessment with midfoot palpation, then the Piano key test and the Compression test. The lecture does not describe any of these.',
      'Palpate the midfoot, over the tarsometatarsal joints, on the dorsum of the midfoot. Tenderness there supports a midfoot injury.',
      'Other sourced signs are general examination cues, not findings in a named patient: swelling over the midfoot; pain with weight-bearing or with push-off; and bruising on the bottom of the foot. Plantar bruising is highly suggestive of a Lisfranc injury and is sometimes called nearly pathognomonic. AAOS OrthoInfo links it to a complete midfoot-ligament tear or a midfoot fracture. Plantar bruising is not proof of a complete tear in this case.',
    ],
  },
  {
    id: 'piano-key',
    kicker: 'Special test',
    title: 'Piano key test',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'The course notes name the Piano key test. They do not say how to do it. Reputable sources describe it, and they do not all describe it the same way.',
      'The shared idea is that the examiner moves the toes or the metatarsals up and down so the motion stresses the tarsometatarsal joints. Pain at the midfoot is a positive finding. RACGP 2017 also lists visible subluxation as a positive finding.',
      'Where the sources differ: RACGP 2017 has the examiner grasp the metatarsals and passively dorsiflex and plantarflex them at the tarsometatarsal joint. AAOS OrthoInfo has the examiner grasp the toes and move them up and down. An earlier description (Keiserman and colleagues, 2003) applied a plantar force to an individual metatarsal head, as if striking a piano key, and was written for subtle tarsometatarsal pathology, including chronic problems, not only an acute Lisfranc injury. A later survey of how clinicians perform the test found no consensus (DeHeer and colleagues, 2021).',
    ],
  },
  {
    id: 'compression',
    kicker: 'Special test',
    title: 'Compression test',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'The course notes name a Compression test. They do not say how to do it. More than one midfoot compression manoeuvre exists in the literature.',
      'The description that best matches a named midfoot compression test is compression across the width of the foot, to stress the space between the first and second metatarsals. Pain or a palpable click is suggestive of a Lisfranc injury (RACGP 2017).',
      'The same article also lists a related midfoot-compression manoeuvre: moving the first metatarsal head up and down relative to the second. That is a different movement. AAOS OrthoInfo does not list a compression test by that name. It describes a midfoot stress examination in which the examiner grasps the heel and twists the front of the foot.',
    ],
  },
  {
    id: 'imaging',
    kicker: 'Assessment',
    title: 'Weight-bearing films, then stability',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'If a Lisfranc injury is suspected, first-line imaging in the sourced teaching articles is weight-bearing radiographs of the midfoot: anteroposterior, oblique, and lateral views, often compared with the other foot. Non-weight-bearing films can miss a subtle injury. Weight-bearing views can be difficult in acute pain; some sources allow a short delay and a repeat film.',
      'These injuries are easy to miss on the first radiographs. A high clinical suspicion still needs specialist review, even if the first film looks quiet.',
      'The fork that matters for management is stability. A stable, undisplaced injury, with no widening (diastasis) of the midfoot joints on weight-bearing films, may be treated without surgery. Any instability, displacement, or clear diastasis needs orthopaedic referral and is usually managed operatively. MRI can help when the question is a ligamentous injury. CT can help when the question is a subtle fracture or surgical planning.',
      'A fleck sign, a small avulsion at the medial base of the second metatarsal or the medial cuneiform, is a sourced radiographic clue. It is not a finding assigned to this case.',
    ],
  },
  {
    id: 'pathway',
    kicker: 'Rehab pathway',
    title: 'Stable or unstable, then refer',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'This is not the lecture’s high-ankle table, and not the Achilles tendinopathy figure. It is not a generic sprain pathway.',
      'Orthopaedic referral is indicated for a proven Lisfranc injury, or when clinical suspicion is high. Keep the athlete non-weight-bearing until that review. That is the safe first step this case can teach.',
      'If the injury is stable and undisplaced, with no diastasis on weight-bearing radiographs, non-operative treatment may be enough: immobilisation, follow-up films to make sure the midfoot has not shifted, then a gradual return of load. If the joint later displaces, surgery is needed.',
      'If the injury is unstable or displaced, treatment is usually operative: internal fixation, or in some patterns a midfoot fusion. The preferred operation is controversial.',
      'Sourced conservative timelines do not agree. AAOS OrthoInfo describes a strict non-weight-bearing cast or boot for about six to eight weeks, then weight-bearing in a boot or orthotic. BOFAS describes a non-weight-bearing cast for six weeks, repeat weight-bearing films at two to three weeks, then a walker boot for another four to six weeks. RACGP 2017 cites a stepwise plan that starts with protective weight-bearing in a short walker boot for two weeks, then a review and repeat films. This case does not turn those into one protocol.',
      'Recovery can take many months. RACGP 2017 gives at least six to twelve months before competitive return for athletes. AAOS OrthoInfo notes that some athletic patients never return to their pre-injury level. These are teaching ranges, not a clearance date.',
    ],
  },
  {
    id: 'totaps',
    kicker: 'TOTAPS',
    title: 'Six stages, then stop',
    light: 'dorsal',
    span: 'dorsal',
    motion: false,
    paragraphs: [
      'TOTAPS is a structured pitch-side assessment: Talk, Observe, Touch, Active movement, Passive movement, and Skill test. If any stage reveals a problem, stop testing. Do not immediately return the athlete to play.',
      'Touch, with consent, starts away from the injury; bones first, then ligaments. For this injury, the course notes start with midfoot palpation. A midfoot injury with high suspicion stays a referral, not a walk-it-off sprain.',
    ],
  },
]

const LATERAL_MECHANISM = [
  'inversion and plantarflexion',
  'inversion and plantar flexion',
  'plantarflexion and inversion',
  'plantar flexion and inversion',
  'inversion plantarflexion',
  'inversion plantar flexion',
  'plantarflexion inversion',
]

const HIGH_ANKLE_MECHANISM = [
  'dorsiflexion, eversion, and tibial internal rotation',
  'dorsiflexion and eversion with tibial internal rotation',
  'dorsiflexion and eversion of the ankle with internal rotation of the tibia',
  'dorsiflexion, eversion, and tibial internal rotation',
  'DF + eversion + tibial IR',
  'dorsiflexion and eversion and tibial internal rotation',
]

const MECHANISM_PHRASES = [
  'axial load on a plantarflexed foot',
  'axial load on plantarflexed foot',
  'axial loading on a plantarflexed foot',
  'an axial load on a plantarflexed foot',
  'axial force through a plantarflexed foot',
  'axial loading through a plantarflexed foot',
]

const FRACTURE_NAMES = [
  'Lisfranc fracture',
  'Lisfranc fractures',
  'Lisfranc fracture-dislocation',
  'Lisfranc fracture dislocation',
  'Lisfranc Fracture from Rugby Game',
  'Lisfranc fracture from rugby game',
  'fracture',
  'a fracture',
]

const ONE_TEST = [
  'Piano key test',
  'piano-key test',
  'Piano key',
  'piano key',
  'Compression test',
  'compression test',
  'Compression',
  'midfoot palpation',
]

const BARE_ENERGY = [
  'low-energy versus high-energy',
  'low energy versus high energy',
  'low-energy vs high-energy',
  'low energy vs high energy',
  'low-energy versus high energy',
]

const TIMELINE_REJECTS = [
  'six weeks',
  '6 weeks',
  'six to eight weeks',
  '6 to 8 weeks',
  '6-8 weeks',
  'six-to-eight weeks',
  'CAM boot',
  'cam boot',
  'non-weight-bearing cast for six weeks',
  'strict non-weight-bearing for six to eight weeks',
  'protective weight-bearing for two weeks',
  'Acute, Sub-acute, Functional, Return to Sport',
  'symptom-management',
]

const ANKLE_LIGAMENT_WRONG = 'That is an ankle ligament, not the midfoot Lisfranc ligaments.'
const OTHER_FOOT = 'That is the other foot. This case is the right midfoot.'
const TAP_OTHER = 'Tap the dorsal tarsometatarsal ligaments on the right midfoot.'

export const LISFRANC_QUIZ: readonly LisfrancQuizStep[] = [
  {
    kind: 'type',
    id: 'type-injury',
    region: 'NAME IT',
    prompt: 'Type the name of this midfoot injury.',
    official: 'Lisfranc injury',
    aliases: [
      'Lisfranc injury',
      'Lisfranc (tarsometatarsal joint complex) injury',
      'tarsometatarsal joint complex injury',
      'Lisfranc joint injury',
      'Lisfranc midfoot injury',
      'Lisfranc joint complex injury',
    ],
    hint: 'It involves the tarsometatarsal joint complex, in the midfoot.',
    reveal:
      'This is a Lisfranc injury of the tarsometatarsal joint complex. It is a spectrum: ligaments, bones, or both. It is not automatically a fracture, and it is not a simple sprain to walk off.',
    light: 'dorsal',
    span: 'dorsal',
    rejects: [
      {
        aliases: FRACTURE_NAMES,
        message:
          'A Lisfranc injury can be ligamentous, bony, or both. The course assignment says “Lisfranc Fracture,” but the summary and the MCQ name a Lisfranc injury.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-joint',
    region: 'JOINT',
    prompt: 'Type the joint complex this injury involves.',
    official: 'tarsometatarsal joint complex',
    aliases: [
      'tarsometatarsal joint complex',
      'tarsometatarsal joints',
      'Lisfranc joint',
      'Lisfranc joint complex',
      'Lisfranc (tarsometatarsal) joints',
      'tarsometatarsal (Lisfranc) joints',
      'TMT joint complex',
      'TMT joints',
    ],
    hint: 'The metatarsal bases meet the cuneiforms and the cuboid here.',
    reveal:
      'The Lisfranc, or tarsometatarsal, joints are formed by the five metatarsal bases and by the three cuneiforms and the cuboid. The ligaments here fall into dorsal, plantar, and interosseous groups.',
    light: 'dorsal',
    span: 'dorsal',
  },
  {
    kind: 'type',
    id: 'type-mechanism',
    region: 'MECHANISM',
    prompt: 'Type the mechanism of a Lisfranc injury.',
    official: 'axial load on a plantarflexed foot',
    aliases: MECHANISM_PHRASES,
    hint: 'A load goes down the foot while the foot is pointed down.',
    reveal:
      'The course notes give the mechanism as an axial load on a plantarflexed foot. That is not the inversion and plantarflexion of a common lateral sprain, and not the high-ankle mechanism.',
    light: 'dorsal',
    span: 'dorsal',
    rejects: [
      {
        aliases: LATERAL_MECHANISM,
        message:
          'That mechanism is the common lateral sprain. A Lisfranc injury, in the course notes, is an axial load on a plantarflexed foot.',
      },
      {
        aliases: HIGH_ANKLE_MECHANISM,
        message:
          'That mechanism is the high-ankle sprain. A Lisfranc injury, in the course notes, is an axial load on a plantarflexed foot.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-energy',
    region: 'MECHANISM',
    prompt: 'Type the two energy patterns the notes distinguish for this injury.',
    official: 'low-energy ligamentous versus high-energy',
    aliases: [
      'low-energy ligamentous versus high-energy',
      'low energy (athletes, ligamentous) vs high energy (car accidents)',
      'low-energy (athletes, ligamentous) versus high-energy (car accidents)',
      'low energy in athletes, ligamentous, versus high energy, car accidents',
      'low-energy ligamentous or high-energy',
      'athletes, ligamentous versus car accidents',
    ],
    hint: 'One pattern is in athletes and often ligamentous. The notes’ high-energy example is a car accident.',
    reveal:
      'The notes distinguish low energy (athletes, ligamentous) from high energy (car accidents). That is a typical pattern, not a rule that every sport injury is ligament-only, or that every high-energy injury is bony.',
    light: 'dorsal',
    span: 'dorsal',
    rejects: [
      {
        aliases: MECHANISM_PHRASES,
        message:
          'That is the mechanism. The notes also distinguish energy and tissue pattern: low energy (athletes, ligamentous) versus high energy (car accidents).',
      },
      {
        aliases: BARE_ENERGY,
        message:
          'Name the ligamentous side or the notes’ high-energy example as well. The notes distinguish low energy (athletes, ligamentous) from high energy (car accidents).',
      },
    ],
  },
  {
    kind: 'tap',
    id: 'tap-dorsal',
    region: 'TAP THE LIGAMENTS',
    prompt: 'Tap the dorsal tarsometatarsal ligaments.',
    accept: ['dorsal'],
    revealName: 'dorsal tarsometatarsal ligaments',
    correct:
      'That is the dorsal tarsometatarsal ligaments, the ligaments on the top of the midfoot in the Lisfranc complex.',
    wrong: {
      dorsal: '',
      plantar:
        'Those are the plantar tarsometatarsal ligaments, on the sole. This question is the ligaments on the top of the midfoot.',
      interosseous:
        'Those are the interosseous cuneometatarsal ligaments, in the intervals of the midfoot. This question is the ligaments on the top of the midfoot.',
      bone: 'That is a midfoot bone. This question is the ligaments on the top of the midfoot.',
      tendon: 'That is the Achilles, or calcaneal, tendon, not a midfoot ligament.',
      atfl: ANKLE_LIGAMENT_WRONG,
      cfl: ANKLE_LIGAMENT_WRONG,
      ptfl: ANKLE_LIGAMENT_WRONG,
      deltoid: ANKLE_LIGAMENT_WRONG,
      aitfl: ANKLE_LIGAMENT_WRONG,
      pitfl: ANKLE_LIGAMENT_WRONG,
      trans_tibfib: ANKLE_LIGAMENT_WRONG,
      'other-foot': OTHER_FOOT,
      other: TAP_OTHER,
    },
    light: 'dorsal',
    span: 'dorsal',
  },
  {
    kind: 'type',
    id: 'type-palpate',
    region: 'PALPATION',
    prompt: 'Type the palpation the notes name for this injury.',
    official: 'midfoot palpation',
    aliases: [
      'midfoot palpation',
      'palpate the midfoot',
      'palpation of the midfoot',
      'palpate the tarsometatarsal joints',
      'palpation of the dorsal tarsometatarsal joints',
      'dorsal midfoot palpation',
    ],
    hint: 'It is the midfoot, not the ATFL or the Achilles tendon.',
    reveal:
      'The course notes start with midfoot palpation. Sourced descriptions put that over the tarsometatarsal joints, on the dorsum of the midfoot.',
    light: 'dorsal',
    span: 'dorsal',
  },
  {
    kind: 'type',
    id: 'type-tests',
    region: 'SPECIAL TEST',
    prompt: 'Type the two special tests the notes name for this injury.',
    official: 'Piano key test and Compression test',
    aliases: [
      'Piano key test and Compression test',
      'piano-key test and compression test',
      'Piano key and Compression',
      'Compression test and Piano key test',
      'Piano key test, Compression test',
      'midfoot palpation, Piano key test, Compression test',
    ],
    hint: 'One shares its name with a keyboard. The notes also name a compression test.',
    reveal:
      'After midfoot palpation, the notes name the Piano key test and the Compression test. The lecture does not describe how to do them. The descriptions in the sources do not all agree, so this case stays conservative about the how-to.',
    light: 'dorsal',
    span: 'dorsal',
    rejects: [
      {
        aliases: ONE_TEST,
        message:
          'The notes name two tests. After midfoot palpation, type both the Piano key test and the Compression test.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-piano',
    region: 'SPECIAL TEST',
    prompt: 'What is the shared idea of the Piano key test?',
    official: 'move the toes or metatarsals up and down',
    aliases: [
      'move the toes or metatarsals up and down',
      'move the toes or the metatarsals up and down',
      'grasp the metatarsals and passively dorsiflex and plantarflex them',
      'passive dorsiflexion and plantarflexion of the metatarsals',
      'grasp the toes and move them up and down',
      'move the toes up and down',
      'move the metatarsals up and down',
      'plantar force to the metatarsal head',
    ],
    hint: 'The motion is up and down, and it stresses the midfoot.',
    reveal:
      'Sources agree that an up-and-down movement of the toes or metatarsals stresses the tarsometatarsal joints, and that pain is a positive finding. They do not agree on the exact grip: RACGP 2017 grasps the metatarsals; AAOS OrthoInfo grasps the toes; an earlier description pressed on a metatarsal head as if striking a piano key. A later survey found no consensus. This case does not tidy those into one protocol.',
    light: 'dorsal',
    span: 'dorsal',
  },
  {
    kind: 'type',
    id: 'type-compression',
    region: 'SPECIAL TEST',
    prompt: 'How do the sourced notes describe the Compression test?',
    official: 'compression across the width of the foot',
    aliases: [
      'compression across the width of the foot',
      'compress across the width of the foot',
      'compression across the midfoot',
      'compress the midfoot from side to side',
      'stress the space between the first and second metatarsals',
      'pain or a palpable click',
      'midfoot compression moving the first metatarsal head relative to the second',
      'compress the first and second metatarsals',
    ],
    hint: 'The squeeze is across the midfoot, toward the space between the first and second metatarsals.',
    reveal:
      'The description that best matches a named compression test is compression across the width of the foot, to stress the space between the first and second metatarsals. Pain or a palpable click is suggestive (RACGP 2017). The same article also lists a different midfoot-compression manoeuvre, moving the first metatarsal head relative to the second. AAOS OrthoInfo does not list a compression test by that name; it describes twisting the front of the foot on a held heel. This case does not treat those as one test.',
    light: 'dorsal',
    span: 'dorsal',
  },
  {
    kind: 'type',
    id: 'type-nwb',
    region: 'MANAGEMENT',
    prompt: 'Type the safe first management step while this injury is being reviewed.',
    official: 'non-weight-bearing until specialist review',
    aliases: [
      'non-weight-bearing until specialist review',
      'keep non-weight-bearing until review',
      'non-weight-bearing until orthopaedic review',
      'non-weight bearing until specialist review',
      'NWB until review',
      'NWB until specialist review',
      'refer and keep non-weight-bearing',
      'orthopaedic referral and non-weight-bearing',
    ],
    hint: 'Do not load the midfoot until a specialist has reviewed the injury.',
    reveal:
      'Orthopaedic referral is indicated for a proven Lisfranc injury, or when suspicion is high. Keep the athlete non-weight-bearing until that review. Stable, undisplaced injuries with no diastasis may be treated without surgery. Unstable or displaced injuries are usually managed operatively. Sourced conservative timelines do not agree, so this case does not quiz a single duration.',
    light: 'dorsal',
    span: 'dorsal',
    rejects: [
      {
        aliases: TIMELINE_REJECTS,
        message:
          'Sourced conservative timelines disagree, and unstable injuries are usually managed operatively. The safe first step is non-weight-bearing until specialist review.',
      },
    ],
  },
]

function compactNorm(raw: string): string {
  return normalizeAnswerText(raw).replace(/\s+/g, '')
}

function isProperPrefixOfAlias(typed: string, aliases: readonly string[]): boolean {
  const compact = compactNorm(typed)
  if (!compact) return false
  return aliases.some((alias) => {
    const other = compactNorm(alias)
    return other.length > compact.length && other.startsWith(compact)
  })
}

export function lisfrancTypeMatch(
  step: LisfrancTypeStep,
  typed: string,
  mode: AnswerMatchMode = 'live',
): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

/**
 * A complete rejected phrase. While the student is still typing a longer
 * accepted answer, a short reject that is only a prefix stays quiet.
 * Enter on that short phrase prompts instead of marking it correct.
 */
export function lisfrancTypeReject(
  step: LisfrancTypeStep,
  typed: string,
  mode: AnswerMatchMode = 'confirm',
): string | null {
  if (!step.rejects) return null
  for (const reject of step.rejects) {
    if (!matchAliases(typed, reject.aliases, 'confirm', reject.aliases[0] ?? '')) continue
    if (mode === 'live' && isProperPrefixOfAlias(typed, step.aliases)) continue
    return reject.message
  }
  return null
}

export function gradeLisfrancTap(
  step: LisfrancTapStep,
  hit: LisfrancHit | null,
): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other }
}

const MIDFOOT_BONE = new Set<string>([
  'cuneiform_med_r',
  'cuneiform_int_r',
  'cuneiform_lat_r',
  'cuboid_r',
  'metatarsal1_r',
  'metatarsal2_r',
  'metatarsal3_r',
  'metatarsal4_r',
  'metatarsal5_r',
])

export function classifyLisfrancMesh(name: string): LisfrancHit {
  if (name === 'dorsal_tmt_r') return 'dorsal'
  if (name === 'plantar_tmt_r') return 'plantar'
  if (name === 'cuneometatarsal_io_r') return 'interosseous'
  if (name === 'calcaneal_r') return 'tendon'
  if (name === 'atfl_r') return 'atfl'
  if (name === 'cfl_r') return 'cfl'
  if (name === 'ptfl_r') return 'ptfl'
  if (name === 'deltoid_r') return 'deltoid'
  if (name === 'aitfl_r') return 'aitfl'
  if (name === 'pitfl_r') return 'pitfl'
  if (name === 'trans_tibfib_r') return 'trans_tibfib'
  if (MIDFOOT_BONE.has(name)) return 'bone'
  if (name.endsWith('_l')) return 'other-foot'
  return 'other'
}
