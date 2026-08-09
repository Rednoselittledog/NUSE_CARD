import type { AttendanceStamp } from '~/shared/types/attendance'

interface AttendanceRow {
  activity_id: string
  title: string
  cover_image: string | null
  starts_at: string
  checked_in_at: string
}

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { rows } = await query<AttendanceRow>(
    `select a.id as activity_id, a.title, a.cover_image, a.starts_at, att.checked_in_at
     from attendance att
     join activity a on a.id = att.activity_id
     where att.member_id = $1
     order by att.checked_in_at asc`,
    [user.id],
  )

  return rows.map<AttendanceStamp>((row) => ({
    activityId: row.activity_id,
    title: row.title,
    coverImage: row.cover_image,
    startsAt: row.starts_at,
    checkedInAt: row.checked_in_at,
  }))
})
