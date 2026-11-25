/**
 * Short kinematic cues for existing bones. Muscles are not rigged and do not
 * move. Angles are visual only — the course notes do not give these degrees.
 *
 * Model axes (same as the ankle case): +Y up, +Z anterior, patient right is −X.
 * +X rotation drops an anterior point and swings a hanging limb posteriorly.
 * −Z rotation swings the right limb laterally (abduction).
 */
import { RIGHT_FOOT_BONES } from '../data/ankleSprain'

export type LimbCue =
  | 'none'
  | 'plantarflex'
  | 'dorsiflex'
  | 'knee-flex'
  | 'elbow-flex'
  | 'hip-abduct'
  | 'hip-extend'
  | 'hip-flex'
  | 'arm-abduct'
  | 'late-swing'

export type LimbAxis = 'x' | 'z'

export type LimbPose = {
  cue: LimbCue
  /** Radians on the primary pivot. */
  primary: number
  /** Radians on the nested knee pivot. Zero except in late-swing. */
  knee: number
  axis: LimbAxis
}

export type PivotEnd = 'proximal' | 'distal' | 'center'

export type PivotSpec = {
  id: 'primary' | 'knee'
  /** Parent the pivot to the spin group, or nest it under the hip pivot. */
  parent: 'spin' | 'primary'
  anchor: string
  end: PivotEnd
  /** Fraction of the anchor box width added to X (toward the midline on the right limb). */
  midline: number
  bones: readonly string[]
  axis: LimbAxis
}

export const RIGHT_HAND_BONES: readonly string[] = [
  'scaphoid_r',
  'lunate_r',
  'triquetrum_r',
  'pisiform_r',
  'trapezium_r',
  'trapezoid_r',
  'capitate_r',
  'hamate_r',
  'metacarpal1_r',
  'metacarpal2_r',
  'metacarpal3_r',
  'metacarpal4_r',
  'metacarpal5_r',
  'phal_hand_prox_thumb_r',
  'phal_hand_prox_index_r',
  'phal_hand_prox_middle_r',
  'phal_hand_prox_ring_r',
  'phal_hand_prox_little_r',
  'phal_hand_mid_index_r',
  'phal_hand_mid_middle_r',
  'phal_hand_mid_ring_r',
  'phal_hand_mid_little_r',
  'phal_hand_dist_thumb_r',
  'phal_hand_dist_index_r',
  'phal_hand_dist_middle_r',
  'phal_hand_dist_ring_r',
  'phal_hand_dist_little_r',
]

export const RIGHT_FOREARM_BONES: readonly string[] = ['radius_r', 'ulna_r', ...RIGHT_HAND_BONES]

export const RIGHT_ARM_BONES: readonly string[] = ['humerus_r', ...RIGHT_FOREARM_BONES]

export const RIGHT_LEG_DISTAL: readonly string[] = ['patella_r', 'tibia_r', 'fibula_r', ...RIGHT_FOOT_BONES]

export const RIGHT_LIMB_BONES: readonly string[] = ['femur_r', ...RIGHT_LEG_DISTAL]

/** Peak radians. Signs follow the axis notes above. */
export const LIMB_PEAK: Record<Exclude<LimbCue, 'none' | 'late-swing'>, { rad: number; axis: LimbAxis }> = {
  plantarflex: { rad: 0.42, axis: 'x' },
  dorsiflex: { rad: -0.32, axis: 'x' },
  'knee-flex': { rad: 0.62, axis: 'x' },
  'elbow-flex': { rad: -1.05, axis: 'x' },
  'hip-abduct': { rad: -0.28, axis: 'z' },
  'hip-extend': { rad: 0.4, axis: 'x' },
  'hip-flex': { rad: -0.4, axis: 'x' },
  'arm-abduct': { rad: -0.42, axis: 'z' },
}

/** Thigh swings forward; the knee stays only slightly bent so the hamstrings read as lengthened. */
export const LATE_SWING_HIP = -0.5
export const LATE_SWING_KNEE = 0.2

function clamp01(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t
}

function smooth(t: number): number {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

export function limbPoseAt(cue: LimbCue, u: number): LimbPose {
  const s = smooth(u)
  if (cue === 'none') return { cue, primary: 0, knee: 0, axis: 'x' }
  if (cue === 'late-swing') {
    return { cue, primary: s * LATE_SWING_HIP, knee: s * LATE_SWING_KNEE, axis: 'x' }
  }
  const peak = LIMB_PEAK[cue]
  return { cue, primary: s * peak.rad, knee: 0, axis: peak.axis }
}

export function pivotsFor(cue: LimbCue): readonly PivotSpec[] {
  switch (cue) {
    case 'none':
      return []
    case 'plantarflex':
    case 'dorsiflex':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'talus_r',
          end: 'center',
          midline: 0,
          bones: RIGHT_FOOT_BONES,
          axis: 'x',
        },
      ]
    case 'knee-flex':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'tibia_r',
          end: 'proximal',
          midline: 0,
          bones: RIGHT_LEG_DISTAL,
          axis: 'x',
        },
      ]
    case 'elbow-flex':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'humerus_r',
          end: 'distal',
          midline: 0,
          bones: RIGHT_FOREARM_BONES,
          axis: 'x',
        },
      ]
    case 'arm-abduct':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'humerus_r',
          end: 'proximal',
          midline: 0.12,
          bones: RIGHT_ARM_BONES,
          axis: 'z',
        },
      ]
    case 'hip-abduct':
    case 'hip-extend':
    case 'hip-flex':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'femur_r',
          end: 'proximal',
          midline: 0.18,
          bones: RIGHT_LIMB_BONES,
          axis: cue === 'hip-abduct' ? 'z' : 'x',
        },
      ]
    case 'late-swing':
      return [
        {
          id: 'primary',
          parent: 'spin',
          anchor: 'femur_r',
          end: 'proximal',
          midline: 0.18,
          bones: ['femur_r'],
          axis: 'x',
        },
        {
          id: 'knee',
          parent: 'primary',
          anchor: 'tibia_r',
          end: 'proximal',
          midline: 0,
          bones: RIGHT_LEG_DISTAL,
          axis: 'x',
        },
      ]
    default:
      return []
  }
}
