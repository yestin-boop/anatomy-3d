/**
 * View-mode study notes for the playable bone and muscle set.
 *
 * Mesh credit: BodyParts3D (DBCLS), CC BY 4.0. The text is original study
 * notes compiled from standard textbook anatomy — not a pasted atlas page.
 *
 * Origin / insertion *markers* are not a clinical landmark atlas. Each site
 * names the muscle and bone meshes that should meet at that attachment;
 * the scene places the pin at the nearest points between those meshes.
 */

export type ViewSide = 'l' | 'r'

export type ViewPrefer =
  | 'cranial'
  | 'caudal'
  | 'anterior'
  | 'posterior'
  | 'lateral'
  | 'medial'

export type ViewAttachmentSite = {
  kind: 'origin' | 'insertion'
  /** Short pin label, e.g. "Origin · long head" */
  label: string
  muscleMeshes: string[]
  boneMeshes: string[]
  /**
   * Among bone vertices nearly as close as the nearest muscle–bone pair,
   * prefer this anatomical direction (world: cranial +Y, anterior +Z).
   * Used only as a tie-break on the mesh, not as a made-up coordinate.
   */
  prefer?: ViewPrefer
}

export type MuscleViewInfo = {
  id: string
  description: string
  origin: string
  insertion: string
  action: string
  innervation: string
  sitesForSide: (side: ViewSide) => ViewAttachmentSite[]
}

export type BoneViewInfo = {
  id: string
  description: string
  articulations?: string
  features?: string
}

export type CartilageViewInfo = {
  id: string
  description: string
  articulations?: string
  features?: string
}

const side = (s: ViewSide, names: string[]): string[] =>
  names.map((n) => `${n}_${s}`)

const ribs = (s: ViewSide, from: number, to: number): string[] => {
  const out: string[] = []
  for (let n = from; n <= to; n++) out.push(`rib_${s}${n}`)
  return out
}

const vertebrae = (...ids: string[]): string[] => ids.map((id) => `vertebra_${id}`)

export const MUSCLE_VIEW: Record<string, MuscleViewInfo> = {
  trapezius: {
    id: 'trapezius',
    description:
      'A broad, diamond-shaped superficial muscle of the posterior neck and upper back, with descending (upper), transverse (middle), and ascending (lower) parts. It links the axial skeleton to the pectoral girdle and helps position the scapula for arm movement.',
    origin:
      'Medial third of the superior nuchal line and the external occipital protuberance, the ligamentum nuchae, and the spinous processes of C7–T12 (with the intervening supraspinous ligaments). Descending fibers arise more cranially; ascending fibers arise from the lower thoracic spines.',
    insertion:
      'Lateral third of the clavicle (descending fibers), the acromion (mainly transverse fibers), and the spine of the scapula (transverse and ascending fibers).',
    action:
      'Descending part elevates the scapula and assists upward rotation of the glenoid; transverse part retracts the scapula; ascending part depresses the scapula. Together they steady the scapula for upper-limb movement. Acting on the head and neck, it can extend the neck (bilateral) and contribute to contralateral rotation / ipsilateral lateral flexion (unilateral).',
    innervation:
      'Spinal accessory nerve (CN XI) for motor innervation; proprioceptive fibers travel via the anterior rami of C3–C4.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · upper', muscleMeshes: side(s, ['trap_desc']), boneMeshes: ['occipital'], prefer: 'cranial' },
      { kind: 'origin', label: 'Origin · lower', muscleMeshes: side(s, ['trap_asc']), boneMeshes: vertebrae('t8', 't9', 't10', 't11', 't12'), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · clavicle', muscleMeshes: side(s, ['trap_desc']), boneMeshes: side(s, ['clavicle']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · scapula', muscleMeshes: side(s, ['trap_trans', 'trap_asc']), boneMeshes: side(s, ['scapula']), prefer: 'posterior' },
    ],
  },

  sternocleidomastoid: {
    id: 'sternocleidomastoid',
    description:
      'A prominent two-headed muscle on the side of the neck, running from the sternum and clavicle to the mastoid process. It divides the neck into anterior and posterior triangles and is an important landmark for the carotid sheath and accessory nerve.',
    origin:
      'Sternal head: anterior surface of the manubrium of the sternum. Clavicular head: superior surface of the medial third of the clavicle. The two heads bound a small triangular interval, with the clavicular head lying lateral and slightly deeper.',
    insertion:
      'Lateral surface of the mastoid process of the temporal bone, and the lateral half of the superior nuchal line of the occipital bone.',
    action:
      'Unilateral contraction tilts the head to the same side and rotates the face to the opposite side. Bilateral contraction flexes the cervical spine relative to the thorax and can extend the head at the atlanto-occipital joint; with the head fixed it also acts as an accessory muscle of inspiration by lifting the sternum and clavicle.',
    innervation:
      'Spinal accessory nerve (CN XI) for motor innervation; proprioceptive (and some sensory) fibers from C2–C3, including the cervical plexus.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · sternal', muscleMeshes: [`scm_${s}`], boneMeshes: ['sternum_manubrium'], prefer: 'anterior' },
      { kind: 'origin', label: 'Origin · clavicular', muscleMeshes: [`scm_${s}`], boneMeshes: side(s, ['clavicle']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · mastoid', muscleMeshes: [`scm_${s}`], boneMeshes: side(s, ['temporal']), prefer: 'lateral' },
    ],
  },

  deltoid: {
    id: 'deltoid',
    description:
      'The thick, triangular muscle that caps the shoulder, with clavicular (anterior), acromial (middle), and spinal (posterior) parts. It gives the shoulder its rounded contour and is the principal abductor of the arm once the motion is under way.',
    origin:
      'Anterior part: lateral third of the clavicle (anterior border). Middle part: lateral margin of the acromion. Posterior part: spine of the scapula (inferior lip). These origins continue the insertion line of trapezius.',
    insertion:
      'Deltoid tuberosity on the lateral surface of the humeral shaft, about mid-arm.',
    action:
      'The acromial part is the chief abductor of the arm (supraspinatus initiates the first degrees). The clavicular part flexes and medially rotates the arm; the spinal part extends and laterally rotates it. Anterior and posterior parts can also stabilize the humeral head during abduction.',
    innervation: 'Axillary nerve (C5–C6), from the posterior cord of the brachial plexus.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · clavicular', muscleMeshes: side(s, ['delt_clav']), boneMeshes: side(s, ['clavicle']) },
      { kind: 'origin', label: 'Origin · acromial', muscleMeshes: side(s, ['delt_acro']), boneMeshes: side(s, ['scapula']) },
      { kind: 'origin', label: 'Origin · spinal', muscleMeshes: side(s, ['delt_spin']), boneMeshes: side(s, ['scapula']) },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['delt_clav', 'delt_acro', 'delt_spin']), boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
    ],
  },

  pectoralis_major: {
    id: 'pectoralis_major',
    description:
      'A large, fan-shaped muscle of the anterior chest wall with clavicular, sternocostal, and a small abdominal part. Its fibers converge to a U-shaped tendon on the humerus and form the greater part of the anterior axillary fold.',
    origin:
      'Clavicular head: anterior surface of the medial half of the clavicle. Sternocostal head: anterior surface of the sternum, the costal cartilages of (typically) ribs 1–6, and the aponeurosis of the external oblique. The abdominal part is a small inferior slip from that aponeurosis.',
    insertion:
      'Lateral lip of the intertubercular (bicipital) sulcus of the humerus — the crest of the greater tubercle. The tendon is bilaminar: clavicular fibers insert more anteriorly and distal; sternocostal fibers twist so that the lowest fibers insert highest.',
    action:
      'Adducts and medially rotates the arm. The clavicular head flexes the arm (from the anatomical position) and adducts it horizontally; the sternocostal head extends the flexed arm (as in a throwing follow-through or a bench-press lowering). With the upper limb fixed it can also draw the trunk upward or act as an accessory inspiratory muscle.',
    innervation:
      'Lateral and medial pectoral nerves (C5–T1). The clavicular head is supplied mainly by C5–C6; the sternocostal head mainly by C7–T1.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · clavicular', muscleMeshes: side(s, ['pec_clav']), boneMeshes: side(s, ['clavicle']), prefer: 'medial' },
      { kind: 'origin', label: 'Origin · sternocostal', muscleMeshes: side(s, ['pec_stern']), boneMeshes: ['sternum_manubrium', 'sternum_body', ...ribs(s, 1, 6)] },
      { kind: 'origin', label: 'Origin · abdominal', muscleMeshes: side(s, ['pec_abd']), boneMeshes: ['sternum_body', 'sternum_xiphoid', ...ribs(s, 5, 7)] },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['pec_clav', 'pec_stern', 'pec_abd']), boneMeshes: side(s, ['humerus']), prefer: 'cranial' },
    ],
  },

  external_oblique: {
    id: 'external_oblique',
    description:
      'The most superficial of the three anterolateral abdominal muscles. Its fibers run inferomedially (“hands in pockets”). A broad aponeurosis forms the anterior wall of the rectus sheath (above the arcuate line), the linea alba, and the inguinal ligament along its free lower border.',
    origin:
      'External surfaces of ribs 5–12, interdigitating superiorly with serratus anterior and inferiorly with latissimus dorsi.',
    insertion:
      'Linea alba, the pubic tubercle, and the anterior half of the iliac crest, via a broad aponeurosis. The thickened free inferior border of the aponeurosis stretches from the anterior superior iliac spine to the pubic tubercle as the inguinal ligament. (This model has no linea-alba mesh; the label marks the iliac attachment on the hip bone.)',
    action:
      'Unilateral contraction rotates the trunk to the opposite side and laterally flexes it to the same side. Bilateral contraction flexes the trunk, compresses the abdominal viscera (straining, expiration), and can depress the ribs.',
    innervation:
      'Thoraco-abdominal nerves (anterior rami of T7–T11) and the subcostal nerve (T12). The lowest fibers may also receive a contribution from the iliohypogastric nerve (L1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ribs', muscleMeshes: [`ext_oblique_${s}`], boneMeshes: ribs(s, 5, 12) },
      { kind: 'insertion', label: 'Insertion · iliac crest', muscleMeshes: [`ext_oblique_${s}`], boneMeshes: side(s, ['hip']), prefer: 'cranial' },
    ],
  },

  serratus_anterior: {
    id: 'serratus_anterior',
    description:
      'A broad, sheet-like muscle on the lateral chest wall, running from the upper ribs around the thorax to the medial border of the scapula. Its saw-toothed slips interdigitate with the external oblique. It is sometimes called the boxer’s muscle because it protracts the scapula in a reaching or punching motion.',
    origin:
      'External surfaces of the upper eight or nine ribs, and the intervening fascia, by a series of fleshy digitations. The first digitation often arises from ribs 1 and 2; lower slips interdigitate with the external oblique.',
    insertion:
      'The whole length of the medial (vertebral) border of the scapula, on its costal surface. The lower fibers, which are the strongest, reach the inferior angle and are important for upward rotation of the glenoid.',
    action:
      'Protracts the scapula (draws it forward around the chest wall) and holds it firmly against the thorax. The lower fibers upwardly rotate the glenoid, working with trapezius in overhead elevation of the arm. Weakness lets the medial border lift from the chest wall (a winged scapula).',
    innervation: 'Long thoracic nerve (C5–C7), which runs on the superficial surface of the muscle and is vulnerable to injury.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ribs', muscleMeshes: [`serratus_ant_${s}`], boneMeshes: ribs(s, 1, 9) },
      { kind: 'insertion', label: 'Insertion · medial scapula', muscleMeshes: [`serratus_ant_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'medial' },
    ],
  },

  biceps_brachii: {
    id: 'biceps_brachii',
    description:
      'A two-headed muscle of the anterior arm that crosses both the shoulder and the elbow. The long head is more lateral and occupies the intertubercular sulcus; the short head lies medially. Distally the two bellies join in a common tendon.',
    origin:
      'Long head: supraglenoid tubercle of the scapula (and the adjacent glenoid labrum); the tendon then passes through the shoulder joint and the intertubercular sulcus. Short head: tip of the coracoid process of the scapula, beside coracobrachialis.',
    insertion:
      'Radial tuberosity, and the fascia of the forearm via the bicipital aponeurosis (which blends with the deep fascia over the medial forearm and helps protect the brachial artery and median nerve in the cubital fossa).',
    action:
      'Flexes the elbow, most powerfully when the forearm is supinated, and is the chief supinator of the forearm (especially when the elbow is flexed). The long head also assists flexion at the shoulder and helps hold the humeral head against the glenoid.',
    innervation: 'Musculocutaneous nerve (C5–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · long head', muscleMeshes: side(s, ['biceps_long']), boneMeshes: side(s, ['scapula']), prefer: 'lateral' },
      { kind: 'origin', label: 'Origin · short head', muscleMeshes: side(s, ['biceps_short']), boneMeshes: side(s, ['scapula']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['biceps_long', 'biceps_short']), boneMeshes: side(s, ['radius']), prefer: 'cranial' },
    ],
  },

  triceps_brachii: {
    id: 'triceps_brachii',
    description:
      'The only muscle of the posterior compartment of the arm, with long, lateral, and medial heads. The long head crosses the shoulder; the lateral and medial heads arise from the humerus, respectively above and below the radial (spiral) groove, so the radial nerve and profunda brachii artery pass between them.',
    origin:
      'Long head: infraglenoid tubercle of the scapula. Lateral head: posterior surface of the humerus, above the radial groove, and the lateral intermuscular septum. Medial head: posterior surface of the humerus below the radial groove, and the medial and lateral intermuscular septa; it is deeper and is engaged in all degrees of extension.',
    insertion:
      'Proximal end of the olecranon of the ulna, and the fascia of the forearm. A deep subtendinous bursa typically separates the tendon from the olecranon.',
    action:
      'Chief extensor of the elbow. The long head also adducts and extends the arm at the shoulder and helps stabilize the abducted humerus (for example, when bearing weight through the arm).',
    innervation:
      'Radial nerve (C6–C8). A small lateral contribution from the axillary nerve is sometimes described for the long head, but the radial nerve is the standard supply.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · long head', muscleMeshes: side(s, ['triceps_long']), boneMeshes: side(s, ['scapula']), prefer: 'lateral' },
      { kind: 'origin', label: 'Origin · lateral head', muscleMeshes: side(s, ['triceps_lat']), boneMeshes: side(s, ['humerus']) },
      { kind: 'origin', label: 'Origin · medial head', muscleMeshes: side(s, ['triceps_med']), boneMeshes: side(s, ['humerus']) },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['triceps_long', 'triceps_lat', 'triceps_med']), boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
    ],
  },

  gluteus_maximus: {
    id: 'gluteus_maximus',
    description:
      'The largest and most superficial muscle of the buttock, and the most powerful extensor of the hip. Superficial fibers run into the iliotibial tract; deeper, more inferior fibers reach the femur directly.',
    origin:
      'Posterior gluteal line and the portion of the ilium behind it, the posterior surface of the sacrum and coccyx, the sacrotuberous ligament, and the gluteal aponeurosis (over gluteus medius).',
    insertion:
      'Chiefly the iliotibial tract of the fascia lata (which then reaches the lateral tibial condyle at Gerdy’s tubercle). Deeper inferior fibers insert on the gluteal tuberosity of the femur. (This model has no IT-tract mesh; the bony label marks the femoral attachment.)',
    action:
      'The chief extensor of the flexed thigh (rising from sitting, climbing, sprinting). It also assists lateral rotation of the thigh. Upper fibers may abduct, lower fibers may adduct. It steadies the femur on the tibia when standing, and is relatively quiet in easy standing or slow walking.',
    innervation: 'Inferior gluteal nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ilium', muscleMeshes: [`glut_max_${s}`], boneMeshes: side(s, ['hip']), prefer: 'posterior' },
      { kind: 'origin', label: 'Origin · sacrum', muscleMeshes: [`glut_max_${s}`], boneMeshes: ['sacrum'] },
      { kind: 'insertion', label: 'Insertion · femur', muscleMeshes: [`glut_max_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  iliacus: {
    id: 'iliacus',
    description:
      'A fan-shaped muscle that fills the iliac fossa and, with psoas major, forms iliopsoas — the chief flexor of the hip. The two muscles remain separate playable items here; “iliopsoas” is the combined unit, not a correct name for iliacus alone.',
    origin:
      'Iliac fossa (the inner surface of the iliac blade), the inner lip of the iliac crest, the iliolumbar and anterior sacroiliac ligaments, and often the lateral part of the sacral ala. In this model the hip is a single fused os coxae mesh, so the origin label marks the muscle’s nearest approach to that mesh, in the region of the iliac fossa.',
    insertion:
      'Lesser trochanter of the femur, via a tendon that is shared with, or immediately beside, psoas major. Some fibers also insert on the femoral shaft just below the trochanter and on the capsule of the hip.',
    action:
      'Flexes the thigh at the hip. Acting with psoas major it is the principal hip flexor (for example, in sit-ups or marching). It can also assist lateral rotation of the thigh and, with the thigh fixed, helps flex the trunk on the femur.',
    innervation: 'Femoral nerve (L2–L3, often described as L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`iliacus_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · lesser trochanter', muscleMeshes: [`iliacus_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  psoas_major: {
    id: 'psoas_major',
    description:
      'A long, thick muscle running from the lumbar spine along the pelvic brim to the proximal femur. Together with iliacus it forms iliopsoas, the chief flexor of the hip. “Iliopsoas” names the combined unit, not psoas major alone. (Psoas minor is not a separate mesh in this pack.)',
    origin:
      'Vertebral bodies and intervening discs of T12–L5, and the transverse processes of the lumbar vertebrae, often with tendinous arches over the lumbar vessels.',
    insertion:
      'Lesser trochanter of the femur, by a tendon shared with or immediately beside iliacus. The muscle passes beneath the inguinal ligament and anterior to the hip joint.',
    action:
      'Flexes the thigh at the hip. Acting from below, it flexes and laterally flexes the lumbar spine and helps maintain the lumbar lordosis. It can also assist lateral rotation of the thigh.',
    innervation: 'Anterior rami of L1–L3 (sometimes L1–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`psoas_maj_${s}`], boneMeshes: vertebrae('t12', 'l1', 'l2', 'l3', 'l4', 'l5') },
      { kind: 'insertion', label: 'Insertion · lesser trochanter', muscleMeshes: [`psoas_maj_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  rectus_femoris: {
    id: 'rectus_femoris',
    description:
      'The only quadriceps muscle that crosses both the hip and the knee. It lies in the midline of the anterior thigh, superficial to vastus intermedius, and contributes to the quadriceps tendon.',
    origin:
      'Straight (direct) head: anterior inferior iliac spine. Reflected (indirect) head: a groove just above the acetabulum (superior acetabular rim) and the fibrous capsule of the hip. Both heads arise from the hip bone, so a single origin label marks the nearest approach of the muscle to that mesh.',
    insertion:
      'Base of the patella via the quadriceps tendon, then the tibial tuberosity via the patellar ligament. The muscular insertion label is placed on the patella, the bony attachment this mesh actually reaches.',
    action:
      'Extends the leg at the knee and flexes the thigh at the hip. Because it is a two-joint muscle, it is a less effective knee extensor when the hip is fully flexed, and a less effective hip flexor when the knee is fully extended.',
    innervation: 'Femoral nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`rectus_fem_${s}`], boneMeshes: side(s, ['hip']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · patella', muscleMeshes: [`rectus_fem_${s}`], boneMeshes: side(s, ['patella']), prefer: 'cranial' },
    ],
  },

  vastus_lateralis: {
    id: 'vastus_lateralis',
    description:
      'The largest of the four quadriceps muscles, forming the bulk of the lateral thigh. It has a broad origin along the femur and contributes a large share of the quadriceps tendon and the lateral patellar retinaculum.',
    origin:
      'Greater trochanter, the intertrochanteric line, the gluteal tuberosity, the lateral lip of the linea aspera, and the lateral intermuscular septum of the thigh.',
    insertion:
      'Lateral border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Expansions form the lateral patellar retinaculum and blend with the capsule of the knee. The label marks the patella, the bony attachment this mesh reaches.',
    action:
      'Extends the leg at the knee. Together with vastus medialis it also helps guide and stabilize the patella in the trochlear groove during flexion and extension.',
    innervation: 'Femoral nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`vastus_lat_${s}`], boneMeshes: side(s, ['femur']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · patella', muscleMeshes: [`vastus_lat_${s}`], boneMeshes: side(s, ['patella']), prefer: 'cranial' },
    ],
  },

  vastus_medialis: {
    id: 'vastus_medialis',
    description:
      'The medial quadriceps muscle, whose more distal fibers (often called vastus medialis obliquus, VMO) run almost horizontally and form the characteristic teardrop at the medial knee. It is important for medial patellar stability.',
    origin:
      'Intertrochanteric line, medial lip of the linea aspera, medial supracondylar line of the femur, and the tendons of adductor longus and adductor magnus, plus the medial intermuscular septum.',
    insertion:
      'Medial border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Distal fibers contribute to the medial patellar retinaculum. The label marks the patella, the bony attachment this mesh reaches.',
    action:
      'Extends the leg at the knee. The oblique distal fibers pull the patella medially and help prevent lateral dislocation, especially in the last degrees of extension.',
    innervation: 'Femoral nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`vastus_med_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · patella', muscleMeshes: [`vastus_med_${s}`], boneMeshes: side(s, ['patella']), prefer: 'cranial' },
    ],
  },

  vastus_intermedius: {
    id: 'vastus_intermedius',
    description:
      'The deepest of the four quadriceps muscles, lying on the anterior and lateral femoral shaft and hidden under rectus femoris. It contributes to the quadriceps tendon and, like the other vasti, acts only at the knee.',
    origin:
      'Anterior and lateral surfaces of the upper two-thirds of the femoral shaft, and the adjacent lateral intermuscular septum of the thigh. (A small articularis genus slip, often described with this muscle, is not a separate mesh here.)',
    insertion:
      'Base of the patella via the quadriceps tendon, then the tibial tuberosity via the patellar ligament. The label marks the patella, the bony attachment this mesh reaches.',
    action:
      'Extends the leg at the knee. Unlike rectus femoris it does not cross the hip, so it is a pure knee extensor.',
    innervation: 'Femoral nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`vastus_int_${s}`], boneMeshes: side(s, ['femur']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · patella', muscleMeshes: [`vastus_int_${s}`], boneMeshes: side(s, ['patella']), prefer: 'cranial' },
    ],
  },

  biceps_femoris: {
    id: 'biceps_femoris',
    description:
      'The lateral hamstring, with a long head (two-joint) and a short head (knee only). The two heads join in a common tendon to the head of the fibula and form the superolateral border of the popliteal fossa. It is the only hamstring with dual nerve supply.',
    origin:
      'Long head: ischial tuberosity, by a shared tendon with semitendinosus (and a slip from the sacrotuberous ligament). Short head: lateral lip of the linea aspera and the lateral supracondylar line of the femur, and the lateral intermuscular septum. The short head does not arise from the ischium.',
    insertion:
      'Lateral aspect of the head of the fibula, embracing the fibular collateral ligament; some fibers also reach the lateral condyle of the tibia and the deep fascia of the leg.',
    action:
      'Flexes the leg at the knee and laterally rotates the flexed leg. The long head also extends the thigh at the hip and assists lateral rotation of the thigh. The short head acts only at the knee.',
    innervation:
      'Long head: tibial division of the sciatic nerve (L5–S2). Short head: common fibular (peroneal) division of the sciatic nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · long head', muscleMeshes: side(s, ['bf_long']), boneMeshes: side(s, ['hip']), prefer: 'caudal' },
      { kind: 'origin', label: 'Origin · short head', muscleMeshes: side(s, ['bf_short']), boneMeshes: side(s, ['femur']) },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['bf_long', 'bf_short']), boneMeshes: side(s, ['fibula']), prefer: 'cranial' },
    ],
  },

  semitendinosus: {
    id: 'semitendinosus',
    description:
      'A medial hamstring with a long, cord-like distal tendon. It lies more superficial than semimembranosus and forms the superomedial border of the popliteal fossa with that muscle. Distally it is one of the three pes anserinus tendons.',
    origin:
      'Ischial tuberosity, by a common tendon with the long head of biceps femoris, on the inferomedial aspect of the tuberosity.',
    insertion:
      'Medial surface of the proximal tibia, as part of the pes anserinus (with sartorius and gracilis), a few centimetres distal to the tibial tuberosity and posterior to the insertions of those two muscles.',
    action:
      'Extends the thigh at the hip, flexes the leg at the knee, and medially rotates the flexed leg. With semimembranosus it can also help medially rotate the extended thigh.',
    innervation: 'Tibial division of the sciatic nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`semitend_${s}`], boneMeshes: side(s, ['hip']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: [`semitend_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'cranial' },
    ],
  },

  semimembranosus: {
    id: 'semimembranosus',
    description:
      'The deepest of the three hamstrings, named for its long, flat proximal tendon. It lies deep to semitendinosus on the medial side of the thigh and has important expansions into the posteromedial capsule of the knee.',
    origin:
      'Ischial tuberosity, by a thick tendon just superolateral to the shared biceps–semitendinosus origin (still on the hip-bone mesh in this model).',
    insertion:
      'Posterior aspect of the medial condyle of the tibia. Fibrous expansions form the oblique popliteal ligament, a slip over popliteus, and attachments to the posterior capsule and medial meniscus — a posteromedial stabilizing complex.',
    action:
      'Extends the thigh at the hip, flexes the leg at the knee, and medially rotates the flexed leg. Its capsular expansions also help stabilize the posteromedial knee.',
    innervation: 'Tibial division of the sciatic nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`semimemb_${s}`], boneMeshes: side(s, ['hip']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: [`semimemb_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'cranial' },
    ],
  },

  gastrocnemius: {
    id: 'gastrocnemius',
    description:
      'The most superficial muscle of the calf, with medial and lateral heads that form the bulge of the calf and the inferior boundaries of the popliteal fossa. It is a two-joint muscle, crossing the knee and the ankle, and joins soleus in the calcaneal (Achilles) tendon.',
    origin:
      'Medial head: posterior surface of the medial femoral condyle, just behind the adductor tubercle, and the adjacent capsule of the knee. Lateral head: lateral surface of the lateral femoral condyle and the adjacent capsule. A small sesamoid (the fabella) is sometimes present in the lateral head.',
    insertion:
      'Posterior surface of the calcaneus, via the calcaneal (Achilles) tendon, which gastrocnemius forms with soleus. The tendon inserts on the middle third of the posterior calcaneal surface.',
    action:
      'Plantarflexes the foot at the ankle and flexes the leg at the knee. It is important in propulsion (walking, running, jumping). Because it already shortens when the knee is flexed, it is a less effective plantarflexor in that position — soleus then carries more of the load.',
    innervation: 'Tibial nerve (S1–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · medial head', muscleMeshes: side(s, ['gastroc_med']), boneMeshes: side(s, ['femur']), prefer: 'caudal' },
      { kind: 'origin', label: 'Origin · lateral head', muscleMeshes: side(s, ['gastroc_lat']), boneMeshes: side(s, ['femur']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: side(s, ['gastroc_lat', 'gastroc_med']), boneMeshes: side(s, ['calcaneus']), prefer: 'posterior' },
    ],
  },

  soleus: {
    id: 'soleus',
    description:
      'A broad, powerful postural muscle deep to gastrocnemius in the posterior leg. It does not cross the knee. With gastrocnemius it forms the triceps surae and shares the calcaneal tendon. A tendinous arch at its origin allows the tibial nerve and popliteal vessels to pass into the leg.',
    origin:
      'Posterior surface of the head and proximal shaft of the fibula, the soleal line and the middle third of the medial border of the tibia, and a fibrous arch between the tibia and fibula.',
    insertion:
      'Posterior surface of the calcaneus, via the calcaneal (Achilles) tendon shared with gastrocnemius.',
    action:
      'Plantarflexes the foot at the ankle. It is a primary postural muscle, continuously active in quiet standing to keep the leg from toppling forward at the ankle. Because it does not cross the knee, it remains an effective plantarflexor when the knee is flexed.',
    innervation: 'Tibial nerve (S1–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · tibia', muscleMeshes: [`soleus_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'cranial' },
      { kind: 'origin', label: 'Origin · fibula', muscleMeshes: [`soleus_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion', muscleMeshes: [`soleus_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'posterior' },
    ],
  },

  tibialis_anterior: {
    id: 'tibialis_anterior',
    description:
      'The large muscle of the anterior compartment of the leg, lying against the lateral surface of the tibia. Its tendon is prominent at the front of the ankle, passing beneath the extensor retinacula and then medially onto the foot. It is the primary dorsiflexor of the ankle.',
    origin:
      'Lateral condyle and the upper two-thirds of the lateral surface of the tibia, the adjacent interosseous membrane, and the deep fascia of the leg (including the lateral intermuscular septum).',
    insertion:
      'Medial and plantar surfaces of the medial cuneiform and the base of the first metatarsal.',
    action:
      'Dorsiflexes the foot at the ankle and inverts the foot (at the subtalar and midtarsal joints). It helps support the medial longitudinal arch and, in the swing phase of gait, clears the toes from the ground. Weakness produces foot drop.',
    innervation: 'Deep fibular (peroneal) nerve (L4–L5).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`tib_ant_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · medial cuneiform', muscleMeshes: [`tib_ant_${s}`], boneMeshes: side(s, ['cuneiform_med']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · 1st metatarsal', muscleMeshes: [`tib_ant_${s}`], boneMeshes: side(s, ['metatarsal1']), prefer: 'cranial' },
    ],
  },
  pectoralis_minor: {
    id: 'pectoralis_minor',
    description:
      'A thin, triangular muscle of the anterior chest wall, lying immediately deep to pectoralis major. It ties the upper ribs to the coracoid process and helps control the scapula’s position on the chest.',
    origin:
      'The outer surfaces of the third, fourth, and fifth ribs (sometimes the second or sixth as well), near the costochondral junctions, and the fascia over the intervening external intercostal muscles.',
    insertion:
      'The medial border and superior surface of the coracoid process of the scapula.',
    action:
      'Draws the scapula forward, downward, and against the chest wall (protraction with depression and downward rotation of the glenoid). With the scapula fixed it can also elevate the ribs slightly and act as an accessory muscle of inspiration.',
    innervation: 'Medial pectoral nerve (C8–T1), often with a contribution from the lateral pectoral nerve that pierces the muscle on its way to pectoralis major.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ribs', muscleMeshes: [`pec_min_${s}`], boneMeshes: ribs(s, 3, 5) },
      { kind: 'insertion', label: 'Insertion · coracoid', muscleMeshes: [`pec_min_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'anterior' },
    ],
  },

  subclavius: {
    id: 'subclavius',
    description:
      'A small muscle tucked under the clavicle, between it and the first rib. It is easy to miss in the intact chest wall, but it steadies the clavicle and sits next to the subclavian vessels.',
    origin:
      'The first rib and its costal cartilage, at the junction between the two.',
    insertion:
      'The groove on the inferior surface of the middle third of the clavicle (the subclavian groove).',
    action:
      'Depresses and steadies the clavicle, and may slightly raise the first rib. It also affords some protection to the subclavian vessels if the clavicle is fractured.',
    innervation: 'Nerve to subclavius (C5–C6), from the upper trunk of the brachial plexus.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · first rib', muscleMeshes: [`subclav_${s}`], boneMeshes: [`rib_${s}1`], prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · clavicle', muscleMeshes: [`subclav_${s}`], boneMeshes: side(s, ['clavicle']), prefer: 'caudal' },
    ],
  },

  rhomboid_major: {
    id: 'rhomboid_major',
    description:
      'A flat, rhomboid-shaped muscle of the upper back, lying deep to trapezius and just below rhomboid minor. Together the rhomboids retract the scapula and hold it against the chest wall. “Rhomboids” names the pair, not this muscle alone.',
    origin:
      'The spinous processes of T2–T5 and the intervening supraspinous ligaments.',
    insertion:
      'The medial border of the scapula, from the root of the spine down to the inferior angle.',
    action:
      'Retracts the scapula (draws it toward the midline), elevates it slightly, and rotates the glenoid downward. It also steadies the medial border against the thoracic wall.',
    innervation: 'Dorsal scapular nerve (C4–C5).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`rhomb_maj_${s}`], boneMeshes: vertebrae('t2', 't3', 't4', 't5') },
      { kind: 'insertion', label: 'Insertion · medial scapula', muscleMeshes: [`rhomb_maj_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'medial' },
    ],
  },

  rhomboid_minor: {
    id: 'rhomboid_minor',
    description:
      'A narrow muscle immediately above rhomboid major, also deep to trapezius. It is the smaller of the two rhomboids and inserts higher on the medial scapular border. “Rhomboids” names the pair, not this muscle alone.',
    origin:
      'The lower part of the nuchal ligament and the spinous processes of C7 and T1 (with the intervening supraspinous ligament).',
    insertion:
      'The medial border of the scapula at the root of the spine of the scapula.',
    action:
      'Retracts and slightly elevates the scapula, and assists downward rotation of the glenoid. It works with rhomboid major to steady the medial border.',
    innervation: 'Dorsal scapular nerve (C4–C5).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`rhomb_min_${s}`], boneMeshes: vertebrae('c7', 't1') },
      { kind: 'insertion', label: 'Insertion · root of spine', muscleMeshes: [`rhomb_min_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'medial' },
    ],
  },

  levator_scapulae: {
    id: 'levator_scapulae',
    description:
      'A strap-like muscle of the posterior neck and upper back. Its upper part is relatively superficial in the posterior triangle; its lower part disappears under trapezius on its way to the superior angle of the scapula.',
    origin:
      'The posterior tubercles of the transverse processes of C1–C4.',
    insertion:
      'The superior angle and the adjacent medial border of the scapula, above the root of the spine.',
    action:
      'Elevates the scapula and assists downward rotation of the glenoid (as when lowering the arm). With the scapula fixed, it can laterally flex and slightly rotate the neck to the same side.',
    innervation: 'Dorsal scapular nerve (C5), with direct twigs from the anterior rami of C3–C4.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · cervical transverses', muscleMeshes: [`lev_scap_${s}`], boneMeshes: vertebrae('c1', 'c2', 'c3', 'c4') },
      { kind: 'insertion', label: 'Insertion · superior angle', muscleMeshes: [`lev_scap_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'cranial' },
    ],
  },

  supraspinatus: {
    id: 'supraspinatus',
    description:
      'One of the four rotator-cuff muscles. It fills the supraspinous fossa, passes under the acromion and through the subacromial space, and is the cuff muscle most often involved in impingement and tendon tears. “Rotator cuff” names the group, not this muscle alone.',
    origin:
      'The medial two-thirds of the supraspinous fossa of the scapula, and the deep surface of the supraspinous fascia.',
    insertion:
      'The highest facet on the greater tubercle of the humerus, and the adjacent capsule of the shoulder joint.',
    action:
      'Initiates abduction of the arm (the first 15° or so) and then works with deltoid. It also steadies the humeral head in the glenoid, especially during abduction.',
    innervation: 'Suprascapular nerve (C5–C6).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`supra_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · greater tubercle', muscleMeshes: [`supra_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'cranial' },
    ],
  },

  infraspinatus: {
    id: 'infraspinatus',
    description:
      'A thick, triangular rotator-cuff muscle filling the infraspinous fossa. It is a powerful external rotator of the arm and helps hold the humeral head in the glenoid. “Rotator cuff” names the group, not this muscle alone.',
    origin:
      'The medial two-thirds of the infraspinous fossa of the scapula, and the deep surface of the infraspinous fascia.',
    insertion:
      'The middle facet on the greater tubercle of the humerus, just below supraspinatus, and the adjacent posterior capsule of the shoulder.',
    action:
      'Laterally (externally) rotates the arm and steadies the humeral head in the glenoid. The lower fibers may also assist adduction of the raised arm.',
    innervation: 'Suprascapular nerve (C5–C6), which reaches the muscle after passing through the spinoglenoid notch.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`infra_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · greater tubercle', muscleMeshes: [`infra_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'posterior' },
    ],
  },

  subscapularis: {
    id: 'subscapularis',
    description:
      'The largest rotator-cuff muscle, filling the subscapular fossa on the costal surface of the scapula. It is the cuff’s principal internal rotator. “Rotator cuff” names the group, not this muscle alone.',
    origin:
      'The medial two-thirds of the subscapular fossa (the costal surface of the scapula), including tendinous intersections attached to the bony ridges of the fossa.',
    insertion:
      'The lesser tubercle of the humerus and the anterior capsule of the shoulder joint. A bursa usually separates the tendon from the neck of the scapula and the coracoid process.',
    action:
      'Medially (internally) rotates the arm and adducts it, and is a major stabilizer of the humeral head in the glenoid, especially against anterior translation.',
    innervation: 'Upper and lower subscapular nerves (C5–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`subscap_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · lesser tubercle', muscleMeshes: [`subscap_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'anterior' },
    ],
  },

  teres_major: {
    id: 'teres_major',
    description:
      'A thick, rounded muscle along the inferior border of the scapula. It is not a rotator-cuff muscle. With latissimus dorsi (which is not in this pack) it forms the posterior wall of the axilla and inserts on the medial lip of the intertubercular sulcus.',
    origin:
      'The posterior surface of the inferior angle of the scapula, and the adjacent lower part of the lateral (axillary) border.',
    insertion:
      'The medial lip of the intertubercular (bicipital) sulcus of the humerus, just behind the tendon of latissimus dorsi when that muscle is present.',
    action:
      'Adducts, extends, and medially rotates the arm. It is particularly active in pulling the raised arm downward (for example, climbing or swimming).',
    innervation: 'Lower subscapular nerve (C5–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · inferior angle', muscleMeshes: [`teres_maj_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · medial lip', muscleMeshes: [`teres_maj_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
    ],
  },

  teres_minor: {
    id: 'teres_minor',
    description:
      'A narrow rotator-cuff muscle along the upper part of the lateral scapular border, just above teres major and often partly blended with infraspinatus. “Rotator cuff” names the group, not this muscle alone.',
    origin:
      'The upper two-thirds of the dorsal surface of the lateral border of the scapula, and the adjacent fascia.',
    insertion:
      'The lowest facet on the greater tubercle of the humerus, below infraspinatus, and the adjacent posterior capsule of the shoulder.',
    action:
      'Laterally rotates the arm and weakly adducts it, and helps hold the humeral head in the glenoid.',
    innervation: 'Axillary nerve (C5–C6).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · lateral border', muscleMeshes: [`teres_min_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · greater tubercle', muscleMeshes: [`teres_min_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'posterior' },
    ],
  },

  serratus_posterior_superior: {
    id: 'serratus_posterior_superior',
    description:
      'A thin, sheet-like muscle of the upper back, deep to the rhomboids and trapezius, with a saw-toothed insertion on the upper ribs. Its contribution to breathing is modest; it is often described as a thin accessory muscle of inspiration.',
    origin:
      'The lower part of the nuchal ligament and the spinous processes of C7–T3, with the intervening supraspinous ligaments.',
    insertion:
      'The upper borders of ribs 2–5, just lateral to their angles.',
    action:
      'Elevates ribs 2–5 and may assist inspiration. It also steadies those ribs. Its role in respiration is probably small in quiet breathing.',
    innervation: 'The second to fifth intercostal nerves (anterior rami of T2–T5).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`serr_post_sup_${s}`], boneMeshes: vertebrae('c7', 't1', 't2', 't3') },
      { kind: 'insertion', label: 'Insertion · ribs', muscleMeshes: [`serr_post_sup_${s}`], boneMeshes: ribs(s, 2, 5) },
    ],
  },

  serratus_posterior_inferior: {
    id: 'serratus_posterior_inferior',
    description:
      'A thin, sheet-like muscle of the lower back, deep to latissimus dorsi (which is not in this pack) and the thoracolumbar fascia, with a saw-toothed insertion on the lower ribs.',
    origin:
      'The spinous processes of T11–L2 (sometimes T10–L3) and the intervening supraspinous ligaments, via the thoracolumbar fascia.',
    insertion:
      'The inferior borders of ribs 9–12, just lateral to their angles.',
    action:
      'Depresses the lower ribs and may assist forced expiration, or stabilize the lower ribs against the pull of the diaphragm. As with its upper counterpart, its respiratory role is modest.',
    innervation: 'The ninth to twelfth intercostal and subcostal nerves (anterior rami of T9–T12).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`serr_post_inf_${s}`], boneMeshes: vertebrae('t11', 't12', 'l1', 'l2') },
      { kind: 'insertion', label: 'Insertion · lower ribs', muscleMeshes: [`serr_post_inf_${s}`], boneMeshes: ribs(s, 9, 12) },
    ],
  },

  transversus_thoracis: {
    id: 'transversus_thoracis',
    description:
      'A thin muscle on the inner surface of the anterior chest wall, running from the lower sternum out to the costal cartilages. It is the thoracic counterpart of transversus abdominis (which is not in this pack) and lies deep to the internal thoracic vessels.',
    origin:
      'The posterior surface of the lower third of the sternal body, the xiphoid process, and the adjoining costal cartilages of the lower true ribs (typically 4–7).',
    insertion:
      'The inner surfaces of the costal cartilages of ribs 2–6, as slips that climb laterally and upward.',
    action:
      'Depresses the costal cartilages and may assist expiration. It also steadies the chest wall from within.',
    innervation: 'The second to sixth intercostal nerves.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · sternum', muscleMeshes: [`trans_thor_${s}`], boneMeshes: ['sternum_body', 'sternum_xiphoid'], prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · costal cartilages', muscleMeshes: [`trans_thor_${s}`], boneMeshes: ribs(s, 2, 6), prefer: 'anterior' },
    ],
  },

  coracobrachialis: {
    id: 'coracobrachialis',
    description:
      'The smallest muscle of the anterior compartment of the arm. It arises with the short head of biceps from the coracoid process and is pierced by the musculocutaneous nerve.',
    origin:
      'The tip of the coracoid process of the scapula, in common with the short head of biceps brachii.',
    insertion:
      'The middle third of the medial surface of the humeral shaft, between the attachments of triceps and brachialis.',
    action:
      'Flexes and adducts the arm at the shoulder, and helps stabilize the humeral head in the glenoid.',
    innervation: 'Musculocutaneous nerve (C5–C7), which typically pierces the muscle.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · coracoid', muscleMeshes: [`coracobrach_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · mid-humerus', muscleMeshes: [`coracobrach_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
    ],
  },

  brachialis: {
    id: 'brachialis',
    description:
      'The workhorse flexor of the elbow, lying deep to biceps brachii and covering the anterior surface of the lower humerus. Unlike biceps, it attaches only at the elbow and is active in all positions of the forearm.',
    origin:
      'The distal half of the anterior surface of the humerus, and the adjacent medial and lateral intermuscular septa.',
    insertion:
      'The coronoid process and the ulnar tuberosity of the ulna, and a small slip sometimes to the capsule of the elbow.',
    action:
      'The chief flexor of the elbow, equally effective whether the forearm is pronated or supinated.',
    innervation:
      'Musculocutaneous nerve (C5–C7). The lateral part of the muscle often also receives a branch from the radial nerve.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`brachialis_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · ulnar tuberosity', muscleMeshes: [`brachialis_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
    ],
  },

  brachioradialis: {
    id: 'brachioradialis',
    description:
      'The most superficial muscle on the radial side of the forearm, forming the lateral border of the cubital fossa. Although it sits in the extensor compartment and is supplied by the radial nerve, it is a flexor of the elbow.',
    origin:
      'The proximal two-thirds of the lateral supracondylar ridge of the humerus, and the lateral intermuscular septum.',
    insertion:
      'The lateral surface of the distal radius, just proximal to the radial styloid process.',
    action:
      'Flexes the elbow, most strongly when the forearm is in the midprone (thumb-up) position. It can also help return a fully pronated or fully supinated forearm toward the midprone position.',
    innervation: 'Radial nerve (C5–C6), given off before the nerve divides into superficial and deep branches.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`brachiorad_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · radial styloid', muscleMeshes: [`brachiorad_${s}`], boneMeshes: side(s, ['radius']), prefer: 'caudal' },
    ],
  },

  anconeus: {
    id: 'anconeus',
    description:
      'A small, triangular muscle on the posterolateral elbow, often regarded as a continuation of the medial head of triceps. It covers the posterior capsule and the annular ligament from behind.',
    origin:
      'The posterior surface of the lateral epicondyle of the humerus.',
    insertion:
      'The lateral surface of the olecranon and the upper quarter of the posterior surface of the ulna.',
    action:
      'Assists triceps in extending the elbow, and may abduct the ulna slightly during pronation (keeping the hand in line as the radius rotates). It also tenses the posterior capsule of the elbow.',
    innervation: 'Radial nerve (C6–C8), often a continuation of the branch to the medial head of triceps.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · lateral epicondyle', muscleMeshes: [`anconeus_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · olecranon', muscleMeshes: [`anconeus_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
    ],
  },
  pronator_teres: {
    id: 'pronator_teres',
    description:
      'The most lateral of the superficial flexors of the forearm, with humeral and ulnar heads that the median nerve usually passes between. It forms the medial border of the cubital fossa.',
    origin:
      'Humeral head: the medial epicondyle of the humerus via the common flexor origin, and the adjacent intermuscular septum. Ulnar (deep) head: the coronoid process of the ulna. This pack keeps the two heads as separate meshes.',
    insertion:
      'A rough oval area on the middle of the lateral surface of the radius.',
    action:
      'Pronates the forearm and assists flexion of the elbow. The humeral head is the more effective pronator of the two.',
    innervation: 'Median nerve (C6–C7), which typically passes between the two heads.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · humeral head', muscleMeshes: [`pt_hum_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
      { kind: 'origin', label: 'Origin · ulnar head', muscleMeshes: [`pt_uln_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · mid-radius', muscleMeshes: side(s, ['pt_hum', 'pt_uln']), boneMeshes: side(s, ['radius']), prefer: 'lateral' },
    ],
  },

  pronator_quadratus: {
    id: 'pronator_quadratus',
    description:
      'A flat, square muscle in the deepest layer of the anterior forearm, stretching between the distal radius and ulna. It is the principal pronator in ordinary movements, with pronator teres recruited for speed or force.',
    origin:
      'The oblique ridge on the anterior surface of the distal quarter of the ulna.',
    insertion:
      'The anterior surface of the distal quarter of the radius, and the adjacent interosseous membrane.',
    action:
      'The prime pronator of the forearm. It also binds the distal radius and ulna together and helps stabilize the distal radioulnar joint.',
    innervation: 'Anterior interosseous nerve, a branch of the median nerve (C7–C8, sometimes T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · distal ulna', muscleMeshes: [`pron_quad_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · distal radius', muscleMeshes: [`pron_quad_${s}`], boneMeshes: side(s, ['radius']), prefer: 'caudal' },
    ],
  },

  flexor_carpi_radialis: {
    id: 'flexor_carpi_radialis',
    description:
      'A superficial flexor of the forearm whose tendon is a familiar landmark at the wrist, just lateral to palmaris longus (when that muscle is present) and over the pulse of the radial artery.',
    origin:
      'The medial epicondyle of the humerus via the common flexor origin, and the adjacent fascia.',
    insertion:
      'The palmar bases of the second and usually the third metacarpals. The tendon passes through its own tunnel in the lateral part of the flexor retinaculum.',
    action:
      'Flexes and abducts the hand at the wrist (radial deviation). It can also weakly flex the elbow and assist pronation.',
    innervation: 'Median nerve (C6–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fcr_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · 2nd–3rd metacarpals', muscleMeshes: [`fcr_${s}`], boneMeshes: side(s, ['metacarpal2', 'metacarpal3']), prefer: 'cranial' },
    ],
  },

  flexor_carpi_ulnaris: {
    id: 'flexor_carpi_ulnaris',
    description:
      'The most medial of the superficial forearm flexors, with humeral and ulnar heads that the ulnar nerve passes between. It is the only muscle of the superficial flexor group supplied by the ulnar nerve. This pack keeps the two heads as separate meshes.',
    origin:
      'Humeral head: the medial epicondyle via the common flexor origin. Ulnar head: the medial margin of the olecranon and the upper two-thirds of the posterior border of the ulna, by an aponeurosis shared with extensor carpi ulnaris and flexor digitorum profundus.',
    insertion:
      'The pisiform (as a sesamoid in the tendon), then onward via the pisohamate and pisometacarpal ligaments to the hook of the hamate and the base of the fifth metacarpal.',
    action:
      'Flexes and adducts the hand at the wrist (ulnar deviation). It also steadies the pisiform so that abductor digiti minimi can act on the little finger.',
    innervation: 'Ulnar nerve (C7–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · humeral head', muscleMeshes: [`fcu_hum_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
      { kind: 'origin', label: 'Origin · ulnar head', muscleMeshes: [`fcu_uln_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · pisiform', muscleMeshes: side(s, ['fcu_hum', 'fcu_uln']), boneMeshes: side(s, ['pisiform']) },
      { kind: 'insertion', label: 'Insertion · hamate / 5th MC', muscleMeshes: side(s, ['fcu_hum', 'fcu_uln']), boneMeshes: side(s, ['hamate', 'metacarpal5']) },
    ],
  },

  palmaris_longus: {
    id: 'palmaris_longus',
    description:
      'A slender, often absent superficial flexor whose long tendon is the most midline tendon at the front of the wrist, superficial to the flexor retinaculum. It inserts into the palmar aponeurosis; this model has no aponeurosis mesh, so only the bony origin is labelled.',
    origin:
      'The medial epicondyle of the humerus via the common flexor origin, and the adjacent fascia.',
    insertion:
      'The flexor retinaculum and the palmar aponeurosis (the latter is not a separate mesh in this pack). A few fibers may reach the skin of the palm.',
    action:
      'Tenses the palmar aponeurosis and weakly flexes the hand at the wrist. It is a frequent tendon-graft donor and is missing on one or both sides in a substantial minority of people; it is present as a mesh in this model.',
    innervation: 'Median nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`pal_long_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'medial' },
    ],
  },

  flexor_digitorum_superficialis: {
    id: 'flexor_digitorum_superficialis',
    description:
      'The large muscle of the intermediate layer of the anterior forearm. Its four tendons pass through the carpal tunnel and split around the profundus tendons at the fingers (camper’s chiasm). This pack splits the muscle into two meshes per side.',
    origin:
      'Humeroulnar head: the medial epicondyle (common flexor origin), the ulnar collateral ligament, and the coronoid process of the ulna. Radial head: the anterior oblique line of the radius. The median nerve and ulnar artery pass between the heads.',
    insertion:
      'The sides of the shafts of the middle phalanges of the index, middle, ring, and little fingers, after each tendon splits to let flexor digitorum profundus through.',
    action:
      'Flexes the proximal interphalangeal joints of the four fingers, and assists flexion at the metacarpophalangeal joints and the wrist.',
    innervation: 'Median nerve (C7–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · humerus / ulna', muscleMeshes: side(s, ['fds_a', 'fds_b']), boneMeshes: side(s, ['humerus', 'ulna']), prefer: 'medial' },
      { kind: 'origin', label: 'Origin · radius', muscleMeshes: side(s, ['fds_a', 'fds_b']), boneMeshes: side(s, ['radius']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · middle phalanges', muscleMeshes: side(s, ['fds_a', 'fds_b']), boneMeshes: side(s, ['phal_hand_mid_index', 'phal_hand_mid_middle', 'phal_hand_mid_ring', 'phal_hand_mid_little']) },
    ],
  },

  flexor_digitorum_profundus: {
    id: 'flexor_digitorum_profundus',
    description:
      'The deep flexor of the fingers, lying on the ulna and interosseous membrane. Its four tendons pass through the carpal tunnel, then through the splits in the FDS tendons, to the distal phalanges. It is the only muscle that flexes the DIP joints of the fingers.',
    origin:
      'The proximal three-quarters of the anterior and medial surfaces of the ulna (including the medial side of the coronoid process), the adjacent medial half of the interosseous membrane, and a caudal aponeurosis from the ulna shared with flexor carpi ulnaris.',
    insertion:
      'The palmar bases of the distal phalanges of the index, middle, ring, and little fingers.',
    action:
      'Flexes the distal interphalangeal joints of the four fingers, and assists flexion at the PIP and MCP joints and the wrist.',
    innervation:
      'Lateral half (index and middle fingers): anterior interosseous nerve (median, C8–T1). Medial half (ring and little fingers): ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fdp_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · distal phalanges', muscleMeshes: [`fdp_${s}`], boneMeshes: side(s, ['phal_hand_dist_index', 'phal_hand_dist_middle', 'phal_hand_dist_ring', 'phal_hand_dist_little']) },
    ],
  },

  flexor_pollicis_longus: {
    id: 'flexor_pollicis_longus',
    description:
      'The deep flexor of the thumb, lying on the radius beside flexor digitorum profundus. It is the only muscle that flexes the interphalangeal joint of the thumb. “Flexor pollicis” alone is not a correct name for this muscle (flexor pollicis brevis is a separate thenar muscle).',
    origin:
      'The anterior surface of the middle third (roughly) of the radius, distal to the radial tuberosity, and the adjacent lateral half of the interosseous membrane. A variable slip may arise from the medial epicondyle or coronoid process.',
    insertion:
      'The palmar base of the distal phalanx of the thumb.',
    action:
      'Flexes the interphalangeal joint of the thumb, and assists flexion at the MCP and carpometacarpal joints of the thumb.',
    innervation: 'Anterior interosseous nerve (median, C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fpl_${s}`], boneMeshes: side(s, ['radius']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · distal phalanx', muscleMeshes: [`fpl_${s}`], boneMeshes: side(s, ['phal_hand_dist_thumb']) },
    ],
  },

  supinator: {
    id: 'supinator',
    description:
      'A deep muscle that wraps around the proximal radius from the ulna and lateral epicondyle. The deep branch of the radial nerve (posterior interosseous nerve) passes between its superficial and deep laminae, a site of entrapment (arcade of Frohse).',
    origin:
      'The lateral epicondyle of the humerus, the radial collateral and annular ligaments of the elbow, and the supinator crest and fossa of the ulna.',
    insertion:
      'The lateral, posterior, and anterior surfaces of the proximal third of the radius, down as far as the insertion of pronator teres.',
    action:
      'Supinates the forearm. It is the main supinator when the elbow is extended; biceps brachii becomes the more powerful supinator when the elbow is flexed.',
    innervation: 'Deep branch of the radial nerve / posterior interosseous nerve (C6–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · humerus', muscleMeshes: [`supinator_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'origin', label: 'Origin · ulna', muscleMeshes: [`supinator_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · proximal radius', muscleMeshes: [`supinator_${s}`], boneMeshes: side(s, ['radius']), prefer: 'cranial' },
    ],
  },

  extensor_carpi_radialis_longus: {
    id: 'extensor_carpi_radialis_longus',
    description:
      'A superficial extensor on the radial side of the forearm, arising above the lateral epicondyle. Its tendon, with that of extensor carpi radialis brevis, bounds the anatomical snuffbox posteriorly. “Extensor carpi radialis” names the pair, not this muscle alone.',
    origin:
      'The distal third of the lateral supracondylar ridge of the humerus, and the lateral intermuscular septum (just below brachioradialis).',
    insertion:
      'The dorsal base of the second metacarpal.',
    action:
      'Extends and abducts the hand at the wrist (radial deviation). It is important in the grip, stabilizing the wrist in extension while the finger flexors work.',
    innervation: 'Radial nerve (C6–C7), given off before the nerve divides.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`ecrl_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · 2nd metacarpal', muscleMeshes: [`ecrl_${s}`], boneMeshes: side(s, ['metacarpal2']), prefer: 'cranial' },
    ],
  },

  extensor_carpi_radialis_brevis: {
    id: 'extensor_carpi_radialis_brevis',
    description:
      'A superficial radial extensor arising from the common extensor origin. It is the muscle most often implicated in lateral epicondylalgia (tennis elbow). “Extensor carpi radialis” names the pair, not this muscle alone.',
    origin:
      'The lateral epicondyle of the humerus via the common extensor origin, the radial collateral ligament, and the adjacent fascia.',
    insertion:
      'The dorsal base of the third metacarpal, with a small slip sometimes to the second.',
    action:
      'Extends and abducts the hand at the wrist, and is especially important for stabilizing the wrist in extension during grip.',
    innervation: 'Deep branch of the radial nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`ecrb_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · 3rd metacarpal', muscleMeshes: [`ecrb_${s}`], boneMeshes: side(s, ['metacarpal3']), prefer: 'cranial' },
    ],
  },

  extensor_carpi_ulnaris: {
    id: 'extensor_carpi_ulnaris',
    description:
      'The most medial superficial extensor of the forearm. Its tendon runs in a groove between the head of the ulna and the styloid process, in its own compartment of the extensor retinaculum. This pack splits the muscle into two meshes per side.',
    origin:
      'The lateral epicondyle via the common extensor origin, and the posterior border of the ulna by an aponeurosis shared with flexor carpi ulnaris and flexor digitorum profundus.',
    insertion:
      'The medial side of the base of the fifth metacarpal (sometimes also a slip to the fourth).',
    action:
      'Extends and adducts the hand at the wrist (ulnar deviation). It also steadies the wrist in grip and helps stabilize the distal radioulnar joint during rotation of the forearm.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · humerus', muscleMeshes: side(s, ['ecu_a', 'ecu_b']), boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'origin', label: 'Origin · ulna', muscleMeshes: side(s, ['ecu_a', 'ecu_b']), boneMeshes: side(s, ['ulna']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · 5th metacarpal', muscleMeshes: side(s, ['ecu_a', 'ecu_b']), boneMeshes: side(s, ['metacarpal5']), prefer: 'cranial' },
    ],
  },

  extensor_digitorum: {
    id: 'extensor_digitorum',
    description:
      'The broad superficial extensor of the four fingers, in the middle of the posterior forearm. Its tendons pass under the extensor retinaculum and flatten into extensor hoods on the dorsum of the fingers. This is the forearm muscle properly called extensor digitorum (not extensor digitorum longus of the leg).',
    origin:
      'The lateral epicondyle of the humerus via the common extensor origin, and the adjacent fascia.',
    insertion:
      'The extensor hoods of the index, middle, ring, and little fingers, which in turn attach to the dorsal bases of the middle and distal phalanges. Junctional slips (juncturae tendinum) link the tendons on the back of the hand.',
    action:
      'Extends the fingers at the MCP joints (and, via the hood, assists extension at the interphalangeal joints), and assists extension of the wrist.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`ext_dig_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · finger hoods', muscleMeshes: [`ext_dig_${s}`], boneMeshes: side(s, ['phal_hand_prox_index', 'phal_hand_prox_middle', 'phal_hand_prox_ring', 'phal_hand_prox_little', 'phal_hand_mid_index', 'phal_hand_mid_middle', 'phal_hand_mid_ring', 'phal_hand_mid_little']) },
    ],
  },

  extensor_digiti_minimi: {
    id: 'extensor_digiti_minimi',
    description:
      'A slender superficial extensor, often partly fused with extensor digitorum, that gives the little finger its own extra extensor tendon (usually in the fifth extensor compartment, separate from extensor digitorum).',
    origin:
      'The lateral epicondyle of the humerus via the common extensor origin, and the adjacent intermuscular septum.',
    insertion:
      'The extensor hood of the little finger, usually as two slips, one of which may join the tendon of extensor digitorum.',
    action:
      'Extends the little finger at the MCP joint and assists extension at its interphalangeal joints. It can also assist ulnar deviation of the wrist.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`edm_${s}`], boneMeshes: side(s, ['humerus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · little finger', muscleMeshes: [`edm_${s}`], boneMeshes: side(s, ['phal_hand_prox_little', 'phal_hand_mid_little']) },
    ],
  },

  extensor_indicis: {
    id: 'extensor_indicis',
    description:
      'A deep extensor of the forearm that gives the index finger an independent extensor tendon, joining the ulnar side of the extensor digitorum tendon to that finger.',
    origin:
      'The posterior surface of the distal third of the ulna, distal to extensor pollicis longus, and the adjacent interosseous membrane.',
    insertion:
      'The extensor hood of the index finger, usually on the ulnar side of the extensor digitorum tendon.',
    action:
      'Extends the index finger independently of the other fingers, and assists extension of the wrist.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`ext_ind_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · index hood', muscleMeshes: [`ext_ind_${s}`], boneMeshes: side(s, ['phal_hand_prox_index', 'phal_hand_mid_index']) },
    ],
  },

  abductor_pollicis_longus: {
    id: 'abductor_pollicis_longus',
    description:
      'A deep outcropping muscle of the posterior forearm. Its tendon forms the anterior (lateral) boundary of the anatomical snuffbox, with extensor pollicis brevis. “Abductor pollicis” alone is not a correct name for this muscle (abductor pollicis brevis is a separate thenar muscle).',
    origin:
      'The posterior surfaces of the proximal radius and ulna (distal to anconeus / supinator) and the intervening interosseous membrane.',
    insertion:
      'The radial side of the base of the first metacarpal. A slip often also reaches trapezium or the thenar muscles.',
    action:
      'Abducts and extends the thumb at the carpometacarpal joint, and assists radial deviation (and slight flexion) of the wrist.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · radius / ulna', muscleMeshes: [`apl_${s}`], boneMeshes: side(s, ['radius', 'ulna']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · 1st metacarpal', muscleMeshes: [`apl_${s}`], boneMeshes: side(s, ['metacarpal1']), prefer: 'cranial' },
    ],
  },

  extensor_pollicis_longus: {
    id: 'extensor_pollicis_longus',
    description:
      'A deep outcropping muscle whose tendon hooks around Lister’s (dorsal) tubercle of the radius and then forms the posterior (medial) boundary of the anatomical snuffbox. “Extensor pollicis” alone is not a correct name for this muscle.',
    origin:
      'The posterior surface of the middle third of the ulna, distal to abductor pollicis longus, and the adjacent interosseous membrane.',
    insertion:
      'The dorsal base of the distal phalanx of the thumb.',
    action:
      'Extends the thumb at the interphalangeal, MCP, and carpometacarpal joints. Because the tendon turns around Lister’s tubercle, it also adducts and laterally rotates the thumb slightly as it extends.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`epl_${s}`], boneMeshes: side(s, ['ulna']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · distal phalanx', muscleMeshes: [`epl_${s}`], boneMeshes: side(s, ['phal_hand_dist_thumb']) },
    ],
  },

  extensor_pollicis_brevis: {
    id: 'extensor_pollicis_brevis',
    description:
      'A deep outcropping muscle lying distal to abductor pollicis longus. Its tendon travels with APL in the first extensor compartment and forms the anterior boundary of the anatomical snuffbox. “Extensor pollicis” alone is not a correct name for this muscle.',
    origin:
      'The posterior surface of the distal radius (distal to abductor pollicis longus) and the adjacent interosseous membrane.',
    insertion:
      'The dorsal base of the proximal phalanx of the thumb. A slip may reach the distal phalanx or the first metacarpal.',
    action:
      'Extends the thumb at the MCP and carpometacarpal joints, and assists abduction of the thumb and radial deviation of the wrist.',
    innervation: 'Posterior interosseous nerve (C7–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`epb_${s}`], boneMeshes: side(s, ['radius']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`epb_${s}`], boneMeshes: side(s, ['phal_hand_prox_thumb']) },
    ],
  },
  gluteus_medius: {
    id: 'gluteus_medius',
    description:
      'A thick, fan-shaped muscle on the outer surface of the ilium, partly covered posteriorly by gluteus maximus and left exposed above the trochanter (the surface of intramuscular injections). It is the chief abductor of the hip and a key pelvic stabilizer in single-leg stance.',
    origin:
      'The outer surface of the ilium between the anterior and posterior gluteal lines, and the gluteal aponeurosis that covers it. In this model the hip is a single fused os coxae mesh, so the origin label marks the muscle’s nearest approach to that iliac surface.',
    insertion:
      'The lateral surface of the greater trochanter of the femur, on a ridge or facet running from front to back.',
    action:
      'Abducts the thigh. The anterior fibers also medially rotate (and can flex) the hip; the posterior fibers laterally rotate (and can extend) it. In walking it steadies the pelvis on the stance-side femur and prevents the opposite side from dropping (Trendelenburg sign when it is weak).',
    innervation: 'Superior gluteal nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ilium', muscleMeshes: [`glut_med_${s}`], boneMeshes: side(s, ['hip']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`glut_med_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  gluteus_minimus: {
    id: 'gluteus_minimus',
    description:
      'The smallest and deepest of the three gluteal muscles, lying under gluteus medius on the ilium. It shares the superior gluteal nerve and works closely with the anterior part of gluteus medius.',
    origin:
      'The outer surface of the ilium between the anterior and inferior gluteal lines. As with the other hip muscles, the origin label is on the fused os coxae mesh.',
    insertion:
      'The anterolateral ridge of the greater trochanter of the femur, and often a slip to the capsule of the hip.',
    action:
      'Abducts the thigh and medially rotates it, and helps steady the pelvis in single-leg stance, working with gluteus medius.',
    innervation: 'Superior gluteal nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ilium', muscleMeshes: [`glut_min_${s}`], boneMeshes: side(s, ['hip']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`glut_min_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  tensor_fasciae_latae: {
    id: 'tensor_fasciae_latae',
    description:
      'A short, fusiform muscle on the anterolateral hip, enclosed between two layers of the fascia lata. It feeds into the iliotibial tract; this model has no IT-tract mesh, so the insertion label marks the muscle’s nearest approach to the tibia (Gerdy’s tubercle) rather than a made-up tract coordinate.',
    origin:
      'The outer lip of the iliac crest from the anterior superior iliac spine back for a short distance, and the adjacent fascia lata. The bony label is on the fused os coxae mesh, in the region of the ASIS and iliac crest.',
    insertion:
      'The iliotibial tract, about a third of the way down the thigh; the tract itself continues to Gerdy’s tubercle on the anterolateral tibia. (No IT-tract mesh is present.)',
    action:
      'Tenses the fascia lata and the iliotibial tract, and assists flexion, abduction, and medial rotation of the thigh. Through the tract it also helps stabilize the extended knee.',
    innervation: 'Superior gluteal nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ASIS / crest', muscleMeshes: [`tfl_${s}`], boneMeshes: side(s, ['hip']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · Gerdy’s tubercle (via IT tract)', muscleMeshes: [`tfl_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'lateral' },
    ],
  },

  sartorius: {
    id: 'sartorius',
    description:
      'The longest muscle in the body, a narrow strap that crosses the thigh from the ASIS to the medial tibia. It forms the lateral border of the femoral triangle and, with gracilis and semitendinosus, the pes anserinus on the medial tibia.',
    origin:
      'The anterior superior iliac spine and the upper half of the notch just below it, on the fused os coxae mesh.',
    insertion:
      'The superior part of the medial surface of the tibia, in the pes anserinus, anterior to gracilis and semitendinosus. A bursa usually separates the tendons from the tibia and from one another.',
    action:
      'Flexes, abducts, and laterally rotates the thigh at the hip, and flexes and slightly medially rotates the leg at the knee — the “tailor’s position” that gives the muscle its name. It is a weak contributor to each of these actions.',
    innervation: 'Femoral nerve (L2–L3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ASIS', muscleMeshes: [`sartorius_${s}`], boneMeshes: side(s, ['hip']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · pes anserinus', muscleMeshes: [`sartorius_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'medial' },
    ],
  },

  pectineus: {
    id: 'pectineus',
    description:
      'A flat, quadrangular muscle of the floor of the femoral triangle, spanning from the pectineal line of the pubis to the upper femur. It is often described as a transitional muscle between the iliopsoas and adductor groups, and may receive a double nerve supply.',
    origin:
      'The pectineal line (pecten pubis) and the adjacent bone of the superior pubic ramus, on the fused os coxae mesh.',
    insertion:
      'The pectineal line of the femur, a line running from the lesser trochanter toward the linea aspera, behind and below the lesser trochanter.',
    action:
      'Adducts and flexes the thigh, and assists medial rotation (some descriptions also allow a little lateral rotation, depending on the starting position).',
    innervation:
      'Femoral nerve (L2–L3). A frequent additional branch from the accessory obturator or the obturator nerve supplies the medial part of the muscle.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pecten pubis', muscleMeshes: [`pectineus_${s}`], boneMeshes: side(s, ['hip']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · pectineal line', muscleMeshes: [`pectineus_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  adductor_longus: {
    id: 'adductor_longus',
    description:
      'The most anterior of the three named adductor muscles of the thigh, forming the medial border of the femoral triangle. “Hip adductors” names the group, not this muscle alone.',
    origin:
      'A small, rough area on the front of the body of the pubis, in the angle between the pubic crest and the pubic symphysis, on the fused os coxae mesh.',
    insertion:
      'The middle third of the linea aspera of the femur, on its medial lip.',
    action:
      'Adducts the thigh, and can assist flexion and medial rotation, depending on the position of the hip.',
    innervation: 'Anterior division of the obturator nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pubis', muscleMeshes: [`add_long_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · linea aspera', muscleMeshes: [`add_long_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  adductor_brevis: {
    id: 'adductor_brevis',
    description:
      'A short, triangular adductor lying immediately behind adductor longus and in front of adductor magnus. The two divisions of the obturator nerve pass, respectively, in front of and behind it. “Hip adductors” names the group, not this muscle alone.',
    origin:
      'The outer surface of the body and inferior ramus of the pubis, between gracilis and obturator externus, on the fused os coxae mesh.',
    insertion:
      'The upper part of the linea aspera of the femur, and the line leading from the lesser trochanter to the linea aspera, behind pectineus.',
    action:
      'Adducts the thigh, and can assist flexion of the hip.',
    innervation: 'Obturator nerve (L2–L4), often the anterior division, sometimes also the posterior.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pubis', muscleMeshes: [`add_brev_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · upper linea aspera', muscleMeshes: [`add_brev_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  adductor_magnus: {
    id: 'adductor_magnus',
    description:
      'The largest and deepest of the adductors, with an adductor (pubofemoral) part and a hamstring (ischiocondylar) part that has a different nerve supply and a different insertion at the adductor tubercle. The adductor hiatus between the two parts transmits the femoral vessels. Adductor minimus is catalogued separately in this pack. “Hip adductors” names the group, not this muscle alone.',
    origin:
      'The inferior pubic ramus, the ramus of the ischium, and the inferolateral part of the ischial tuberosity, on the fused os coxae mesh. The ischial fibers belong to the hamstring part.',
    insertion:
      'Adductor part: the gluteal tuberosity, the linea aspera, and the medial supracondylar line. Hamstring part: the adductor tubercle on the medial epicondyle of the femur, by a rounded tendon.',
    action:
      'The adductor part adducts and can flex the thigh. The hamstring part extends the thigh (and still adducts it). Together they are powerful adductors of the hip.',
    innervation:
      'Adductor part: posterior division of the obturator nerve (L2–L4). Hamstring part: tibial division of the sciatic nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`add_mag_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · linea aspera', muscleMeshes: [`add_mag_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  adductor_minimus: {
    id: 'adductor_minimus',
    description:
      'An upper, more horizontal slip of adductor magnus, sometimes described as a separate muscle. In this pack it has its own mesh, so it is a separate playable item; “adductor magnus” is not a correct name for this slip alone.',
    origin:
      'The inferior pubic ramus, just below the origin of adductor brevis, on the fused os coxae mesh.',
    insertion:
      'The upper part of the medial lip of the linea aspera and the adjacent gluteal tuberosity of the femur, above the main adductor magnus insertion.',
    action:
      'Adducts the thigh and can assist lateral rotation of the hip (as the upper fibers of adductor magnus do).',
    innervation: 'Obturator nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pubic ramus', muscleMeshes: [`add_min_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · upper femur', muscleMeshes: [`add_min_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  gracilis: {
    id: 'gracilis',
    description:
      'The most superficial and medial muscle of the adductor group, a long, thin strap that is the only adductor to cross the knee. Distally it joins sartorius and semitendinosus in the pes anserinus.',
    origin:
      'The inferior margin of the body and inferior ramus of the pubis, on the fused os coxae mesh, just behind the adductor longus origin.',
    insertion:
      'The superior part of the medial surface of the tibia, in the pes anserinus, between sartorius and semitendinosus.',
    action:
      'Adducts the thigh, flexes the leg at the knee, and medially rotates the tibia when the knee is flexed.',
    innervation: 'Anterior division of the obturator nerve (L2–L3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pubis', muscleMeshes: [`gracilis_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · pes anserinus', muscleMeshes: [`gracilis_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'medial' },
    ],
  },

  piriformis: {
    id: 'piriformis',
    description:
      'A pear-shaped muscle that leaves the pelvis through the greater sciatic foramen and inserts on the greater trochanter. It divides that foramen into supra- and infrapiriform compartments; the sciatic nerve usually leaves the pelvis just below it (with well-known variations).',
    origin:
      'The anterior (pelvic) surface of the sacrum, typically from the second to fourth sacral segments, by slips between the sacral foramina, and often from the upper margin of the greater sciatic notch and the sacrotuberous ligament.',
    insertion:
      'The medial side of the upper border of the greater trochanter of the femur, often blending with the common tendon of obturator internus and the gemelli.',
    action:
      'Laterally rotates the extended thigh, and abducts the flexed thigh. It also steadies the femoral head in the acetabulum.',
    innervation: 'Nerve to piriformis (S1–S2), from the sacral plexus.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · sacrum', muscleMeshes: [`piriformis_${s}`], boneMeshes: ['sacrum'] },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`piriformis_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  obturator_internus: {
    id: 'obturator_internus',
    description:
      'A muscle of the lateral pelvic wall that makes a sharp turn around the lesser sciatic notch (over a cartilaginous pulley) and then runs to the greater trochanter, flanked by the two gemelli. “Obturator muscles” names the internus/externus pair, not this muscle alone.',
    origin:
      'The pelvic surface of the obturator membrane and the surrounding bone of the ischiopubic rami and ilium, on the inner aspect of the fused os coxae mesh.',
    insertion:
      'The medial surface of the greater trochanter, in front of the trochanteric fossa, usually by a common tendon with the gemelli.',
    action:
      'Laterally rotates the extended thigh and abducts the flexed thigh, and steadies the femoral head in the acetabulum.',
    innervation: 'Nerve to obturator internus (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · obturator membrane', muscleMeshes: [`obt_int_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`obt_int_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  obturator_externus: {
    id: 'obturator_externus',
    description:
      'A triangular muscle on the outer surface of the obturator membrane, running behind the neck of the femur to the trochanteric fossa. It is the deepest of the short lateral rotators from the front of the hip. “Obturator muscles” names the internus/externus pair, not this muscle alone.',
    origin:
      'The outer surface of the obturator membrane and the adjacent bone of the ischiopubic rami, on the fused os coxae mesh.',
    insertion:
      'The trochanteric fossa on the medial surface of the greater trochanter of the femur.',
    action:
      'Laterally rotates the thigh, and may assist adduction. It also steadies the femoral head in the acetabulum.',
    innervation: 'Posterior division of the obturator nerve (L3–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`obt_ext_${s}`], boneMeshes: side(s, ['hip']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · trochanteric fossa', muscleMeshes: [`obt_ext_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  quadratus_femoris: {
    id: 'quadratus_femoris',
    description:
      'A short, thick, rectangular muscle at the lower edge of the short lateral rotators, running from the ischial tuberosity to the femur just below the intertrochanteric crest. “Quadratus femoris” is this muscle, not quadratus lumborum (which is not in this pack).',
    origin:
      'The upper part of the outer border of the ischial tuberosity, on the fused os coxae mesh.',
    insertion:
      'The quadrate tubercle on the intertrochanteric crest of the femur, and the area just below and behind it.',
    action:
      'Laterally rotates the thigh, and can assist adduction. It also steadies the femoral head in the acetabulum.',
    innervation: 'Nerve to quadratus femoris (L5–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ischial tuberosity', muscleMeshes: [`quad_fem_${s}`], boneMeshes: side(s, ['hip']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · quadrate tubercle', muscleMeshes: [`quad_fem_${s}`], boneMeshes: side(s, ['femur']), prefer: 'posterior' },
    ],
  },

  gemellus_superior: {
    id: 'gemellus_superior',
    description:
      'The upper of the two small gemelli that flank the tendon of obturator internus after it leaves the pelvis. “Gemelli” names the pair, not this muscle alone.',
    origin:
      'The outer surface of the ischial spine, on the fused os coxae mesh.',
    insertion:
      'The medial surface of the greater trochanter, blending with the tendon of obturator internus (and often with gemellus inferior).',
    action:
      'Assists obturator internus: lateral rotation of the extended thigh and abduction of the flexed thigh, and steadies the femoral head.',
    innervation: 'Nerve to obturator internus (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ischial spine', muscleMeshes: [`gem_sup_${s}`], boneMeshes: side(s, ['hip']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`gem_sup_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  gemellus_inferior: {
    id: 'gemellus_inferior',
    description:
      'The lower of the two small gemelli that flank the tendon of obturator internus. “Gemelli” names the pair, not this muscle alone.',
    origin:
      'The upper part of the ischial tuberosity, just below the lesser sciatic notch, on the fused os coxae mesh.',
    insertion:
      'The medial surface of the greater trochanter, blending with the tendon of obturator internus (and often with gemellus superior).',
    action:
      'Assists obturator internus: lateral rotation of the extended thigh and abduction of the flexed thigh, and steadies the femoral head.',
    innervation: 'Nerve to quadratus femoris (L5–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ischial tuberosity', muscleMeshes: [`gem_inf_${s}`], boneMeshes: side(s, ['hip']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · greater trochanter', muscleMeshes: [`gem_inf_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
    ],
  },

  plantaris: {
    id: 'plantaris',
    description:
      'A small muscle of the superficial posterior compartment of the leg, with a tiny belly and a very long, slender tendon that runs between gastrocnemius and soleus to the calcaneus beside (or in) the Achilles tendon. It is absent in some people; it is present as a mesh in this model.',
    origin:
      'The lower part of the lateral supracondylar line of the femur and the oblique popliteal ligament, just above the lateral head of gastrocnemius.',
    insertion:
      'The posterior surface of the calcaneus, usually on the medial side of the Achilles tendon, or into the medial edge of that tendon.',
    action:
      'A weak plantarflexor of the ankle and a weak flexor of the knee. It is often regarded as a vestigial, proprioceptive muscle rather than a significant prime mover.',
    innervation: 'Tibial nerve (S1–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`plantaris_${s}`], boneMeshes: side(s, ['femur']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · calcaneus', muscleMeshes: [`plantaris_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'posterior' },
    ],
  },

  popliteus: {
    id: 'popliteus',
    description:
      'A flat, triangular muscle forming the floor of the popliteal fossa. It is the muscle that “unlocks” the fully extended knee by rotating the tibia (or the femur) at the start of flexion.',
    origin:
      'The lateral surface of the lateral condyle of the femur (in a pit just below the epicondyle), and a slip from the posterior horn of the lateral meniscus and the arcuate popliteal ligament. The tendon is intracapsular but extrasynovial.',
    insertion:
      'The posterior surface of the proximal tibia, above the soleal line, by a triangular fleshy insertion.',
    action:
      'Unlocks the extended knee: in an open chain it medially rotates the tibia on the femur; in a closed chain (standing) it laterally rotates the femur on the tibia. It also weakly flexes the knee and retracts the lateral meniscus.',
    innervation: 'Tibial nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · lateral femoral condyle', muscleMeshes: [`popliteus_${s}`], boneMeshes: side(s, ['femur']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · proximal tibia', muscleMeshes: [`popliteus_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'posterior' },
    ],
  },

  fibularis_longus: {
    id: 'fibularis_longus',
    description:
      'The more superficial muscle of the lateral compartment of the leg (also called peroneus longus). Its tendon turns under the cuboid in a groove and crosses the sole of the foot to the medial side, a path important for the transverse arch.',
    origin:
      'The head and the proximal two-thirds of the lateral surface of the fibula, the adjacent intermuscular septa, and often a slip from the lateral tibial condyle.',
    insertion:
      'The plantar surfaces of the medial cuneiform and the base of the first metatarsal. The tendon is held in a groove on the cuboid, sometimes with an os peroneum.',
    action:
      'Everts the foot and weakly plantarflexes the ankle. It also supports the transverse and lateral longitudinal arches as its tendon crosses the sole.',
    innervation: 'Superficial fibular (peroneal) nerve (L5–S1, sometimes S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fib_long_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · medial cuneiform', muscleMeshes: [`fib_long_${s}`], boneMeshes: side(s, ['cuneiform_med']) },
      { kind: 'insertion', label: 'Insertion · 1st metatarsal', muscleMeshes: [`fib_long_${s}`], boneMeshes: side(s, ['metatarsal1']), prefer: 'caudal' },
    ],
  },

  fibularis_brevis: {
    id: 'fibularis_brevis',
    description:
      'The deeper muscle of the lateral compartment of the leg (also called peroneus brevis), lying under fibularis longus. Its tendon is the one that can avulse the tuberosity of the fifth metatarsal.',
    origin:
      'The distal two-thirds of the lateral surface of the fibula, and the adjacent intermuscular septa, below and in front of fibularis longus.',
    insertion:
      'The tuberosity (styloid process) on the base of the fifth metatarsal, on its lateral (dorsal) side.',
    action:
      'Everts the foot and weakly plantarflexes the ankle. It also steadies the fifth metatarsal during toe-off.',
    innervation: 'Superficial fibular (peroneal) nerve (L5–S1, sometimes S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fib_brev_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · 5th metatarsal', muscleMeshes: [`fib_brev_${s}`], boneMeshes: side(s, ['metatarsal5']), prefer: 'cranial' },
    ],
  },

  fibularis_tertius: {
    id: 'fibularis_tertius',
    description:
      'A variable slip of the anterior compartment, often regarded as a fifth tendon of extensor digitorum longus (also called peroneus tertius). It is not always present in people; it is present as a mesh in this model.',
    origin:
      'The distal third of the anterior surface of the fibula, the lower part of the interosseous membrane, and the adjacent intermuscular septum — in continuity with extensor digitorum longus.',
    insertion:
      'The dorsal surface of the base (and sometimes the shaft) of the fifth metatarsal.',
    action:
      'Dorsiflexes the foot at the ankle and everts it (assisting the other fibularis muscles from the anterior side of the ankle).',
    innervation: 'Deep fibular (peroneal) nerve (L4–S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fib_tert_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · 5th metatarsal', muscleMeshes: [`fib_tert_${s}`], boneMeshes: side(s, ['metatarsal5']), prefer: 'cranial' },
    ],
  },

  tibialis_posterior: {
    id: 'tibialis_posterior',
    description:
      'The deepest muscle of the posterior compartment of the leg, lying on the interosseous membrane between flexor digitorum longus and flexor hallucis longus. Its tendon is the most anterior structure in the tarsal tunnel and is a principal support of the medial longitudinal arch (dysfunction is a common cause of adult-acquired flatfoot).',
    origin:
      'The posterior surface of the interosseous membrane and the adjoining posterior surfaces of the tibia (below the soleal line) and fibula.',
    insertion:
      'Principally the tuberosity of the navicular, with slips to the plantar surfaces of all three cuneiforms, the cuboid, and the bases of the second, third, and fourth metatarsals (sometimes also the calcaneus / sustentaculum tali).',
    action:
      'Inverts the foot and plantarflexes the ankle, and supports the medial longitudinal arch. It is the most powerful inverter of the foot.',
    innervation: 'Tibial nerve (L4–L5, sometimes S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · tibia', muscleMeshes: [`tib_post_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'posterior' },
      { kind: 'origin', label: 'Origin · fibula', muscleMeshes: [`tib_post_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · navicular', muscleMeshes: [`tib_post_${s}`], boneMeshes: side(s, ['navicular']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · cuneiforms / cuboid', muscleMeshes: [`tib_post_${s}`], boneMeshes: side(s, ['cuneiform_med', 'cuneiform_int', 'cuneiform_lat', 'cuboid']) },
    ],
  },

  flexor_digitorum_longus: {
    id: 'flexor_digitorum_longus',
    description:
      'A deep posterior muscle of the leg whose tendon crosses superficial to tibialis posterior in the distal leg, then enters the sole, receives flexor accessorius (quadratus plantae), and splits into four tendons for the lesser toes. “Flexor digitorum” alone is not a correct name for this muscle.',
    origin:
      'The posterior surface of the tibia, distal to the soleal line and medial to the vertical ridge, and the adjacent fascia covering tibialis posterior.',
    insertion:
      'The plantar bases of the distal phalanges of the second to fifth toes, after passing through the split tendons of flexor digitorum brevis.',
    action:
      'Flexes the distal (and, indirectly, the proximal) interphalangeal joints of the lesser toes, and assists plantarflexion of the ankle and inversion of the foot. It also helps support the longitudinal arches.',
    innervation: 'Tibial nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fdl_${s}`], boneMeshes: side(s, ['tibia']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · distal phalanges', muscleMeshes: [`fdl_${s}`], boneMeshes: side(s, ['phal_foot_dist_2', 'phal_foot_dist_3', 'phal_foot_dist_4', 'phal_foot_dist_5']) },
    ],
  },

  flexor_hallucis_longus: {
    id: 'flexor_hallucis_longus',
    description:
      'A deep posterior muscle arising mainly from the fibula. Its tendon grooves the posterior talus and the undersurface of the sustentaculum tali, then runs along the sole to the great toe. It is a powerful muscle of push-off. “Flexor hallucis” alone is not a correct name for this muscle.',
    origin:
      'The distal two-thirds of the posterior surface of the fibula (below the origin of soleus), the adjacent interosseous membrane, and the intermuscular septa.',
    insertion:
      'The plantar base of the distal phalanx of the hallux. A slip often joins flexor digitorum longus in the sole (the knot of Henry).',
    action:
      'Flexes the interphalangeal (and MCP) joint of the hallux, and assists plantarflexion of the ankle and inversion of the foot. It is especially active in the final push-off of gait, and helps support the medial longitudinal arch.',
    innervation: 'Tibial nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`fhl_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · distal phalanx', muscleMeshes: [`fhl_${s}`], boneMeshes: side(s, ['phal_foot_dist_1']) },
    ],
  },

  extensor_digitorum_longus: {
    id: 'extensor_digitorum_longus',
    description:
      'A muscle of the anterior compartment of the leg, lateral to tibialis anterior and extensor hallucis longus. Its four tendons pass under the extensor retinacula to the lesser toes. This is not the same muscle as extensor digitorum of the forearm.',
    origin:
      'The lateral condyle of the tibia, the proximal two-thirds of the anterior surface of the fibula, the upper part of the interosseous membrane, and the adjacent intermuscular septa and deep fascia.',
    insertion:
      'The dorsal digital expansions (extensor hoods) of the second to fifth toes, which attach to the middle and distal phalanges. Fibularis tertius is often a continuous slip from its lower part.',
    action:
      'Extends the lesser toes at the MTP and interphalangeal joints, and assists dorsiflexion and eversion of the foot.',
    innervation: 'Deep fibular (peroneal) nerve (L4–L5, sometimes S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · tibia / fibula', muscleMeshes: [`edl_${s}`], boneMeshes: side(s, ['tibia', 'fibula']), prefer: 'cranial' },
      { kind: 'insertion', label: 'Insertion · toe hoods', muscleMeshes: [`edl_${s}`], boneMeshes: side(s, ['phal_foot_prox_2', 'phal_foot_prox_3', 'phal_foot_prox_4', 'phal_foot_prox_5', 'phal_foot_mid_2', 'phal_foot_mid_3', 'phal_foot_mid_4', 'phal_foot_mid_5']) },
    ],
  },

  extensor_hallucis_longus: {
    id: 'extensor_hallucis_longus',
    description:
      'A muscle of the anterior compartment, lying between tibialis anterior and extensor digitorum longus and becoming superficial in the lower leg. Its tendon is a useful landmark over the dorsum of the first metatarsal. “Extensor hallucis” alone is not a correct name for this muscle.',
    origin:
      'The middle half (roughly) of the anterior surface of the fibula, and the adjacent interosseous membrane, distal to the origin of extensor digitorum longus.',
    insertion:
      'The dorsal base of the distal phalanx of the hallux. A slip often also reaches the proximal phalanx or the first metatarsal (extensor hallucis capsularis).',
    action:
      'Extends the hallux at the interphalangeal and MTP joints, and assists dorsiflexion of the ankle and slight inversion of the foot.',
    innervation: 'Deep fibular (peroneal) nerve (L4–L5, sometimes S1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`ehl_${s}`], boneMeshes: side(s, ['fibula']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · distal phalanx', muscleMeshes: [`ehl_${s}`], boneMeshes: side(s, ['phal_foot_dist_1']) },
    ],
  },
  scalenus_anterior: {
    id: 'scalenus_anterior',
    description:
      'The most anterior of the three scalene muscles, running from the mid-cervical transverse processes to the first rib. The phrenic nerve runs on its anterior surface; the subclavian artery and the brachial plexus pass behind it, the subclavian vein in front. “Scalenes” names the group, not this muscle alone.',
    origin:
      'The anterior tubercles of the transverse processes of C3–C6.',
    insertion:
      'The scalene tubercle on the upper surface of the first rib, and the ridge in front of the groove for the subclavian artery.',
    action:
      'Elevates the first rib (an accessory muscle of inspiration) and, acting from below, flexes the neck laterally to the same side and helps rotate it to the opposite side. Bilateral contraction assists neck flexion.',
    innervation: 'Anterior rami of C4–C6 (sometimes C3–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`scalene_ant_${s}`], boneMeshes: vertebrae('c3', 'c4', 'c5', 'c6') },
      { kind: 'insertion', label: 'Insertion · first rib', muscleMeshes: [`scalene_ant_${s}`], boneMeshes: [`rib_${s}1`], prefer: 'cranial' },
    ],
  },

  scalenus_medius: {
    id: 'scalenus_medius',
    description:
      'The largest of the three scalene muscles, behind scalenus anterior, inserting on the first rib behind the subclavian groove. The brachial plexus and subclavian artery pass forward between it and scalenus anterior (the interscalene triangle). “Scalenes” names the group, not this muscle alone.',
    origin:
      'The posterior tubercles of the transverse processes of C2–C7 (sometimes including C1).',
    insertion:
      'The upper surface of the first rib, behind the groove for the subclavian artery, extending back toward the tubercle of the rib.',
    action:
      'Elevates the first rib and laterally flexes the neck to the same side. It also steadies the cervical spine.',
    innervation: 'Anterior rami of C3–C8 (most consistently C3–C7).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`scalene_med_${s}`], boneMeshes: vertebrae('c2', 'c3', 'c4', 'c5', 'c6', 'c7') },
      { kind: 'insertion', label: 'Insertion · first rib', muscleMeshes: [`scalene_med_${s}`], boneMeshes: [`rib_${s}1`], prefer: 'cranial' },
    ],
  },

  scalenus_posterior: {
    id: 'scalenus_posterior',
    description:
      'The smallest and most posterior of the three scalene muscles, often partly blended with scalenus medius, and the only one that normally reaches the second rib. “Scalenes” names the group, not this muscle alone.',
    origin:
      'The posterior tubercles of the transverse processes of C4–C6 (sometimes C5–C7).',
    insertion:
      'The outer surface of the second rib, behind the attachment of serratus anterior.',
    action:
      'Elevates the second rib and laterally flexes the neck to the same side.',
    innervation: 'Anterior rami of C6–C8 (sometimes C5–C8).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`scalene_post_${s}`], boneMeshes: vertebrae('c4', 'c5', 'c6') },
      { kind: 'insertion', label: 'Insertion · second rib', muscleMeshes: [`scalene_post_${s}`], boneMeshes: [`rib_${s}2`], prefer: 'cranial' },
    ],
  },

  sternohyoid: {
    id: 'sternohyoid',
    description:
      'A thin, strap-like infrahyoid muscle on the front of the neck, just off the midline, covering sternothyroid and thyrohyoid. This pack has no separate hyoid mesh, so only the sternal origin is labelled; the insertion is described in the text.',
    origin:
      'The posterior surface of the manubrium of the sternum, and the adjoining posterior surface of the sternal end of the clavicle (and sometimes the posterior sternoclavicular ligament).',
    insertion:
      'The inferior border of the body of the hyoid bone (not a separate mesh in this pack).',
    action:
      'Depresses the hyoid bone after it has been raised in swallowing, and steadies it. With the hyoid fixed it can also weakly flex the head on the neck.',
    innervation: 'Ansa cervicalis (C1–C3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · manubrium', muscleMeshes: [`sterno_hy_${s}`], boneMeshes: ['sternum_manubrium'], prefer: 'posterior' },
      { kind: 'origin', label: 'Origin · clavicle', muscleMeshes: [`sterno_hy_${s}`], boneMeshes: side(s, ['clavicle']), prefer: 'medial' },
    ],
  },

  sternothyroid: {
    id: 'sternothyroid',
    description:
      'A strap-like infrahyoid muscle lying deep to sternohyoid, from the manubrium to the thyroid cartilage. This pack has no thyroid-cartilage or hyoid mesh, so only the sternal origin is labelled.',
    origin:
      'The posterior surface of the manubrium of the sternum, below the origin of sternohyoid, and the adjoining cartilage of the first (and sometimes the second) rib.',
    insertion:
      'The oblique line on the lamina of the thyroid cartilage (not a separate mesh in this pack).',
    action:
      'Depresses the larynx (and, through it, the hyoid) after they have been raised in swallowing or speech, and steadies the thyroid cartilage.',
    innervation: 'Ansa cervicalis (C1–C3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · manubrium', muscleMeshes: [`sterno_th_${s}`], boneMeshes: ['sternum_manubrium'], prefer: 'posterior' },
    ],
  },

  thyrohyoid: {
    id: 'thyrohyoid',
    description:
      'A short infrahyoid muscle, essentially a continuation of sternothyroid above the oblique line of the thyroid cartilage, running up to the hyoid. This pack has no thyroid-cartilage or hyoid mesh, so no attachment pins are placed; the attachments are described in the text.',
    origin:
      'The oblique line on the lamina of the thyroid cartilage (not a separate mesh in this pack).',
    insertion:
      'The inferior border of the greater horn (and the adjacent body) of the hyoid bone (not a separate mesh in this pack).',
    action:
      'Depresses the hyoid, or, with the hyoid fixed, elevates the larynx (as in the high notes of singing).',
    innervation: 'Fibers of C1 that travel with the hypoglossal nerve (often called the nerve to thyrohyoid); not the ansa itself.',
    sitesForSide: () => [],
  },

  omohyoid: {
    id: 'omohyoid',
    description:
      'A two-bellied infrahyoid muscle running from the upper scapular border to the hyoid, with an intermediate tendon bound to the clavicle and the first rib by a fascial sling. This pack has no hyoid mesh, so only the scapular origin is labelled.',
    origin:
      'The superior border of the scapula, near the scapular notch (inferior belly).',
    insertion:
      'The inferior border of the body of the hyoid, just lateral to sternohyoid (superior belly). The intermediate tendon is held by a fascial loop to the clavicle and first rib. (No hyoid mesh is present.)',
    action:
      'Depresses and steadies the hyoid, and can tense the lower deep cervical fascia. The inferior belly also slightly depresses the clavicle / scapula.',
    innervation: 'Ansa cervicalis (C1–C3): superior belly often more from C1, inferior belly from C2–C3.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · superior scapular border', muscleMeshes: [`omohyoid_${s}`], boneMeshes: side(s, ['scapula']), prefer: 'cranial' },
    ],
  },

  digastric: {
    id: 'digastric',
    description:
      'A two-bellied suprahyoid muscle. The posterior belly arises from the temporal bone and is supplied by the facial nerve; the anterior belly arises from the mandible and is supplied by the mylohyoid nerve. An intermediate tendon, slung to the hyoid, joins them. This pack has no hyoid mesh; a small additional left-only slip is included as digastric_mid_l. The right side has anterior and posterior bellies only.',
    origin:
      'Posterior belly: the mastoid (digastric) notch on the medial side of the mastoid process of the temporal bone. Anterior belly: the digastric fossa on the base of the mandible, near the midline.',
    insertion:
      'The two bellies meet at an intermediate tendon, which is held to the body and greater horn of the hyoid by a fibrous sling (the hyoid itself is not a separate mesh in this pack).',
    action:
      'Depresses the mandible (opens the mouth) when the hyoid is fixed, and elevates and steadies the hyoid during swallowing and speech when the mandible is fixed. The two bellies can also assist in retracting or protracting the hyoid.',
    innervation:
      'Anterior belly: nerve to mylohyoid (a branch of the inferior alveolar nerve, from the mandibular division of the trigeminal, V3). Posterior belly: facial nerve (CN VII), usually via the digastric ramus.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · mastoid notch', muscleMeshes: s === 'l' ? ['digastric_post_l', 'digastric_mid_l'] : ['digastric_post_r'], boneMeshes: side(s, ['temporal']), prefer: 'caudal' },
      { kind: 'origin', label: 'Origin · digastric fossa', muscleMeshes: [`digastric_ant_${s}`], boneMeshes: ['mandible'], prefer: 'caudal' },
    ],
  },

  mylohyoid: {
    id: 'mylohyoid',
    description:
      'A flat, triangular muscle that forms the muscular floor of the mouth, meeting its fellow at a midline raphe that runs from the mandible to the hyoid. This pack has no hyoid mesh, so only the mandibular origin is labelled.',
    origin:
      'The mylohyoid line on the inner surface of the mandible, from near the symphysis back to the last molar tooth.',
    insertion:
      'The midline mylohyoid raphe and the body of the hyoid bone (neither the raphe nor the hyoid is a separate mesh in this pack). Posterior fibers reach the hyoid more directly.',
    action:
      'Elevates the floor of the mouth and the hyoid during swallowing and speech, and can help depress the mandible when the hyoid is fixed. It also supports the tongue and the floor of the oral cavity.',
    innervation: 'Nerve to mylohyoid (from the inferior alveolar nerve, mandibular division of the trigeminal, V3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · mylohyoid line', muscleMeshes: [`mylohyoid_${s}`], boneMeshes: ['mandible'], prefer: 'caudal' },
    ],
  },

  stylohyoid: {
    id: 'stylohyoid',
    description:
      'A slender suprahyoid muscle running along the upper border of the posterior belly of digastric, from the styloid process to the hyoid. This pack has no hyoid mesh, so only the styloid (temporal) origin is labelled.',
    origin:
      'The posterior surface of the styloid process of the temporal bone, near its base.',
    insertion:
      'The body of the hyoid bone at the junction with the greater horn, usually splitting around the intermediate tendon of digastric. (No hyoid mesh is present.)',
    action:
      'Elevates and retracts the hyoid (drawing it backward and upward), lengthening the floor of the mouth, as in swallowing.',
    innervation: 'Facial nerve (CN VII), usually a small branch given off near the branch to the posterior belly of digastric.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · styloid', muscleMeshes: [`stylohyoid_${s}`], boneMeshes: side(s, ['temporal']), prefer: 'caudal' },
    ],
  },

  geniohyoid: {
    id: 'geniohyoid',
    description:
      'A narrow, paired muscle just above the mylohyoid, running from the inferior mental spine of the mandible to the hyoid. It is deep to the oral floor. This pack has no hyoid mesh, so only the mandibular origin is labelled.',
    origin:
      'The inferior mental spine (genial tubercle) on the inner surface of the mandibular symphysis.',
    insertion:
      'The anterior surface of the body of the hyoid bone (not a separate mesh in this pack).',
    action:
      'Pulls the hyoid forward and slightly upward (shortening the floor of the mouth), and can help depress the mandible when the hyoid is fixed. It is important in the oral phase of swallowing.',
    innervation: 'Fibers of C1 that travel with the hypoglossal nerve (CN XII).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · mental spine', muscleMeshes: [`geniohyoid_${s}`], boneMeshes: ['mandible'], prefer: 'anterior' },
    ],
  },

  platysma: {
    id: 'platysma',
    description:
      'A broad, thin sheet of muscle in the superficial fascia of the neck, continuous with the facial muscles above and fading over the upper chest and shoulder below. It is the most superficial muscle of the neck.',
    origin:
      'The skin and superficial fascia over the upper pectoral and deltoid regions (and often the clavicle and acromion). The lower “origin” therefore meets bone only where the sheet approaches the clavicle or the fascia over pectoralis major and deltoid.',
    insertion:
      'The inferior border of the mandible, the skin of the lower face, and fibers that blend with the muscles around the mouth (including depressor anguli oris). Some fibers reach the risorius / adjacent facial muscles.',
    action:
      'Tenses the skin of the neck, draws the corners of the mouth and the lower lip downward and laterally (an expression of tension or grief), and can weakly depress the mandible. It also wrinkles the skin of the neck.',
    innervation: 'Cervical branch of the facial nerve (CN VII).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · clavicle / chest', muscleMeshes: [`platysma_${s}`], boneMeshes: side(s, ['clavicle']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · mandible', muscleMeshes: [`platysma_${s}`], boneMeshes: ['mandible'], prefer: 'caudal' },
    ],
  },

  longus_colli: {
    id: 'longus_colli',
    description:
      'A prevertebral muscle on the front of the cervical and upper thoracic spine, with superior oblique, vertical, and inferior oblique parts. In this pack only the left parts are present (three meshes); there is no right longus colli.',
    origin:
      'Inferior oblique: vertebral bodies of T1–T3 (sometimes T1–T2 or down to T3). Vertical part: bodies of C5–T3. Superior oblique: anterior tubercles of the transverse processes of C3–C5. The three parts are separate meshes here, all on the left.',
    insertion:
      'Inferior oblique: anterior tubercles of the transverse processes of C5–C6. Vertical part: bodies of C2–C4. Superior oblique: the anterior tubercle of the atlas (C1).',
    action:
      'Flexes the neck (bilateral) and assists lateral flexion and contralateral rotation (unilateral, especially the oblique parts). It also steadies the cervical spine.',
    innervation: 'Anterior rami of C2–C6 (sometimes C2–C8).',
    sitesForSide: () => [
      { kind: 'origin', label: 'Origin · lower bodies', muscleMeshes: ['longus_colli_inf_l', 'longus_colli_vert_l'], boneMeshes: vertebrae('c5', 'c6', 'c7', 't1', 't2', 't3') },
      { kind: 'origin', label: 'Origin · mid-cervical transverses', muscleMeshes: ['longus_colli_sup_l'], boneMeshes: vertebrae('c3', 'c4', 'c5') },
      { kind: 'insertion', label: 'Insertion · atlas / upper bodies', muscleMeshes: ['longus_colli_sup_l', 'longus_colli_vert_l'], boneMeshes: vertebrae('c1', 'c2', 'c3', 'c4') },
    ],
  },

  longus_capitis: {
    id: 'longus_capitis',
    description:
      'A prevertebral muscle lying on the front of the upper cervical spine, lateral to the upper part of longus colli, and inserting on the basilar part of the occipital bone.',
    origin:
      'The anterior tubercles of the transverse processes of C3–C6 (sometimes C3–C5).',
    insertion:
      'The inferior surface of the basilar part of the occipital bone, just in front of the foramen magnum and medial to the insertion of rectus capitis anterior.',
    action:
      'Flexes the head on the neck at the atlanto-occipital joints (bilateral), and can assist slight rotation and lateral flexion to the same side (unilateral).',
    innervation: 'Anterior rami of C1–C3 (sometimes C1–C4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`longus_cap_${s}`], boneMeshes: vertebrae('c3', 'c4', 'c5', 'c6') },
      { kind: 'insertion', label: 'Insertion · basilar occipital', muscleMeshes: [`longus_cap_${s}`], boneMeshes: ['occipital'], prefer: 'anterior' },
    ],
  },

  rectus_capitis_anterior: {
    id: 'rectus_capitis_anterior',
    description:
      'A short, deep prevertebral muscle behind longus capitis, running from the atlas to the basilar occipital bone. “Rectus capitis” alone is not a correct name for this muscle (several similarly named muscles surround the craniovertebral joints).',
    origin:
      'The anterior surface of the lateral mass of the atlas (C1), and the root of its transverse process.',
    insertion:
      'The inferior surface of the basilar part of the occipital bone, just in front of the foramen magnum and immediately behind the insertion of longus capitis.',
    action:
      'Flexes the head at the atlanto-occipital joint, and steadies that joint.',
    innervation: 'Anterior rami of C1 and C2.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · atlas', muscleMeshes: [`rect_cap_ant_${s}`], boneMeshes: vertebrae('c1'), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · basilar occipital', muscleMeshes: [`rect_cap_ant_${s}`], boneMeshes: ['occipital'], prefer: 'anterior' },
    ],
  },

  rectus_capitis_lateralis: {
    id: 'rectus_capitis_lateralis',
    description:
      'A short muscle at the side of the craniovertebral junction, between the transverse process of the atlas and the jugular process of the occipital bone, lateral to the atlanto-occipital joint. “Rectus capitis” alone is not a correct name for this muscle.',
    origin:
      'The upper surface of the transverse process of the atlas (C1).',
    insertion:
      'The inferior surface of the jugular process of the occipital bone.',
    action:
      'Laterally flexes the head to the same side, and steadies the atlanto-occipital joint.',
    innervation: 'Anterior rami of C1 and C2.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · C1 transverse', muscleMeshes: [`rect_cap_lat_${s}`], boneMeshes: vertebrae('c1'), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · jugular process', muscleMeshes: [`rect_cap_lat_${s}`], boneMeshes: ['occipital'], prefer: 'lateral' },
    ],
  },

  rectus_capitis_posterior_major: {
    id: 'rectus_capitis_posterior_major',
    description:
      'One of the four suboccipital muscles. It forms the medial border of the suboccipital triangle and runs from the spine of the axis to the occipital bone. “Suboccipitals” names the group, not this muscle alone.',
    origin:
      'The spinous process of the axis (C2).',
    insertion:
      'The lateral part of the inferior nuchal line of the occipital bone, and the bone just below it.',
    action:
      'Extends the head (bilateral) and rotates it to the same side (unilateral) at the atlanto-axial and atlanto-occipital joints. It also steadies the craniovertebral joints.',
    innervation: 'Suboccipital nerve (posterior ramus of C1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · C2 spine', muscleMeshes: [`rcp_maj_${s}`], boneMeshes: vertebrae('c2'), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · inferior nuchal line', muscleMeshes: [`rcp_maj_${s}`], boneMeshes: ['occipital'], prefer: 'caudal' },
    ],
  },

  rectus_capitis_posterior_minor: {
    id: 'rectus_capitis_posterior_minor',
    description:
      'The smallest suboccipital muscle, medial to rectus capitis posterior major, running from the posterior tubercle of the atlas to the occipital bone. It often has a connective-tissue link to the posterior atlanto-occipital membrane and the dura. “Suboccipitals” names the group, not this muscle alone.',
    origin:
      'The posterior tubercle of the posterior arch of the atlas (C1).',
    insertion:
      'The medial part of the inferior nuchal line of the occipital bone, and the bone just below it, medial to rectus capitis posterior major.',
    action:
      'Extends the head at the atlanto-occipital joint, and steadies that joint. Its contribution to movement is small; a proprioceptive role is often suggested.',
    innervation: 'Suboccipital nerve (posterior ramus of C1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · C1 posterior tubercle', muscleMeshes: [`rcp_min_${s}`], boneMeshes: vertebrae('c1'), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · inferior nuchal line', muscleMeshes: [`rcp_min_${s}`], boneMeshes: ['occipital'], prefer: 'caudal' },
    ],
  },

  obliquus_capitis_superior: {
    id: 'obliquus_capitis_superior',
    description:
      'A suboccipital muscle forming the superolateral border of the suboccipital triangle, running from the transverse process of the atlas upward and medially to the occipital bone. “Suboccipitals” names the group, not this muscle alone.',
    origin:
      'The upper surface of the transverse process of the atlas (C1).',
    insertion:
      'The occipital bone between the superior and inferior nuchal lines, lateral to semispinalis capitis.',
    action:
      'Extends the head and laterally flexes it to the same side at the atlanto-occipital joint, and steadies that joint.',
    innervation: 'Suboccipital nerve (posterior ramus of C1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · C1 transverse', muscleMeshes: [`obl_cap_sup_${s}`], boneMeshes: vertebrae('c1'), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · occipital', muscleMeshes: [`obl_cap_sup_${s}`], boneMeshes: ['occipital'], prefer: 'lateral' },
    ],
  },

  obliquus_capitis_inferior: {
    id: 'obliquus_capitis_inferior',
    description:
      'The largest of the suboccipital muscles and the only one that does not attach to the skull. It forms the inferolateral border of the suboccipital triangle, running from the spine of the axis to the transverse process of the atlas. “Suboccipitals” names the group, not this muscle alone.',
    origin:
      'The spinous process of the axis (C2), and the adjacent upper lamina.',
    insertion:
      'The inferoposterior aspect of the transverse process of the atlas (C1).',
    action:
      'Rotates the head to the same side by turning the atlas (and the skull with it) on the axis. It is an important muscle of atlanto-axial rotation, and steadies that joint.',
    innervation: 'Suboccipital nerve (posterior ramus of C1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · C2 spine', muscleMeshes: [`obl_cap_inf_${s}`], boneMeshes: vertebrae('c2'), prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · C1 transverse', muscleMeshes: [`obl_cap_inf_${s}`], boneMeshes: vertebrae('c1'), prefer: 'lateral' },
    ],
  },
  splenius_capitis: {
    id: 'splenius_capitis',
    description:
      'A broad muscle of the back of the neck, wrapping the deeper neck muscles like a bandage (the name means “bandage of the head”). It is superficial to the erector spinae and semispinalis, and is itself partly covered by trapezius. “Splenius” alone is not a correct name for this muscle (splenius cervicis is a separate muscle).',
    origin:
      'The lower half of the nuchal ligament, and the spinous processes of C7–T3 (sometimes T4) with the intervening supraspinous ligaments.',
    insertion:
      'The mastoid process of the temporal bone and the rough surface of the occipital bone just below the lateral third of the superior nuchal line.',
    action:
      'Extends the head and neck (bilateral). Unilaterally it laterally flexes and rotates the head to the same side.',
    innervation: 'Posterior rami of the middle cervical spinal nerves (typically C3–C5, sometimes including C2 or C6).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`splenius_cap_${s}`], boneMeshes: vertebrae('c7', 't1', 't2', 't3') },
      { kind: 'insertion', label: 'Insertion · mastoid', muscleMeshes: [`splenius_cap_${s}`], boneMeshes: side(s, ['temporal']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · occipital', muscleMeshes: [`splenius_cap_${s}`], boneMeshes: ['occipital'], prefer: 'lateral' },
    ],
  },

  splenius_cervicis: {
    id: 'splenius_cervicis',
    description:
      'The cervical counterpart of splenius capitis, arising from upper thoracic spines and inserting on the upper cervical transverse processes (a mirror of levator scapulae from behind). “Splenius” alone is not a correct name for this muscle.',
    origin:
      'The spinous processes of T3–T6 (sometimes T3–T5) and the intervening supraspinous ligaments.',
    insertion:
      'The posterior tubercles of the transverse processes of C1–C3 (sometimes C1–C4), under levator scapulae.',
    action:
      'Extends the neck (bilateral). Unilaterally it laterally flexes and rotates the neck to the same side.',
    innervation: 'Posterior rami of the lower cervical spinal nerves (typically C5–C7, with some variation).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`splenius_cerv_${s}`], boneMeshes: vertebrae('t3', 't4', 't5', 't6') },
      { kind: 'insertion', label: 'Insertion · upper cervical transverses', muscleMeshes: [`splenius_cerv_${s}`], boneMeshes: vertebrae('c1', 'c2', 'c3') },
    ],
  },

  iliocostalis: {
    id: 'iliocostalis',
    description:
      'The most lateral column of the erector spinae, with lumborum, thoracis, and cervicis parts kept as separate meshes and grouped here as one muscle (the way trapezius is grouped). “Erector spinae” names the three-column group, not iliocostalis alone.',
    origin:
      'A common origin with the rest of erector spinae from the posterior iliac crest, the sacrum, the sacroiliac ligaments, and the lumbar and sacral spines (via the thoracolumbar fascia). Additional slips arise from the angles of the lower ribs for the thoracic and cervical parts.',
    insertion:
      'Iliocostalis lumborum: the angles of the lower six (or so) ribs. Iliocostalis thoracis: the angles of the upper six ribs. Iliocostalis cervicis: the posterior tubercles of the transverse processes of C4–C6 (sometimes C3–C6).',
    action:
      'Extends the vertebral column (bilateral) and laterally flexes it to the same side (unilateral). The thoracic and lumbar parts also help depress the ribs, and the whole column steadies the spine in standing and gait.',
    innervation: 'Posterior rami of the cervical, thoracic, and lumbar spinal nerves, segmentally.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ilium / sacrum', muscleMeshes: [`ic_lumb_${s}`], boneMeshes: [...side(s, ['hip']), 'sacrum'], prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · lower ribs', muscleMeshes: [`ic_lumb_${s}`], boneMeshes: ribs(s, 7, 12) },
      { kind: 'insertion', label: 'Insertion · upper ribs', muscleMeshes: [`ic_thor_${s}`], boneMeshes: ribs(s, 1, 6) },
      { kind: 'insertion', label: 'Insertion · cervical transverses', muscleMeshes: [`ic_cerv_${s}`], boneMeshes: vertebrae('c4', 'c5', 'c6') },
    ],
  },

  longissimus: {
    id: 'longissimus',
    description:
      'The middle and usually the largest column of the erector spinae, with thoracis, cervicis, and capitis parts kept as separate meshes and grouped here as one muscle. “Erector spinae” names the three-column group, not longissimus alone.',
    origin:
      'The common erector-spinae origin (posterior sacrum, iliac crest, lumbar and sacral spines, and the thoracolumbar fascia). Longissimus cervicis and capitis have additional origins from upper thoracic and lower cervical transverse processes.',
    insertion:
      'Longissimus thoracis: the transverse processes of the lumbar and thoracic vertebrae and the adjacent lower nine or ten ribs, between the tubercle and the angle. Longissimus cervicis: the posterior tubercles of the transverse processes of C2–C6. Longissimus capitis: the posterior margin of the mastoid process, under splenius capitis and sternocleidomastoid.',
    action:
      'Extends the vertebral column and the head (bilateral), and laterally flexes them to the same side (unilateral). Longissimus capitis also rotates the head slightly to the same side. The column is a principal postural extensor of the trunk.',
    innervation: 'Posterior rami of the cervical, thoracic, and lumbar spinal nerves, segmentally.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · sacrum / ilium', muscleMeshes: [`longiss_thor_${s}`], boneMeshes: [...side(s, ['hip']), 'sacrum'], prefer: 'posterior' },
      { kind: 'insertion', label: 'Insertion · ribs / thoracic transverses', muscleMeshes: [`longiss_thor_${s}`], boneMeshes: [...ribs(s, 3, 12), ...vertebrae('t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12')] },
      { kind: 'insertion', label: 'Insertion · cervical transverses', muscleMeshes: [`longiss_cerv_${s}`], boneMeshes: vertebrae('c2', 'c3', 'c4', 'c5', 'c6') },
      { kind: 'insertion', label: 'Insertion · mastoid', muscleMeshes: [`longiss_cap_${s}`], boneMeshes: side(s, ['temporal']), prefer: 'caudal' },
    ],
  },

  spinalis: {
    id: 'spinalis',
    description:
      'The most medial and usually the smallest column of the erector spinae, closest to the spinous processes. This pack has spinalis thoracis plus an additional, less specifically named spinalis part (spinalis_a) on each side; spinalis cervicis and capitis are not present as separately named meshes. “Erector spinae” names the three-column group, not spinalis alone.',
    origin:
      'The spinous processes of the upper lumbar and lower thoracic vertebrae (and, for the additional part, nearby midline spines), blending with the common erector-spinae origin and with semispinalis.',
    insertion:
      'The spinous processes of the mid and upper thoracic vertebrae (spinalis thoracis), and the additional part along the more cranial midline spines. Typical textbook spinalis cervicis (to C2) and spinalis capitis are not separately labelled in this pack.',
    action:
      'Extends the vertebral column (bilateral) and assists slight lateral flexion (unilateral). It is a thin postural extensor close to the midline.',
    innervation: 'Posterior rami of the thoracic (and, where present, cervical) spinal nerves, segmentally.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · lower thoracic / lumbar spines', muscleMeshes: side(s, ['spinalis_a', 'spinalis_thor']), boneMeshes: vertebrae('t10', 't11', 't12', 'l1', 'l2') },
      { kind: 'insertion', label: 'Insertion · thoracic spines', muscleMeshes: [`spinalis_thor_${s}`], boneMeshes: vertebrae('t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8') },
    ],
  },

  semispinalis: {
    id: 'semispinalis',
    description:
      'The most superficial of the transversospinales, spanning four to six vertebrae, with thoracis, cervicis, and capitis parts kept as separate meshes and grouped here as one muscle. Semispinalis capitis is a thick muscle of the back of the neck, deep to splenius.',
    origin:
      'Semispinalis thoracis and cervicis: the transverse processes of the thoracic vertebrae (thoracis from about T6–T10, cervicis from the upper thoracic). Semispinalis capitis: the transverse processes of C4–T6 (or so) and the articular processes of C4–C6.',
    insertion:
      'Semispinalis thoracis: the spinous processes of C6–T4 (or so). Semispinalis cervicis: the spinous processes of C2–C5, especially a strong insertion on the spine of the axis. Semispinalis capitis: the occipital bone between the superior and inferior nuchal lines.',
    action:
      'Extends the head and the thoracic and cervical spine (bilateral). Unilaterally the capitis and cervicis parts rotate the head and neck to the opposite side, and assist slight lateral flexion. It is an important postural muscle of the neck.',
    innervation: 'Posterior rami of the cervical and thoracic spinal nerves, segmentally.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · thoracic transverses', muscleMeshes: side(s, ['semispin_thor', 'semispin_cerv', 'semispin_cap']), boneMeshes: vertebrae('t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10') },
      { kind: 'insertion', label: 'Insertion · cervical / upper thoracic spines', muscleMeshes: side(s, ['semispin_thor', 'semispin_cerv']), boneMeshes: vertebrae('c2', 'c3', 'c4', 'c5', 'c6', 't1', 't2', 't3', 't4') },
      { kind: 'insertion', label: 'Insertion · occipital', muscleMeshes: [`semispin_cap_${s}`], boneMeshes: ['occipital'], prefer: 'posterior' },
    ],
  },

  abductor_pollicis_brevis: {
    id: 'abductor_pollicis_brevis',
    description:
      'The most superficial and lateral of the thenar muscles, forming the bulk of the thenar eminence that you can feel on the radial side of the palm. “Thenar muscles” names the group, not this muscle alone. “Abductor pollicis” alone is not a correct name (abductor pollicis longus is a separate forearm muscle).',
    origin:
      'The flexor retinaculum, and the tubercles of the scaphoid and trapezium.',
    insertion:
      'The radial side of the base of the proximal phalanx of the thumb, and the radial sesamoid of the MCP joint, with a slip often into the extensor hood of the thumb (and so to extensor pollicis longus).',
    action:
      'Abducts the thumb at the carpometacarpal (and MCP) joint, moving it away from the palm at a right angle, and assists opposition. It is the muscle that “cocks” the thumb for pinch.',
    innervation: 'Recurrent branch of the median nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · scaphoid / trapezium', muscleMeshes: [`apb_${s}`], boneMeshes: side(s, ['scaphoid', 'trapezium']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`apb_${s}`], boneMeshes: side(s, ['phal_hand_prox_thumb']), prefer: 'lateral' },
    ],
  },

  flexor_pollicis_brevis: {
    id: 'flexor_pollicis_brevis',
    description:
      'A thenar muscle with superficial and deep heads (the deep head is sometimes regarded as part of adductor pollicis). This pack includes a main mesh and a distinct superficial-head mesh on each side. “Flexor pollicis” alone is not a correct name for this muscle.',
    origin:
      'Superficial head: the flexor retinaculum and the tubercle of the trapezium. Deep head: the trapezoid and capitate, and the floor of the carpal tunnel. Both heads are represented in the meshes here.',
    insertion:
      'The radial side of the base of the proximal phalanx of the thumb, and the radial sesamoid, often blending with abductor pollicis brevis.',
    action:
      'Flexes the thumb at the MCP joint, and assists opposition and medial rotation at the carpometacarpal joint.',
    innervation:
      'Superficial head: recurrent branch of the median nerve (C8–T1). Deep head: typically the deep branch of the ulnar nerve (C8–T1) — a common two-nerve supply.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · trapezium / distal carpus', muscleMeshes: side(s, ['fpb', 'fpb_sup']), boneMeshes: side(s, ['trapezium', 'trapezoid', 'capitate']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: side(s, ['fpb', 'fpb_sup']), boneMeshes: side(s, ['phal_hand_prox_thumb']), prefer: 'lateral' },
    ],
  },

  opponens_pollicis: {
    id: 'opponens_pollicis',
    description:
      'The deepest of the three thenar muscles that the recurrent median nerve supplies, lying under abductor pollicis brevis and applying itself along the shaft of the first metacarpal. “Thenar muscles” names the group, not this muscle alone.',
    origin:
      'The flexor retinaculum and the tubercle of the trapezium.',
    insertion:
      'The whole of the radial (lateral) border and the palmar (anterior) surface of the shaft of the first metacarpal.',
    action:
      'Opposes the thumb: it flexes, abducts, and medially rotates the first metacarpal so that the palmar pad of the thumb can meet the pads of the fingers. It is the muscle most responsible for that rotation of the metacarpal.',
    innervation: 'Recurrent branch of the median nerve (C8–T1). A small ulnar contribution is sometimes described.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · trapezium', muscleMeshes: [`opp_pol_${s}`], boneMeshes: side(s, ['trapezium']) },
      { kind: 'insertion', label: 'Insertion · 1st metacarpal', muscleMeshes: [`opp_pol_${s}`], boneMeshes: side(s, ['metacarpal1']), prefer: 'lateral' },
    ],
  },

  adductor_pollicis: {
    id: 'adductor_pollicis',
    description:
      'The deepest thenar-region muscle, with distinct oblique and transverse heads kept as separate meshes here. It fills the space between the first two metacarpals and is supplied by the ulnar nerve, unlike the other thenar muscles.',
    origin:
      'Oblique head: the capitate, the bases of the second and third metacarpals, and the palmar ligaments of the carpus. Transverse head: the palmar surface of the shaft of the third metacarpal.',
    insertion:
      'The ulnar side of the base of the proximal phalanx of the thumb, and the ulnar sesamoid of the MCP joint, with a slip often into the extensor hood.',
    action:
      'Adducts the thumb, drawing the first metacarpal toward the palm, and assists opposition and flexion at the MCP joint. It is important in a firm pinch (for example, holding a key or a pen).',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · oblique head', muscleMeshes: [`ap_obl_${s}`], boneMeshes: side(s, ['capitate', 'metacarpal2', 'metacarpal3']) },
      { kind: 'origin', label: 'Origin · transverse head', muscleMeshes: [`ap_trans_${s}`], boneMeshes: side(s, ['metacarpal3']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: side(s, ['ap_obl', 'ap_trans']), boneMeshes: side(s, ['phal_hand_prox_thumb']), prefer: 'medial' },
    ],
  },

  abductor_digiti_minimi_hand: {
    id: 'abductor_digiti_minimi_hand',
    description:
      'The most superficial and ulnar of the hypothenar muscles. The unqualified name “abductor digiti minimi” is used here for the hand muscle; the foot has a separately named counterpart.',
    origin:
      'The pisiform, the pisohamate ligament, and the tendon of flexor carpi ulnaris (which inserts on the pisiform).',
    insertion:
      'The ulnar side of the base of the proximal phalanx of the little finger, and often a slip into the extensor hood of that finger.',
    action:
      'Abducts the little finger at the MCP joint, and assists flexion at that joint and extension at the interphalangeal joints (via the hood).',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · pisiform', muscleMeshes: [`adm_hand_${s}`], boneMeshes: side(s, ['pisiform']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`adm_hand_${s}`], boneMeshes: side(s, ['phal_hand_prox_little']), prefer: 'medial' },
    ],
  },

  flexor_digiti_minimi_brevis_hand: {
    id: 'flexor_digiti_minimi_brevis_hand',
    description:
      'A small hypothenar muscle lying just lateral (radial) to abductor digiti minimi of the hand. It is sometimes fused with that muscle or absent. The foot has a separately named counterpart; the unqualified name is reserved here so the two are not confused.',
    origin:
      'The hook of the hamate and the flexor retinaculum (the ulnar side of the roof of the carpal tunnel).',
    insertion:
      'The ulnar side of the base of the proximal phalanx of the little finger, usually blending with abductor digiti minimi.',
    action:
      'Flexes the little finger at the MCP joint, and assists opposition of the little finger toward the thumb.',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · hook of hamate', muscleMeshes: [`fdmb_hand_${s}`], boneMeshes: side(s, ['hamate']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`fdmb_hand_${s}`], boneMeshes: side(s, ['phal_hand_prox_little']), prefer: 'medial' },
    ],
  },

  opponens_digiti_minimi_hand: {
    id: 'opponens_digiti_minimi_hand',
    description:
      'The deepest hypothenar muscle, applied along the shaft of the fifth metacarpal. The unqualified name “opponens digiti minimi” is used here for the hand muscle; the foot has a separately named counterpart.',
    origin:
      'The hook of the hamate and the adjacent flexor retinaculum.',
    insertion:
      'The ulnar (medial) border and palmar surface of the shaft of the fifth metacarpal, along its whole length.',
    action:
      'Opposes the little finger, drawing the fifth metacarpal forward and rotating it slightly so that the little finger can meet the thumb in a cupping of the palm.',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · hook of hamate', muscleMeshes: [`odm_hand_${s}`], boneMeshes: side(s, ['hamate']) },
      { kind: 'insertion', label: 'Insertion · 5th metacarpal', muscleMeshes: [`odm_hand_${s}`], boneMeshes: side(s, ['metacarpal5']), prefer: 'medial' },
    ],
  },

  lumbricals_hand: {
    id: 'lumbricals_hand',
    description:
      'Four small muscles of the palm, arising from the tendons of flexor digitorum profundus and inserting into the radial sides of the extensor hoods. In this pack the four lumbricals of each hand are a single combined mesh per side. “Lumbricals” here means the hand set (the foot lumbricals are not in the playable catalog).',
    origin:
      'The tendons of flexor digitorum profundus in the palm: the first (most radial) is unipennate from the radial side of the index tendon; the second is unipennate from the radial side of the middle-finger tendon; the third and fourth are bipennate from the adjacent sides of the middle, ring, and little-finger tendons. The tendons themselves are not separate meshes, so no bony origin pin is placed.',
    insertion:
      'The radial (lateral) edge of the extensor hood of the index, middle, ring, and little fingers, distal to the MCP joints.',
    action:
      'Flex the fingers at the MCP joints and extend them at the interphalangeal joints (the “lumbrical action”), by pulling on the extensor hoods while arising from the profundus tendons. They also contribute to the precision of finger movement.',
    innervation:
      'The first and second (radial two) lumbricals: median nerve (C8–T1). The third and fourth (ulnar two): deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'insertion', label: 'Insertion · extensor hoods', muscleMeshes: [`lumbricals_${s}`], boneMeshes: side(s, ['phal_hand_prox_index', 'phal_hand_prox_middle', 'phal_hand_prox_ring', 'phal_hand_prox_little']) },
    ],
  },

  dorsal_interossei_hand: {
    id: 'dorsal_interossei_hand',
    description:
      'Four bipennate muscles occupying the spaces between the metacarpals, more prominent on the dorsum of the hand. They abduct the fingers away from the axis of the middle finger (DAB). In this pack the four muscles of each hand are a single combined mesh per side. The foot set is not in the playable catalog, so “dorsal interossei” here means the hand set.',
    origin:
      'The adjacent sides of the metacarpal shafts that bound each intermetacarpal space (first: 1st and 2nd; second: 2nd and 3rd; third: 3rd and 4th; fourth: 4th and 5th).',
    insertion:
      'The base of the proximal phalanx and the extensor hood: first, to the radial side of the index; second, to the radial side of the middle finger; third, to the ulnar side of the middle finger; fourth, to the ulnar side of the ring finger. The middle finger therefore has a dorsal interosseous on both sides, and the thumb and little finger have none (they have their own abductors).',
    action:
      'Abduct the index, middle, and ring fingers away from the axis of the middle finger, and, like the lumbricals, flex the MCP joints and extend the interphalangeal joints via the extensor hoods. The first dorsal interosseous is also an important muscle of pinch, moving the index against the thumb.',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · metacarpals', muscleMeshes: [`dors_inteross_${s}`], boneMeshes: side(s, ['metacarpal1', 'metacarpal2', 'metacarpal3', 'metacarpal4', 'metacarpal5']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanges', muscleMeshes: [`dors_inteross_${s}`], boneMeshes: side(s, ['phal_hand_prox_index', 'phal_hand_prox_middle', 'phal_hand_prox_ring']) },
    ],
  },

  palmar_interossei: {
    id: 'palmar_interossei',
    description:
      'Three unipennate muscles on the palmar surfaces of the second, fourth, and fifth metacarpals. They adduct the fingers toward the axis of the middle finger (PAD). In this pack the three muscles of each hand are a single combined mesh per side. The middle finger has no palmar interosseous.',
    origin:
      'The palmar surfaces of the shafts of the second, fourth, and fifth metacarpals (the sides facing the middle finger).',
    insertion:
      'The base of the proximal phalanx and the extensor hood on the side toward the middle finger: first, the ulnar side of the index; second, the radial side of the ring finger; third, the radial side of the little finger.',
    action:
      'Adduct the index, ring, and little fingers toward the middle finger, and, like the lumbricals, flex the MCP joints and extend the interphalangeal joints via the extensor hoods.',
    innervation: 'Deep branch of the ulnar nerve (C8–T1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · metacarpals', muscleMeshes: [`palm_inteross_${s}`], boneMeshes: side(s, ['metacarpal2', 'metacarpal4', 'metacarpal5']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanges', muscleMeshes: [`palm_inteross_${s}`], boneMeshes: side(s, ['phal_hand_prox_index', 'phal_hand_prox_ring', 'phal_hand_prox_little']) },
    ],
  },

  abductor_hallucis: {
    id: 'abductor_hallucis',
    description:
      'The medial muscle of the first (most superficial) layer of the sole, forming the fleshy bulge along the medial border of the foot.',
    origin:
      'The medial process of the calcaneal tuberosity, the flexor retinaculum, and the plantar aponeurosis (the aponeurosis is not a separate mesh in this pack).',
    insertion:
      'The medial side of the base of the proximal phalanx of the hallux, and the medial sesamoid of the first MTP joint, often blending with the medial head of flexor hallucis brevis.',
    action:
      'Abducts and flexes the hallux at the first MTP joint, and helps support the medial longitudinal arch.',
    innervation: 'Medial plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · calcaneus', muscleMeshes: [`abd_hall_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`abd_hall_${s}`], boneMeshes: side(s, ['phal_foot_prox_1']), prefer: 'medial' },
    ],
  },

  abductor_digiti_minimi_foot: {
    id: 'abductor_digiti_minimi_foot',
    description:
      'The lateral muscle of the first layer of the sole, along the lateral border of the foot. It is named in full (“of foot”) so it is not confused with the hand muscle of the same short name.',
    origin:
      'The medial and lateral processes of the calcaneal tuberosity, the plantar aponeurosis, and the adjacent intermuscular septum. (The aponeurosis is not a separate mesh in this pack.)',
    insertion:
      'The lateral side of the base of the proximal phalanx of the little toe, often with a slip to the fifth metatarsal (sometimes described as abductor ossis metatarsi quinti).',
    action:
      'Abducts and flexes the little toe at the fifth MTP joint, and helps support the lateral longitudinal arch.',
    innervation: 'Lateral plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · calcaneus', muscleMeshes: [`adm_foot_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'lateral' },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`adm_foot_${s}`], boneMeshes: side(s, ['phal_foot_prox_5']), prefer: 'lateral' },
    ],
  },

  flexor_digitorum_brevis: {
    id: 'flexor_digitorum_brevis',
    description:
      'The central muscle of the first layer of the sole, immediately deep to the plantar aponeurosis. Its four tendons split around those of flexor digitorum longus, in the same pattern as FDS in the hand. “Flexor digitorum” alone is not a correct name for this muscle.',
    origin:
      'The medial process of the calcaneal tuberosity, and the adjacent central part of the plantar aponeurosis and intermuscular septa. (The aponeurosis is not a separate mesh in this pack.)',
    insertion:
      'The sides of the shafts of the middle phalanges of the second to fifth toes, after each tendon splits to let flexor digitorum longus through. The slip to the little toe is sometimes missing.',
    action:
      'Flexes the lesser toes at the PIP (and, indirectly, the MTP) joints, and helps support the longitudinal arches.',
    innervation: 'Medial plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · calcaneus', muscleMeshes: [`fdb_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · middle phalanges', muscleMeshes: [`fdb_${s}`], boneMeshes: side(s, ['phal_foot_mid_2', 'phal_foot_mid_3', 'phal_foot_mid_4', 'phal_foot_mid_5']) },
    ],
  },

  flexor_hallucis_brevis: {
    id: 'flexor_hallucis_brevis',
    description:
      'A two-headed muscle of the third layer of the sole, under the first metatarsal. The two heads clasp the first MTP joint, each carrying a sesamoid. This pack keeps the medial and lateral heads as separate meshes. “Flexor hallucis” alone is not a correct name for this muscle.',
    origin:
      'The plantar surfaces of the cuboid and the lateral cuneiform, and often a slip from the tendon of tibialis posterior. The two heads then run on either side of the first metatarsal.',
    insertion:
      'The medial and lateral sides of the base of the proximal phalanx of the hallux, via the two sesamoids of the first MTP joint (medial head also often blending with abductor hallucis, lateral head with adductor hallucis).',
    action:
      'Flexes the hallux at the first MTP joint, and helps stabilize that joint and the medial longitudinal arch during push-off.',
    innervation: 'Medial plantar nerve (S2–S3). The lateral head sometimes also receives a twig from the lateral plantar nerve.',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · cuboid / lateral cuneiform', muscleMeshes: side(s, ['fhb_med', 'fhb_lat']), boneMeshes: side(s, ['cuboid', 'cuneiform_lat']) },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: side(s, ['fhb_med', 'fhb_lat']), boneMeshes: side(s, ['phal_foot_prox_1']) },
    ],
  },

  flexor_digiti_minimi_brevis_foot: {
    id: 'flexor_digiti_minimi_brevis_foot',
    description:
      'A small muscle of the third layer of the sole, along the fifth metatarsal. It is named in full (“of foot”) so it is not confused with the hand muscle of the same short name.',
    origin:
      'The plantar base of the fifth metatarsal, and the sheath of the tendon of fibularis longus.',
    insertion:
      'The lateral side of the base of the proximal phalanx of the little toe, often blending with abductor digiti minimi of the foot.',
    action:
      'Flexes the little toe at the fifth MTP joint, and helps support the lateral side of the forefoot.',
    innervation: 'Superficial or deep branch of the lateral plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · 5th metatarsal', muscleMeshes: [`fdmb_foot_${s}`], boneMeshes: side(s, ['metatarsal5']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`fdmb_foot_${s}`], boneMeshes: side(s, ['phal_foot_prox_5']), prefer: 'lateral' },
    ],
  },

  extensor_hallucis_brevis: {
    id: 'extensor_hallucis_brevis',
    description:
      'A muscle of the dorsum of the foot, essentially the medial slip of extensor digitorum brevis (which is not a separately named mesh in this pack) going to the hallux. It is relatively superficial on the dorsal foot, under the inferior extensor retinaculum and the long extensor tendons.',
    origin:
      'The dorsal and lateral surfaces of the anterior part of the calcaneus, and the adjacent inferior extensor retinaculum (the stem of the extensor retinaculum / bifurcate ligament region).',
    insertion:
      'The dorsal base of the proximal phalanx of the hallux.',
    action:
      'Extends the hallux at the first MTP joint. (Unlike extensor hallucis longus, it does not reach the distal phalanx.)',
    innervation: 'Deep fibular (peroneal) nerve (L5–S1, or S1–S2 in some accounts).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · calcaneus', muscleMeshes: [`ehb_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'anterior' },
      { kind: 'insertion', label: 'Insertion · proximal phalanx', muscleMeshes: [`ehb_${s}`], boneMeshes: side(s, ['phal_foot_prox_1']) },
    ],
  },

  flexor_accessorius: {
    id: 'flexor_accessorius',
    description:
      'A muscle of the second layer of the sole, also called quadratus plantae, running from the calcaneus to the tendon of flexor digitorum longus. It corrects the oblique pull of FDL so that the toes flex in a more nearly straight line.',
    origin:
      'Two heads from the calcaneus: a medial head from the medial concave surface, and a lateral head from the plantar surface just distal to the lateral process of the calcaneal tuberosity, and from the adjacent long plantar ligament.',
    insertion:
      'The posterolateral margin of the tendon of flexor digitorum longus, usually as it divides into its four digital slips (the tendon itself is not a separate mesh, so no bony insertion pin is placed on the toes).',
    action:
      'Assists flexor digitorum longus in flexing the lesser toes, and realigns that tendon’s pull from a medial (posteromedial) direction into a more straight, posterior-to-anterior line. It can also flex those toes even if FDL is slack (for example, when the ankle is plantarflexed).',
    innervation: 'Lateral plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · calcaneus', muscleMeshes: [`flex_acc_${s}`], boneMeshes: side(s, ['calcaneus']), prefer: 'anterior' },
    ],
  },

  opponens_digiti_minimi_foot: {
    id: 'opponens_digiti_minimi_foot',
    description:
      'A small, variable slip along the fifth metatarsal, sometimes regarded as part of flexor digiti minimi brevis of the foot rather than a constant separate muscle. In this pack it has its own mesh. It is named in full (“of foot”) so it is not confused with the hand muscle of the same short name.',
    origin:
      'The plantar base of the fifth metatarsal, and the long plantar ligament / sheath of fibularis longus, close to flexor digiti minimi brevis of the foot.',
    insertion:
      'The lateral border of the shaft of the fifth metatarsal.',
    action:
      'Draws the fifth metatarsal downward and laterally, slightly “cupping” the lateral forefoot. It is a weak and inconstant muscle; its action is modest.',
    innervation: 'Lateral plantar nerve (S2–S3).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · 5th metatarsal base', muscleMeshes: [`odm_foot_${s}`], boneMeshes: side(s, ['metatarsal5']), prefer: 'caudal' },
      { kind: 'insertion', label: 'Insertion · 5th metatarsal shaft', muscleMeshes: [`odm_foot_${s}`], boneMeshes: side(s, ['metatarsal5']), prefer: 'lateral' },
    ],
  },

}

const ORD = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
] as const

function thoracicBone(n: number): BoneViewInfo {
  const id = `t${n}`
  if (n === 1) {
    return {
      id,
      description:
        'T1 is the first thoracic vertebra, transitional from the cervical pattern. It has a relatively large, somewhat triangular body, a fairly horizontal spinous process (sometimes still palpable just below C7), and a complete superior costal facet for the head of the first rib plus an inferior demifacet for the second rib.',
      articulations:
        'C7 above, T2 below; the head of rib 1 on the full superior costal facet, and the head of rib 2 on the inferior demifacet; the tubercle of rib 1 on the transverse process.',
      features:
        'Transverse processes still carry a costotransverse facet. The vertebral foramen is relatively large compared with lower thoracic levels. The first pair of ribs — not C7 — form the boundary of the thoracic inlet with T1 and the manubrium.',
    }
  }
  if (n === 10) {
    return {
      id,
      description:
        'T10 is a lower thoracic vertebra, transitional toward the lumbar pattern. It typically has a single complete costal facet on the body (sometimes still a small inferior demifacet) for the head of the tenth rib, and a costotransverse facet on the transverse process.',
      articulations:
        'T9 above, T11 below; the head of rib 10 on the vertebral body; the tubercle of rib 10 on the transverse process.',
      features:
        'The spinous process is shorter and less steeply downward than at mid-thoracic levels. Costal facet pattern at T9–T10 is somewhat variable between individuals.',
    }
  }
  if (n === 11) {
    return {
      id,
      description:
        'T11 is a transitional thoracolumbar vertebra. It has a large body approaching the lumbar shape, a short, almost horizontal spinous process, and a single complete costal facet for the head of the eleventh (floating) rib. There is typically no facet on the transverse process.',
      articulations:
        'T10 above, T12 below; the head of rib 11 on the vertebral body. There is usually no costotransverse joint.',
      features:
        'Absence of a costotransverse facet matches the missing tubercle of the floating 11th rib. Mamillary-like processes may begin to appear, foreshadowing the lumbar pattern.',
    }
  }
  if (n === 12) {
    return {
      id,
      description:
        'T12 is the last thoracic vertebra and is strongly lumbar in character, with a large body, stout transverse processes, and a short horizontal spinous process. It carries a single complete costal facet for the twelfth (floating) rib and usually has no costotransverse facet. Inferior articular facets already face laterally, like those of a lumbar vertebra, so rotation is more limited below this level.',
      articulations:
        'T11 above, L1 below; the head of rib 12 on the vertebral body. There is usually no costotransverse joint.',
      features:
        'A common site of traumatic fracture (the thoracolumbar junction is a transition in both curvature and stiffness). The change in inferior articular-facet orientation is the key landmark for identifying T12.',
    }
  }
  const typical = n >= 2 && n <= 8
  return {
    id,
    description: typical
      ? `T${n} is a typical mid-thoracic vertebra, with a heart-shaped body, a long spinous process that slopes steeply downward, and demifacets for ribs. The superior demifacet receives the head of rib ${n}; the inferior demifacet receives the head of rib ${n + 1}.`
      : `T${n} is a lower mid-thoracic vertebra. Costal facet pattern here can vary: it usually still has a superior demifacet (or a nearly complete facet) for rib ${n} and a small inferior demifacet for rib ${n + 1}. The body and spine are beginning to look more like the lower thoracic levels.`,
    articulations: `T${n - 1} above, T${n + 1} below; the head of rib ${n} (superior demifacet, together with the inferior demifacet of T${n - 1}) and the head of rib ${n + 1} (inferior demifacet); the tubercle of rib ${n} at the costotransverse joint.`,
    features:
      'The vertebral canal is relatively round and smaller than in the cervical region. Pedicles are short; laminae are broad and overlap those of the vertebra below, limiting extension.',
  }
}

function ribBone(n: number): BoneViewInfo {
  const id = `rib${n}`
  const ordinal = ORD[n - 1]
  const trueFalse =
    n <= 7
      ? 'It is a true (vertebrosternal) rib: its cartilage attaches directly to the sternum.'
      : n <= 10
        ? 'It is a false (vertebrochondral) rib: its cartilage joins the cartilage of the rib above rather than reaching the sternum directly.'
        : 'It is a floating (vertebral, free) rib: it has no anterior cartilaginous attachment to the sternum or to the rib above.'

  if (n === 1) {
    return {
      id,
      description:
        'The first rib is short, broad, and sharply curved, and is the most atypical rib. It is flattened in the horizontal plane and forms the bony margin of the thoracic inlet with T1 and the manubrium. On its superior surface, a scalene tubercle (for scalenus anterior) separates grooves for the subclavian vein (anterior) and the subclavian artery with the inferior trunk of the brachial plexus (posterior).',
      articulations:
        'Head articulates with the body of T1 only (a single full facet). The tubercle articulates with the transverse process of T1. The costal cartilage meets the manubrium just below the sternoclavicular joint.',
      features:
        'The neck is short; the shaft has no typical costal groove on its inferior inner border in the same way as typical ribs. It is closely related to the apex of the lung and the stellate (cervicothoracic) ganglion.',
    }
  }
  if (n === 2) {
    return {
      id,
      description:
        'The second rib is longer than the first but still atypical, with a more typical curvature beginning to appear. Its external surface has a rough tuberosity for part of the origin of serratus anterior. It contributes to the shape of the upper thoracic wall.',
      articulations:
        'Head articulates with the inferior demifacet of T1 and the superior demifacet of T2. The tubercle articulates with the transverse process of T2. The costal cartilage meets the sternal angle (manubriosternal joint), a useful surface landmark at the level of T4/T5 and the aortic arch.',
      features: `${trueFalse} The sternal end of the second costal cartilage is a standard clinical landmark for counting ribs.`,
    }
  }
  if (n >= 3 && n <= 9) {
    const anterior =
      n <= 7
        ? 'attaches to the side of the sternal body'
        : n === 8
          ? 'joins the seventh costal cartilage'
          : 'joins the eighth costal cartilage (and so, indirectly, the seventh)'
    return {
      id,
      description: `The ${ordinal} rib is a typical rib, with a head (two facets), a neck, a tubercle, and a curved shaft that turns at the angle. The shaft is thin and flattened, with a costal groove on its internal inferior border that shelters the intercostal vein, artery, and nerve (VAN, from superior to inferior).`,
      articulations: `Head: inferior demifacet of T${n - 1} and superior demifacet of T${n}. Tubercle: transverse process of T${n}. Anteriorly, the costal cartilage ${anterior}.`,
      features: `${trueFalse} The rib angle is the most posterior point of the shaft and a common site of fracture.`,
    }
  }
  if (n === 10) {
    return {
      id,
      description:
        'The tenth rib is often slightly atypical: its head usually has a single facet (articulating only with T10) rather than two demifacets. It otherwise resembles a typical rib, with a tubercle and a shaft that still reaches an anterior cartilage.',
      articulations:
        'Head: typically the complete costal facet of T10. Tubercle: transverse process of T10. Anteriorly its cartilage joins the ninth (and thereby the costal margin).',
      features: `${trueFalse} Facet pattern at rib 9–10 can vary between individuals.`,
    }
  }
  if (n === 11) {
    return {
      id,
      description:
        'The eleventh rib is short and has a single facet on its head for T11. It usually has no tubercle and no neck to speak of, and it does not attach anteriorly to the sternum or to another costal cartilage.',
      articulations:
        'Head only: the complete costal facet of T11. There is typically no costotransverse joint and no sternal or chondral attachment.',
      features: `${trueFalse} The tip lies in the posterior abdominal wall musculature and is related to the kidney on each side.`,
    }
  }
  return {
    id,
    description:
      'The twelfth rib is the shortest rib, with a single facet on its head for T12, no tubercle, and no anterior attachment. It is often little more than a slender shaft pointed into the posterior abdominal wall.',
    articulations:
      'Head only: the complete costal facet of T12. There is typically no costotransverse joint and no sternal or chondral attachment.',
    features: `${trueFalse} It gives attachment to quadratus lumborum and the lumbocostal ligaments, and is a landmark in the loin. Length is quite variable.`,
  }
}

function lumbarBone(n: number): BoneViewInfo {
  const id = `l${n}`
  const articulations =
    n === 1
      ? 'T12 above, L2 below; no ribs. The T12–L1 joint is part of the thoracolumbar junction.'
      : n === 5
        ? 'L4 above, and the sacrum (S1) below at the lumbosacral joint.'
        : `L${n - 1} above, L${n + 1} below. No ribs.`
  if (n === 5) {
    return {
      id,
      description:
        'L5 is the largest lumbar vertebra. Its body is deeper anteriorly than posteriorly, contributing to the lumbosacral angle, and its transverse processes are thick and strong, arising from both the pedicle and the body. It carries much of the axial load into the sacrum.',
      articulations,
      features:
        'The inferior articular facets face well forward to lock with S1 and resist anterior slip (spondylolisthesis, when the pars interarticularis fails, is most common at L5). The L5/S1 disc is also a frequent site of degeneration and herniation.',
    }
  }
  const features =
    n === 1
      ? 'L1 often lies at the level of the end of the spinal cord (the conus medullaris is typically about L1–L2 in adults). The first lumbar vertebra still sits close to the thoracolumbar junction, a relatively mobile and injury-prone region.'
      : n === 4
        ? 'The L4 vertebral body / L4–L5 disc commonly lies at the level of the iliac crests (the supracristal or Tuffier’s line), a standard landmark for lumbar puncture, which is performed at L3/L4 or L4/L5 — below the conus.'
        : 'The vertebral canal here contains the cauda equina rather than the spinal cord (the cord typically ends at L1–L2). Intervertebral discs at lumbar levels are thick and a common site of posterolateral herniation.'
  return {
    id,
    description: `L${n} is a lumbar vertebra, built for weight bearing: a large kidney-shaped body, short stout pedicles, long slender transverse processes, and a broad, hatchet-shaped spinous process that projects nearly horizontally. Articular facets are in a sagittal plane, favouring flexion and extension and limiting rotation.`,
    articulations,
    features,
  }
}

export const BONE_VIEW: Record<string, BoneViewInfo> = {
  c1: {
    id: 'c1',
    description:
      'C1, the atlas, is a ring of bone with anterior and posterior arches and paired lateral masses. It has no vertebral body and no spinous process (the body of C1 is incorporated into the dens of C2). The superior articular facets are concave and face upward to receive the occipital condyles; this atlanto-occipital joint is the main “yes” (nodding) joint of the head.',
    articulations:
      'Occipital condyles above (atlanto-occipital joints). C2 below: lateral atlanto-axial joints on the inferior facets, and the median atlanto-axial joint between the anterior arch and the dens, held by the transverse ligament of the atlas.',
    features:
      'The transverse processes are long and palpable; each has a transverse foramen for the vertebral artery, which turns medially on the posterior arch in a groove before entering the foramen magnum. The posterior arch has a small posterior tubercle rather than a spine.',
  },
  c2: {
    id: 'c2',
    description:
      'C2, the axis, is the second cervical vertebra, distinguished by the dens (odontoid process) that projects upward from its body to articulate with the anterior arch of C1. The dens is held there by the transverse ligament of the atlas, forming a pivot — the main “no” (rotation) joint of the head.',
    articulations:
      'C1 above (lateral and median atlanto-axial joints) and C3 below. The alar ligaments run from the dens to the occipital condyles and limit excessive rotation.',
    features:
      'A stout bifid spinous process and transverse foramina for the vertebral artery. Fracture of the dens, or rupture of the transverse ligament, can threaten the spinal cord and is clinically important.',
  },
  c3: {
    id: 'c3',
    description:
      'C3 is a typical cervical vertebra: a small body, a large triangular vertebral foramen, short pedicles, and a short, bifid spinous process. Like C4–C6, it has uncinate processes on the superolateral margins of the body and a transverse foramen in each transverse process.',
    articulations:
      'C2 above and C4 below, at the intervertebral disc and the paired zygapophysial joints. The uncinate processes also meet the beveled inferolateral margins of C2 at the uncovertebral (Luschka) joints.',
    features:
      'Transverse foramina transmit the vertebral artery, vein, and a sympathetic plexus. The bifid spine gives attachment to the ligamentum nuchae and deep cervical muscles. Articular facets are obliquely set, allowing flexion, extension, and rotation.',
  },
  c4: {
    id: 'c4',
    description:
      'C4 is a typical mid-cervical vertebra, with a small body, a triangular vertebral foramen, a short bifid spinous process, uncinate processes, and a transverse foramen in each transverse process.',
    articulations:
      'C3 above and C5 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints formed by the uncinate processes.',
    features:
      'The same typical cervical pattern as its neighbours: transverse foramina for the vertebral vessels, a bifid spine, and uncovertebral joints that help guide flexion and extension and limit lateral flexion.',
  },
  c5: {
    id: 'c5',
    description:
      'C5 is a typical cervical vertebra, sitting in the mid-cervical stack with a small body, triangular vertebral foramen, bifid spinous process, uncinate processes, and transverse foramina.',
    articulations:
      'C4 above and C6 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints.',
    features:
      'Typical cervical features continue here: transverse foramina for the vertebral artery, a bifid spine, and uncovertebral lips on the body. The cervical spinal enlargement (for the brachial plexus) lies at about this level of the cord, though that is a feature of the cord rather than of the bone.',
  },
  c6: {
    id: 'c6',
    description:
      'C6 is the last typical cervical vertebra before the transitional C7. It still has a small body, a triangular vertebral foramen, a usually bifid spinous process, uncinate processes, and a transverse foramen on each side.',
    articulations:
      'C5 above and C7 below, at the intervertebral disc and the zygapophysial joints, and at the uncovertebral (Luschka) joints.',
    features:
      'The vertebral artery typically enters the transverse foramen at C6, having ascended outside the foramina of C7. The anterior tubercle of the C6 transverse process (the carotid or Chassaignac tubercle) is often more prominent and is a landmark against which the common carotid artery can be compressed.',
  },
  c7: {
    id: 'c7',
    description:
      'C7, the vertebra prominens, is the last cervical vertebra and is transitional toward the thoracic type. It is named for its long, usually non-bifid spinous process, which is often the most prominent bony landmark at the base of the neck (though T1 can occasionally be more prominent).',
    articulations:
      'C6 above and T1 below. It does not normally carry a rib; the first rib articulates with T1.',
    features:
      'Transverse foramina are often small and, unlike C1–C6, usually do not transmit the vertebral artery (the artery typically enters the foramen at C6). Anterior and posterior tubercles of the transverse process are less distinct than at higher cervical levels.',
  },
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`t${i + 1}`, thoracicBone(i + 1)])),
  ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`l${i + 1}`, lumbarBone(i + 1)])),
  sacrum: {
    id: 'sacrum',
    description:
      'The sacrum is a large, triangular bone formed by the fusion of five sacral vertebrae. It forms the posterior part of the pelvic girdle, transmits the weight of the trunk to the hip bones, and encloses the sacral canal (a continuation of the vertebral canal) with the cauda equina and sacral spinal nerves.',
    articulations:
      'L5 above, at the lumbosacral (L5/S1) joint and via the L5 inferior articular processes. The paired auricular surfaces articulate with the hip bones at the sacroiliac joints. The apex articulates with the coccyx (no separate coccyx mesh in this pack).',
    features:
      'The sacral promontory (anterosuperior margin of S1) is an obstetric and anatomical landmark. Four pairs of anterior and posterior sacral foramina transmit the ventral and dorsal rami of S1–S4. The median sacral crest is the fused spinous processes; the sacral hiatus opens at the lower end of the canal.',
  },
  manubrium: {
    id: 'manubrium',
    description:
      'The manubrium is the broad, superior part of the sternum, roughly quadrangular, and the thickest portion of the bone. It forms the anterior boundary of the thoracic inlet and anchors the clavicles and the first costal cartilages.',
    articulations:
      'Clavicles at the sternoclavicular joints (with an articular disc). First costal cartilages at the lateral borders. The second costal cartilages meet at the manubriosternal joint. Inferiorly it joins the sternal body at the sternal angle (a secondary cartilaginous joint that often ossifies later in life).',
    features:
      'The jugular (suprasternal) notch is palpable in the midline. The sternal angle (of Louis) is a key surface landmark: it lies at T4/T5, marks the attachment of the second costal cartilage, the start and end of the aortic arch, and the bifurcation of the trachea.',
  },
  sternum_body: {
    id: 'sternum_body',
    description:
      'The body (gladiolus) of the sternum is the long mid-portion, formed from four sternebrae that fuse during development. It receives the costal cartilages of ribs 2–7 and gives origin to pectoralis major on each side.',
    articulations:
      'Manubrium at the sternal angle. Costal cartilages 2–7 along the lateral borders (the seventh at the junction with the xiphoid). Xiphoid process inferiorly, at the xiphisternal joint.',
    features:
      'Transverse ridges mark the fused sternebrae. The body is subcutaneous and a site for sternal marrow biopsy. A sternal foramen is a common, usually harmless, midline developmental gap.',
  },
  xiphoid: {
    id: 'xiphoid',
    description:
      'The xiphoid process is the small, variable, cartilaginous or partly ossified tip of the sternum. It may be pointed, bifid, or deflected, and it ossifies and often fuses with the sternal body in middle age.',
    articulations:
      'The sternal body at the xiphisternal joint, which typically lies at the level of T9 and the central tendon of the diaphragm. The seventh costal cartilages also meet at this junction.',
    features:
      'It gives attachment to the linea alba, fibers of the abdominal wall muscles, and some fibers of the diaphragm and transversus thoracis. Care is needed in chest compression so the xiphoid is not driven into the liver or diaphragm.',
  },
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`rib${i + 1}`, ribBone(i + 1)])),

  frontal: {
    id: 'frontal',
    description:
      'The frontal bone forms the forehead, the roof of the orbits, and most of the anterior cranial fossa. It is a flat, unpaired bone in the adult (the metopic suture usually fuses in childhood).',
    articulations:
      'Parietal bones at the coronal suture, the greater wings of the sphenoid, the zygomatic bones at the zygomatic process, the lacrimal, ethmoid, and nasal bones, and the maxillae at the orbital margins. (Sphenoid, ethmoid, lacrimal, and nasal bones are not separate playable meshes here.)',
    features:
      'The supraorbital margin often has a supraorbital notch or foramen for the supraorbital nerve and vessels. Frontal air sinuses lie behind the superciliary arches. The sharp orbital plates form the roofs of the orbits.',
  },
  parietal: {
    id: 'parietal',
    description:
      'The paired parietal bones form most of the sides and roof of the cranial vault. Each is a curved, quadrangular flat bone.',
    articulations:
      'The opposite parietal at the sagittal suture, the frontal bone at the coronal suture, the occipital bone at the lambdoid suture, and the temporal and sphenoid bones at the lateral skull (pterion is the H-shaped meeting of frontal, parietal, temporal, and sphenoid — a thin and clinically important region).',
    features:
      'Temporal lines on the external surface mark the temporalis attachment. The parietal eminence is the original ossification centre. Grooves on the internal surface for the middle meningeal artery are clinically important in extradural haemorrhage after a blow to the pterion.',
  },
  temporal: {
    id: 'temporal',
    description:
      'The paired temporal bones form the lower sides of the skull and house the middle and inner ear. Each has squamous, mastoid, petrous, and tympanic parts, plus a styloid process and a zygomatic process that completes the zygomatic arch.',
    articulations:
      'Parietal, occipital, sphenoid, and zygomatic bones, and the mandible at the temporomandibular joint (the mandibular fossa and articular tubercle). The mastoid process is the insertion of sternocleidomastoid.',
    features:
      'The external acoustic meatus opens in the tympanic part. The petrous part is a dense wedge in the skull base containing the bony labyrinth and the carotid canal. The stylomastoid foramen transmits the facial nerve (CN VII). The zygomatic process meets the zygomatic bone to form the arch.',
  },
  occipital: {
    id: 'occipital',
    description:
      'The occipital bone forms the back and much of the base of the cranium, around the foramen magnum, through which the spinal cord becomes continuous with the brainstem.',
    articulations:
      'Parietal bones at the lambdoid suture, the temporal bones (including the jugular foramen between occipital and petrous temporal), the sphenoid at the clivus / basilar part, and the atlas at the occipital condyles (atlanto-occipital joints).',
    features:
      'The external occipital protuberance and superior nuchal lines give attachment to trapezius and the nuchal ligament. The occipital condyles sit beside the foramen magnum. The hypoglossal canal (for CN XII) passes through the condylar region. Internally, grooves and protuberances related to the dural venous sinuses form the cruciform eminence.',
  },
  mandible: {
    id: 'mandible',
    description:
      'The mandible is the unpaired bone of the lower jaw and the only movable bone of the skull (apart from the ear ossicles). It has a horseshoe-shaped body and two rami; each ramus ends in a condylar process (head) and a coronoid process.',
    articulations:
      'The mandibular heads articulate with the mandibular fossae of the temporal bones at the temporomandibular joints, each with an articular disc.',
    features:
      'The alveolar process carries the lower teeth. The mental foramen (mental nerve and vessels) opens on the external body; the mandibular foramen on the inner ramus admits the inferior alveolar nerve. The angle and ramus give attachment to masseter and medial pterygoid; the coronoid process receives temporalis.',
  },
  maxilla: {
    id: 'maxilla',
    description:
      'The paired maxillae form the upper jaw, the floor of the orbit, the floor and lateral wall of the nasal cavity, and most of the hard palate. They contain the maxillary air sinuses, the largest of the paranasal sinuses.',
    articulations:
      'The opposite maxilla in the midline, the zygomatic, frontal, palatine, nasal, lacrimal, ethmoid, inferior nasal concha, and the vomer, and (via teeth and occlusion) the mandible. Several of these neighbours are not separate playable meshes in this pack.',
    features:
      'The alveolar process carries the upper teeth. The infraorbital foramen, below the orbital margin, transmits the infraorbital nerve and vessels. The palatine process forms most of the hard palate. The maxillary sinus drains into the middle meatus of the nose, an awkward drainage path when upright.',
  },
  zygomatic: {
    id: 'zygomatic',
    description:
      'The paired zygomatic (cheek, malar) bones form the prominence of the cheek and the lateral and inferior margins of the orbit. Each has frontal, temporal, and maxillary processes.',
    articulations:
      'Frontal bone at the frontozygomatic suture (lateral orbital margin), the zygomatic process of the temporal bone (completing the zygomatic arch), and the zygomatic process of the maxilla (inferior orbital margin).',
    features:
      'The zygomatic arch is a subcutaneous landmark and a superficial origin for masseter. A small zygomaticofacial foramen often pierces the outer surface. The temporal process is relatively slender and a common site of isolated arch fracture.',
  },
  clavicle: {
    id: 'clavicle',
    description:
      'The clavicle (collarbone) is an S-shaped long bone lying subcutaneously between the manubrium and the acromion. It is the only bony strut holding the upper limb away from the trunk, and it is the first long bone to ossify (and a frequent fracture site, typically in the middle third).',
    articulations:
      'Medially, the manubrium (and a small facet for the first costal cartilage) at the sternoclavicular joint, which has an articular disc. Laterally, the acromion at the acromioclavicular joint.',
    features:
      'The medial two-thirds are convex forward; the lateral third is concave forward. The inferior surface has an impression for the costoclavicular ligament, a subclavian groove, and a conoid tubercle with a trapezoid line for the coracoclavicular ligament. Descending trapezius and anterior deltoid attach along the lateral third; the clavicular heads of pectoralis major and sternocleidomastoid attach more medially.',
  },
  scapula: {
    id: 'scapula',
    description:
      'The scapula (shoulder blade) is a flat, triangular bone on the posterior thoracic wall, usually overlying ribs 2–7. It has a slightly concave costal surface (subscapular fossa), a posterior spine that ends laterally as the acromion, and a coracoid process projecting anteriorly. The glenoid cavity on the lateral angle forms the socket of the shoulder.',
    articulations:
      'Head of the humerus at the glenohumeral joint (a shallow ball-and-socket, deepened by the labrum). Acromion with the clavicle at the acromioclavicular joint. It does not articulate directly with the ribs; it glides on them in a scapulothoracic “joint.”',
    features:
      'The spine divides the posterior surface into supraspinous and infraspinous fossae. The supraglenoid and infraglenoid tubercles are the origins of the long heads of biceps and triceps. The coracoid process gives origin to the short head of biceps and coracobrachialis, and attachment to the coracoclavicular and coracoacromial ligaments. The glenoid faces laterally and slightly anteriorly.',
  },
  humerus: {
    id: 'humerus',
    description:
      'The humerus is the long bone of the arm. Proximally it has a hemispherical head, anatomical neck, greater and lesser tubercles, and an intertubercular sulcus; the surgical neck (a common fracture site) lies just below the tubercles. The shaft is cylindrical above and triangular below, with a deltoid tuberosity and a spiral (radial) groove. Distally the bone expands into medial and lateral epicondyles, a trochlea (ulna), and a capitulum (radius).',
    articulations:
      'Glenoid cavity of the scapula at the shoulder. At the elbow, the trochlea with the trochlear notch of the ulna, and the capitulum with the head of the radius; the proximal radio-ulnar joint is between the radial head and the radial notch of the ulna.',
    features:
      'The intertubercular sulcus lodges the long head of biceps; its lips receive pectoralis major (lateral), latissimus dorsi (floor), and teres major (medial). The radial nerve and profunda brachii artery run in the spiral groove (between the lateral and medial heads of triceps). The ulnar nerve passes behind the medial epicondyle.',
  },
  radius: {
    id: 'radius',
    description:
      'The radius is the lateral long bone of the forearm. It has a disc-shaped head at the elbow, a neck, a radial (bicipital) tuberosity, a triangular shaft that widens distally, and a distal end with a styloid process and an ulnar notch. In pronation and supination the radius rotates around the ulna, carrying the hand with it.',
    articulations:
      'Capitulum of the humerus and the radial notch of the ulna proximally (elbow and proximal radio-ulnar joints). Distally, the scaphoid and lunate at the radiocarpal (wrist) joint, and the head of the ulna at the distal radio-ulnar joint (via an articular disc, the triangular fibrocartilage).',
    features:
      'The radial tuberosity is the insertion of biceps brachii. The dorsal (Lister’s) tubercle on the distal posterior surface guides the tendon of extensor pollicis longus. The styloid process extends farther distally than the ulnar styloid, which matters when assessing a distal radial (Colles) fracture.',
  },
  ulna: {
    id: 'ulna',
    description:
      'The ulna is the medial long bone of the forearm, longer than the radius at the elbow and shorter at the wrist. Proximally it has the olecranon, the coronoid process, the trochlear notch, and a radial notch. The shaft tapers to a small rounded head and a styloid process at the wrist, which does not articulate directly with the carpus.',
    articulations:
      'Trochlea of the humerus at the elbow (hinge). Head of the radius at the proximal radio-ulnar joint; the ulnar head and the ulnar notch of the radius (plus the articular disc) at the distal radio-ulnar joint. The disc, not the ulna itself, meets the carpus (triquetrum / lunate).',
    features:
      'The olecranon is the insertion of triceps and the palpable “point” of the elbow. The subcutaneous posterior border is palpable along the forearm. The ulnar styloid is a landmark on the medial wrist; a gap between the styloids is a clue to distal radial deformity.',
  },

  hip: {
    id: 'hip',
    description:
      'The hip bone (os coxae, innominate bone) is a large, irregular pelvic bone formed by the fusion of ilium, ischium, and pubis at the acetabulum. In this model those three parts are a single mesh, not a split pelvis. The ilium is the broad upper blade, the ischium the posteroinferior part you sit on, and the pubis the anterior part meeting its fellow at the pubic symphysis.',
    articulations:
      'The acetabulum with the head of the femur (hip joint). The auricular surface of the ilium with the sacrum (sacroiliac joint). The pubic body with the opposite pubis at the pubic symphysis (a secondary cartilaginous joint).',
    features:
      'The iliac crest is palpable from the anterior superior iliac spine to the posterior superior iliac spine. The anterior inferior iliac spine and the superior acetabular rim are the origins of rectus femoris; the ischial tuberosity is the origin of the hamstrings. The acetabulum faces inferolaterally and is deepened by the labrum, with a lunate articular surface and a central acetabular fossa.',
  },
  femur: {
    id: 'femur',
    description:
      'The femur is the longest and strongest bone in the body, forming the thigh. Proximally it has a head (with a fovea for the ligament of the head), a neck, and greater and lesser trochanters. The shaft is slightly bowed forward, with a posterior linea aspera. Distally it expands into medial and lateral condyles and epicondyles, and a trochlear patellar surface.',
    articulations:
      'Acetabulum of the hip bone at the hip joint. Distally, the tibial condyles (via menisci) and the patella at the knee. The fibula does not articulate with the femur.',
    features:
      'The neck–shaft angle (normally about 125° in adults) and anteversion are important in hip mechanics; the femoral neck is a common fracture site in older people. The linea aspera gives origin to the vasti and the short head of biceps femoris, and receives adductors. The gluteal tuberosity receives deeper fibers of gluteus maximus. The medial and lateral femoral condyles are the origins of the two heads of gastrocnemius.',
  },
  patella: {
    id: 'patella',
    description:
      'The patella (kneecap) is the largest sesamoid bone, developed in the quadriceps tendon. It is triangular, with a superior base, an inferior apex, and a posterior articular surface divided by a vertical ridge into a larger lateral and a smaller medial facet.',
    articulations:
      'The trochlear (patellar) surface of the femur only. It does not articulate with the tibia; the patellar ligament continues from the apex to the tibial tuberosity.',
    features:
      'It increases the leverage of the quadriceps by holding the tendon off the axis of the knee, and protects the anterior joint. The quadriceps (rectus femoris and the vasti) insert on the base and margins; the patellar ligament leaves the apex. Lateral dislocation is more common than medial, because the lateral femoral condyle and vastus medialis normally restrain it.',
  },
  tibia: {
    id: 'tibia',
    description:
      'The tibia is the medial and weight-bearing long bone of the leg. Proximally it has broad medial and lateral condyles, an intercondylar eminence, and a tibial tuberosity. The shaft is triangular, with a sharp, subcutaneous anterior border. Distally it forms the medial malleolus and the plafond of the ankle.',
    articulations:
      'Femoral condyles at the knee (with menisci). Head of the fibula at the proximal tibiofibular joint. Distally, the talus at the ankle (with the fibula and the inferior tibiofibular syndesmosis), and the fibula again at the fibular notch.',
    features:
      'The tibial tuberosity is the insertion of the patellar ligament (and so of the quadriceps). The soleal line on the posterior shaft marks the origin of soleus. The medial surface of the proximal shaft receives the pes anserinus (sartorius, gracilis, semitendinosus). The anterior border and medial surface are subcutaneous and easily bruised.',
  },
  fibula: {
    id: 'fibula',
    description:
      'The fibula is the slender lateral long bone of the leg. It bears little axial weight (the tibia carries nearly all of it) but is important for muscle attachment, for the ankle mortise, and as a source of bone graft. It has a head (with an apex, the styloid), a narrow neck, a long shaft, and a distal lateral malleolus.',
    articulations:
      'The lateral condyle of the tibia at the proximal tibiofibular joint (not the femur). Distally, the fibular notch of the tibia (syndesmosis) and the lateral talus at the ankle.',
    features:
      'The head is the insertion of biceps femoris and the fibular collateral ligament; the common fibular nerve winds around the neck, a vulnerable site. Soleus and several peroneal and deep posterior muscles arise from the shaft. The lateral malleolus extends farther distally than the medial malleolus and helps resist eversion.',
  },
  scaphoid: {
    id: 'scaphoid',
    description:
      'The scaphoid (navicular of the hand) is the largest bone of the proximal carpal row, boat-shaped, and lies in the floor of the anatomical snuffbox. It spans both carpal rows in a functional sense, linking the proximal row to the trapezium and trapezoid.',
    articulations:
      'Radius (scaphoid fossa) proximally; lunate medially; capitate distomedially; trapezium and trapezoid distally.',
    features:
      'A narrow waist is a classic fracture site (a fall on the outstretched hand). Blood supply often enters distally, so a fracture through the waist risks avascular necrosis of the proximal pole. Tenderness in the snuffbox after a fall is a warning sign.',
  },
  lunate: {
    id: 'lunate',
    description:
      'The lunate is a crescent-shaped bone in the centre of the proximal carpal row. It is the keystone of the proximal row and the bone most often dislocated at the wrist (usually palmar, in a lunate or perilunate injury).',
    articulations:
      'Radius proximally (and the articular disc of the distal radio-ulnar joint on its medial corner); scaphoid laterally; triquetrum medially; capitate and a little of the hamate distally.',
    features:
      'Its palmar surface is broader than the dorsal, which makes dorsal dislocation of the capitate (perilunate) more likely than the reverse. Avascular necrosis of the lunate is Kienböck’s disease.',
  },
  triquetrum: {
    id: 'triquetrum',
    description:
      'The triquetrum (triquetral) is a pyramidal bone on the medial side of the proximal carpal row. It sits just distal to the articular disc of the ulna, not directly on the ulnar head.',
    articulations:
      'Lunate laterally, hamate distally, and the pisiform on its palmar surface. Proximally it relates to the triangular fibrocartilage, not to the ulna itself.',
    features:
      'It is the second most frequently fractured carpal bone (after the scaphoid), often from a fall with the hand in extension and ulnar deviation. The pisiform sits on its palmar surface in the tendon of flexor carpi ulnaris.',
  },
  pisiform: {
    id: 'pisiform',
    description:
      'The pisiform is a small, pea-shaped sesamoid bone in the tendon of flexor carpi ulnaris, on the palmar-medial aspect of the proximal carpal row. It is palpable at the base of the hypothenar eminence and forms the medial wall of the Guyon (ulnar) canal.',
    articulations:
      'Only the palmar surface of the triquetrum — a single synovial joint. It does not articulate with the ulna or with any other carpal bone.',
    features:
      'It is the last carpal to ossify. Flexor carpi ulnaris inserts on it and continues to the hook of the hamate and the bases of the fourth and fifth metacarpals as the pisohamate and pisometacarpal ligaments. The ulnar nerve and artery pass lateral to it in Guyon’s canal.',
  },
  trapezium: {
    id: 'trapezium',
    description:
      'The trapezium (greater multangular) is the most lateral bone of the distal carpal row and carries the saddle-shaped carpometacarpal joint of the thumb — the joint that gives the thumb its wide range of opposition and circumduction.',
    articulations:
      'Scaphoid proximally, trapezoid medially, and the first (and a little of the second) metacarpal distally.',
    features:
      'A palmar groove and tubercle (with a related fibrous sheath) help form the radial wall of the carpal tunnel and an attachment for the flexor retinaculum. Osteoarthritis of the first carpometacarpal joint is common and disabling.',
  },
  trapezoid: {
    id: 'trapezoid',
    description:
      'The trapezoid (lesser multangular) is the smallest bone of the distal carpal row, a compact wedge firmly set between the trapezium, capitate, scaphoid, and the second metacarpal. Isolated injury is uncommon.',
    articulations:
      'Scaphoid proximally, trapezium laterally, capitate medially, and the base of the second metacarpal distally.',
    features:
      'It is the most stable bone of the distal row, tightly bound to the second metacarpal, which itself is the most stable metacarpal. Little independent motion occurs at this carpometacarpal joint.',
  },
  capitate: {
    id: 'capitate',
    description:
      'The capitate is the largest carpal bone and the centre of the distal row (and of the carpus as a whole). Its head sits in a recess formed by the scaphoid and lunate; its distal surface meets the third metacarpal, with small facets for the second and fourth.',
    articulations:
      'Scaphoid and lunate proximally, trapezoid laterally, hamate medially, and the bases of metacarpals 2–4 (mainly the third) distally.',
    features:
      'It is the keystone of the carpal arch and a reference point for wrist motion and for many carpal injuries (perilunate dislocation circles around the capitate head). It ossifies first among the carpals, usually in the first year of life.',
  },
  hamate: {
    id: 'hamate',
    description:
      'The hamate is the medial bone of the distal carpal row, distinguished by the hook (hamulus) that projects palmar from its distal palmar surface. The hook is a palpable landmark in the heel of the hand and forms the lateral wall of Guyon’s canal and a medial attachment of the flexor retinaculum.',
    articulations:
      'Lunate (a small facet) and triquetrum proximally, capitate laterally, and the bases of the fourth and fifth metacarpals distally.',
    features:
      'The hook can be fractured by a direct blow (a bat, club, or racket in the palm) and is part of the ulnar (Guyon) tunnel with the pisiform: the ulnar nerve and artery pass there. The deep motor branch of the ulnar nerve hooks around the base of the hook.',
  },

  metacarpals: {
    id: 'metacarpals',
    description:
      'The five metacarpal bones form the palm, numbered 1–5 from the thumb to the little finger. Each is a miniature long bone with a proximal base (carpal and intermetacarpal joints), a shaft, and a distal head (the knuckle of the metacarpophalangeal joint). The first metacarpal is shorter, stouter, and more mobile than the others. Tap a single metacarpal for a more specific note.',
    articulations:
      'Bases with the distal carpal row and with neighbouring metacarpals (the first is largely independent). Heads with the proximal phalanges at the MCP joints.',
    features:
      'The third metacarpal has a prominent styloid process at its base, a useful landmark. The necks of the metacarpals (especially the fifth) are common fracture sites (“boxer’s fracture”).',
  },
  metacarpal1: {
    id: 'metacarpal1',
    description:
      'The first metacarpal is the short, stout metacarpal of the thumb. It is set in a more anterior and pronated plane than the other metacarpals, and its saddle-shaped base on the trapezium allows opposition, abduction, and circumduction.',
    articulations:
      'Trapezium at the first carpometacarpal (saddle) joint; the proximal phalanx of the thumb at the MCP joint. It has little or no intermetacarpal joint with the second metacarpal, which is why the thumb can move independently.',
    features:
      'The base is uniquely saddle-shaped. This joint is a very common site of osteoarthritis. The head is less spherical than those of metacarpals 2–5, and the thumb MCP joint often has sesamoids in the flexor pollicis brevis / adductor pollicis tendons.',
  },
  metacarpal2: {
    id: 'metacarpal2',
    description:
      'The second metacarpal, of the index finger, is usually the longest metacarpal. Its base is recessed and firmly locked to the trapezoid (and to the trapezium and capitate), making it the most stable ray of the hand.',
    articulations:
      'Mainly the trapezoid, with small facets for the trapezium, capitate, and third metacarpal. Distally, the proximal phalanx of the index finger.',
    features:
      'Limited motion at its carpometacarpal joint is the reason the index finger is a stable “pointer.” Extensor carpi radialis longus inserts on the dorsal base.',
  },
  metacarpal3: {
    id: 'metacarpal3',
    description:
      'The third metacarpal, of the middle finger, occupies the axis of the hand. Its base has a distinctive styloid process that projects proximally on the dorsal-radial side and articulates mainly with the capitate.',
    articulations:
      'Capitate (principal), plus the second and fourth metacarpals and a small facet sometimes for the trapezoid or hamate. Distally, the proximal phalanx of the middle finger.',
    features:
      'The styloid process is a palpable and radiographic landmark. Extensor carpi radialis brevis inserts on the dorsal base. Like the second, this carpometacarpal joint is relatively immobile.',
  },
  metacarpal4: {
    id: 'metacarpal4',
    description:
      'The fourth metacarpal, of the ring finger, is slightly shorter than the third and is more mobile at its base, contributing to cupping of the palm.',
    articulations:
      'Hamate and capitate proximally, the third and fifth metacarpals at the sides, and the proximal phalanx of the ring finger distally.',
    features:
      'A modest range of flexion–extension at the carpometacarpal joint lets the ring finger fold toward the palm. Isolated fourth-metacarpal fractures must be checked for rotational malalignment, which shows as finger overlap in flexion.',
  },
  metacarpal5: {
    id: 'metacarpal5',
    description:
      'The fifth metacarpal, of the little finger, is the most mobile of the medial four metacarpals. Motion at its carpometacarpal joint helps deepen the palmar cup and bring the little finger toward the thumb in opposition of the ulnar ray.',
    articulations:
      'Hamate proximally, the fourth metacarpal laterally, and the proximal phalanx of the little finger distally.',
    features:
      'The neck is a classic site of a “boxer’s fracture” (a punch on a clenched fist). Extensor carpi ulnaris inserts on the dorsal base. Check rotation after fracture: a malrotated fifth metacarpal makes the little finger overlap the ring finger in a fist.',
  },
  hand_phalanges: {
    id: 'hand_phalanges',
    description:
      'The phalanges of the hand are fourteen miniature long bones: each finger has a proximal, a middle, and a distal phalanx, while the thumb has only a proximal and a distal phalanx. Each has a base, a shaft, and a head (the distal phalanges end in a palmar tuft rather than a true head). In this model they are grouped as one selectable item.',
    articulations:
      'Proximal phalanges with the metacarpal heads at the metacarpophalangeal (MCP) joints, then PIP and DIP joints in the fingers, and a single interphalangeal (IP) joint in the thumb.',
    features:
      'MCP joints are condyloid (flexion–extension and some abduction–adduction); IP joints are hinges. The palmar bases of the middle and distal phalanges receive the flexor tendons; the dorsal bases of the distal and middle phalanges receive the extensor expansions (terminal and central slips). Mallet finger and boutonnière deformity follow injury to those slips.',
  },
  calcaneus: {
    id: 'calcaneus',
    description:
      'The calcaneus (heel bone) is the largest tarsal bone. It projects posteriorly as the heel and supports the talus on its superior articular facets. The posterior third is a robust tuberosity; the anterior end meets the cuboid. A shelf of bone on the medial side, the sustentaculum tali, supports the medial talus and is grooved inferiorly for flexor hallucis longus.',
    articulations:
      'Talus above (the subtalar joint, with anterior, middle, and posterior facets, and a sinus tarsi between them). Cuboid in front (calcaneocuboid joint, part of the midtarsal / Chopart joint).',
    features:
      'The posterior surface receives the calcaneal (Achilles) tendon on its middle third. The plantar surface has medial and lateral tubercles, origins of the first-layer plantar muscles, and a common site of plantar heel pain (plantar fascia / heel spur). Calcaneal fractures are often from a fall onto the heels.',
  },
  talus: {
    id: 'talus',
    description:
      'The talus transmits the whole weight of the body from the tibia to the heel and the midfoot. It has a head (navicular surface), a neck, and a body with a trochlear superior surface that fits the ankle mortise, plus a posterior process and a lateral process. Unusually among bones of this size, no muscle attaches to the talus — only ligaments and the joint capsule.',
    articulations:
      'Tibia and fibula above (ankle / talocrural joint). Calcaneus below (subtalar joint). Navicular in front (talonavicular part of the midtarsal joint).',
    features:
      'The blood supply is relatively precarious, running through the neck and ligamentous attachments, so fractures of the neck risk avascular necrosis of the body. The trochlea is wider in front, so the ankle is more stable in dorsiflexion. The head sits on the spring (plantar calcaneonavicular) ligament, a key support of the medial arch.',
  },
  navicular: {
    id: 'navicular',
    description:
      'The navicular is a boat-shaped bone of the midfoot, lying medial and just distal to the talar head. A prominent tuberosity on its medial plantar aspect is palpable about a finger’s breadth below and in front of the tip of the medial malleolus, and is the main insertion of tibialis posterior.',
    articulations:
      'Head of the talus proximally; the three cuneiforms distally; often a small facet for the cuboid laterally.',
    features:
      'It is a keystone of the medial longitudinal arch. An accessory navicular (an unfused ossicle at the tuberosity) is a common variant and can be painful. Stress fracture or osteonecrosis (Köhler’s disease in children) can affect this bone.',
  },
  cuboid: {
    id: 'cuboid',
    description:
      'The cuboid is the lateral midfoot bone, roughly cube-shaped, sitting between the calcaneus behind and the fourth and fifth metatarsals in front. A groove on its plantar surface, running behind a tuberosity (the cuboid tuberosity), lodges the tendon of fibularis (peroneus) longus.',
    articulations:
      'Calcaneus proximally (calcaneocuboid joint), lateral cuneiform and often the navicular medially, and the bases of the fourth and fifth metatarsals distally.',
    features:
      'It is a landmark on the lateral midfoot and part of the midtarsal (Chopart) and tarsometatarsal (Lisfranc) complexes. The peroneus longus groove is the distinctive plantar feature. Cuboid “syndrome” refers to a painful disruption of its alignment, often in athletes.',
  },
  cuneiform_medial: {
    id: 'cuneiform_medial',
    description:
      'The medial (first) cuneiform is the largest of the three cuneiforms, a wedge of bone with its base plantar and its thin edge dorsal — the opposite of the other two, which helps lock the transverse arch of the foot. It lies between the navicular and the first metatarsal on the medial midfoot.',
    articulations:
      'Navicular proximally, intermediate cuneiform laterally, and the first metatarsal (plus a small facet for the second metatarsal) distally.',
    features:
      'Tibialis anterior inserts on its medial and plantar surface (with the base of the first metatarsal). Tibialis posterior and peroneus longus also send slips here. It is a key element of the medial longitudinal and transverse arches.',
  },
  cuneiform_intermediate: {
    id: 'cuneiform_intermediate',
    description:
      'The intermediate (middle, second) cuneiform is the smallest of the three cuneiforms, a wedge with its base dorsal. It is recessed slightly proximal relative to its neighbours, so the base of the second metatarsal is mortised between the medial and lateral cuneiforms — a very stable arrangement.',
    articulations:
      'Navicular proximally, medial and lateral cuneiforms on each side, and the second metatarsal distally.',
    features:
      'The recessed position of this bone is the reason the second metatarsal is the most firmly anchored of the metatarsals, and why Lisfranc (tarsometatarsal) injuries often centre on the second-ray / intermediate-cuneiform joint.',
  },
  cuneiform_lateral: {
    id: 'cuneiform_lateral',
    description:
      'The lateral (third) cuneiform is intermediate in size between the other two, a wedge with its base dorsal. It sits between the intermediate cuneiform and the cuboid, and in front of the navicular.',
    articulations:
      'Navicular proximally, intermediate cuneiform medially, cuboid laterally, and the third metatarsal distally, with small facets for the second and sometimes the fourth metatarsal.',
    features:
      'It contributes to the transverse arch and to the tarsometatarsal complex of the middle ray. Isolated fracture is uncommon; injury is more often part of a midfoot (Lisfranc) pattern.',
  },
  metatarsals: {
    id: 'metatarsals',
    description:
      'The five metatarsal bones form the forefoot, numbered 1–5 from the hallux (big toe) to the little toe. Each has a proximal base, a shaft, and a distal head. The first is short and stout; the second is usually the longest; the fifth has a prominent tuberosity at its base. Tap a single metatarsal for a more specific note.',
    articulations:
      'Bases with the distal tarsal row (cuneiforms and cuboid) and with neighbouring metatarsals, at the tarsometatarsal (Lisfranc) joints. Heads with the proximal phalanges at the metatarsophalangeal joints.',
    features:
      'The heads form the ball of the foot and bear weight in the stance phase, especially the first and second. The second metatarsal is the most firmly mortised at its base and a common site of stress fracture.',
  },
  metatarsal1: {
    id: 'metatarsal1',
    description:
      'The first metatarsal is the shortest and thickest metatarsal, built to carry a large share of forefoot weight. Its broad head, often with plantar sesamoids in the tendons of flexor hallucis brevis, forms the medial part of the ball of the foot.',
    articulations:
      'Medial cuneiform at its base (and sometimes a small facet for the second metatarsal). Distally, the proximal phalanx of the hallux at the first MTP joint.',
    features:
      'Tibialis anterior inserts on the medial plantar base (with the medial cuneiform); peroneus longus inserts on the lateral plantar base. Hallux valgus and osteoarthritis of the first MTP joint (hallux rigidus) are common clinical problems around this bone.',
  },
  metatarsal2: {
    id: 'metatarsal2',
    description:
      'The second metatarsal is usually the longest. Its base is recessed and locked between the medial and lateral cuneiforms against the intermediate cuneiform, making it the most stable ray of the foot — and a frequent site of stress fracture when load is high or the first ray is insufficient.',
    articulations:
      'Intermediate cuneiform (and facets for the medial and lateral cuneiforms and the third metatarsal) at the base; the proximal phalanx of the second toe at the MTP joint.',
    features:
      'The mortise around this base is the keystone of the Lisfranc joint; a gap between the first and second metatarsal bases on an injury film is a warning of midfoot instability. March (stress) fractures classically affect this shaft.',
  },
  metatarsal3: {
    id: 'metatarsal3',
    description:
      'The third metatarsal occupies the middle of the forefoot. It is of intermediate length and is relatively stable at its base against the lateral cuneiform.',
    articulations:
      'Lateral cuneiform proximally, the second and fourth metatarsals at the sides, and the proximal phalanx of the third toe distally.',
    features:
      'It contributes to the central ray of the transverse and longitudinal arches. Isolated injury is less common than at the second or fifth metatarsal, but it can be involved in Lisfranc patterns and in mid-shaft stress fractures.',
  },
  metatarsal4: {
    id: 'metatarsal4',
    description:
      'The fourth metatarsal is slightly shorter than the third and slightly more mobile at its base, articulating mainly with the cuboid. It helps form the lateral part of the forefoot and the transverse arch.',
    articulations:
      'Cuboid (and often a small facet for the lateral cuneiform) proximally, the third and fifth metatarsals at the sides, and the proximal phalanx of the fourth toe distally.',
    features:
      'Mobility at this tarsometatarsal joint is greater than at the second and third, contributing to the adaptability of the lateral midfoot on uneven ground.',
  },
  metatarsal5: {
    id: 'metatarsal5',
    description:
      'The fifth metatarsal is the most lateral, distinguished by a tuberosity (styloid process) at the base that is easily palpated along the lateral midfoot. The tuberosity is the insertion of fibularis (peroneus) brevis and a classic site of avulsion fracture.',
    articulations:
      'Cuboid at the base, the fourth metatarsal medially, and the proximal phalanx of the little toe distally.',
    features:
      'Three different fractures are worth distinguishing: an avulsion of the tuberosity, a Jones fracture at the metaphyseal–diaphyseal junction (which is slower to heal), and a more distal shaft stress fracture. Fibularis brevis and, partly, fibularis tertius attach at the base.',
  },
  foot_phalanges: {
    id: 'foot_phalanges',
    description:
      'The phalanges of the foot are fourteen bones in the usual pattern: the hallux has a proximal and a distal phalanx; the lesser toes have proximal, middle, and distal phalanges (the middle and distal phalanges of the fifth toe are sometimes fused). They are shorter than their counterparts in the hand. In this model they are grouped as one selectable item.',
    articulations:
      'Proximal phalanges with the metatarsal heads at the MTP joints; then PIP and DIP joints in the lesser toes, and a single IP joint in the hallux.',
    features:
      'The first proximal phalanx and the sesamoids under the first metatarsal head are important in push-off. Hammer toe, claw toe, and hallux valgus alter the alignment of these joints. The distal phalanx of the hallux receives the tendon of flexor hallucis longus on its plantar base, a powerful contribution to the final push-off of gait.',
  },
}


export const CARTILAGE_VIEW: Record<string, CartilageViewInfo> = {
  costal1: {
    id: 'costal1',
    description:
      'The first costal cartilage is short and relatively stiff. It joins the first rib to the manubrium just below the sternoclavicular joint and helps form the margin of the thoracic inlet. Unlike the lower true-rib cartilages, it often ossifies early and moves little.',
    articulations:
      'Lateral end with the first rib; medial end with the manubrium of the sternum, immediately inferior to the clavicular notch.',
    features:
      'This pack includes the first through seventh costal cartilages on each side. Cartilages 8–10 and the costal margin are not in the BodyParts3D pack used here.',
  },
  costal2: {
    id: 'costal2',
    description:
      'The second costal cartilage links the second rib to the sternal angle (the manubriosternal joint). That junction is a standard surface landmark for counting ribs and sits at about the level of the T4/T5 disc and the aortic arch.',
    articulations:
      'Lateral end with the second rib; medial end with the sternal angle, meeting both the manubrium and the upper body of the sternum.',
    features:
      'It is a true (vertebrosternal) cartilage: it reaches the sternum directly. The sternal end is used clinically when counting ribs from the angle of Louis.',
  },
  costal3: {
    id: 'costal3',
    description:
      'The third costal cartilage is a typical true-rib cartilage: a flexible bar of hyaline cartilage that continues the third rib to the side of the sternal body, allowing the chest wall to spring during breathing.',
    articulations:
      'Lateral end with the third rib; medial end with the side of the sternal body.',
    features:
      'With the other true-rib cartilages it contributes to the elasticity of the anterior chest wall. Costal cartilages can calcify with age, reducing that spring.',
  },
  costal4: {
    id: 'costal4',
    description:
      'The fourth costal cartilage continues the fourth rib to the side of the sternal body. It is a typical true (vertebrosternal) hyaline cartilage.',
    articulations:
      'Lateral end with the fourth rib; medial end with the side of the sternal body.',
    features:
      'Together with ribs 3–6 it forms much of the anterior chest wall over the mid-sternum. This pack does not include cartilages 8–10 or a costal margin mesh.',
  },
  costal5: {
    id: 'costal5',
    description:
      'The fifth costal cartilage is a typical true-rib cartilage joining the fifth rib to the sternal body. The nipple often lies near the fifth intercostal space in the midclavicular line, so this cartilage is a useful neighbour when counting spaces.',
    articulations:
      'Lateral end with the fifth rib; medial end with the side of the sternal body.',
    features:
      'Hyaline cartilage here keeps the anterior chest wall compliant. Lower in the series, the cartilages begin to slope more steeply upward toward the sternum.',
  },
  costal6: {
    id: 'costal6',
    description:
      'The sixth costal cartilage continues the sixth rib to the sternal body. It is the penultimate true-rib cartilage, still reaching the sternum directly.',
    articulations:
      'Lateral end with the sixth rib; medial end with the side of the sternal body, just above the seventh cartilage.',
    features:
      'True (vertebrosternal) cartilage. The seventh cartilage below it is the last to meet the sternum itself.',
  },
  costal7: {
    id: 'costal7',
    description:
      'The seventh costal cartilage is the last true (vertebrosternal) cartilage: it reaches the lower sternal body / xiphisternal region directly. In life, the eighth to tenth cartilages join this one to form the costal margin — those lower cartilages are not in this pack.',
    articulations:
      'Lateral end with the seventh rib; medial end with the inferior sternal body, near the xiphisternal joint. In a complete cage, cartilages 8–10 would join its inferior border.',
    features:
      'The lowest direct sternal attachment of a rib. The missing 8th–10th cartilages and costal margin are a known gap in this BodyParts3D extract, not an anatomical absence.',
  },
}

function ivd(id: string, above: string, below: string, region: string, extra?: string): CartilageViewInfo {
  return {
    id,
    description:
      `The ${above}–${below} intervertebral disc is a fibrocartilaginous joint (symphysis) between the bodies of ${above} and ${below}. A tough anulus fibrosus surrounds a gel-like nucleus pulposus, distributing load and allowing a small amount of movement in the ${region} column.`,
    articulations: `Vertebral body of ${above} above and ${below} below, attached by the vertebral end plates. Anterior and posterior longitudinal ligaments run along the disc’s front and back.`,
    features:
      extra ??
      'Discs are thicker in the cervical and lumbar regions (where motion is greater) than in the mid-thorax. The nucleus sits slightly posterior; a posterolateral herniation can encroach on a spinal nerve.',
  }
}

Object.assign(CARTILAGE_VIEW, {
  disc_c2_c3: ivd(
    'disc_c2_c3',
    'C2',
    'C3',
    'cervical',
    'This is the disc of the axis (C2–C3), the highest intervertebral disc — there is no disc between the atlas and the axis. The vertebral artery is already in the transverse foramina at this level.',
  ),
  disc_c3_c4: ivd('disc_c3_c4', 'C3', 'C4', 'cervical'),
  disc_c4_c5: ivd('disc_c4_c5', 'C4', 'C5', 'cervical'),
  disc_c5_c6: ivd(
    'disc_c5_c6',
    'C5',
    'C6',
    'cervical',
    'A common cervical level for disc degeneration and posterolateral herniation, which can affect the C6 nerve root. Cervical discs are relatively thick for the size of the vertebral bodies.',
  ),
  disc_c6_c7: ivd('disc_c6_c7', 'C6', 'C7', 'cervical'),
  disc_c7_t1: ivd(
    'disc_c7_t1',
    'C7',
    'T1',
    'cervicothoracic',
    'The cervicothoracic disc, at the transition from the mobile neck to the more rigid thorax.',
  ),
  disc_t1_t2: ivd('disc_t1_t2', 'T1', 'T2', 'upper thoracic'),
  disc_t2_t3: ivd('disc_t2_t3', 'T2', 'T3', 'upper thoracic'),
  disc_t3_t4: ivd('disc_t3_t4', 'T3', 'T4', 'upper thoracic'),
  disc_t4_t5: ivd(
    'disc_t4_t5',
    'T4',
    'T5',
    'mid-thoracic',
    'Roughly the level of the sternal angle and the aortic arch. Mid-thoracic discs are thinner and, with the rib cage, allow only limited motion.',
  ),
  disc_t5_t6: ivd('disc_t5_t6', 'T5', 'T6', 'mid-thoracic'),
  disc_t6_t7: ivd('disc_t6_t7', 'T6', 'T7', 'mid-thoracic'),
  disc_t7_t8: ivd('disc_t7_t8', 'T7', 'T8', 'mid-thoracic'),
  disc_t8_t9: ivd('disc_t8_t9', 'T8', 'T9', 'mid-thoracic'),
  disc_t9_t10: ivd('disc_t9_t10', 'T9', 'T10', 'lower thoracic'),
  disc_t10_t11: ivd('disc_t10_t11', 'T10', 'T11', 'lower thoracic'),
  disc_t11_t12: ivd('disc_t11_t12', 'T11', 'T12', 'lower thoracic'),
  disc_t12_l1: ivd(
    'disc_t12_l1',
    'T12',
    'L1',
    'thoracolumbar',
    'The thoracolumbar disc sits at a common site of trauma, where the relatively stiff thorax meets the more mobile lumbar spine. In the official BodyParts3D list this mesh (FJ3211) is labelled only as an intervertebral disk; it is identified as T12–L1 by its position between the T11 and L1 discs.',
  ),
  disc_l1_l2: ivd('disc_l1_l2', 'L1', 'L2', 'lumbar'),
  disc_l2_l3: ivd('disc_l2_l3', 'L2', 'L3', 'lumbar'),
  disc_l3_l4: ivd('disc_l3_l4', 'L3', 'L4', 'lumbar'),
  disc_l4_l5: ivd(
    'disc_l4_l5',
    'L4',
    'L5',
    'lumbar',
    'A frequent site of disc degeneration and herniation. Lumbar discs are the thickest in the spine and carry much of the trunk’s weight.',
  ),
  disc_l5_s1: ivd(
    'disc_l5_s1',
    'L5',
    'S1',
    'lumbosacral',
    'The lumbosacral disc, often the lowest and a common site of herniation affecting the S1 root. It sits on the sloping sacral base.',
  ),
  nasal_alar: {
    id: 'nasal_alar',
    description:
      'The major alar (greater alar, lower lateral) cartilages form the mobile shape of the nasal tip and the lateral wall of each nostril. Each is a thin, curved plate with medial and lateral crura.',
    articulations:
      'The medial crura meet in the midline under the septal cartilage and help form the columella. The lateral crura support the alae and sit below the lateral nasal cartilages.',
    features:
      'These cartilages give the tip its spring. There is no separate minor alar (sesamoid) mesh in this pack.',
  },
  nasal_lateral: {
    id: 'nasal_lateral',
    description:
      'The lateral nasal (upper lateral) cartilages form the middle vault of the nose, one on each side of the septal cartilage, and give the mid-dorsum its width and support.',
    articulations:
      'Superiorly they meet the nasal bones; medially they join the septal cartilage; inferiorly they overlap the major alar cartilages.',
    features:
      'Together with the septum they make a cartilaginous “tent” under the nasal bones. Collapse here can narrow the internal nasal valve.',
  },
  nasal_septal: {
    id: 'nasal_septal',
    description:
      'The septal (quadrate) cartilage is the mobile, anterior part of the nasal septum. It separates the two nasal cavities in front of the bony septum (vomer and perpendicular plate of the ethmoid — those bones are not separate meshes in this pack).',
    articulations:
      'It meets the nasal bones and lateral nasal cartilages above, the vomer and ethmoid behind, the maxillae below, and the medial crura of the alar cartilages at the columella.',
    features:
      'Deviation of this cartilage is a common cause of a crooked septum. It is hyaline cartilage, continuous with the upper lateral cartilages in a single cartilaginous unit in early life.',
  },
  thyroid_cartilage: {
    id: 'thyroid_cartilage',
    description:
      'The thyroid cartilage is the largest laryngeal cartilage, a shield-shaped hyaline plate whose two laminae meet in the midline as the laryngeal prominence (the “Adam’s apple”). It protects the vocal folds, which attach on its inner surface at the anterior commissure.',
    articulations:
      'Inferior horns articulate with the cricoid cartilage (cricothyroid joints). The thyrohyoid membrane links its superior border to the hyoid (no hyoid mesh in this pack). The epiglottis and vocal ligaments attach internally.',
    features:
      'The superior horns and oblique line give attachment to muscles and the thyrohyoid membrane. The angle between the laminae is usually sharper in males, making the prominence more visible.',
  },
  cricoid: {
    id: 'cricoid',
    description:
      'The cricoid cartilage is a complete hyaline ring — the only complete ring in the airway. It has a narrow anterior arch and a tall posterior lamina, like a signet ring facing backward, and sits immediately below the thyroid cartilage.',
    articulations:
      'Above, the cricothyroid joints with the inferior horns of the thyroid cartilage, and the cricoarytenoid joints on the upper border of the lamina. Below, it continues into the first tracheal cartilage (trachea not in this pack) via the cricotracheal ligament.',
    features:
      'It is the foundation of the larynx: the arytenoids sit and slide on its lamina, and the cricothyroid muscle tilts the ring to tense the vocal folds. A surgical cricothyroidotomy passes through the cricothyroid membrane just above the arch. The BodyParts3D pack lists two cricoid files (FJ2440 and FJ2769) that are identical; only one mesh is included.',
  },
  arytenoid: {
    id: 'arytenoid',
    description:
      'The arytenoid cartilages are a pair of pyramidal hyaline (partly elastic) cartilages sitting on the cricoid lamina. Each has a vocal process pointing forward (for the vocal ligament) and a muscular process pointing laterally (for the intrinsic laryngeal muscles that open, close, and tense the glottis).',
    articulations:
      'Base of each arytenoid with the upper border of the cricoid lamina at the synovial cricoarytenoid joint. The vocal ligament runs from the vocal process to the thyroid cartilage. A corniculate cartilage caps the apex.',
    features:
      'Sliding and rotation at these joints abduct or adduct the vocal folds. They are small but essential for phonation and airway protection.',
  },
  corniculate: {
    id: 'corniculate',
    description:
      'The corniculate cartilages (of Santorini) are two tiny elastic nodules that cap the apices of the arytenoid cartilages and sit in the aryepiglottic folds.',
    articulations:
      'Each sits on the apex of the corresponding arytenoid. They do not form a true synovial joint with any other cartilage.',
    features:
      'They help stiffen the aryepiglottic folds. In this model they are small, paired nodules just above the arytenoids.',
  },
  cuneiform: {
    id: 'cuneiform',
    description:
      'The cuneiform cartilages (of Wrisberg) are two small, elongated elastic nodules lying in the aryepiglottic folds, just anterior and lateral to the corniculate cartilages. They do not articulate with other cartilages.',
    articulations:
      'Embedded in the aryepiglottic fold; no synovial joint. They sit anterolateral to the corniculates.',
    features:
      'They stiffen the aryepiglottic folds and may be visible as small swellings in a laryngeal view. They are easy to confuse by name with the cuneiform bones of the foot — those are bones, listed separately.',
  },
  epiglottis: {
    id: 'epiglottis',
    description:
      'The epiglottis is a leaf-shaped plate of elastic cartilage that stands behind the tongue and behind the hyoid, at the entrance to the larynx. During swallowing it folds back over the laryngeal inlet so that the bolus is directed toward the piriform fossae and oesophagus.',
    articulations:
      'Its narrow stalk (petiole) attaches to the inner surface of the thyroid cartilage, just below the thyroid notch, via the thyroepiglottic ligament. The hyoepiglottic ligament links it to the hyoid (no hyoid mesh in this pack).',
    features:
      'Elastic cartilage lets it spring back after swallowing. The valleculae lie between its anterior surface and the tongue; the laryngeal inlet lies behind it.',
  },
})

export function getCartilageView(id: string): CartilageViewInfo | undefined {
  return CARTILAGE_VIEW[id]
}

export function getMuscleView(id: string): MuscleViewInfo | undefined {
  return MUSCLE_VIEW[id]
}

export function getBoneView(id: string): BoneViewInfo | undefined {
  return BONE_VIEW[id]
}
