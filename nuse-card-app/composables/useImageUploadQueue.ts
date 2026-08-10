import { resizeForUpload } from '~/shared/utils/imageResize'
import type { GalleryImage } from '~/shared/types/image'

export interface PendingUpload {
  id: string
  file: File
  previewUrl: string
  status: 'pending' | 'uploading' | 'error'
  error?: string
  // Set once the blob upload step succeeds, so a retry after a failed
  // /api/images insert re-sends this URL instead of re-uploading the file —
  // otherwise a failure here leaves an orphaned file in blob storage that
  // never appears in /gallery (it only ever reads the `image` DB table).
  blobUrl?: string
}

// Shared by the activity-gallery uploader and the general gallery-page
// uploader: resizes client-side, uploads one file at a time (not in
// parallel — two /api/images writes racing wouldn't corrupt anything here
// since each insert is independent, but keeping it sequential means upload
// order is predictable and only one request is ever in flight for clearer
// per-photo progress).
export function useImageUploadQueue(options: { activityId?: string; onUploaded: (image: GalleryImage) => void }) {
  const pendingUploads = ref<PendingUpload[]>([])
  let running = false

  function enqueue(files: File[]) {
    for (const file of files) {
      pendingUploads.value.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending',
      })
    }
    run()
  }

  async function run() {
    if (running) return
    running = true
    try {
      let next = pendingUploads.value.find((item) => item.status === 'pending')
      while (next) {
        await uploadOne(next)
        next = pendingUploads.value.find((item) => item.status === 'pending')
      }
    } finally {
      running = false
    }
  }

  async function uploadOne(item: PendingUpload) {
    item.status = 'uploading'
    item.error = undefined
    try {
      if (!item.blobUrl) {
        const resized = await resizeForUpload(item.file)
        const body = new FormData()
        body.append('file', resized)
        const { url } = await $fetch<{ url: string }>('/api/uploads', { method: 'POST', body })
        item.blobUrl = url
      }

      const image = await $fetch<GalleryImage>('/api/images', {
        method: 'POST',
        body: { url: item.blobUrl, activityId: options.activityId ?? null },
      })
      options.onUploaded(image)

      URL.revokeObjectURL(item.previewUrl)
      pendingUploads.value = pendingUploads.value.filter((p) => p.id !== item.id)
    } catch (err: any) {
      item.status = 'error'
      item.error = err?.data?.statusMessage || err?.statusMessage || 'อัปโหลดไม่สำเร็จ'
    }
  }

  function retry(id: string) {
    const item = pendingUploads.value.find((p) => p.id === id)
    if (!item || item.status !== 'error') return
    item.status = 'pending'
    item.error = undefined
    run()
  }

  function dismiss(id: string) {
    const item = pendingUploads.value.find((p) => p.id === id)
    if (item) URL.revokeObjectURL(item.previewUrl)
    pendingUploads.value = pendingUploads.value.filter((p) => p.id !== id)
  }

  return { pendingUploads, enqueue, retry, dismiss }
}
