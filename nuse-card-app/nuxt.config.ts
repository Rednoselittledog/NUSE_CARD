export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Flatten auto-import names so components/card/CoverPhoto.vue registers as
  // <CoverPhoto/> instead of <CardCoverPhoto/>.
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      title: 'NUSE — ชมรมผู้ประกอบการรุ่นเยาว์',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'ยินดีต้อนรับสู่ NUSE รุ่นที่ 1 ชมรมผู้ประกอบการรุ่นเยาว์ มหาวิทยาลัยนเรศวร สมัครเข้าชมรมและติดตามกิจกรรมของเราได้ที่นี่',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@500;600;700&family=Sarabun:wght@400;500;600;700&family=Mali:wght@500;600;700&display=swap',
        },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
