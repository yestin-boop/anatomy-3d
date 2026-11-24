/**
 * Kinematic pose for the unrigged right-foot bones.
 * Plantarflexion peaks at 40°, the lower figure the course notes give for
 * ankle plantarflexion (40–45°). The notes do not give an inversion angle;
 * the inversion value is only large enough that the sole clearly turns inward.
 */

export const ANKLE_PLANTARFLEXION_RAD = (40 * Math.PI) / 180
export const ANKLE_INVERSION_RAD = (22 * Math.PI) / 180

export type AnklePose = {
  plantarRad: number
  inversionRad: number
  /** Ligaments stay in the neutral pose, so they hide while the foot is moving. */
  ligamentsVisible: boolean
}

function clamp01(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t
}

function smooth(t: number): number {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

/** Pose at unit time 0–1. Starts and ends neutral. One play is not a loop. */
export function anklePoseAt(u: number): AnklePose {
  const t = clamp01(u)
  let plantar = 0
  let invert = 0
  if (t < 0.12) {
    plantar = 0
    invert = 0
  } else if (t < 0.42) {
    plantar = smooth((t - 0.12) / 0.3) * ANKLE_PLANTARFLEXION_RAD
  } else if (t < 0.68) {
    plantar = ANKLE_PLANTARFLEXION_RAD
    invert = smooth((t - 0.42) / 0.26) * ANKLE_INVERSION_RAD
  } else if (t < 0.8) {
    plantar = ANKLE_PLANTARFLEXION_RAD
    invert = ANKLE_INVERSION_RAD
  } else {
    const k = smooth((t - 0.8) / 0.2)
    plantar = (1 - k) * ANKLE_PLANTARFLEXION_RAD
    invert = (1 - k) * ANKLE_INVERSION_RAD
  }
  const moving = plantar > 0.02 || invert > 0.02
  return { plantarRad: plantar, inversionRad: invert, ligamentsVisible: !moving }
}

/** Unit time of the held injury position (plantarflexion plus inversion). */
export const ANKLE_INJURY_U = 0.74
