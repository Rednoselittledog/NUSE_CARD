import type { Activity } from '~/shared/types/activity'

export interface ActivityRow {
  id: string
  title: string
  description: string | null
  location: string | null
  cover_image: string | null
  gallery: string[] | null
  starts_at: string
  ends_at: string | null
  status: 'draft' | 'published' | 'closed'
  checkin_open: boolean
  created_at: string
}

export function mapActivity(row: ActivityRow): Activity {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    coverImage: row.cover_image,
    gallery: row.gallery ?? [],
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    status: row.status,
    checkinOpen: row.checkin_open,
  }
}
