<template>
  <CardShell>
    <CoverPhoto :src="coverPhotoSrc" />
    <AvatarLogo :src="logoSrc" />
    <div class="card-body">
      <ProfileIntro />
      <CtaButtons />
      <SocialLinks />
      <PhotoGallery />
      <ClosingCta />
    </div>
  </CardShell>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/images/nuse-logo.png'
import coverUrl from '~/assets/images/cover.jpg'

const coverPhotoSrc = coverUrl
const logoSrc = logoUrl
</script>

<style scoped>
.card-body {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 20px 24px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>
