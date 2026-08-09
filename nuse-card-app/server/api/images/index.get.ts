export default defineEventHandler(async (event) => {
  const { activityId, featured } = getQuery(event)

  const conditions: string[] = []
  const params: unknown[] = []
  if (typeof activityId === 'string' && activityId) {
    params.push(activityId)
    conditions.push(`activity_id = $${params.length}`)
  }
  if (featured === 'true') {
    conditions.push('featured = true')
  }
  const where = conditions.length ? `where ${conditions.join(' and ')}` : ''

  const { rows } = await query<ImageRow>(`select * from image ${where} order by created_at desc`, params)
  return rows.map(mapImage)
})
