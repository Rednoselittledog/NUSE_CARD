import { list } from '@vercel/blob'

export default defineEventHandler(async () => {
  const [db, blob] = await Promise.all([
    query('select 1')
      .then(() => 'ok' as const)
      .catch((err) => String(err.message ?? err)),
    list({ limit: 1 })
      .then(() => 'ok' as const)
      .catch((err) => String(err.message ?? err)),
  ])

  return { db, blob }
})
