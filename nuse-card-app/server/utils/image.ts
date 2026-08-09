import type { GalleryImage } from '~/shared/types/image'

export interface ImageRow {
  id: string
  url: string
  activity_id: string | null
  featured: boolean
  created_at: string
}

export function mapImage(row: ImageRow): GalleryImage {
  return {
    id: row.id,
    url: row.url,
    activityId: row.activity_id,
    featured: row.featured,
    createdAt: row.created_at,
  }
}
