export interface Activity {
  id: string
  title: string
  description: string | null
  location: string | null
  coverImage: string | null
  startsAt: string
  endsAt: string | null
  status: 'draft' | 'published' | 'closed'
  checkinOpen: boolean
}
