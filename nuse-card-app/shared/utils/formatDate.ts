function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function formatActivityDate(iso: string) {
  const d = new Date(iso)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${pad(d.getFullYear() % 100)}`
}

export function formatActivityTime(iso: string) {
  const d = new Date(iso)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function formatActivityDateTime(iso: string) {
  return `${formatActivityDate(iso)} ${formatActivityTime(iso)}`
}
