const MARKER_COLORS = ['navy', 'orange', 'blue', 'orange', 'navy', 'pink'] as const

export function stationMarkerColor(index: number) {
  return MARKER_COLORS[index % MARKER_COLORS.length]
}
