/**
 * Bind a packed muscle mesh to the bones it already sits on.
 * Vertices are not a new mesh and not a fibre morph: each one follows the
 * nearest existing bone, and blends only in the narrow band where two bones meet.
 */

export type SeatBox = {
  /** -1 stays in rest space. 0 and 1 are the study pivots. */
  pivot: number
  minX: number
  minY: number
  minZ: number
  maxX: number
  maxY: number
  maxZ: number
}

export type SeatInfluence = {
  pivotA: number
  pivotB: number
  /** 0 = all A, 1 = all B. */
  t: number
}

/** Difference of distances below which two bones share a vertex. */
export const SEAT_BLEND = 0.04

export function boxDistance(box: SeatBox, x: number, y: number, z: number): number {
  const dx = x < box.minX ? box.minX - x : x > box.maxX ? x - box.maxX : 0
  const dy = y < box.minY ? box.minY - y : y > box.maxY ? y - box.maxY : 0
  const dz = z < box.minZ ? box.minZ - z : z > box.maxZ ? z - box.maxZ : 0
  return Math.hypot(dx, dy, dz)
}

export function seatInfluence(boxes: readonly SeatBox[], x: number, y: number, z: number): SeatInfluence {
  let bestPivot = -1
  let bestD = Infinity
  let secondPivot = -1
  let secondD = Infinity
  for (const box of boxes) {
    const d = boxDistance(box, x, y, z)
    if (d < bestD) {
      if (box.pivot !== bestPivot) {
        secondPivot = bestPivot
        secondD = bestD
      }
      bestPivot = box.pivot
      bestD = d
    } else if (box.pivot !== bestPivot && d < secondD) {
      secondPivot = box.pivot
      secondD = d
    }
  }
  if (!Number.isFinite(bestD)) return { pivotA: -1, pivotB: -1, t: 0 }
  const gap = secondD - bestD
  if (!Number.isFinite(secondD) || secondPivot === bestPivot || gap > SEAT_BLEND) {
    return { pivotA: bestPivot, pivotB: bestPivot, t: 0 }
  }
  return { pivotA: bestPivot, pivotB: secondPivot, t: (1 - gap / SEAT_BLEND) * 0.5 }
}
