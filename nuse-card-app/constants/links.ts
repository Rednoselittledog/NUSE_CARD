export const JOIN_FORM_URL = 'https://forms.gle/MY1fv81Xjja41Kbh6'

export interface SocialLink {
  name: string
  url: string
  icon: string
  background: string
  rotate: number
  shadowColor: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61587395073703',
    icon: 'IconFacebook',
    background: 'var(--color-navy)',
    rotate: -6,
    shadowColor: 'rgba(18,24,74,.25)',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/nuse_club/',
    icon: 'IconInstagram',
    background: 'var(--color-orange)',
    rotate: 5,
    shadowColor: 'rgba(232,98,12,.25)',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@nuse.club',
    icon: 'IconTiktok',
    background: 'var(--color-navy)',
    rotate: -4,
    shadowColor: 'rgba(18,24,74,.25)',
  },
]
