export default defineEventHandler(async (event) => {
  await requireStaff(event)
  const id = getRouterParam(event, 'id')
  await query('delete from activity where id = $1', [id])
  return { success: true }
})
