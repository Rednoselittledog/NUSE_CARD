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
