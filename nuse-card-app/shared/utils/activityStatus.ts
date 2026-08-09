import type { Activity } from '~/shared/types/activity'

const LABELS: Record<Activity['status'], string> = {
  draft: 'ฉบับร่าง',
  published: 'เปิดรับ',
  closed: 'ปิดแล้ว',
}

const BADGE_VARIANTS: Record<Activity['status'], 'default' | 'secondary' | 'outline'> = {
  draft: 'outline',
  published: 'default',
  closed: 'secondary',
}

export function activityStatusLabel(status: Activity['status']) {
  return LABELS[status]
}

export function activityStatusBadgeVariant(status: Activity['status']) {
  return BADGE_VARIANTS[status]
}

// Time-based state for the roadmap (distinct from Activity.status, which is
// the publish workflow). Assumes activities are sorted ascending by startsAt.
export type ActivityTimeState = 'locked' | 'active' | 'completed'

export function activityTimeState(activities: Pick<Activity, 'startsAt'>[], index: number, now: number): ActivityTimeState {
  const startsAt = new Date(activities[index].startsAt).getTime()
  if (now < startsAt) return 'locked'
  const next = activities[index + 1]
  if (!next || now < new Date(next.startsAt).getTime()) return 'active'
  return 'completed'
}

export function activityCurrentIndex(activities: Pick<Activity, 'startsAt'>[], now: number): number {
  let index = 0
  for (let i = 0; i < activities.length; i++) {
    if (now >= new Date(activities[i].startsAt).getTime()) index = i
  }
  return index
}
