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
      'Linea alba, the pubic tubercle, and the anterior half of the iliac crest, via a broad aponeurosis. The thickened free inferior border of the aponeurosis stretches from the anterior superior iliac spine to the pubic tubercle as the inguinal ligament. (This model has no linea-alba mesh; the pin marks the iliac attachment on the hip bone.)',
    action:
      'Unilateral contraction rotates the trunk to the opposite side and laterally flexes it to the same side. Bilateral contraction flexes the trunk, compresses the abdominal viscera (straining, expiration), and can depress the ribs.',
    innervation:
      'Thoraco-abdominal nerves (anterior rami of T7–T11) and the subcostal nerve (T12). The lowest fibers may also receive a contribution from the iliohypogastric nerve (L1).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ribs', muscleMeshes: [`ext_oblique_${s}`], boneMeshes: ribs(s, 5, 12) },
      { kind: 'insertion', label: 'Insertion · iliac crest', muscleMeshes: [`ext_oblique_${s}`], boneMeshes: side(s, ['hip']), prefer: 'cranial' },
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
      'Chiefly the iliotibial tract of the fascia lata (which then reaches the lateral tibial condyle at Gerdy’s tubercle). Deeper inferior fibers insert on the gluteal tuberosity of the femur. (This model has no IT-tract mesh; the bony pin marks the femoral attachment.)',
    action:
      'The chief extensor of the flexed thigh (rising from sitting, climbing, sprinting). It also assists lateral rotation of the thigh. Upper fibers may abduct, lower fibers may adduct. It steadies the femur on the tibia when standing, and is relatively quiet in easy standing or slow walking.',
    innervation: 'Inferior gluteal nerve (L5–S2).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin · ilium', muscleMeshes: [`glut_max_${s}`], boneMeshes: side(s, ['hip']), prefer: 'posterior' },
      { kind: 'origin', label: 'Origin · sacrum', muscleMeshes: [`glut_max_${s}`], boneMeshes: ['sacrum'] },
      { kind: 'insertion', label: 'Insertion · femur', muscleMeshes: [`glut_max_${s}`], boneMeshes: side(s, ['femur']), prefer: 'cranial' },
    ],
  },

  rectus_femoris: {
    id: 'rectus_femoris',
    description:
      'The only quadriceps muscle that crosses both the hip and the knee. It lies in the midline of the anterior thigh, superficial to vastus intermedius, and contributes to the quadriceps tendon. In this pack, vastus intermedius is not a separate mesh.',
    origin:
      'Straight (direct) head: anterior inferior iliac spine. Reflected (indirect) head: a groove just above the acetabulum (superior acetabular rim) and the fibrous capsule of the hip. Both heads arise from the hip bone, so a single origin pin marks the nearest approach of the muscle to that mesh.',
    insertion:
      'Base of the patella via the quadriceps tendon, then the tibial tuberosity via the patellar ligament. The muscular insertion pin is placed on the patella, the bony attachment this mesh actually reaches.',
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
      'Lateral border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Expansions form the lateral patellar retinaculum and blend with the capsule of the knee. The pin marks the patella, the bony attachment this mesh reaches.',
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
      'Medial border of the patella (quadriceps tendon) and, via the patellar ligament, the tibial tuberosity. Distal fibers contribute to the medial patellar retinaculum. The pin marks the patella, the bony attachment this mesh reaches.',
    action:
      'Extends the leg at the knee. The oblique distal fibers pull the patella medially and help prevent lateral dislocation, especially in the last degrees of extension.',
    innervation: 'Femoral nerve (L2–L4).',
    sitesForSide: (s) => [
      { kind: 'origin', label: 'Origin', muscleMeshes: [`vastus_med_${s}`], boneMeshes: side(s, ['femur']), prefer: 'medial' },
      { kind: 'insertion', label: 'Insertion · patella', muscleMeshes: [`vastus_med_${s}`], boneMeshes: side(s, ['patella']), prefer: 'cranial' },
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
  c7: {
    id: 'c7',
    description:
      'C7, the vertebra prominens, is the last cervical vertebra and is transitional toward the thoracic type. It is named for its long, usually non-bifid spinous process, which is often the most prominent bony landmark at the base of the neck (though T1 can occasionally be more prominent).',
    articulations:
      'C6 above and T1 below. It does not normally carry a rib; the first rib articulates with T1.',
    features:
      'Transverse foramina are often small and, unlike C1–C6, usually do not transmit the vertebral artery (the artery typically enters the foramen at C6). Anterior and posterior tubercles of the transverse process are less distinct than at higher cervical levels. C3–C6 are not in this model pack.',
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

export function getMuscleView(id: string): MuscleViewInfo | undefined {
  return MUSCLE_VIEW[id]
}

export function getBoneView(id: string): BoneViewInfo | undefined {
  return BONE_VIEW[id]
}
