export interface Activity {
  id: string
  title: string
  description: string | null
  location: string | null
  coverImage: string | null
  gallery: string[]
  startsAt: string
  endsAt: string | null
  status: 'draft' | 'published' | 'closed'
  checkinOpen: boolean
}
